import React, { useEffect, useRef, useState } from 'react'
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
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 951px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const background = [...document.querySelectorAll<HTMLElement>('main, footer')]
    const previousInert = background.map(element => element.inert)
    background.forEach(element => { element.inert = true })
    document.body.style.overflow = 'hidden'
    headerRef.current?.querySelector<HTMLElement>('.minimal-mobile-menu a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key !== 'Tab') return
      const controls = [...(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])]
        .filter(element => element.getClientRects().length > 0)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element, index) => { element.inert = previousInert[index] })
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

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
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
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
    requestAnimationFrame(() => target.focus({ preventScroll: true }))
  }

  const currentFor = (href: string) => href === '/galeri-proyek'
    ? (galleryPage ? 'page' as const : undefined)
    : (!galleryPage && current === href.slice(1) ? 'location' as const : undefined)

  return (
    <header ref={headerRef} className={'minimal-header' + (galleryPage ? ' minimal-header--solid' : '') + (scrolled ? ' minimal-header--scrolled' : '') + (menuOpen ? ' minimal-header--menu-open' : '')}>
      <div className="minimal-container minimal-header__inner">
        <a href={galleryPage ? '/#beranda' : '#beranda'} className="minimal-brand minimal-brand--text-only"
          onClick={event => handleLink(event, '#beranda')}
          aria-label="Putra Jaya Pratama, kembali ke beranda">
          <span className="minimal-brand__name">PUTRA JAYA<strong>PRATAMA</strong></span>
        </a>
        <nav className="minimal-nav" aria-label="Navigasi utama">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={hrefFor(link.href)}
              aria-current={currentFor(link.href)}
              onClick={event => handleLink(event, link.href)}>{link.label}</a>
          ))}
        </nav>
        <div className="minimal-header__actions">
          <button ref={toggleRef} type="button" className="minimal-mobile-toggle"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen} aria-controls="minimal-mobile-nav"
            onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="minimal-mobile-menu" id="minimal-mobile-nav" aria-label="Menu utama di ponsel">
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={hrefFor(link.href)} aria-current={currentFor(link.href)} onClick={event => handleLink(event, link.href)}>
              {link.label}<small aria-hidden="true">0{i + 1}</small>
            </a>
          ))}
          <button type="button" className="minimal-button minimal-button--primary"
            onClick={() => { setMenuOpen(false); onOpenInquiry() }}>
            Isi kebutuhan proyek <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </nav>
      )}
    </header>
  )
}
