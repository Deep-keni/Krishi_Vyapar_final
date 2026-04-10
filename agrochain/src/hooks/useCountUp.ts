import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function useCountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const start = () => {
    setIsComplete(false)
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentCount = eased * end

      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsComplete(true)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const formattedCount = `${prefix}${count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`

  return { count, formattedCount, start, isComplete }
}
