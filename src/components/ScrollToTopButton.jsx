import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all"
      style={{
        background: '#173F35',
        color: '#EBCB63',
        boxShadow: '0 4px 16px rgba(23,63,53,0.25)',
        border: '1px solid rgba(235,203,99,0.2)',
      }}
      aria-label="Scroll to top of page"
      onMouseEnter={e => { e.currentTarget.style.background = '#1E5246' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#173F35' }}
    >
      <ArrowUp size={18} />
    </button>
  )
}
