import { cn } from '@/lib/utils'
import React from 'react'

export const Noise = ({className} : {className? : string}) => {
  return (
    <div className={cn("fixed pointer-events-none inset-0 z-0", className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          lang="en"
          className="w-full"
        >
          <filter id="noise" x="0" y="0">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65 "
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feBlend mode="screen" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
        </svg>
      </div>
  )
}
