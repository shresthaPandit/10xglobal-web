"use client"

import World from "./ui/Globe"

// Arc data — 6 connections between the 4 office cities
const ARCS = [
  { order: 1, startLat: 28.6139, startLng:  77.209,  endLat: 25.2048, endLng:  55.2708, arcAlt: 0.18, color: "#F0A040" }, // Delhi → Dubai
  { order: 2, startLat: 25.2048, startLng:  55.2708, endLat:  1.3521, endLng: 103.8198, arcAlt: 0.22, color: "#F0A040" }, // Dubai → Singapore
  { order: 3, startLat: 28.6139, startLng:  77.209,  endLat:  1.3521, endLng: 103.8198, arcAlt: 0.28, color: "#F0A040" }, // Delhi → Singapore
  { order: 4, startLat: 28.6139, startLng:  77.209,  endLat: 40.7128, endLng: -74.006,  arcAlt: 0.5,  color: "#FFD580" }, // Delhi → New York
  { order: 5, startLat: 25.2048, startLng:  55.2708, endLat: 40.7128, endLng: -74.006,  arcAlt: 0.42, color: "#FFD580" }, // Dubai → New York
  { order: 6, startLat:  1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006,  arcAlt: 0.48, color: "#FFD580" }, // Singapore → New York
]

const GLOBE_CONFIG = {
  pointSize:            1,
  globeColor:           "#1e2d40",
  showAtmosphere:       true,
  atmosphereColor:      "#F7F3EE",
  atmosphereAltitude:   0.22,
  emissive:             "#0a1520",
  emissiveIntensity:    0.2,
  shininess:            0.9,
  polygonColor:         "rgba(240, 180, 80, 0.9)",
  ambientLight:         "#d4b896",
  directionalLeftLight: "#ffffff",
  directionalTopLight:  "#d4c4a8",
  pointLight:           "#F0A040",
  arcTime:              2000,
  arcLength:            0.4,
  rings:                1,
  maxRings:             3,
  autoRotate:           true,
  autoRotateSpeed:      0.8,
}

export default function GlobeWrapper() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <World globeConfig={GLOBE_CONFIG} data={ARCS} />
    </div>
  )
}
