import React from 'react'
import { ArrowUpRight } from 'lucide-react'

interface FooterProps {
  onOpenInquiry: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const year = new Date().getFullYear()
  return (
    <footer className="pjp-footer">
      <div className="site-container">
        <div className="pjp-footer__main">
          <div className="pjp-footer__intro">
            <a href="#beranda" className="pjp-footer__brand" aria-label="Kembali ke awal halaman">
              <strong>PJP</strong><i aria-hidden="true" />
            </a>
            <p>Putra Jaya Pratama. Layanan pengaspalan dan konstruksi jalan untuk kebutuhan area dan infrastruktur pendukung.</p>
            <span className="pjp-label" style={{ color: '#c97b44', display: 'block', marginTop: 26 }}>Dibangun dengan tujuan. Dikerjakan dengan arah.</span>
          </div>
          <nav className="pjp-footer__column" aria-label="Navigasi footer">
            <h3>Jelajahi</h3>
            <a href="#beranda">Beranda</a>
            <a href="#layanan">Layanan</a>
            <a href="#proyek">Dokumentasi Proyek</a>
            <a href="#tentang">Tentang Kami</a>
            <a href="#proyek">Galeri</a>
          </nav>
          <div className="pjp-footer__column">
            <h3>Hubungi</h3>
            <button type="button" onClick={onOpenInquiry}>Konsultasi proyek <ArrowUpRight size={14} style={{ display: 'inline' }} /></button>
            <a href="#kontak">Halaman kontak</a>
            <p style={{ marginTop: 18, fontSize: 12 }}>Nomor WhatsApp dan alamat resmi akan ditambahkan setelah dikonfirmasi.</p>
          </div>
        </div>
        <div className="pjp-footer__bottom">
          <span>© {year} Putra Jaya Pratama · Website perusahaan</span>
          <span>Foto referensi belum terverifikasi untuk publikasi</span>
          <a href="#beranda">Kembali ke atas ↑</a>
        </div>
      </div>
    </footer>
  )
}
