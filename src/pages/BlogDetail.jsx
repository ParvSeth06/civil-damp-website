import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar, Tag, ArrowRight } from 'lucide-react'
import { blogs, semexBlogs } from '../data/dummy'
import { useEffect } from 'react'

// Category tags styling
const categoryStyles = {
  Internships: { bg: 'rgba(23,63,53,0.1)', text: '#173F35' },
  'Semester Exchange': { bg: 'rgba(235,203,99,0.25)', text: '#7c5e10' },
  Research: { bg: 'rgba(124,58,237,0.1)', text: '#6d28d9' },
  Placements: { bg: 'rgba(37,99,235,0.1)', text: '#1d4ed8' },
  Academics: { bg: 'rgba(5,150,105,0.1)', text: '#047857' },
}

// Expand each blog with full content
const blogContent = {
  1: `Landing a core civil engineering internship at L&T is a dream for many CE students at IIT Bombay, and it was mine too. After two years of watching seniors head off to job sites in Hyderabad and Chennai, I was determined to make it happen in my third year.

**Preparation (Oct–Dec):**
I started by reviewing structural engineering resources from the DAMP portal. I re-read IS 456, made hand-written notes on column design, and solved problems from Pillai & Menon cover to cover. The trick was to not just memorize but understand *why* each clause exists.

**The Resume:**
L&T's JMT (Junior Management Trainee) program shortlists based on CGPA (mine was 8.4) and relevant project work. I highlighted my CE 301 project on a multi-storey frame and my summer project at a local construction site. Keep it one page, specific, and honest.

**The Interview:**
The technical round was intense — they asked me to design a simply supported beam live on the whiteboard, explain the concept of effective length of columns, and discuss IS 875 load combinations. Practice speaking through your thought process out loud.

**On the Job:**
For two months I was embedded in the RC frame design team for a commercial tower in Hyderabad. I ran ETABS models under supervision, checked rebar schedules, and attended site coordination meetings. The best part was seeing design decisions translate directly to steel being placed on site.

**Takeaway:**
Core internships at L&T are absolutely worth the preparation effort. You will leave with a working knowledge of ETABS, an understanding of how design codes are actually applied, and a network in one of India's largest construction companies.`,

  2: `Arup was a name I first heard in a guest lecture in my second year. By the time I applied, I knew exactly why I wanted to work there — they do genuinely interesting multi-disciplinary infrastructure work, and their Gurugram office handles major South Asia projects.

**How I got in:**
Arup's internship process involved a written assessment on transport planning fundamentals, followed by a case study and an HR interview. The case study involved proposing a BRT corridor alignment for a fictional Indian city — I focused on integration with existing metro and pedestrian safety.

**The Work:**
I was assigned to the transport demand modelling team working on a metro corridor feasibility study. My main task was running assignment iterations in VISUM and validating against traffic count data. I also helped draft sections of the Environmental Impact Assessment.

**The Culture:**
Arup is genuinely flat — I had direct conversations with Associates and even a Principal on a couple of occasions. They value intellectual curiosity over pedigree. Friday afternoon knowledge-sharing sessions were one of my favourite parts.

**For Aspirants:**
Read up on transport planning fundamentals — VISUM/VISSIM basics, four-step transport models, and level of service concepts. Arup values structured thinking and communication, so practice presenting your ideas clearly.`,

  3: `McKinsey was not on my radar until a DAMP talk in my second year where a senior described how CE engineers bring unique value to consulting — systems thinking, quantitative skills, and the ability to manage complexity. That talk changed my trajectory.

**Case Prep (3 months):**
I started with Case in Point and Victor Cheng's frameworks, then shifted to practicing cases daily with a study group of 4. We did 2 cases each per day over the last month. The key insight: consulting cases are about structured thinking, not specific knowledge.

**The Civil Advantage:**
In the final round, my case was about a port logistics company facing capacity constraints. My civil background let me speak naturally about berth utilisation, container yard layouts, and crane cycles — things a generic candidate would have to approximate. The partner noticed.

**Internship Life:**
I was placed in the Infrastructure Practice, working on a smart city project for a state government client. The work involved stakeholder interviews, data analysis in Excel and PowerPoint, and presenting to senior government officials. The travel was intense — 3 cities in 10 weeks.

**The Offer:**
I converted to a PPO (Pre-Placement Offer). My advice: show genuine intellectual curiosity, be structured under pressure, and don't pretend to know things you don't — say "I'd want to validate that assumption" instead.`,

  4: `Getting a research internship at IISc felt distant until I just cold-emailed Prof. D. Nagesh Kumar with a specific, well-researched proposal. Three weeks later I was on a bus to Bangalore.

**The Cold Email:**
I read two of the professor's recent papers, identified a gap I found genuinely interesting, and wrote a focused 200-word email explaining exactly what I wanted to work on and why. No generic "I am interested in your research" openers.

**The Work:**
Rainfall-runoff modelling using SWAT (Soil and Water Assessment Tool) for the Krishna river basin. I spent the first three weeks learning the software and understanding the basin's hydrology, then calibrated the model against observed streamflow data. By week six, we had results good enough for a conference paper.

**IISc Life:**
The campus is stunning. The food is good and cheap. The research culture is serious but collegial. I had access to computing resources far beyond what IITB undergrads typically get, and the interdisciplinary conversations at lunch were consistently stimulating.

**Outcome:**
We submitted to HYDRO 2024 and the paper was accepted. That one publication fundamentally changed my graduate school applications.`,

  5: `Three months at AECOM's Melbourne office was the most intensive professional experience of my life — and also the most formative.

**Getting the Internship:**
AECOM's international internship program requires applying through their global portal. I applied in August, had a video interview in September, and got the offer in October. The visa (subclass 485 is not applicable for short stays — I got a Temporary Activity visa) took six weeks.

**The Work:**
I was attached to the tunnelling team for the Melbourne Metro Tunnel project. My responsibilities included reviewing tunnel boring machine (TBM) ring data, comparing settlement predictions with actual surface monitoring data, and assisting with geotechnical risk registers.

**Living in Melbourne:**
Melbourne is an incredible city for civil engineering nerds. The tram network, the Victorian rail heritage, and modern mega-projects coexist seamlessly. The team was extremely welcoming and weekends were spent exploring Victoria.

**Key Advice:**
If you want an international internship, start early. Visa processes take time, and HR timelines in multinational firms are rigid. Build a strong foundation in soil mechanics and structural analysis beforehand.`,

  6: `Getting an internship at NITI Aayog's Urban Development vertical was an eye-opening look into how infrastructure policy is formed at the highest levels of the Indian government.

**Application Process:**
NITI Aayog accepts internship applications every month through their portal. The key is to apply exactly 6 months before your intended start date with a clear statement of purpose outlining how your academic background aligns with their ongoing verticals.

**My Role:**
I supported the team reviewing Smart Cities Mission progress across tier-2 cities. I compiled urban mobility indices, evaluated non-motorised transport (NMT) infrastructure guidelines, and prepared summary presentations for stakeholder consultations.

**Key Learnings:**
Technical feasibility is only one component of public infrastructure. Financial models, political economy, and citizen adoption determine whether a flyover, metro line, or cycling track actually succeeds.

**Who Should Apply:**
Anyone interested in urban planning, transport policy, smart city governance, or considering civil services alongside engineering.`,
}

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const blogId = parseInt(id)

  const allBlogs = [
    ...blogs.map(b => ({ ...b, isSemex: false })),
    ...semexBlogs.map(b => ({ ...b, id: b.id + 100, isSemex: true, category: 'Semester Exchange' })),
  ]

  const blog = allBlogs.find(b => b.id === blogId)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  if (!blog) {
    return (
      <div style={{ background: '#F7F5EE', minHeight: '100vh', paddingTop: 'calc(64px + 4rem)', paddingBottom: '4rem' }}>
        <div className="container-main text-center">
          <div
            className="rounded-3xl p-10 max-w-md mx-auto"
            style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
          >
            <p className="font-mono text-5xl font-bold mb-2" style={{ color: '#8A8F88' }}>404</p>
            <h1 className="text-section mb-2" style={{ color: '#20241F' }}>Story not found</h1>
            <p className="text-body mb-6" style={{ color: '#5A5F59' }}>
              The senior experience you are looking for doesn't exist or has moved.
            </p>
            <Link to="/opportunities?tab=0" className="btn-primary inline-flex">
              <ArrowLeft size={16} /> Back to Experiences
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const content = blogContent[blogId] || blog.excerpt
  const catStyle = categoryStyles[blog.category] || { bg: '#F0EDE3', text: '#20241F' }
  const related = blogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 2)

  return (
    <div id="main-content" style={{ background: '#F7F5EE', minHeight: '100vh', color: '#20241F' }}>

      {/* Header section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #173F35 0%, #1E5246 60%, #225048 100%)',
          paddingTop: 'calc(64px + 3rem)',
          paddingBottom: '3.5rem',
        }}
      >
        <div className="container-main" style={{ maxWidth: 840 }}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full text-small font-semibold transition-colors"
            style={{ background: 'rgba(247,245,238,0.12)', color: '#F7F5EE', border: '1px solid rgba(235,203,99,0.2)' }}
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <div className="mb-4">
            <span
              className="inline-block text-meta font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: 'rgba(235,203,99,0.2)', color: '#EBCB63', border: '1px solid rgba(235,203,99,0.35)' }}
            >
              {blog.category}
            </span>
          </div>

          <h1
            className="text-section"
            style={{ color: '#F7F5EE', lineHeight: 1.25, marginBottom: '1.25rem' }}
          >
            {blog.title}
          </h1>

          <div className="flex items-center flex-wrap gap-4 text-small" style={{ color: 'rgba(247,245,238,0.8)' }}>
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#F7F5EE' }}>
              <User size={14} style={{ color: '#EBCB63' }} /> {blog.author}
            </span>
            <span>·</span>
            <span>{blog.batch}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} style={{ color: '#EBCB63' }} /> {blog.date}
            </span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <div className="container-main" style={{ maxWidth: 840, paddingTop: '3rem', paddingBottom: '5rem' }}>

        <article
          className="rounded-3xl p-7 sm:p-12 mb-8"
          style={{ background: '#FFFFFF', border: '1px solid #DDD9CC', boxShadow: '0 2px 12px rgba(32,36,31,0.04)' }}
        >
          {/* Excerpt callout */}
          <div
            className="rounded-2xl p-5 mb-8"
            style={{ background: '#F7F5EE', borderLeft: '4px solid #173F35' }}
          >
            <p className="text-body font-medium italic" style={{ color: '#20241F', lineHeight: 1.6 }}>
              "{blog.excerpt}"
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6">
            {content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h2
                    key={i}
                    className="text-card-title pt-4 pb-1 font-bold"
                    style={{ color: '#173F35', borderBottom: '1px solid #F0EDE3' }}
                  >
                    {para.replace(/\*\*/g, '')}
                  </h2>
                )
              }
              const parts = para.split(/(\*\*[^*]+\*\*)/)
              return (
                <p key={i} className="text-body measure" style={{ color: '#3A3F38', lineHeight: 1.7 }}>
                  {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={j} style={{ color: '#20241F', fontWeight: 600 }}>
                        {part.replace(/\*\*/g, '')}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              )
            })}
          </div>
        </article>

        {/* Author card */}
        <div
          className="rounded-2xl p-6 mb-10 flex items-center gap-4"
          style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
        >
          <div
            className="w-13 h-13 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
            style={{ width: 48, height: 48, background: '#173F35', color: '#EBCB63' }}
            aria-hidden="true"
          >
            {blog.author.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-body" style={{ color: '#20241F' }}>{blog.author}</p>
            <p className="text-small" style={{ color: '#8A8F88' }}>
              {blog.batch} · Department of Civil Engineering, IIT Bombay
            </p>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-card-title font-bold" style={{ color: '#20241F' }}>
                More stories in {blog.category}
              </h3>
              <Link to="/opportunities?tab=0" className="btn-text text-small" style={{ color: '#173F35' }}>
                All experiences <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/blogs/${r.id}`}
                  className="rounded-2xl p-6 block hover-lift transition-all"
                  style={{ background: '#FFFFFF', border: '1px solid #DDD9CC' }}
                >
                  <span
                    className="inline-block text-meta font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                    style={{ background: catStyle.bg, color: catStyle.text }}
                  >
                    {r.category}
                  </span>
                  <h4 className="font-bold text-body mb-2" style={{ color: '#20241F', lineHeight: 1.35 }}>
                    {r.title}
                  </h4>
                  <p className="text-meta" style={{ color: '#8A8F88' }}>
                    {r.author} · {r.date}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/opportunities?tab=0" className="btn-secondary inline-flex">
            <ArrowLeft size={16} /> Back to Experiences & Opportunities
          </Link>
        </div>
      </div>
    </div>
  )
}
