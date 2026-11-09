# PJP — Redesign section Layanan

Tanggal: 9 November 2026 (Asia/Jakarta)

## Hasil

Section Layanan memakai enam ilustrasi isometrik custom, nama layanan di bawah ilustrasi, dan grid tanpa bingkai. Pumpkin orange, abu-abu, dan putih mengikuti identitas PJP. Background paper, Bricolage Grotesque, dan heading section tetap dipertahankan.

Kartu lama, nomor kartu, ikon kecil, deskripsi setiap layanan, tombol Detail layanan, serta CTA pemicu modal di bagian bawah section telah dilepas. InfoModal tidak lagi diimpor atau dipasang oleh App; file komponen dan data detail tetap tersedia untuk penggunaan kembali. Form konsultasi pada hero, menu mobile, galeri, dan section lainnya tetap terhubung.

## File

- `src/MinimalIndustrial.tsx`: grid ilustrasi, alt text, responsive sources, tanpa event modal layanan.
- `src/minimal-industrial.css`: layout dan breakpoint khusus Layanan.
- `src/App.tsx`: melepas state dan rendering modal detail layanan.
- `src/data/serviceIllustrations.ts`: pemetaan enam ilustrasi.
- `public/assets/services/`: 12 WebP (enam ilustrasi × dua resolusi).
- `docs/PJP-SERVICE-ILLUSTRATIONS-20261109.md`: prompt dan proses optimasi.
- `.github/workflows/build-check.yml`: memeriksa tersedianya seluruh varian ilustrasi setelah build.

## Responsif

| Lebar viewport | Kolom |
| --- | --- |
| < 520 px | 1 |
| 520–1099 px | 2 |
| ≥ 1100 px | 3 |

Ilustrasi maksimal 340 px pada tablet/desktop dan 304 px pada ponsel sempit. Kanvas intrinsik 800×640 dan 400×320 menjaga ruang gambar sebelum unduhan selesai.

## Validasi

- `npm run build` (TypeScript + Vite) berhasil di source utama.
- Chrome: development dan production preview diuji pada 320, 360, 390, 430, 519, 520, 650, 768, 950, 1024, 1099, 1100, 1280, 1440, dan 1920 px.
- Enam layanan selalu tampil; jumlah kolom sesuai breakpoint.
- Tidak ada overflow horizontal, gambar rusak, respons asset 4xx/5xx, JavaScript error, atau anchor internal putus.
- Klik layanan tidak membuka dialog; tidak ada link/button/tab stop di grid Layanan.
- Menu mobile: buka, Escape, tutup, dan navigasi lolos.
- Modal konsultasi hero tetap membuka dan menutup normal.
- DOM header, hero, Tentang, Proses, Galeri, Kontak, dan footer identik dengan baseline sebelum perubahan.
- Screenshot hero desktop sebelum/sesudah memiliki SHA-256 sama: `98464a582aa3cc8d929559f3c832a88afa67bb9ddddcf310f78809cd0d0bade9`.
- Seluruh 12 asset hasil transfer terverifikasi SHA-256.
- WebP standar total 118,822 bytes; versi resolusi tinggi total 304,674 bytes, dipilih browser melalui srcset.
- Pemilihan srcset terverifikasi: desktop DPR 1 mengambil varian 400px; mobile touch DPR 3 mengambil varian 800px. Navigasi Layanan menjaga judul tetap di bawah header.
- Pengujian ini menggunakan Chrome. Safari dan Firefox belum diuji.

## Backup dan rollback

Backup sebelum edit:
`C:\Projects\PJP-Backups\PJP-before-isometric-services-20261109-094657.zip`

Snapshot mencakup source, public assets, konfigurasi build, dependencies manifest, dan docs. File utama dalam ZIP terverifikasi. Baseline Git sebelum perubahan: `661880e`.

Folder source utama: `C:\Projects\PJP-Website`.
Checkout GitHub: `C:\Projects\PJP-GitHub-Minimal-20261109`.
Repository: https://github.com/FarrelPahlevi/pjp-website-glass
Production preview lokal: http://127.0.0.1:4173/#layanan

Untuk rollback source lokal, pulihkan tiga file source lama dari ZIP dan hapus `src/data/serviceIllustrations.ts` serta `public/assets/services/`, kemudian build ulang. Untuk rollback Git, revert commit redesign agar riwayat tetap terjaga.

QA sementara (script, JSON hasil, screenshot) tersimpan di `C:\Projects\PJP-Backups\pjp-qa-tools\services-20261109`.
