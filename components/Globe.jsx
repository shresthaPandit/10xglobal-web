"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

const OFFICE_MARKERS = [
  { location: [28.6139,  77.2090 ], size: 0.08 }, // New Delhi
  { location: [25.2048,  55.2708 ], size: 0.07 }, // Dubai
  { location: [ 1.3521, 103.8198 ], size: 0.07 }, // Singapore
  { location: [39.7447, -75.5484 ], size: 0.07 }, // Wilmington, DE
]

export default function Globe({ size = 560 }) {
  const canvasRef = useRef(null)
  const phi       = useRef(1.2)

  useEffect(() => {
    if (!canvasRef.current) return

    const dpr    = Math.min(window.devicePixelRatio ?? 1, 2)
    const width  = size * dpr
    const height = size * dpr

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width,
      height,
      phi:           1.2,
      theta:         0.2,
      dark:          0,
      diffuse:       1.4,
      mapSamples:    20000,
      mapBrightness: 5,
      baseColor:   [0.93, 0.91, 0.87],
      markerColor: [0.722, 0.196, 0.157],
      glowColor:   [0.965, 0.953, 0.929],
      markers: OFFICE_MARKERS,
      onRender(state) {
        phi.current += 0.0025
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
