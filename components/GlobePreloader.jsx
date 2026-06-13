"use client"

import { useEffect } from "react"

export default function GlobePreloader() {
  useEffect(() => {
    // Kick off the import chain for the globe after the page has painted.
    // requestIdleCallback ensures this runs when the browser is free,
    // not during the critical rendering path.
    const run = () => {
      import("@/components/GlobeGeography")
      import("three-globe")
      import("@react-three/fiber")
      import("@react-three/drei")
    }
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(run, { timeout: 3000 })
    } else {
      setTimeout(run, 1500)
    }
  }, [])

  return null
}
