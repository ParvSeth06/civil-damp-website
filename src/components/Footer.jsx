import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'

// NOTE: Instagram and LinkedIn links are not verified — set to # until confirmed.
// Maintainers: update SOCIAL_INSTAGRAM and SOCIAL_LINKEDIN with real account handles.
const SOCIAL_INSTAGRAM = null   // e.g. 'https://instagram.com/civildamp_iitb' — unverified
const SOCIAL_LINKEDIN  = null   // e.g. 'https://linkedin.com/company/civil-damp-iitb' — unverified
const EMAIL_CONTACT    = 'civildampcs26@gmail.com'  // verified in team data

const navCols = [
  {
    heading: 'Academics',
    links: [
      { label: 'Curriculum & Structure', path: '/academics?tab=0' },
      { label: 'Specializations & Labs', path: '/academics?tab=1' },
      { label: 'Course Reviews', path: '/academics?tab=2' },
    ],
  },
  {
    heading: 'Experiences',
    links: [
      { label: 'Internship Stories', path: '/opportunities?tab=0' },
      { label: 'Research Profiles', path: '/opportunities?tab=1' },
      { label: 'Competitions', path: '/opportunities?tab=2' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Meet the Team', path: '/team' },
    ],
    extra: [
      { label: 'IIT Bombay Civil Dept', href: 'https://www.civil.iitb.ac.in/', external: true },
      { label: 'CEA Student Body', href: 'https://www.civil.iitb.ac.in/cea/', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      style={{ background: '#20241F', color: '#D8DCD4', borderTop: '1px solid #2E3430' }}
    >
      <div className="container-main" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
        <div className="grid md:grid-cols-12 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: '#EBCB63', color: '#173F35' }}
              >
                CE
              </div>
              <span className="text-base font-extrabold tracking-tight" style={{ color: '#F7F5EE' }}>
                civil<span style={{ color: '#EBCB63' }}>damp</span>
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(235,203,99,0.15)', color: '#EBCB63', border: '1px solid rgba(235,203,99,0.3)' }}
              >
                IIT Bombay
              </span>
            </div>

            <p className="text-card-desc leading-relaxed" style={{ color: '#D8DCD4', maxWidth: '34ch' }}>
              Department Academic Mentorship Program — Civil Engineering, IIT Bombay. A student-led initiative under the Student Mentorship Programme (SMP).
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_INSTAGRAM && (
                <a
                  href={SOCIAL_INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63]"
                  style={{ background: '#2E3430', color: '#D8DCD4' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#EBCB63' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#D8DCD4' }}
                  aria-label="Civil DAMP on Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {SOCIAL_LINKEDIN && (
                <a
                  href={SOCIAL_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63]"
                  style={{ background: '#2E3430', color: '#D8DCD4' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#EBCB63' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#D8DCD4' }}
                  aria-label="Civil DAMP on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              )}
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63]"
                style={{ background: '#2E3430', color: '#EBCB63' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#38403B' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2E3430' }}
                aria-label="Email Civil DAMP"
              >
                <Mail size={16} />
              </a>
            </div>

            {/* Contact details */}
            <div className="text-small space-y-1 pt-2" style={{ color: '#BAC0B6' }}>
              <p>
                <a
                  href={`mailto:${EMAIL_CONTACT}`}
                  className="font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63] rounded px-0.5"
                  style={{ color: '#EBCB63', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                  onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
                >
                  {EMAIL_CONTACT}
                </a>
              </p>
              <p>Department of Civil Engineering, IIT Bombay</p>
              <p>Powai, Mumbai — 400076, India</p>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.heading} className="md:col-span-2 lg:col-span-2 space-y-3.5">
              <h3
                className="text-meta font-bold uppercase tracking-wider"
                style={{ color: '#F7F5EE', letterSpacing: '0.08em' }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-card-desc block transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63] focus-visible:outline-offset-2 rounded"
                      style={{ color: 'rgba(247, 245, 238, 0.82)', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#EBCB63' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247, 245, 238, 0.82)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.extra?.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-card-desc inline-flex items-center gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EBCB63] focus-visible:outline-offset-2 rounded"
                      style={{ color: 'rgba(247, 245, 238, 0.82)', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#EBCB63' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247, 245, 238, 0.82)' }}
                    >
                      {link.label}
                      <ArrowRight size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-meta"
          style={{ borderTop: '1px solid #2E3430', color: '#9EA49A' }}
        >
          <span>© 2025 Civil DAMP · IIT Bombay. All rights reserved.</span>
          <span>Department Academic Mentorship Program</span>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  )
}
