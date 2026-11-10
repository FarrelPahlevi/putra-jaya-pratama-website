import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from './data/mockData'

type Props = {
  onOpenInquiry: (serviceName?: string) => void
  galleryPage?: boolean
}

export const SiteHeader: React.FC<Props> = ({ onOpenInquiry, galleryPage = false }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('beranda')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      if (galleryPage) { setCurrent('galeri-proyek'); return }
      const y = window.scrollY + 160
      for (const id of ['kontak', 'proyek', 'tentang', 'layanan', 'beranda']) {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= y) { setCurrent(id); break }
      }
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onEscape)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onEscape)
    }
  }, [galleryPage])

  const hrefFor = (href: string) => galleryPage && href.startsWith('#') ? '/' + href : href
  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    if (galleryPage || !href.startsWith('#')) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', href)
  }

  return (
    <header className={'minimal-header' + (galleryPage ? ' minimal-header--solid' : '') + (scrolled ? ' minimal-header--scrolled' : '')}>
      <div className="minimal-container minimal-header__inner">
        <a href={galleryPage ? '/#beranda' : '#beranda'} className="minimal-brand"
          onClick={event => handleLink(event, '#beranda')}
          aria-label="Putra Jaya Pratama, kembali ke beranda">
          <span className="minimal-brand__symbol">P<span>.</span></span>
          <span className="minimal-brand__name">PUTRA JAYA<strong>PRATAMA</strong></span>
        </a>
        <nav className="minimal-nav" aria-label="Navigasi utama">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={hrefFor(link.href)}
              aria-current={link.href === '/galeri-proyek' ? (galleryPage ? 'page' : undefined) : (!galleryPage && current === link.href.slice(1) ? 'location' : undefined)}
              onClick={event => handleLink(event, link.href)}>{link.label}</a>
          ))}
        </nav>
        <div className="minimal-header__actions">
          <button type="button" className="minimal-mobile-toggle"
            aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={menuOpen} aria-controls="minimal-mobile-nav"
            onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="minimal-mobile-menu" id="minimal-mobile-nav" aria-label="Navigasi ponsel">
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={hrefFor(link.href)} onClick={event => handleLink(event, link.href)}>
              {link.label}<small>0{i + 1}</small>
            </a>
          ))}
          <button type="button" className="minimal-button minimal-button--primary"
            onClick={() => { setMenuOpen(false); onOpenInquiry() }}>
            Konsultasi Proyek <ArrowUpRight size={17} />
          </button>
        </nav>
      )}
    </header>
  )
}
