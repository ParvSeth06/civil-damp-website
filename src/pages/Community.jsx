import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Users, ExternalLink, Sparkles, MapPin, Calendar, Award, ChevronRight } from 'lucide-react'
import { clubs, events, achievements, alumni } from '../data/dummy'

const LinkedInIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const tabs = ['Student Bodies & CEA', 'Events & AAKAAR Fest', 'Department Milestones', 'Distinguished Alumni']

const clubCategoryColors = {
  'Department Body': { bg: 'rgba(15, 23, 42, 0.08)', text: '#0f172a' },
  'Flagship Festival': { bg: 'rgba(225, 29, 72, 0.1)', text: '#be123c' },
  Technical: { bg: 'rgba(37, 99, 235, 0.1)', text: '#2563eb' },
  'Social Impact': { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
  Publications: { bg: 'rgba(147, 51, 234, 0.1)', text: '#7e22ce' },
}

export default function Community() {
  const [searchParams] = useSearchParams()
  const tabParam = parseInt(searchParams.get('tab')) || 0
  const [activeTab, setActiveTab] = useState(tabParam)

  useEffect(() => { setActiveTab(tabParam) }, [tabParam])

  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-16">
      {/* Hero Header */}
      <div className="py-20 sm:py-24 text-center border-b border-neutral-200/80 creso-hero-glow bg-grid-pattern">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 bg-white/90 border border-neutral-200/90 text-neutral-700 shadow-2xs">
            <Sparkles size={13} className="text-amber-500" />
            <span>CEA · AAKAAR Fest · EERI · Alumni</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Community & Outreach
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Explore the official Civil Engineering Association (CEA), AAKAAR (Asia's largest civil engineering festival), student technical chapters, and distinguished alumni from IIT Bombay.
          </p>
        </div>
      </div>

      {/* Modern Pill Tabs */}
      <div className="sticky top-16 z-30 bg-[#faf9f5]/95 backdrop-blur-md border-b border-neutral-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-all duration-150 ${
                  activeTab === i
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white/80 text-neutral-600 hover:text-neutral-900 border border-neutral-200/70 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab 0: Clubs */}
        {activeTab === 0 && (
          <div>
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Student Bodies</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mt-1 mb-2">
                Departmental Societies & Student Initiatives
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed">
                From the official Civil Engineering Association (CEA) to technical societies and editorial teams, discover active student bodies shaping campus life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {clubs.map(club => {
                const cc = clubCategoryColors[club.category] || { bg: '#f1f5f9', text: '#334155' }
                return (
                  <div
                    key={club.id}
                    className="bg-white rounded-3xl p-6 hover-lift border border-neutral-200/80 shadow-2xs hover:border-neutral-300 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {club.shortName.slice(0, 3)}
                        </div>
                        <span
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: cc.bg, color: cc.text }}
                        >
                          {club.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-neutral-900 mb-2 text-base leading-snug">{club.name}</h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed">{club.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs">
                      <span className="flex items-center gap-1.5 text-neutral-500 font-medium">
                        <Users size={13} className="text-neutral-400" /> {club.members} active members
                      </span>
                      {club.link !== '#' && (
                        <a
                          href={club.link}
                          target="_blank"
                          rel="noreferrer"
                          className="creso-btn-primary !text-[11px] !py-1 !px-3"
                        >
                          <span>Portal</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab 1: Events */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map(event => (
              <div
                key={event.id}
                className="flex gap-4 p-6 bg-white rounded-3xl hover-lift border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-neutral-900 text-white flex flex-col items-center justify-center shadow-xs">
                  <span className="text-lg font-extrabold leading-none">{event.day}</span>
                  <span className="text-[10px] uppercase font-bold text-neutral-300 mt-0.5">{event.month}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-neutral-900 mb-1 text-base leading-snug">{event.name}</h4>
                  <p className="text-xs text-neutral-500 mb-2 flex items-center gap-1">
                    <MapPin size={12} className="text-neutral-400" />
                    <span>{event.venue}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">{event.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:gap-1.5 transition-all"
                  >
                    <span>Get Involved / Inquire</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Achievements */}
        {activeTab === 2 && (
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 sm:pl-10 border-l-2 border-neutral-200 space-y-8">
              {achievements.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] sm:-left-[49px] top-1 w-5 h-5 rounded-full bg-neutral-900 border-4 border-[#faf9f5]" />
                  <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all">
                    <span className="inline-block text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/60 mb-2">
                      {item.year}
                    </span>
                    <h4 className="font-bold text-neutral-900 text-base mb-1.5">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Alumni */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {alumni.map(person => (
              <div
                key={person.id}
                className="bg-white rounded-3xl p-6 hover-lift border border-neutral-200/80 shadow-2xs hover:border-neutral-300 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                      {person.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm leading-snug">{person.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-medium">{person.batch}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-neutral-900 mb-0.5">{person.role}</p>
                  <p className="text-xs text-neutral-700 font-medium">{person.company}</p>
                  <p className="text-xs text-neutral-400 mb-4">{person.location}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
                  >
                    <LinkedInIcon size={13} />
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

