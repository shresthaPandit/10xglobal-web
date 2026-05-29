"use client"

import World from "./ui/Globe"

const ARCS = [
  { order: 1, startLat: 28.6139, startLng:  77.209,  endLat: 25.2048, endLng:  55.2708, arcAlt: 0.18, color: "#F0A040" },
  { order: 2, startLat: 25.2048, startLng:  55.2708, endLat:  1.3521, endLng: 103.8198, arcAlt: 0.22, color: "#F0A040" },
  { order: 3, startLat: 28.6139, startLng:  77.209,  endLat:  1.3521, endLng: 103.8198, arcAlt: 0.28, color: "#F0A040" },
  { order: 4, startLat: 28.6139, startLng:  77.209,  endLat: 40.7128, endLng: -74.006,  arcAlt: 0.5,  color: "#FFD580" },
  { order: 5, startLat: 25.2048, startLng:  55.2708, endLat: 40.7128, endLng: -74.006,  arcAlt: 0.42, color: "#FFD580" },
  { order: 6, startLat:  1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006,  arcAlt: 0.48, color: "#FFD580" },
]

const GLOBE_CONFIG = {
  pointSize:            1.2,
  globeColor:           "#0f1520",
  showAtmosphere:       true,
  atmosphereColor:      "#D48820",
  atmosphereAltitude:   0.38,
  emissive:             "#050a10",
  emissiveIntensity:    0.18,
  shininess:            0.85,
  polygonColor:         "rgba(245, 185, 70, 0.92)",
  ambientLight:         "#d4a060",
  directionalLeftLight: "#ffffff",
  directionalTopLight:  "#e8c070",
  pointLight:           "#F5B040",
  arcTime:              2000,
  arcLength:            0.4,
  rings:                1,
  maxRings:             3,
  autoRotate:           true,
  autoRotateSpeed:      0.7,
}

export default function GlobeWrapper() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <World globeConfig={GLOBE_CONFIG} data={ARCS} />
    </div>
  )
}
