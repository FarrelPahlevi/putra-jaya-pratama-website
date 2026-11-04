import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ContactCTAProps {
  onOpenInquiry: () => void
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenInquiry }) => (
  <section className="pjp-cta pjp-section" id="kontak" aria-labelledby="cta-title">
    <div className="site-container pjp-cta__layout">
      <div>
        <div className="pjp-eyebrow pjp-cta__eyebrow">05 / Mulai dari konsultasi</div>
        <h2 id="cta-title" className="pjp-h2">Ada jalan<br />yang perlu<br />dibangun?</h2>
        <p className="pjp-copy pjp-cta__copy">
          Gambarkan kebutuhan, kondisi lokasi, dan target pekerjaan Anda. Ringkasan awal membantu diskusi berikutnya lebih tepat.
        </p>
      </div>
      <div className="pjp-cta__side">
        <div className="pjp-cta__link">
          <small>Mulai percakapan / PJP</small>
          <strong>Langkah pertama tidak harus rumit.</strong>
          <span style={{ color: '#bdb8b3', fontSize: 13, lineHeight: 1.6 }}>
            Buat ringkasan yang siap disalin. Kontak WhatsApp resmi masih menunggu konfirmasi.
          </span>
          <button type="button" onClick={onOpenInquiry}>
            Buat Ringkasan Konsultasi <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </div>
  </section>
)
