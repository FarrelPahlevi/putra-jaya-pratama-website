# PJP Website — Glassmorphism Concept / 02

Tanggal: 4 November 2026
Status: LOCAL PREVIEW ONLY · BELUM DITERBITKAN

## Folder yang dipertahankan secara terpisah
- Versi Pumpkin Industrial (asli): C:\Projects\PJP-Website
- Duplikat Glassmorphism: C:\Projects\PJP-Website-Glass
- Server preview duplikat: http://127.0.0.1:5174/

Duplikat adalah proyek React + TypeScript + Vite yang berdiri sendiri, termasuk node_modules dan dist-nya sendiri. Tidak ada file source di folder asli yang sengaja diubah dalam pembuatan duplikat.

## Referensi konsep
- https://worklouder.cc/ — floating navigation, kontras editorial, lapisan interaktif, karakter tipografi
- https://backgrounds.supply/ — suasana mesh/gradient berlapis dan light study
- Prinsip Antislop — hirarki visual jelas, tanpa filler/statistik palsu, batasan pemakaian blur agar tetap terbaca, reduced-motion

Inspirasi visual saja: tidak ada aset premium, desain proprietary, atau source code dari kedua website referensi yang diunduh dan disalin ke proyek.

## Arah glassmorphism
- Base: warm obsidian, deep clay, pumpkin/amber glow, warm ivory
- Frosted glass dengan backdrop-filter 18–27px, border terang, inner highlight, shadow lembut
- Background CSS orisinal (radial gradient, grid halus, ambient orb, animasi keyframes)
- Floating navigation desktop dan expandable menu mobile
- Hero foto pengaspalan asli sebagai gambar referensi
- Layanan: grid asimetris 5/4/3 + 3/4/5 desktop, adaptif 2 kolom dan 1 kolom
- Proses: empat panel gelap kaca
- Pendekatan kerja: foto roller + glass overlay
- Galeri: kartu kaca gelap dan filter aktif
- CTA: kaca terang pada gradient tanah-labu dengan elemen orbit

## File yang ditambah atau diganti di dalam duplikat
- src/GlassExperience.tsx (semua section baru)
- src/glass.css (visual design system glass)
- src/App.tsx (router ke GlassExperience, modal reusable dipertahankan)
- index.html (judul preview)
- package.json dan package-lock.json (nama proyek dibedakan dari versi asli)

Komponen lama tetap disalin di src/components agar bisa ditinjau/diadaptasi jika diperlukan. InfoModal dan InquiryModal tetap aktif, dengan pengiriman hanya berupa ringkasan teks; bukan integrasi WhatsApp.

## Asal materi foto
Gambar referensi di public/assets/pjp-preview berasal dari folder foto yang diberikan pemilik proyek. Foto masih perlu verifikasi kepemilikan pekerjaan, izin publikasi, dan atribusi. Tidak ada klaim klien, tanggal proyek, sertifikasi, testimoni, atau nomor WhatsApp palsu yang ditambahkan.

## Kriteria kesiapan preview
- TypeScript + Vite build harus berhasil
- 7 viewport: 320, 360, 390, 414, 768, 1024, 1440 px
- Tidak ada overflow horizontal
- Tidak ada gambar rusak, anchor internal rusak, atau error JavaScript
- Menu mobile membuka dan menutup dengan Escape
- Filter galeri bekerja
- InfoModal dan InquiryModal bisa dibuka
- prefers-reduced-motion tersedia
- Styling glass (backdrop-filter) dengan fallback untuk browser tanpa dukungan

## Menjalankan lokal
Buka PowerShell:

cd "C:\Projects\PJP-Website-Glass"
npm.cmd run dev -- --host 127.0.0.1 --port 5174 --strictPort

Buka browser: http://127.0.0.1:5174/

Versi Pumpkin lama tetap di C:\Projects\PJP-Website. Port 5174 dibuat berbeda agar tidak bentrok dengan preview lama (biasanya 5173).

## Screenshot
Setelah pengujian, screenshot disalin ke folder preview/:
- Glass-Desktop-Hero.png
- Glass-Mobile-Hero.png
- Glass-Desktop-Services.png
- Glass-Mobile-Services.png
- Glass-Desktop-Gallery.png
- Glass-Mobile-CTA.png

## Sebelum rilis
1. Pastikan izin penggunaan foto dan atribusi pihak terkait.
2. Lengkapi kontak WhatsApp, area layanan, alamat, dan legalitas yang terverifikasi.
3. Review dengan pengguna; ini alternatif konsep, bukan pengganti otomatis versi Pumpkin.
4. Lakukan Lighthouse, uji perangkat nyata, dan pengujian lebih dalam sebelum publikasi.


## Update 4 November 2026 — Persetujuan publikasi foto

Pemilik PJP menyatakan bahwa seluruh foto proyek pada folder referensi aman digunakan dan telah memiliki izin publikasi. Empat foto WebP ditampilkan pada versi Glass yang di-host di Cloudflare Pages. Ketentuan verifikasi izin dalam bagian historis dokumen ini adalah catatan kondisi sebelumnya. Metadata pekerjaan (lokasi/waktu) masih perlu dilengkapi jika hendak dicantumkan.
