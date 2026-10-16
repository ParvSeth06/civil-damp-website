import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * HeroSlideshow — Auto-advancing image carousel.
 *
 * How it works:
 *   In Vite, import.meta.glob eagerly imports every file matching the pattern.
 *   Drop any number of images into /public/hero-slides/ and they'll be picked
 *   up automatically. The slideshow cycles every `interval` ms (default 5 000).
 */

// Eagerly import every image inside the hero-slides folder.
// Vite resolves these at build-time so the list is static per build.
const imageModules = import.meta.glob('/public/hero-slides/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Sort by filename so ordering is predictable (1.jpg, 2.jpg, …)
const slides = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)

export default function HeroSlideshow({ interval = 5000 }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval])

  if (slides.length === 0) {
    return (
      <div className="w-full h-[320px] sm:h-[440px] lg:h-[540px] bg-neutral-200 rounded-3xl flex items-center justify-center text-neutral-500 text-sm">
        <p>Add images to <code className="bg-neutral-100 px-2 py-0.5 rounded text-xs">/public/hero-slides/</code> to enable the slideshow</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[540px] rounded-3xl overflow-hidden group">
      {/* Slides */}
      {slides.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          loading={idx === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === current
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
