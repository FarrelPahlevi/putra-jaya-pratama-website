import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/mockData'

interface NavbarProps {
  onOpenInquiry: (defaultService?: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 190
      for (const id of ['kontak', 'proyek', 'tentang', 'layanan', 'beranda']) {
        const section = document.getElementById(id)
        if (section && pos >= section.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const section = document.querySelector(href)
    if (section) section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <>
      <a href="#main" className="pjp-skip">Lewati ke konten utama</a>
      <header className="pjp-navbar">
        <div className="site-container pjp-navbar__inner">
          <a href="#beranda" onClick={(e) => handleLink(e, '#beranda')} className="pjp-brand" aria-label="Putra Jaya Pratama, kembali ke beranda">
            <span className="pjp-brand__mark" aria-hidden="true"><span>P.</span></span>
            <span className="pjp-brand__name">Putra Jaya <strong>Pratama</strong></span>
          </a>

          <nav className="pjp-navlinks" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} onClick={(e) => handleLink(e, link.href)}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pjp-navbar__right">
            <button type="button" onClick={() => onOpenInquiry()} className="pjp-button pjp-button--orange">
              Konsultasi <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="pjp-mobile-toggle" onClick={() => setIsOpen((open) => !open)}
            aria-controls="mobileMenu" aria-expanded={isOpen} aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}>
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {isOpen && (
          <div className="pjp-mobile-panel" id="mobileMenu">
            <nav aria-label="Navigasi mobile">
              {NAV_LINKS.map((link, i) => (
                <a key={link.href} href={link.href} onClick={(e) => handleLink(e, link.href)}>
                  {link.label}<small>0{i + 1}</small>
                </a>
              ))}
              <button type="button" className="pjp-button pjp-button--orange" style={{ width: '100%', marginTop: 22 }}
                onClick={() => { setIsOpen(false); onOpenInquiry() }}>
                Mulai Konsultasi <ArrowUpRight size={17} />
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
