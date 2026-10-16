/**
 * Academics page
 *
 * Fixes applied:
 * - Tab index reflected in URL (survives reload/share)
 * - Curriculum defaults collapsed to accordion rather than 8 open cards
 * - Course review count derived from real data (8 reviews, labelled correctly)
 * - Academic Resources unavailable items get honest "not available" state
 *   (no invented file sizes on # links; download button removed for # links)
 * - Visual hierarchy uses the new design tokens
 * - H1 is present and meaningful
 * - Separate section for official course info vs. student opinions
 */

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { X, ChevronDown, ChevronRight, Search, FileText, Folder, ExternalLink, FlaskConical, AlertCircle } from 'lucide-react'
import ErrorBoundary from '../components/ErrorBoundary'
import { courseReviews, curriculum, academicResources, specializations } from '../data/dummy'

const TABS = ['Curriculum', 'Specializations & Labs', 'Course Reviews', 'Resources']

// Derive count honestly
const REVIEW_COUNT = courseReviews.length

const typeColors = {
  'Dept Core':      { bg: 'rgba(23,63,53,0.1)',   text: '#173F35' },
  'Institute Core': { bg: 'rgba(37,99,235,0.1)',  text: '#1d4ed8' },
  'Dept Elective':  { bg: 'rgba(124,58,237,0.1)', text: '#6d28d9' },
  'HSS Elective':   { bg: 'rgba(5,150,105,0.1)',  text: '#047857' },
  'Open Elective':  { bg: 'rgba(217,119,6,0.1)',  text: '#b45309' },
  'Project':        { bg: 'rgba(234,88,12,0.1)',  text: '#c2410c' },
}
const diffColors = {
  Easy:   { bg: 'rgba(16,185,129,0.12)', text: '#047857' },
  Medium: { bg: 'rgba(217,119,6,0.12)',  text: '#b45309' },
  Hard:   { bg: 'rgba(225,29,72,0.12)',  text: '#be123c' },
}

function Tag({ label, colorKey, colors }) {
  const c = colors[colorKey] || { bg: 'rgba(0,0,0,0.06)', text: '#374151' }
  return (
    <span
      className="text-meta font-semibold px-2 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      {label}
    </span>
  )
}

function CourseModal({ item, onClose }) {
  if (!item) return null
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(32,36,31,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="rounded-3xl w-full shadow-2xl relative"
        style={{ maxWidth: 520, background: '#FFFFFF', border: '1px solid #DDD9CC' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ color: '#8A8F88' }}
          aria-label="Close review"
        >
          <X size={18} />
        </button>
        <div className="p-7">
          <div className="flex items-start gap-3 mb-4 pr-8">
            <div className="flex-1">
              <span
                className="text-meta font-bold font-mono px-2 py-0.5 rounded-md"
                style={{ background: '#F0EDE3', color: '#20241F' }}
              >
                {item.code}
              </span>
              <h3
                id="modal-title"
                className="font-bold text-xl mt-2"
                style={{ color: '#20241F', lineHeight: 1.3 }}
              >
                {item.name}
              </h3>
              <p className="text-small mt-1" style={{ color: '#8A8F88' }}>
                {item.professor} · Semester {item.semester}
              </p>
            </div>
            {item.difficulty && (
              <Tag label={item.difficulty} colorKey={item.difficulty} colors={diffColors} />
            )}
          </div>

          {/* Explicit separation: student opinion, not official course info */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{ background: '#F7F5EE', border: '1px solid #E8E5DC' }}
          >
            <p
              className="text-meta font-bold uppercase tracking-wider mb-2"
              style={{ color: '#8A8F88' }}
            >
              Student review — personal opinion, not official information
            </p>
            <p className="text-small leading-relaxed" style={{ color: '#5A5F59' }}>
              {item.review}
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn-outline w-full justify-center"
            style={{ fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Academics() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const rawTab = parseInt(searchParams.get('tab'))
  const tabParam = rawTab >= 0 && rawTab < TABS.length ? rawTab : 0
  const [activeTab, setActiveTab] = useState(tabParam)
  const [semFilter, setSemFilter] = useState('All')
  const [diffFilter, setDiffFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [modal, setModal] = useState(null)
  const [openSems, setOpenSems] = useState({}) // accordion state

  useEffect(() => { setActiveTab(tabParam) }, [tabParam])

  const selectTab = useCallback((i) => {
    setActiveTab(i)
    setSearchParams({ tab: i }, { replace: true })
  }, [setSearchParams])

  const toggleSem = (sem) => setOpenSems(s => ({ ...s, [sem]: !s[sem] }))

  const filtered = courseReviews.filter(c => {
    const matchesSem  = semFilter === 'All' || c.semester === parseInt(semFilter)
    const matchesDiff = diffFilter === 'All' || c.difficulty === diffFilter
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.professor.toLowerCase().includes(q)
    return matchesSem && matchesDiff && matchesSearch
  })

  return (
    <div
      id="main-content"
      style={{ background: '#F7F5EE', minHeight: '100vh', paddingTop: 64 }}
    >
      {/* Header */}
      <div
        className="section-py-sm"
        style={{ background: '#173F35', borderBottom: '1px solid rgba(235,203,99,0.15)' }}
      >
        <div className="container-main">
          <span className="eyebrow" style={{ color: '#EBCB63', marginBottom: '0.5rem', display: 'block' }}>
            Academics
          </span>
          <h1 className="text-section" style={{ color: '#F7F5EE', maxWidth: '24ch' }}>
            Curriculum, reviews & resources
          </h1>
        </div>
      </div>

      {/* Tabs — sticky, tab index in URL */}
      <div
        className="sticky z-30"
        style={{ top: 64, background: 'rgba(247,245,238,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E8E5DC' }}
      >
        <div className="container-main">
          <div
            className="flex gap-2 overflow-x-auto no-scrollbar py-3"
            role="tablist"
            aria-label="Academics sections"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === i}
                id={`tab-${i}`}
                aria-controls={`tabpanel-${i}`}
                onClick={() => selectTab(i)}
                className={`tab-pill ${activeTab === i ? 'tab-pill-active' : 'tab-pill-inactive'}`}
              >
                {tab}
                {tab === 'Course Reviews' && (
                  <span
                    className="ml-1.5 text-meta font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: activeTab === i ? 'rgba(247,245,238,0.2)' : '#F0EDE3',
                      color: activeTab === i ? '#F7F5EE' : '#5A5F59',
                    }}
                  >
                    {REVIEW_COUNT}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="container-main section-py"
      >
        <ErrorBoundary
          fallbackTitle="This academic section could not load"
          fallbackMessage="We encountered an issue displaying this tab's content. You can try reloading or switch to another academic section."
          returnUrl="/academics?tab=0"
          returnLabel="Curriculum overview"
        >
          {/* ── TAB 0: Curriculum ── */}
        {activeTab === 0 && (
          <div>
            <p
              className="text-body mb-6"
              style={{ color: '#5A5F59', maxWidth: '56ch' }}
            >
              B.Tech Civil Engineering — 8 semester curriculum. Each semester is collapsible. This reflects the programme structure for current batches; verify official timetable on the ASC portal.
            </p>

            {/* Credit type legend */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(typeColors).map(([type, c]) => (
                <span
                  key={type}
                  className="text-meta font-semibold px-3 py-1 rounded-full"
                  style={{ background: c.bg, color: c.text }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Accordion semesters */}
            <div className="space-y-3">
              {curriculum.map(sem => (
                <div
                  key={sem.semester}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                    style={{ background: openSems[sem.semester] ? '#F7F5EE' : '#FFFFFF' }}
                    onClick={() => toggleSem(sem.semester)}
                    aria-expanded={!!openSems[sem.semester]}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-base" style={{ color: '#20241F' }}>{sem.label}</span>
                      <span
                        className="text-meta font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: '#F0EDE3', color: '#5A5F59' }}
                      >
                        {sem.credits} credits
                      </span>
                    </div>
                    {openSems[sem.semester]
                      ? <ChevronDown size={18} style={{ color: '#8A8F88' }} />
                      : <ChevronRight size={18} style={{ color: '#8A8F88' }} />}
                  </button>
                  {openSems[sem.semester] && (
                    <div style={{ borderTop: '1px solid #F0EDE3' }}>
                      {sem.courses.map(c => {
                        const tc = typeColors[c.type] || { bg: 'rgba(0,0,0,0.05)', text: '#374151' }
                        return (
                          <div
                            key={c.code}
                            className="px-6 py-3.5 flex items-center justify-between gap-4"
                            style={{ borderTop: '1px solid #F7F5EE' }}
                          >
                            <div className="flex-1 min-w-0">
                              <span
                                className="text-meta font-bold font-mono"
                                style={{ color: '#173F35' }}
                              >
                                {c.code}
                              </span>
                              <p className="text-small font-semibold truncate" style={{ color: '#20241F' }}>
                                {c.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-meta font-mono" style={{ color: '#8A8F88' }}>{c.credits} cr</span>
                              <span
                                className="text-meta font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: tc.bg, color: tc.text }}
                              >
                                {c.type}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 1: Specializations & Labs ── */}
        {activeTab === 1 && (
          <div>
            <p className="text-body mb-8" style={{ color: '#5A5F59', maxWidth: '56ch' }}>
              {specializations.length} graduate specializations within the Department of Civil Engineering, IIT Bombay. Links go to official division pages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {specializations.map(spec => (
                <div
                  key={spec.id}
                  className="rounded-2xl p-6 flex flex-col justify-between hover-lift"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span
                        className="text-meta font-bold font-mono px-2 py-0.5 rounded-md"
                        style={{ background: '#F0EDE3', color: '#20241F' }}
                      >
                        {spec.code} · Est. {spec.established}
                      </span>
                      <a
                        href={spec.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-text text-small"
                        style={{ fontSize: '0.8125rem' }}
                      >
                        Division page <ExternalLink size={12} />
                      </a>
                    </div>
                    <h3 className="text-card-title mb-2" style={{ color: '#20241F' }}>{spec.name}</h3>
                    <p className="text-small leading-relaxed mb-4" style={{ color: '#5A5F59' }}>
                      {spec.description}
                    </p>
                  </div>
                  <div style={{ paddingTop: '1rem', borderTop: '1px solid #F0EDE3' }}>
                    <p
                      className="text-meta font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2"
                      style={{ color: '#8A8F88' }}
                    >
                      <FlaskConical size={13} /> Key labs
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.keyLabs.map(lab => (
                        <span
                          key={lab}
                          className="text-meta px-2.5 py-1 rounded-xl"
                          style={{ background: '#F7F5EE', color: '#5A5F59', border: '1px solid #E8E5DC' }}
                        >
                          {lab}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: Course Reviews ── */}
        {activeTab === 2 && (
          <div>
            {/* Context note */}
            <div
              className="flex items-start gap-3 rounded-2xl p-4 mb-6"
              style={{ background: 'rgba(235,203,99,0.12)', border: '1px solid rgba(235,203,99,0.3)' }}
            >
              <AlertCircle size={18} style={{ color: '#b45309', shrink: 0 }} className="mt-0.5 shrink-0" />
              <p className="text-small" style={{ color: '#5A5F59' }}>
                These are <strong>student opinions</strong>, not official course descriptions. Course assignments, grading, and instructors may change between semesters. Verify with the ASC portal and current instructors.
              </p>
            </div>

            {/* Filters */}
            <div
              className="flex flex-wrap items-end gap-4 mb-6 p-4 rounded-2xl"
              style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
            >
              <div>
                <label htmlFor="sem-filter" className="text-meta font-bold block mb-1" style={{ color: '#20241F' }}>
                  Semester
                </label>
                <select
                  id="sem-filter"
                  value={semFilter}
                  onChange={e => setSemFilter(e.target.value)}
                  className="text-small rounded-xl px-3 py-2 focus:outline-none"
                  style={{ background: '#F7F5EE', color: '#20241F', border: '1px solid #DDD9CC' }}
                >
                  <option value="All">All semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="diff-filter" className="text-meta font-bold block mb-1" style={{ color: '#20241F' }}>
                  Difficulty
                </label>
                <select
                  id="diff-filter"
                  value={diffFilter}
                  onChange={e => setDiffFilter(e.target.value)}
                  className="text-small rounded-xl px-3 py-2 focus:outline-none"
                  style={{ background: '#F7F5EE', color: '#20241F', border: '1px solid #DDD9CC' }}
                >
                  <option value="All">All levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex-1 min-w-[220px]">
                <label htmlFor="search-reviews" className="text-meta font-bold block mb-1" style={{ color: '#20241F' }}>
                  Search
                </label>
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8A8F88' }} />
                  <input
                    id="search-reviews"
                    type="search"
                    placeholder="Code, course name, or professor…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full text-small rounded-full pl-9 pr-4 py-2 focus:outline-none"
                    style={{ background: '#F7F5EE', color: '#20241F', border: '1px solid #DDD9CC' }}
                    aria-label="Search course reviews"
                  />
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-small mb-4" style={{ color: '#8A8F88' }}>
              Showing {filtered.length} of {REVIEW_COUNT} reviews
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(c => (
                <button
                  key={c.id}
                  className="text-left rounded-2xl p-5 hover-lift transition-all group"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', cursor: 'pointer' }}
                  onClick={() => setModal(c)}
                  aria-label={`Read full review for ${c.code} ${c.name}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-meta font-bold font-mono" style={{ color: '#173F35' }}>{c.code}</span>
                      <h4 className="font-bold text-base leading-tight mt-0.5" style={{ color: '#20241F' }}>
                        {c.name}
                      </h4>
                    </div>
                    {c.difficulty && <Tag label={c.difficulty} colorKey={c.difficulty} colors={diffColors} />}
                  </div>
                  <p className="text-small mb-2" style={{ color: '#8A8F88' }}>
                    Sem {c.semester} · {c.professor.split('/')[0].trim()}
                  </p>
                  <p className="text-small leading-relaxed line-clamp-3" style={{ color: '#5A5F59' }}>
                    {c.review}
                  </p>
                  <span className="mt-4 btn-text text-small" style={{ color: '#173F35', fontSize: '0.875rem' }}>
                    Full review <ChevronRight size={13} />
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div
                  className="col-span-full py-12 text-center rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <p className="text-body" style={{ color: '#8A8F88' }}>No reviews match your filter.</p>
                  <button
                    className="btn-text mt-2"
                    onClick={() => { setSemFilter('All'); setDiffFilter('All'); setSearchQuery('') }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: Resources ── */}
        {activeTab === 3 && (
          <div className="space-y-10">

            {academicResources.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-card-title mb-4" style={{ color: '#20241F' }}>{section.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, i) => {
                    const unavailable = item.link === '#'
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl p-5 flex items-start gap-3.5 ${unavailable ? '' : 'hover-lift'}`}
                        style={{
                          background: unavailable ? '#F7F5EE' : '#FFFFFF',
                          border: '1px solid #DDD9CC',
                          opacity: unavailable ? 0.7 : 1,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: unavailable ? '#ECEAE3' : '#F0EDE3', color: unavailable ? '#8A8F88' : '#173F35' }}
                        >
                          {item.type === 'Folder' ? <Folder size={18} /> : <FileText size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-small font-bold leading-tight mb-1" style={{ color: unavailable ? '#8A8F88' : '#20241F' }}>
                            {item.title}
                          </h4>
                          {unavailable ? (
                            <p className="text-meta" style={{ color: '#8A8F88' }}>Not yet available</p>
                          ) : (
                            <>
                              <p className="text-meta" style={{ color: '#8A8F88' }}>{item.type}</p>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-text mt-2 text-meta"
                                style={{ fontSize: '0.8125rem', color: '#173F35' }}
                              >
                                Open <ExternalLink size={11} />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        </ErrorBoundary>
      </div>

      {/* Modal */}
      {modal && <CourseModal item={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
