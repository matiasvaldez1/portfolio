import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

const BASE_PARTICLE_COUNT = 3000

export default function ParticleText({ scrollProgress = 0, onFontLoaded, isMobile = false }) {
  const ref = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()
  const [font, setFont] = useState(null)

  const particleCount = isMobile ? Math.floor(BASE_PARTICLE_COUNT * 0.4) : BASE_PARTICLE_COUNT

  // Load font
  useEffect(() => {
    const loader = new FontLoader()
    loader.load(
      'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
      (loadedFont) => {
        setFont(loadedFont)
        onFontLoaded?.()
      }
    )
  }, [onFontLoaded])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate particles based on text
  const { positions, targetPositions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const targetPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Color palette for particles
    const colorPalette = [
      new THREE.Color('#667eea'),
      new THREE.Color('#764ba2'),
      new THREE.Color('#e771ff'),
      new THREE.Color('#00d4ff'),
    ]

    if (font) {
      // Create text geometry
      const textGeo = new TextGeometry('MATIAS', {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
      })
      textGeo.computeBoundingBox()
      textGeo.center()

      // Sample points from text surface
      const sampler = new MeshSurfaceSampler(
        new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial())
      ).build()

      const tempPosition = new THREE.Vector3()

      for (let i = 0; i < particleCount; i++) {
        sampler.sample(tempPosition)

        // Target position (text shape)
        targetPositions[i * 3] = tempPosition.x
        targetPositions[i * 3 + 1] = tempPosition.y
        targetPositions[i * 3 + 2] = tempPosition.z

        // Initial position (scattered)
        const angle = Math.random() * Math.PI * 2
        const radius = 2 + Math.random() * 6
        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6
        positions[i * 3 + 2] = Math.sin(angle) * radius

        // Velocities for animation
        velocities[i * 3] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

        // Random color
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }
    } else {
      // Fallback: random sphere distribution
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        const radius = 1 + Math.random() * 2

        targetPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * 2
        targetPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        targetPositions[i * 3 + 2] = radius * Math.cos(phi)

        positions[i * 3] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10

        velocities[i * 3] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      }
    }

    return { positions, targetPositions, colors, velocities }
  }, [font, particleCount])

  useFrame((state, delta) => {
    if (!ref.current) return

    const positionAttr = ref.current.geometry.attributes.position
    const positions = positionAttr.array

    // Lerp factor based on scroll
    const formationStrength = Math.max(0, 1 - scrollProgress * 3)
    const disperseStrength = Math.min(1, scrollProgress * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Mouse influence
      const mouseX = mouseRef.current.x * viewport.width * 0.5
      const mouseY = mouseRef.current.y * viewport.height * 0.5

      const dx = positions[i3] - mouseX
      const dy = positions[i3 + 1] - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const mouseInfluence = Math.max(0, 1 - dist / 2) * 0.1

      // Target position (either formed text or scattered)
      let targetX, targetY, targetZ

      if (formationStrength > 0.1) {
        // Move toward text formation
        targetX = targetPositions[i3]
        targetY = targetPositions[i3 + 1]
        targetZ = targetPositions[i3 + 2]
      } else {
        // Disperse outward
        const angle = (i / particleCount) * Math.PI * 20 + state.clock.elapsedTime * 0.1
        const radius = 3 + (i % 10) * 0.5 + disperseStrength * 5
        targetX = Math.cos(angle) * radius
        targetY = Math.sin(angle * 0.7) * radius * 0.5
        targetZ = Math.sin(angle) * radius
      }

      // Lerp toward target
      const lerpFactor = 0.05
      positions[i3] += (targetX - positions[i3]) * lerpFactor + mouseInfluence * dx
      positions[i3 + 1] += (targetY - positions[i3 + 1]) * lerpFactor + mouseInfluence * dy
      positions[i3 + 2] += (targetZ - positions[i3 + 2]) * lerpFactor

      // Add some organic movement
      positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.001
      positions[i3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001
    }

    positionAttr.needsUpdate = true

    // Fade based on scroll
    ref.current.material.opacity = Math.max(0.1, 1 - scrollProgress * 2)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
