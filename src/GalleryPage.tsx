import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { SERVICES_LIST } from './data/mockData'
import { PROJECT_PHOTOS, projectPhotoSrcSet } from './data/projectGallery'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { keepDialogFocus } from './utils/focus'
import { useSiteMotion } from './motion/useSiteMotion'

type Props = { onOpenInquiry: (serviceName?: string) => void }

export const GalleryPage: React.FC<Props> = ({ onOpenInquiry }) => {
  const motionRoot = useSiteMotion()
  const [selected, setSelected] = useState('semua')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLAnchorElement | null>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

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
    if (description) description.content = 'Foto pengaspalan dan pekerjaan jalan Putra Jaya Pratama. Pilih jenis pekerjaan untuk melihat dokumentasi yang tersedia.'
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

  const openPhoto = (index: number, element: HTMLAnchorElement) => {
    triggerRef.current = element
    setActiveIndex(index)
  }
  const closePhoto = () => dialogRef.current?.close()
  const movePhoto = (offset: number) => {
    setActiveIndex(i => i === null ? null : (i + offset + filtered.length) % filtered.length)
  }

  return (
    <div ref={motionRoot} className="minimal-site gallery-page">
      <a className="minimal-skip" href="#main">Lewati ke galeri</a>
      <SiteHeader onOpenInquiry={onOpenInquiry} galleryPage />
      <main id="main" tabIndex={-1}>
        <section id="dokumentasi" className="project-gallery-section" aria-labelledby="project-gallery-title">
          <div className="minimal-container">
            <div className="project-gallery-heading">
              <h1 id="project-gallery-title" data-motion="title">Galeri <em>Proyek.</em></h1>
              <p>Pilih jenis pekerjaan untuk melihat fotonya. Dokumentasi akan kami tambahkan saat foto lainnya tersedia.</p>
            </div>

            <div className="project-filter-area">
              <div className="project-filter-scroll" role="group" aria-label="Filter berdasarkan layanan">
                <button type="button" className="project-filter" aria-pressed={selected === 'semua'}
                  onClick={() => { setSelected('semua'); setActiveIndex(null) }}>
                  Semua foto
                </button>
                {categories.map(service => (
                  <button type="button" key={service.id} className="project-filter"
                    aria-pressed={selected === service.id}
                    onClick={() => { setSelected(service.id); setActiveIndex(null) }}>
                    {service.title}
                  </button>
                ))}
              </div>
              <span className="project-filter-status" role="status" aria-live="polite" aria-atomic="true">{filtered.length} foto ditampilkan</span>
            </div>

            {displayedCategories.map(service => {
              const photos = filtered.filter(photo => photo.serviceId === service.id)
              return (
                <section key={service.id} className="project-category" aria-labelledby={'category-' + service.id}>
                  <div className="project-category__head">
                    <div className="project-category__heading"><span className="project-category__line" data-motion="line" />
                      <h2 id={'category-' + service.id}>{service.title}</h2>
                    </div>
                    <span>{String(photos.length).padStart(2,'0')} FOTO</span>
                  </div>
                  <div className="project-photo-grid" key={selected + service.id}>
                    {photos.map((photo, index) => {
                      const absoluteIndex = filtered.findIndex(item => item.id === photo.id)
                      const wide = index === 0 || index === 3
                      return (
                        <article className={'project-photo' + (index === 0 ? ' project-photo--feature' : '') + (index === 3 ? ' project-photo--last' : '')}
                          key={photo.id} data-motion="photo" data-motion-order={index}>
                          <a href={photo.image} className="project-photo__button"
                            onClick={event => {
                              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                              event.preventDefault()
                              openPhoto(absoluteIndex, event.currentTarget)
                            }}
                            aria-label={'Perbesar foto ' + photo.title}>
                            <img src={photo.image} srcSet={projectPhotoSrcSet(photo)}
                              sizes={'(max-width:360px) calc(100vw - 32px), (max-width:620px) 90vw, (max-width:900px) ' + (wide ? '90vw' : '44vw') + ', (max-width:1440px) ' + (wide ? '60vw, 842px' : '30vw, 415px')}
                              alt={photo.alt} loading={absoluteIndex === 0 ? 'eager' : 'lazy'}
                              fetchPriority={absoluteIndex === 0 ? 'high' : undefined}
                              decoding="async" width={photo.width} height={photo.height} />
                            <span className="project-photo__shade" aria-hidden="true" />
                          </a>
                        </article>
                      )
                    })}
                  </div>
                </section>
              )
            })}

            <div className="project-gallery-note">
              <Images size={21} strokeWidth={1.7} aria-hidden="true" />
              <p>Foto untuk paving block, cut and fill, cor beton, saluran U-Ditch, dan resapan air belum tersedia di galeri ini. Foto yang tampil sudah mendapat izin untuk dipublikasikan.</p>
            </div>
          </div>
        </section>

        <section className="project-bottom-cta" aria-label="Konsultasi proyek">
          <div className="minimal-container project-bottom-cta__inner">
            <div>
              <span className="minimal-kicker minimal-kicker--light">RENCANA PEKERJAAN ANDA</span>
              <h2 data-motion="title">Ceritakan rencana <em>pekerjaan Anda.</em></h2>
            </div>
            <button type="button" className="minimal-button minimal-button--primary" data-motion="settle"
              onClick={() => onOpenInquiry()}>
              Isi kebutuhan proyek <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
      <SiteFooter onOpenInquiry={onOpenInquiry} galleryPage />

      <dialog ref={dialogRef} className="project-lightbox" aria-label="Foto pekerjaan"
        onKeyDown={keepDialogFocus}
        onClose={() => {
          setActiveIndex(null)
          triggerRef.current?.focus()
        }}
        onClick={event => { if (event.target === dialogRef.current) closePhoto() }}
      >
        {activePhoto && (
          <div className="project-lightbox__inner">
            <div className="project-lightbox__top">
              <div><span>GALERI PROYEK / PJP</span><strong>{activePhoto.title}</strong></div>
              <button type="button" className="project-lightbox__close" onClick={closePhoto} aria-label="Tutup foto">
                <X size={23} aria-hidden="true" />
              </button>
            </div>
            <div className="project-lightbox__photo"
              onTouchStart={event => {
                const touch = event.touches.length === 1 ? event.touches[0] : undefined
                touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null
              }}
              onTouchCancel={() => { touchStart.current = null }}
              onTouchEnd={event => {
                const start = touchStart.current
                const end = event.changedTouches[0]
                touchStart.current = null
                if (!start || !end) return
                const dx = end.clientX - start.x
                const dy = end.clientY - start.y
                if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) movePhoto(dx < 0 ? 1 : -1)
              }}>
              <img src={activePhoto.image} alt={activePhoto.alt} width={activePhoto.width} height={activePhoto.height} />
            </div>
            <div className="project-lightbox__foot">
              <div><small>{SERVICES_LIST.find(service => service.id === activePhoto.serviceId)?.title}</small>
                <span>{activePhoto.caption}</span>
              </div>
              <div className="project-lightbox__controls">
                <span role="status" aria-atomic="true">{String(activeIndex! + 1).padStart(2,'0')} / {String(filtered.length).padStart(2,'0')}</span>
                <button type="button" aria-label="Foto sebelumnya" onClick={() => movePhoto(-1)}><ChevronLeft size={22} aria-hidden="true" /></button>
                <button type="button" aria-label="Foto berikutnya" onClick={() => movePhoto(1)}><ChevronRight size={22} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
