import { useScroll } from '../components/Layout/SmoothScroll'

export function useScrollProgress() {
  const { scroll, limit, velocity, direction, progress } = useScroll()

  return {
    scrollY: scroll,
    scrollLimit: limit,
    scrollVelocity: velocity,
    scrollDirection: direction,
    scrollProgress: progress, // 0 to 1
  }
}
