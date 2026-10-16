import { ExternalLink, ArrowUpRight, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { importantLinks } from '../data/dummy'
import { ScrollReveal } from '../components/ScrollAnimations'

export default function Resources() {
  const [query, setQuery] = useState('')

  const filteredSections = importantLinks.map(sec => ({
    ...sec,
    links: sec.links.filter(l => 
      l.title.toLowerCase().includes(query.toLowerCase()) || 
      l.description.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(sec => sec.links.length > 0)

  return (
    <div className="page-fade pt-24 pb-20 min-h-screen bg-[#faf9f5]">
      {/* Creso-style Hero Section */}
      <section className="relative overflow-hidden creso-hero-glow pt-10 pb-16 border-b border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-2xs text-xs font-semibold text-neutral-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Curated Campus Directory</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Important Links & Essential <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-amber-600">Portals</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Instant access to IIT Bombay ASC, civil software licenses, research archives, library repositories, and student administrative services.
          </p>

          {/* Quick Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search links, portals, guidelines..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-neutral-200/90 shadow-xs text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Directory Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSections.map((section, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 0.08}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_2px_16px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col h-full">
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-100">
                  <span className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-xl shadow-2xs">
                    {section.icon}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-neutral-900">
                      {section.category}
                    </h2>
                    <span className="text-xs text-neutral-400 font-mono">
                      {section.links.length} verified resource{section.links.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  {section.links.map((link, linkIdx) => {
                    const isInternal = link.url.startsWith('#') || link.url.startsWith('/')
                    const internalPath = link.url.startsWith('#') ? `/${link.url.replace('#', '')}` : link.url

                    return isInternal ? (
                      <Link
                        key={linkIdx}
                        to={internalPath}
                        className="group flex items-start justify-between p-3.5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/70 transition-all"
                      >
                        <div className="pr-4">
                          <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-amber-700 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                        <span className="text-neutral-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0">
                          →
                        </span>
                      </Link>
                    ) : (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start justify-between p-3.5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/70 transition-all"
                      >
                        <div className="pr-4">
                          <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-amber-700 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={15}
                          className="text-neutral-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5 shrink-0"
                        />
                      </a>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200/80 p-8">
            <p className="text-neutral-600 font-medium">No resources match "{query}"</p>
            <button
              onClick={() => setQuery('')}
              className="mt-4 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
