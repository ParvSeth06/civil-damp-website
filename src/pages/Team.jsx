/**
 * Team page — Civil DAMP
 *
 * Displays DAMPC coordinators, subgroup heads, and mentors.
 * - Center-aligned card layout (e.g. 5 members format as 3 on top, 2 below, centered)
 * - Cards display ONLY Name, Roll Number, and Sub Division (descriptions removed)
 */

import { useState } from 'react'
import { subgroupHeads, mentors, dampc } from '../data/dummy'

function getRollNumber(person) {
  if (person.rollNo) return person.rollNo
  const match = (person.ldap || person.email || '').match(/\b([0-9]{2}[a-zA-Z]{1,2}[0-9]{3,5})\b/i)
  if (match) return match[1].toUpperCase()
  if (person.email && !person.email.includes('comingsoon') && !person.email.includes('@iitb.ac.in')) {
    return person.email.toUpperCase()
  }
  return ''
}

function InitialsAvatar({ name, size = 68, fontSize = 24 }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #173F35 0%, #24584C 100%)',
        color: '#EBCB63',
        fontSize,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

function PersonCard({ person, subDivision }) {
  const hasPhoto = Boolean(person.photo && person.photo.trim() !== '')
  const rollNo = getRollNumber(person)
  const division = subDivision || person.subgroup || person.role || 'Civil DAMP'

  return (
    <div
      className="w-[260px] rounded-2xl overflow-hidden bg-white shadow-sm hover-lift flex flex-col items-center text-center transition-all duration-200"
      style={{ border: '1px solid #DDD9CC' }}
    >
      {/* Photo or Initials */}
      <div className="w-full h-56 bg-[#F0EDE3] flex items-center justify-center overflow-hidden relative">
        {hasPhoto ? (
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <InitialsAvatar name={person.name} size={72} fontSize={24} />
        )}
      </div>

      {/* Details: Name, Roll Number, Sub Division ONLY */}
      <div className="p-4 w-full flex flex-col items-center gap-1.5">
        <h3 className="font-bold text-base leading-snug text-[#20241F]">
          {person.name}
        </h3>
        {rollNo && (
          <p className="text-xs font-mono font-semibold tracking-wider text-[#5A5F59]">
            {rollNo}
          </p>
        )}
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1"
          style={{ background: 'rgba(23,63,53,0.08)', color: '#173F35' }}
        >
          {division}
        </span>
      </div>
    </div>
  )
}

const ALL_SUBGROUPS = [...new Set([
  ...subgroupHeads.map(h => h.subgroup),
  ...mentors.map(m => m.subgroup),
])]

export default function Team() {
  const [activeSubgroup, setActiveSubgroup] = useState('All')

  const filteredMentors = activeSubgroup === 'All'
    ? mentors
    : mentors.filter(m => m.subgroup === activeSubgroup)

  const filteredHeads = activeSubgroup === 'All'
    ? subgroupHeads
    : subgroupHeads.filter(h => h.subgroup === activeSubgroup)

  return (
    <div
      id="main-content"
      style={{ background: '#F7F5EE', minHeight: '100vh', paddingTop: 64 }}
    >
      {/* Header */}
      <div
        className="section-py-sm text-center"
        style={{ background: '#173F35', borderBottom: '1px solid rgba(235,203,99,0.15)' }}
      >
        <div className="container-main flex flex-col items-center">
          <span className="eyebrow" style={{ color: '#EBCB63', marginBottom: '0.5rem', display: 'block' }}>
            Civil DAMP
          </span>
          <h1 className="text-section" style={{ color: '#F7F5EE' }}>
            Meet the Team
          </h1>
          <p
            className="text-body mt-3 text-center"
            style={{ color: 'rgba(247,245,238,0.75)', maxWidth: '48ch' }}
          >
            The DAMP team is available to help you navigate academics, courses, and campus life. Reach us directly at{' '}
            <a
              href="mailto:civildampcs26@gmail.com"
              style={{ color: '#EBCB63' }}
            >
              civildampcs26@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* ── DAMPC Overall Heads ── */}
      <section className="section-py-sm" style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E5DC' }}>
        <div className="container-main text-center">
          <div className="mb-8 flex flex-col items-center">
            <span className="eyebrow" style={{ marginBottom: '0.3rem', display: 'block' }}>Overall coordinators</span>
            <h2 className="text-card-title text-center" style={{ color: '#20241F' }}>
              DAMPC — Department Academic Mentorship Program
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 max-w-[860px] mx-auto">
            {dampc.map(person => (
              <PersonCard key={person.id} person={person} subDivision="Overall Coordinator" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Subgroup filter ── */}
      <div
        className="sticky z-30"
        style={{ top: 64, background: 'rgba(247,245,238,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E8E5DC' }}
      >
        <div className="container-main">
          <div
            className="flex justify-center gap-2 overflow-x-auto no-scrollbar py-3"
            role="tablist"
            aria-label="Filter by subgroup"
          >
            {['All', ...ALL_SUBGROUPS].map(sg => (
              <button
                key={sg}
                role="tab"
                aria-selected={activeSubgroup === sg}
                onClick={() => setActiveSubgroup(sg)}
                className={`tab-pill ${activeSubgroup === sg ? 'tab-pill-active' : 'tab-pill-inactive'}`}
              >
                {sg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subgroup Heads ── */}
      {filteredHeads.length > 0 && (
        <section className="section-py-sm" style={{ background: '#F7F5EE' }}>
          <div className="container-main text-center">
            <div className="mb-8 flex flex-col items-center">
              <span className="eyebrow" style={{ marginBottom: '0.3rem', display: 'block' }}>Leadership</span>
              <h2 className="text-card-title text-center" style={{ color: '#20241F' }}>
                Subgroup Heads
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 max-w-[860px] mx-auto">
              {filteredHeads.map(head => (
                <PersonCard key={head.id} person={head} subDivision={head.subgroup} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Mentors / Members ── */}
      {filteredMentors.length > 0 && (
        <section
          className="section-py-sm"
          style={{ background: '#FFFFFF', borderTop: '1px solid #E8E5DC' }}
        >
          <div className="container-main text-center">
            <div className="mb-8 flex flex-col items-center">
              <span className="eyebrow" style={{ marginBottom: '0.3rem', display: 'block' }}>Team Members</span>
              <h2 className="text-card-title text-center" style={{ color: '#20241F' }}>
                {activeSubgroup === 'All' ? 'All Members' : `${activeSubgroup} Members`}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 max-w-[860px] mx-auto">
              {filteredMentors.map(mentor => (
                <PersonCard key={mentor.id} person={mentor} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
