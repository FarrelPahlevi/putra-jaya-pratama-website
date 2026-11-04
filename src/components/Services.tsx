import React from 'react'
import { ArrowUpRight, Blocks, Droplets, Layers, Mountain, Route, Waves } from 'lucide-react'
import { SERVICES_LIST } from '../data/mockData'
import type { ServiceItem } from '../types'

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void
  onOpenInquiry: () => void
}

const icons = [Route, Blocks, Mountain, Layers, Waves, Droplets]

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenInquiry }) => {
  return (
    <section className="pjp-services pjp-section" id="layanan" aria-labelledby="services-title">
      <div className="site-container">
        <div className="pjp-section-head">
          <div>
            <div className="pjp-eyebrow pjp-eyebrow--dark">01 / Bidang pekerjaan</div>
            <h2 className="pjp-h2" id="services-title">Banyak kebutuhan.<br />Satu arah kerja.</h2>
          </div>
          <p className="pjp-copy">Enam kategori layanan untuk akses jalan, area kendaraan, pengolahan lahan, dan sistem pendukungnya.</p>
        </div>

        <div className="pjp-services__grid">
          {SERVICES_LIST.map((service, index) => {
            const Icon = icons[index] ?? Route
            return (
              <article className={'pjp-service-card' + (index === 0 ? ' pjp-service-card--feature' : '')} key={service.id}>
                <div className="pjp-service-card__top">
                  <span className="pjp-service-card__index">{String(index + 1).padStart(2, '0')} / 06</span>
                  <span className="pjp-service-card__icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
                <div className="pjp-service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <button type="button" className="pjp-service-card__action" onClick={() => onSelectService(service)}
                  aria-label={'Pelajari layanan ' + service.title}>
                  Pelajari layanan <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </article>
            )
          })}
        </div>
        <div className="pjp-section-tail">
          <span>Belum yakin layanan mana yang sesuai dengan kondisi area?</span>
          <button type="button" onClick={onOpenInquiry} className="pjp-text-link">Bahas kebutuhan proyek <ArrowUpRight size={16} /></button>
        </div>
      </div>
    </section>
  )
}
