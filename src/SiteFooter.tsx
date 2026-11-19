import React, { useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { NAV_LINKS, SERVICES_LIST } from './data/mockData'
import { CONTACT, getWhatsAppUrl } from './config/contact'
import './site-footer.css'

type Props = {
  onOpenInquiry: (serviceName?: string) => void
  galleryPage?: boolean
}

export const SiteFooter: React.FC<Props> = ({ onOpenInquiry, galleryPage = false }) => {
  const footerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const footer = footerRef.current
    if (!footer || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      footer.dataset.inView = String(entry.isIntersecting)
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const hrefFor = (href: string) => galleryPage && href.startsWith('#') ? '/' + href : href
  const scrollBehavior = (): ScrollBehavior => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  const navigateSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (galleryPage || !href.startsWith('#') || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const section = document.getElementById(href.slice(1))
    if (!section) return
    event.preventDefault()
    section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    window.history.replaceState(null, '', href)
    section.focus({ preventScroll: true })
  }
  const backToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
    document.getElementById(galleryPage ? 'main' : 'beranda')?.focus({ preventScroll: true })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  return (
    <footer className="pjp-site-footer" ref={footerRef} data-in-view="true">
      <div className="minimal-container minimal-container--wide">
        <div className="pjp-site-footer__information">
          <div className="pjp-site-footer__identity">
            <a className="minimal-brand minimal-brand--text-only pjp-site-footer__logo" href={hrefFor('#beranda')}
              aria-label="Putra Jaya Pratama, beranda" onClick={event => navigateSection(event, '#beranda')}>
              <span className="minimal-brand__name" aria-hidden="true">PUTRA JAYA<strong>PRATAMA</strong></span>
            </a>
            <p>Kami melayani pengaspalan, perkerasan, dan pekerjaan konstruksi jalan.</p>
          </div>

          <nav className="pjp-site-footer__column" aria-label="Navigasi footer">
            <h3>Navigasi</h3>
            {NAV_LINKS.map(link => (
              <a className="pjp-site-footer__link" href={hrefFor(link.href)} key={link.href}
                onClick={event => navigateSection(event, link.href)}>{link.label}</a>
            ))}
          </nav>

          <div className="pjp-site-footer__column">
            <h3>Layanan utama</h3>
            {SERVICES_LIST.map(service => (
              <button className="pjp-site-footer__link" type="button" key={service.id} aria-haspopup="dialog"
                onClick={() => onOpenInquiry(service.title)}>{service.title}</button>
            ))}
          </div>

          <div className="pjp-site-footer__column pjp-site-footer__contact">
            <h3>Hubungi PJP</h3>
            <span className="pjp-site-footer__contact-label">WhatsApp</span>
            <a className="pjp-site-footer__number" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              {CONTACT.whatsappDisplay}
            </a>
            <a className="pjp-site-footer__instagram" href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`Instagram ${CONTACT.instagramUsername} (buka tab baru)`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
              </svg>
              <span>{CONTACT.instagramUsername}</span>
            </a>
          </div>
        </div>

        <div className="pjp-site-footer__bottom">
          <span>© {new Date().getFullYear()} Putra Jaya Pratama</span>
          <a className="pjp-site-footer__top" href={galleryPage ? '#main' : '#beranda'} onClick={backToTop}
            aria-label="Kembali ke atas halaman">
            Ke atas <ArrowUp size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
