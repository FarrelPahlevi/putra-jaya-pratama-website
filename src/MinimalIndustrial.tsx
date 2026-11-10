import React, { useEffect } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { PROCESS_STEPS, SERVICES_LIST } from './data/mockData'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { SERVICE_ILLUSTRATIONS } from './data/serviceIllustrations'

type Props = {
  onOpenInquiry: (serviceName?: string) => void
}

export const MinimalIndustrial: React.FC<Props> = ({ onOpenInquiry }) => {
  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1))
        target?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    }
  }, [])

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const section = document.getElementById(target.slice(1))
    if (!section) return
    event.preventDefault()
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', target)
  }

  return (
    <div className="minimal-site">
      <a className="minimal-skip" href="#main">Lewati ke konten</a>
      <SiteHeader onOpenInquiry={onOpenInquiry} />

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
              {SERVICES_LIST.map((service) => {
                const illustration = SERVICE_ILLUSTRATIONS[service.id]
                const asset = '/assets/services/' + illustration.file
                return (
                  <article key={service.id} className="minimal-service"
                    aria-labelledby={'service-' + service.id}>
                    <div className="minimal-service__visual">
                      <img
                        src={asset + '-800.webp'}
                        srcSet={asset + '-400.webp 400w, ' + asset + '-800.webp 800w'}
                        sizes="(min-width: 1100px) 340px, (min-width: 800px) 340px, (min-width: 520px) calc((90vw - 32px) / 2), (min-width: 380px) 304px, calc(100vw - 44px)"
                        width={800} height={640}
                        loading="lazy" decoding="async"
                        alt={illustration.alt}
                      />
                    </div>
                    <h3 id={'service-' + service.id}>{service.title}</h3>
                  </article>
                )
              })}
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

        <section id="proyek" className="minimal-gallery-teaser" aria-labelledby="minimal-gallery-teaser-title">
          <div className="minimal-container minimal-gallery-teaser__inner">
            <div>
              <span className="minimal-kicker">04 / DOKUMENTASI PROYEK</span>
              <h2 id="minimal-gallery-teaser-title">Lihat hasil kerja <em>di lapangan.</em></h2>
              <p>Dokumentasi pekerjaan sekarang punya halaman tersendiri, tersusun berdasarkan jenis layanan agar lebih mudah dijelajahi.</p>
            </div>
            <a className="minimal-gallery-teaser__link" href="/galeri-proyek">
              Jelajahi Galeri Proyek <ArrowUpRight size={20} aria-hidden="true" />
            </a>
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

      <SiteFooter onOpenInquiry={onOpenInquiry} />
    </div>
  )
}
