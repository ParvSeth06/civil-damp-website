import { useEffect, useRef, useState } from 'react'

/**
 * BuildingAnimation – SVG building that "constructs" as user scrolls.
 * Each floor, beam, window, and crane element fades/slides in based on scroll progress.
 */
export default function BuildingAnimation() {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // progress 0 → 1 as hero scrolls from top to out of view
      const raw = 1 - (rect.bottom / (rect.height + windowHeight))
      setProgress(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper: returns opacity & transform based on progress thresholds
  const reveal = (start, end, direction = 'up') => {
    const p = Math.max(0, Math.min(1, (progress - start) / (end - start)))
    const translate = direction === 'up' ? `translateY(${(1 - p) * 30}px)` :
                      direction === 'left' ? `translateX(${(1 - p) * -30}px)` :
                      direction === 'right' ? `translateX(${(1 - p) * 30}px)` :
                      `translateY(${(1 - p) * -20}px)`
    return {
      opacity: p,
      transform: translate,
      transition: 'opacity 0.1s ease, transform 0.1s ease',
    }
  }

  const gold = '#c9a84c'
  const darkSteel = '#94a3b8'
  const concrete = '#334155'
  const glass = 'rgba(201, 168, 76, 0.15)'

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 800 600"
        className="absolute bottom-0 right-0 w-full h-full"
        style={{ opacity: 0.12 + progress * 0.18 }}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Ground / Foundation */}
        <g style={reveal(0, 0.08)}>
          <rect x="0" y="560" width="800" height="40" fill={concrete} rx="2" />
          {/* Foundation lines */}
          <line x1="250" y1="560" x2="600" y2="560" stroke={darkSteel} strokeWidth="3" />
          <line x1="260" y1="555" x2="590" y2="555" stroke={darkSteel} strokeWidth="1.5" strokeDasharray="8 4" />
        </g>

        {/* Main Building - Floor 1 (base) */}
        <g style={reveal(0.06, 0.18)}>
          {/* Left pillar */}
          <rect x="300" y="460" width="20" height="100" fill={darkSteel} rx="2" />
          {/* Right pillar */}
          <rect x="530" y="460" width="20" height="100" fill={darkSteel} rx="2" />
          {/* Floor slab */}
          <rect x="290" y="455" width="270" height="10" fill={concrete} rx="1" />
          {/* Cross beams */}
          <line x1="320" y1="460" x2="530" y2="520" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
          <line x1="530" y1="460" x2="320" y2="520" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Floor 1 Windows */}
        <g style={reveal(0.14, 0.22)}>
          <rect x="340" y="475" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="400" y="475" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="460" y="475" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
        </g>

        {/* Floor 2 */}
        <g style={reveal(0.18, 0.3)}>
          <rect x="300" y="360" width="20" height="100" fill={darkSteel} rx="2" />
          <rect x="530" y="360" width="20" height="100" fill={darkSteel} rx="2" />
          <rect x="290" y="355" width="270" height="10" fill={concrete} rx="1" />
          <line x1="320" y1="360" x2="530" y2="420" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
          <line x1="530" y1="360" x2="320" y2="420" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Floor 2 Windows */}
        <g style={reveal(0.26, 0.34)}>
          <rect x="340" y="375" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="400" y="375" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="460" y="375" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
        </g>

        {/* Floor 3 */}
        <g style={reveal(0.3, 0.42)}>
          <rect x="300" y="260" width="20" height="100" fill={darkSteel} rx="2" />
          <rect x="530" y="260" width="20" height="100" fill={darkSteel} rx="2" />
          <rect x="290" y="255" width="270" height="10" fill={concrete} rx="1" />
          <line x1="320" y1="260" x2="530" y2="320" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
          <line x1="530" y1="260" x2="320" y2="320" stroke={darkSteel} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Floor 3 Windows */}
        <g style={reveal(0.38, 0.46)}>
          <rect x="340" y="275" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="400" y="275" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
          <rect x="460" y="275" width="50" height="65" fill={glass} rx="2" stroke={gold} strokeWidth="0.5" />
        </g>

        {/* Roof */}
        <g style={reveal(0.44, 0.55)}>
          <rect x="285" y="248" width="280" height="12" fill={concrete} rx="2" />
          <rect x="370" y="235" width="110" height="18" fill={concrete} rx="2" />
        </g>

        {/* Crane - Tower */}
        <g style={reveal(0.1, 0.25, 'up')}>
          <rect x="195" y="180" width="12" height="380" fill={gold} rx="1" />
          {/* Crane lattice */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <g key={`lattice-${i}`}>
              <line x1="195" y1={180 + i * 42} x2="207" y2={180 + (i + 1) * 42} stroke={gold} strokeWidth="0.7" opacity="0.6" />
              <line x1="207" y1={180 + i * 42} x2="195" y2={180 + (i + 1) * 42} stroke={gold} strokeWidth="0.7" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* Crane - Arm */}
        <g style={reveal(0.25, 0.4, 'left')}>
          <rect x="140" y="175" width="200" height="8" fill={gold} rx="1" />
          {/* Counter weight */}
          <rect x="140" y="165" width="25" height="18" fill={concrete} rx="2" />
          {/* Cable */}
          <line x1="300" y1="183" x2="300" y2="260" stroke={gold} strokeWidth="1" strokeDasharray="4 3" />
          {/* Hook */}
          <circle cx="300" cy="265" r="5" fill="none" stroke={gold} strokeWidth="1.5" />
        </g>

        {/* Crane - Top */}
        <g style={reveal(0.35, 0.45, 'down')}>
          {/* Crane cabin */}
          <rect x="193" y="168" width="16" height="14" fill={concrete} rx="2" />
          {/* Diagonal support cables */}
          <line x1="201" y1="168" x2="145" y2="178" stroke={gold} strokeWidth="0.8" />
          <line x1="201" y1="168" x2="335" y2="178" stroke={gold} strokeWidth="0.8" />
        </g>

        {/* Smaller building on right */}
        <g style={reveal(0.5, 0.65)}>
          <rect x="620" y="420" width="15" height="140" fill={darkSteel} rx="1" />
          <rect x="720" y="420" width="15" height="140" fill={darkSteel} rx="1" />
          <rect x="615" y="415" width="125" height="8" fill={concrete} rx="1" />
          <rect x="615" y="490" width="125" height="8" fill={concrete} rx="1" />
        </g>

        {/* Smaller building windows */}
        <g style={reveal(0.6, 0.72)}>
          <rect x="645" y="430" width="35" height="50" fill={glass} rx="1" stroke={gold} strokeWidth="0.4" />
          <rect x="690" y="430" width="35" height="50" fill={glass} rx="1" stroke={gold} strokeWidth="0.4" />
          <rect x="645" y="500" width="35" height="50" fill={glass} rx="1" stroke={gold} strokeWidth="0.4" />
          <rect x="690" y="500" width="35" height="50" fill={glass} rx="1" stroke={gold} strokeWidth="0.4" />
        </g>

        {/* Smaller building roof */}
        <g style={reveal(0.68, 0.78)}>
          <rect x="610" y="410" width="135" height="10" fill={concrete} rx="2" />
        </g>

        {/* Blueprint grid lines on ground */}
        <g style={reveal(0, 0.1)} opacity="0.15">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
            <line key={`grid-h-${i}`} x1="0" y1={560 + i * 2.5} x2="800" y2={560 + i * 2.5} stroke={gold} strokeWidth="0.3" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(i => (
            <line key={`grid-v-${i}`} x1={i * 42} y1="560" x2={i * 42} y2="600" stroke={gold} strokeWidth="0.3" />
          ))}
        </g>

        {/* Construction particles / sparks */}
        <g style={reveal(0.5, 0.7)}>
          {[0, 1, 2, 3, 4].map(i => (
            <circle key={`spark-${i}`} cx={310 + i * 15} cy={250 - i * 3} r={1.5 - i * 0.2} fill={gold} opacity={0.6 - i * 0.1}>
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Scaffolding on main building */}
        <g style={reveal(0.15, 0.5)}>
          {/* Vertical scaffolding */}
          <line x1="280" y1="260" x2="280" y2="560" stroke={darkSteel} strokeWidth="1" opacity="0.3" />
          <line x1="560" y1="260" x2="560" y2="560" stroke={darkSteel} strokeWidth="1" opacity="0.3" />
          {/* Horizontal scaffolding platforms */}
          <line x1="275" y1="355" x2="565" y2="355" stroke={darkSteel} strokeWidth="0.8" opacity="0.25" />
          <line x1="275" y1="455" x2="565" y2="455" stroke={darkSteel} strokeWidth="0.8" opacity="0.25" />
        </g>

        {/* Antenna on roof */}
        <g style={reveal(0.75, 0.9, 'up')}>
          <line x1="425" y1="235" x2="425" y2="190" stroke={darkSteel} strokeWidth="2" />
          <circle cx="425" cy="188" r="3" fill={gold} />
          <line x1="418" y1="200" x2="432" y2="200" stroke={darkSteel} strokeWidth="1" />
          <line x1="420" y1="210" x2="430" y2="210" stroke={darkSteel} strokeWidth="0.8" />
        </g>

        {/* Floating dust / atmosphere particles */}
        <g opacity="0.3">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <circle key={`dust-${i}`} cx={100 + i * 130} cy={300 + (i % 3) * 80} r={1} fill={gold}>
              <animate attributeName="cy" values={`${300 + (i % 3) * 80};${280 + (i % 3) * 80};${300 + (i % 3) * 80}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  )
}
