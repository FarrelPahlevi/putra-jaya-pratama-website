# Putra Jaya Pratama (PJP)

Source website **PJP Minimal Industrial**, pengembangan terbaru dari versi Pumpkin Industrial. Layout dirancang ulang pada 6 November 2026 dengan referensi komposisi industri dari 99designs. **Versi Glassmorphism sudah bukan desain aktif.**

## Status
- **Branch aktif:** `main` berisi Minimal Industrial, dengan React 19, TypeScript, Vite.
- **Branch arsip:** `archive/glassmorphism-20261109` menyimpan kondisi Glass terakhir.
- **Cloudflare Pages:** project preview sebelumnya menggunakan Direct Upload dan **tidak otomatis terbarui dari push GitHub**. Jangan menganggap tautan Cloudflare sudah beralih ke layout baru sampai deployment dilakukan dan diuji.

## Menjalankan di PC lain

Install Node.js LTS dan Git, lalu:

```bash
git clone https://github.com/FarrelPahlevi/pjp-website-glass.git
cd pjp-website-glass
npm ci
npm run dev
```

Buka alamat localhost yang muncul di terminal. Untuk mengecek build:

```bash
npm run build
npm run preview
```

## Susunan desain terbaru
- Hero foto full-width dengan headline “Membangun jalan. Membuka akses.”
- Header minimal, navigasi responsif.
- Grid enam layanan, section editorial alat dan cara kerja, timeline empat tahap.
- Galeri empat foto dokumentasi WebP dan CTA konsultasi.
- Komponen dialog detail layanan dan ringkasan konsultasi masih aktif.

## Referensi tata letak
- https://99designs.com/profiles/kwikrelease/designs/1149098
- https://99designs.com/profiles/sudipdutta/designs/1233964

Referensi hanya untuk prinsip tata letak. Kode, konten, dan visual website PJP dikembangkan secara terpisah.

## Catatan
- Empat foto dokumentasi telah dinyatakan berizin oleh pemilik PJP.
- Nomor WhatsApp resmi belum dikonfigurasi. Form konsultasi membuat ringkasan yang bisa disalin, belum mengirim pesan langsung.
- Sebelum rilis resmi, finalisasi profil perusahaan, rincian proyek, serta informasi kontak yang sudah diverifikasi.
- Screenshot lokal dan `node_modules` tidak disimpan di repository.

Lihat `docs/PJP-MINIMAL-INDUSTRIAL-LAYOUT-20261106.md` untuk catatan implementasi, atau buka folder `src` untuk source utama.

## Melanjutkan proyek dari PC lain

Source utama dan revisi terbaru (termasuk penyederhanaan galeri serta perbaikan copywriting 11 November 2026) tersinkron melalui repository ini. Lihat [`docs/SETUP-PC-LAIN.md`](docs/SETUP-PC-LAIN.md) untuk cara clone, menjalankan project, menginstal ulang skill Codex, dan memakai script QA. Screenshot QA besar, dependency lokal, serta rahasia PC tidak termasuk commit. Push ke GitHub **tidak otomatis meng-deploy Cloudflare Pages**.
