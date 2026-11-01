/**
 * Opportunities / Experiences page
 *
 * Tabs: Internship Stories | Research Profiles | Competitions
 *
 * Updates:
 * - Removed retrospective warning banner from internships tab
 * - Added subtags (Tech, Consult, Finance, Product) beside the Non-Core tag
 * - Dedicated filter buttons for Non-Core subtags (Tech, Consult, Finance, Product)
 * - Removed entire Scholarships tab & section
 * - Competitions exclusively feature AAKAAR and EERI with verified IITB details
 * - Tab index reflected in URL so shared links survive reload
 */

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapPin, Clock, X, ChevronRight, ExternalLink, Mail, Award, CheckCircle2, BookOpen, Sparkles, User } from 'lucide-react'
import { internships, competitions, professors, projects } from '../data/dummy'

const TABS = ['Internship Stories', 'Research Profiles', 'Competitions']

const categoryColors = {
  Core:           { bg: 'rgba(23,63,53,0.1)',   text: '#173F35' },
  'Non-Core':     { bg: 'rgba(37,99,235,0.1)',  text: '#1d4ed8' },
  Research:       { bg: 'rgba(124,58,237,0.1)', text: '#6d28d9' },
}

const subtagColors = {
  Tech:    { bg: 'rgba(37,99,235,0.12)',  text: '#1d4ed8' },
  Consult: { bg: 'rgba(5,150,105,0.12)',  text: '#047857' },
  Finance: { bg: 'rgba(217,119,6,0.12)',  text: '#b45309' },
  Product: { bg: 'rgba(147,51,234,0.12)', text: '#7c3aed' },
}

function Modal({ item, type, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(32,36,31,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="rounded-3xl w-full shadow-2xl relative"
        style={{
          maxWidth: type === 'project' ? 740 : 540,
          background: '#FFFFFF',
          border: '1px solid #DDD9CC',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ color: '#8A8F88' }}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="p-7">

          {type === 'internship' && (() => {
            const cc = categoryColors[item.category] || { bg: '#F0EDE3', text: '#20241F' }
            const sc = item.subtag ? subtagColors[item.subtag] : null
            return (
              <>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="inline-block text-meta font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: cc.bg, color: cc.text }}
                  >
                    {item.category}
                  </span>
                  {sc && (
                    <span
                      className="inline-block text-meta font-bold px-2.5 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {item.subtag}
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-xl mb-1" style={{ color: '#20241F', lineHeight: 1.3, paddingRight: '2rem' }}>
                  {item.title}
                </h2>
                <p className="text-small font-semibold mb-4" style={{ color: '#5A5F59' }}>{item.company}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-small mb-5 pb-4" style={{ borderBottom: '1px solid #F0EDE3' }}>
                  <span className="flex items-center gap-1.5" style={{ color: '#8A8F88' }}>
                    <MapPin size={13} />{item.location}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: '#8A8F88' }}>
                    <Clock size={13} />{item.duration}
                  </span>
                </div>
                <p className="text-meta font-bold uppercase tracking-wider mb-1" style={{ color: '#8A8F88' }}>Experience shared by</p>
                <p className="text-small font-bold mb-4" style={{ color: '#20241F' }}>{item.author}, {item.batch} · {item.date}</p>
                <div
                  className="rounded-2xl p-4"
                  style={{ background: '#F7F5EE', border: '1px solid #E8E5DC' }}
                >
                  <p className="text-small leading-relaxed" style={{ color: '#5A5F59' }}>{item.excerpt}</p>
                </div>
              </>
            )
          })()}

          {type === 'competition' && (
            <>
              <span
                className="inline-block text-meta font-semibold px-2.5 py-1 rounded-full mb-3"
                style={{ background: '#F0EDE3', color: '#20241F' }}
              >
                {item.category}
              </span>
              <h2 className="font-bold text-xl mb-2" style={{ color: '#20241F', paddingRight: '2rem', lineHeight: 1.3 }}>
                {item.name}
              </h2>
              <p className="text-small mb-4 font-semibold" style={{ color: '#173F35' }}>{item.organizer}</p>
              <div
                className="rounded-2xl p-4 mb-4"
                style={{ background: '#F7F5EE', border: '1px solid #E8E5DC' }}
              >
                <p className="text-small leading-relaxed" style={{ color: '#5A5F59' }}>{item.description}</p>
              </div>
              {item.highlights && item.highlights.length > 0 && (
                <div className="mt-3">
                  <p className="text-meta font-bold uppercase tracking-wider mb-2" style={{ color: '#8A8F88' }}>Key Tracks & Events</p>
                  <ul className="space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-small" style={{ color: '#20241F' }}>
                        <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#173F35' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {type === 'project' && (
            <>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="inline-block text-meta font-bold px-2.5 py-1 rounded-full font-mono"
                  style={{
                    background: item.type === 'BTP' ? 'rgba(23,63,53,0.1)' : 'rgba(124,58,237,0.1)',
                    color: item.type === 'BTP' ? '#173F35' : '#6d28d9',
                  }}
                >
                  {item.type === 'BTP' ? 'BTP · Bachelor Thesis' : 'IDP · Interdisciplinary Project'}
                </span>
                {item.domain && (
                  <span
                    className="inline-block text-meta font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: '#F0EDE3', color: '#5A5F59' }}
                  >
                    {item.domain}
                  </span>
                )}
                {item.semester && (
                  <span
                    className="inline-block text-meta font-medium px-2 py-0.5 rounded-md"
                    style={{ background: '#F7F5EE', color: '#8A8F88' }}
                  >
                    {item.semester}
                  </span>
                )}
              </div>

              <h2 className="font-bold text-2xl mb-1.5" style={{ color: '#20241F', paddingRight: '2rem', lineHeight: 1.25 }}>
                {item.title}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small mb-3" style={{ color: '#5A5F59' }}>
                <span>Student: <strong>{item.student}</strong></span>
                <span>·</span>
                <span>Guide: <strong>{item.professor}</strong> {item.teamSize ? `(${item.teamSize})` : ''}</span>
              </div>

              {/* Senior attribution */}
              <div
                className="mb-4 inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl text-meta"
                style={{ background: '#F7F5EE', border: '1px solid #E8E5DC', color: '#5A5F59' }}
              >
                <span className="font-semibold flex items-center gap-1.5" style={{ color: '#20241F' }}>
                  <User size={13} style={{ color: '#173F35' }} />
                  Senior Interviewee: <strong>{item.student}</strong>
                </span>
                {item.reviewer && (
                  <span style={{ color: '#8A8F88' }}>
                    · DAMP Interviewer: {item.reviewer}
                  </span>
                )}
                {item.metrics && item.metrics['Date of call'] && (
                  <span style={{ color: '#8A8F88' }}>
                    · Call Date: {item.metrics['Date of call']}
                  </span>
                )}
              </div>

              {/* Inherited Highlights / Scope */}
              {item.description && (
                <div
                  className="rounded-2xl p-4 mb-4"
                  style={{ background: 'rgba(23,63,53,0.05)', border: '1px solid rgba(23,63,53,0.12)' }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={15} style={{ color: '#173F35' }} />
                    <span className="text-meta font-bold uppercase tracking-wider" style={{ color: '#173F35' }}>
                      Scope & Problem Statement Overview
                    </span>
                  </div>
                  <p className="text-small leading-relaxed" style={{ color: '#3A3F38' }}>
                    {item.description}
                  </p>
                </div>
              )}

              {/* Metrics summary banner if available */}
              {item.metrics && Object.keys(item.metrics).length > 0 && (
                <div
                  className="rounded-2xl p-4 mb-4"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <p className="text-meta font-bold uppercase tracking-wider mb-2.5" style={{ color: '#8A8F88' }}>
                    Project Parameters & Ratings
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-small">
                    {Object.entries(item.metrics).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-xl bg-[#F7F5EE] border border-[#DDD9CC]/70">
                        <span className="text-meta block font-medium" style={{ color: '#8A8F88' }}>{k}</span>
                        <span className="font-bold text-sm" style={{ color: '#173F35' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Senior Review (As Submitted) */}
              <div className="mt-5 pt-4 border-t border-[#E8E5DC]">
                <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-[#E8E5DC]">
                  <span className="text-meta font-bold uppercase tracking-wider" style={{ color: '#173F35' }}>
                    Complete Senior Review (As Submitted)
                  </span>
                  <span className="text-meta text-[#8A8F88] font-mono">
                    Official DAMP Record
                  </span>
                </div>

                {item.verbatimSections && item.verbatimSections.length > 0 ? (
                  <div className="space-y-4">
                    {item.verbatimSections.map((sec, sIdx) => (
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
                          {sec.lines.map((line, lIdx) => {
                            const isQuestion = /^\d+\./.test(line.trim()) || (line.trim().endsWith('?') && line.length < 130)
                            const isNote = line.startsWith('•') || line.startsWith('⚠') || line.startsWith('Rate')
                            return isQuestion ? (
                              <p
                                key={lIdx}
                                className="font-bold text-sm text-[#173F35] mt-3 pt-2 first:mt-0 first:pt-0 border-t border-[#F0EDE3] first:border-0"
                              >
                                {line}
                              </p>
                            ) : isNote ? (
                              <p
                                key={lIdx}
                                className="text-meta text-[#855e09] bg-amber-500/10 px-2.5 py-1 rounded-md"
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
                    ))}
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-small p-4 bg-[#FDFCF9] rounded-2xl border border-[#DDD9CC] text-[#3A3F38] leading-relaxed">
                    {item.rawContent || item.description}
                  </pre>
                )}
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="btn-outline w-full justify-center mt-6"
            style={{ fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawTab = parseInt(searchParams.get('tab'))
  const tabParam = rawTab >= 0 && rawTab < TABS.length ? rawTab : 0
  const [activeTab, setActiveTab] = useState(tabParam)
  const [catFilter, setCatFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [projFilter, setProjFilter] = useState('All')
  const [modal, setModal] = useState({ item: null, type: null })

  useEffect(() => { setActiveTab(tabParam) }, [tabParam])

  const selectTab = useCallback((i) => {
    setActiveTab(i)
    setSearchParams({ tab: i }, { replace: true })
    setCatFilter('All')
    setDeptFilter('All')
    setProjFilter('All')
  }, [setSearchParams])

  const filteredProjects = projects.filter(p => {
    if (projFilter === 'All') return true
    return p.type === projFilter
  })

  // Filter internships supporting both primary categories and non-core subtags
  const filteredInternships = internships.filter(i => {
    if (catFilter === 'All') return true
    if (['Tech', 'Consult', 'Finance', 'Product'].includes(catFilter)) {
      return i.subtag === catFilter
    }
    return i.category === catFilter
  })

  const filteredProfessors = professors.filter(p => deptFilter === 'All' || p.department === deptFilter)

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
            Experiences & Opportunities
          </span>
          <h1 className="text-section" style={{ color: '#F7F5EE', maxWidth: '26ch' }}>
            Internships, research & competitions
          </h1>
        </div>
      </div>

      {/* Sticky tabs */}
      <div
        className="sticky z-30"
        style={{ top: 64, background: 'rgba(247,245,238,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E8E5DC' }}
      >
        <div className="container-main">
          <div
            className="flex gap-2 overflow-x-auto no-scrollbar py-3"
            role="tablist"
            aria-label="Experiences sections"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => selectTab(i)}
                className={`tab-pill ${activeTab === i ? 'tab-pill-active' : 'tab-pill-inactive'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-main section-py">

        {/* ── TAB 0: Internship Stories ── */}
        {activeTab === 0 && (
          <div>
            {/* Category and Subtag filter bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filter by category and track">
              <span className="text-meta font-bold uppercase tracking-wider mr-1" style={{ color: '#8A8F88' }}>
                Filter:
              </span>
              {['All', 'Core', 'Non-Core'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatFilter(cat)}
                  className={`tab-pill ${catFilter === cat ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                  aria-pressed={catFilter === cat}
                >
                  {cat}
                </button>
              ))}

              <span className="text-meta font-semibold mx-1" style={{ color: '#DDD9CC' }}>|</span>

              {/* Non-Core subtags */}
              {['Tech', 'Consult', 'Finance', 'Product'].map(sub => (
                <button
                  key={sub}
                  onClick={() => setCatFilter(sub)}
                  className={`tab-pill ${catFilter === sub ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                  aria-pressed={catFilter === sub}
                >
                  {sub}
                </button>
              ))}

              <span className="text-meta font-semibold mx-1" style={{ color: '#DDD9CC' }}>|</span>

              <button
                key="Research"
                onClick={() => setCatFilter('Research')}
                className={`tab-pill ${catFilter === 'Research' ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                aria-pressed={catFilter === 'Research'}
              >
                Research
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInternships.map(intern => {
                const cc = categoryColors[intern.category] || { bg: '#F0EDE3', text: '#20241F' }
                const sc = intern.subtag ? subtagColors[intern.subtag] : null
                return (
                  <button
                    key={intern.id}
                    className="text-left rounded-2xl p-6 hover-lift transition-all flex flex-col justify-between"
                    style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', cursor: 'pointer' }}
                    onClick={() => setModal({ item: intern, type: 'internship' })}
                    aria-label={`Read story: ${intern.title} by ${intern.author}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-meta font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: cc.bg, color: cc.text }}
                          >
                            {intern.category}
                          </span>
                          {sc && (
                            <span
                              className="text-meta font-bold px-2 py-0.5 rounded-full"
                              style={{ background: sc.bg, color: sc.text }}
                            >
                              {intern.subtag}
                            </span>
                          )}
                        </div>
                        <span className="text-meta" style={{ color: '#8A8F88' }}>{intern.company}</span>
                      </div>
                      <h3 className="text-card-title leading-snug mb-2" style={{ color: '#20241F' }}>
                        {intern.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-small mb-3" style={{ color: '#8A8F88' }}>
                        <span className="flex items-center gap-1"><MapPin size={12} />{intern.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{intern.duration}</span>
                      </div>
                      <p className="text-small leading-relaxed line-clamp-3" style={{ color: '#5A5F59' }}>
                        {intern.excerpt}
                      </p>
                    </div>
                    <div
                      className="flex items-center justify-between mt-4 pt-4"
                      style={{ borderTop: '1px solid #F0EDE3' }}
                    >
                      <span className="text-small" style={{ color: '#8A8F88' }}>
                        {intern.author} · {intern.batch}
                      </span>
                      <span className="btn-text text-small" style={{ color: '#173F35', fontSize: '0.875rem' }}>
                        Read story <ChevronRight size={13} />
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── TAB 1: Research Profiles ── */}
        {activeTab === 1 && (
          <div>
            <p className="text-body mb-6" style={{ color: '#5A5F59', maxWidth: '56ch' }}>
              Faculty research profiles from the Department of Civil Engineering, IIT Bombay. Profiles link to official faculty pages. A listed area of research is not an open position — contact the faculty member directly.
            </p>

            {/* Department filter */}
            <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by specialization">
              {[
                { label: 'All', val: 'All' },
                { label: 'Transportation (TSE)', val: 'Transportation Systems Engineering' },
                { label: 'Geotechnical (GTE)', val: 'Geotechnical Engineering' },
                { label: 'Water Resources (WRE)', val: 'Water Resources Engineering' },
                { label: 'Structural (STR)', val: 'Structural Engineering' },
                { label: 'Ocean Engineering', val: 'Ocean Engineering' },
                { label: 'Remote Sensing', val: 'Remote Sensing' },
                { label: 'Construction Mgmt', val: 'Construction Technology And Management' },
              ].map(dept => (
                <button
                  key={dept.val}
                  onClick={() => setDeptFilter(dept.val)}
                  className={`tab-pill ${deptFilter === dept.val ? 'tab-pill-active' : 'tab-pill-inactive'}`}
                  aria-pressed={deptFilter === dept.val}
                >
                  {dept.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProfessors.map(prof => (
                <div
                  key={prof.id}
                  className="rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <div>
                    <span
                      className="text-meta font-semibold px-2.5 py-0.5 rounded-full inline-block mb-3"
                      style={{ background: 'rgba(23,63,53,0.08)', color: '#173F35' }}
                    >
                      {prof.department}
                    </span>
                    <h3 className="font-bold text-lg mb-0.5" style={{ color: '#20241F' }}>{prof.name}</h3>
                    <p className="text-small mb-3" style={{ color: '#8A8F88' }}>{prof.designation}</p>

                    <div className="space-y-1 mb-4">
                      {prof.areas.slice(0, 3).map((area, i) => (
                        <p key={i} className="text-small" style={{ color: '#5A5F59' }}>
                          · {area}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3" style={{ borderTop: '1px solid #F0EDE3' }}>
                    <div className="flex items-center justify-between text-meta">
                      {prof.email && (
                        <a
                          href={`mailto:${prof.email}`}
                          className="flex items-center gap-1.5"
                          style={{ color: '#8A8F88', textDecoration: 'none' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#173F35' }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#8A8F88' }}
                        >
                          <Mail size={12} /> {prof.email}
                        </a>
                      )}
                      {prof.website && (
                        <a
                          href={prof.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 font-semibold"
                          style={{ color: '#173F35' }}
                        >
                          Profile <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BTP / IDP Projects */}
            <div className="mt-14">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-section" style={{ color: '#20241F' }}>
                    BTP & IDP Senior Project Reviews
                  </h2>
                  <p className="text-body mt-1" style={{ color: '#5A5F59' }}>
                    Authentic project reviews, deliverables, and guide insights from students who completed Bachelor Thesis Projects (BTP) and Institute Development Projects (IDP).
                  </p>
                </div>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: `All Projects (${projects.length})`, val: 'All' },
                  { label: 'BTP Projects (3)', val: 'BTP' },
                  { label: 'IDP Projects (7)', val: 'IDP' },
                ].map(tab => (
                  <button
                    key={tab.val}
                    onClick={() => setProjFilter(tab.val)}
                    className={`text-small font-semibold px-3 py-1.5 rounded-full transition-all ${
                      projFilter === tab.val ? 'shadow-xs' : 'hover:bg-neutral-200/50'
                    }`}
                    style={{
                      background: projFilter === tab.val ? '#173F35' : '#FFFFFF',
                      color: projFilter === tab.val ? '#F7F5EE' : '#5A5F59',
                      border: '1px solid',
                      borderColor: projFilter === tab.val ? '#173F35' : '#DDD9CC',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProjects.map(p => (
                  <button
                    key={p.id}
                    className="text-left rounded-2xl p-6 hover-lift flex flex-col justify-between"
                    style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', cursor: 'pointer' }}
                    onClick={() => setModal({ item: p, type: 'project' })}
                    aria-label={`Read project review: ${p.title}`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                        <span
                          className="text-meta font-bold px-2.5 py-0.5 rounded-full font-mono"
                          style={{
                            background: p.type === 'BTP' ? 'rgba(23,63,53,0.1)' : 'rgba(124,58,237,0.1)',
                            color: p.type === 'BTP' ? '#173F35' : '#6d28d9',
                          }}
                        >
                          {p.type}
                        </span>
                        {p.domain && (
                          <span
                            className="text-meta font-medium px-2 py-0.5 rounded-full"
                            style={{ background: '#F0EDE3', color: '#5A5F59' }}
                          >
                            {p.domain}
                          </span>
                        )}
                        {p.semester && (
                          <span className="text-meta px-2 py-0.5 rounded bg-[#F7F5EE] text-[#8A8F88]">
                            {p.semester}
                          </span>
                        )}
                      </div>

                      <h3 className="text-card-title mb-1.5" style={{ color: '#20241F', lineHeight: 1.35 }}>
                        {p.title}
                      </h3>
                      <p className="text-small font-semibold mb-1" style={{ color: '#20241F' }}>
                        {p.student}
                      </p>
                      <p className="text-meta mb-3" style={{ color: '#8A8F88' }}>
                        Guide: <strong>{p.professor}</strong> {p.teamSize ? `· ${p.teamSize}` : ''}
                      </p>
                      <p className="text-small leading-relaxed line-clamp-3" style={{ color: '#5A5F59' }}>
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F0EDE3] flex items-center justify-between">
                      <span className="btn-text text-small" style={{ color: '#173F35', fontSize: '0.875rem' }}>
                        Read Senior Review & Advice <ChevronRight size={13} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: Competitions (AAKAAR & EERI only) ── */}
        {activeTab === 2 && (
          <div>
            <p className="text-body mb-8" style={{ color: '#5A5F59', maxWidth: '56ch' }}>
              Civil engineering student competitions — departmental flagship and international earthquake engineering chapters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitions.map(comp => (
                <div
                  key={comp.id}
                  className="rounded-3xl p-7 flex flex-col justify-between"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', boxShadow: '0 2px 10px rgba(23,63,53,0.04)' }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block text-meta font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(235,203,99,0.2)', color: '#7c5e10', border: '1px solid rgba(235,203,99,0.35)' }}
                      >
                        {comp.category}
                      </span>
                    </div>
                    <h3 className="text-section mb-2" style={{ color: '#20241F', fontSize: '1.45rem', lineHeight: 1.25 }}>
                      {comp.name}
                    </h3>
                    <p className="text-small font-semibold mb-4" style={{ color: '#173F35' }}>
                      {comp.organizer}
                    </p>
                    <p className="text-body leading-relaxed mb-6" style={{ color: '#5A5F59' }}>
                      {comp.description}
                    </p>

                    {comp.highlights && comp.highlights.length > 0 && (
                      <div className="rounded-2xl p-4 mb-6" style={{ background: '#F7F5EE', border: '1px solid #E8E5DC' }}>
                        <p className="text-meta font-bold uppercase tracking-wider mb-2.5" style={{ color: '#173F35' }}>
                          Highlights & Tracks
                        </p>
                        <ul className="space-y-2">
                          {comp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-small" style={{ color: '#20241F' }}>
                              <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#173F35' }} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setModal({ item: comp, type: 'competition' })}
                    className="btn-outline justify-center w-full"
                  >
                    View details & summary
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {modal.item && (
        <Modal item={modal.item} type={modal.type} onClose={() => setModal({ item: null, type: null })} />
      )}
    </div>
  )
}
