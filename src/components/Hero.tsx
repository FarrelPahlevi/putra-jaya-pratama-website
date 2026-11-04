import React from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

interface HeroProps {
  onOpenInquiry: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const reduceMotion = useReducedMotion()
  return (
    <section className="pjp-hero" id="beranda" aria-labelledby="hero-title">
      <div className="site-container">
        <div className="pjp-hero__layout">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
            <div className="pjp-eyebrow pjp-eyebrow--light pjp-hero__eyebrow">Jasa pengaspalan & konstruksi jalan / Indonesia</div>
            <h1 id="hero-title" className="pjp-hero__title">
              Jalan yang<br /><em>tepat.</em><br />Kerja yang<br />terarah.
            </h1>
            <p className="pjp-copy pjp-hero__lead">
              Dari perkerasan hotmix sampai infrastruktur pendukung, Putra Jaya Pratama membantu Anda memahami pilihan pekerjaan sesuai kondisi lapangan.
            </p>
            <div className="pjp-hero__actions">
              <a href="#layanan" className="pjp-button pjp-button--orange">Lihat Layanan <ArrowUpRight size={17} /></a>
              <button type="button" onClick={onOpenInquiry} className="pjp-button pjp-button--outline">Bahas Proyek <ArrowUpRight size={17} /></button>
            </div>
            <div className="pjp-hero__meta">
              <span><i />Enam bidang layanan</span>
              <span><i />Konsultasi kebutuhan</span>
            </div>
          </motion.div>
          <motion.div className="pjp-hero__photo" initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <img src="/assets/pjp-preview/asphalt-road-preview.webp" alt="Foto referensi jalan beraspal yang dikelilingi pepohonan"
              width={900} height={1600} fetchPriority="high" />
            <div className="pjp-photo-top">
              <span className="pjp-photo-tag">Dokumentasi referensi</span>
              <span>01 / PJP</span>
            </div>
            <div className="pjp-photo-bottom">
              <div>
                <strong>Infrastruktur dimulai dari detail.</strong>
                <small>Foto pratinjau. Izin publikasi dan data proyek belum diverifikasi.</small>
              </div>
              <span style={{ fontSize: 29, color: '#e58a2a' }} aria-hidden="true">↗</span>
            </div>
          </motion.div>
        </div>
        <div className="pjp-hero__foot">
          <span className="pjp-scroll">Jelajahi ke bawah <ArrowDown size={13} style={{ display: 'inline' }} /></span>
          <span>Jalan • Area kerja • Infrastruktur pendukung</span>
        </div>
      </div>
    </section>
  )
}
