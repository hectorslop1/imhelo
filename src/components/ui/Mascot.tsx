import Image from 'next/image'

// ─── Mascot pose config ───────────────────────────────────────────────────────
//
// To swap a pose: update the path value here.
// To add a new pose: add a key + drop the asset in /public/assetshelo/helomascot/
// The component reads from this map — nothing else in the codebase needs to change.
//
// Usage:
//   <Mascot />                  → idle, 80 px
//   <Mascot pose="wave" size={120} />

export const MASCOT_POSES = {
  idle: '/assetshelo/helomascot/Helo.png',
  wave: '/assetshelo/helomascot/Helo.png',   // replace path when wave asset is ready
  // future example:
  // celebrate: '/assetshelo/helomascot/Helo-celebrate.png',
} as const

export type MascotPose = keyof typeof MASCOT_POSES

interface MascotProps {
  pose?:      MascotPose
  size?:      number
  className?: string
}

export default function Mascot({
  pose      = 'idle',
  size      = 80,
  className = '',
}: MascotProps) {
  return (
    <div
      className={`relative select-none pointer-events-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src={MASCOT_POSES[pose]}
        alt="HELO brand character"
        fill
        className="object-contain"
      />
    </div>
  )
}
