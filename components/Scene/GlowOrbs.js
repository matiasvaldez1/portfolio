import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function GlowOrb({ position, color, size, speed }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  )
}

export default function GlowOrbs({ scrollProgress = 0, isMobile = false }) {
  const groupRef = useRef()

  const orbs = useMemo(() => {
    const colors = ['#667eea', '#e771ff', '#00d4ff', '#764ba2']
    const allOrbs = [
      { position: [-4, 2, -3], color: colors[0], size: 0.3, speed: 1.5 },
      { position: [4, -1, -2], color: colors[1], size: 0.25, speed: 2 },
      { position: [-3, -2, -4], color: colors[2], size: 0.35, speed: 1.2 },
      { position: [3, 3, -5], color: colors[3], size: 0.2, speed: 1.8 },
      { position: [0, -3, -3], color: colors[0], size: 0.28, speed: 1.6 },
      { position: [-5, 0, -6], color: colors[2], size: 0.22, speed: 2.2 },
    ]
    // Reduce orbs on mobile
    return isMobile ? allOrbs.slice(0, 3) : allOrbs
  }, [isMobile])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle rotation of the group
      groupRef.current.rotation.y += delta * 0.05

      // Fade based on scroll
      groupRef.current.children.forEach((child) => {
        if (child.material) {
          child.material.opacity = Math.max(0.1, 0.6 - scrollProgress * 0.5)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <GlowOrb key={i} {...orb} />
      ))}
    </group>
  )
}
