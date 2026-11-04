import React, { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Blocks, Check, ChevronRight,
  Compass, Droplets, Layers3, Menu, Mountain, Route, Waves, X
} from 'lucide-react'
import { NAV_LINKS, PROCESS_STEPS, PROJECTS_LIST, SERVICES_LIST } from './data/mockData'
import type { ServiceItem } from './types'

type GlassExperienceProps = {
  onSelectService: (service: ServiceItem) => void
  onOpenInquiry: (service?: string) => void
}

type Filter = 'semua' | 'aspal' | 'beton' | 'drainase'
const filters: { id: Filter; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'aspal', label: 'Pengaspalan' },
  { id: 'beton', label: 'Beton' },
  { id: 'drainase', label: 'Drainase' },
]

const serviceIcons = [Route, Blocks, Mountain, Layers3, Waves, Droplets]

export const GlassExperience: React.FC<GlassExperienceProps> = ({ onSelectService, onOpenInquiry }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter] = useState<Filter>('semua')
  const projects = filter === 'semua' ? PROJECTS_LIST : PROJECTS_LIST.filter((project) => project.category === filter)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const pos = window.scrollY + 210
      const targets = ['kontak', 'proyek', 'tentang', 'layanan', 'beranda']
      for (const id of targets) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) { setActiveSection(id); break }
      }
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <div className="glass-site" id="top">
      <a href="#main" className="glass-skip">Langsung ke konten utama</a>

      <header className={'glass-nav-frame' + (scrolled ? ' is-scrolled' : '')}>
        <div className="glass-nav">
          <a className="glass-brand" href="#beranda" onClick={e => scrollToSection(e, '#beranda')} aria-label="Putra Jaya Pratama, kembali ke beranda">
            <span className="glass-brand__symbol" aria-hidden="true"><span>P</span><i /></span>
            <span>PUTRA JAYA<strong>PRATAMA.</strong></span>
          </a>
          <nav className="glass-nav__links" aria-label="Navigasi utama">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} aria-current={activeSection === link.href.substring(1) ? 'location' : undefined}
                onClick={e => scrollToSection(e, link.href)}>{link.label}</a>
            ))}
          </nav>
          <div className="glass-nav__right">
            <span className="glass-nav__edition">CONCEPT / 02</span>
            <button type="button" className="glass-button glass-button--dark glass-nav__cta" onClick={() => onOpenInquiry()}>
              Konsultasi <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <button type="button" className="glass-mobile-toggle" aria-expanded={menuOpen} aria-controls="glass-mobile-navigation"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} onClick={() => setMenuOpen(open => !open)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="glass-mobile-navigation" className="glass-mobile-menu" aria-label="Navigasi mobile">
            {NAV_LINKS.map((link, i) => <a key={link.href} href={link.href} onClick={e => scrollToSection(e, link.href)}>
              <span>{link.label}</span><small>0{i + 1}</small>
            </a>)}
            <button type="button" className="glass-button glass-button--orange" onClick={() => { setMenuOpen(false); onOpenInquiry() }}>
              Konsultasi proyek <ArrowUpRight size={17} />
            </button>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="beranda" className="glass-hero" aria-labelledby="glass-hero-title">
          <div className="glass-hero__mesh" aria-hidden="true">
            <span className="glass-orb glass-orb--one" /><span className="glass-orb glass-orb--two" />
            <span className="glass-orb glass-orb--three" />
            <div className="glass-hero__grid" />
          </div>
          <div className="glass-container glass-hero__main">
            <div className="glass-hero__copy">
              <div className="glass-overline glass-overline--light"><span className="glass-overline__dot" /> PJP / KONSTRUKSI JALAN</div>
              <h1 id="glass-hero-title">Membangun<br /><span className="glass-word-italic">jalan,</span><br />membuka<br /><span className="glass-word-outline">arah.</span></h1>
              <p>Pengaspalan hotmix, perkerasan, dan infrastruktur pendukung. Satu tempat untuk mulai merencanakan pekerjaan yang sesuai kebutuhan area Anda.</p>
              <div className="glass-hero__actions">
                <a href="#layanan" className="glass-button glass-button--bright" onClick={e => scrollToSection(e, '#layanan')}>
                  Jelajahi layanan <ArrowUpRight size={17} />
                </a>
                <button className="glass-button glass-button--clear" type="button" onClick={() => onOpenInquiry()}>
                  Diskusi proyek <ArrowRight size={16} />
                </button>
              </div>
              <div className="glass-hero__bottomline"><span className="glass-hero__line" /><span>LAND • ROAD • INFRASTRUCTURE</span></div>
            </div>
            <div className="glass-hero__stage">
              <div className="glass-hero__halo" aria-hidden="true" />
              <div className="glass-hero__photoframe">
                <img src="/assets/pjp-preview/asphalt-road-preview.webp" width={900} height={1600}
                  alt="Foto dokumentasi jalan beraspal melalui area hijau" fetchPriority="high" />
                <div className="glass-hero__photogradient" />
                <div className="glass-photo__tag"><span className="glass-status-dot" /> DOKUMENTASI FOTO</div>
                <div className="glass-photo__footer">
                  <div><span className="glass-mini-label">VISUAL STUDY / 001</span><strong>Ruang yang<br />terhubung.</strong></div>
                  <span className="glass-photo__diagonal" aria-hidden="true">↗</span>
                </div>
              </div>
              <div className="glass-floating glass-floating--upper" aria-hidden="true">
                <span className="glass-floating__icon"><Compass size={22} strokeWidth={1.5} /></span>
                <span><small>FOCUS / 01</small><strong>Roadwork</strong></span>
                <ArrowUpRight size={16} />
              </div>
              <div className="glass-floating glass-floating--lower" aria-label="Foto dipublikasikan dengan izin">
                <span className="glass-floating__light" />
                <span><small>STATUS VISUAL</small><strong>Foto berizin</strong></span>
              </div>
              <div className="glass-hero__index">01 <span>/</span> 06</div>
            </div>
          </div>
          <div className="glass-container glass-hero__foot">
            <span>FOTO DOKUMENTASI DIGUNAKAN DENGAN IZIN · WEBSITE DALAM TAHAP PREVIEW</span>
            <a href="#layanan" onClick={e => scrollToSection(e, '#layanan')}>SCROLL TO EXPLORE <ArrowDownRight size={18}/></a>
          </div>
        </section>

        <div className="glass-category-ribbon" aria-label="Enam bidang layanan">
          <div className="glass-container glass-category-ribbon__inner">
            {SERVICES_LIST.map((service, i) => <React.Fragment key={service.id}>
              {i > 0 && <span className="glass-category-ribbon__sep" aria-hidden="true">✳</span>}
              <span>{service.title}</span>
            </React.Fragment>)}
          </div>
        </div>

        <section id="layanan" className="glass-services glass-section" aria-labelledby="glass-services-title">
          <div className="glass-section__ambient glass-section__ambient--services" aria-hidden="true" />
          <div className="glass-container">
            <div className="glass-section__head">
              <div><span className="glass-overline">01 / BIDANG KERJA</span>
                <h2 id="glass-services-title">Satu proyek.<br /><em>Banyak detail.</em></h2>
              </div>
              <p>Enam layanan yang saling melengkapi, mulai dari persiapan lahan sampai sistem pendukungnya.</p>
            </div>
            <div className="glass-services__grid">
              {SERVICES_LIST.map((service, index) => {
                const Icon = serviceIcons[index] ?? Route
                return <article className={'glass-service-card glass-service-card--' + index} key={service.id}>
                  <div className="glass-service-card__top">
                    <span>0{index + 1} / 06</span>
                    <span className="glass-service-card__icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                  </div>
                  <div className="glass-service-card__body">
                    <span className="glass-service-card__eyebrow">{service.metaCode.split('/').pop()?.trim()}</span>
                    <h3>{service.title}</h3><p>{service.summary}</p>
                  </div>
                  <button type="button" onClick={() => onSelectService(service)} className="glass-service-card__action"
                    aria-label={'Lihat detail layanan ' + service.title}>
                    Lihat detail <span><ArrowUpRight size={18} /></span>
                  </button>
                </article>
              })}
            </div>
            <div className="glass-services__footer">
              <span>01—06 / LAYANAN KONSTRUKSI</span>
              <button type="button" onClick={() => onOpenInquiry()}>Belum yakin mulai dari mana? <ArrowUpRight size={16}/></button>
            </div>
          </div>
        </section>

        <section id="proses" className="glass-process glass-section" aria-labelledby="glass-process-title">
          <div className="glass-process__backdrop" aria-hidden="true" />
          <div className="glass-container">
            <div className="glass-section__head glass-section__head--dark">
              <div><span className="glass-overline glass-overline--light">02 / CARA KERJA</span>
                <h2 id="glass-process-title">Dari cerita,<br /><em>jadi rencana.</em></h2>
              </div>
              <p>Pendekatan sederhana untuk memahami pekerjaan sebelum menentukan langkah di lapangan.</p>
            </div>
            <div className="glass-process__steps">
              {PROCESS_STEPS.map((step, index) => <article key={step.number} className="glass-process-card">
                <div className="glass-process-card__number"><span>{step.number}</span><span className="glass-process-card__dash" /></div>
                <div className="glass-process-card__body"><h3>{step.title}</h3><p>{step.description}</p></div>
                <span className="glass-process-card__arrow"><ArrowUpRight size={18}/></span>
                {index < PROCESS_STEPS.length - 1 && <span className="glass-process-card__connector" aria-hidden="true" />}
              </article>)}
            </div>
            <div className="glass-process__foot"><span>CLARITY BEFORE CONSTRUCTION</span><span>PLAN → BUILD → REVIEW</span></div>
          </div>
        </section>

        <section id="tentang" className="glass-capability glass-section" aria-labelledby="glass-capability-title">
          <div className="glass-container glass-capability__layout">
            <div className="glass-capability__visual">
              <div className="glass-capability__picture">
                <img src="/assets/pjp-preview/road-roller-preview.webp" loading="lazy" width={1200} height={900}
                  alt="Foto dokumentasi pengerjaan pemadatan menggunakan road roller" />
                <div className="glass-capability__picnote">DOKUMENTASI PENGERJAAN</div>
              </div>
              <div className="glass-capability__detail" aria-hidden="true">
                <span className="glass-mini-label">PERHATIAN PADA DETAIL</span>
                <strong>Di lapangan,<br />setiap lapisan berarti.</strong>
                <span className="glass-capability__ruler">01 <i /> 02 <i /> 03 <i /> 04</span>
              </div>
            </div>
            <div className="glass-capability__copy">
              <span className="glass-overline">03 / PENDEKATAN</span>
              <h2 id="glass-capability-title">Bukan sekadar<br /><em>menghampar.</em></h2>
              <p>Kondisi area, rencana penggunaan, dan kebutuhan drainase ikut memengaruhi pilihan metode. Detail semacam ini penting dibahas sejak awal.</p>
              <div className="glass-capability__items">
                {[
                  ['Memahami kondisi area', 'Permukaan dan kebutuhan penggunaan perlu diketahui lebih dulu.'],
                  ['Menentukan pendekatan kerja', 'Tahapan serta pilihan alat mengikuti lingkup yang disepakati.'],
                  ['Menyamakan ekspektasi', 'Bicarakan gambaran pekerjaan dan kebutuhan data awal.'],
                ].map(([title,desc],i) => <div key={title}>
                  <span className="glass-capability__check"><Check size={16} /></span>
                  <div><small>0{i + 1} / DETAIL</small><strong>{title}</strong><p>{desc}</p></div>
                </div>)}
              </div>
              <button type="button" className="glass-button glass-button--dark" onClick={() => onOpenInquiry()}>
                Mulai diskusi <ArrowUpRight size={17}/>
              </button>
            </div>
          </div>
        </section>

        <section id="proyek" className="glass-gallery glass-section" aria-labelledby="glass-gallery-title">
          <div className="glass-gallery__ambient" aria-hidden="true" />
          <div className="glass-container">
            <div className="glass-section__head glass-section__head--dark">
              <div><span className="glass-overline glass-overline--light">04 / VISUAL JOURNAL</span>
                <h2 id="glass-gallery-title">Lebih dekat<br /><em>ke lapangan.</em></h2>
              </div>
              <p>Dokumentasi visual pengaspalan dan pengerjaan yang telah mendapat izin publikasi, dilengkapi ilustrasi untuk kategori layanan lainnya.</p>
            </div>
            <div className="glass-gallery__toolbar">
              <div className="glass-gallery__filters" role="group" aria-label="Filter galeri">
                {filters.map(item => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
                  {item.label}{item.id === 'semua' && <span> {PROJECTS_LIST.length.toString().padStart(2,'0')}</span>}
                </button>)}
              </div>
              <span>DOKUMENTASI FOTO / GALLERY</span>
            </div>
            <div className="glass-gallery__grid">
              {projects.map((project, index) => <article key={project.id}
                className={'glass-gallery-card' + (project.isWide && filter === 'semua' ? ' glass-gallery-card--wide' : '')}>
                <div className="glass-gallery-card__image">
                  <img src={project.image}
                    alt={(project.sourceFilename ? 'Foto dokumentasi: ' : 'Ilustrasi kategori: ') + project.title} loading="lazy" />
                  <div className="glass-gallery-card__top"><span>VISUAL / {String(index+1).padStart(2,'0')}</span><span>{project.categoryLabel}</span></div>
                </div>
                <div className="glass-gallery-card__content">
                  <div><small>{project.sourceFilename ? 'FOTO DOKUMENTASI · BERIZIN' : 'ILUSTRASI DEMO'}</small>
                    <h3>{project.title}</h3><p>{project.sourceFilename ? 'Foto dipublikasikan dengan izin.' : 'Ilustrasi kategori layanan, bukan foto pengerjaan.'}</p>
                  </div>
                  <button type="button" aria-label={'Bahas jenis pekerjaan terkait ' + project.title}
                    onClick={() => onOpenInquiry(project.category === 'aspal' ? 'Asphalt Hotmix' : project.title)}><ArrowUpRight size={20}/></button>
                </div>
              </article>)}
            </div>
            <p className="glass-gallery__disclaimer">Dokumentasi foto telah mendapat izin publikasi. Data proyek seperti lokasi dan waktu pengerjaan akan dilengkapi secara bertahap.</p>
          </div>
        </section>

        <section id="kontak" className="glass-cta glass-section" aria-labelledby="glass-cta-title">
          <div className="glass-cta__aurora" aria-hidden="true" />
          <div className="glass-container">
            <div className="glass-cta__panel">
              <div className="glass-cta__copy">
                <span className="glass-overline glass-overline--light">05 / LANGKAH BERIKUTNYA</span>
                <h2 id="glass-cta-title">Ada area yang<br />perlu <em>ditangani?</em></h2>
                <p>Mulai dari kebutuhan nyata. Ceritakan kondisi lokasi dan gambaran pekerjaan, lalu siapkan ringkasan untuk diskusi lanjutan.</p>
                <button type="button" className="glass-button glass-button--bright" onClick={() => onOpenInquiry()}>
                  Buat ringkasan konsultasi <ArrowUpRight size={18} />
                </button>
              </div>
              <div className="glass-cta__art" aria-hidden="true">
                <span className="glass-cta__ring glass-cta__ring--one"/><span className="glass-cta__ring glass-cta__ring--two"/>
                <span className="glass-cta__ring glass-cta__ring--three"/>
                <span className="glass-cta__center"><Compass size={58} strokeWidth={.9} /></span>
              </div>
              <div className="glass-cta__foot"><span>PUTRA JAYA PRATAMA</span><span>BUILT WITH INTENTION / PREVIEW</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass-footer">
        <div className="glass-container glass-footer__main">
          <div className="glass-footer__brand"><span className="glass-footer__logo">PJP<span>.</span></span>
            <p>Jasa pengaspalan dan konstruksi jalan untuk akses, area kendaraan, dan infrastruktur pendukung.</p>
            <small>GLASS CONCEPT / INTERNAL PREVIEW</small>
          </div>
          <div><strong>NAVIGASI</strong><a href="#beranda">Beranda</a><a href="#layanan">Layanan</a><a href="#proses">Cara Kerja</a><a href="#tentang">Tentang Kami</a><a href="#proyek">Galeri</a></div>
          <div><strong>KONSULTASI</strong><button type="button" onClick={() => onOpenInquiry()}>Bahas proyek <ChevronRight size={14}/></button>
            <p>Nomor WhatsApp dan informasi kontak resmi akan ditambahkan setelah terverifikasi.</p></div>
        </div>
        <div className="glass-container glass-footer__bottom"><span>© {new Date().getFullYear()} PUTRA JAYA PRATAMA · PROTOTYPE</span><span>FOTO DOKUMENTASI BERIZIN</span>
          <a href="#beranda" onClick={e => scrollToSection(e, '#beranda')}>BACK TO TOP ↑</a></div>
      </footer>
    </div>
  )
}
