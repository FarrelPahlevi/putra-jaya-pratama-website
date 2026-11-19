import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react'
import { PROJECT_PHOTOS, projectPhotoSrcSet } from '../data/projectGallery'
import { usePhotoLightbox } from './usePhotoLightbox'

const editorialSelection = [
  { archive: '112', label: 'Permukaan jalan', alt: 'Permukaan jalan aspal di antara pepohonan, dokumentasi asli PJP arsip 112', position: '50% 57%' },
  { archive: '035', label: 'Pekerjaan di lapangan', alt: 'Tim lapangan mengerjakan permukaan aspal dengan alat perata, arsip PJP 035', position: '50% 50%' },
  { archive: '142', label: 'Pemadatan aspal', alt: 'Alat pemadat Sakai pada permukaan jalan aspal, arsip PJP 142', position: '50% 58%' },
  { archive: '198', label: 'Pengaspalan area', alt: 'Pekerja dan alat pemadat di area pengaspalan, arsip PJP 198', position: '50% 50%' },
]

const photos = editorialSelection.flatMap(selection => {
  const photo = PROJECT_PHOTOS.find(photo => photo.id === 'arsip-' + selection.archive)
  return photo ? [{ ...photo, ...selection }] : []
})

const featuredSizes = '(max-width: 760px) 90vw, (max-width: 1100px) 55vw, (max-width: 1600px) 59vw, 931px'
const detailSizes = '(max-width: 760px) 45vw, (max-width: 1100px) 34vw, (max-width: 1600px) 31vw, 490px'

export function EditorialGallery() {
  const { activeIndex, dialogProps, openPhoto, closePhoto, movePhoto } = usePhotoLightbox(photos.length)
  const activePhoto = activeIndex === null ? undefined : photos[activeIndex]

  const renderPhoto = (photo: typeof photos[number], index: number, featured = false) => (
    <a className="home-gallery__photo" key={photo.id} href={photo.image}
      aria-label={'Perbesar foto: ' + photo.label + ', arsip ' + photo.archive} aria-haspopup="dialog"
      data-motion="photo" data-motion-order={index} onClick={event => openPhoto(index, event)}>
      <img src={photo.image} srcSet={projectPhotoSrcSet(photo)} sizes={featured ? featuredSizes : detailSizes}
        width={photo.width} height={photo.height} alt={photo.alt}
        loading="lazy" decoding="async" style={{ objectPosition: photo.position }} />
      <span className="home-gallery__zoom" aria-hidden="true"><Maximize2 size={18} /></span>
    </a>
  )

  return (
    <section className="home-gallery" id="proyek" tabIndex={-1} aria-labelledby="home-gallery-title">
      <div className="minimal-container minimal-container--wide" data-avoid-floating-contact>
        <div className="home-gallery__intro">
          <h2 id="home-gallery-title">Pengaspalan.<br /><span>Dari dekat.</span></h2>
          <div className="home-gallery__detail">
            <p>Dokumentasi pekerjaan jalan.</p>
            <p>Permukaan, proses, dan orang-orang di lapangan. Pilihan dokumentasi asli Putra Jaya Pratama.</p>
          </div>
        </div>
        {photos.length > 0 && (
          <div className="home-gallery__photos">
            {renderPhoto(photos[0], 0, true)}
            <div className="home-gallery__supporting">
              {photos.slice(1, 3).map((photo, index) => renderPhoto(photo, index + 1))}
            </div>
          </div>
        )}
        <div className="home-gallery__end">
          <p>Cuplikan dari lapangan.<br /><span>Lihat lebih dekat, atau jelajahi dokumentasi lainnya.</span></p>
          <a className="home-gallery__link" href="/galeri-proyek">
            Buka galeri proyek <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </div>
      </div>

      <dialog className="editorial-lightbox" aria-labelledby="editorial-lightbox-title" {...dialogProps}>
        {activePhoto && activeIndex !== null && (
          <div className="editorial-lightbox__inner">
            <div className="editorial-lightbox__bar">
              <h2 id="editorial-lightbox-title">{activePhoto.label} <span>/ Arsip {activePhoto.archive}</span></h2>
              <button type="button" onClick={closePhoto} aria-label="Tutup foto"><X size={24} aria-hidden="true" /></button>
            </div>
            <img src={activePhoto.image} width={activePhoto.width} height={activePhoto.height} alt={activePhoto.alt} />
            <div className="editorial-lightbox__bar">
              <span role="status" aria-atomic="true">{activeIndex + 1} / {photos.length}</span>
              <div>
                <button type="button" onClick={() => movePhoto(-1)} aria-label="Foto sebelumnya"><ArrowLeft size={22} aria-hidden="true" /></button>
                <button type="button" onClick={() => movePhoto(1)} aria-label="Foto berikutnya"><ArrowRight size={22} aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
