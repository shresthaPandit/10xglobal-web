"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useThree, extend } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three"
import ThreeGlobe from "three-globe"
import countries from "@/data/globe.json"

extend({ ThreeGlobe })

// Stable canvas objects — created once at module level
const _scene  = new Scene()
_scene.fog    = new Fog(0xffffff, 400, 2000)
const _camera = new PerspectiveCamera(50, 1.0, 180, 1800)

const ARCS = [
  { order: 1, startLat: 28.6139, startLng:  77.209,  endLat: 25.2048, endLng:  55.2708, arcAlt: 0.18, color: "rgba(184,50,40,0.75)"  },
  { order: 2, startLat: 25.2048, startLng:  55.2708, endLat:  1.3521, endLng: 103.8198, arcAlt: 0.22, color: "rgba(184,50,40,0.70)"  },
  { order: 3, startLat: 28.6139, startLng:  77.209,  endLat:  1.3521, endLng: 103.8198, arcAlt: 0.28, color: "rgba(184,50,40,0.65)"  },
  { order: 4, startLat: 28.6139, startLng:  77.209,  endLat: 39.7447, endLng: -75.5484, arcAlt: 0.52, color: "rgba(154,123,60,0.75)" },
  { order: 5, startLat: 25.2048, startLng:  55.2708, endLat: 39.7447, endLng: -75.5484, arcAlt: 0.44, color: "rgba(154,123,60,0.70)" },
  { order: 6, startLat:  1.3521, startLng: 103.8198, endLat: 39.7447, endLng: -75.5484, arcAlt: 0.50, color: "rgba(154,123,60,0.65)" },
]

function RendererSetup() {
  const { gl, size } = useThree()
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio)
    gl.setSize(size.width, size.height)
    gl.setClearColor(0x000000, 0)
  }, [gl, size])
  return null
}

function GlobeScene() {
  const groupRef = useRef()
  const globeRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (globeRef.current || !groupRef.current) return
    globeRef.current = new ThreeGlobe()
    groupRef.current.add(globeRef.current)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!globeRef.current || !ready) return
    const mat = globeRef.current.globeMaterial()
    mat.color             = new Color("#EDE9E1")
    mat.emissive          = new Color("#E8E4DC")
    mat.emissiveIntensity = 0.12
    mat.shininess         = 0.6
  }, [ready])

  useEffect(() => {
    if (!globeRef.current || !ready) return

    const points = ARCS.flatMap(arc => [
      { lat: arc.startLat, lng: arc.startLng },
      { lat: arc.endLat,   lng: arc.endLng   },
    ]).filter((v, i, a) => a.findIndex(v2 => v2.lat === v.lat && v2.lng === v.lng) === i)

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .showAtmosphere(true)
      .atmosphereColor("#FFFFFF")
      .atmosphereAltitude(0.12)
      .hexPolygonColor(() => "rgba(140,125,105,0.55)")
      .arcsData(ARCS)
      .arcStartLat(d => +d.startLat)
      .arcStartLng(d => +d.startLng)
      .arcEndLat(d   => +d.endLat)
      .arcEndLng(d   => +d.endLng)
      .arcColor(d    => d.color)
      .arcAltitude(d => +d.arcAlt)
      .arcStroke(1.4)
      .arcDashLength(0.4)
      .arcDashInitialGap(d => +d.order * 0.5)
      .arcDashGap(4)
      .arcDashAnimateTime(() => 2800)
      .pointsData(points)
      .pointColor(() => "#8C1A2B")
      .pointsMerge(false)
      .pointAltitude(0.0)
      .pointRadius(1.0)
  }, [ready])

  return <group ref={groupRef} />
}

export default function GlobeGeography() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas scene={_scene} camera={_camera}>
        <RendererSetup />
        <ambientLight color="#ffffff" intensity={0.6} />
        <directionalLight color="#f5efe6" position={new Vector3(-400, 100, 400)} />
        <directionalLight color="#ffffff" position={new Vector3(-200, 500, 200)} />
        <pointLight       color="#f5efe6" position={new Vector3(-200, 500, 200)} intensity={0.8} />
        <GlobeScene />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={340}
          maxDistance={340}
          autoRotate={true}
          autoRotateSpeed={0.55}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
