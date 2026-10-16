import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Calendar, CheckCircle2, User, Building2, Briefcase } from 'lucide-react'
import { internships, semexBlogs } from '../data/dummy'
import { useEffect } from 'react'

// Rich long-form detailed articles for core experiences
const internshipStories = {
  1: {
    overview: `Securing a structural engineering internship at Larsen & Toubro (L&T Construction) was the primary goal I set at the start of my third year. As one of the largest infrastructure conglomerates in South Asia, L&T provides unparalleled exposure to real-world structural design codes and site execution.`,
    selectionProcess: `The selection process began in October with an initial shortlisting based on CGPA (typically 8.0+ for core design verticals) and coursework performance in CE 221 Solid Mechanics and CE 301 Structural Analysis. 
    
    The technical interview was approximately 45 minutes long. The panel asked me to draw shear force and bending moment diagrams for continuous beams under asymmetric live loads, explain the physical rationale behind limit state design provisions in IS 456:2000, and discuss how column effective lengths are derived in sway versus non-sway frames.`,
    dayToDayWork: `For eight weeks, I was embedded in the RC frame analysis team for a 15-storey commercial tower in Hyderabad. My responsibilities included:
    • Modelling structural geometry, gravity, and wind combinations in ETABS 2021.
    • Verifying drift limits and torsional irregularity criteria according to IS 1893:2016.
    • Reviewing rebar scheduling drawings and performing site coordination visits to cross-verify detailing tolerances against theoretical drafts.`,
    learnings: `The transition from academic problem sets to commercial engineering design is profound. In university, materials are idealized; on site, constructability, concrete pour sequences, and rebar congestion dictate design feasibility. Gaining confidence with ETABS and IS detailing standards has been invaluable for my subsequent coursework and career planning.`,
    advice: `Master your core fundamentals in Solid Mechanics and Reinforced Concrete. Do not just memorize code clauses—understand the mechanics behind them. Practice explaining structural load paths out loud before interviews.`,
  },
  2: {
    overview: `Arup is world-renowned for design excellence, sustainable engineering, and multidisciplinary infrastructure consulting. My internship at their Gurugram office allowed me to collaborate with seasoned transport planners on regional metro expansion studies.`,
    selectionProcess: `The selection process involved a transport analytics assessment followed by a case interview and behavioural round. The case question required proposing a multimodal interchange layout between a proposed metro station and an existing arterial highway, balancing pedestrian safety, bus feeder bays, and commuter transfer times.`,
    dayToDayWork: `My core assignment focused on transit demand forecasting and traffic network assignment:
    • Running traffic assignment iterations using PTV VISUM based on household travel survey data.
    • Evaluating passenger volume-capacity ratios across projected transit corridors.
    • Drafting technical sections for the Environmental Impact Assessment (EIA) detailing emissions reduction benefits of modal shifts to metro transit.`,
    learnings: `Arup's flat organizational culture encourages young engineers to voice their perspectives. I learned that transportation planning is equal parts quantitative systems engineering and urban sociology.`,
    advice: `Familiarize yourself with four-step travel demand modeling (trip generation, distribution, mode choice, assignment) and develop strong structured communication skills.`,
  },
  3: {
    overview: `Spending two months at the Department of Civil Engineering, IISc Bangalore gave me a genuine look into pure and applied water resources research alongside leading hydrologists.`,
    selectionProcess: `I initiated the internship through an email proposal addressed to the research group after reviewing two recent papers on river basin hydrology. Having a clear idea of what hydrological tools I wanted to learn (SWAT and QGIS) helped stand out.`,
    dayToDayWork: `My project focused on hydrological modelling of the Krishna River Basin under climate change projections:
    • Delineating sub-basins and stream networks in QGIS using high-resolution DEM data.
    • Calibrating and validating the SWAT model against 20 years of observed streamflow records from Central Water Commission (CWC) gauge stations.
    • Analysing flow duration curves to forecast dry-season water stress.`,
    learnings: `I gained extensive programming experience in Python for meteorological data processing and co-authored a conference submission presented at HYDRO 2024.`,
    advice: `If you are drawn to academic research, reach out early with specific technical questions. Demonstrating familiarity with Python and GIS will immediately set you apart.`,
  },
  4: {
    overview: `Working with the Urban Infrastructure vertical at NITI Aayog provided a national perspective on how infrastructure policies, urban mobility frameworks, and funding schemes are evaluated.`,
    selectionProcess: `Applied via the official NITI Aayog portal. The selection weighed academic record and a policy statement of purpose explaining how civil engineering principles can improve municipal service delivery.`,
    dayToDayWork: `I contributed to the assessment framework for the Smart Cities Mission:
    • Analyzing municipal performance indicators across 100 smart cities in mobility, solid waste, and water distribution.
    • Drafting policy briefs and comparative performance scorecards for municipal commissioners.
    • Participating in stakeholder roundtables with transit planners and municipal engineers.`,
    learnings: `Learned that the best engineering plans succeed or fail based on institutional capacity, governance, and financing models.`,
    advice: `Read up on national missions (AMRUT, Smart Cities, PM Gati Shakti). Engineers who understand policy and project finance are exceptionally rare.`,
  },
  5: {
    overview: `Stationed directly on the Mumbai Coastal Road Project with Afcons Infrastructure, this internship provided direct exposure to complex marine reclamation, slurry TBM tunnel boring, and breakwater design.`,
    selectionProcess: `Selection prioritized students who excelled in geotechnical engineering, soil mechanics, and foundation design, complemented by a technical interview on earth pressure theories.`,
    dayToDayWork: `Every day was spent on the reclaimed package along the Arabian Sea:
    • Observing 12-meter diameter slurry Tunnel Boring Machine (TBM) operations beneath Malabar Hill.
    • Inspecting inclinometer and settlement marker instrumentation readings to ensure zero subsidence along the alignment.
    • Conducting marine concrete slump tests and monitoring rock armor placement for coastal protection dykes.`,
    learnings: `Seeing theoretical geotechnical instrumentation in real-time action on a live mega-project completely transformed my understanding of ground mechanics.`,
    advice: `Take your Geotechnical and Fluid Mechanics laboratory sessions seriously. Knowing how physical tests work will make you instantly useful on any mega project site.`,
  },
  6: {
    overview: `Tata Consulting Engineers (TCE) is an industry benchmark for industrial plant and structural engineering consultancy. My two months in their design office grounded me in structural steelwork and heavy equipment foundations.`,
    selectionProcess: `Technical assessment testing steel structural mechanics, truss analysis, and limit state design concepts from IS 800:2007.`,
    dayToDayWork: `Assigned to an industrial manufacturing plant design team:
    • Performing 3D structural modeling and load combination analysis in STAAD.Pro.
    • Verifying connection design calculations (welded and bolted joints) for heavy crane gantry girders.
    • Checking equipment foundation dynamics against machine vibration tolerances.`,
    learnings: `Gained working familiarity with industrial engineering codes, connection detailing, and professional engineering drawing review.`,
    advice: `Practice STAAD.Pro and steel design hand calculations. Industrial infrastructure offers incredible technical depth for structural engineers.`,
  },
}

export default function ExperienceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const expId = parseInt(id)

  const item = internships.find(i => i.id === expId)
  const story = internshipStories[expId]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!item) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center max-w-md">
          <h2 className="font-display font-bold text-xl text-neutral-900 mb-2">Experience Not Found</h2>
          <p className="text-xs text-neutral-500 mb-6">The experience story you are looking for does not exist.</p>
          <Link to="/experience" className="creso-btn-primary !py-2 !px-4 text-xs">
            ← Back to Experiences
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#faf9f5] text-neutral-900">
      {/* Top Header */}
      <div className="py-12 sm:py-16 bg-white border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Experiences</span>
          </Link>

          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            {item.category} Engineering Experience
          </p>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-2">
            {item.company}
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 font-semibold mb-6">
            {item.role}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-600 pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-neutral-400" />
              <strong>{item.author}</strong> ({item.batch})
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-neutral-400" />
              {item.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-neutral-400" />
              {item.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-neutral-400" />
              {item.date}
            </span>
          </div>
        </div>
      </div>

      {/* Main Narrative Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/80 shadow-2xs space-y-10 text-neutral-800 leading-relaxed text-sm sm:text-base">
          {/* Executive Overview */}
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-3">
              Overview & Background
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {story?.overview || item.excerpt}
            </p>
          </div>

          {/* Selection & Interview Process */}
          {story?.selectionProcess && (
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-3">
                Selection & Technical Interview Rounds
              </h2>
              <div className="text-neutral-700 leading-relaxed space-y-3 whitespace-pre-line">
                {story.selectionProcess}
              </div>
            </div>
          )}

          {/* Day-to-Day Responsibilities */}
          {story?.dayToDayWork && (
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-3">
                Key Engineering Projects & Work Handled
              </h2>
              <div className="text-neutral-700 leading-relaxed space-y-3 whitespace-pre-line">
                {story.dayToDayWork}
              </div>
            </div>
          )}

          {/* Core Technical Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="p-6 bg-[#faf9f5] rounded-2xl border border-neutral-200">
              <h3 className="font-display font-bold text-base text-neutral-950 mb-3">
                Tools, Standards & Methodologies Mastered
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium text-neutral-800">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-neutral-900 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Learnings & Takeaways */}
          {story?.learnings && (
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-3">
                Key Learnings
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {story.learnings}
              </p>
            </div>
          )}

          {/* Advice for Juniors */}
          {story?.advice && (
            <div className="pt-6 border-t border-neutral-100">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-950 mb-3">
                Advice for 2nd & 3rd-Year Students
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {story.advice}
              </p>
            </div>
          )}
        </article>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            ← View All Core Experiences
          </Link>
        </div>
      </div>
    </div>
  )
}
