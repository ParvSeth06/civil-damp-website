import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Academics', path: '/academics',
    children: [
      { label: 'Curriculum & Structure', path: '/academics?tab=0' },
      { label: 'Specializations & Labs', path: '/academics?tab=1' },
      { label: 'Course Reviews', path: '/academics?tab=2' },
      { label: 'Academic Resources', path: '/academics?tab=3' },
    ],
  },
  {
    label: 'Experiences', path: '/opportunities',
    children: [
      { label: 'Internship Stories', path: '/opportunities?tab=0' },
      { label: 'Research Profiles', path: '/opportunities?tab=1' },
      { label: 'Competitions & Events', path: '/opportunities?tab=2' },
    ],
  },
  { label: 'Team', path: '/team' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const dropdownTimeout = useRef(null)
  const navRef = useRef(null)

  // Close on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setOpenDropdown(null)
  }, [location])

  // Scroll-aware hide/show
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setVisible(current < lastScrollY.current || current < 80)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (path) => {
    const basePath = path.split('?')[0]
    if (basePath === '/') return location.pathname === '/'
    return location.pathname.startsWith(basePath)
  }

  const handleDropdownEnter = (label) => {
    clearTimeout(dropdownTimeout.current)
    setOpenDropdown(label)
  }
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 180)
  }

  return (
    <>
      {/* Skip-to-content link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(-110%)' }}
      >
        <div
          className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8"
          style={{
            maxWidth: 1240,
            height: 64,
            background: 'rgba(23, 63, 53, 0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(235, 203, 99, 0.15)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Civil DAMP — Home"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: '#EBCB63', color: '#173F35' }}
            >
              CE
            </div>
            <span
              className="text-base font-extrabold tracking-tight hidden sm:block"
              style={{ color: '#F7F5EE' }}
            >
              civil<span style={{ color: '#EBCB63' }}>damp</span>
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full hidden md:inline-block"
              style={{ background: 'rgba(235, 203, 99, 0.15)', color: '#EBCB63', border: '1px solid rgba(235, 203, 99, 0.3)' }}
            >
              IIT Bombay
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                onMouseLeave={() => item.children && handleDropdownLeave()}
              >
                <Link
                  to={item.path}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? openDropdown === item.label : undefined}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-150"
                  style={{
                    color: isActive(item.path) ? '#EBCB63' : 'rgba(247,245,238,0.8)',
                    background: isActive(item.path) ? 'rgba(235,203,99,0.12)' : 'transparent',
                  }}
                  onFocus={() => item.children && setOpenDropdown(item.label)}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform 0.2s',
                        transform: openDropdown === item.label ? 'rotate(180deg)' : 'none',
                        color: isActive(item.path) ? '#EBCB63' : 'rgba(247,245,238,0.5)',
                      }}
                    />
                  )}
                </Link>

                {/* Desktop dropdown */}
                {item.children && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[220px]"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div
                      className="rounded-2xl p-1.5 shadow-xl"
                      style={{ background: '#173F35', border: '1px solid rgba(235,203,99,0.2)' }}
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                          style={{ color: 'rgba(247,245,238,0.85)' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(235,203,99,0.12)'; e.currentTarget.style.color = '#EBCB63' }}
                          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'rgba(247,245,238,0.85)' }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/team"
              className="hidden sm:inline-flex btn-primary text-sm"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              Talk to a mentor
            </Link>
            <button
              className="lg:hidden p-2.5 rounded-full transition-colors"
              style={{ color: '#F7F5EE' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden"
            style={{
              background: '#173F35',
              borderTop: '1px solid rgba(235,203,99,0.15)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
              {navItems.map(item => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors"
                        style={{
                          color: isActive(item.path) ? '#EBCB63' : '#F7F5EE',
                          background: mobileExpanded === item.label ? 'rgba(235,203,99,0.1)' : 'transparent',
                        }}
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        aria-expanded={mobileExpanded === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          style={{
                            transition: 'transform 0.2s',
                            transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none',
                          }}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 py-1 space-y-0.5">
                          {item.children.map(child => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="block px-4 py-2.5 rounded-xl text-sm font-medium"
                              style={{ color: 'rgba(247,245,238,0.75)' }}
                              onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="block px-4 py-3 rounded-xl text-base font-semibold"
                      style={{ color: isActive(item.path) ? '#EBCB63' : '#F7F5EE' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 pb-1">
                <Link
                  to="/team"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Talk to a mentor
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
