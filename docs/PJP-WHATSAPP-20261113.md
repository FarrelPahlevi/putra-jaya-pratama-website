# PJP: integrasi konsultasi WhatsApp

Implementasi source lokal selesai pada 13 November 2026. Nomor resmi dari pengguna: **+62 813-1388-4080**, format URL **6281313884080**. Tidak ada deployment, Git push, perubahan konfigurasi production, backend atau dependency baru.

## Alur konsultasi

1. CTA Beranda, Galeri Proyek, menu mobile dan footer membuka modal yang sama. Judul keenam layanan kini menjadi tautan konsultasi yang memilih layanan terkait sebelum form ditampilkan. Tanpa JavaScript, tautan layanan tetap menuju section kontak.
2. Pengunjung mengisi nama/penanggung jawab dan lokasi. Jenis pekerjaan wajib memiliki pilihan valid, tetapi **Belum yakin / perlu konsultasi** tetap diterima. Pilihan layanan lama dipertahankan: Pengaspalan hotmix, Paving block, Cut and fill, Cor beton, Saluran U-Ditch dan Resapan air.
3. Luas/ukuran, rencana waktu dan keterangan tambahan bersifat opsional. Keterangan tidak lagi harus 12 karakter karena brief baru secara eksplisit menjadikannya opsional. Batas panjang nama/lokasi/keterangan lama dipertahankan; tidak meminta email atau nomor telepon pelanggan.
4. **Kirim via WhatsApp** memvalidasi input dan menyiapkan pesan, lalu menjalankan `window.open` secara sinkron dalam gesture submit, memakai `_blank` dan `noopener,noreferrer`.
5. Pengunjung memeriksa dan mengirim pesan dari WhatsApp. Website hanya menyiapkan handoff; tidak mengklaim pesan terkirim atau diterima.
6. Ringkasan tetap tersedia di modal, bersama tautan native **Buka WhatsApp** dan aksi **Salin Ringkasan**. Jika clipboard ditolak, ringkasan dipilih untuk disalin manual. Data yang telah diketik tetap ada saat modal ditutup/dibuka kembali.

Nomor tampil sebagai tautan WhatsApp di section Kontak dan footer kedua halaman. Tidak ada floating button. Semua nilai kontak berasal dari `src/config/contact.ts`; komponen tidak menyimpan nomor sendiri. No-JS fallback juga memakai konfigurasi yang diekspor melalui entry SSR.

Format memakai [Click-to-Chat resmi WhatsApp](https://faq.whatsapp.com/5913398998672934): nomor internasional tanpa `+`, spasi atau tanda hubung, dengan pesan di-encode memakai `encodeURIComponent()` satu kali.

## Pesan dan URL yang diuji

Contoh data uji dengan field opsional kosong:

```text
Konsultasi Proyek - Putra Jaya Pratama

Halo, saya ingin konsultasi mengenai pekerjaan konstruksi.

Nama: Tim proyek PJP
Jenis pekerjaan: Belum yakin / perlu konsultasi
Lokasi pekerjaan: Bekasi

Mohon informasi lebih lanjut mengenai pekerjaan tersebut. Terima kasih.
```

Jika terisi, baris `Perkiraan luas`, `Rencana pengerjaan` dan `Keterangan` ditambahkan. Field kosong dihilangkan, bukan diganti `(belum diisi)`. CRLF dinormalisasi, line breaks keterangan dipertahankan, whitespace berlebih/control characters dibersihkan, Unicode dinormalisasi, panjang dibatasi dan surrogate UTF-16 yang rusak diperbaiki sebelum encoding. Karakter seperti `&`, `+`, `#`, `%`, kutip, `>`, `m²`, `×` dan teks mirip HTML tetap literal dan tidak dijalankan.

Contoh URL pendek yang benar-benar diuji oleh unit test:

```text
https://wa.me/6281313884080?text=Halo%20PJP
```

Contoh URL lengkap form yang diuji:

```text
https://wa.me/6281313884080?text=Konsultasi%20Proyek%20-%20Putra%20Jaya%20Pratama%0A%0AHalo%2C%20saya%20ingin%20konsultasi%20mengenai%20pekerjaan%20konstruksi.%0A%0ANama%3A%20Tim%20proyek%20PJP%0AJenis%20pekerjaan%3A%20Belum%20yakin%20%2F%20perlu%20konsultasi%0ALokasi%20pekerjaan%3A%20Bekasi%0A%0AMohon%20informasi%20lebih%20lanjut%20mengenai%20pekerjaan%20tersebut.%20Terima%20kasih.
```

Sebanyak 90 pesan/URL utama diperiksa, termasuk semua enam layanan pada setiap lebar. URL dan decoded message lengkap ada di `whatsapp-20261113/whatsapp/report.json`. Seluruh `window.open` dimock. Satu navigasi native fallback dipenuhi oleh respons lokal melalui route interception; tidak ada request WhatsApp sungguhan atau pengiriman pesan.

## Perbaikan UX yang diverifikasi

- Prefill layanan dan reset state sementara dilakukan sebelum paint agar layanan lama/loading lama tidak muncul saat membuka konteks baru.
- Validasi menampilkan error spesifik yang terhubung dengan field. Fokus menuju input invalid pertama; wrapper label/input/error digulir di dalam dialog dengan inset 24px, sehingga label dan focus ring tetap terlihat.
- Baris grid memakai alignment awal agar error di kolom nama tidak menggeser input layanan 76px ke bawah.
- Urutan aksi mobile sama dengan urutan DOM/keyboard: WhatsApp, salin, batal.
- Setelah alur menu mobile menutup navigasi dan membuka form, Escape mengembalikan fokus ke tombol menu yang masih terlihat; fokus tidak jatuh ke `body`.
- Operasi clipboard memakai request identity. Menutup/membuka form atau mengedit input membatalkan ownership UI operasi lama. Penyelesaian request lama tidak dapat mengganti status atau mengaktifkan tombol saat request baru masih berjalan.
- Scroll padding dialog memberi ruang pada aksi fallback di bagian bawah. Semua field tetap 16px dan target aksi minimal 44px, umumnya 48px.

Review visual independen menemukan clipped-label saat invalid; review mekanis independen menemukan edge case clipboard yang belum selesai. Keduanya diperbaiki dan ditutup dengan regresi baru. Tidak ada masalah P0/P1 atau P2 integrasi yang masih diketahui pada matriks uji.

## Hasil browser dan build

| Kelompok | Viewport CSS | Beranda | Galeri Proyek | Form/URL/clipboard/layanan |
| --- | --- | --- | --- | --- |
| Small mobile | 320×740 | Lulus | Lulus | Lulus |
| Mobile | 360×800 | Lulus | Lulus | Lulus |
| Mobile | 390×844 | Lulus | Lulus | Lulus |
| Mobile | 430×932 | Lulus | Lulus | Lulus |
| Tablet | 768×1024 | Lulus | Lulus | Lulus |
| Tablet | 1024×768 | Lulus | Lulus | Lulus |
| Desktop | 1280×800 | Lulus | Lulus | Lulus |
| Desktop | 1440×900 | Lulus | Lulus | Lulus |
| Desktop | 1920×1080 | Lulus | Lulus | Lulus |

| Pemeriksaan baru | Hasil | Bukti |
| --- | --- | --- |
| Unit pesan/nomor/encoding/sanitasi | 5/5 | `node scripts/inquiry-message.test.mjs` |
| WhatsApp/CTA/field/error/clipboard/axe/focus/popup | 156/156 | `whatsapp-20261113/whatsapp/report.json` |
| Async copy/keyboard/popup terisolasi | 3/3 | `whatsapp-20261113/whatsapp-lifecycle/report.json` |
| Layout halaman, gambar, target sentuh dan axe | 18/18 | `whatsapp-20261113/after/report.json` |
| Interaksi/navigasi/form/filter/lightbox | 37/37 | `whatsapp-20261113/after/interactions.json` |
| Typography/raster glyph | 521/521, 405 perbandingan | `whatsapp-20261113/typography-after/report.json` |
| Motion/reverse/refresh/reduced-motion/no-JS | 121/121 | `whatsapp-20261113/motion/report.json` |
| Motion lifecycle/observer cleanup | 9/9 | `whatsapp-20261113/motion/lifecycle-performance.json` |
| Landscape, short viewport, zoom dan font failure | 13/13 | `whatsapp-20261113/edges/report.json` |
| Detector source terarah | 0 temuan | `whatsapp-20261113/independent-mechanical/detector.json` |
| TypeScript dan production build | Exit 0 | `npm.cmd run build`: client, SSR dan prerender kedua route |

Tidak ditemukan horizontal overflow, gambar rusak, pelanggaran axe, console error atau regresi galeri/navigasi dalam pemeriksaan akhir. Kasus tambahan mencakup 844×390 landscape, desktop pendek, emulasi reflow 200%, visual zoom 200%, font eksternal gagal, import motion gagal dan JavaScript dinonaktifkan. Tidak ada script lint pada package; tidak ada klaim lint lulus.

Browser: desktop Chrome melalui Playwright dengan viewport/touch emulation. Interaksi WhatsApp eksternal, delivery/read receipt, WhatsApp Web/app nyata, perangkat fisik iOS/Android, Safari dan Firefox tidak diuji. URL yang benar tidak dijadikan bukti pesan diterima.

Build akhir: main JS sekitar 268,31kB/81,97kB gzip, CSS 83,35kB/17,14kB gzip. Deferred motion chunk tetap sama. Konfigurasi/dependency/build command tidak diubah.

## File yang diubah/ditambahkan

| File | Status | Perubahan |
| --- | --- | --- |
| `src/config/contact.ts` | Baru | Nomor/display resmi dan URL builder terpusat |
| `src/utils/inquiry.ts` | Baru | Normalisasi, batas panjang, validasi dan format pesan |
| `src/components/InquiryModal.tsx` | Diubah | Enam field, WhatsApp submit, clipboard/fallback, focus dan async ownership |
| `src/inquiry-modal.css` | Diubah | Alignment error, urutan aksi mobile dan scroll padding |
| `src/MinimalIndustrial.tsx` | Diubah | CTA kontekstual keenam layanan dan kontak resmi |
| `src/minimal-industrial.css` | Diubah | Style tautan layanan/kontak mengikuti sistem yang ada |
| `src/SiteFooter.tsx` | Diubah | Nomor resmi menggantikan pemberitahuan kontak belum tersedia |
| `src/entry-server.tsx` | Diubah | Ekspor konfigurasi untuk fallback prerender |
| `scripts/prerender.mjs` | Diubah | No-JS contact memakai config yang sama; hapus teks nomor belum tersedia |
| `scripts/inquiry-message.test.mjs` | Baru | Unit test tanpa dependency tambahan, Node.js 24 |
| `scripts/whatsapp-audit.mjs` | Baru | Browser/axe dengan mock/intercept wa.me dan regresi async |
| `scripts/ui-interactions.mjs` | Diubah | Kontrak form baru; lewati URL eksternal pada pengujian navigasi internal |
| `scripts/typography-motion-audit.mjs` | Diubah | Nama aksi utama baru; validasi kosong tidak melakukan handoff |
| `scripts/visual-edge-audit.mjs` | Diubah | Field baru dan jalur salin untuk mencegah navigasi eksternal saat regresi |
| `README.md` | Diubah | Dokumentasi fitur WhatsApp dan status lokal yang benar |

Dokumentasi baru: laporan ini dan `docs/whatsapp-20261113/` berisi plan, hasil, screenshot dan assessment independen. Cache `.impeccable/hook.cache.json` diperbarui otomatis oleh tooling. Folder `dist/`/`dist-ssr/` adalah hasil build lokal.

SHA-256: seluruh 28 file public, App, GalleryPage, header, data bisnis/portofolio, seluruh source motion, global/gallery CSS, package/lockfile, index.html dan vite.config.ts tetap sama dengan backup. Tidak mengedit komponen arsip yang tidak dipakai. Bukti: `whatsapp-20261113/source-verification.json`.

## Screenshot hasil

- [Form mobile 390px](whatsapp-20261113/whatsapp/home-390-initial.png)
- [Field opsional mobile](whatsapp-20261113/whatsapp/home-390-fields.png)
- [Pesan siap dibuka, desktop](whatsapp-20261113/whatsapp/home-1440-ready.png)
- [Loading copy](whatsapp-20261113/whatsapp/pending-copy-390.png)
- Screenshot semua sembilan lebar dan kedua route tersedia dalam subfolder `whatsapp/`; `after/`, `motion/` dan `typography-after/` menyimpan regresi halaman.

## Skill

**UI UX Pro Max**: grouping field, error spesifik/associated label, fokus, touch target dan responsivitas. **Taste Skill**: keselarasan Minimal Industrial dan motion lama. **Impeccable**: adapt/harden/polish dan critique dua assessment independen. **Antislop core/copywriting, DURING**: bahasa langsung, CTA sesuai tindakan, informasi kontak dari pengguna dan feedback yang tidak mengklaim pesan terkirim. Instruksi generik skill yang bertentangan dengan nomor nyata yang dikonfirmasi atau preservation brief tidak diterapkan.

Assessment A selesai sebelum Assessment B dibaca. Temuan A dan B ditutup dengan source fix dan uji baru. Detector overlay hanya berjalan pada headless browser, tidak diklaim tampil di tab pengguna. Peringatan pola latar menyangkut pilihan desain lama, bukan defect integrasi; temporary server detector dihentikan. Questions skipped: dua temuan prioritas telah diperbaiki dalam scope implementasi yang sudah diminta.

## Backup dan rollback

Backup **`C:\Projects\PJP-Website-backups\whatsapp-20261113-101136`** dibuat sebelum modifikasi; 91 file diperiksa identik dengan SHA-256. Dependencies, generated build, Git metadata, skills dan capture QA lama dikecualikan.

Untuk mengembalikan source sebelumnya, hentikan preview lalu jalankan PowerShell dari proyek. Perintah hanya memulihkan sebelas file yang sudah ada. Empat file baru tidak diimpor oleh aplikasi lama setelah rollback dan boleh tetap disimpan untuk review; hapus empat file berstatus Baru di tabel bila menginginkan source persis sebelum integrasi.

```powershell
$pjpRestoreRoot = 'C:\Projects\PJP-Website'
$pjpWhatsAppBackup = 'C:\Projects\PJP-Website-backups\whatsapp-20261113-101136'
$pjpRestoreFiles = @(
  'README.md', 'src\components\InquiryModal.tsx', 'src\inquiry-modal.css',
  'src\MinimalIndustrial.tsx', 'src\minimal-industrial.css', 'src\SiteFooter.tsx',
  'src\entry-server.tsx', 'scripts\prerender.mjs', 'scripts\ui-interactions.mjs',
  'scripts\typography-motion-audit.mjs', 'scripts\visual-edge-audit.mjs'
)
foreach ($pjpRestoreFile in $pjpRestoreFiles) {
  Copy-Item -LiteralPath (Join-Path $pjpWhatsAppBackup $pjpRestoreFile) -Destination (Join-Path $pjpRestoreRoot $pjpRestoreFile) -Force
}
Set-Location -LiteralPath $pjpRestoreRoot
npm.cmd run build
```

## Status akhir

Tidak ada masalah kritis/signifikan integrasi yang masih diketahui pada matriks uji. Pesan tidak dikirim otomatis. Website production tetap tidak disentuh; fitur baru baru tersedia pada source dan preview lokal **http://127.0.0.1:4173** sampai pengguna memerintahkan deployment.
