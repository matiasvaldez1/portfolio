import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import ParticleField from './ParticleField'
import ParticleText from './ParticleText'
import GlowOrbs from './GlowOrbs'
import CameraRig from './CameraRig'
import Loader from './Loader'

// Hook to detect mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

function Effects({ isMobile }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={isMobile ? 0.3 : 0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={isMobile ? 200 : 300}
      />
      <Noise opacity={0.02} />
    </EffectComposer>
  )
}

function SceneContent({ scrollProgress, onReady, isMobile }) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#667eea" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#e771ff" />

      <ParticleField scrollProgress={scrollProgress} isMobile={isMobile} />
      <ParticleText scrollProgress={scrollProgress} isMobile={isMobile} />
      <GlowOrbs scrollProgress={scrollProgress} isMobile={isMobile} />

      <Effects isMobile={isMobile} />
      <Preload all />
    </>
  )
}

export default function Scene({ scrollProgress = 0 }) {
  const [isReady, setIsReady] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <Loader isReady={isReady} />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <SceneContent
              scrollProgress={scrollProgress}
              onReady={() => setIsReady(true)}
              isMobile={isMobile}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
