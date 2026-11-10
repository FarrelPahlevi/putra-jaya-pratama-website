# PJP — Halaman Galeri Proyek Terpisah

Tanggal implementasi: 10 November 2026
Basis: PJP Minimal Industrial + Barlow
Halaman: `/galeri-proyek`
Status: Diimplementasikan, diuji pada preview lokal; deployment tercatat secara terpisah.

## Keputusan produk
- Galeri lengkap dipindahkan dari homepage ke halaman terpisah.
- Homepage kini hanya memiliki tautan editorial menuju Galeri Proyek.
- Menu utama dan footer mengarah ke `/galeri-proyek`.
- Navigasi dari halaman galeri kembali ke section homepage menggunakan `/#layanan`, `/#tentang`, dan `/#kontak`.
- Browser refresh pada `/galeri-proyek` harus tetap menampilkan halaman yang benar.

## Desain
- Hero galeri pendek dengan foto jalan sebagai latar gelap, headline editorial, dan breadcrumb.
- Filter yang tampil hanya untuk kategori dengan dokumentasi nyata. Saat ini hanya `Semua Foto` dan `Asphalt Hotmix`.
- Struktur data mendukung 6 jenis layanan PJP: Asphalt Hotmix, Paving Block, Cut and Fill, Cor Beton, Saluran U-Ditch, Resapan Air.
- Grid dokumentasi desktop 3 kolom dengan foto unggulan 2 kolom; tablet 2 kolom; mobile 1 kolom.
- Lightbox menggunakan native dialog, mendukung tombol prev/next, ArrowLeft/ArrowRight, swipe dan Escape, serta mengembalikan fokus ke kartu pembuka.
- CTA konsultasi di penutup galeri masih memakai formulir ringkasan yang sama seperti di Beranda.
- Tipografi dan palet PJP dipertahankan: Barlow Semi Condensed, Barlow, Pumpkin orange, charcoal, off-white.

## Foto yang tersedia
1. `asphalt-road-preview.webp` (Asphalt Hotmix)
2. `asphalt-access-preview.webp` (Asphalt Hotmix)
3. `road-roller-preview.webp` (Asphalt Hotmix)
4. `tree-lined-road-preview.webp` (Asphalt Hotmix)

Pemilik PJP sebelumnya telah menyatakan foto-foto memiliki izin publikasi. Kategori lain belum memiliki dokumentasi yang dimasukkan ke situs, sehingga tidak ditampilkan sebagai filter aktif. Tidak ada tanggal/lokasi proyek atau testimoni yang diada-adakan.

## Cara menambahkan dokumentasi baru
Edit `src/data/projectGallery.ts`, tambahkan item `PROJECT_PHOTOS` dengan `id` unik, `serviceId` dari `SERVICES_LIST` pada `src/data/mockData.ts`, `title`, `image`, `alt`, dan `caption`.
Ketika foto untuk suatu kategori baru ditambahkan, filter kategori tersebut akan muncul otomatis.

## Source yang dibuat/diubah
- NEW `src/GalleryPage.tsx`
- NEW `src/project-gallery.css`
- NEW `src/data/projectGallery.ts`
- NEW `src/SiteHeader.tsx` (shared)
- NEW `src/SiteFooter.tsx` (shared)
- UPDATE `src/MinimalIndustrial.tsx` (galeri home menjadi teaser; shared header/footer)
- UPDATE `src/App.tsx` (route pathname `/galeri-proyek` tanpa dependency router baru)
- UPDATE `src/data/mockData.ts` (nav link galeri)
- Sistem style dan ilustrasi 3D layanan yang telah ada tetap dipertahankan.

## QA
- Build `tsc -b && vite build`: berhasil.
- Browser Chrome headless: 320, 360, 390, 414, 768, 1024, 1440 px.
- Tidak ada overflow horizontal, error JavaScript, broken anchor, atau foto hilang.
- Homepage: enam ilustrasi layanan tetap tampil, grid foto utama dihapus, teaser baru muncul.
- Navigasi ke galeri dan kembali ke halaman Layanan: berhasil.
- Refresh URL galeri langsung: berhasil.
- Filter tersedia: `Semua Foto`, `Asphalt Hotmix` (4 foto).
- Native lightbox: buka/tutup, ArrowRight, Escape, fokus kembali ke kartu, mobile menu Escape.
- Setelah deployment, URL publik dan refresh langsung harus diuji ulang untuk memastikan fallback SPA di hosting.

## Backup sebelum edit
`C:\Projects\PJP-Backups\PJP-before-gallery-page-20261110.zip`

## Catatan
- Proyek menggunakan Cloudflare Pages Direct Upload; push GitHub saja belum menjalankan deployment.
- Kontak WhatsApp resmi belum dikonfigurasi dan modal konsultasi tetap menghasilkan ringkasan yang dapat disalin.
- Layanan lain akan diaktifkan di galeri ketika dokumentasi asli telah tersedia.
