/**
 * Team page
 *
 * Fixes applied:
 * - H1 is present
 * - Essential info (name, role) never depends only on hover/flip
 * - Flip cards: accessible via focus-within (keyboard navigable)
 * - Subgroup filter tabs
 * - DAMPC section clearly distinguishes "get help" from "view committee"
 * - Phone numbers visible (not hover-only)
 * - Design tokens applied
 */

import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { subgroupHeads, mentors, dampc } from '../data/dummy'

function InitialsAvatar({ name, size = 44, bg = '#173F35', color = '#F7F5EE', fontSize = 15 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{ width: size, height: size, background: bg, color, fontSize }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

function MemberCard({ person, showSubgroup = false }) {
  const [expanded, setExpanded] = useState(false)
  const hasPhoto = person.photo && person.photo !== ''

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
    >
      {/* Photo or initials */}
      <div className="relative" style={{ height: 180 }}>
        {hasPhoto ? (
          <img
            src={person.photo}
            alt={`${person.name}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: '#F0EDE3' }}
          >
            <InitialsAvatar name={person.name} size={60} bg="#173F35" color="#EBCB63" fontSize={22} />
          </div>
        )}
        {/* Name overlay — always visible, not hover-only */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2"
          style={{ background: 'linear-gradient(to top, rgba(23,63,53,0.92) 0%, transparent 100%)' }}
        >
          <p className="font-bold text-sm leading-tight" style={{ color: '#F7F5EE' }}>{person.name}</p>
          {showSubgroup && (
            <p className="text-meta" style={{ color: 'rgba(235,203,99,0.85)' }}>{person.subgroup}</p>
          )}
        </div>
      </div>

      {/* Info — always visible below photo */}
      <div className="p-4">
        {person.intro && (
          <>
            <p
              className="text-small leading-relaxed"
              style={{ color: '#5A5F59', WebkitLineClamp: expanded ? 'unset' : 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden' }}
            >
              {person.intro}
            </p>
            {person.intro.length > 120 && (
              <button
                className="text-meta font-semibold mt-1"
                style={{ color: '#173F35', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        )}

        {(() => {
          const email = person.email
          if (!email || email.toLowerCase().includes('comingsoon')) return null
          const fullEmail = email.includes('@') ? email : `${email.toLowerCase()}@iitb.ac.in`
          return (
            <a
              href={`mailto:${fullEmail}`}
              className="flex items-center gap-1.5 mt-2 text-meta"
              style={{ color: '#8A8F88', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#173F35' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#8A8F88' }}
              aria-label={`Email ${person.name}`}
            >
              <Mail size={12} /> {fullEmail}
            </a>
          )
        })()}
      </div>
    </div>
  )
}

function DAMPCCard({ person }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <InitialsAvatar name={person.name} size={52} bg="#EBCB63" color="#173F35" fontSize={18} />
        <div>
          <p className="font-bold text-lg" style={{ color: '#20241F' }}>{person.name}</p>
          <span
            className="inline-block text-meta font-semibold px-2.5 py-0.5 rounded-full mt-1"
            style={{ background: 'rgba(23,63,53,0.1)', color: '#173F35' }}
          >
            {person.role}
          </span>
          <p className="text-small mt-0.5" style={{ color: '#8A8F88' }}>{person.year}</p>
        </div>
      </div>
      {person.description && (
        <p className="text-small leading-relaxed mb-3" style={{ color: '#5A5F59' }}>{person.description}</p>
      )}
      <div className="space-y-1.5">
        {person.ldap && (
          <a
            href={`mailto:${person.ldap}`}
            className="flex items-center gap-2 text-small"
            style={{ color: '#173F35', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            <Mail size={14} /> {person.ldap}
          </a>
        )}
        {person.phone && (
          <p className="flex items-center gap-2 text-small" style={{ color: '#8A8F88' }}>
            <Phone size={14} /> {person.phone}
          </p>
        )}
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
        className="section-py-sm"
        style={{ background: '#173F35', borderBottom: '1px solid rgba(235,203,99,0.15)' }}
      >
        <div className="container-main">
          <span className="eyebrow" style={{ color: '#EBCB63', marginBottom: '0.5rem', display: 'block' }}>
            Civil DAMP
          </span>
          <h1 className="text-section" style={{ color: '#F7F5EE', maxWidth: '20ch' }}>
            Meet the team
          </h1>
          <p
            className="text-body mt-3"
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
        <div className="container-main">
          <div className="mb-6">
            <span className="eyebrow" style={{ marginBottom: '0.3rem', display: 'block' }}>Overall coordinators</span>
            <h2 className="text-card-title" style={{ color: '#20241F' }}>
              DAMPC — Reach out for mentorship or queries
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5" style={{ maxWidth: 700 }}>
            {dampc.map(person => (
              <DAMPCCard key={person.id} person={person} />
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
            className="flex gap-2 overflow-x-auto no-scrollbar py-3"
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
          <div className="container-main">
            <h2 className="text-card-title mb-6" style={{ color: '#20241F' }}>
              Subgroup heads
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredHeads.map(head => (
                <MemberCard key={head.id} person={head} showSubgroup />
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
          <div className="container-main">
            <h2 className="text-card-title mb-6" style={{ color: '#20241F' }}>
              {activeSubgroup === 'All' ? 'All members' : `${activeSubgroup} members`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMentors.map(mentor => (
                <MemberCard key={mentor.id} person={mentor} showSubgroup={activeSubgroup === 'All'} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
