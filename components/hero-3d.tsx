"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const width = container.clientWidth
    const height = container.clientHeight

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // === SCENE ===
    const scene = new THREE.Scene()

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0.5, 10)
    camera.lookAt(0, 0.5, 0)

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0x1a1a3e, 0.5)
    scene.add(ambientLight)

    const careerLight = new THREE.PointLight(0x6366f1, 2, 8)
    careerLight.position.set(0, 3.5, 0)
    scene.add(careerLight)

    const studentLight = new THREE.PointLight(0x38bdf8, 1, 6)
    studentLight.position.set(0, -2.5, 0)
    scene.add(studentLight)

    // === NODE DEFINITIONS ===
    // [label, position, radius, color (hex number), emissiveIntensity]
    const nodeDefs: Array<{
      position: [number, number, number]
      radius: number
      color: number
      emissive: number
      emissiveIntensity: number
      phase: number
    }> = [
      // Student node — center bottom, electric blue
      { position: [0, -2.5, 0], radius: 0.35, color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.4, phase: 0 },
      // Skill nodes — indigo
      { position: [-1.8, 0, 0], radius: 0.25, color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3, phase: 1.0 },
      { position: [0, 0, 0.5], radius: 0.25, color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3, phase: 2.1 },
      { position: [1.8, 0, 0], radius: 0.25, color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.3, phase: 3.2 },
      // Project nodes — violet
      { position: [-1, 1.8, 0], radius: 0.25, color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.3, phase: 0.5 },
      { position: [1, 1.8, 0], radius: 0.25, color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.3, phase: 1.5 },
      // Career Ready — top center, large, glowing indigo
      { position: [0, 3.5, 0], radius: 0.45, color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.6, phase: 0 },
    ]

    const nodeMeshes: THREE.Mesh[] = []

    nodeDefs.forEach((def) => {
      const geo = new THREE.SphereGeometry(def.radius, isMobile ? 16 : 32, isMobile ? 16 : 32)
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.emissive,
        emissiveIntensity: def.emissiveIntensity,
        roughness: 0.2,
        metalness: 0.8,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...def.position)
      mesh.userData = { phase: def.phase, baseY: def.position[1] }
      scene.add(mesh)
      nodeMeshes.push(mesh)
    })

    // === EDGES ===
    // Define connections: [fromNodeIdx, toNodeIdx, color, opacity, radius]
    const edgeDefs: Array<{
      from: number
      to: number
      color: number
      opacity: number
      radius: number
    }> = [
      // Student → Skills
      { from: 0, to: 1, color: 0x38bdf8, opacity: 0.35, radius: 0.015 },
      { from: 0, to: 2, color: 0x38bdf8, opacity: 0.35, radius: 0.015 },
      { from: 0, to: 3, color: 0x38bdf8, opacity: 0.35, radius: 0.015 },
      // Skills → Projects
      { from: 1, to: 4, color: 0x6366f1, opacity: 0.35, radius: 0.015 },
      { from: 2, to: 4, color: 0x6366f1, opacity: 0.35, radius: 0.015 },
      { from: 2, to: 5, color: 0x6366f1, opacity: 0.35, radius: 0.015 },
      { from: 3, to: 5, color: 0x6366f1, opacity: 0.35, radius: 0.015 },
      // Projects → Career Ready
      { from: 4, to: 6, color: 0x8b5cf6, opacity: 0.5, radius: 0.02 },
      { from: 5, to: 6, color: 0x8b5cf6, opacity: 0.5, radius: 0.02 },
    ]

    const curves: THREE.CatmullRomCurve3[] = []

    edgeDefs.forEach((edge) => {
      const fromPos = new THREE.Vector3(...nodeDefs[edge.from].position)
      const toPos = new THREE.Vector3(...nodeDefs[edge.to].position)

      // Slight mid-point curve
      const mid = fromPos.clone().lerp(toPos, 0.5)
      mid.z += 0.5

      const curve = new THREE.CatmullRomCurve3([fromPos, mid, toPos])
      curves.push(curve)

      const tubeGeo = new THREE.TubeGeometry(curve, 20, edge.radius, 6, false)
      const tubeMat = new THREE.MeshStandardMaterial({
        color: edge.color,
        emissive: edge.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: edge.opacity,
      })
      const tube = new THREE.Mesh(tubeGeo, tubeMat)
      scene.add(tube)
    })

    // === PULSE SPHERES ===
    const pulses: Array<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; offset: number }> = []

    if (!isMobile) {
      curves.forEach((curve, i) => {
        const pulseGeo = new THREE.SphereGeometry(0.06, 8, 8)
        const pulseMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1.0,
        })
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat)
        scene.add(pulseMesh)
        pulses.push({ mesh: pulseMesh, curve, offset: (i / curves.length) })
      })
    }

    // === PARTICLE FIELD ===
    const particleCount = isMobile ? 40 : 80
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // === ANIMATION LOOP ===
    let animFrameId: number

    const animate = () => {
      animFrameId = requestAnimationFrame(animate)
      const t = performance.now() * 0.001

      // Float nodes
      nodeMeshes.forEach((mesh, i) => {
        const phase = nodeDefs[i].phase
        mesh.position.y = nodeDefs[i].position[1] + Math.sin(t * 0.8 + phase) * 0.08
      })

      // Pulse CareerReady node
      const careerNode = nodeMeshes[6]
      const pulseScale = 1 + Math.sin(t * 2) * 0.06
      careerNode.scale.setScalar(pulseScale)

      // Animate pulses along curves
      pulses.forEach((p, i) => {
        const speed = 0.4
        const progress = ((t * speed + p.offset) % 1 + 1) % 1
        const pt = p.curve.getPoint(progress)
        p.mesh.position.copy(pt)
      })

      // Slow camera orbit
      if (!isMobile) {
        camera.position.x = Math.sin(t * 0.12) * 10
        camera.position.z = Math.cos(t * 0.12) * 10
        camera.lookAt(0, 0.5, 0)
      }

      // Rotate particles slowly
      particles.rotation.y = t * 0.015

      renderer.render(scene, camera)
    }

    animate()

    // === RESIZE HANDLER ===
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", handleResize)

    // === CLEANUP ===
    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  )
}
