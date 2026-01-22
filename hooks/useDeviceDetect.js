import { useState, useEffect } from 'react'

export function useDeviceDetect() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
  })

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouchDevice,
      })
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return device
}

// Utility to get optimized particle count based on device
export function getParticleCount(baseCount, device) {
  if (device.isMobile) return Math.floor(baseCount * 0.3) // 30% on mobile
  if (device.isTablet) return Math.floor(baseCount * 0.6) // 60% on tablet
  return baseCount // 100% on desktop
}

// Utility to get performance tier (for additional optimizations)
export function getPerformanceTier() {
  if (typeof window === 'undefined') return 'high'

  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4

  // Check device memory if available
  const memory = navigator.deviceMemory || 4

  if (cores <= 2 || memory <= 2) return 'low'
  if (cores <= 4 || memory <= 4) return 'medium'
  return 'high'
}
