import { useState } from 'react'
import { Mail, Send, CheckCircle2, Phone, Building2 } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollAnimations'

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)

const subgroupEmails = [
  { group: 'Academics & Curriculum', email: 'academics.damp@iitb.ac.in', icon: '📚' },
  { group: 'Internships & Placements', email: 'placements.damp@iitb.ac.in', icon: '💼' },
  { group: 'Events & AAKAAR Outreach', email: 'events.damp@iitb.ac.in', icon: '📅' },
  { group: 'Community & Alumni Cell', email: 'alumni.damp@iitb.ac.in', icon: '🤝' },
  { group: 'General Queries & Helpdesk', email: 'damp@civil.iitb.ac.in', icon: '✉️' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page-fade pt-24 pb-20 min-h-screen bg-[#faf9f5]">
      {/* Creso-style Hero Section */}
      <section className="relative overflow-hidden creso-hero-glow pt-10 pb-16 border-b border-neutral-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-2xs text-xs font-semibold text-neutral-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Official Helpdesk & Communication Channels</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
            Get in Touch with <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-amber-600">Civil DAMP</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Have a question about course electives, research opportunities, mentor allocation, or department activities? We're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Modern Clean White Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-[0_4px_24px_rgb(0,0,0,0.04)]">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
                    Send Us a Direct Message
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Your inquiry will be routed to the respective DAMP vertical head or coordinator.
                  </p>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle2 size={18} className="text-amber-600 shrink-0" />
                    <span>Thank you! Your message has been dispatched to the DAMP team. We will respond promptly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Arjun Sharma"
                        className="w-full bg-neutral-50/70 border border-neutral-200/90 rounded-2xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Email Address (LDAP / Personal)
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="210030045@iitb.ac.in"
                        className="w-full bg-neutral-50/70 border border-neutral-200/90 rounded-2xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Subject / Topic
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Course Review query / Mentor Allocation / Semester Exchange"
                      className="w-full bg-neutral-50/70 border border-neutral-200/90 rounded-2xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Hi DAMP team, I wanted to inquire about..."
                      className="w-full bg-neutral-50/70 border border-neutral-200/90 rounded-2xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-black transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Info & Subgroup Directory */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_2px_16px_rgb(0,0,0,0.03)]">
                <h3 className="font-display text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span>Direct Vertical Inquiries</span>
                </h3>
                <div className="space-y-2.5">
                  {subgroupEmails.map(sg => (
                    <div
                      key={sg.group}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50/70 border border-neutral-100 hover:border-neutral-200/80 transition-all"
                    >
                      <span className="w-10 h-10 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        {sg.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-neutral-800">{sg.group}</p>
                        <a
                          href={`mailto:${sg.email}`}
                          className="text-xs text-neutral-500 hover:text-amber-700 hover:underline truncate block"
                        >
                          {sg.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Channels */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
                    Connect On Social Media
                  </h4>
                  <div className="flex gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
                    >
                      <InstagramIcon size={14} />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-colors"
                    >
                      <LinkedInIcon size={14} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Department Office */}
            <ScrollReveal animation="fade-up" delay={0.2}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_2px_16px_rgb(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                    <Building2 size={18} />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Department Office</h4>
                    <p className="text-xs text-neutral-500">IIT Bombay, Powai, Mumbai 400076</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100 font-mono">
                  The Head, Department of Civil Engineering,<br />
                  Indian Institute of Technology Bombay, Powai, Mumbai — 400076, Maharashtra, India.
                </p>

                <div className="text-xs text-neutral-600 space-y-1.5 pt-2">
                  <p className="flex justify-between">
                    <span className="text-neutral-400">Office Phone:</span>
                    <span className="font-medium text-neutral-800">+91-22-2576 7301 / 7300</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-neutral-400">HOD Email:</span>
                    <a href="mailto:hod@civil.iitb.ac.in" className="font-medium text-amber-700 hover:underline">
                      hod@civil.iitb.ac.in
                    </a>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-neutral-400">Official Portal:</span>
                    <a href="https://www.civil.iitb.ac.in/" target="_blank" rel="noreferrer" className="font-medium text-amber-700 hover:underline">
                      civil.iitb.ac.in
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
