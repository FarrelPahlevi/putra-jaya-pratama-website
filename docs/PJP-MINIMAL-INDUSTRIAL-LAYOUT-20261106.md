# PJP Minimal Industrial — Redesign Layout Berbasis Referensi 99designs

Tanggal: 6 November 2026
Status: Implementasi lokal selesai, belum dideploy publik
Folder proyek utama: C:\Projects\PJP-Website
Preview browser: http://127.0.0.1:5173/

## Referensi visual
1. KR Designs, "Website design for PEIShip"
   https://99designs.com/profiles/kwikrelease/designs/1149098
   Inspirasi: hero foto industri full-width, tipografi kontras, section foto mosaik, ritme putih-gelap.
2. Sudip Dutta, "website for social precious metals refinery"
   https://99designs.com/profiles/sudipdutta/designs/1233964
   Inspirasi: hero perusahaan industri, layanan icon-grid yang mudah dipindai, section foto + copy dan ruang kosong lebih lapang.

Yang diadaptasi adalah struktur dan prinsip layout. Desain visual, kode dan konten tetap khusus PJP; tidak menyalin karya 99designs atau mengambil gambar dari portofolio mereka.

## Perubahan di halaman utama
- Hero full-bleed foto dokumentasi aspal, judul ringkas "Membangun jalan. Membuka akses."
- Navigasi transparan di atas hero, menjadi header gelap setelah scroll, mobile menu tetap berfungsi.
- Menghilangkan banner preview oranye dan service ticker.
- Enam layanan ditampilkan sebagai grid 3x2 yang tenang, bukan kartu ramai dengan efek dekoratif.
- Section editorial "Pendekatan kami" memakai foto road roller dan ringkasan penting.
- Empat tahap kerja tersusun dalam satu timeline grid yang bersih.
- Galeri dokumentasi empat foto menjadi mosaik responsif (1 foto besar, 2 foto kecil, 1 foto lebar).
- CTA penutup dan footer disederhanakan, tetap menggunakan pumpkin-orange sebagai aksen.
- Semua modal detail layanan dan konsultasi tetap digunakan dari komponen sebelumnya.
- Font Bricolage Grotesque dipertahankan, serif italic digunakan terbatas sebagai aksen editorial.
- Tidak menambahkan sertifikasi, testimoni, atau angka statistik yang tidak terverifikasi.

## File yang diubah atau ditambahkan
- src/App.tsx: menggunakan komposisi layout baru, tetap menghubungkan InfoModal & InquiryModal.
- src/MinimalIndustrial.tsx: layout utama baru.
- src/minimal-industrial.css: semua komponen, tokens, breakpoint, aksesibilitas dan fallback reduced-motion.
- File komponen lama masih ada sebagai referensi sehingga mudah dikembalikan.

## Backup sebelum perubahan
C:\Projects\PJP-Backups\PJP-Pumpkin-before-99designs-layout-20261106.zip
Terverifikasi: 41 entri termasuk source utama, asset foto, dan dokumen.

## Hasil tes
npm run build: BERHASIL (TypeScript + Vite)
Viewports diuji: 320, 360, 390, 414, 768, 1024, 1440 px
Semua tes: tidak ada overflow horizontal, error JavaScript, broken image, atau internal anchor tidak ditemukan.
Desktop: modal layanan dan modal konsultasi terbuka.
Mobile 390: menu dapat dibuka dan ditutup via Escape.
Struktur: 1 h1, 6 layanan, 4 langkah proses, 4 foto galeri.
Banner & ticker lama: tidak tampil.

## Screenshot
Tersedia di folder:
C:\Projects\PJP-Website\preview
Nama: pjp-minimal-{1440,390}-{hero,layanan,tentang,proses,proyek,kontak}.png

## Batasan yang perlu diketahui
- Perubahan belum dideploy ke Cloudflare. Website Glass di https://pjp-glass-preview.pages.dev tetap versi Glass.
- Metadata foto (lokasi/tanggal pekerjaan) belum ditambahkan karena informasinya belum tersedia.
- Tombol konsultasi masih membuka formulir pembuat ringkasan untuk disalin, bukan mengirim WhatsApp langsung; nomor resmi belum terpasang.
- Uji otomatis dengan Chrome sudah lulus. Pengujian Safari/Firefox dan Lighthouse penuh belum dilakukan.
