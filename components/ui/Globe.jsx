"use client"

import { useEffect, useRef, useState } from "react"
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three"
import ThreeGlobe from "three-globe"
import { useThree, Canvas, extend } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import countries from "@/data/globe.json"

extend({ ThreeGlobe })

const RING_PROPAGATION_SPEED = 3
const aspect = 1.0   // square container — must match
const cameraZ = 340  // zoomed out slightly so globe fits

function GlobeInner({ globeConfig, data }) {
  const globeRef = useRef(null)
  const groupRef = useRef()
  const [isInitialized, setIsInitialized] = useState(false)

  const cfg = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  }

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe()
      groupRef.current.add(globeRef.current)
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return
    const mat = globeRef.current.globeMaterial()
    mat.color = new Color(cfg.globeColor)
    mat.emissive = new Color(cfg.emissive)
    mat.emissiveIntensity = cfg.emissiveIntensity
    mat.shininess = cfg.shininess
  }, [isInitialized, cfg.globeColor, cfg.emissive, cfg.emissiveIntensity, cfg.shininess])

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return

    // Build deduped point list from arc endpoints
    const points = data.flatMap((arc) => [
      { size: cfg.pointSize, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng },
      { size: cfg.pointSize, order: arc.order, color: arc.color, lat: arc.endLat,   lng: arc.endLng   },
    ]).filter((v, i, a) => a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i)

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)          // lower margin = larger hexagons = more visible
      .showAtmosphere(cfg.showAtmosphere)
      .atmosphereColor(cfg.atmosphereColor)
      .atmosphereAltitude(cfg.atmosphereAltitude)
      .hexPolygonColor(() => cfg.polygonColor)

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => +d.startLat)
      .arcStartLng((d) => +d.startLng)
      .arcEndLat((d)   => +d.endLat)
      .arcEndLng((d)   => +d.endLng)
      .arcColor((d)    => d.color)
      .arcAltitude((d) => +d.arcAlt)
      .arcStroke(0.6)                  // thick enough to see clearly
      .arcDashLength(0.4)              // shorter dash = more visible gap/dash contrast
      .arcDashInitialGap((d) => +d.order * 0.5)
      .arcDashGap(4)                   // tight gap — arc looks like a bright moving dot
      .arcDashAnimateTime(() => cfg.arcTime)

    globeRef.current
      .pointsData(points)
      .pointColor((d) => d.color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(0.35)  // 0.35 degrees ≈ 40km radius — tight city dot

    globeRef.current
      .ringsData([])
      .ringColor(() => cfg.polygonColor)
      .ringMaxRadius(cfg.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((cfg.arcTime * cfg.arcLength) / cfg.rings)
  }, [isInitialized, data])

  // Pulsing rings at random arc start points
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return
    const interval = setInterval(() => {
      const picked = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5))
      globeRef.current?.ringsData(
        data.filter((_, i) => picked.includes(i)).map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [isInitialized, data])

  return <group ref={groupRef} />
}

function RendererConfig() {
  const { gl, size } = useThree()
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio)
    gl.setSize(size.width, size.height)
    gl.setClearColor(0x000000, 0) // transparent bg
  }, [gl, size])
  return null
}

export default function World({ globeConfig, data }) {
  const scene = new Scene()
  scene.fog = new Fog(0xffffff, 400, 2000)
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <RendererConfig />
      <ambientLight     color={globeConfig.ambientLight}         intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight}  position={new Vector3(-200, 500, 200)} />
      <pointLight       color={globeConfig.pointLight}           position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <GlobeInner globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={true}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  )
}

function genRandomNumbers(min, max, count) {
  const arr = []
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min
    if (!arr.includes(r)) arr.push(r)
  }
  return arr
}
