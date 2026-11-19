# Putra Jaya Pratama

Website profil usaha dan portofolio pekerjaan **Putra Jaya Pratama (PJP)**, penyedia jasa pengaspalan dan konstruksi jalan.

**Website:** https://putra-jaya-pratama.pages.dev

**Repository:** https://github.com/FarrelPahlevi/putra-jaya-pratama-website

## Tentang Proyek

Website ini membantu calon pelanggan mengenal layanan PJP, melihat dokumentasi pekerjaan, dan menyiapkan informasi awal untuk konsultasi.

**Layanan:** Asphalt Hotmix, Paving Block, Cut & Fill, Cor Beton, Saluran U-Ditch, dan Resapan Air.

Tampilan menggunakan identitas **Minimal Industrial** dengan palet oranye, hitam, putih, tipografi Barlow, ilustrasi layanan isometrik, dan animasi scroll responsif. Animasi mendukung `prefers-reduced-motion`, sementara kedua halaman utama sudah memiliki HTML hasil prerender.

## Halaman dan Fitur

- **Beranda (`/`):** pengenalan PJP, enam layanan, dokumentasi, alur pekerjaan, dan ajakan konsultasi.
- **Galeri Proyek (`/galeri-proyek`):** dokumentasi pekerjaan, filter layanan, dan galeri interaktif.
- **Form konsultasi:** membuka WhatsApp resmi PJP dengan pesan kebutuhan pekerjaan yang sudah disiapkan. Pelanggan memeriksa dan mengirim pesan dari WhatsApp; opsi salin ringkasan tetap tersedia. Konfigurasi nomor berada di `src/config/contact.ts`.
- **Responsivitas dan aksesibilitas:** layout desktop, tablet, dan mobile; interaksi keyboard; dukungan reduced motion.

## Teknologi

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Motion · Lucide React.

## Menjalankan Secara Lokal

Persyaratan: Node.js versi kompatibel dengan proyek (CI menggunakan Node.js 24), npm, dan Git.

```bash
git clone https://github.com/FarrelPahlevi/putra-jaya-pratama-website.git
cd putra-jaya-pratama-website
npm ci
npm run dev
```

Alamat lokal akan ditampilkan oleh Vite. Untuk memeriksa hasil produksi:

```bash
npm run build
npm run preview
```

Build menjalankan TypeScript, Vite client/SSR, serta prerender untuk Beranda dan Galeri Proyek.

## Struktur Proyek

| Lokasi | Isi |
| --- | --- |
| `src/` | Komponen React, style, data layanan, dan motion |
| `public/` | Foto, ilustrasi, dan favicon |
| `scripts/` | Prerender, optimasi aset, dan pengujian |
| `docs/` | Dokumentasi desain, QA, dan deployment |
| `DESIGN.md` | Acuan visual dan sistem desain |
| `.github/workflows/` | Build validation di GitHub Actions |

Berkas dependency, cache, hasil build, dan screenshot QA berukuran besar tidak disimpan di Git.

## Dokumentasi

- [Panduan melanjutkan di PC lain](docs/SETUP-PC-LAIN.md)
- [Deployment Cloudflare Pages](docs/DEPLOYMENT.md)
- [Audit tampilan terbaru](docs/PJP-VISUAL-QA-20261113.md)
- [Sistem motion](docs/PJP-MOTION-20261111.md)
- [Sistem desain](DESIGN.md)

Dokumen bertanggal sebelumnya tetap disimpan sebagai riwayat pekerjaan, bukan acuan identitas brand terkini.

## Status dan Batasan

Nomor WhatsApp bisnis resmi sudah dikonfirmasi dan terhubung ke alur konsultasi lokal. Detail perusahaan lainnya masih dalam tahap finalisasi. Metadata `robots` tetap diatur `noindex,nofollow` untuk sementara; perubahan lokal ini belum memperbarui website production.

**Cloudflare Pages menggunakan Direct Upload.** Push ke GitHub hanya menyinkronkan source; untuk memperbarui website publik, jalankan build dan deployment secara terpisah sesuai panduan.
