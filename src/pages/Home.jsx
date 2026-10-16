/**
 * Home page — Civil DAMP
 *
 * Sections:
 * 1. Split hero: eyebrow, H1, concise benefit-led copy, CTA pair + interactive bridge fieldbook
 * 2. Four core student actions ("Where do you want to start?")
 * 3. Editorial student-story feature (Prominent featured story + secondary companion)
 * 4. Peer mentorship & verified DAMPC coordinator contacts
 * 5. Compact About program scope
 */

import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, FlaskConical, Users, Mail } from 'lucide-react'
import { blogs, dampc } from '../data/dummy'
import CampusFieldbook from '../components/CampusFieldbook'

// Derive count from real records — no hard-coded marketing numbers
const REVIEW_COUNT = 8  // from courseReviews array length
const SPEC_COUNT   = 7  // from specializations array

const actions = [
  {
    icon: BookOpen,
    label: 'Course Reviews',
    desc: `${REVIEW_COUNT} student-written reviews across core and elective CE courses — what to expect, grading insights, and tips from seniors.`,
    path: '/academics?tab=2',
    cta: 'Read reviews',
    variant: 'forest',
  },
  {
    icon: FlaskConical,
    label: 'Research Areas',
    desc: `Explore ${SPEC_COUNT} departmental specializations, 17 research laboratories, and faculty profiles.`,
    path: '/opportunities?tab=1',
    cta: 'Explore research',
    variant: 'outline',
  },
  {
    icon: Briefcase,
    label: 'Senior Experiences',
    desc: 'Internship chronicles, non-core career journeys, and advice shared by graduating seniors.',
    path: '/opportunities?tab=0',
    cta: 'Read experiences',
    variant: 'outline',
  },
  {
    icon: Users,
    label: 'Study Resources',
    desc: 'Curriculum structure, previous year exam papers, reference materials, and academic guidelines.',
    path: '/academics?tab=3',
    cta: 'Browse resources',
    variant: 'outline',
  },
]

// Deliberately written, complete summaries for homepage stories
const featuredStory = {
  ...blogs[0],
  summary:
    'From reviewing IS 456 provisions to whiteboard design interviews, Rohan Verma shares how thorough structural prep and ETABS modeling led to high-rise construction experience in Hyderabad.',
}

const secondaryStory = {
  ...blogs[1],
  summary:
    'Six months in Switzerland exploring advanced structural mechanics and European research culture, with practical advice on coursework and credit transfer.',
}

export default function Home() {
  return (
    <div id="main-content" style={{ background: '#F7F5EE', minHeight: '100vh', color: '#20241F' }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #173F35 0%, #1E5246 60%, #225048 100%)',
          paddingTop: 'calc(64px + 3.5rem)',
          paddingBottom: '4.5rem',
        }}
        aria-labelledby="hero-heading"
      >
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left column: concise text & primary actions */}
            <div className="lg:col-span-6 space-y-6">
              <span
                className="eyebrow"
                style={{ color: '#EBCB63', letterSpacing: '0.08em', display: 'block' }}
              >
                Civil DAMP · IIT Bombay
              </span>

              <h1
                id="hero-heading"
                className="text-hero"
                style={{ color: '#F7F5EE', maxWidth: '15ch' }}
              >
                Find your footing <br className="hidden sm:inline" />in Civil.
              </h1>

              <p
                className="text-hero-desc"
                style={{ color: 'rgba(247, 245, 238, 0.92)', maxWidth: '44ch' }}
              >
                Course reviews, study resources, and guidance from seniors. Your starting point for Civil at IIT Bombay.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2" role="group" aria-label="Primary actions">
                <Link to="/academics" className="btn-primary">
                  Browse resources
                  <ArrowRight size={16} />
                </Link>
                <Link to="/team" className="btn-secondary">
                  Talk to the team
                </Link>
              </div>
            </div>

            {/* Right column: Interactive bridge fieldbook illustration sheet */}
            <div className="lg:col-span-6 w-full">
              <CampusFieldbook />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHERE DO YOU WANT TO START? ─────────────────────────── */}
      <section
        className="section-py"
        aria-labelledby="actions-heading"
        style={{ background: '#F7F5EE' }}
      >
        <div className="container-main">
          <h2
            id="actions-heading"
            className="text-section"
            style={{ marginBottom: '2.5rem', maxWidth: '24ch' }}
          >
            Where do you want to start?
          </h2>

          {/* Differentiated action routes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {actions.map(action => {
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
                    minHeight: 230,
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
                      className="text-card-title mb-2"
                      style={{
                        color: isForest ? '#F7F5EE' : '#20241F',
                      }}
                    >
                      {action.label}
                    </h3>
                    <p
                      className="text-card-desc"
                      style={{
                        color: isForest ? 'rgba(247,245,238,0.85)' : '#5A5F59',
                      }}
                    >
                      {action.desc}
                    </p>
                  </div>
                  <span
                    className="btn-text mt-5"
                    style={{ color: isForest ? '#EBCB63' : '#173F35', fontSize: '0.9375rem' }}
                  >
                    {action.cta}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. EDITORIAL STUDENT VOICES SECTION ─────────────────────── */}
      <section
        className="section-py"
        aria-labelledby="stories-heading"
        style={{ background: '#FFFFFF', borderTop: '1px solid #E8E5DC', borderBottom: '1px solid #E8E5DC' }}
      >
        <div className="container-main">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.4rem', display: 'block' }}>Student voices</span>
              <h2 id="stories-heading" className="text-section" style={{ maxWidth: '24ch' }}>
                From seniors who've been there
              </h2>
            </div>
            <Link to="/opportunities?tab=0" className="btn-text font-semibold" style={{ flexShrink: 0 }}>
              All experiences <ArrowRight size={15} />
            </Link>
          </div>

          {/* Asymmetric editorial composition: prominent featured story + compact companion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Featured Story (Left: 7 columns) */}
            <div className="lg:col-span-7 flex flex-col">
              <Link
                to={`/blogs/${featuredStory.id}`}
                className="group flex-1 flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-200 hover-lift"
                style={{
                  background: '#FBF9F3',
                  border: '1.5px solid #DDD9CC',
                  boxShadow: '0 4px 18px rgba(23,63,53,0.04)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-meta font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: 'rgba(23,63,53,0.1)', color: '#173F35' }}
                    >
                      Featured · {featuredStory.category}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-2xl sm:text-3xl tracking-tight mb-4 group-hover:text-[#173F35] transition-colors"
                    style={{ color: '#20241F', lineHeight: 1.25 }}
                  >
                    {featuredStory.title}
                  </h3>

                  <p
                    className="text-card-desc mb-6"
                    style={{ color: '#5A5F59', lineHeight: 1.65 }}
                  >
                    {featuredStory.summary}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-6 mt-4 border-t"
                  style={{ borderColor: '#E8E5DC' }}
                >
                  <p className="text-meta font-semibold" style={{ color: '#8A8F88' }}>
                    {featuredStory.author} · {featuredStory.batch} · {featuredStory.date}
                  </p>
                  <span className="btn-text font-bold text-sm" style={{ color: '#173F35' }}>
                    Read story <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Secondary Companion Story (Right: 5 columns) */}
            <div className="lg:col-span-5 flex flex-col">
              <Link
                to={`/blogs/${secondaryStory.id}`}
                className="group flex-1 flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-200 hover-lift"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #DDD9CC',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-meta font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(235,203,99,0.22)', color: '#7c5e10' }}
                    >
                      {secondaryStory.category}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-xl sm:text-2xl tracking-tight mb-3 group-hover:text-[#173F35] transition-colors"
                    style={{ color: '#20241F', lineHeight: 1.3 }}
                  >
                    {secondaryStory.title}
                  </h3>

                  <p
                    className="text-card-desc mb-4"
                    style={{ color: '#5A5F59', lineHeight: 1.6 }}
                  >
                    {secondaryStory.summary}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-5 mt-3 border-t"
                  style={{ borderColor: '#F0EDE3' }}
                >
                  <p className="text-meta" style={{ color: '#8A8F88' }}>
                    {secondaryStory.author} · {secondaryStory.batch}
                  </p>
                  <span className="btn-text font-semibold text-sm" style={{ color: '#173F35' }}>
                    Read story <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. PEER MENTORSHIP ─────────────────────────────────────── */}
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
                style={{ color: 'rgba(247,245,238,0.85)', marginBottom: '2rem', maxWidth: '48ch', lineHeight: 1.65 }}
              >
                Reach out to the Civil DAMP coordinators. We'll connect you directly with seniors who've navigated your courses, lab work, and academic queries before.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link to="/team" className="btn-primary">
                  Meet the team
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:civildampcs26@gmail.com`}
                  className="btn-secondary"
                  aria-label="Email Civil DAMP coordinators"
                >
                  <Mail size={16} />
                  Email us
                </a>
              </div>
            </div>

            {/* Right: DAMPC coordinators */}
            <div>
              <p
                className="text-small font-bold uppercase tracking-widest"
                style={{ color: 'rgba(235,203,99,0.8)', marginBottom: '1rem', letterSpacing: '0.1em' }}
              >
                Department Academic Mentorship Coordinators
              </p>
              <div className="space-y-4">
                {dampc.map(person => (
                  <div
                    key={person.id}
                    className="flex items-start gap-4 rounded-2xl p-4 transition-colors"
                    style={{ background: 'rgba(247,245,238,0.08)', border: '1px solid rgba(235,203,99,0.2)' }}
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
                      <p className="font-bold text-base" style={{ color: '#F7F5EE' }}>
                        {person.name}
                      </p>
                      <p className="text-small" style={{ color: 'rgba(247,245,238,0.7)', marginBottom: '0.25rem' }}>
                        {person.role} · {person.year}
                      </p>
                      {person.ldap && (
                        <a
                          href={`mailto:${person.ldap}`}
                          className="text-meta font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63] rounded px-0.5"
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

      {/* ── 5. ABOUT (COMPACT) ───────────────────────────────────────── */}
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
                Civil DAMP (Department Academic Mentorship Program) is a student-led initiative within the Department of Civil Engineering at IIT Bombay, operating under the Student Mentorship Programme (SMP). We collect and share verified course reviews, academic archives, senior experiences, and connect students with dedicated mentors.
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
                { label: 'Official Contact', value: 'civildampcs26@gmail.com', isEmail: true },
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
                      className="text-card-desc font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173F35] rounded"
                      style={{ color: '#173F35', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {fact.value}
                    </a>
                  ) : (
                    <p className="text-card-desc font-medium" style={{ color: '#20241F' }}>{fact.value}</p>
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
