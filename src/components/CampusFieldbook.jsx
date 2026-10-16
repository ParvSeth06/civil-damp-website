/**
 * CampusFieldbook — Engineering drawing sheet featuring an architectural bridge illustration
 * with three clearly visible, accessible, interactive destinations:
 * - Courses   → /academics?tab=2
 * - Research  → /opportunities?tab=1
 * - Mentors   → /team
 */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, FlaskConical, Users, ArrowUpRight } from 'lucide-react'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DESTINATIONS = [
  {
    id: 'courses',
    label: 'Courses',
    subLabel: 'Reviews & guides',
    path: '/academics?tab=2',
    icon: BookOpen,
    nodeX: 135,
    nodeY: 105,
    desktopPos: { top: '16%', left: '8%' },
  },
  {
    id: 'research',
    label: 'Research',
    subLabel: 'Labs & faculty',
    path: '/opportunities?tab=1',
    icon: FlaskConical,
    nodeX: 280,
    nodeY: 175,
    desktopPos: { top: '48%', left: '50%', transform: 'translate(-50%, -50%)' },
  },
  {
    id: 'mentors',
    label: 'Mentors',
    subLabel: 'Meet the team',
    path: '/team',
    icon: Users,
    nodeX: 425,
    nodeY: 105,
    desktopPos: { top: '16%', right: '8%' },
  },
]

export default function CampusFieldbook() {
  const containerRef = useRef(null)
  const [animated, setAnimated] = useState(prefersReducedMotion)
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimated(true)
      return
    }
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
      style={{
        background: '#FAF8F2',
        border: '1.5px solid #DDD9CC',
        maxWidth: 580,
        margin: '0 auto',
      }}
    >
      {/* ── Drafting Sheet Header ── */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{
          background: '#F0EDE3',
          borderColor: '#DDD9CC',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#173F35' }}
            aria-hidden="true"
          />
          <span
            className="font-mono text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#173F35' }}
          >
            CIVIL DAMP · FIELDBOOK
          </span>
        </div>
        <span
          className="font-mono text-[11px] font-medium"
          style={{ color: '#8A8F88' }}
        >
          DWG NO. 01 — EXPLORE
        </span>
      </div>

      {/* ── Visual Canvas Container ── */}
      <div className="relative p-3 sm:p-5">
        {/* Architectural drawing SVG (strictly decorative, hidden from screen readers) */}
        <svg
          viewBox="0 0 560 330"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block select-none"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* Subtle engineering grid lines */}
          <g opacity="0.18">
            {[60, 120, 180, 240, 300].map(y => (
              <line key={`gh-${y}`} x1="20" y1={y} x2="540" y2={y} stroke="#173F35" strokeWidth="0.75" strokeDasharray="3 4" />
            ))}
            {[100, 190, 280, 370, 460].map(x => (
              <line key={`gv-${x}`} x1={x} y1="30" x2={x} y2="310" stroke="#173F35" strokeWidth="0.75" strokeDasharray="3 4" />
            ))}
          </g>

          {/* Water baseline */}
          <path
            d="M 20 290 Q 150 285 280 290 Q 410 295 540 290"
            stroke="#2B6256"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDuration: '0.7s' }}
          />
          <path
            d="M 60 302 Q 200 298 340 302 Q 440 304 500 302"
            stroke="#2B6256"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDuration: '0.8s', animationDelay: '0.1s' }}
          />

          {/* Main horizontal bridge deck */}
          <line
            x1="40"
            y1="220"
            x2="520"
            y2="220"
            stroke="#173F35"
            strokeWidth="4"
            strokeLinecap="round"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}
          />

          {/* Left Tower */}
          <g>
            <path
              d="M 135 220 L 135 70 M 118 78 L 152 78 M 125 125 L 145 125"
              stroke="#173F35"
              strokeWidth={hoveredNode === 'courses' ? '4' : '3'}
              strokeLinecap="round"
              className={animated ? 'svg-draw transition-all duration-200' : 'transition-all duration-200'}
              style={{ animationDuration: '0.5s', animationDelay: '0.15s' }}
            />
            {/* Pier below deck */}
            <line
              x1="135" y1="220" x2="135" y2="288"
              stroke="#173F35" strokeWidth="5.5" strokeLinecap="round"
              className={animated ? 'svg-draw' : ''}
              style={{ animationDuration: '0.4s', animationDelay: '0.2s' }}
            />
          </g>

          {/* Right Tower */}
          <g>
            <path
              d="M 425 220 L 425 70 M 408 78 L 442 78 M 415 125 L 435 125"
              stroke="#173F35"
              strokeWidth={hoveredNode === 'mentors' ? '4' : '3'}
              strokeLinecap="round"
              className={animated ? 'svg-draw transition-all duration-200' : 'transition-all duration-200'}
              style={{ animationDuration: '0.5s', animationDelay: '0.15s' }}
            />
            {/* Pier below deck */}
            <line
              x1="425" y1="220" x2="425" y2="288"
              stroke="#173F35" strokeWidth="5.5" strokeLinecap="round"
              className={animated ? 'svg-draw' : ''}
              style={{ animationDuration: '0.4s', animationDelay: '0.2s' }}
            />
          </g>

          {/* Main Arch / Suspension Catenaries */}
          <path
            d="M 40 220 Q 135 110 280 205 Q 425 110 520 220"
            stroke="#173F35"
            strokeWidth={hoveredNode === 'research' ? '3' : '2'}
            strokeLinecap="round"
            className={animated ? 'svg-draw transition-all duration-200' : 'transition-all duration-200'}
            style={{ animationDuration: '0.65s', animationDelay: '0.2s' }}
          />

          {/* Left Stay Cables */}
          {[60, 95, 180, 225].map((x, i) => (
            <line
              key={`c-left-${x}`}
              x1="135"
              y1="75"
              x2={x}
              y2="220"
              stroke="#173F35"
              strokeWidth="1.2"
              opacity={hoveredNode === 'courses' ? '0.85' : '0.4'}
              className={animated ? 'svg-draw transition-opacity duration-200' : 'transition-opacity duration-200'}
              style={{ animationDuration: '0.45s', animationDelay: `${0.25 + i * 0.04}s` }}
            />
          ))}

          {/* Right Stay Cables */}
          {[335, 380, 465, 500].map((x, i) => (
            <line
              key={`c-right-${x}`}
              x1="425"
              y1="75"
              x2={x}
              y2="220"
              stroke="#173F35"
              strokeWidth="1.2"
              opacity={hoveredNode === 'mentors' ? '0.85' : '0.4'}
              className={animated ? 'svg-draw transition-opacity duration-200' : 'transition-opacity duration-200'}
              style={{ animationDuration: '0.45s', animationDelay: `${0.25 + i * 0.04}s` }}
            />
          ))}

          {/* Center Vertical Suspenders */}
          {[250, 280, 310].map((x, i) => (
            <line
              key={`c-center-${x}`}
              x1={x}
              y1="205"
              x2={x}
              y2="220"
              stroke="#173F35"
              strokeWidth="1.5"
              opacity={hoveredNode === 'research' ? '0.9' : '0.45'}
              className={animated ? 'svg-draw transition-opacity duration-200' : 'transition-opacity duration-200'}
              style={{ animationDuration: '0.4s', animationDelay: `${0.3 + i * 0.04}s` }}
            />
          ))}

          {/* Structural node markers */}
          <circle cx="135" cy="72" r="5" fill="#EBCB63" stroke="#173F35" strokeWidth="2" />
          <circle cx="425" cy="72" r="5" fill="#EBCB63" stroke="#173F35" strokeWidth="2" />
          <circle cx="280" cy="205" r="5" fill="#EBCB63" stroke="#173F35" strokeWidth="2" />
        </svg>

        {/* ── Desktop Interactive Navigation Overlay ── */}
        <nav
          aria-label="Direct fieldbook destinations"
          className="hidden sm:block absolute inset-0 pointer-events-none"
        >
          {DESTINATIONS.map(dest => {
            const isHovered = hoveredNode === dest.id
            const Icon = dest.icon
            return (
              <Link
                key={dest.id}
                to={dest.path}
                onMouseEnter={() => setHoveredNode(dest.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode(dest.id)}
                onBlur={() => setHoveredNode(null)}
                className="group pointer-events-auto absolute flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173F35] focus-visible:outline-offset-2"
                style={{
                  ...dest.desktopPos,
                  background: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.94)',
                  border: isHovered ? '1.5px solid #173F35' : '1.5px solid #DDD9CC',
                  boxShadow: isHovered
                    ? '0 8px 20px -4px rgba(23, 63, 53, 0.16)'
                    : '0 3px 10px rgba(0, 0, 0, 0.04)',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  minHeight: 46,
                }}
                aria-label={`${dest.label}: ${dest.subLabel}`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 shrink-0"
                  style={{
                    background: isHovered ? '#173F35' : '#F0EDE3',
                    color: isHovered ? '#EBCB63' : '#173F35',
                  }}
                >
                  <Icon size={15} />
                </div>
                <div className="text-left pr-1">
                  <div className="flex items-center gap-1">
                    <span
                      className="font-bold text-sm leading-tight transition-colors"
                      style={{ color: '#20241F' }}
                    >
                      {dest.label}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: '#173F35' }}
                    />
                  </div>
                  <span
                    className="font-mono text-[11px] block leading-tight mt-0.5"
                    style={{ color: '#5A5F59' }}
                  >
                    {dest.subLabel}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* ── Mobile Navigation Bar (Clean, accessible, tap-friendly ≥44px buttons below drawing) ── */}
      <nav
        aria-label="Direct fieldbook destinations (mobile)"
        className="sm:hidden grid grid-cols-3 gap-1.5 p-2.5 border-t"
        style={{
          background: '#F0EDE3',
          borderColor: '#DDD9CC',
        }}
      >
        {DESTINATIONS.map(dest => {
          const Icon = dest.icon
          return (
            <Link
              key={dest.id}
              to={dest.path}
              className="flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl text-center transition-colors active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173F35]"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDD9CC',
                minHeight: 52,
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center mb-1"
                style={{ background: '#FAF8F2', color: '#173F35' }}
              >
                <Icon size={14} />
              </div>
              <span className="font-bold text-xs" style={{ color: '#20241F' }}>
                {dest.label}
              </span>
              <span className="font-mono text-[9px]" style={{ color: '#8A8F88' }}>
                {dest.subLabel.split('&')[0]}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
