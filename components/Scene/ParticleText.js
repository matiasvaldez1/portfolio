import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 80

export default function ParticleText({ scrollProgress = 0, isMobile = false }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const randoms = new Float32Array(PARTICLE_COUNT)

    // Color palette
    const palette = [
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#a855f7'), // violet
      new THREE.Color('#818cf8'), // indigo
      new THREE.Color('#60a5fa'), // blue
      new THREE.Color('#22d3ee'), // cyan
      new THREE.Color('#f0abfc'), // pink
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 - 1

      // Random color from palette
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      velocities[i * 3] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      randoms[i] = Math.random()
    }

    return { positions, colors, velocities, randoms }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const random = particles.randoms[i]

      // Slow drift
      positions[i3] += particles.velocities[i3]
      positions[i3 + 1] += particles.velocities[i3 + 1]
      positions[i3 + 2] += particles.velocities[i3 + 2]

      // Gentle floating wave
      positions[i3] += Math.sin(time * 0.2 + random * 20) * 0.002
      positions[i3 + 1] += Math.cos(time * 0.3 + random * 20) * 0.002

      // Wrap around
      if (positions[i3] > 4) positions[i3] = -4
      if (positions[i3] < -4) positions[i3] = 4
      if (positions[i3 + 1] > 3) positions[i3 + 1] = -3
      if (positions[i3 + 1] < -3) positions[i3 + 1] = 3
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    const opacity = Math.max(0, 0.7 - scrollProgress * 1.2)
    pointsRef.current.material.opacity = opacity
  })

  // Create circular texture for softer particles
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.15 : 0.2}
        vertexColors
        transparent
        opacity={0.7}
        map={texture}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
