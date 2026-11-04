# PJP Website — Pumpkin Industrial Redesign
Tanggal implementasi: 4 November 2026
Status: LOCAL PREVIEW, BELUM DIPUBLIKASIKAN

## Tujuan
Redesign homepage Putra Jaya Pratama dari kuning/hitam menjadi orange labu gelap, hitam, dan putih tulang. Mengikuti prinsip visual Style UI serta pemeriksaan Antislop: hierarki editorial, sistem jarak konsisten, komponen terarah, CTA jelas, tidak menggunakan statistik palsu, animasi tidak menghalangi konten.

## Design tokens
- Pumpkin: #C96A1B
- CTA Pumpkin Deep: #A65312 (teks putih, rasio kontras lebih tinggi)
- Pumpkin Highlight: #E58A2A
- Ink: #0C0D0E
- Charcoal: #151617
- Paper: #F5F3EE
- White: #FFFFFF
- Font: Bricolage Grotesque (existing)

## Homepage baru
1. Preview banner + header sticky + pill nav + mobile drawer
2. Editorial hero dengan foto referensi jalan dan tombol Lihat Layanan/Konsultasi
3. Strip enam layanan
4. Grid enam layanan (detail via InfoModal lama)
5. Proses empat tahap
6. Pendekatan kerja, foto alat referensi dan poin pertimbangan
7. Galeri filter 5 item (3 foto dan 2 ilustrasi demo)
8. CTA dan ringkasan konsultasi
9. Footer

## Berkas dimodifikasi
- src/index.css
- src/App.tsx
- src/components/Banner.tsx
- src/components/Navbar.tsx
- src/components/Hero.tsx
- src/components/Ticker.tsx
- src/components/Services.tsx
- src/components/Process.tsx
- src/components/Equipment.tsx
- src/components/Gallery.tsx
- src/components/ContactCTA.tsx
- src/components/Footer.tsx
- src/components/InfoModal.tsx
- src/components/InquiryModal.tsx
- index.html
- public/assets/asphalt.svg
- public/assets/concrete.svg
- public/assets/drainage.svg
- public/assets/hero-road.svg

## Yang tidak diubah
- Framework React + TypeScript + Vite, package.json, package-lock.json.
- Data layanan dan foto asli Drive, termasuk watermarknya.
- Data proyek foto tetap diberi penanda "foto referensi" / perlu verifikasi.
- Tidak ada nomor WhatsApp palsu, klaim portofolio atau sertifikasi yang dibuat-buat.
- Website belum dideploy.

## Uji yang sudah dilakukan
- npm.cmd run build: TypeScript + Vite sukses.
- Chrome headless viewport 320, 360, 390, 414, 768, 1024, 1440 px: tidak ada horizontal overflow.
- Tidak ada error JavaScript atau anchor rusak.
- Galeri filter bekerja (5 -> 3 foto pengaspalan).
- Menu mobile membuka dan menutup dengan Escape.
- Modal layanan dan modal konsultasi bisa dibuka.
- Koreksi: konten Services/Process tidak lagi bergantung pada IntersectionObserver untuk tampil.
- Aset JPEG/WebP tetap ada di public/assets/pjp-preview; ilustrasi demo diselaraskan ke pumpkin.
- Website bisa diakses lokal di http://127.0.0.1:5173/ jika server Vite aktif.

## Penting sebelum produksi
1. Konfirmasi izin penggunaan semua foto dan detail proyek, terutama watermark nama pihak lain.
2. Konfirmasi nomor WhatsApp resmi, wilayah layanan, legalitas dan alamat bisnis.
3. Lanjutkan halaman terpisah sesuai PRD jika memang masih diperlukan.
4. Jalankan Lighthouse dan uji Safari/mobile nyata sebelum publikasi.
5. Setup Git version control untuk histori perubahan yang lebih baik.

## Backup & rollback
Backup sebelum redesign:
C:\Projects\PJP-Backups\PJP-before-pumpkin-redesign-20261104.zip

Backup setelah redesign:
C:\Projects\PJP-Backups\PJP-pumpkin-redesign-20261104.zip

Untuk rollback, hentikan server development, buat salinan proyek saat ini, lalu pulihkan folder src, public, docs dan berkas konfigurasi dari ZIP versi sebelumnya. Jangan timpa tanpa cadangan.
