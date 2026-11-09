# PJP - Photography Preview Integration (2026-10-28)

Status: LOCAL PREVIEW ONLY. Belum disetujui untuk publikasi/deployment.

## Sumber
Folder foto pengaspalan yang dibagikan pengguna:
https://drive.google.com/drive/folders/14kTnYhFxqW2EmTsJ6o3zremG9hZOlSuc?usp=drive_link

## Foto yang sudah diproses menjadi WebP
| Web asset lokal | Nama asli dari Google Drive | Penggunaan |
| --- | --- | --- |
| public/assets/pjp-preview/asphalt-road-preview.webp | IMG-20261014-WA0248.jpg | Hero dan galeri |
| public/assets/pjp-preview/asphalt-access-preview.webp | IMG-20261012-WA0052.jpg | Galeri foto |
| public/assets/pjp-preview/road-roller-preview.webp | IMG-20261012-WA0035.jpg | Galeri pemadatan |
| public/assets/pjp-preview/tree-lined-road-preview.webp | IMG-20261012-WA0089.jpg | Kandidat cadangan, belum ditampilkan |

Semua original JPG dibiarkan tetap di Drive. Versi optimasi disimpan lokal. Watermark yang mungkin tertanam tidak dihapus. Foto bukan bukti otomatis bahwa proyek atau alat merupakan milik PJP.

## Perubahan kode
- src/components/Hero.tsx: gambar referensi asli + keterangan verifikasi.
- src/components/Gallery.tsx: tanda foto referensi vs ilustrasi demo, penghitung kartu otomatis, metadata nama file.
- src/data/mockData.ts: tiga foto pengaspalan berstatus review dan dua ilustrasi demo.
- src/types/index.ts: status/verifikasi dan nama sumber foto opsional.

## Wajib sebelum live
1. Konfirmasi proyek terkait benar-benar dikerjakan/diizinkan ditampilkan sebagai portofolio PJP.
2. Konfirmasi izin publikasi dan atribusi, terutama foto yang memuat watermark nama pihak lain, orang, dan lokasi.
3. Konfirmasi nama proyek, jenis pekerjaan, tanggal, dan lokasi berdasarkan dokumentasi asli.
4. Hapus label 'preview/review' hanya setelah hak publikasi dan metadata dinyatakan benar.
5. Uji ulang performa, SEO, mobile, dan aksesibilitas sebelum deploy.

## Recovery
Backup sebelum integrasi: C:\Projects\PJP-Backups\PJP-pre-photo-integration-20261028.zip
Jangan menghapus atau overwrite arsip backup ini.
