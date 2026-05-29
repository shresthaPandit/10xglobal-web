"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

// 4 office cities — markers glow in copper (#C17F3E)
const OFFICE_MARKERS = [
  { location: [28.6139,   77.209  ], size: 0.07 }, // Delhi
  { location: [25.2048,   55.2708 ], size: 0.07 }, // Dubai
  { location: [ 1.3521,  103.8198 ], size: 0.07 }, // Singapore
  { location: [40.7128,  -74.006  ], size: 0.07 }, // New York
]

export default function Globe({ size = 580 }) {
  const canvasRef = useRef(null)
  const phi       = useRef(1.5) // start facing India/Middle East region

  useEffect(() => {
    if (!canvasRef.current) return

    const dpr    = Math.min(window.devicePixelRatio ?? 1, 2)
    const width  = size * dpr
    const height = size * dpr

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width,
      height,
      phi:           1.5,
      theta:         0.2,
      dark:          0.9,          // dark globe — continents visible, copper dots pop
      diffuse:       1.8,
      mapSamples:    25000,        // higher = sharper continent outlines
      mapBrightness: 8,
      baseColor:   [0.16, 0.14, 0.11], // deep warm dark ocean
      markerColor: [0.757, 0.498, 0.243], // copper #C17F3E
      glowColor:   [0.97, 0.95, 0.92],   // warm cream glow — bleeds into page bg
      markers: OFFICE_MARKERS,
      onRender(state) {
        phi.current += 0.005       // slightly faster — clearly animating
        state.phi = phi.current
      },
    })

    return () => globe.destroy()
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  )
}
