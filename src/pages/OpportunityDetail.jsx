import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Trophy,
  Award,
  Calendar,
  Globe2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Users,
  Building2,
  FileText
} from 'lucide-react'
import { allOpportunities } from '../data/dummy'

export default function OpportunityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Match by numeric id
  const opportunity = allOpportunities.find(o => o.id.toString() === id) || allOpportunities[0]

  if (!opportunity) {
    return (
      <div className="bg-[#faf9f5] min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-neutral-200">
          <p className="text-neutral-500 mb-4 text-sm">Opportunity details not found.</p>
          <Link to="/opportunities" className="text-xs font-bold text-neutral-900 underline">
            Return to Additional Opportunities
          </Link>
        </div>
      </div>
    )
  }

  // Related opportunities
  const related = allOpportunities
    .filter(o => o.id !== opportunity.id)
    .slice(0, 3)

  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="pt-6 pb-8">
          <button
            onClick={() => navigate('/opportunities')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Additional Opportunities</span>
          </button>
        </div>

        {/* Opportunity Card Container */}
        <article className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-xs mb-10">
          <div className="border-b border-neutral-100 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono mb-3">
              <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
                {opportunity.category || opportunity.program || 'Opportunity'}
              </span>
              {opportunity.country && (
                <>
                  <span>·</span>
                  <span>{opportunity.country}</span>
                </>
              )}
              {opportunity.duration && (
                <>
                  <span>·</span>
                  <span>{opportunity.duration}</span>
                </>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {opportunity.name || opportunity.university}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-600">
              {opportunity.organizer && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 size={13} className="text-neutral-400" />
                  <span>Host: {opportunity.organizer}</span>
                </span>
              )}
              {opportunity.deadline && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar size={13} className="text-neutral-400" />
                  <span>Timeline / Deadline: {opportunity.deadline}</span>
                </span>
              )}
            </div>
          </div>

          {/* Quick Meta Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 mb-10 text-xs">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Eligibility & Candidate Profile
              </p>
              <p className="text-neutral-800 font-medium leading-relaxed">
                {opportunity.eligibility || 'Open to all Civil Engineering undergraduate and dual degree students.'}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Grants, Prizes & Funding
              </p>
              <p className="text-neutral-800 font-medium leading-relaxed">
                {opportunity.amount || 'Cash prize / travel sponsorship / academic merit citation.'}
              </p>
            </div>
          </div>

          {/* Detailed Overview */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-bold text-neutral-950 mb-3">
              Overview & Scope
            </h2>
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-neutral-700 text-sm leading-relaxed">
              {opportunity.description}
            </div>
          </section>

          {/* Highlights & Key Deliverables */}
          {opportunity.highlights && opportunity.highlights.length > 0 && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-neutral-950 mb-4">
                Key Components & Technical Highlights
              </h2>
              <div className="space-y-2.5">
                {opportunity.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-neutral-50/60 border border-neutral-200/60 flex items-start gap-3 text-xs sm:text-sm text-neutral-800"
                  >
                    <CheckCircle2 size={16} className="text-neutral-900 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selection Roadmap */}
          {opportunity.selectionProcess && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-bold text-neutral-950 mb-3">
                Evaluation & Selection Roadmap
              </h2>
              <div className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200 text-neutral-700 text-xs sm:text-sm leading-relaxed">
                {opportunity.selectionProcess}
              </div>
            </section>
          )}

          {/* External Links & Guidance */}
          <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              {opportunity.contact && (
                <p>
                  <strong className="text-neutral-800">Contact / Coordinating Body:</strong> {opportunity.contact}
                </p>
              )}
            </div>

            {opportunity.link && opportunity.link !== '#' && (
              <a
                href={opportunity.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </article>

        {/* More Opportunities */}
        {related.length > 0 && (
          <div>
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Explore More
              </p>
              <h3 className="font-display text-xl font-bold text-neutral-950">
                Other Competitions & Fellowships
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(rel => (
                <Link
                  key={rel.id}
                  to={`/opportunity/${rel.id}`}
                  className="bg-white rounded-2xl p-5 border border-neutral-200/80 hover:border-neutral-400 hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {rel.category || 'Opportunity'}
                    </span>
                    <h4 className="font-display font-bold text-sm text-neutral-950 group-hover:text-neutral-700 transition-colors mt-1 mb-2">
                      {rel.name || rel.university}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {rel.organizer || rel.country}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-900 font-semibold">
                    <span>Read details</span>
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
