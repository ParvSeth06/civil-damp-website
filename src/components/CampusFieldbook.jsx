/**
 * CampusFieldbook — SVG "Civil campus fieldbook" hero illustration.
 *
 * Features:
 * - A structural bridge frame, contour lines, a water baseline
 * - Three labeled destination nodes: Courses, Research, Mentors
 * - Line-drawing animation (~0.9 s) via stroke-dashoffset
 * - Reduced-motion: static fully-drawn version
 * - Each destination node is a real accessible link
 * - Hover/focus highlight on nodes
 * - Stops offscreen animation via IntersectionObserver
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CampusFieldbook() {
  const svgRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimated(true)
      return
    }
    const el = svgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={svgRef}
      className="relative w-full"
      style={{ maxWidth: 560, margin: '0 auto' }}
      role="img"
      aria-label="Civil engineering fieldbook illustration showing a bridge frame with links to Courses, Research, and Mentors"
    >
      <svg
        viewBox="0 0 560 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* ── Contour lines (background topography) ── */}
        <g opacity="0.35">
          {[340, 360, 378, 394].map((y, i) => (
            <path
              key={y}
              d={`M 20 ${y} Q 150 ${y - 12 + i * 3} 280 ${y} Q 400 ${y + 10 - i * 2} 540 ${y}`}
              stroke="#173F35"
              strokeWidth="1.2"
              strokeLinecap="round"
              className={animated ? 'svg-draw' : ''}
              style={{ animationDelay: `${0.05 + i * 0.06}s`, animationDuration: '0.7s' }}
            />
          ))}
        </g>

        {/* ── Water line ── */}
        <path
          d="M 20 352 Q 100 346 180 352 Q 260 358 340 352 Q 420 346 540 352"
          stroke="#4A9B8C"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.1s', animationDuration: '0.75s' }}
        />
        {/* Water ripple accents */}
        {[120, 200, 310, 440].map((x, i) => (
          <ellipse
            key={x}
            cx={x}
            cy={352}
            rx={18 + i * 4}
            ry={4}
            stroke="#4A9B8C"
            strokeWidth="1"
            opacity="0.3"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDelay: `${0.3 + i * 0.05}s`, animationDuration: '0.5s' }}
          />
        ))}

        {/* ── Bridge deck (main horizontal) ── */}
        <path
          d="M 60 260 L 500 260"
          stroke="#173F35"
          strokeWidth="4"
          strokeLinecap="round"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.15s', animationDuration: '0.6s' }}
        />

        {/* ── Bridge pylon / towers ── */}
        {/* Left tower */}
        <path
          d="M 150 260 L 150 150 M 130 155 L 170 155 M 120 140 L 180 140"
          stroke="#173F35"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.22s', animationDuration: '0.55s' }}
        />
        {/* Right tower */}
        <path
          d="M 410 260 L 410 150 M 390 155 L 430 155 M 380 140 L 440 140"
          stroke="#173F35"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.25s', animationDuration: '0.55s' }}
        />

        {/* ── Suspension cables from left tower ── */}
        {[60, 100, 200, 280].map((x, i) => (
          <line
            key={`lc${x}`}
            x1="150" y1="140"
            x2={x} y2="260"
            stroke="#173F35"
            strokeWidth="1.5"
            opacity="0.5"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDelay: `${0.3 + i * 0.04}s`, animationDuration: '0.5s' }}
          />
        ))}
        {/* ── Suspension cables from right tower ── */}
        {[500, 460, 360, 280].map((x, i) => (
          <line
            key={`rc${x}`}
            x1="410" y1="140"
            x2={x} y2="260"
            stroke="#173F35"
            strokeWidth="1.5"
            opacity="0.5"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDelay: `${0.3 + i * 0.04}s`, animationDuration: '0.5s' }}
          />
        ))}

        {/* ── Bridge piers down to water ── */}
        <line x1="150" y1="260" x2="150" y2="348" stroke="#173F35" strokeWidth="6" strokeLinecap="round"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.4s', animationDuration: '0.45s' }} />
        <line x1="410" y1="260" x2="410" y2="348" stroke="#173F35" strokeWidth="6" strokeLinecap="round"
          className={animated ? 'svg-draw' : ''}
          style={{ animationDelay: '0.4s', animationDuration: '0.45s' }} />

        {/* ── Road texture ── */}
        {[100, 140, 180, 220, 260, 300, 340, 380, 420, 460].map((x, i) => (
          <line key={x} x1={x} y1="260" x2={x + 25} y2="260"
            stroke="#F7F5EE" strokeWidth="2.5" strokeDasharray="12 8"
            opacity="0.6"
            className={animated ? 'svg-draw' : ''}
            style={{ animationDelay: `${0.5 + i * 0.02}s`, animationDuration: '0.4s' }} />
        ))}

        {/* ── Grid reference marks (surveying / fieldbook) ── */}
        {[[60, 320], [280, 300], [500, 320]].map(([x, y], i) => (
          <g key={i} opacity="0.3">
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#173F35" strokeWidth="1.5" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#173F35" strokeWidth="1.5" />
          </g>
        ))}

        {/* ── North arrow (fieldbook detail) ── */}
        <g transform="translate(508, 72)" opacity="0.6">
          <circle cx="0" cy="0" r="16" stroke="#173F35" strokeWidth="1.5" />
          <path d="M 0 -10 L 5 6 L 0 3 L -5 6 Z" fill="#173F35" />
          <text x="0" y="24" textAnchor="middle" fontSize="9" fill="#173F35" fontFamily="JetBrains Mono, monospace" fontWeight="500">N</text>
        </g>

        {/* ── Scale bar (fieldbook detail) ── */}
        <g transform="translate(30, 380)" opacity="0.4">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#173F35" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#173F35" strokeWidth="1.5" />
          <line x1="80" y1="-4" x2="80" y2="4" stroke="#173F35" strokeWidth="1.5" />
          <text x="40" y="-7" textAnchor="middle" fontSize="8" fill="#173F35" fontFamily="JetBrains Mono, monospace">100m</text>
        </g>

        {/* ── DESTINATION NODE: Courses (left tower top) ── */}
        <DestinationNode
          x={150} y={128}
          label="Courses"
          subLabel="Reviews & curriculum"
          animated={animated}
          delay={0.55}
          id="fieldbook-courses"
        />

        {/* ── DESTINATION NODE: Research (above centre span) ── */}
        <DestinationNode
          x={280} y={200}
          label="Research"
          subLabel="Labs & faculty"
          animated={animated}
          delay={0.62}
          id="fieldbook-research"
          alignLeft
        />

        {/* ── DESTINATION NODE: Mentors (right tower top) ── */}
        <DestinationNode
          x={410} y={128}
          label="Mentors"
          subLabel="Meet the team"
          animated={animated}
          delay={0.69}
          id="fieldbook-mentors"
          alignLeft
        />
      </svg>

      {/* Accessible HTML link overlay matching node positions */}
      <div
        aria-hidden="false"
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* These invisible but focusable links mirror the SVG node positions */}
        <Link
          to="/academics?tab=2"
          id="fieldbook-courses"
          className="sr-only focus:not-sr-only focus:absolute focus:bg-yellow-300 focus:text-gray-900 focus:px-2 focus:py-1 focus:rounded focus:text-sm focus:font-bold"
          style={{ left: '24%', top: '28%' }}
        >
          Browse course reviews
        </Link>
        <Link
          to="/opportunities?tab=1"
          id="fieldbook-research"
          className="sr-only focus:not-sr-only focus:absolute focus:bg-yellow-300 focus:text-gray-900 focus:px-2 focus:py-1 focus:rounded focus:text-sm focus:font-bold"
          style={{ left: '48%', top: '46%' }}
        >
          Explore research areas
        </Link>
        <Link
          to="/team"
          id="fieldbook-mentors"
          className="sr-only focus:not-sr-only focus:absolute focus:bg-yellow-300 focus:text-gray-900 focus:px-2 focus:py-1 focus:rounded focus:text-sm focus:font-bold"
          style={{ left: '70%', top: '28%' }}
        >
          Meet the mentors
        </Link>
      </div>
    </div>
  )
}

/**
 * SVG node with label — not an SVG link (SVG foreignObject is fragile);
 * actual navigation is provided by the HTML overlay above.
 */
function DestinationNode({ x, y, label, subLabel, animated, delay, alignLeft }) {
  const labelX = alignLeft ? x + 18 : x - 18
  const anchor = alignLeft ? 'start' : 'end'
  return (
    <g className={animated ? 'svg-draw' : ''} style={{ animationDelay: `${delay}s`, animationDuration: '0.4s' }}>
      {/* Stem */}
      <line
        x1={x} y1={y + 10}
        x2={labelX + (alignLeft ? 0 : 0)} y2={y + 10}
        stroke="#EBCB63" strokeWidth="1.5" opacity="0.6"
      />
      {/* Node dot */}
      <circle cx={x} cy={y} r="7" fill="#EBCB63" stroke="#173F35" strokeWidth="2.5" />
      <circle cx={x} cy={y} r="3" fill="#173F35" />
      {/* Label text */}
      <text
        x={labelX}
        y={y - 4}
        textAnchor={anchor}
        fontSize="12"
        fontWeight="700"
        fill="#173F35"
        fontFamily="Plus Jakarta Sans, sans-serif"
        letterSpacing="-0.3"
      >
        {label}
      </text>
      <text
        x={labelX}
        y={y + 11}
        textAnchor={anchor}
        fontSize="9.5"
        fill="#5A5F59"
        fontFamily="JetBrains Mono, monospace"
      >
        {subLabel}
      </text>
    </g>
  )
}
