import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { animate } from 'motion/mini'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react'
import { SiteFooter } from '../../SiteFooter'
import { InquiryModal } from '../../components/InquiryModal'
import { FloatingWhatsApp } from '../../components/FloatingWhatsApp'
import { CONTACT, getWhatsAppUrl } from '../../config/contact'
import { keepDialogFocus } from '../../utils/focus'
import { FIELD_PHOTOS, photoPath } from './photos'
import type { FieldPhoto } from './photos'
import './final-sections.css'

const CONCEPTS = [
  { id: 'editorial', name: 'A / Industrial Editorial' },
  { id: 'portfolio', name: 'B / Architectural Portfolio' },
  { id: 'filmstrip', name: 'C / Field Filmstrip' },
] as const
type Concept = typeof CONCEPTS[number]['id']

function Picture({ photo, priority = false, large = false }: { photo: FieldPhoto; priority?: boolean; large?: boolean }) {
  return <img src={photoPath(photo, 700)}
    srcSet={`${photoPath(photo, 400)} 400w, ${photoPath(photo, 700)} 700w, ${photoPath(photo)} ${photo.width}w`}
    sizes={large ? '(max-width: 700px) 100vw, (max-width: 1100px) 80vw, 1100px' : '(max-width: 700px) 75vw, 550px'}
    width={photo.width} height={photo.height} alt={photo.alt} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={{ objectPosition: photo.position }} />
}

export function FinalSectionsPrototype() {
  const [concept, setConcept] = useState<Concept>('editorial')
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [inquiry, setInquiry] = useState(false)
  const [service, setService] = useState<string>()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('concept')
    if (CONCEPTS.some(item => item.id === requested)) setConcept(requested as Concept)
  }, [])

  useEffect(() => {
    const root = galleryRef.current
    if (!root) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const animations: ReturnType<typeof animate>[] = []
    let observer: IntersectionObserver | undefined
    const stop = () => { animations.forEach(animation => animation.cancel()); observer?.disconnect() }
    const start = () => {
      stop()
      if (reduced.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          animations.push(animate(entry.target, { opacity: [.86, 1], transform: ['translateY(12px)', 'translateY(0px)'] }, { duration: .65, ease: [.22, 1, .36, 1] }))
          observer?.unobserve(entry.target)
        }
      }, { threshold: .12 })
      root.querySelectorAll('.fp-photo').forEach(element => observer?.observe(element))
    }
    start()
    reduced.addEventListener('change', start)
    return () => { stop(); reduced.removeEventListener('change', start) }
  }, [concept])

  useEffect(() => {
    const dialog = dialogRef.current
    if (lightbox === null || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      returnFocus.current?.focus({ preventScroll: true })
    }
    // The dialog remains open while the selected photograph changes.
  }, [lightbox !== null])

  const openInquiry = (name?: string) => { setService(name); setInquiry(true) }
  const openPhoto = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    returnFocus.current = event.currentTarget
    setLightbox(index)
  }
  const changeConcept = (next: Concept) => {
    setConcept(next)
    setSelected(0)
    history.replaceState(null, '', `?concept=${next}`)
  }
  const scrollRail = (direction: number) => {
    const rail = railRef.current
    if (!rail) return
    const step = rail.querySelector<HTMLElement>('.fp-photo')?.offsetWidth ?? rail.clientWidth
    rail.scrollBy({ left: direction * (step + 20), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  const photoButton = (index: number, featured = false) => (
    <button className={`fp-photo${featured ? ' fp-photo--featured' : ''}`} type="button" key={FIELD_PHOTOS[index].archive}
      onClick={event => openPhoto(index, event)} aria-label={`Perbesar foto: ${FIELD_PHOTOS[index].label}, arsip ${FIELD_PHOTOS[index].archive}`}>
      <Picture photo={FIELD_PHOTOS[index]} large={featured || concept === 'filmstrip'} priority={featured || index === 0} />
      <span className="fp-photo__zoom" aria-hidden="true"><Maximize2 size={18} /></span>
    </button>
  )

  return <>
    <div className="fp-review" aria-label="Kontrol pratinjau desain">
      <span>Studi PJP <span className="fp-review__note">/ Final sections</span></span>
      <nav aria-label="Pilihan konsep desain">{CONCEPTS.map(item => <button key={item.id} type="button"
        aria-pressed={concept === item.id} onClick={() => changeConcept(item.id)}>{item.name}</button>)}</nav>
      <a href="/#proyek">Versi saat ini <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
    <div className="minimal-site final-prototype" data-concept={concept}>
      <a className="minimal-skip" href="#main">Lewati ke dokumentasi</a>
      <header className="fp-header fp-wrap">
        <a className="minimal-brand fp-brand" href="/" aria-label="Putra Jaya Pratama, beranda">
          <span className="minimal-brand__symbol" aria-hidden="true">P<span>.</span></span>
          <span className="minimal-brand__name" aria-hidden="true">PUTRA JAYA<strong>PRATAMA</strong></span>
        </a>
        <nav aria-label="Navigasi dokumentasi"><a href="/galeri-proyek">Galeri proyek</a><a href="#kontak">Bicarakan proyek <ArrowDown size={15} aria-hidden="true" /></a></nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="fp-evidence" id="proyek" aria-labelledby="fp-evidence-title">
          <div className="fp-wrap">
            <div className="fp-intro">
              <h1 id="fp-evidence-title">Pengaspalan.<br /><span>Dari dekat.</span></h1>
              <div className="fp-intro__detail"><p>Dokumentasi pekerjaan jalan.</p><p>Permukaan, proses, dan orang-orang di lapangan. Pilihan dokumentasi asli Putra Jaya Pratama.</p></div>
            </div>
            <div ref={galleryRef} className="fp-gallery">
              {concept === 'editorial' && <div className="fp-editorial">{photoButton(0, true)}<div className="fp-editorial__details">{photoButton(1)}{photoButton(2)}</div></div>}
              {concept === 'portfolio' && <div className="fp-portfolio">{photoButton(selected, true)}<div className="fp-selectors" aria-label="Pilih foto utama">{FIELD_PHOTOS.map((photo, index) =>
                <button key={photo.archive} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span>{photo.label}</button>)}</div></div>}
              {concept === 'filmstrip' && <><div ref={railRef} className="fp-filmstrip" tabIndex={0} role="region" aria-label="Pilihan foto pekerjaan, geser untuk melihat lainnya">{FIELD_PHOTOS.map((_, index) => photoButton(index))}</div><div className="fp-rail-controls"><span>Geser untuk melihat dokumentasi</span><div><button type="button" onClick={() => scrollRail(-1)} aria-label="Foto sebelumnya di filmstrip"><ArrowLeft size={20} /></button><button type="button" onClick={() => scrollRail(1)} aria-label="Foto berikutnya di filmstrip"><ArrowRight size={20} /></button></div></div></>}
            </div>
            <div className="fp-gallery-end"><p>Cuplikan dari lapangan.<br /><span>Lihat lebih dekat, atau jelajahi dokumentasi lainnya.</span></p><a className="fp-link" href="/galeri-proyek">Buka galeri proyek <ArrowUpRight size={22} aria-hidden="true" /></a></div>
          </div>
        </section>
        <section className="fp-consult" id="kontak" tabIndex={-1} aria-labelledby="fp-consult-title">
          <div className="fp-wrap fp-consult__grid">
            <div className="fp-consult__main"><h2 id="fp-consult-title">Mulai dari<br /><em>kondisi lokasi.</em></h2><p>Ceritakan pekerjaan yang Anda butuhkan. Kita bahas kondisi lapangan dan rencana pengerjaannya bersama.</p><button className="fp-action" type="button" onClick={() => openInquiry()} aria-haspopup="dialog">Ceritakan kebutuhan proyek <ArrowUpRight size={23} aria-hidden="true" /></button></div>
            <div className="fp-preparation"><h3>Untuk memulai percakapan</h3><dl><div><dt>Pekerjaan</dt><dd>Apa yang ingin dikerjakan?</dd></div><div><dt>Lokasi</dt><dd>Di mana rencananya?</dd></div><div><dt>Ukuran</dt><dd>Perkiraan luas, jika sudah ada.</dd></div></dl><p>Belum lengkap? Sampaikan yang Anda ketahui dulu.</p></div>
          </div>
          <noscript><p className="fp-wrap">Anda dapat langsung menghubungi <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp PJP: {CONTACT.whatsappDisplay}</a>.</p></noscript>
        </section>
      </main>
      <SiteFooter onOpenInquiry={openInquiry} galleryPage />
    </div>
    <InquiryModal isOpen={inquiry} defaultService={service} onClose={() => setInquiry(false)} />
    <FloatingWhatsApp isInquiryOpen={inquiry} />
    <dialog ref={dialogRef} className="fp-lightbox" aria-labelledby="fp-lightbox-title" onCancel={event => { event.preventDefault(); setLightbox(null) }}
      onClick={event => { if (event.target === event.currentTarget) setLightbox(null) }}
      onKeyDown={event => {
        keepDialogFocus(event)
        if (event.key === 'ArrowRight') { event.preventDefault(); setLightbox(index => ((index ?? 0) + 1) % FIELD_PHOTOS.length) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); setLightbox(index => ((index ?? 0) + FIELD_PHOTOS.length - 1) % FIELD_PHOTOS.length) }
      }}>
      {lightbox !== null && <div className="fp-lightbox__inner"><div className="fp-lightbox__bar"><h2 id="fp-lightbox-title">{FIELD_PHOTOS[lightbox].label} <span>/ Arsip {FIELD_PHOTOS[lightbox].archive}</span></h2><button type="button" onClick={() => setLightbox(null)} aria-label="Tutup foto"><X size={24} /></button></div><img src={photoPath(FIELD_PHOTOS[lightbox])} width={FIELD_PHOTOS[lightbox].width} height={FIELD_PHOTOS[lightbox].height} alt={FIELD_PHOTOS[lightbox].alt} /><div className="fp-lightbox__bar"><span>{lightbox + 1} / {FIELD_PHOTOS.length}</span><div><button type="button" onClick={() => setLightbox((lightbox + FIELD_PHOTOS.length - 1) % FIELD_PHOTOS.length)} aria-label="Foto sebelumnya"><ArrowLeft size={22} /></button><button type="button" onClick={() => setLightbox((lightbox + 1) % FIELD_PHOTOS.length)} aria-label="Foto berikutnya"><ArrowRight size={22} /></button></div></div></div>}
    </dialog>
  </>
}
