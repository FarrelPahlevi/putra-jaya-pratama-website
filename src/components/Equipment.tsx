import React from 'react'
import { ArrowUpRight, ClipboardCheck, MessageCircleMore, Wrench } from 'lucide-react'

interface EquipmentProps {
  onOpenInquiry: () => void
}

const reasons = [
  { icon: ClipboardCheck, title: 'Pekerjaan mengikuti kebutuhan', text: 'Jenis permukaan, luas, dan kondisi area jadi dasar pembahasan sebelum metode ditentukan.' },
  { icon: Wrench, title: 'Pilihan alat sesuai pekerjaan', text: 'Pekerjaan penghamparan dan pemadatan membutuhkan alat yang tepat untuk tiap tahapan.' },
  { icon: MessageCircleMore, title: 'Komunikasi sejak awal', text: 'Ruang diskusi terbuka untuk tujuan pekerjaan, kondisi lokasi, dan tahapan berikutnya.' },
]

export const Equipment: React.FC<EquipmentProps> = ({ onOpenInquiry }) => (
  <section className="pjp-capability pjp-section" id="tentang" aria-labelledby="equipment-title">
    <div className="site-container pjp-capability__layout">
      <div className="pjp-capability__visual">
        <img src="/assets/pjp-preview/road-roller-preview.webp" loading="lazy" width={1200} height={900}
          alt="Foto referensi aktivitas pemadatan menggunakan road roller pada area kerja" />
        <div className="pjp-capability__watermark">
          <strong>Kerja nyata.<br />Butuh detail.</strong>
          <small>Foto referensi<br />Menunggu verifikasi</small>
        </div>
      </div>
      <div className="pjp-capability__copy">
        <div className="pjp-eyebrow pjp-eyebrow--dark">03 / Tentang pendekatan kami</div>
        <h2 id="equipment-title" className="pjp-h2">Bukan cuma<br />soal aspal.</h2>
        <p className="pjp-copy">Pekerjaan jalan juga menyangkut kondisi dasar, peralatan, aliran air, dan pemakaian area. Semua perlu dibicarakan dengan jelas.</p>
        <div className="pjp-proof-list">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              <div><strong>{title}</strong><p>{text}</p></div>
            </div>
          ))}
        </div>
        <button className="pjp-button pjp-button--dark" type="button" onClick={onOpenInquiry}>
          Diskusikan pekerjaan <ArrowUpRight size={17} />
        </button>
      </div>
    </div>
  </section>
)
