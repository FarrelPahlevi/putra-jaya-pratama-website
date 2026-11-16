import React, { useEffect } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SERVICES_LIST } from './data/mockData'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { SERVICE_ILLUSTRATIONS } from './data/serviceIllustrations'
import { useSiteMotion } from './motion/useSiteMotion'
import { CONTACT, getWhatsAppUrl } from './config/contact'

type Props = {
  onOpenInquiry: (serviceName?: string) => void
}

export const MinimalIndustrial: React.FC<Props> = ({ onOpenInquiry }) => {
  const motionRoot = useSiteMotion()
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
    section.focus({ preventScroll: true })
  }

  return (
    <div ref={motionRoot} className="minimal-site">
      <a className="minimal-skip" href="#main">Lewati ke konten</a>
      <SiteHeader onOpenInquiry={onOpenInquiry} />

      <main id="main" tabIndex={-1}>
        <section className="minimal-hero" id="beranda" tabIndex={-1} aria-labelledby="minimal-hero-title">
          <img className="minimal-hero__image" src="/assets/pjp-preview/asphalt-access-preview.webp"
            srcSet="/assets/pjp-preview/asphalt-access-preview-400.webp 400w, /assets/pjp-preview/asphalt-access-preview-700.webp 700w, /assets/pjp-preview/asphalt-access-preview.webp 1200w"
            sizes="max(100vw, 134svh)" alt="Area jalan akses dengan permukaan beraspal." width={1200} height={900}
            fetchPriority="high" />
          <div className="minimal-hero__shade" aria-hidden="true" />
          <div className="minimal-container minimal-hero__content">
            <div className="minimal-kicker minimal-kicker--light">
              <span className="minimal-kicker__line" /> PUTRA JAYA PRATAMA / KONSTRUKSI JALAN
            </div>
            <h1 id="minimal-hero-title"><span className="motion-hero-line" data-hero-line>Pengaspalan dan</span><br /><em className="motion-hero-line" data-hero-line>konstruksi jalan.</em></h1>
            <p data-hero-support>Kami melayani pengaspalan hotmix, perkerasan, dan pekerjaan pendukung jalan. Ceritakan kondisi lokasi dan rencana Anda.</p>
            <div className="minimal-hero__buttons" data-hero-support>
              <a className="minimal-button minimal-button--primary" href="#layanan" onClick={(event) => goTo(event, '#layanan')}>
                Lihat layanan <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <button type="button" className="minimal-button minimal-button--outline"
                onClick={() => onOpenInquiry()}>Isi kebutuhan proyek <ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
        </section>

        <section id="layanan" tabIndex={-1} className="minimal-services minimal-section" aria-labelledby="minimal-services-title">
          <div className="minimal-container">
            <div className="minimal-section-heading minimal-section-heading--center">
              <span className="minimal-kicker">01 / LAYANAN</span>
              <h2 id="minimal-services-title" data-motion="title">Pekerjaan yang<br /><em>kami tangani.</em></h2>
              <p data-motion="copy">Setiap lokasi punya kebutuhan yang berbeda. Kami menyesuaikan jenis pekerjaan dengan kondisi di lapangan.</p>
            </div>
            <div className="minimal-service-grid">
              {SERVICES_LIST.map((service, index) => {
                const illustration = SERVICE_ILLUSTRATIONS[service.id]
                const asset = '/assets/services/' + illustration.file
                return (
                  <article key={service.id} className="minimal-service"
                    aria-labelledby={'service-' + service.id}>
                    <div className="minimal-service__visual" data-motion="illustration" data-motion-order={index}>
                      <img
                        src={asset + '-800.webp'}
                        srcSet={asset + '-400.webp 400w, ' + asset + '-800.webp 800w'}
                        sizes="(min-width: 1100px) 340px, (min-width: 800px) 340px, (min-width: 520px) calc((90vw - 32px) / 2), (min-width: 380px) 304px, calc(100vw - 32px)"
                        width={800} height={640}
                        loading="lazy" decoding="async"
                        alt={illustration.alt}
                      />
                    </div>
                    <h3 id={'service-' + service.id}>
                      <a href="#kontak" className="minimal-service__inquiry" data-service={service.id} aria-haspopup="dialog"
                        aria-label={'Konsultasi ' + service.title} onClick={event => { event.preventDefault(); onOpenInquiry(service.title) }}>
                        {service.title} <ArrowUpRight size={17} aria-hidden="true" />
                      </a>
                    </h3>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="tentang" tabIndex={-1} className="minimal-story" aria-labelledby="minimal-story-title">
          <div className="minimal-story__image">
            <img src="/assets/pjp-preview/road-roller-preview.webp" loading="lazy"
              srcSet="/assets/pjp-preview/road-roller-preview-400.webp 400w, /assets/pjp-preview/road-roller-preview-700.webp 700w, /assets/pjp-preview/road-roller-preview.webp 1200w"
              sizes="(max-width:950px) 100vw, 50vw"
              alt="Pemadatan jalan menggunakan road roller." width={1200} height={900} />
            <span>DOKUMENTASI PEMADATAN JALAN</span>
          </div>
          <div className="minimal-story__copy">
            <div className="minimal-story__copy-inner">
              <span className="minimal-kicker minimal-kicker--light">02 / PENDEKATAN KAMI</span>
              <h2 id="minimal-story-title" data-motion="title">Kami mulai dari <em>kondisi lapangan.</em></h2>
              <p data-motion="copy">Kami mulai dengan memahami kondisi jalan dan lahan, beban kendaraan, serta aliran air. Setelah itu, kami bahas cara pengerjaan yang sesuai dengan kebutuhan Anda.</p>
              <div className="minimal-story__facts" data-motion="copy">
                <div><span>01</span><strong>Mengenali kondisi lokasi</strong></div>
                <div><span>02</span><strong>Membahas cara pengerjaan</strong></div>
                <div><span>03</span><strong>Menjaga komunikasi selama pekerjaan</strong></div>
              </div>
              <button type="button" onClick={() => onOpenInquiry()} className="minimal-text-button minimal-text-button--light">
                Isi kebutuhan proyek <ArrowUpRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section id="proyek" tabIndex={-1} className="minimal-gallery-teaser" aria-labelledby="minimal-gallery-teaser-title">
          <div className="minimal-container minimal-gallery-teaser__inner">
            <div>
              <span className="minimal-kicker">03 / DOKUMENTASI PROYEK</span>
              <h2 id="minimal-gallery-teaser-title" data-motion="title">Dokumentasi <em>pekerjaan jalan.</em></h2>
              <p>Lihat dokumentasi pengaspalan dan pemadatan jalan, tersusun berdasarkan jenis pekerjaan.</p>
            </div>
            <a className="minimal-gallery-teaser__link" href="/galeri-proyek">
              Lihat foto proyek <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="kontak" tabIndex={-1} className="minimal-contact" aria-labelledby="minimal-contact-title">
          <div className="minimal-container minimal-contact__inner">
            <div>
              <span className="minimal-kicker minimal-kicker--light">04 / KONSULTASI</span>
              <h2 id="minimal-contact-title" data-motion="title">Ada rencana<br />pekerjaan <em>jalan?</em></h2>
              <p>Ceritakan kondisi lokasi dan pekerjaan yang Anda butuhkan. Kami mulai dari informasi tersebut untuk membahas rencana pengerjaannya.</p>
              <a className="minimal-contact__whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp: {CONTACT.whatsappDisplay}</a>
            </div>
            <button type="button" onClick={() => onOpenInquiry()} className="minimal-button minimal-button--dark" data-motion="settle">
              Isi kebutuhan proyek <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <SiteFooter onOpenInquiry={onOpenInquiry} />
    </div>
  )
}
