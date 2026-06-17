"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// rScale/gScale/bScale tint the wave colours (default = full RGB rainbow)
export function WebGLShader({ opacity = 1, rScale = 1.0, gScale = 1.0, bScale = 1.0, clearColor = 0x000000 }) {
  const canvasRef = useRef(null)
  const sceneRef  = useRef({
    scene: null, camera: null, renderer: null,
    mesh: null, uniforms: null, animationId: null, ro: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const refs   = sceneRef.current

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2  resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float rScale;
      uniform float gScale;
      uniform float bScale;

      void main() {
        vec2  p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d  = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);
        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        gl_FragColor = vec4(r * rScale, g * gScale, b * bScale, 1.0);
      }
    `

    refs.scene    = new THREE.Scene()
    refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    refs.renderer.setPixelRatio(window.devicePixelRatio)
    refs.renderer.setClearColor(new THREE.Color(clearColor))
    refs.camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const w = canvas.offsetWidth  || 400
    const h = canvas.offsetHeight || 300

    refs.uniforms = {
      resolution:  { value: [w, h] },
      time:        { value: 0.0 },
      xScale:      { value: 1.0 },
      yScale:      { value: 0.5 },
      distortion:  { value: 0.05 },
      rScale:      { value: rScale },
      gScale:      { value: gScale },
      bScale:      { value: bScale },
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
      -1,-1,0,  1,-1,0,  -1,1,0,
       1,-1,0, -1, 1,0,   1,1,0,
    ]), 3))

    refs.mesh = new THREE.Mesh(geo, new THREE.RawShaderMaterial({
      vertexShader, fragmentShader, uniforms: refs.uniforms, side: THREE.DoubleSide,
    }))
    refs.scene.add(refs.mesh)
    refs.renderer.setSize(w, h, false)

    const animate = () => {
      refs.uniforms.time.value += 0.008
      refs.renderer.render(refs.scene, refs.camera)
      refs.animationId = requestAnimationFrame(animate)
    }
    animate()

    refs.ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    })
    refs.ro.observe(canvas.parentElement || canvas)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      refs.ro?.disconnect()
      refs.mesh.geometry.dispose()
      refs.mesh.material.dispose()
      refs.renderer.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      display: "block", opacity,
    }} />
  )
}
