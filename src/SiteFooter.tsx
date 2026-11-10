import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from './data/mockData'

type Props = {
  onOpenInquiry: (serviceName?: string) => void
  galleryPage?: boolean
}

export const SiteFooter: React.FC<Props> = ({ onOpenInquiry, galleryPage = false }) => {
  const hrefFor = (href: string) => galleryPage && href.startsWith('#') ? '/' + href : href
  return (
    <footer className="minimal-footer">
      <div className="minimal-container minimal-footer__main">
        <div className="minimal-footer__identity">
          <div className="minimal-brand minimal-brand--footer">
            <span className="minimal-brand__symbol">P<span>.</span></span>
            <span className="minimal-brand__name">PUTRA JAYA<strong>PRATAMA</strong></span>
          </div>
          <p>Jasa pengaspalan, perkerasan, dan konstruksi jalan untuk berbagai kebutuhan area.</p>
        </div>
        <div className="minimal-footer__links">
          <strong>NAVIGASI</strong>
          {NAV_LINKS.map(link => <a href={hrefFor(link.href)} key={link.href}>{link.label}</a>)}
        </div>
        <div className="minimal-footer__links">
          <strong>HUBUNGI KAMI</strong>
          <button type="button" onClick={() => onOpenInquiry()}>
            Buat ringkasan konsultasi <ArrowUpRight size={15} />
          </button>
          <p>Kontak dan detail perusahaan akan dilengkapi pada tahap finalisasi.</p>
        </div>
      </div>
      <div className="minimal-container minimal-footer__bottom">
        <span>© {new Date().getFullYear()} PUTRA JAYA PRATAMA</span>
        <span>WEBSITE PREVIEW / MINIMAL INDUSTRIAL</span>
        <a href={galleryPage ? '/#beranda' : '#beranda'}>KEMBALI KE ATAS ↑</a>
      </div>
    </footer>
  )
}
