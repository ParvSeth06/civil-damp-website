import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  Bookmark,
  Share2,
  Maximize2
} from 'lucide-react'
import { ScrollReveal } from '../components/ScrollAnimations'

const BOOKLET_PAGES = [
  {
    pageNumber: 1,
    chapter: 'Cover',
    title: 'Department of Civil Engineering',
    subtitle: 'Faculty Research Booklet · 2024–2025 Edition',
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full p-8 bg-neutral-950 text-white rounded-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold mb-6">
          CE
        </div>
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
          Indian Institute of Technology Bombay
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
          Faculty Research Directory & Lab Compendium
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-8">
          A comprehensive handbook covering the research interests, laboratory capabilities, and advisor profiles across all 7 disciplines of Civil Engineering.
        </p>
        <div className="pt-6 border-t border-white/15 w-full flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Published by Civil DAMP</span>
          <span>Academic Year 2024–25</span>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 2,
    chapter: 'Foreword',
    title: 'Foreword & Welcome Note',
    subtitle: 'From the Head of the Department',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif">
        <p className="text-sm font-sans font-bold text-neutral-900 not-italic">
          Welcome to the Department of Civil Engineering, IIT Bombay.
        </p>
        <p>
          Established in 1958, our department stands as one of the founding pillars of IIT Bombay. With over 55 full-time faculty members, 17 state-of-the-art laboratories, and consistent recognition as India’s premier civil engineering department (QS World Top 51–100), our research impacts society at large.
        </p>
        <p>
          Undergraduate research is an indispensable pillar of our academic culture. Whether through semester projects, summer research fellowships, or the final-year Bachelor Thesis Project (BTP), our faculty actively encourage students to tackle unresolved national and global challenges.
        </p>
        <p>
          This booklet, curated by the Department Academic Mentorship Program (DAMP), offers undergraduate scholars a direct window into the ongoing research initiatives across all seven disciplines. We urge every student to explore these domains and find faculty mentors who resonate with their intellectual curiosity.
        </p>
        <div className="pt-6 border-t border-neutral-200 not-italic font-sans">
          <p className="font-bold text-neutral-900 text-sm">Prof. Tom V Mathew</p>
          <p className="text-xs text-neutral-500">Head of Department & Professor of Transportation Systems Engineering</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 3,
    chapter: 'Specialization 01',
    title: 'Transportation Systems Engineering (TSE)',
    subtitle: 'Pavement Materials, ITS & Sustainable Mobility',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Research Domains & Core Topics:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Intelligent Transportation Systems (ITS):</strong> Real-time traffic signal optimization, automated vehicle tracking, and sensor data analytics.</li>
          <li><strong>Pavement Mechanics & Characterisation:</strong> Rheology of modified bitumen binders, perpetual asphalt pavements, and recycled aggregate concrete.</li>
          <li><strong>Travel Behaviour & Demand Modelling:</strong> Multimodal public transport assignment, activity-based travel choice modelling, and shared electric mobility.</li>
          <li><strong>Road Safety & Crash Diagnostics:</strong> Driver behaviour simulation using the department's dedicated Motion-Base Driving Simulator.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Teaching & Research Labs:</p>
          <p className="text-xs text-neutral-600">Traffic Engineering Lab · Pavement Engineering & Bitumen Testing Lab · Driving Simulator Lab</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 4,
    chapter: 'Specialization 02',
    title: 'Geotechnical Engineering (GTE)',
    subtitle: 'Centrifuge Modelling, Ground Improvement & Rock Dynamics',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Key Research Frontiers:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>National Geotechnical Centrifuge Facility:</strong> One of India’s most sophisticated facilities, simulating prototype-scale stress states in soil models under high g-levels.</li>
          <li><strong>Ground Improvement & Geosynthetics:</strong> Geocell-reinforced foundation beds, prefabricated vertical drains for soft clays, and microbial geotechnics.</li>
          <li><strong>Soil-Structure Interaction:</strong> Deep pile foundations subjected to lateral cyclic loading, retaining structures, and tunnelling effects in urban soil.</li>
          <li><strong>Geo-environmental Engineering:</strong> Contaminant plume migration, barrier liners for hazardous municipal waste, and tailings dam stability.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">National Centrifuge Facility · Soil Dynamics Lab · Advanced Triaxial Testing Suite</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 5,
    chapter: 'Specialization 03',
    title: 'Water Resources Engineering (WRE)',
    subtitle: 'Climate Hydro-Dynamics, River Basin Science & Groundwater',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Investigational Focus Areas:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Hydro-Climatic Extremes:</strong> Statistical and dynamic downscaling of climate projections to forecast extreme precipitation and flood inundation.</li>
          <li><strong>Watershed Hydrology & SWAT Modelling:</strong> Rainfall-runoff simulations, sediment yield analysis, and ecological flow management for major Indian river basins.</li>
          <li><strong>Groundwater Contaminant Hydrology:</strong> Numerical modelling of subsurface solute transport, coastal saltwater intrusion, and managed aquifer recharge.</li>
          <li><strong>Fluvial Hydraulics:</strong> Turbulence mechanics around bridge piers, scour mitigation, and riverbank erosion dynamics.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">Fluid Mechanics & Hydraulics Lab · Advanced Hydrologic Computing Facility</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 6,
    chapter: 'Specialization 04',
    title: 'Structural Engineering (STR)',
    subtitle: 'Earthquake Dynamics, Performance-Based Design & Materials',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Core Engineering Pillars:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Earthquake Engineering & Seismic Resilience:</strong> Shake-table testing of scaled multi-storey frames, damper dissipation systems, and base isolation.</li>
          <li><strong>Non-Linear Structural Mechanics:</strong> Advanced finite element modeling of reinforced concrete and structural steel under blast, fire, and impact loadings.</li>
          <li><strong>Ultra-High Performance Concrete (UHPC):</strong> Mix design using nano-silica, fibre reinforcement, and alkali-activated slag for extreme durability.</li>
          <li><strong>Heritage Structure Preservation:</strong> Seismic assessment and non-destructive retrofitting of historical masonry monuments across India.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">Heavy Structures Testing Lab · Shake Table Facility · Concrete Technology Lab</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 7,
    chapter: 'Specialization 05',
    title: 'Ocean Engineering (OE)',
    subtitle: 'Offshore Energy, Wave Mechanics & Port Design',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Marine Research Scope:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Offshore Structures:</strong> Dynamic response of fixed jacket platforms, floating spar platforms, and tension leg platforms under non-linear wave loads.</li>
          <li><strong>Coastal Dynamics & Defense:</strong> Sediment transport modelling, coastal erosion remediation, and rubble-mound breakwater design in tidal zones.</li>
          <li><strong>Marine Renewable Energy:</strong> Wave energy converters, offshore floating wind turbine substructures, and tidal current turbine mechanics.</li>
          <li><strong>Port & Harbour Infrastructure:</strong> Berthing dynamics, container terminal layouts, and wave tranquility inside harbour basins.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">Wave Flume & Coastal Basin Lab · Marine Geotechnics Facility</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 8,
    chapter: 'Specialization 06',
    title: 'Remote Sensing & Geoinformatics (RS)',
    subtitle: 'Satellite Radar, LiDAR Processing & Spatial AI',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Geospatial Research Frontiers:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Synthetic Aperture Radar (SAR):</strong> Interferometric SAR (InSAR) for millimeter-scale ground subsidence tracking, landslides, and structural monitoring.</li>
          <li><strong>Airborne & Terrestrial LiDAR:</strong> 3D point cloud classification, canopy height mapping, and automated civil infrastructure extraction using deep learning.</li>
          <li><strong>Hyperspectral Remote Sensing:</strong> Soil nutrient mapping, mineral exploration, and urban surface material identification.</li>
          <li><strong>Spatial AI for Disaster Mitigation:</strong> Real-time flood extent mapping and landslide susceptibility modeling using geospatial machine learning.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">Geoinformatics Computing Lab · Photogrammetry & Remote Sensing Facility</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 9,
    chapter: 'Specialization 07',
    title: 'Construction Technology & Management (CTM)',
    subtitle: 'BIM Automation, Lean Construction & 3D Printing',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h4 className="font-sans font-bold text-neutral-900 text-sm">Project Delivery & Automation:</h4>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Building Information Modelling (BIM):</strong> 4D/5D BIM integration for automated construction scheduling, clash detection, and safety planning.</li>
          <li><strong>3D Concrete Printing:</strong> Rheology of printable cementitious mixes, nozzle extrusion dynamics, and buildability of complex architectural elements.</li>
          <li><strong>Lean Construction:</strong> Last Planner System implementation, waste reduction on mega infrastructure sites, and digital twin monitoring.</li>
          <li><strong>Life Cycle Assessment (LCA):</strong> Carbon footprint accounting for construction materials and circular economy frameworks.</li>
        </ul>
        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 mt-4">
          <p className="font-sans font-bold text-neutral-900 text-xs mb-1">Key Research Labs:</p>
          <p className="text-xs text-neutral-600">Construction Automation & BIM Lab · Building Materials Characterisation Facility</p>
        </div>
      </div>
    ),
  },
  {
    pageNumber: 10,
    chapter: 'Guidelines',
    title: 'How to Connect with Faculty for BTP & Projects',
    subtitle: 'Best Practices for Undergraduate Scholars',
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
        <h4 className="font-bold text-neutral-900 text-sm">Recommended Protocol:</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Identify Your Focus Area Early:</strong> By Semester 5, narrow down 1–2 disciplines (e.g., Structural Engineering or Transportation) that align with your course interests.</li>
          <li><strong>Review Recent Publications:</strong> Visit the official department website or Google Scholar profiles of faculty members to read 2 recent conference/journal papers.</li>
          <li><strong>Write a Tailored Inquiry:</strong> In 150–200 words, outline: (1) your academic background, (2) which research problem caught your interest, and (3) your expected weekly time commitment. Avoid bulk copy-paste emails.</li>
          <li><strong>Leverage DAMP Senior Mentors:</strong> Ask your assigned DAMP mentor to review your project proposal or email draft before sending it to professors.</li>
        </ol>
        <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/80 mt-4 text-xs text-neutral-600">
          <strong>Note:</strong> Faculty members welcome enthusiastic undergraduate students who demonstrate genuine curiosity and consistent work ethics.
        </div>
      </div>
    ),
  },
]

export default function ResearchBooklet() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState('next')

  const totalPages = BOOKLET_PAGES.length

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection('next')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setIsFlipping(false)
      }, 260)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setIsFlipping(false)
      }, 260)
    }
  }

  const jumpToPage = (index) => {
    if (!isFlipping && index !== currentPage) {
      setFlipDirection(index > currentPage ? 'next' : 'prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(index)
        setIsFlipping(false)
      }, 200)
    }
  }

  const currentBook = BOOKLET_PAGES[currentPage]

  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-16 pb-24">
      {/* Editorial Header */}
      <div className="py-12 sm:py-16 text-center border-b border-neutral-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Interactive Digital Edition
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight mb-3">
            Faculty Research Booklet
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Flip through the official departmental handbook covering all 7 graduate specializations, experimental laboratories, and undergraduate project avenues.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Book Container with Page Turn Mechanism */}
        <div className="relative mx-auto max-w-3xl">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-4 px-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-600 font-medium">
              <BookOpen size={14} className="text-neutral-900" />
              <span>Chapter: {currentBook.chapter}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-500">
                Page {currentPage + 1} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    currentPage === 0
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-300 text-neutral-800 hover:bg-neutral-100 bg-white shadow-2xs'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    currentPage === totalPages - 1
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-300 text-neutral-800 hover:bg-neutral-100 bg-white shadow-2xs'
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Book Spine & Dual Page Spread Presentation */}
          <div
            className={`bg-white rounded-3xl border border-neutral-300 shadow-[0_16px_40px_rgba(0,0,0,0.08)] min-h-[580px] p-6 sm:p-12 relative overflow-hidden transition-all duration-300 ${
              isFlipping ? 'opacity-85 scale-[0.99] filter blur-[0.2px]' : 'opacity-100 scale-100'
            }`}
            style={{
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            {/* Subtle paper texture spine line on left */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-neutral-200/70 to-transparent pointer-events-none" />

            {/* Header info of current page */}
            {currentPage > 0 && (
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100 text-xs">
                <span className="font-mono text-neutral-400 uppercase tracking-widest text-[10px]">
                  IIT Bombay Civil Engineering · {currentBook.chapter}
                </span>
                <span className="font-mono text-neutral-400 text-xs">
                  {currentBook.pageNumber}
                </span>
              </div>
            )}

            {/* Page Title & Subtitle */}
            {currentPage > 0 && (
              <div className="mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 mb-1">
                  {currentBook.title}
                </h2>
                <p className="text-xs text-neutral-500 font-medium">
                  {currentBook.subtitle}
                </p>
              </div>
            )}

            {/* Main Page Content */}
            <div className="min-h-[380px]">
              {currentBook.content}
            </div>

            {/* Bottom Footer Page Turn Arrows */}
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-1 font-semibold ${
                  currentPage === 0 ? 'invisible' : 'hover:text-neutral-900 transition-colors'
                }`}
              >
                <ChevronLeft size={14} />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center gap-1 font-semibold ${
                  currentPage === totalPages - 1 ? 'invisible' : 'hover:text-neutral-900 transition-colors'
                }`}
              >
                <span>Next Chapter</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Index Strip */}
        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            Quick Chapter Navigation
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {BOOKLET_PAGES.map((page, idx) => (
              <button
                key={page.pageNumber}
                onClick={() => jumpToPage(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentPage === idx
                    ? 'bg-neutral-900 text-white font-bold shadow-2xs'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                {page.chapter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
