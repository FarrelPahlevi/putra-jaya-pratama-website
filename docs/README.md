# Dokumentasi Putra Jaya Pratama

Dokumen ini membantu menemukan panduan aktif tanpa mencampurkannya dengan catatan pekerjaan dari iterasi sebelumnya.

## Panduan Utama

| Dokumen | Kegunaan |
| --- | --- |
| [Sistem desain](../DESIGN.md) | Identitas visual, tipografi, palet, komponen, dan aturan tampilan |
| [Setup PC lain](SETUP-PC-LAIN.md) | Clone, install dependency, menjalankan Codex, dan tes lokal |
| [Deployment](DEPLOYMENT.md) | Build, Cloudflare Pages Direct Upload, serta rollback |
| [Audit visual terbaru](PJP-VISUAL-QA-20261113.md) | Pengujian animasi, font, clipping, dan responsivitas |
| [Sistem animasi](PJP-MOTION-20261111.md) | Prinsip motion, aksesibilitas, dan performa |
| [Audit UI/UX](UI-UX-AUDIT-20261111.md) | Perubahan desain dasar dan interaksi |
| [Copywriting](PJP-COPYWRITING-20261111.md) | Pedoman bahasa dan perubahan copy |

## Catatan Riwayat

Dokumen lain dengan tanggal di namanya merupakan rekam jejak pengerjaan fitur dan desain terdahulu. Isinya bukan pengganti source aktif atau panduan deployment terbaru.

Laporan pengujian dalam subfolder `visual-qa-20261113/`, `motion-20261111/`, dan `ui-ux-20261111/` berisi bukti dan hasil uji pada tanggal terkait. Jalankan pemeriksaan ulang setelah melakukan perubahan kode baru.

**Sumber utama:** `src/` untuk aplikasi, `public/` untuk aset, serta `scripts/` untuk tool build dan quality assurance.
