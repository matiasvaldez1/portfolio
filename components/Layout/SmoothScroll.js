import { useEffect, useRef, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'

const ScrollContext = createContext({
  scroll: 0,
  limit: 0,
  velocity: 0,
  direction: 0,
  progress: 0,
})

export const useScroll = () => useContext(ScrollContext)

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const [scrollState, setScrollState] = useState({
    scroll: 0,
    limit: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      setScrollState({ scroll, limit, velocity, direction, progress })
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  )
}
