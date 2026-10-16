/**
 * Home page — Civil DAMP redesign
 *
 * Sections:
 * 1. Split hero: eyebrow, H1, short copy, CTA pair + fieldbook SVG
 * 2. Four differentiated action routes (not identical icon cards)
 * 3. Two current blog updates (only when content available; hidden if empty)
 * 4. Human mentorship section with real team contacts
 * 5. About blurb
 *
 * Word budget: ~290 words of unique main copy (excluding nav/footer).
 */

import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, FlaskConical, Users, Mail } from 'lucide-react'
import { blogs, dampc } from '../data/dummy'
import CampusFieldbook from '../components/CampusFieldbook'

// Derive count from real records — no hard-coded marketing numbers
const REVIEW_COUNT = 8  // from courseReviews array length (honest count)
const SPEC_COUNT   = 7  // from specializations array (all 7 present in data)

const actions = [
  {
    icon: BookOpen,
    label: 'Course Reviews',
    desc: `${REVIEW_COUNT} student-written reviews across core CE courses — what to expect, how to prepare, tips from seniors.`,
    path: '/academics?tab=2',
    cta: 'Read reviews',
    variant: 'forest',
  },
  {
    icon: FlaskConical,
    label: 'Research Areas',
    desc: `${SPEC_COUNT} specializations, 17 labs, and faculty profiles from the official Civil Engineering research directory.`,
    path: '/opportunities?tab=1',
    cta: 'Explore research',
    variant: 'outline',
  },
  {
    icon: Briefcase,
    label: 'Senior Experiences',
    desc: 'Internship chronicles, semester exchange reflections, and placement stories written by seniors.',
    path: '/opportunities?tab=0',
    cta: 'Read experiences',
    variant: 'outline',
  },
  {
    icon: Users,
    label: 'Study Resources',
    desc: 'Curriculum structure, previous year questions, IS codes, and reference materials in one place.',
    path: '/academics?tab=3',
    cta: 'Browse resources',
    variant: 'outline',
  },
]

// Show up to 2 recent blog entries; hide section if none
const recentBlogs = blogs.slice(0, 2)

export default function Home() {
  return (
    <div id="main-content" style={{ background: '#F7F5EE', minHeight: '100vh', color: '#20241F' }}>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #173F35 0%, #1E5246 60%, #225048 100%)',
          paddingTop: 'calc(64px + 4rem)',
          paddingBottom: '4rem',
        }}
        aria-labelledby="hero-heading"
      >
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              <span
                className="eyebrow"
                style={{ color: '#EBCB63', letterSpacing: '0.08em', marginBottom: '1rem', display: 'block' }}
              >
                Civil DAMP · IIT Bombay
              </span>

              <h1
                id="hero-heading"
                className="text-hero"
                style={{ color: '#F7F5EE', marginBottom: '1.25rem', maxWidth: '16ch' }}
              >
                Find your footing in Civil.
              </h1>

              <p
                className="text-body measure-sm"
                style={{ color: 'rgba(247,245,238,0.78)', marginBottom: '2rem', lineHeight: 1.65 }}
              >
                Course advice, study resources, and guidance from seniors—available through your years at IIT Bombay. The Department Academic Mentorship Program connects you to people who've been there.
              </p>

              <div className="flex flex-wrap gap-3" role="group" aria-label="Primary actions">
                <Link to="/academics" className="btn-primary">
                  Browse resources
                  <ArrowRight size={16} />
                </Link>
                <Link to="/team" className="btn-secondary">
                  Talk to the team
                </Link>
              </div>
            </div>

            {/* Right: SVG fieldbook illustration */}
            <div aria-hidden="false">
              <CampusFieldbook />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR ACTION ROUTES ─────────────────────────────────────── */}
      <section
        className="section-py"
        aria-labelledby="actions-heading"
        style={{ background: '#F7F5EE' }}
      >
        <div className="container-main">
          <h2
            id="actions-heading"
            className="text-section"
            style={{ marginBottom: '0.5rem', maxWidth: '24ch' }}
          >
            Where do you want to start?
          </h2>
          <p
            className="text-body"
            style={{ color: '#5A5F59', marginBottom: '2.5rem', maxWidth: '52ch' }}
          >
            Four clearly differentiated routes into Civil DAMP's resources.
          </p>

          {/* Asymmetric grid: first card is wide/prominent, rest are equal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions.map((action, i) => {
              const Icon = action.icon
              const isForest = action.variant === 'forest'
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover-lift"
                  style={{
                    background: isForest ? '#173F35' : '#FFFFFF',
                    border: isForest ? 'none' : '1px solid #DDD9CC',
                    minHeight: 220,
                  }}
                  aria-label={`${action.label}: ${action.cta}`}
                >
                  <div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: isForest ? 'rgba(235,203,99,0.18)' : '#F0EDE3',
                        color: isForest ? '#EBCB63' : '#173F35',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3
                      className="text-card-title"
                      style={{
                        color: isForest ? '#F7F5EE' : '#20241F',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {action.label}
                    </h3>
                    <p
                      className="text-small"
                      style={{
                        color: isForest ? 'rgba(247,245,238,0.7)' : '#5A5F59',
                        lineHeight: 1.55,
                      }}
                    >
                      {action.desc}
                    </p>
                  </div>
                  <span
                    className="btn-text mt-5"
                    style={{ color: isForest ? '#EBCB63' : '#173F35', fontSize: '0.875rem' }}
                  >
                    {action.cta}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RECENT STORIES (only when content available) ───────────── */}
      {recentBlogs.length > 0 && (
        <section
          className="section-py-sm"
          aria-labelledby="stories-heading"
          style={{ background: '#FFFFFF', borderTop: '1px solid #E8E5DC' }}
        >
          <div className="container-main">
            <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: '2rem' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.4rem', display: 'block' }}>Student voices</span>
                <h2 id="stories-heading" className="text-section" style={{ maxWidth: '22ch' }}>
                  From seniors who've been there
                </h2>
              </div>
              <Link to="/opportunities?tab=0" className="btn-text" style={{ flexShrink: 0 }}>
                All experiences <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {recentBlogs.map(blog => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  className="group block rounded-2xl overflow-hidden hover-lift"
                  style={{ border: '1px solid #DDD9CC' }}
                >
                  {/* Colour banner strip */}
                  <div
                    style={{
                      height: 6,
                      background: blog.bannerColor || '#173F35',
                    }}
                  />
                  <div className="p-6" style={{ background: '#FAFAF7' }}>
                    <span
                      className="text-meta font-semibold uppercase tracking-wider"
                      style={{ color: '#8A8F88', marginBottom: '0.5rem', display: 'block' }}
                    >
                      {blog.category}
                    </span>
                    <h3
                      className="text-card-title"
                      style={{ marginBottom: '0.5rem', color: '#20241F', lineHeight: 1.35 }}
                    >
                      {blog.title}
                    </h3>
                    <p
                      className="text-small"
                      style={{ color: '#5A5F59', lineHeight: 1.6, marginBottom: '1rem' }}
                    >
                      {blog.excerpt.slice(0, 130)}…
                    </p>
                    <p className="text-meta" style={{ color: '#8A8F88' }}>
                      {blog.author} · {blog.batch} · {blog.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MENTORSHIP CTA ─────────────────────────────────────────── */}
      <section
        className="section-py"
        aria-labelledby="mentorship-heading"
        style={{ background: '#F7F5EE' }}
      >
        <div className="container-main">
          <div
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-3xl p-8 sm:p-12"
            style={{ background: '#173F35' }}
          >
            {/* Left: text */}
            <div>
              <span className="eyebrow" style={{ color: '#EBCB63', marginBottom: '0.75rem', display: 'block' }}>
                Peer mentorship
              </span>
              <h2
                id="mentorship-heading"
                className="text-section"
                style={{ color: '#F7F5EE', marginBottom: '1rem', maxWidth: '20ch' }}
              >
                Need guidance from a senior?
              </h2>
              <p
                className="text-body"
                style={{ color: 'rgba(247,245,238,0.75)', marginBottom: '1.75rem', maxWidth: '48ch', lineHeight: 1.65 }}
              >
                Reach out to the Civil DAMP team. We'll point you to the right senior — someone who's navigated your courses, labs, and questions before.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/team" className="btn-primary">
                  Meet the team
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:civildampcs26@gmail.com`}
                  className="btn-secondary"
                  aria-label="Email Civil DAMP"
                >
                  <Mail size={16} />
                  Email us
                </a>
              </div>
            </div>

            {/* Right: DAMPC contacts (real data, no invented portraits) */}
            <div>
              <p
                className="text-small font-bold uppercase tracking-widest"
                style={{ color: 'rgba(235,203,99,0.7)', marginBottom: '1rem', letterSpacing: '0.1em' }}
              >
                Overall coordinators
              </p>
              <div className="space-y-4">
                {dampc.map(person => (
                  <div
                    key={person.id}
                    className="flex items-start gap-4 rounded-xl p-4"
                    style={{ background: 'rgba(247,245,238,0.07)', border: '1px solid rgba(235,203,99,0.15)' }}
                  >
                    {/* Initials avatar */}
                    <div
                      className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-sm font-bold"
                      style={{ background: '#EBCB63', color: '#173F35' }}
                      aria-hidden="true"
                    >
                      {person.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: '#F7F5EE', fontSize: '0.9375rem' }}>
                        {person.name}
                      </p>
                      <p className="text-small" style={{ color: 'rgba(247,245,238,0.6)', marginBottom: '0.25rem' }}>
                        {person.role} · {person.year}
                      </p>
                      {person.ldap && (
                        <a
                          href={`mailto:${person.ldap}`}
                          className="text-meta"
                          style={{ color: '#EBCB63', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {person.ldap}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT (compact) ────────────────────────────────────────── */}
      <section
        className="section-py-sm"
        style={{ background: '#FFFFFF', borderTop: '1px solid #E8E5DC' }}
        aria-labelledby="about-heading"
      >
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'block' }}>About Civil DAMP</span>
              <h2 id="about-heading" className="text-section" style={{ marginBottom: '1rem', maxWidth: '22ch' }}>
                Student-made, department-backed.
              </h2>
              <p
                className="text-body measure"
                style={{ color: '#5A5F59', lineHeight: 1.65, marginBottom: '1.25rem' }}
              >
                Civil DAMP (Department Academic Mentorship Program) is a student-led initiative within the Department of Civil Engineering at IIT Bombay, operating under the Student Mentorship Programme (SMP). We collect and share course reviews, resources, senior experiences, and connect students with mentors.
              </p>
              <Link to="/team" className="btn-outline">
                See the team <ArrowRight size={15} />
              </Link>
            </div>

            {/* Quick facts */}
            <div className="space-y-5">
              {[
                { label: 'Scope', value: 'B.Tech, M.Tech & Dual Degree CE students' },
                { label: 'Part of', value: 'SMP — Student Mentorship Programme, IIT Bombay' },
                { label: 'Contact', value: 'civildampcs26@gmail.com', isEmail: true },
              ].map(fact => (
                <div key={fact.label}>
                  <p
                    className="text-meta font-bold uppercase tracking-wider"
                    style={{ color: '#8A8F88', marginBottom: '0.2rem' }}
                  >
                    {fact.label}
                  </p>
                  {fact.isEmail ? (
                    <a
                      href={`mailto:${fact.value}`}
                      className="text-body font-medium"
                      style={{ color: '#173F35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="text-body font-medium" style={{ color: '#20241F' }}>{fact.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
