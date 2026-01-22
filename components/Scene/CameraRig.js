import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig({ scrollProgress = 0 }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    // Base camera position based on scroll
    const baseZ = THREE.MathUtils.lerp(5, 12, scrollProgress)
    const baseY = THREE.MathUtils.lerp(0, 2, scrollProgress)

    // Mouse parallax (subtle)
    const mouseOffsetX = mouseRef.current.x * 0.3
    const mouseOffsetY = mouseRef.current.y * 0.2

    // Smooth camera movement
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseOffsetX,
      delta * 2
    )
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      baseY + mouseOffsetY,
      delta * 2
    )
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      baseZ,
      delta * 2
    )

    // Look at center with slight offset
    camera.lookAt(0, 0, 0)
  })

  return null
}
