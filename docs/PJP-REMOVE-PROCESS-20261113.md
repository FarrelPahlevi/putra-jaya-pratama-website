# PJP — Penghapusan Section Proses Kerja

**Tanggal:** 13 November 2026
**Status:** implementasi source lokal, belum commit/push/deployment.

## Alasan dan lingkup

Section **03 / PROSES KERJA** yang menampilkan judul “Empat tahap pengerjaan proyek”, paragraf penjelas, serta empat kartu tahapan dihapus dari **Beranda aktif** atas permintaan pemilik website. Perubahan tidak mengganti section tersebut dengan konten tambahan.

Urutan Beranda sekarang:

1. Beranda / Hero
2. 01 / Layanan
3. 02 / Pendekatan Kami
4. 03 / Dokumentasi Proyek
5. 04 / Konsultasi

Bagian `#tentang` kini langsung disambung oleh `#proyek` tanpa elemen atau ruang kosong bekas proses. Header, Galeri Proyek, detail layanan, form konsultasi, WhatsApp, dan animasi utama dipertahankan.

## Perubahan source

- `src/MinimalIndustrial.tsx`: menghapus section aktif `#proses`, import `PROCESS_STEPS` yang tak lagi diperlukan, dan mengurutkan ulang nomor 03/04.
- `src/minimal-industrial.css`: menghapus 16 baris CSS desktop/tablet/mobile khusus `.minimal-process`.
- `scripts/motion-audit.mjs`: mengalihkan screenshot/target pemeriksaan scroll ke `#proyek`.
- `scripts/visual-edge-audit.mjs`: mengalihkan pemeriksaan deep link dari `/#proses` ke `/#proyek`.
- `src/components/Footer.tsx`: memperbaiki tautan lama yang tidak aktif `#proses` menjadi `#proyek`, berikut label “Dokumentasi Proyek”.

**Komponen arsip:** `src/components/Process.tsx` dan data `PROCESS_STEPS` masih tersimpan sebagai source lama yang tidak dirender oleh app saat ini. Keduanya sengaja tidak dihapus agar komponen lain yang belum digunakan tidak rusak.

## Verifikasi

- Build `npm.cmd run build`: sukses; TypeScript, Vite client, Vite SSR, prerender Beranda dan Galeri.
- Chrome Playwright, 5 lebar × 2 halaman: **10/10 PASS** pada 320, 390, 768, 1440, 1920px. Beranda berisi urutan id section tepat `beranda → layanan → tentang → proyek → kontak`; `#proses` tidak ada pada halaman aktif.
- Pada kelima lebar, tepi bawah `#tentang` bertemu langsung dengan tepi atas `#proyek` (tanpa gap).
- Tidak ditemukan horizontal overflow atau page JavaScript errors di matriks itu. Floating WhatsApp masih terlihat dan form konsultasi berfungsi.
- Audit interaksi lengkap: **37/37 PASS** (termasuk navigasi internal, keyboard/modal, gallery lightbox, WhatsApp form, clipboard).
- Audit edge/responsif: **13/13 PASS**, termasuk deep link `/#proyek`, font gagal, zoom 200%, lanskap, dan viewport pendek.
- Full motion audit ulang: **121/121 PASS** pada semua ukuran, termasuk reduced-motion, parallax, refresh, keyboard, touch, dan kondisi tanpa JavaScript. Bukti: `docs/remove-process-20261113/motion-retry/motion/report.json`.

Pengujian motion pertama terputus pada bagian akhir ketika proses preview lama berhenti dan browser menerima `ERR_CONNECTION_REFUSED`. Hal itu bukan kegagalan animasi, dan preview server sudah dijalankan ulang untuk regresi berikutnya.

## Evidence

- `docs/remove-process-20261113/qa-summary.json`
- `docs/remove-process-20261113/home-320.png`
- `docs/remove-process-20261113/home-390.png`
- `docs/remove-process-20261113/home-768.png`
- `docs/remove-process-20261113/home-1440.png`
- `docs/remove-process-20261113/home-1920.png`
- `docs/remove-process-20261113/interaction-test/after/interactions.json`
- `docs/remove-process-20261113/edge-test/edges/report.json`

## Backup dan rollback

Semua lima file yang diedit dibackup sebelum modifikasi dan divalidasi hash SHA-256 identik:

`C:\Projects\PJP-Website-backups\remove-process-section-20261113`

Rollback (PowerShell):

```powershell
$root = 'C:\Projects\PJP-Website'
$backup = 'C:\Projects\PJP-Website-backups\remove-process-section-20261113'
$files = @(
  'src\MinimalIndustrial.tsx',
  'src\minimal-industrial.css',
  'scripts\motion-audit.mjs',
  'scripts\visual-edge-audit.mjs',
  'src\components\Footer.tsx'
)
foreach ($file in $files) {
  Copy-Item -LiteralPath (Join-Path $backup $file) -Destination (Join-Path $root $file) -Force
}
Set-Location $root
npm.cmd run build
```

**Deployment:** perubahan ini hanya ada di `C:\Projects\PJP-Website`. Repository `C:\Projects\PJP-Repository` dan situs Cloudflare Pages tidak disentuh.
