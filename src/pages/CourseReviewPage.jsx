/**
 * CourseReviewPage - dedicated full-page view for a single senior course review.
 * Accessed via /academics/review/:id
 */

import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, BookOpen, Sparkles, User } from "lucide-react"
import { courseReviews } from "../data/dampReviewsData"

const typeColors = {
  "Dept Core":                  { bg: "rgba(23,63,53,0.1)",   text: "#173F35" },
  "Institute Core":             { bg: "rgba(37,99,235,0.1)",  text: "#1d4ed8" },
  "Dept Elective":              { bg: "rgba(124,58,237,0.1)", text: "#6d28d9" },
  "Institute / Tech Elective":  { bg: "rgba(14,165,233,0.1)", text: "#0369a1" },
  "Institute Elective":         { bg: "rgba(14,165,233,0.1)", text: "#0369a1" },
  "Interdisciplinary Elective": { bg: "rgba(5,150,105,0.1)",  text: "#047857" },
  "STEM Elective":              { bg: "rgba(5,150,105,0.1)",  text: "#047857" },
  "HSS Elective":               { bg: "rgba(217,119,6,0.1)",  text: "#b45309" },
  "Policy / Open Elective":     { bg: "rgba(217,119,6,0.1)",  text: "#b45309" },
}
const diffColors = {
  Easy:   { bg: "rgba(5,150,105,0.1)",  text: "#047857" },
  Medium: { bg: "rgba(37,99,235,0.1)",  text: "#1d4ed8" },
  Hard:   { bg: "rgba(220,38,38,0.1)",  text: "#b91c1c" },
}
function Tag({ label, colorKey, colors }) {
  const c = (colors && colors[colorKey]) || { bg: "rgba(0,0,0,0.06)", text: "#374151" }
  return <span className="text-meta font-semibold px-2.5 py-1 rounded-full inline-flex items-center" style={{ background: c.bg, color: c.text }}>{label}</span>
}
function isInternalWarning(line) {
  const l = line.trim().toLowerCase()
  return (
    l.startsWith("⚠") ||
    l.includes("internal only") ||
    l.includes("do not screenshot") ||
    l.includes("do not forward") ||
    l.includes("inform the senior of confidentiality") ||
    l.startsWith("your name:") ||
    l.startsWith("senior's name:") ||
    l.startsWith("senior name:") ||
    l.startsWith("date of call:") ||
    l.startsWith("call date:") ||
    l.startsWith("section(s) covered:") ||
    l.startsWith("during the call:") ||
    l.includes("type up your notes") ||
    l.includes("call details")
  )
}
export default function CourseReviewPage() {
  const { id } = useParams()
  const item = courseReviews.find(r => String(r.id) === String(id))
  if (!item) {
    return (
      <div id="main-content" style={{ background: "#F7F5EE", minHeight: "100vh", paddingTop: 64 }} className="flex items-center justify-center">
        <div className="text-center p-10">
          <p className="font-bold text-xl mb-2" style={{ color: "#20241F" }}>Review not found</p>
          <Link to="/academics?tab=0" className="btn-primary inline-flex items-center gap-2 mt-4"><ArrowLeft size={16} /> Back to Reviews</Link>
        </div>
      </div>
    )
  }
  const hasMetrics = item.metrics && Object.keys(item.metrics).length > 0
  return (
    <div id="main-content" style={{ background: "#F7F5EE", minHeight: "100vh", paddingTop: 64 }}>
      <div className="sticky z-20" style={{ top: 64, background: "rgba(247,245,238,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E8E5DC" }}>
        <div className="container-main py-3 flex items-center gap-3">
          <Link to="/academics?tab=0" className="inline-flex items-center gap-1.5 text-small font-semibold hover:underline" style={{ color: "#173F35" }}>
            <ArrowLeft size={15} /> All Course Reviews
          </Link>
          <span style={{ color: "#DDD9CC" }}>&rsaquo;</span>
          <span className="text-small font-mono font-bold" style={{ color: "#20241F" }}>{item.code}</span>
          <span className="hidden sm:inline text-small truncate" style={{ color: "#8A8F88" }}>{item.name}</span>
        </div>
      </div>
      <div className="container-main" style={{ maxWidth: 820, paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-meta font-bold font-mono px-2.5 py-1 rounded-md" style={{ background: "#F0EDE3", color: "#173F35" }}>{item.code}</span>
            <Tag label={item.type || "Elective"} colorKey={item.type} colors={typeColors} />
            {item.difficulty && <Tag label={item.difficulty} colorKey={item.difficulty} colors={diffColors} />}
            {item.leniency && <span className="text-meta font-bold px-2.5 py-0.5 rounded-full" style={{ background: "rgba(235,203,99,0.2)", color: "#855e09" }}>Leniency: {item.leniency}</span>}
          </div>
          <h1 className="font-bold mb-2" style={{ color: "#20241F", lineHeight: 1.2, fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>{item.name}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-small" style={{ color: "#5A5F59" }}>
            <span>Instructor: <strong>{item.professor}</strong></span>
            <span>·</span>
            <span>Semester: <strong>Sem {item.semester}</strong></span>
            {item.rating && (<><span>·</span><span className="inline-flex items-center gap-1 text-amber-600 font-bold"><Star size={14} className="fill-amber-500 text-amber-500" />{item.rating} / 5</span></>)}
          </div>
          <div className="mt-3.5 inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl text-meta" style={{ background: "#F7F5EE", border: "1px solid #E8E5DC", color: "#5A5F59" }}>
            <span className="font-semibold flex items-center gap-1.5" style={{ color: "#20241F" }}>
              <User size={13} style={{ color: "#173F35" }} />
              Verified Department Senior Review
            </span>
          </div>
        </div>
        <hr style={{ borderColor: "#E8E5DC", marginBottom: "1.5rem" }} />
        {item.review && (
          <div className="rounded-2xl p-5 mb-5" style={{ background: "rgba(23,63,53,0.05)", border: "1px solid rgba(23,63,53,0.12)" }}>
            <div className="flex items-center gap-2 mb-2"><Sparkles size={15} style={{ color: "#173F35" }} /><span className="text-meta font-bold uppercase tracking-wider" style={{ color: "#173F35" }}>Summary / Key Highlights</span></div>
            <p className="text-small leading-relaxed" style={{ color: "#3A3F38" }}>{item.review}</p>
          </div>
        )}
        {hasMetrics && (
          <div className="rounded-2xl p-5 mb-5" style={{ background: "#FFFFFF", border: "1px solid #DDD9CC" }}>
            <p className="text-meta font-bold uppercase tracking-wider mb-3" style={{ color: "#8A8F88" }}>Senior Rating Breakdown (1-10)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-small">
              {Object.entries(item.metrics).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-xl bg-[#F7F5EE] border border-[#DDD9CC]/70">
                  <span className="text-meta block font-medium" style={{ color: "#8A8F88" }}>{k}</span>
                  <span className="font-bold text-sm" style={{ color: "#173F35" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E8E5DC]">
            <span className="text-meta font-bold uppercase tracking-wider" style={{ color: "#173F35" }}>Complete Senior Review (As Submitted)</span>
          </div>
          {item.verbatimSections && item.verbatimSections.length > 0 ? (
            <div className="space-y-4">
              {item.verbatimSections.map((sec, sIdx) => {
                const visibleLines = sec.lines.filter(l => !isInternalWarning(l))
                if (visibleLines.length === 0) return null
                return (
                  <div key={sIdx} className="rounded-2xl p-5 bg-[#FDFCF9] border border-[#DDD9CC]">
                    <h2 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: "#173F35" }}>
                      <BookOpen size={14} />{sec.heading}
                    </h2>
                    <div className="space-y-2">
                      {visibleLines.map((line, lIdx) => {
                        const isQ = /^\d+\./.test(line.trim()) || (line.trim().endsWith("?") && line.length < 130)
                        return isQ ? (
                          <p key={lIdx} className="font-bold text-sm mt-3 pt-2 first:mt-0 first:pt-0 border-t border-[#F0EDE3] first:border-0" style={{ color: "#173F35" }}>{line}</p>
                        ) : (
                          <p key={lIdx} className="text-small leading-relaxed" style={{ color: "#3A3F38" }}>{line}</p>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-small p-5 bg-[#FDFCF9] rounded-2xl border border-[#DDD9CC] text-[#3A3F38] leading-relaxed">{item.rawContent || item.review}</pre>
          )}
        </div>
        <div className="mt-10 pt-6 border-t border-[#E8E5DC]">
          <Link to="/academics?tab=0" className="btn-outline inline-flex items-center gap-2"><ArrowLeft size={15} /> Back to All Reviews</Link>
        </div>
      </div>
    </div>
  )
}
