import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollReveal(options = {}) {
  const elementRef = useRef(null)

  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    stagger = 0,
    childSelector = null,
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = elementRef.current
    if (!element) return

    const targets = childSelector
      ? element.querySelectorAll(childSelector)
      : element

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [y, opacity, duration, delay, ease, start, stagger, childSelector])

  return elementRef
}

// Hook for staggered children animation
export function useStaggerReveal(options = {}) {
  const containerRef = useRef(null)

  const {
    childSelector = ':scope > *',
    y = 40,
    opacity = 0,
    duration = 0.6,
    stagger = 0.1,
    ease = 'power2.out',
    start = 'top 80%',
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(childSelector)
    if (!children.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [childSelector, y, opacity, duration, stagger, ease, start])

  return containerRef
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [speed])

  return elementRef
}

// Hook for simple fade-in (opacity only)
export function useFadeIn(options = {}) {
  const elementRef = useRef(null)

  const {
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    start = 'top 85%',
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [duration, delay, ease, start])

  return elementRef
}

// Hook for fade-in with scale
export function useScaleFadeIn(options = {}) {
  const elementRef = useRef(null)

  const {
    scale = 0.95,
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    start = 'top 85%',
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, scale },
        {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [scale, duration, delay, ease, start])

  return elementRef
}

// Hook for text split animation
export function useTextReveal(options = {}) {
  const textRef = useRef(null)

  const {
    duration = 0.8,
    stagger = 0.02,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = textRef.current
    if (!element) return

    // Split text into words
    const text = element.innerText
    const words = text.split(' ')
    element.innerHTML = words
      .map((word) => `<span class="word-wrap"><span class="word">${word}</span></span>`)
      .join(' ')

    const wordElements = element.querySelectorAll('.word')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordElements,
        {
          y: '100%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ctx.revert()
      element.innerText = text
    }
  }, [duration, stagger, ease, start])

  return textRef
}
