# PJP: audit motion, typography dan responsive

Audit baru dijalankan pada 13 November 2026 terhadap `/` dan `/galeri-proyek`. Seluruh bukti penerimaan berasal dari pengujian hari ini, bukan laporan 11 November. Implementasi tetap lokal; tidak ada push, deployment Cloudflare Pages, perubahan konfigurasi production, dependency baru, penggantian aset atau perubahan copy bisnis.

## Temuan dan perbaikan

| ID | Prioritas | Temuan terverifikasi dan penyebab | Perbaikan |
| --- | --- | --- | --- |
| T1 | P1 | Mask awal hero `inset(0 0 14% 0)` dan mask heading 6–10% memotong descender Barlow ketika entrance berjalan. Screenshot beku memperlihatkan bagian bawah huruf “g” hilang. | Hapus `clipPath` dari animasi teks di `src/motion/siteMotion.ts`. Transform, opacity, timing, easing dan stagger tetap dipakai; mask foto tetap dipertahankan. |
| T2 | P1 | Nilai akhir mask `inset(0)` ditulis Motion sebagai inline style. Ink Barlow melewati line box yang rapat, sehingga beberapa glyph tetap terpotong sesudah animasi selesai, termasuk pada mobile yang memakai inset 0 sejak awal. Pemeriksaan lebar/visibility sebelumnya tidak menangkapnya. | Teks tidak lagi menggunakan clipping, termasuk endpoint yang sudah dikomit. Tidak menambah padding/line-height massal atau mengganti font. |
| T3 | P2 | Select native form 320px memotong akhir “Belum yakin / perlu konsultasi”. Lebar client 239px dikurangi padding 28px dan ruang panah native tidak mencukupi untuk teks Barlow 16px selebar sekitar 205,46px. | Pada viewport ≤360px, padding horizontal select menjadi 6px. Ukuran font tetap 16px, control native dan opsi/fungsi tetap sama. |
| T4 | P2 | Ukuran foto sticky bergantung pada atribut yang baru ditambahkan setelah modul motion dimuat. Uji pemuatan tertunda mencatat tinggi section story berubah dari 734→764px pada 1440×900 dan 765→800px pada 1920×1080. | Selector sticky memakai media query CSS langsung sehingga geometri sudah tersedia sebelum import motion. Batas desktop/tinggi viewport, reduced motion dan sticky di dalam section tetap dipertahankan. Uji akhir: geometri section dan posisi dokumen target tidak berubah ketika modul dilepas. |

Tidak ditemukan masalah runtime kritis/signifikan lain pada matriks Chrome yang diuji. Review font tidak menemukan Barlow yang gagal dimuat dalam kondisi jaringan normal. Fixed header, navigasi, gambar, CTA, formulir, filter, keyboard dan lightbox tetap berfungsi.

## Perbandingan screenshot

Semua pasangan berasal dari browser asli; gambar tidak direkonstruksi. Animasi dibekukan pada titik waktu tertentu. Pada perbandingan raster, seluruh animasi waktu lain juga dibekukan agar perubahan tetangga tidak disalahartikan sebagai hilangnya glyph.

| State | Sebelum | Sesudah |
| --- | --- | --- |
| Hero desktop, awal entrance | [Sebelum](visual-qa-20261113/typography-before/home-1440-heading-0-t0-actual.png) | [Sesudah](visual-qa-20261113/typography-after/home-1440-heading-0-t0-actual.png) |
| Tentang Kami, awal entrance | [Sebelum](visual-qa-20261113/typography-before/home-1440-heading-2-t0-actual.png) | [Sesudah](visual-qa-20261113/typography-after/home-1440-heading-2-t0-actual.png) |
| Heading layanan mobile, endpoint | [Sebelum](visual-qa-20261113/typography-before/home-320-heading-1-committed-actual.png) | [Sesudah](visual-qa-20261113/typography-after/home-320-heading-1-committed-actual.png) |
| Form 320px | [Sebelum](visual-qa-20261113/independent-typography/form-320.png) | [Sesudah](visual-qa-20261113/after/form-320-900.png) |

Capture lengkap: `visual-qa-20261113/before/`, `after/`, `typography-before/`, `typography-after/`, `motion/` dan `edges/`. Review manual mencakup hero, layanan, story, proses, galeri, kategori, CTA, footer, form/validasi dan state tanpa JavaScript. Subfolder `independent-typography/` menyimpan penilaian visual independen beserta script reproduksi.

## Hasil pengujian per viewport

| Viewport | Ukuran uji utama | Layout + axe kedua halaman | Raster glyph | Motion/refresh/reverse scroll | Tanpa JavaScript |
| --- | --- | --- | --- | --- | --- |
| Small mobile | 320×740 | Lulus | Lulus | Lulus | Lulus |
| Mobile | 360×800 | Lulus | Lulus | Lulus | Lulus |
| Mobile | 390×844 | Lulus | Lulus | Lulus | Lulus |
| Mobile | 430×932 | Lulus | Lulus | Lulus | Lulus |
| Tablet | 768×1024 | Lulus | Lulus | Lulus | Lulus |
| Tablet | 1024×768 | Lulus | Lulus | Lulus | Lulus |
| Desktop | 1280×800 | Lulus | Lulus | Lulus | Lulus |
| Desktop | 1440×900 | Lulus | Lulus | Lulus | Lulus |
| Desktop | 1920×1080 | Lulus | Lulus | Lulus | Lulus |

State tanpa JavaScript juga diuji pada seluruh sembilan lebar dengan tinggi 900px. Semua konten, navigasi native, foto asli dan ringkasan manual tersedia. Modal/filter/clipboard merupakan enhancement JavaScript, sesuai implementasi yang sudah ada.

Tambahan: 844×390 landscape, desktop 1280×500, perubahan tinggi desktop 500/600/900/1080px, text scaling 200%, reflow setara page zoom 200% pada desktop/tablet, serta pinch zoom dengan `visualViewport.scale=2`. Reflow zoom memakai viewport CSS setengah ukuran dan DPR 2; pengujian ini tidak mengklaim menjalankan menu zoom native Chrome. Menu, form, validasi, summary, focus, lightbox dan axe turut diuji pada state pendek/zoom.

## Pengujian baru dan bukti

| Perintah/pemeriksaan | Hasil akhir | Bukti baru |
| --- | --- | --- |
| `npm.cmd run build` | Exit 0: `tsc -b`, build client, SSR dan prerender kedua route | Build dijalankan ulang sesudah perbaikan source |
| `node scripts/ui-audit.mjs` | 18/18 lulus | `visual-qa-20261113/after/report.json` |
| `node scripts/ui-interactions.mjs` | 37/37 lulus | `visual-qa-20261113/after/interactions.json` |
| `node scripts/typography-motion-audit.mjs` | 521/521 lulus, 405 perbandingan raster; tidak ada selisih akibat mask teks | `visual-qa-20261113/typography-after/report.json` |
| `node scripts/motion-audit.mjs` | 121/121 lulus | `visual-qa-20261113/motion/report.json` |
| `node scripts/motion-lifecycle.mjs` | 9/9 lulus | `visual-qa-20261113/motion/lifecycle-performance.json` |
| `node scripts/visual-edge-audit.mjs` | 13/13 lulus | `visual-qa-20261113/edges/report.json` |
| `node docs/visual-qa-20261113/font-roles.mjs` | 1.592 sampel font terlukis sesuai keluarga Barlow; 0 mismatch | `visual-qa-20261113/font-roles.json` |
| Impeccable detector type, source aktif | `[]`, exit 0 sebelum dan sesudah | `visual-qa-20261113/independent-mechanical/detector-type-*.json` |

Gunakan `$env:PJP_QA_OUTPUT='docs/visual-qa-20261113'` dan `$env:PJP_QA_URL='http://127.0.0.1:4173'` sebelum menjalankan script QA. Script build/prerender tidak diubah. Tidak ada lint script/konfigurasi ESLint pada proyek, sehingga tidak ada klaim lint lulus.

### Typography dan font rendering

Raster mencakup semua H1/H2 kedua halaman pada sembilan lebar: awal, 10%, 35%, endpoint dan setelah native effect selesai serta inline style dikomit. Referensi melepas clipping saja pada koordinat, transform, opacity dan font yang sama. Pendekatan ini menangkap clipping vertikal/ujung glyph yang lolos `scrollWidth > clientWidth`.

Font diverifikasi melalui Chrome `CSS.getPlatformFontsForNode`, termasuk custom font/postscript name dan glyph count. Pemeriksaan ini mencakup headline, body, judul layanan, navigasi, tombol, kategori, footer, label, pilihan native, isian dan validasi. Nama font keluarga turunan seperti `Barlow SemiBold` diverifikasi melalui postscript `Barlow-SemiBold`, bukan salah dianggap fallback. Sebanyak 36 node yang tidak melukis glyph dicatat sebagai `unpainted`, bukan dihitung sebagai keberhasilan font.

Seluruh perbandingan final tanpa kehilangan glyph. Label select 320px terbaca penuh. Font, ukuran peran, tracking, line-height dan copy yang disetujui dipertahankan. Simulasi pemblokiran Google Fonts juga dijalankan: fallback tetap menampilkan konten dan menu/form dapat dipakai.

### Motion, cleanup dan interaksi

Entrance tetap satu kali; konten tidak disembunyikan ulang saat kembali menggulir. Parallax mengikuti scroll maju/mundur; mobile tetap ringan tanpa parallax. Reveal ilustrasi, filter galeri, hover, sticky, header, menu, CTA dan native dialog diuji dengan motion normal maupun reduced motion.

Tidak ada console error/runtime warning pada pemeriksaan motion akhir. Import motion yang gagal dan ketiadaan Intersection Observer menghasilkan konten statis yang tetap terlihat. Refresh pada kedua route dan semua lebar diuji kembali.

Uji lifecycle mengukur native animation effects, target Intersection Observer, Mutation Observer aplikasi dan listener media query. Setelah total 50 siklus mount/unmount, ketiganya kembali ke baseline nol. Duplicate initialization menggantikan scene sebelumnya; cleanup lama tidak mematikan scene baru. Observer dokumen milik `InjectedScript._setupGlobalListenersRemovalDetection` teridentifikasi sebagai instrumentation Playwright, dicatat terpisah dan tidak disalahartikan sebagai kebocoran situs.

Uji geometry menunggu initial fragment scroll browser selesai sebelum membandingkan posisi, sehingga smooth-scroll awal tidak menghasilkan false positive. Pada hasil final di 1280/1440/1920px, tinggi story dan posisi dokumen target sama sebelum/sesudah pemuatan modul tertunda.

Uji CPU 4× terpisah di 390 dan 1440px merekam 360 sampel rAF selama enam detik per ukuran: median sekitar 16,7ms, p95 16,8ms, tanpa interval di atas 50ms dan tanpa long task selama scroll. Initial-load long task tetap tercatat dalam JSON. Angka ini merupakan diagnostik lokal satu mesin dengan jaringan tidak diperlambat, bukan jaminan FPS perangkat fisik atau Core Web Vitals lapangan.

## File yang diubah

Source produk, tiga file:

1. `src/motion/siteMotion.ts`: hilangkan mask dari heading dan dua baris hero; mask foto tetap ada.
2. `src/motion/motion.css`: geometri sticky diterapkan sejak CSS awal, tanpa menunggu atribut JavaScript.
3. `src/inquiry-modal.css`: padding select responsif untuk nilai panjang pada ≤360px.

Script QA yang diperbarui:

4. `scripts/motion-audit.mjs`: output bisa diarahkan ke folder baru; tambahkan 320/1280px, refresh dan no-JS seluruh sembilan lebar.
5. `scripts/motion-lifecycle.mjs`: output folder baru; ukur subscription/observer dan pisahkan observer automation.

Script QA baru:

6. `scripts/typography-motion-audit.mjs`: frozen keyframe, raster, endpoint, platform fonts dan selected-value fit.
7. `scripts/visual-edge-audit.mjs`: delayed import/anchor, landscape, short viewport, zoom dan font failure.

Dokumentasi/bukti baru: laporan ini dan `docs/visual-qa-20261113/`, termasuk `PLAN.md`, script/sampel font, penilaian independen, JSON serta screenshot. `.impeccable/hook.cache.json` diperbarui otomatis oleh tooling.

SHA-256 membuktikan seluruh **28 file public tetap sama**. Kedua komponen halaman, header, footer, komponen form, data bisnis, global/gallery CSS, `package.json`, lockfile, `index.html` dan `vite.config.ts` tidak berubah. Bukti: `visual-qa-20261113/source-verification.json`.

## Skill yang dipakai

- **Impeccable:** context, audit, typeset, animate, craft floor dan polish; assessment visual dan mekanis dilakukan independen sebagaimana playbook typeset, lalu hasilnya diperiksa langsung.
- **Taste Skill:** prinsip keterbacaan, motion terukur, responsive dan browser finish. Larangan/pola generik yang mengharuskan perubahan identitas tidak diterapkan karena brief secara eksplisit mempertahankan desain/motion PJP.
- **UI UX Pro Max:** panduan UX line height, line balance, reduced motion dan aksesibilitas. Pencarian stack React untuk font/motion tidak menemukan kecocokan terverifikasi; keputusan stack memakai source/runtime proyek dan panduan UX, bukan hasil pencarian yang tidak cocok.
- **Antislop core/human, mode DURING:** fungsi, focus, keyboard, contrast, overflow, keaslian konten, reduced motion dan Delivery Gate dengan bukti hari ini.
- **Systematic Debugging dan Verification Before Completion:** reproduksi masalah, pemeriksaan sebab, uji ulang dan klaim berdasarkan hasil nyata.

## Backup dan rollback

Backup dibuat sebelum modifikasi: **`C:\Projects\PJP-Website-backups\visual-qa-20261113-081304`**, berisi 88 file. Dependencies, build output, installed skills dan capture QA lama dikecualikan. Backup tidak dimodifikasi selama perbaikan.

Untuk mengembalikan source dan script lama, hentikan preview dan jalankan PowerShell berikut dari proyek. Perintah hanya menyalin lima file yang sudah ada sebelum task ini. Kedua script QA baru tidak dibundle ke aplikasi sehingga boleh tetap disimpan untuk review.

```powershell
$pjpRestoreRoot = 'C:\Projects\PJP-Website'
$pjpQaBackup = 'C:\Projects\PJP-Website-backups\visual-qa-20261113-081304'
$pjpRestoreFiles = @(
  'src\motion\siteMotion.ts', 'src\motion\motion.css',
  'src\inquiry-modal.css', 'scripts\motion-audit.mjs',
  'scripts\motion-lifecycle.mjs'
)
foreach ($pjpRestoreFile in $pjpRestoreFiles) {
  Copy-Item -LiteralPath (Join-Path $pjpQaBackup $pjpRestoreFile) -Destination (Join-Path $pjpRestoreRoot $pjpRestoreFile) -Force
}
Set-Location -LiteralPath $pjpRestoreRoot
npm.cmd run build
```

## Batas hasil dan status akhir

Tidak ada masalah runtime kritis/signifikan yang masih diketahui dalam matriks yang diuji. Browser uji adalah Chrome 157.0.8103.52 dengan Playwright. Perangkat fisik Android/iOS, Safari, Firefox, zoom melalui menu native browser dan data performa lapangan tidak diuji.

Google Fonts tetap merupakan dependency jaringan yang sudah ada; kegagalan eksternal telah diuji dengan fallback yang terbaca. Form tetap membuat/menyalin ringkasan konsultasi; tidak ada nomor WhatsApp resmi atau backend pengiriman yang ditambahkan.

Catatan tooling non-runtime: `.impeccable/design.json` lebih lama daripada `DESIGN.md`. Sinkronisasi melalui perintah `document` dapat dilakukan terpisah; source dan DESIGN.md yang aktif tetap menjadi acuan audit ini.

Preview lokal: **http://127.0.0.1:4173**.
