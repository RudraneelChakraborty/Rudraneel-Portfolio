import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Cybernetic Quantum AI Core (Versatile3DScene)
 * A world-class, cinematic 3D AgentCore nucleus:
 * - Nested geometric crystal core with glowing warm orange faceted wireframe
 * - Concentric gyroscopic orbital rings with travelling energy nodes
 * - Smooth mouse inertia tracking and ambient floating solar embers
 */
export default function Versatile3DScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = container.clientWidth || window.innerWidth
    const H = container.clientHeight || window.innerHeight

    // ─── Scene & Perspective Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(W, H)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // ─── Lighting
    const ambientLight = new THREE.AmbientLight(0x1a202c, 1.2)
    scene.add(ambientLight)

    // Warm solar primary light
    const keyLight = new THREE.PointLight(0xff8066, 3.5, 35)
    keyLight.position.set(8, 6, 10)
    scene.add(keyLight)

    // Amber secondary fill light
    const fillLight = new THREE.PointLight(0xf59e0b, 2.2, 30)
    fillLight.position.set(-8, -5, 8)
    scene.add(fillLight)

    // Subtle cool rim light for high-tech contrast
    const rimLight = new THREE.DirectionalLight(0x91aaff, 1.2)
    rimLight.position.set(0, 10, -10)
    scene.add(rimLight)

    // ─── Main Group (Positioned slightly to the right on desktop)
    const isMobile = window.innerWidth <= 768
    const coreGroup = new THREE.Group()
    coreGroup.position.set(isMobile ? 0 : 4.5, isMobile ? -1 : 0, 0)
    scene.add(coreGroup)

    // ─── 1. Inner Glowing Energy Crystal (Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(2.0, 1)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xff8066,
      emissive: 0xff5733,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.85,
      flatShading: true
    })
    const innerCore = new THREE.Mesh(innerGeo, innerMat)
    coreGroup.add(innerCore)

    // ─── 2. Outer Wireframe Polyhedral Lattice
    const outerGeo = new THREE.IcosahedronGeometry(3.3, 1)
    const wireframeGeo = new THREE.WireframeGeometry(outerGeo)
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xff9478,
      transparent: true,
      opacity: 0.65
    })
    const outerWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat)
    coreGroup.add(outerWireframe)

    // Outer subtle translucent faces
    const outerFaceMat = new THREE.MeshPhysicalMaterial({
      color: 0x131e2c,
      transparent: true,
      opacity: 0.28,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerFaceMat)
    coreGroup.add(outerMesh)

    // ─── 3. Concentric Gyroscopic Orbital Rings
    const ringGroup = new THREE.Group()
    coreGroup.add(ringGroup)

    const createRing = (radius, tube, color, tiltX, tiltY) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120)
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.9
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.rotation.x = tiltX
      ringMesh.rotation.y = tiltY
      return ringMesh
    }

    const ring1 = createRing(4.6, 0.035, 0xff8066, Math.PI / 3.2, Math.PI / 6)
    const ring2 = createRing(5.6, 0.028, 0xf59e0b, -Math.PI / 4, Math.PI / 3)
    const ring3 = createRing(6.6, 0.022, 0xffaa80, Math.PI / 2.2, -Math.PI / 5)
    ringGroup.add(ring1, ring2, ring3)

    // Small orbiting nodes along the rings
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const orbitalNode1 = new THREE.Mesh(nodeGeo, nodeMat)
    const orbitalNode2 = new THREE.Mesh(nodeGeo, nodeMat)
    coreGroup.add(orbitalNode1, orbitalNode2)

    // ─── 4. Ambient Floating Solar Embers
    const EMBER_COUNT = isMobile ? 35 : 75
    const emberPositions = new Float32Array(EMBER_COUNT * 3)
    const emberVelocities = new Float32Array(EMBER_COUNT * 3)
    const emberScales = new Float32Array(EMBER_COUNT)

    for (let i = 0; i < EMBER_COUNT; i++) {
      emberPositions[i * 3]     = (Math.random() - 0.5) * 26 + (isMobile ? 0 : 3)
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 18
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 16

      emberVelocities[i * 3]     = (Math.random() - 0.5) * 0.005
      emberVelocities[i * 3 + 1] = Math.random() * 0.006 + 0.002
      emberVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005

      emberScales[i] = Math.random() * 0.25 + 0.1
    }

    const emberGeo = new THREE.BufferGeometry()
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3))

    // Soft glowing circle particle texture
    const makeEmberTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(255, 140, 105, 0.85)')
      grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.25)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 32, 32)
      return new THREE.CanvasTexture(canvas)
    }

    const emberMat = new THREE.PointsMaterial({
      size: 0.45,
      map: makeEmberTexture(),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const emberCloud = new THREE.Points(emberGeo, emberMat)
    scene.add(emberCloud)

    // ─── Interaction & Physics State
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const startTime = performance.now()
    let animationId

    const handlePointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    const handleResize = () => {
      if (!container) return
      const curW = container.clientWidth || window.innerWidth
      const curH = container.clientHeight || window.innerHeight
      camera.aspect = curW / curH
      camera.updateProjectionMatrix()
      renderer.setSize(curW, curH)

      const mobile = window.innerWidth <= 768
      coreGroup.position.set(mobile ? 0 : 4.5, mobile ? -1 : 0, 0)
      coreGroup.scale.setScalar(mobile ? 0.75 : 1)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('resize', handleResize)

    // Initial mobile scale check
    if (isMobile) {
      coreGroup.scale.setScalar(0.75)
    }

    // ─── Animation Loop
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const t = (performance.now() - startTime) * 0.001

      // Mouse inertia easing
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Core rotation with organic wobble
      innerCore.rotation.x = t * 0.45 + mouse.y * 0.6
      innerCore.rotation.y = t * 0.55 + mouse.x * 0.8

      outerWireframe.rotation.x = -t * 0.25 + mouse.y * 0.4
      outerWireframe.rotation.y = -t * 0.35 + mouse.x * 0.5
      outerMesh.rotation.copy(outerWireframe.rotation)

      // Pulsing inner core glow
      const pulse = 1 + Math.sin(t * 2.2) * 0.08
      innerCore.scale.set(pulse, pulse, pulse)

      // Ring rotations
      ring1.rotation.z = t * 0.35
      ring2.rotation.z = -t * 0.28
      ring3.rotation.z = t * 0.22

      // Animate orbital nodes along paths
      const angle1 = t * 1.4
      orbitalNode1.position.set(
        Math.cos(angle1) * 4.6,
        Math.sin(angle1) * 4.6 * Math.cos(Math.PI / 3.2),
        Math.sin(angle1) * 4.6 * Math.sin(Math.PI / 3.2)
      )

      const angle2 = -t * 1.1
      orbitalNode2.position.set(
        Math.cos(angle2) * 5.6,
        Math.sin(angle2) * 5.6 * Math.cos(-Math.PI / 4),
        Math.sin(angle2) * 5.6 * Math.sin(-Math.PI / 4)
      )

      // Group reactive tilt with mouse
      coreGroup.rotation.y = mouse.x * 0.35 + Math.sin(t * 0.3) * 0.08
      coreGroup.rotation.x = -mouse.y * 0.25 + Math.cos(t * 0.25) * 0.06

      // Float ember particles upward smoothly
      const pos = emberGeo.attributes.position.array
      for (let i = 0; i < EMBER_COUNT; i++) {
        pos[i * 3]     += emberVelocities[i * 3]
        pos[i * 3 + 1] += emberVelocities[i * 3 + 1]
        pos[i * 3 + 2] += emberVelocities[i * 3 + 2]

        // Reset if drifted beyond bounds
        if (pos[i * 3 + 1] > 9) {
          pos[i * 3 + 1] = -9
          pos[i * 3] = (Math.random() - 0.5) * 26 + (window.innerWidth <= 768 ? 0 : 3)
        }
      }
      emberGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      outerGeo.dispose()
      wireframeGeo.dispose()
      wireframeMat.dispose()
      outerFaceMat.dispose()
      emberGeo.dispose()
      emberMat.dispose()
      nodeGeo.dispose()
      nodeMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      className="versatile-hero-scene"
      ref={mountRef}
      aria-hidden="true"
    />
  )
}
