import { useEffect, useState, useMemo } from 'react'

export default function Loader({ isReady, minDuration = 1500 }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Generate particle positions once
  const particles = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: ['#667eea', '#e771ff', '#00d4ff'][i % 3],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    })),
  [])

  // Minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, minDuration)
    return () => clearTimeout(timer)
  }, [minDuration])

  // Animate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90 && !isReady) return prev
        if (prev >= 100) return 100
        return prev + (isReady ? 10 : 2)
      })
    }, 50)
    return () => clearInterval(interval)
  }, [isReady])

  // Hide when ready
  useEffect(() => {
    if (isReady && minTimeElapsed && progress >= 100) {
      setIsFading(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isReady, minTimeElapsed, progress])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#050510',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      {/* Animated particles background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: p.width + 'px',
              height: p.height + 'px',
              borderRadius: '50%',
              background: p.color,
              left: p.left + '%',
              top: p.top + '%',
              opacity: 0.6,
              animation: `loaderFloat ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Logo/Name */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #e771ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
          letterSpacing: '-0.02em',
        }}
      >
        MATIAS
      </h1>

      {/* Progress bar container */}
      <div
        style={{
          width: 'min(300px, 80vw)',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #667eea, #e771ff)',
            borderRadius: '2px',
            transition: 'width 0.3s ease-out',
            boxShadow: '0 0 20px rgba(231, 113, 255, 0.5)',
          }}
        />
      </div>

      {/* Progress text */}
      <p
        style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.5)',
          fontWeight: 500,
          letterSpacing: '0.1em',
        }}
      >
        {Math.min(Math.round(progress), 100)}%
      </p>

      {/* Floating animation keyframes */}
      <style jsx global>{`
        @keyframes loaderFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
