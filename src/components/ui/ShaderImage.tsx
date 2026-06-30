'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { Renderer, Triangle, Program, Mesh, Texture } from 'ogl'

// ─── ShaderImage ──────────────────────────────────────────────────────────────
//
// A full-bleed WebGL image stage that cross-fades through `srcs` with a liquid
// displacement + chromatic-aberration morph and a slow Ken-Burns zoom — the kind
// of cinematic image transition that pushes a case-study hero past a plain CSS
// cross-fade. Compositor-cheap (one fullscreen triangle, one program).
//
// Resilient by design:
//   • A plain <img> poster (srcs[0], object-cover) sits behind the canvas and is
//     the ONLY thing shown for reduced-motion, no-WebGL, or if the GL setup throws.
//   • The canvas only fades in AFTER a successful first render with a loaded
//     texture, so a shader/context failure degrades to the static poster — never
//     a blank hero.
//
// Usage: <ShaderImage srcs={[...]} alt="…" className="absolute inset-0" />

type Props = {
  srcs: string[]
  alt?: string
  /** ms each image holds before the next morph begins */
  interval?: number
  /** ms the morph itself takes */
  transition?: number
  className?: string
  /** reports the active image index when it changes (e.g. to drive dot indicators) */
  onIndexChange?: (index: number) => void
}

// Route source images through Next's image optimizer (resize + webp) instead of
// loading multi-MB originals as raw GL textures / poster. w=1920 & q=75 are valid
// defaults (deviceSizes / qualities) so the endpoint never 400s.
const opt = (src: string, w = 1920, q = 75) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`

const VERT = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uCur;
  uniform sampler2D uNext;
  uniform vec2  uResolution;
  uniform vec2  uSizeCur;
  uniform vec2  uSizeNext;
  uniform float uProgress;   // 0..1 during a morph
  uniform float uTime;
  uniform float uZoomCur;
  uniform float uZoomNext;
  varying vec2 vUv;

  // background-size: cover, with a zoom toward centre (Ken Burns)
  vec2 coverUv(vec2 uv, vec2 res, vec2 img, float zoom) {
    float canvasRatio = res.x / res.y;
    float imageRatio  = img.x / img.y;
    vec2 u = uv;
    if (canvasRatio > imageRatio) {
      u.y = (u.y - 0.5) * (imageRatio / canvasRatio) + 0.5;
    } else {
      u.x = (u.x - 0.5) * (canvasRatio / imageRatio) + 0.5;
    }
    u = (u - 0.5) / zoom + 0.5;
    return u;
  }

  void main() {
    float p = uProgress;
    float bulge = sin(p * 3.14159265);

    // gentle liquid field — two phases so it warps like fluid, not diagonal streaks
    float nx = sin(vUv.y * 6.0 + uTime * 0.5) * cos(vUv.x * 4.0 - uTime * 0.3);
    float ny = cos(vUv.x * 5.0 - uTime * 0.45) * sin(vUv.y * 3.5 + uTime * 0.35);
    vec2 disp = vec2(nx, ny) * 0.022 * bulge;

    vec2 uvCur  = coverUv(vUv + disp + vec2(0.0, 0.035 * p),        uResolution, uSizeCur,  uZoomCur);
    vec2 uvNext = coverUv(vUv + disp - vec2(0.0, 0.035 * (1.0 - p)), uResolution, uSizeNext, uZoomNext);

    // subtle chromatic aberration peaks mid-morph (premium, not glitchy)
    float ca = 0.0032 * bulge;
    vec4 cur, nxt;
    cur.r = texture2D(uCur,  uvCur  + vec2(ca, 0.0)).r;
    cur.g = texture2D(uCur,  uvCur).g;
    cur.b = texture2D(uCur,  uvCur  - vec2(ca, 0.0)).b;
    cur.a = 1.0;
    nxt.r = texture2D(uNext, uvNext + vec2(ca, 0.0)).r;
    nxt.g = texture2D(uNext, uvNext).g;
    nxt.b = texture2D(uNext, uvNext - vec2(ca, 0.0)).b;
    nxt.a = 1.0;

    gl_FragColor = mix(cur, nxt, smoothstep(0.0, 1.0, p));
  }
`

export default function ShaderImage({
  srcs,
  alt = '',
  interval = 4200,
  transition = 1300,
  className,
  onIndexChange,
}: Props) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onIndexRef = useRef(onIndexChange)
  useEffect(() => { onIndexRef.current = onIndexChange }, [onIndexChange])

  useEffect(() => {
    if (reduced) return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || srcs.length === 0) return

    let raf = 0
    let disposed = false
    let renderer: Renderer

    try {
      renderer = new Renderer({ canvas, alpha: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    } catch {
      return // no WebGL → poster <img> remains
    }
    const gl = renderer.gl
    // If the canvas handed back a lost context (can happen on StrictMode/HMR
    // re-mount), bail to the poster fallback rather than crash on createProgram.
    if (gl.isContextLost()) return
    gl.clearColor(0, 0, 0, 0)

    // textures (start as 1x1 transparent; filled on image load)
    const sizes = srcs.map(() => [1, 1] as [number, number])
    const loaded = srcs.map(() => false)
    const textures = srcs.map(
      () =>
        new Texture(gl, {
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
          generateMipmaps: false,
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
        }),
    )
    srcs.forEach((src, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (disposed) return
        textures[i].image = img
        sizes[i] = [img.naturalWidth || 1, img.naturalHeight || 1]
        loaded[i] = true
      }
      img.src = opt(src)
    })

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCur: { value: textures[0] },
        uNext: { value: textures[Math.min(1, srcs.length - 1)] },
        uResolution: { value: [1, 1] },
        uSizeCur: { value: [1, 1] },
        uSizeNext: { value: [1, 1] },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uZoomCur: { value: 1 },
        uZoomNext: { value: 1 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })

    const resize = () => {
      const w = wrap.clientWidth || 1
      const h = wrap.clientHeight || 1
      renderer.setSize(w, h)
      program.uniforms.uResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight]
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let cur = 0
    let next = srcs.length > 1 ? 1 : 0
    let progress = 0
    let transitioning = false
    let slideStart = performance.now()
    let revealed = false
    const single = srcs.length < 2

    const KB = 0.08 // ken-burns zoom amount per slide
    const zoomFor = (now: number) => 1 + KB * Math.min((now - slideStart) / (interval + transition), 1)

    const frame = (now: number) => {
      if (disposed) return
      const u = program.uniforms
      u.uTime.value = now * 0.001

      if (!single && !transitioning && now - slideStart >= interval && loaded[next]) {
        transitioning = true
      }
      if (transitioning) {
        progress = Math.min(progress + 16.7 / transition, 1)
        if (progress >= 1) {
          cur = next
          next = (next + 1) % srcs.length
          progress = 0
          transitioning = false
          slideStart = now
          onIndexRef.current?.(cur)
        }
      }

      u.uCur.value = textures[cur]
      u.uNext.value = textures[next]
      u.uSizeCur.value = sizes[cur]
      u.uSizeNext.value = sizes[next]
      u.uProgress.value = progress
      u.uZoomCur.value = zoomFor(now)
      u.uZoomNext.value = 1 + KB * 0.15 // next eases in already slightly zoomed

      if (loaded[cur]) {
        renderer.render({ scene: mesh })
        if (!revealed) {
          revealed = true
          canvas.style.opacity = '1'
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      // NOTE: do NOT call WEBGL_lose_context here. Under StrictMode/HMR the effect
      // re-runs and reuses the SAME canvas context; losing it makes the next run's
      // gl.createProgram() return null → "attachShader must be a WebGLProgram".
      // The context is reused while mounted and GC'd by the browser on unmount.
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced, srcs, interval, transition])

  return (
    <div ref={wrapRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Poster / fallback — the only thing shown for reduced-motion or no-WebGL */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={opt(srcs[0])}
        alt={alt}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {!reduced && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0, transition: 'opacity 0.6s ease', willChange: 'opacity' }}
        />
      )}
    </div>
  )
}
