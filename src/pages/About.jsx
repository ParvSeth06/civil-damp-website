import { Target, Eye, CheckCircle2, Users, BookOpen, MessageCircle, Award, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { departmentInfo, departmentAwards } from '../data/dummy'
import { ScrollReveal } from '../components/ScrollAnimations'

const steps = [
  {
    step: '01', icon: Users, title: 'Join the Mentorship Program',
    desc: 'Register as a mentee through the DAMP portal at the start of each semester. Open to all Civil Engineering students across B.Tech, M.Tech, and Dual Degree programmes.',
  },
  {
    step: '02', icon: MessageCircle, title: 'Get Matched 1-on-1',
    desc: 'Our coordinator team pairs you with a senior mentor based on your specific academic interests, minor aspirations, course load, and career goals.',
  },
  {
    step: '03', icon: CheckCircle2, title: 'Accelerate & Excel',
    desc: 'Participate in regular 1-on-1 catchups, resume reviews, course selection strategy sessions, IS-code workshops, and internship prep sessions.',
  },
]

const features = [
  { icon: BookOpen, title: 'Academic Excellence', desc: 'Get firsthand guidance on navigating institute core and department core courses (CE 202, CE 221, etc.), grading distributions, and tutorials directly from top-performing seniors.' },
  { icon: Target, title: 'Career & Internship Pathways', desc: 'Explore diverse career trajectories across core infrastructure (L&T, Arup), consulting (McKinsey, BCG), data science, and international research fellowships (DAAD, MITACS).' },
  { icon: Users, title: 'Vibrant Community & Alumni', desc: 'Connect with a vast network of IIT Bombay civil engineers across academia, global research labs, civil services, tech firms, and top multinational corporations.' },
]

export default function About() {
  return (
    <div className="bg-[#faf9f5] min-h-screen text-neutral-900 pt-16">
      {/* Hero Header */}
      <div className="py-20 sm:py-24 text-center border-b border-neutral-200/80 creso-hero-glow bg-grid-pattern">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 bg-white/90 border border-neutral-200/90 text-neutral-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Founded 1958 · Ranked #1 in India</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight mb-4">
              About Civil Engineering & DAMP
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Department of Civil Engineering at IIT Bombay — a fountainhead of engineering innovation, paired with a student-led academic mentorship ecosystem.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Department Overview & Accolades */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal animation="fade-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">The Department</span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1 mb-5">
                  Legacy of Leadership in Civil Engineering
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
                  The Department of Civil Engineering is one of the founding departments of IIT Bombay since 1958. Over the decades, it has grown tremendously to become recognized as the premier Civil Engineering department in India, ranked between 51–100 worldwide in the QS World University Rankings.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  With 55+ distinguished regular faculty members, 17 high-end teaching and research laboratories, and over 600 undergraduate and 415+ postgraduate scholars, the department provides an unmatched environment for cutting-edge engineering research and education.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950">#1</p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1">In India (QS Rankings 2024)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950">17</p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1">Advanced Research Labs</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950">7</p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1">Graduate Specializations</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950">9+</p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1">Top 2% Global Scientists</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Department Vision, Mission & Goals Card */}
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal animation="fade-left" delay={100}>
                <div className="p-6 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                      <Eye size={18} />
                    </div>
                    <h3 className="font-bold text-base text-neutral-900">Department Vision</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic border-l-2 border-neutral-300 pl-3">
                    &ldquo;{departmentInfo.vision}&rdquo;
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={200}>
                <div className="p-6 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                      <Target size={18} />
                    </div>
                    <h3 className="font-bold text-base text-neutral-900">Department Mission</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {departmentInfo.mission}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-left" delay={300}>
                <div className="p-6 rounded-2xl bg-[#faf9f5] border border-neutral-200/80 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                      <Award size={18} />
                    </div>
                    <h3 className="font-bold text-base text-neutral-900">Department Head</h3>
                  </div>
                  <p className="text-sm text-neutral-900 font-bold">{departmentInfo.hod.name}</p>
                  <p className="text-xs text-neutral-500 mb-1">{departmentInfo.hod.designation} · {departmentInfo.hod.department}</p>
                  <p className="text-xs text-neutral-600">Office: {departmentInfo.hod.office}</p>
                  <a href={`mailto:${departmentInfo.hod.email}`} className="text-xs font-semibold text-neutral-900 hover:underline mt-2 inline-block">
                    ✉️ {departmentInfo.hod.email}
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What is DAMP */}
      <section className="py-16 sm:py-20 bg-[#faf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <ScrollReveal animation="fade-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Mentorship Initiative</span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1 mb-5">
                  What is Civil DAMP?
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
                  Civil DAMP (Department Academic Mentorship Program) is a student-driven initiative within the Department of Civil Engineering at IIT Bombay. Established in 2019, it bridges the gap between seniors and juniors through structured peer mentorship.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  We provide resources ranging from course reviews and research booklets to internship blogs and semester exchange chronicles. Our 50+ active mentors work across four subgroups to ensure comprehensive support for every CE student.
                </p>
                <div className="space-y-3">
                  {[
                    'Structured 1-on-1 senior-to-junior mentor pairing',
                    'Curated archive of previous year question papers & lecture notes',
                    'Direct guidance on 7 department specializations & research labs',
                    'Active alumni mentorship across core engineering, tech & consulting',
                  ].map((item, i) => (
                    <ScrollReveal key={item} animation="fade-left" delay={i * 60}>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span className="text-xs sm:text-sm text-neutral-700 font-medium">{item}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} animation="fade-left" delay={i * 80}>
                  <div className="flex gap-4 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs hover-lift transition-all">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-900">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-base mb-1">{title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">The Process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1 mb-12">
              How DAMP Mentorship Works
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, icon: Icon, title, desc }, i) => (
              <ScrollReveal key={step} animation="fade-up" delay={i * 100}>
                <div className="p-8 rounded-3xl bg-[#faf9f5] border border-neutral-200/80 hover-lift text-center flex flex-col items-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-900 shadow-2xs mb-5 relative">
                    <Icon size={24} />
                    <span className="absolute -top-2 -right-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-900 text-base mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Awards & Global Honors Section */}
      <section className="py-16 sm:py-20 bg-[#faf9f5] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Accolades & Honors</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1">
                Department Awards & Fellowships
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                Civil Engineering faculty members at IIT Bombay have won India's and the world's most prestigious academic honors.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentAwards.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 40}>
                <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-300 hover-lift shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/60 inline-block mb-2.5">
                    {item.field}
                  </span>
                  <h4 className="font-bold text-neutral-900 text-sm mb-1">{item.award}</h4>
                  <p className="text-xs text-neutral-600 font-medium">{item.recipient}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


