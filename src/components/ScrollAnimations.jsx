import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * Returns [ref, isVisible].
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/**
 * ScrollReveal — wrapper component that animates children on scroll.
 * @param {string} animation - 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade'
 * @param {number} delay - delay in ms
 * @param {number} duration - duration in ms
 */
export function ScrollReveal({ children, animation = 'fade-up', delay = 0, duration = 600, className = '', threshold = 0.15 }) {
  const [ref, isVisible] = useScrollReveal(threshold)

  // Skip all animation when user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const baseStyle = {
    transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  }

  const hiddenStyles = {
    'fade-up': { opacity: 0, transform: 'translateY(40px)' },
    'fade-down': { opacity: 0, transform: 'translateY(-40px)' },
    'fade-left': { opacity: 0, transform: 'translateX(-40px)' },
    'fade-right': { opacity: 0, transform: 'translateX(40px)' },
    'scale': { opacity: 0, transform: 'scale(0.9)' },
    'fade': { opacity: 0, transform: 'none' },
  }

  const visibleStyle = { opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...baseStyle,
        ...(isVisible ? visibleStyle : hiddenStyles[animation]),
      }}
    >
      {children}
    </div>
  )
}

/**
 * StaggerChildren — applies staggered delay to each child's reveal.
 */
export function StaggerChildren({ children, animation = 'fade-up', stagger = 100, duration = 600, className = '' }) {
  const [ref, isVisible] = useScrollReveal(0.1)
  const items = Array.isArray(children) ? children : [children]

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            transition: `opacity ${duration}ms ease ${i * stagger}ms, transform ${duration}ms ease ${i * stagger}ms`,
            ...(isVisible
              ? { opacity: 1, transform: 'translateY(0)' }
              : { opacity: 0, transform: animation === 'fade-up' ? 'translateY(30px)' : animation === 'scale' ? 'scale(0.9)' : 'translateY(0)' }
            ),
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

/**
 * AnimatedCounter — number that counts up when visible.
 */
export function AnimatedCounter({ value, duration = 1500, className = '' }) {
  const [ref, isVisible] = useScrollReveal(0.3)
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix = value.replace(/\d/g, '')

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = numericValue / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, numericValue, duration])

  return (
    <span ref={ref} className={className}>
      {isVisible ? `${count}${suffix}` : '0'}
    </span>
  )
}
