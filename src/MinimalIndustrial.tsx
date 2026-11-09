import React, { useEffect, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Blocks, Droplets,
  Layers3, Menu, Mountain, Route, Waves, X
} from 'lucide-react'
import { NAV_LINKS, PROCESS_STEPS, SERVICES_LIST } from './data/mockData'
import type { ServiceItem } from './types'

type Props = {
  onSelectService: (service: ServiceItem) => void
  onOpenInquiry: (serviceName?: string) => void
}

const serviceIcons = [Route, Blocks, Mountain, Layers3, Waves, Droplets]

const photoStories = [
  {
    title: 'Akses jalan beraspal',
    subtitle: 'Dokumentasi pengaspalan',
    image: '/assets/pjp-preview/asphalt-road-preview.webp',
    alt: 'Dokumentasi jalan beraspal di antara pepohonan',
    category: 'Asphalt Hotmix',
  },
  {
    title: 'Penanganan permukaan',
    subtitle: 'Dokumentasi area akses',
    image: '/assets/pjp-preview/asphalt-access-preview.webp',
    alt: 'Dokumentasi pengerjaan jalan dan area akses',
    category: 'Asphalt Hotmix',
  },
  {
    title: 'Tahap pemadatan',
    subtitle: 'Dokumentasi pelaksanaan',
    image: '/assets/pjp-preview/road-roller-preview.webp',
    alt: 'Dokumentasi alat berat road roller di lokasi pekerjaan',
    category: 'Asphalt Hotmix',
  },
  {
    title: 'Jalan dan lingkungan',
    subtitle: 'Dokumentasi permukaan',
    image: '/assets/pjp-preview/tree-lined-road-preview.webp',
    alt: 'Dokumentasi akses jalan di lingkungan dengan pepohonan',
    category: 'Asphalt Hotmix',
  },
]

export const MinimalIndustrial: React.FC<Props> = ({ onSelectService, onOpenInquiry }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('beranda')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      const y = window.scrollY + 160
      for (const id of ['kontak', 'proyek', 'tentang', 'layanan', 'beranda']) {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= y) { setCurrent(id); break }
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
  }, [])

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault()
    setMenuOpen(false)
    const section = document.querySelector(target)
    section?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="minimal-site">
      <a className="minimal-skip" href="#main">Lewati ke konten</a>
      <header className={'minimal-header' + (scrolled ? ' minimal-header--scrolled' : '')}>
        <div className="minimal-container minimal-header__inner">
          <a href="#beranda" className="minimal-brand" onClick={(event) => goTo(event, '#beranda')}
            aria-label="Putra Jaya Pratama, kembali ke beranda">
            <span className="minimal-brand__symbol">P<span>.</span></span>
            <span className="minimal-brand__name">PUTRA JAYA<strong>PRATAMA</strong></span>
          </a>
          <nav className="minimal-nav" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                aria-current={current === link.href.slice(1) ? 'location' : undefined}
                onClick={(event) => goTo(event, link.href)}>{link.label}</a>
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
            {NAV_LINKS.map((link, index) => (
              <a key={link.href} href={link.href} onClick={(event) => goTo(event, link.href)}>
                {link.label}<small>0{index + 1}</small>
              </a>
            ))}
            <button type="button" className="minimal-button minimal-button--primary"
              onClick={() => { setMenuOpen(false); onOpenInquiry() }}>
              Konsultasi Proyek <ArrowUpRight size={17} />
            </button>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="minimal-hero" id="beranda" aria-labelledby="minimal-hero-title">
          <img className="minimal-hero__image" src="/assets/pjp-preview/asphalt-access-preview.webp"
            alt="Dokumentasi pekerjaan pengaspalan dan konstruksi akses jalan" width={1600} height={960}
            fetchPriority="high" />
          <div className="minimal-hero__shade" aria-hidden="true" />
          <div className="minimal-container minimal-hero__content">
            <div className="minimal-kicker minimal-kicker--light">
              <span className="minimal-kicker__line" /> PUTRA JAYA PRATAMA / KONSTRUKSI JALAN
            </div>
            <h1 id="minimal-hero-title">Membangun jalan.<br /><em>Membuka akses.</em></h1>
            <p>Solusi pengaspalan hotmix, perkerasan, dan pekerjaan infrastruktur untuk kebutuhan area Anda. Dimulai dengan rencana yang jelas.</p>
            <div className="minimal-hero__buttons">
              <a className="minimal-button minimal-button--primary" href="#layanan" onClick={(event) => goTo(event, '#layanan')}>
                Lihat Layanan <ArrowUpRight size={17} />
              </a>
              <button type="button" className="minimal-button minimal-button--outline"
                onClick={() => onOpenInquiry()}>Bahas Kebutuhan <ArrowRight size={17} /></button>
            </div>
          </div>
        </section>

        <section id="layanan" className="minimal-services minimal-section" aria-labelledby="minimal-services-title">
          <div className="minimal-container">
            <div className="minimal-section-heading minimal-section-heading--center">
              <span className="minimal-kicker">01 / LAYANAN</span>
              <h2 id="minimal-services-title">Berbagai kebutuhan.<br /><em>Satu mitra kerja.</em></h2>
              <p>Pekerjaan jalan dan area pendukungnya memerlukan pendekatan yang tepat untuk setiap kondisi lapangan.</p>
            </div>
            <div className="minimal-service-grid">
              {SERVICES_LIST.map((service, index) => {
                const Icon = serviceIcons[index] ?? Route
                return (
                  <article key={service.id} className="minimal-service">
                    <div className="minimal-service__head">
                      <span className="minimal-service__icon"><Icon size={27} strokeWidth={1.55} aria-hidden="true" /></span>
                      <span className="minimal-service__index">{String(index + 1).padStart(2,'0')}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <button type="button" onClick={() => onSelectService(service)}
                      aria-label={'Pelajari layanan ' + service.title}>
                      Detail layanan <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  </article>
                )
              })}
            </div>
            <div className="minimal-services__tail">
              <span>Tidak yakin layanan yang sesuai dengan lokasi Anda?</span>
              <button onClick={() => onOpenInquiry()} type="button">Diskusikan kebutuhan <ArrowUpRight size={17} /></button>
            </div>
          </div>
        </section>

        <section id="tentang" className="minimal-story" aria-labelledby="minimal-story-title">
          <div className="minimal-story__image">
            <img src="/assets/pjp-preview/road-roller-preview.webp" loading="lazy"
              alt="Dokumentasi pemadatan area pekerjaan menggunakan road roller" width={1200} height={920} />
            <span>PROSES PENGERJAAN / DOKUMENTASI</span>
          </div>
          <div className="minimal-story__copy">
            <div className="minimal-story__copy-inner">
              <span className="minimal-kicker minimal-kicker--light">02 / PENDEKATAN KAMI</span>
              <h2 id="minimal-story-title">Pekerjaan yang baik dimulai dari <em>pemahaman.</em></h2>
              <p>Kondisi jalan, beban kendaraan, keadaan lahan, dan aliran air menentukan kebutuhan suatu proyek. Karena itu, kami mulai dengan memahami apa yang benar-benar dibutuhkan.</p>
              <div className="minimal-story__facts">
                <div><span>01</span><strong>Memahami kondisi area</strong></div>
                <div><span>02</span><strong>Menentukan metode pekerjaan</strong></div>
                <div><span>03</span><strong>Menjaga komunikasi selama proses</strong></div>
              </div>
              <button type="button" onClick={() => onOpenInquiry()} className="minimal-text-button minimal-text-button--light">
                Diskusikan pekerjaan <ArrowUpRight size={19} />
              </button>
            </div>
          </div>
        </section>

        <section id="proses" className="minimal-process minimal-section" aria-labelledby="minimal-process-title">
          <div className="minimal-container">
            <div className="minimal-section-heading minimal-section-heading--center">
              <span className="minimal-kicker">03 / PROSES KERJA</span>
              <h2 id="minimal-process-title">Dari kebutuhan,<br /><em>hingga pelaksanaan.</em></h2>
              <p>Empat tahapan awal untuk menyamakan gambaran pekerjaan sebelum dan selama proses berlangsung.</p>
            </div>
            <div className="minimal-process__grid">
              {PROCESS_STEPS.map(step => (
                <article key={step.number} className="minimal-process__step">
                  <span className="minimal-process__number">{step.number}<i /></span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proyek" className="minimal-gallery minimal-section" aria-labelledby="minimal-gallery-title">
          <div className="minimal-container">
            <div className="minimal-section-heading minimal-section-heading--split">
              <div>
                <span className="minimal-kicker">04 / GALERI</span>
                <h2 id="minimal-gallery-title">Lebih dekat<br /><em>ke lapangan.</em></h2>
              </div>
              <p>Dokumentasi visual pekerjaan jalan yang telah mendapat izin publikasi. Detail lokasi dan informasi proyek akan dilengkapi secara bertahap.</p>
            </div>
            <div className="minimal-gallery__grid">
              {photoStories.map((photo, index) => (
                <article className="minimal-gallery__item" key={photo.image}>
                  <img src={photo.image} loading="lazy" alt={photo.alt} width={1000} height={850} />
                  <div className="minimal-gallery__scrim" aria-hidden="true" />
                  <div className="minimal-gallery__number">0{index+1} / DOKUMENTASI</div>
                  <div className="minimal-gallery__caption">
                    <div><small>{photo.subtitle}</small><h3>{photo.title}</h3></div>
                    <button type="button" aria-label={'Diskusikan jenis pekerjaan terkait ' + photo.title}
                      onClick={() => onOpenInquiry(photo.category)}>
                      <ArrowUpRight size={19}/>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontak" className="minimal-contact" aria-labelledby="minimal-contact-title">
          <div className="minimal-container minimal-contact__inner">
            <div>
              <span className="minimal-kicker minimal-kicker--light">05 / KONSULTASI</span>
              <h2 id="minimal-contact-title">Ada rencana jalan<br />yang perlu <em>dikerjakan?</em></h2>
              <p>Ceritakan kondisi area dan kebutuhan pekerjaan Anda. Kami bantu mulai dari pembahasan awal.</p>
            </div>
            <button type="button" onClick={() => onOpenInquiry()} className="minimal-button minimal-button--dark">
              Mulai Konsultasi <ArrowUpRight size={18}/>
            </button>
          </div>
        </section>
      </main>

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
            {NAV_LINKS.map(link => <a href={link.href} key={link.href} onClick={event => goTo(event, link.href)}>{link.label}</a>)}
          </div>
          <div className="minimal-footer__links">
            <strong>HUBUNGI KAMI</strong>
            <button type="button" onClick={() => onOpenInquiry()}>Buat ringkasan konsultasi <ArrowUpRight size={15} /></button>
            <p>Kontak dan detail perusahaan akan dilengkapi pada tahap finalisasi.</p>
          </div>
        </div>
        <div className="minimal-container minimal-footer__bottom">
          <span>© {new Date().getFullYear()} PUTRA JAYA PRATAMA</span>
          <span>WEBSITE PREVIEW / MINIMAL INDUSTRIAL</span>
          <a href="#beranda" onClick={event => goTo(event, '#beranda')}>KEMBALI KE ATAS ↑</a>
        </div>
      </footer>
    </div>
  )
}
