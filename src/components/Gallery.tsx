import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS_LIST } from '../data/mockData'

interface GalleryProps {
  onOpenInquiry: (defaultService?: string) => void
}

type Filter = 'semua' | 'aspal' | 'beton' | 'drainase'

const filters: { id: Filter; label: string }[] = [
  { id: 'semua', label: 'Semua' },
  { id: 'aspal', label: 'Pengaspalan' },
  { id: 'beton', label: 'Beton' },
  { id: 'drainase', label: 'Drainase' },
]

export const Gallery: React.FC<GalleryProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState<Filter>('semua')
  const filtered = filter === 'semua' ? PROJECTS_LIST : PROJECTS_LIST.filter((project) => project.category === filter)

  return (
    <section id="proyek" className="pjp-gallery pjp-section" aria-labelledby="projects-title">
      <div className="site-container">
        <div className="pjp-section-head">
          <div>
            <div className="pjp-eyebrow pjp-eyebrow--dark">04 / Dokumentasi visual</div>
            <h2 id="projects-title" className="pjp-h2">Lebih dekat<br />ke lapangan.</h2>
          </div>
          <p className="pjp-copy">Foto-foto berikut berasal dari folder referensi pengaspalan. Detail proyek, hak penggunaan, dan atribusi masih dalam proses verifikasi.</p>
        </div>
        <div className="pjp-filters" role="group" aria-label="Filter kategori galeri">
          {filters.map(({ id, label }) => (
            <button type="button" className="pjp-filter" key={id} aria-pressed={filter === id}
              onClick={() => setFilter(id)}>
              {label}{id === 'semua' ? ' · ' + String(PROJECTS_LIST.length).padStart(2, '0') : ''}
            </button>
          ))}
        </div>
        <div className="pjp-gallery__grid">
          {filtered.map((project) => {
            const wide = project.isWide && filter === 'semua'
            return (
              <article key={project.id} className={'pjp-gallery-card' + (wide ? ' pjp-gallery-card--wide' : '')}>
                <div className="pjp-gallery-card__media">
                  <img src={project.image} loading="lazy"
                    alt={project.needsReview ? 'Foto referensi: ' + project.title : 'Ilustrasi konsep: ' + project.title} />
                  <span className="pjp-gallery-card__status">
                    {project.needsReview ? 'Foto referensi · perlu verifikasi' : 'Ilustrasi kategori'}
                  </span>
                  <button type="button" className="pjp-gallery-card__button" onClick={() => onOpenInquiry(project.category === 'aspal' ? 'Asphalt Hotmix' : project.title)}
                    aria-label={'Diskusikan kebutuhan terkait ' + project.title}>
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </button>
                </div>
                <div className="pjp-gallery-card__info">
                  <div>
                    <small>{project.kind}</small>
                    <h3>{project.title}</h3>
                    {project.sourceFilename && <p>{project.sourceFilename} · belum diverifikasi sebagai portofolio resmi PJP</p>}
                  </div>
                  <span className="pjp-gallery-card__category">{project.categoryLabel}</span>
                </div>
              </article>
            )
          })}
        </div>
        <div className="pjp-gallery__note">
          <span>Materi ini untuk preview internal. Jangan publikasikan sebagai klaim pekerjaan resmi sebelum disetujui.</span>
          <button type="button" className="pjp-text-link" onClick={() => onOpenInquiry()}>
            Bahas rencana proyek <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
