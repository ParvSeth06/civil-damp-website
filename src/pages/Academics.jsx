/**
 * Academics page
 *
 * Integrated with verified DAMP Senior Reviews repository:
 * - 56 Verified student-written senior reviews (Electives + Minors)
 * - Removed courses without available reviews (Curriculum page removed)
 * - Structured multi-dimensional review modal (Overview, Learnings, Grading, Metrics, Senior Advice)
 * - Type filtering (Dept Elective, Institute Elective, STEM, HSS/Policy)
 * - Semester & Difficulty filtering + Realtime search
 * - Tab 2: Academic Resources & PYQs with verified real PDF downloads
 */

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
  FlaskConical,
  AlertCircle,
  FileText,
  Download,
  Star,
  User,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react'
import ErrorBoundary from '../components/ErrorBoundary'
import { courseReviews, specializations, academicResources } from '../data/dummy'

const TABS = ['Course Reviews', 'Specializations & Labs', 'Academic Resources & PYQs']

const REVIEW_COUNT = courseReviews.length

const typeColors = {
  'Dept Core':                  { bg: 'rgba(23,63,53,0.1)',   text: '#173F35' },
  'Institute Core':             { bg: 'rgba(37,99,235,0.1)',  text: '#1d4ed8' },
  'Dept Elective':              { bg: 'rgba(124,58,237,0.1)', text: '#6d28d9' },
  'Institute / Tech Elective':   { bg: 'rgba(14,165,233,0.1)', text: '#0369a1' },
  'Institute Elective':         { bg: 'rgba(14,165,233,0.1)', text: '#0369a1' },
  'Interdisciplinary Elective': { bg: 'rgba(5,150,105,0.1)',  text: '#047857' },
  'STEM Elective':              { bg: 'rgba(16,185,129,0.1)', text: '#047857' },
  'HSS Elective':               { bg: 'rgba(217,119,6,0.1)',  text: '#b45309' },
  'Policy / Open Elective':      { bg: 'rgba(234,88,12,0.1)',  text: '#c2410c' },
  'Open Elective':              { bg: 'rgba(217,119,6,0.1)',  text: '#b45309' },
  'Project':                    { bg: 'rgba(234,88,12,0.1)',  text: '#c2410c' },
}

const diffColors = {
  Easy:   { bg: 'rgba(16,185,129,0.12)', text: '#047857' },
  Medium: { bg: 'rgba(217,119,6,0.12)',  text: '#b45309' },
  Hard:   { bg: 'rgba(225,29,72,0.12)',  text: '#be123c' },
}

function Tag({ label, colorKey, colors }) {
  const c = (colors && colors[colorKey]) || { bg: 'rgba(0,0,0,0.06)', text: '#374151' }
  return (
    <span
      className="text-meta font-semibold px-2 py-0.5 rounded-full inline-flex items-center"
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

  const typeColor = typeColors[item.type] || { bg: '#F0EDE3', text: '#20241F' }
  const hasMetrics = item.metrics && Object.keys(item.metrics).length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(32,36,31,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="rounded-3xl w-full shadow-2xl relative flex flex-col"
        style={{
          maxWidth: 720,
          maxHeight: '90vh',
          background: '#FFFFFF',
          border: '1px solid #DDD9CC'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#E8E5DC] relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 transition-colors"
            style={{ color: '#8A8F88' }}
            aria-label="Close review"
          >
            <X size={20} />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
            <span
              className="text-meta font-bold font-mono px-2.5 py-1 rounded-md"
              style={{ background: '#F0EDE3', color: '#173F35' }}
            >
              {item.code}
            </span>
            <Tag label={item.type || 'Elective'} colorKey={item.type} colors={typeColors} />
            {item.difficulty && (
              <Tag label={item.difficulty} colorKey={item.difficulty} colors={diffColors} />
            )}
            {item.leniency && (
              <span
                className="text-meta font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(235,203,99,0.2)', color: '#855e09' }}
              >
                Leniency: {item.leniency}
              </span>
            )}
          </div>

          <h2
            id="modal-title"
            className="font-bold text-2xl mt-2"
            style={{ color: '#20241F', lineHeight: 1.25 }}
          >
            {item.name}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small mt-2" style={{ color: '#5A5F59' }}>
            <span>Instructor: <strong>{item.professor}</strong></span>
            <span>·</span>
            <span>Semester: <strong>Sem {item.semester}</strong></span>
            {item.rating && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  {item.rating} / 5
                </span>
              </>
            )}
          </div>

          {/* Senior attribution — no interviewer name shown */}
          <div
            className="mt-3.5 inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl text-meta"
            style={{ background: '#F7F5EE', border: '1px solid #E8E5DC', color: '#5A5F59' }}
          >
            <span className="font-semibold flex items-center gap-1.5" style={{ color: '#20241F' }}>
              <User size={13} style={{ color: '#173F35' }} />
              Reviewed by: <strong>{item.senior}</strong> {item.batch ? `(${item.batch})` : ''}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5 flex-1">
          {/* Inherited Summary Banner */}
          {item.review && (
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(23,63,53,0.05)', border: '1px solid rgba(23,63,53,0.12)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={15} style={{ color: '#173F35' }} />
                <span className="text-meta font-bold uppercase tracking-wider" style={{ color: '#173F35' }}>
                  Summary / Key Highlights
                </span>
              </div>
              <p className="text-small leading-relaxed" style={{ color: '#3A3F38' }}>
                {item.review}
              </p>
            </div>
          )}

          {/* Metrics summary banner if available */}
          {hasMetrics && (
            <div
              className="rounded-2xl p-4"
              style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
            >
              <p className="text-meta font-bold uppercase tracking-wider mb-2.5" style={{ color: '#8A8F88' }}>
                Senior Rating Breakdown (1–10)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-small">
                {Object.entries(item.metrics).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl bg-[#F7F5EE] border border-[#DDD9CC]/70">
                    <span className="text-meta block font-medium" style={{ color: '#8A8F88' }}>{k}</span>
                    <span className="font-bold text-sm" style={{ color: '#173F35' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Verbatim Review As Recorded */}
          <div>
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#E8E5DC]">
              <span className="text-meta font-bold uppercase tracking-wider" style={{ color: '#173F35' }}>
                Complete Senior Review (As Submitted)
              </span>
            </div>

            {/* Verbatim Sections */}
            {item.verbatimSections && item.verbatimSections.length > 0 ? (
              <div className="space-y-4">
                {item.verbatimSections.map((sec, sIdx) => {
                  const visibleLines = sec.lines.filter(l => {
                    const ll = l.trim().toLowerCase()
                    return !ll.startsWith('\u26a0') && !ll.includes('internal only') &&
                      !ll.includes('do not screenshot') && !ll.includes('do not forward') &&
                      !ll.includes('inform the senior of confidentiality')
                  })
                  if (visibleLines.length === 0) return null
                  return (
                    <div
                      key={sIdx}
                      className="rounded-2xl p-4.5 bg-[#FDFCF9] border border-[#DDD9CC]"
                    >
                      <h4
                        className="font-bold text-sm uppercase tracking-wider mb-2.5 text-[#173F35] flex items-center gap-2"
                      >
                        <BookOpen size={14} className="text-[#173F35]" />
                        {sec.heading}
                      </h4>
                      <div className="space-y-2">
                        {visibleLines.map((line, lIdx) => {
                          const isQuestion = /^\d+\./.test(line.trim()) || (line.trim().endsWith('?') && line.length < 130)
                          const isBullet = line.startsWith('\u2022')
                          return isQuestion ? (
                            <p
                              key={lIdx}
                              className="font-bold text-sm text-[#173F35] mt-3 pt-2 first:mt-0 first:pt-0 border-t border-[#F0EDE3] first:border-0"
                            >
                              {line}
                            </p>
                          ) : (
                            <p
                              key={lIdx}
                              className="text-small text-[#3A3F38] leading-relaxed"
                            >
                              {line}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap font-sans text-small p-4 bg-[#FDFCF9] rounded-2xl border border-[#DDD9CC] text-[#3A3F38] leading-relaxed">
                {item.rawContent || item.review}
              </pre>
            )}
          </div>

          <div className="rounded-xl p-3 text-meta text-center" style={{ background: '#F7F5EE', color: '#8A8F88' }}>
            Unedited student review recorded during official DAMP senior interview sessions.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E8E5DC] bg-white shrink-0 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="btn-outline justify-center px-6 py-2"
            style={{ fontSize: '0.9rem' }}
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
  const rawTabParam = searchParams.get('tab')
  let tabParam = 0
  if (rawTabParam !== null) {
    if (rawTabParam === 'reviews' || rawTabParam === '0') tabParam = 0
    else if (rawTabParam === 'specializations' || rawTabParam === 'labs' || rawTabParam === '1') tabParam = 1
    else if (rawTabParam === 'resources' || rawTabParam === 'pyqs' || rawTabParam === '2' || rawTabParam === '3') tabParam = 2
    else {
      const parsed = parseInt(rawTabParam, 10)
      if (parsed === 1) tabParam = 1
      else if (parsed === 2 || parsed === 3) tabParam = 2
      else if (parsed === 0) tabParam = 0
    }
  }
  const [activeTab, setActiveTab] = useState(tabParam)
  const [semFilter, setSemFilter] = useState('All')
  const [diffFilter, setDiffFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [modal, setModal] = useState(null)

  useEffect(() => { setActiveTab(tabParam) }, [tabParam])

  const selectTab = useCallback((i) => {
    setActiveTab(i)
    setSearchParams({ tab: i }, { replace: true })
  }, [setSearchParams])

  const filtered = courseReviews.filter(c => {
    const matchesSem  = semFilter === 'All' || c.semester === parseInt(semFilter)
    const matchesDiff = diffFilter === 'All' || c.difficulty === diffFilter
    
    let matchesType = true
    if (typeFilter === 'Dept Elective') {
      matchesType = c.type === 'Dept Elective'
    } else if (typeFilter === 'Institute / Tech') {
      matchesType = c.type === 'Institute / Tech Elective' || c.type === 'Institute Elective'
    } else if (typeFilter === 'Interdisciplinary / STEM') {
      matchesType = c.type === 'Interdisciplinary Elective' || c.type === 'STEM Elective'
    } else if (typeFilter === 'HSS / Policy') {
      matchesType = c.type === 'HSS Elective' || c.type === 'Policy / Open Elective'
    }

    const q = searchQuery.toLowerCase().trim()
    const matchesSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.professor.toLowerCase().includes(q) ||
      (c.senior && c.senior.toLowerCase().includes(q)) ||
      (c.overview && c.overview.toLowerCase().includes(q)) ||
      (c.review && c.review.toLowerCase().includes(q))

    return matchesSem && matchesDiff && matchesType && matchesSearch
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
            Academics & Mentorship
          </span>
          <h1 className="text-section" style={{ color: '#F7F5EE', maxWidth: '28ch' }}>
            Course reviews, electives & archives
          </h1>
          <p className="text-small mt-2 max-w-2xl" style={{ color: '#DDD9CC' }}>
            Explore verified senior course reviews, laboratory specializations, and departmental question paper archives directly from civil seniors.
          </p>
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
                {tab === 'Academic Resources & PYQs' && (
                  <span
                    className="ml-1.5 text-meta font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: activeTab === i ? 'rgba(235,203,99,0.3)' : 'rgba(235,203,99,0.25)',
                      color: activeTab === i ? '#F7F5EE' : '#855e09',
                    }}
                  >
                    Verified
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main section-py">
        <ErrorBoundary
          fallbackTitle="Section unavailable"
          fallbackMessage="Unable to load this section of Academics. Try refreshing or switching tabs."
          returnUrl="/academics"
          returnLabel="Reload Academics"
        >

        {/* ── TAB 0: Course Reviews ── */}
        {activeTab === 0 && (
          <div>
            {/* Context note */}
            <div
              className="flex items-start gap-3 rounded-2xl p-4.5 mb-6 shadow-xs"
              style={{ background: 'rgba(235,203,99,0.12)', border: '1px solid rgba(235,203,99,0.3)' }}
            >
              <AlertCircle size={20} style={{ color: '#b45309' }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-small" style={{ color: '#20241F' }}>
                  <strong>Verified DAMP Senior Reviews:</strong> Over <strong>{REVIEW_COUNT} authentic reviews</strong> collected directly from senior interviews covering departmental electives, STEM electives, and minors.
                </p>
                <p className="text-meta mt-1" style={{ color: '#5A5F59' }}>
                  These reflect genuine senior experiences and grading impressions. Always verify ASC timetables and prerequisite requirements before course registration.
                </p>
              </div>
            </div>

            {/* Course Type Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { label: `All Courses (${REVIEW_COUNT})`, val: 'All' },
                { label: 'Dept Electives (46)', val: 'Dept Elective' },
                { label: 'Institute & Tech (5)', val: 'Institute / Tech' },
                { label: 'Interdisciplinary & STEM (3)', val: 'Interdisciplinary / STEM' },
                { label: 'HSS & Policy (2)', val: 'HSS / Policy' },
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setTypeFilter(t.val)}
                  className={`text-small font-semibold px-3 py-1.5 rounded-full transition-all ${
                    typeFilter === t.val
                      ? 'shadow-xs'
                      : 'hover:bg-neutral-200/50'
                  }`}
                  style={{
                    background: typeFilter === t.val ? '#173F35' : '#FFFFFF',
                    color: typeFilter === t.val ? '#F7F5EE' : '#5A5F59',
                    border: '1px solid',
                    borderColor: typeFilter === t.val ? '#173F35' : '#DDD9CC',
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Filters bar */}
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
                  {[2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="diff-filter" className="text-meta font-bold block mb-1" style={{ color: '#20241F' }}>
                  Difficulty / Leniency
                </label>
                <select
                  id="diff-filter"
                  value={diffFilter}
                  onChange={e => setDiffFilter(e.target.value)}
                  className="text-small rounded-xl px-3 py-2 focus:outline-none"
                  style={{ background: '#F7F5EE', color: '#20241F', border: '1px solid #DDD9CC' }}
                >
                  <option value="All">All difficulty levels</option>
                  <option value="Easy">Easy (High Leniency)</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard (Strict Evaluation)</option>
                </select>
              </div>

              <div className="flex-1 min-w-[240px]">
                <label htmlFor="search-reviews" className="text-meta font-bold block mb-1" style={{ color: '#20241F' }}>
                  Search Reviews
                </label>
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8A8F88' }} />
                  <input
                    id="search-reviews"
                    type="search"
                    placeholder="Code, course name, professor, senior, or topic…"
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
            <div className="flex items-center justify-between mb-4">
              <p className="text-small" style={{ color: '#8A8F88' }}>
                Showing <strong>{filtered.length}</strong> of {REVIEW_COUNT} senior reviews
              </p>
              {(semFilter !== 'All' || diffFilter !== 'All' || typeFilter !== 'All' || searchQuery) && (
                <button
                  className="btn-text text-small"
                  onClick={() => { setSemFilter('All'); setDiffFilter('All'); setTypeFilter('All'); setSearchQuery('') }}
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Reviews Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(c => (
                <Link
                  key={c.id}
                  to={`/academics/review/${c.id}`}
                  className="text-left rounded-2xl p-5 hover-lift transition-all group flex flex-col justify-between"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', cursor: 'pointer', textDecoration: 'none' }}
                  aria-label={`Read full review for ${c.code} ${c.name}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-meta font-bold font-mono px-2 py-0.5 rounded bg-[#F0EDE3]" style={{ color: '#173F35' }}>
                          {c.code}
                        </span>
                        <Tag label={c.type || 'Elective'} colorKey={c.type} colors={typeColors} />
                      </div>
                      {c.difficulty && <Tag label={c.difficulty} colorKey={c.difficulty} colors={diffColors} />}
                    </div>

                    <h4 className="font-bold text-base leading-snug mt-1 mb-1" style={{ color: '#20241F' }}>
                      {c.name}
                    </h4>

                    <p className="text-meta mb-2" style={{ color: '#8A8F88' }}>
                      Sem {c.semester} · {c.professor.split('/')[0].trim()}
                    </p>

                    {/* Senior Reviewer tag */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-meta font-medium mb-3 bg-[#F7F5EE] text-[#5A5F59]">
                      <User size={11} className="text-[#173F35]" />
                      <span>Senior Review</span>
                      {c.leniency && (
                        <span className="text-amber-700 ml-1">({c.leniency})</span>
                      )}
                    </div>

                    <p className="text-small leading-relaxed line-clamp-3 mb-2" style={{ color: '#5A5F59' }}>
                      {c.review}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 flex items-center justify-between border-t border-[#F0EDE3]">
                    <span className="text-meta font-semibold" style={{ color: '#173F35' }}>
                      Read Full Review →
                    </span>
                    {c.rating && (
                      <span className="flex items-center gap-1 text-meta font-bold text-amber-600">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        {c.rating}/5
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div
                  className="col-span-full py-14 text-center rounded-2xl"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <Search size={32} className="mx-auto mb-2 text-neutral-300" />
                  <p className="text-body font-medium" style={{ color: '#20241F' }}>No reviews match your filters.</p>
                  <p className="text-small mt-1" style={{ color: '#8A8F88' }}>
                    Try searching for another keyword or reset your semester/difficulty filters.
                  </p>
                  <button
                    className="btn-outline mt-4"
                    onClick={() => { setSemFilter('All'); setDiffFilter('All'); setTypeFilter('All'); setSearchQuery('') }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        
        {/* ── TAB 1: Specializations & Labs ── */}
        {activeTab === 1 && (
          <div>
            <p className="text-body mb-8" style={{ color: '#5A5F59', maxWidth: '56ch' }}>
              The department offers research and postgraduate study across seven major specializations, supported by 17 advanced research laboratories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specializations.map(spec => (
                <div
                  key={spec.id}
                  className="rounded-3xl p-7 flex flex-col justify-between"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', boxShadow: '0 2px 10px rgba(23,63,53,0.04)' }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-card-title" style={{ color: '#20241F' }}>{spec.name}</h3>
                      {spec.head && (
                        <span
                          className="text-meta font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: 'rgba(23,63,53,0.08)', color: '#173F35' }}
                        >
                          {spec.head}
                        </span>
                      )}
                    </div>
                    <p className="text-small leading-relaxed mb-5" style={{ color: '#5A5F59' }}>
                      {spec.description}
                    </p>
                    <div>
                      <p className="text-meta font-bold uppercase tracking-wider mb-2" style={{ color: '#8A8F88' }}>
                        Key Laboratories
                      </p>
                      <ul className="space-y-1.5">
                        {spec.keyLabs.map((lab, i) => (
                          <li key={i} className="flex items-center gap-2 text-small" style={{ color: '#20241F' }}>
                            <FlaskConical size={13} style={{ color: '#173F35', flexShrink: 0 }} />
                            <span>{lab}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {spec.url && (
                    <div className="mt-6 pt-4" style={{ borderTop: '1px solid #F0EDE3' }}>
                      <a
                        href={spec.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-text text-small"
                        style={{ color: '#173F35' }}
                      >
                        Visit group portal <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        
        {/* ── TAB 2: Academic Resources & PYQs ── */}
        {activeTab === 2 && (
          <div>
            <div className="mb-8">
              <h2 className="text-section mb-2" style={{ color: '#20241F' }}>
                Department Academic Archives & Question Papers
              </h2>
              <p className="text-body" style={{ color: '#5A5F59', maxWidth: '64ch' }}>
                Verified midsem question papers, endsem question banks, assignment sheets, and standard reference codes archived by civil seniors and DAMP mentors.
              </p>
            </div>

            <div className="space-y-8">
              {academicResources.map((sec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', boxShadow: '0 2px 12px rgba(23,63,53,0.03)' }}
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-xl mb-1" style={{ color: '#20241F' }}>
                      {sec.category}
                    </h3>
                    {sec.description && (
                      <p className="text-small" style={{ color: '#8A8F88' }}>
                        {sec.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.items.map((item, iIdx) => {
                      const isRealPdf = item.url && item.url.startsWith('/resources/')
                      const isExternal = item.isExternal || (item.link && item.link.startsWith('http'))
                      const downloadHref = isRealPdf ? item.url : (item.link || '#')

                      return (
                        <div
                          key={iIdx}
                          className="rounded-2xl p-4.5 flex flex-col justify-between transition-all hover:border-[#173F35]/40"
                          style={{ background: '#F7F5EE', border: '1px solid #E8E5DC' }}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span
                                className="text-meta font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                                style={{
                                  background: isRealPdf ? 'rgba(23,63,53,0.1)' : '#E8E5DC',
                                  color: isRealPdf ? '#173F35' : '#5A5F59'
                                }}
                              >
                                <FileText size={12} />
                                {item.type} {item.size ? `· ${item.size}` : ''}
                              </span>
                              {isRealPdf && (
                                <span
                                  className="text-meta font-bold px-2 py-0.5 rounded-full"
                                  style={{ background: 'rgba(16,185,129,0.15)', color: '#047857' }}
                                >
                                  Verified Archive
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-sm mb-1 leading-snug" style={{ color: '#20241F' }}>
                              {item.title}
                            </h4>
                            {item.semester && (
                              <p className="text-meta mb-3" style={{ color: '#8A8F88' }}>
                                Course: {item.course} · {item.semester}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#DDD9CC]/60">
                            {isRealPdf ? (
                              <a
                                href={downloadHref}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="btn-primary inline-flex items-center gap-1.5 text-xs py-1.5 px-3.5"
                              >
                                <Download size={13} />
                                Download PDF
                              </a>
                            ) : isExternal ? (
                              <a
                                href={downloadHref}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-outline inline-flex items-center gap-1.5 text-xs py-1.5 px-3.5"
                              >
                                <ExternalLink size={13} />
                                View Code / Book
                              </a>
                            ) : (
                              <span className="text-meta" style={{ color: '#8A8F88' }}>
                                Available upon request
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        </ErrorBoundary>
      </div>
    </div>
  )
}
