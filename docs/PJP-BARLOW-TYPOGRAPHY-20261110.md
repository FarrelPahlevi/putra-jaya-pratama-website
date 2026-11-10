# PJP Typography Update — Barlow, 10 November 2026

## Keputusan desain
Website PJP Minimal Industrial menggunakan:
- Heading dan headline: Barlow Semi Condensed 700–800.
- Body, navbar, tombol, subtitle, label, judul layanan, dan form: Barlow 400–700.
- Warna dan layout Minimal Industrial sebelumnya dipertahankan.
- Georgia italic dihapus dari desain aktif; kata yang ditonjolkan tetap menggunakan aksen pumpkin orange, tetapi dengan bentuk huruf yang konsisten.
- Letter-spacing judul dikurangi dari sekitar -0.07em menjadi -0.025em (Hero), dan heading lain ke sekitar -0.02em hingga -0.025em.

## Implementasi
- index.html: Google Fonts CSS Barlow dan Barlow Semi Condensed menggunakan preconnect.
- src/index.css: font document global Barlow dan tracking default h1–h6 dinormalkan.
- src/minimal-industrial.css: family, weight, tracking, line-height, ukuran heading/body, service card, nav, CTA, footer, breakpoints, serta input/modal diselaraskan.
- Mobile: tombol font 14px, isi paragraf 15–16px, logo dan nama perusahaan sedikit lebih besar.
- Semua komponen Modal tetap memakai fungsionalitas yang sama tanpa perubahan React.

## QA
- npm run build: berhasil (TypeScript + Vite).
- Chrome headless: viewport 320, 360, 390, 414, 768, 1024, dan 1440px.
- Kedua font terkonfirmasi termuat melalui document.fonts (bukan hanya fallback).
- Tidak ada horizontal overflow, gambar rusak, internal anchor rusak, ataupun JS runtime errors.
- Menu mobile membuka/menutup, modal konsultasi membuka/menutup. Font input modal terukur 16px untuk menghindari zoom otomatis di iOS.
- Screenshot visual telah ditinjau di Hero, Layanan, dan Pendekatan Kami (desktop/mobile).

## Backup
C:\Projects\PJP-Backups\PJP-before-Barlow-typography-20261110.zip

## Catatan
Halaman masih memerlukan informasi kontak resmi untuk mengaktifkan WhatsApp secara nyata. Perubahan ini khusus desain tipografi; konten dan alur konsultasi tidak diubah.
