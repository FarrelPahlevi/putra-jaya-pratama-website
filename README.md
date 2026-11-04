# Putra Jaya Pratama · Atmospheric Glass

Website company profile PJP berbasis React, TypeScript, dan Vite. Proyek ini terpisah dari versi Pumpkin Industrial.

Live preview: https://pjp-glass-preview.pages.dev/
Repository: https://github.com/FarrelPahlevi/pjp-website-glass (private)

## Menjalankan di komputer

Jalankan di PowerShell dari folder proyek:
    npm ci
    npm.cmd run dev

## Hosting preview saat ini

Situs menggunakan Cloudflare Pages Direct Upload karena Cloudflare Git integration mengembalikan error 8000011.
Artinya push ke GitHub belum otomatis memperbarui website.

Untuk memperbarui link online dari komputer yang sudah login Cloudflare melalui Wrangler, buka folder proyek dan jalankan:
    powershell -ExecutionPolicy Bypass -File .\scripts\deploy-preview.ps1

Script tersebut membangun aplikasi, memastikan folder foto referensi tidak masuk dist, lalu mengunggah hasilnya ke project Pages pjp-glass-preview.

Di GitHub, source code disimpan pada repository private. Perubahan sebaiknya dilakukan di branch terpisah dan digabung lewat Pull Request.

## Otomatisasi deployment di masa mendatang

Direct Upload tetap bisa memakai GitHub Actions + Wrangler, tetapi memerlukan API token Cloudflare khusus berizin Account → Cloudflare Pages → Edit.
Simpan token sebagai GitHub Actions secret; jangan commit token ke repository.

Sampai token dan workflow deployment disiapkan, gunakan perintah manual di atas. Direct Upload project ini tidak bisa dikonversi langsung menjadi proyek integrasi Git bawaan Cloudflare.

## Privasi materi

- Foto di public/assets/pjp-preview tidak diikutkan dalam Git dan tidak dimuat dalam hasil build publik.
- Hasil build publik memakai SVG ilustrasi demo, bukan portofolio resmi PJP.
- Screenshot lokal di preview/ tidak diunggah ke repository.
- Izin, detail proyek, nomor kontak dan informasi legal harus dikonfirmasi sebelum website resmi dirilis.

Detail konsep desain tersedia di docs/GLASS-DESIGN-README.md.
