import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { SERVICES_LIST } from './data/mockData'
import { PROJECT_PHOTOS } from './data/projectGallery'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

type Props = { onOpenInquiry: (serviceName?: string) => void }

export const GalleryPage: React.FC<Props> = ({ onOpenInquiry }) => {
  const [selected, setSelected] = useState('semua')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  const categories = useMemo(
    () => SERVICES_LIST.filter(service => PROJECT_PHOTOS.some(photo => photo.serviceId === service.id)),
    [],
  )
  const filtered = useMemo(
    () => selected === 'semua' ? PROJECT_PHOTOS : PROJECT_PHOTOS.filter(photo => photo.serviceId === selected),
    [selected],
  )
  const displayedCategories = categories.filter(service => selected === 'semua' || selected === service.id)
  const activePhoto = activeIndex === null ? undefined : filtered[activeIndex]

  useEffect(() => {
    document.title = 'Galeri Proyek | Putra Jaya Pratama'
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = 'Lihat galeri dokumentasi pekerjaan pengaspalan dan konstruksi jalan Putra Jaya Pratama menurut kategori layanan.'
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [activeIndex !== null])

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveIndex(i => i === null ? null : (i + 1) % filtered.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeIndex !== null, filtered.length])

  const openPhoto = (index: number, element: HTMLButtonElement) => {
    triggerRef.current = element
    setActiveIndex(index)
  }
  const closePhoto = () => dialogRef.current?.close()
  const movePhoto = (offset: number) => {
    setActiveIndex(i => i === null ? null : (i + offset + filtered.length) % filtered.length)
  }

  return (
    <div className="minimal-site gallery-page">
      <a className="minimal-skip" href="#main">Lewati ke galeri</a>
      <SiteHeader onOpenInquiry={onOpenInquiry} galleryPage />
      <main id="main">
        <section className="project-hero" aria-labelledby="project-page-title">
          <div className="project-hero__photo" aria-hidden="true">
            <img src="/assets/pjp-preview/asphalt-road-preview.webp" alt="" width={1600} height={900} />
          </div>
          <div className="minimal-container project-hero__content">
            <nav aria-label="Breadcrumb" className="project-breadcrumb">
              <a href="/">Beranda</a><span aria-hidden="true">/</span><span aria-current="page">Galeri Proyek</span>
            </nav>
            <span className="minimal-kicker minimal-kicker--light">DOKUMENTASI PEKERJAAN / PJP</span>
            <h1 id="project-page-title">Pekerjaan nyata.<br /><em>Hasil yang terlihat.</em></h1>
            <p>Jelajahi dokumentasi pekerjaan Putra Jaya Pratama menurut jenis layanan. Foto-foto lapangan, ditampilkan dengan sederhana dan apa adanya.</p>
            <div className="project-hero__meta">
              <span>{String(PROJECT_PHOTOS.length).padStart(2, '0')} FOTO DOKUMENTASI</span>
              <span className="project-hero__separator" />
              <span>{String(categories.length).padStart(2, '0')} KATEGORI TERSEDIA</span>
            </div>
          </div>
        </section>

        <section id="dokumentasi" className="project-gallery-section" aria-labelledby="project-gallery-title">
          <div className="minimal-container">
            <div className="project-gallery-heading">
              <div>
                <span className="minimal-kicker">01 / PORTOFOLIO</span>
                <h2 id="project-gallery-title">Galeri <em>Proyek.</em></h2>
              </div>
              <p>Pilih layanan untuk melihat dokumentasi terkait. Kategori lainnya akan hadir seiring bertambahnya foto pekerjaan.</p>
            </div>

            <div className="project-filter-area">
              <div className="project-filter-scroll" role="group" aria-label="Filter berdasarkan layanan">
                <button type="button" className="project-filter" aria-pressed={selected === 'semua'}
                  onClick={() => { setSelected('semua'); setActiveIndex(null) }}>
                  Semua Foto <span>{String(PROJECT_PHOTOS.length).padStart(2, '0')}</span>
                </button>
                {categories.map(service => {
                  const count = PROJECT_PHOTOS.filter(photo => photo.serviceId === service.id).length
                  return (
                    <button type="button" key={service.id} className="project-filter"
                      aria-pressed={selected === service.id}
                      onClick={() => { setSelected(service.id); setActiveIndex(null) }}>
                      {service.title} <span>{String(count).padStart(2,'0')}</span>
                    </button>
                  )
                })}
              </div>
              <span className="project-filter-status">{filtered.length} FOTO DITEMUKAN</span>
            </div>

            {displayedCategories.map(service => {
              const photos = filtered.filter(photo => photo.serviceId === service.id)
              return (
                <section key={service.id} className="project-category" aria-labelledby={'category-' + service.id}>
                  <div className="project-category__head">
                    <div className="project-category__heading"><span className="project-category__line" />
                      <h3 id={'category-' + service.id}>{service.title}</h3>
                    </div>
                    <span>{String(photos.length).padStart(2,'0')} FOTO</span>
                  </div>
                  <div className="project-photo-grid">
                    {photos.map((photo, index) => {
                      const absoluteIndex = filtered.findIndex(item => item.id === photo.id)
                      return (
                        <article className={'project-photo' + (index === 0 ? ' project-photo--feature' : '') + (index === 3 ? ' project-photo--last' : '')}
                          key={photo.id}>
                          <button type="button" className="project-photo__button"
                            onClick={event => openPhoto(absoluteIndex, event.currentTarget)}
                            aria-label={'Perbesar foto ' + photo.title}>
                            <img src={photo.image} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'}
                              decoding="async" width={1100} height={750} />
                            <span className="project-photo__shade" aria-hidden="true" />
                            <span className="project-photo__top">
                              <span>DOKUMENTASI / {String(index + 1).padStart(2,'0')}</span>
                              <span className="project-photo__expand" aria-hidden="true"><ArrowUpRight size={18}/></span>
                            </span>
                            <span className="project-photo__bottom">
                              <span className="project-photo__text"><small>{photo.caption}</small><strong>{photo.title}</strong></span>
                              <span className="project-photo__view">LIHAT FOTO <ArrowUpRight size={15}/></span>
                            </span>
                          </button>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}

            <div className="project-gallery-note">
              <Images size={21} strokeWidth={1.7} aria-hidden="true" />
              <p>Dokumentasi untuk Paving Block, Cut and Fill, Cor Beton, Saluran U-Ditch, dan Resapan Air akan ditampilkan setelah fotonya tersedia. Seluruh foto yang saat ini ditampilkan sudah mendapat izin publikasi.</p>
            </div>
          </div>
        </section>

        <section className="project-bottom-cta" aria-label="Konsultasi proyek">
          <div className="minimal-container project-bottom-cta__inner">
            <div>
              <span className="minimal-kicker minimal-kicker--light">BUTUH PEKERJAAN SERUPA?</span>
              <h2>Diskusikan kebutuhan <em>area Anda.</em></h2>
            </div>
            <button type="button" className="minimal-button minimal-button--primary"
              onClick={() => onOpenInquiry()}>
              Mulai Konsultasi <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
      </main>
      <SiteFooter onOpenInquiry={onOpenInquiry} galleryPage />

      <dialog ref={dialogRef} className="project-lightbox" aria-label="Pratinjau dokumentasi proyek"
        onClose={() => {
          setActiveIndex(null)
          triggerRef.current?.focus()
        }}
        onClick={event => { if (event.target === dialogRef.current) closePhoto() }}
        onTouchStart={event => { touchStartX.current = event.touches[0]?.clientX ?? null }}
        onTouchEnd={event => {
          const start = touchStartX.current
          if (start === null) return
          const delta = (event.changedTouches[0]?.clientX ?? start) - start
          if (Math.abs(delta) > 55) movePhoto(delta < 0 ? 1 : -1)
          touchStartX.current = null
        }}
      >
        {activePhoto && (
          <div className="project-lightbox__inner">
            <div className="project-lightbox__top">
              <div><span>GALERI PROYEK / PJP</span><strong>{activePhoto.title}</strong></div>
              <button type="button" className="project-lightbox__close" onClick={closePhoto} aria-label="Tutup foto">
                <X size={23} />
              </button>
            </div>
            <div className="project-lightbox__photo">
              <img src={activePhoto.image} alt={activePhoto.alt} />
            </div>
            <div className="project-lightbox__foot">
              <div><small>{SERVICES_LIST.find(service => service.id === activePhoto.serviceId)?.title}</small>
                <span>{activePhoto.caption}</span>
              </div>
              <div className="project-lightbox__controls">
                <span>{String(activeIndex! + 1).padStart(2,'0')} / {String(filtered.length).padStart(2,'0')}</span>
                <button type="button" aria-label="Foto sebelumnya" onClick={() => movePhoto(-1)}><ChevronLeft size={22}/></button>
                <button type="button" aria-label="Foto berikutnya" onClick={() => movePhoto(1)}><ChevronRight size={22}/></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
