import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const BASE_PARTICLE_COUNT = 2000

export default function ParticleField({ scrollProgress = 0, isMobile = false }) {
  const ref = useRef()
  const particleCount = isMobile ? Math.floor(BASE_PARTICLE_COUNT * 0.3) : BASE_PARTICLE_COUNT

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Color palette
    const colorPalette = [
      new THREE.Color('#667eea'), // Blue-purple
      new THREE.Color('#e771ff'), // Neon pink
      new THREE.Color('#00d4ff'), // Cyan
      new THREE.Color('#ffffff'), // White
    ]

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 8 + Math.random() * 12

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [particleCount])

  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle rotation
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.01

      // Fade based on scroll
      const opacity = 1 - scrollProgress * 0.5
      ref.current.material.opacity = Math.max(0.2, opacity)
    }
  })

  return (
    <Points ref={ref} limit={particleCount}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
