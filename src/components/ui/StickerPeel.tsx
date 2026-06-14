'use client'

// Adapted from React Bits — "Sticker Peel" (https://reactbits.dev/animations/sticker-peel),
// MIT, by David Haz (https://github.com/DavidHDev/react-bits). The peel visual (clip-path
// main + flipped flap + SVG point-light / drop-shadow / fill filters) is kept verbatim.
// Two additions for HELO's hero: `disableDrag` (pin in place — no GSAP Draggable) and
// `peeled` (drive the peel from state/scroll instead of :hover).

import { useRef, useEffect, useMemo, CSSProperties } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

interface StickerPeelProps {
  imageSrc: string
  rotate?: number
  peelBackHoverPct?: number
  peelBackActivePct?: number
  peelEasing?: string
  peelHoverEasing?: string
  width?: number
  shadowIntensity?: number
  lightingIntensity?: number
  initialPosition?: 'center' | 'random' | { x: number; y: number }
  peelDirection?: number
  className?: string
  /** Pin in place — skip GSAP Draggable (no dragging). */
  disableDrag?: boolean
  /** Drive the peel from state (scroll) instead of :hover. */
  peeled?: boolean
  /**
   * Progressive peel driven by the CSS variable `--peel` (0 = flat, 1 = fully peeled).
   * Set `--peel` on an ancestor (e.g. a MotionValue) to scrub the peel with scroll.
   * Uses the same clip-path geometry as the hover peel, just continuous.
   */
  varPeel?: boolean
  /** Suppress the :hover / :active peel-back so the sticker stays flat & stable at rest. */
  noHoverPeel?: boolean
  /**
   * Drop all SVG reference filters (specular point-lights, feDropShadow, expandAndFill) and
   * the cursor-tracking mousemove listener; use cheap GPU-composited CSS shadows instead.
   * SVG url() filters force per-frame CPU re-raster during scroll → kills FPS. Loses only the
   * cursor sheen + flap gloss; keeps the drop + contact shadow.
   */
  noSpecular?: boolean
}

interface CSSVars extends CSSProperties {
  '--sticker-rotate'?: string
  '--sticker-p'?: string
  '--sticker-peelback-hover'?: string
  '--sticker-peelback-active'?: string
  '--sticker-peel-easing'?: string
  '--sticker-peel-hover-easing'?: string
  '--sticker-width'?: string
  '--sticker-shadow-opacity'?: number
  '--sticker-lighting-constant'?: number
  '--peel-direction'?: string
  '--sticker-start'?: string
  '--sticker-end'?: string
}

const StickerPeel: React.FC<StickerPeelProps> = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = 'center',
  peelDirection = 0,
  className = '',
  disableDrag = false,
  peeled = false,
  varPeel = false,
  noHoverPeel = false,
  noSpecular = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragTargetRef = useRef<HTMLDivElement>(null)
  const pointLightRef = useRef<SVGFEPointLightElement>(null)
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null)
  const draggableInstanceRef = useRef<Draggable | null>(null)

  const defaultPadding = 12

  useEffect(() => {
    const target = dragTargetRef.current
    if (!target) return

    let startX = 0,
      startY = 0

    if (initialPosition === 'center') {
      return
    }

    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {
      startX = initialPosition.x
      startY = initialPosition.y
    }

    gsap.set(target, { x: startX, y: startY })
  }, [initialPosition])

  useEffect(() => {
    if (disableDrag) return
    const target = dragTargetRef.current
    if (!target) return

    const boundsEl = target.parentNode as HTMLElement

    const draggable = Draggable.create(target, {
      type: 'x,y',
      bounds: boundsEl,
      inertia: true,
      onDrag(this: Draggable) {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4)
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' })
      },
      onDragEnd() {
        const rotationEase = 'power2.out'
        const duration = 0.8
        gsap.to(target, { rotation: 0, duration, ease: rotationEase })
      },
    })

    draggableInstanceRef.current = draggable[0]

    const handleResize = () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.update()

        const currentX = gsap.getProperty(target, 'x') as number
        const currentY = gsap.getProperty(target, 'y') as number

        const boundsRect = boundsEl.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        const maxX = boundsRect.width - targetRect.width
        const maxY = boundsRect.height - targetRect.height

        const newX = Math.max(0, Math.min(currentX, maxX))
        const newY = Math.max(0, Math.min(currentY, maxY))

        if (newX !== currentX || newY !== currentY) {
          gsap.to(target, { x: newX, y: newY, duration: 0.3, ease: 'power2.out' })
        }
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill()
      }
    }
  }, [disableDrag])

  useEffect(() => {
    if (noSpecular) return // no point-light filters to drive
    const updateLight = (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top

      if (pointLightRef.current) {
        gsap.set(pointLightRef.current, { attr: { x, y } })
      }

      const normalizedAngle = Math.abs(peelDirection % 360)
      if (pointLightFlippedRef.current) {
        if (normalizedAngle !== 180) {
          gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } })
        } else {
          gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } })
        }
      }
    }

    const container = containerRef.current
    const eventType = 'mousemove'

    if (container) {
      container.addEventListener(eventType, updateLight)
      return () => container.removeEventListener(eventType, updateLight)
    }
  }, [peelDirection, noSpecular])

  const cssVars: CSSVars = useMemo(
    () => ({
      '--sticker-rotate': `${rotate}deg`,
      '--sticker-p': `${defaultPadding}px`,
      '--sticker-peelback-hover': `${peelBackHoverPct}%`,
      '--sticker-peelback-active': `${peelBackActivePct}%`,
      '--sticker-peel-easing': peelEasing,
      '--sticker-peel-hover-easing': peelHoverEasing,
      '--sticker-width': `${width}px`,
      '--sticker-shadow-opacity': shadowIntensity,
      '--sticker-lighting-constant': lightingIntensity,
      '--peel-direction': `${peelDirection}deg`,
      '--sticker-start': `calc(-1 * ${defaultPadding}px)`,
      '--sticker-end': `calc(100% + ${defaultPadding}px)`,
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection,
      defaultPadding,
    ],
  )

  // ── Progressive peel (varPeel): same geometry as the hover peel, scrubbed by --peel ──
  // The peel line slides from the top edge (--sticker-start) down to peelBackActivePct
  // as --peel goes 0 → 1, and the flap lifts in lockstep.
  const pct = peelBackActivePct
  const peelLine = `calc(var(--sticker-start) + (${pct}% - var(--sticker-start)) * var(--peel, 0))`
  const flapTopVar = `calc((-100% - var(--sticker-p) - var(--sticker-p)) + (2 * ${pct}% + 2 * var(--sticker-p) - 1px) * var(--peel, 0))`

  // GPU-composited CSS drop-shadow (noSpecular) vs the original SVG reference filter.
  const dropFilter = noSpecular
    ? `drop-shadow(2px 4px ${(3 * shadowIntensity).toFixed(2)}px rgba(0,0,0,${shadowIntensity}))`
    : 'url(#dropShadow)'

  const stickerMainStyle: CSSProperties = varPeel
    ? {
        clipPath: `polygon(var(--sticker-start) ${peelLine}, var(--sticker-end) ${peelLine}, var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end))`,
        filter: dropFilter,
        willChange: 'clip-path, transform',
      }
    : {
        clipPath: `polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end))`,
        transition: 'clip-path 0.6s ease-out',
        filter: dropFilter,
        willChange: 'clip-path, transform',
      }

  const flapStyle: CSSProperties = varPeel
    ? {
        clipPath: `polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) ${peelLine}, var(--sticker-start) ${peelLine})`,
        top: flapTopVar,
        transform: 'scaleY(-1)',
        willChange: 'clip-path, transform',
      }
    : {
        clipPath: `polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-start) var(--sticker-start))`,
        top: `calc(-100% - var(--sticker-p) - var(--sticker-p))`,
        transform: 'scaleY(-1)',
        transition: 'all 0.6s ease-out',
        willChange: 'clip-path, transform',
      }

  const imageStyle: CSSProperties = {
    transform: `rotate(calc(${rotate}deg - ${peelDirection}deg))`,
    width: `${width}px`,
  }

  // Contact-shadow copy. With noSpecular the parent's `brightness(0)` already blackens the
  // image, so the expandAndFill flood is redundant — drop the SVG filter.
  const shadowImageStyle: CSSProperties = noSpecular
    ? imageStyle
    : { ...imageStyle, filter: 'url(#expandAndFill)' }

  return (
    <div
      className={`${disableDrag ? 'relative' : 'absolute cursor-grab active:cursor-grabbing'} transform-gpu ${className}`}
      ref={dragTargetRef}
      style={cssVars}
    >
      {!noHoverPeel && (
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .sticker-container:hover .sticker-main,
          .sticker-container.touch-active .sticker-main {
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;
          }
          .sticker-container:hover .sticker-flap,
          .sticker-container.touch-active .sticker-flap {
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-hover), var(--sticker-start) var(--sticker-peelback-hover)) !important;
            top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px) !important;
          }
          .sticker-container:active .sticker-main,
          .sticker-container.peeled .sticker-main {
            clip-path: polygon(var(--sticker-start) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-end) var(--sticker-end), var(--sticker-start) var(--sticker-end)) !important;
          }
          .sticker-container:active .sticker-flap,
          .sticker-container.peeled .sticker-flap {
            clip-path: polygon(var(--sticker-start) var(--sticker-start), var(--sticker-end) var(--sticker-start), var(--sticker-end) var(--sticker-peelback-active), var(--sticker-start) var(--sticker-peelback-active)) !important;
            top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px) !important;
          }
        `,
        }}
      />
      )}

      {!noSpecular && (
      <svg width="0" height="0">
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="dropShadow">
            <feDropShadow dx="2" dy="4" stdDeviation={3 * shadowIntensity} floodColor="black" floodOpacity={shadowIntensity} />
          </filter>

          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>
      )}

      <div
        className={`sticker-container relative select-none touch-none sm:touch-auto${peeled && !varPeel ? ' peeled' : ''}`}
        ref={containerRef}
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent',
          transform: `rotate(${peelDirection}deg)`,
          transformOrigin: 'center',
        }}
      >
        <div className="sticker-main" style={stickerMainStyle}>
          {noSpecular ? (
            <img src={imageSrc} alt="" className="block" style={imageStyle} draggable="false" onContextMenu={e => e.preventDefault()} />
          ) : (
            <div style={{ filter: 'url(#pointLight)' }}>
              <img src={imageSrc} alt="" className="block" style={imageStyle} draggable="false" onContextMenu={e => e.preventDefault()} />
            </div>
          )}
        </div>

        <div className="absolute top-4 left-2 w-full h-full opacity-40" style={{ filter: 'brightness(0) blur(8px)' }}>
          <div className="sticker-flap" style={flapStyle}>
            <img src={imageSrc} alt="" className="block" style={shadowImageStyle} draggable="false" onContextMenu={e => e.preventDefault()} />
          </div>
        </div>

        <div className="sticker-flap absolute w-full h-full left-0" style={flapStyle}>
          {noSpecular ? (
            <img src={imageSrc} alt="" className="block" style={shadowImageStyle} draggable="false" onContextMenu={e => e.preventDefault()} />
          ) : (
            <div style={{ filter: 'url(#pointLightFlipped)' }}>
              <img src={imageSrc} alt="" className="block" style={shadowImageStyle} draggable="false" onContextMenu={e => e.preventDefault()} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StickerPeel
