GATE: OPEN 46 (rounds used up). Temuan Taste dan penilaian terhadap brief dicatat lengkap di [taste-findings.md](ui-ux-20261111/taste-findings.md); bukan klaim gate PASS.

# PJP: audit UI/UX dan responsive redesign

Tanggal: 11 November 2026. Rute aktif: `/` dan `/galeri-proyek` beserta header, footer, seluruh section, filter, lightbox dan formulir konsultasi.

Branding Minimal Industrial, Barlow / Barlow Semi Condensed, warna pumpkin/hitam/putih, konten bisnis dan fungsi penyusunan ringkasan dipertahankan. Tidak ada deployment, git push atau perubahan konfigurasi production.

## Hasil utama

- 18/18 kombinasi halaman dan viewport lulus pemeriksaan layout serta axe.
- 37/37 pemeriksaan interaksi Playwright lulus.
- Tidak ditemukan overflow horizontal, teks terpotong, overlap foto, gambar rusak, target interaksi di bawah 44px atau exception JavaScript pada matriks final.
- Pemeriksaan console pada kedua halaman, menu, validasi form dan backdrop lightbox: 0 console error, 0 request gagal dan 0 HTTP error setelah favicon diperbaiki.
- Build TypeScript dan Vite berhasil. Output lokal berada di `dist/`; konfigurasi server/production tidak diubah.

Hasil axe adalah pemeriksaan otomatis pada halaman dan state yang diuji, bukan sertifikasi WCAG menyeluruh.

## Backup

`C:\Projects\PJP-Website-backups\ui-ux-20261111-135757`

Backup dibuat sebelum source UI diedit. Sebanyak 51 file source dan public diverifikasi SHA-256. Folder dependency/generated `node_modules`, `dist`, paket skill `.agents` dan `.taste-skill` dikecualikan. Source, aset asli, dokumen dan konfigurasi yang ada disalin ke backup.

## Audit dan perbaikan

| Prioritas | Sebelum | Perbaikan dan bukti |
| --- | --- | --- |
| P1 | Foto pertama galeri melampaui tinggi baris pada seluruh ukuran mobile | Grid mobile memakai automatic rows dan frame 4:3; 0 overlap pada 320/360/390/430. |
| P1 | Fokus tidak masuk atau tetap di dalam form; Escape tidak memulihkan fokus | Native dialog, siklus Tab/Shift+Tab dan pemulihan trigger; lulus pada 320/390/768/1440. |
| P1 | Label field tidak terkait dengan input dan select tidak bernama | id/htmlFor, label output, aria-invalid/describedby dan fokus ke field salah; axe form lulus. |
| P1 | Kontras teks CTA dan metadata filter tidak memenuhi AA | Warna teks/permukaan diperbaiki, opacity angka filter dihapus; axe 0 pelanggaran di seluruh viewport. |
| P2 | Banyak kontrol hanya setinggi 17–42px | Logo link, toggle, text action, footer dan lightbox minimal 44px; 0 target terlalu kecil pada seluruh viewport. |
| P2 | Menu tidak membatasi fokus/background scroll dan bertahan saat resize | Menu setinggi ruang viewport, scrollable pada landscape, background inert, Escape dan resize desktop membersihkan state. |
| P2 | Gutter story tablet tidak sejajar dengan section lain | Token gutter bersama, lebar maksimum konten dan spacing fluid; screenshot tablet diverifikasi. |
| P2 | Dot logo turun ke bawah kotak | Lockup inline-flex; proporsi P/dot dan wordmark dipertahankan. |
| P2 | Metadata lightbox padat dan gesture vertikal dapat mengganti foto | Footer mobile bertumpuk, kontrol 44px, horizontal/vertical direction check dan touch cancel. Swipe diuji dengan CDP touch tersintesis. |
| P2 | Foto asli terlalu besar untuk thumbnail mobile | Tujuh turunan WebP 400/700px, srcset/sizes sesuai slot dan metadata dimensi asli; foto asli tetap dipakai lightbox. |
| P2 | Browser meminta favicon yang tidak ada | Favicon memakai lockup P/dot yang sudah ada; HTTP dan console kembali bersih. |
| P3 | Hero, headline dan ruang antarsection tidak konsisten | Hero mengikuti svh dan dapat tumbuh, tipografi fluid, CTA stack, teaser galeri lebih ringkas, gutter simetris. |
| P3 | CSS ikut memindai file skill dan output audit | Source Tailwind dibatasi ke `src`; hasil build CSS turun dari 112.18 kB menjadi 82.12 kB. |

Audit health bersifat heuristik: baseline 10/20 (aksesibilitas 1, performa 3, token/theming 2, responsive 2, integritas 2); sesudah perbaikan 16/20 (3,3,3,3,4). Pemeriksaan perangkat fisik, screen reader dan field performance belum termasuk. Integritas visual mengikuti DESIGN.md yang telah diperbarui, bukan scaffold kit generik.

## Matriks pengujian final

Chrome 157.0.8103.50, Playwright headless, viewport CSS dan touch emulation. Semua baris mencakup homepage serta galeri.

| Kelas | Viewport | Halaman lulus | Overflow / overlap / target kecil / axe |
| --- | --- | --- | --- |
| Mobile | 320 × 740 | 2/2 | 0 / 0 / 0 / 0 |
| Mobile | 360 × 800 | 2/2 | 0 / 0 / 0 / 0 |
| Mobile | 390 × 844 | 2/2 | 0 / 0 / 0 / 0 |
| Mobile | 430 × 932 | 2/2 | 0 / 0 / 0 / 0 |
| Tablet | 768 × 1024 | 2/2 | 0 / 0 / 0 / 0 |
| Tablet | 1024 × 768 | 2/2 | 0 / 0 / 0 / 0 |
| Desktop | 1280 × 800 | 2/2 | 0 / 0 / 0 / 0 |
| Desktop | 1440 × 900 | 2/2 | 0 / 0 / 0 / 0 |
| Desktop | 1920 × 1080 | 2/2 | 0 / 0 / 0 / 0 |

Tambahan: landscape 844 × 390, pembesaran teks 200%, reduced motion dan normal motion, clipboard diberi izin/ditolak, serta sumber gambar pada DPR 1 dan DPR 2. Uji DPR memperlihatkan browser memilih thumbnail 400px pada DPR 1 dan dapat memakai sumber asli yang sudah dibutuhkan hero pada DPR 2; lightbox tetap membuka sumber asli.

Visual review dilakukan pada screenshot hero, halaman penuh, layanan, story, proses, CTA, form, menu dan lightbox. Screenshot tersedia dalam [folder hasil](ui-ux-20261111/after/), dengan [baseline](ui-ux-20261111/before/) untuk perbandingan.

## Interaksi yang diverifikasi

- Skip link menerima Tab pertama dan memindahkan fokus ke main.
- Menu dibuka dengan tap, menampilkan current location, mengunci scroll/fokus, ditutup dengan Escape, link atau resize desktop.
- Navigasi Beranda/Layanan/Tentang/Kontak menutup menu dan memfokuskan section tujuan; link galeri membuka halaman galeri.
- Semua pemicu konsultasi di hero, story, CTA, footer dan menu membuka form; Batal, tombol tutup, Escape dan backdrop menutupnya.
- Form kosong memfokuskan field wajib dan menampilkan error terkait; data valid menghasilkan ringkasan dengan layanan/lokasi/nama yang benar.
- Clipboard berhasil, salin ulang, clipboard ditolak, pemilihan teks manual serta retensi isian diuji.
- Filter Semua Foto dan Asphalt Hotmix mengubah selection serta status jumlah foto.
- Keempat foto diperbesar satu per satu; tombol sebelumnya/berikutnya, arrow keys, Escape, backdrop dan pemulihan fokus diuji.
- Swipe horizontal berpindah foto; gesture vertikal tidak mengganti foto.
- Semua destinasi anchor/internal link yang dirender diperiksa keberadaannya.
- Fokus keyboard pada normal motion tetap terlihat di bawah header; reduced motion menghentikan entrance/hover transform.

Catatan detail per pemeriksaan: [interactions.json](ui-ux-20261111/after/interactions.json). Data viewport dan node axe: [report.json](ui-ux-20261111/after/report.json). Console: [console.json](ui-ux-20261111/after/console.json).

## Skill yang digunakan

| Skill | Penerapan |
| --- | --- |
| Impeccable | `context`, audit/adapt/craft-floor/polish, prioritas P1–P3, pemeriksaan deterministik hook dan visual review. |
| UI UX Pro Max | Checklist accessibility/touch/reflow/motion; pencarian `keyboard focus modal` pada ux dan `state effects` pada react; pola label, fokus, target dan cleanup. |
| Taste Skill | Konsistensi sistem, equal edges, fotografi dari aset PJP, entrance/feedback terbatas, browser gate dan pemeriksaan performa. |
| Antislop | DURING dipilih pengguna; kontrol nyata, klaim tidak ditambah, arah dari DESIGN.md, kontras, keyboard, responsive dan delivery gate di bawah. |

Tidak ada foto stok, testimonial, statistik bisnis atau kontak rekaan yang ditambahkan. Favicon mengadaptasi mark P/dot yang telah ada. Varian foto adalah resize/encoding dari file yang sama; sumber asli tidak ditimpa.

Taste mempunyai aturan scaffold yang berbeda dari brief PJP: semua section harus setinggi kelipatan layar, heading rata kiri, kelas `.wrap`, kit motion/moment, dua gaya tombol dan batas kontras teks 7:1. Ketentuan DESIGN.md dan permintaan mempertahankan brand/fungsi didahulukan. Status gate lengkap dan peringatan disimpan di [taste-gate.log](ui-ux-20261111/taste-gate.log) dan [taste-gate.json](ui-ux-20261111/taste-gate.json). Seluruh 46 temuan OPEN, penilaian masing-masing, hasil heuristik fokus yang tidak direproduksi, serta koreksi pemilihan foto hero setelah gate tercatat pada [taste-findings.md](ui-ux-20261111/taste-findings.md). Gate ini tidak dinyatakan PASS atau diganti dengan waiver massal. Pemeriksaan Playwright dan axe di atas merupakan bukti kualitas aktual pada scope yang diuji.

## Performa lokal

Pemeriksa performa Taste pada 1440px dan 390px: galeri 0 FAIL / 3 WARN; homepage 0 FAIL / 3 WARN. WARN yang dipertahankan terkait enam file font Barlow, foto asli desktop galeri 516 KiB, dan foto hero landscape yang memerlukan sumber lebih besar untuk menutup frame mobile yang tinggi. Font mendukung keluarga/weight yang telah ditetapkan brand; sumber hero dipilih berdasarkan kebutuhan cover, sedangkan thumbnail galeri memakai turunan yang lebih kecil.

Galeri mobile turun dari 1.434,5 KiB menjadi 481,2 KiB total transfer pada run lokal. CSS build 82,12 kB (gzip 16,91 kB); JavaScript 262,96 kB (gzip 80,42 kB). Data akhir: [perf-home.json](ui-ux-20261111/after/perf-home.json), [perf-gallery.json](ui-ux-20261111/after/perf-gallery.json). Ini pengukuran lokal CPU, bukan Lighthouse score atau field Core Web Vitals.

## Antislop delivery gate

- R-02 PASS: tanda em dash tidak ditambahkan ke UI dan judul dokumen diperbaiki.
- R-03 PASS: 18 viewport tanpa overflow, overlap atau target di bawah 44px.
- R-17/R-18/R-36/R-38 PASS: konten bisnis dari source dipertahankan; tidak ada data, testimonial atau klaim baru.
- R-23/R-37 PASS: DESIGN.md dan batas branding pengguna menentukan arah; tidak ada konsep aset baru, foto turunan mempertahankan materi asli.
- R-24/R-26 PASS: seluruh destinasi link tersedia; trigger konsultasi, filter dan kontrol foto mempunyai hasil yang diuji.
- R-25 PASS: axe tidak menemukan pelanggaran kontras pada seluruh halaman, form dan lightbox yang diuji.
- R-27/R-28 PASS: validasi, output, copy loading/disabled dan kegagalan clipboard ditangani; galeri statis hanya menampilkan kategori berisi foto; tidak ada FAQ rekaan.
- R-32/R-39 PASS: kontrol native, label terhubung, skip link, focus loop, Escape, focus return, touch target dan reduced motion diuji.
- R-33 PASS: source diedit langsung dengan patch; skrip optimasi hanya menghasilkan varian aset, tidak menulis ulang CSS/source UI.
- R-34 PASS: tidak ada theme toggle; surface terang/gelap dari brand keduanya diperiksa.
- R-35 PASS: build, 18 pemeriksaan viewport, 37 interaksi dan console check tersedia sebagai artefak.
- R-40 PASS: dimensi gambar nyata, srcset, lazy loading di bawah fold, hero berprioritas tinggi; angka performa hanya berasal dari pemeriksaan lokal.
- Purpose-Gate PASS: foto/scrim untuk konteks dan keterbacaan, Barlow/pumpkin untuk identitas, shadow untuk overlay; alasan keputusan ada di [PLAN.md](ui-ux-20261111/PLAN.md).
- Liveliness PASS: ENERGY 2 / RHYTHM 2 / MOTION 1; hero foto, layanan ilustratif, story split dan proses terbuka memberi focal point yang berbeda; entrance sekali dan feedback ringan.
- Craftsmanship PASS: tidak ada kontrol palsu atau section baru pengisi template; konten dan visual PJP tetap menjadi dasar.

## File yang diubah atau ditambah

| File | Perubahan |
| --- | --- |
| `src/App.tsx` | Memuat stylesheet dialog. |
| `src/MinimalIndustrial.tsx` | Fokus section, semantic icons, gambar responsive dan dimensi. |
| `src/GalleryPage.tsx` | Filter status, metadata gambar, thumbnail responsive dan lightbox touch/keyboard. |
| `src/SiteHeader.tsx` | Menu, fokus, scroll lock, inert background, resize dan current state. |
| `src/SiteFooter.tsx` | Semantik icon; spacing/target diperbaiki pada CSS bersama. |
| `src/components/InquiryModal.tsx` | Native dialog, label, validasi, status, clipboard dan fokus. |
| `src/utils/focus.ts` | Siklus fokus bersama untuk kedua dialog. |
| `src/index.css` | Focus/selection, cursor, reduced motion dan pembatasan source Tailwind. |
| `src/minimal-industrial.css` | Gutter, hero/type/section layout, logo, menu, CTA, footer dan responsivitas. |
| `src/project-gallery.css` | Grid tanpa overlap, metadata, filter, lightbox, CTA dan fokus. |
| `src/inquiry-modal.css` | Styling responsive dan state lengkap form. |
| `src/data/projectGallery.ts` | Dimensi sumber dan pembentukan srcset. |
| `index.html` | Viewport safe area, title, page metadata dan favicon. |
| `public/favicon.svg` | Mark P/dot untuk tab browser. |
| `public/assets/pjp-preview/*-400.webp` | Empat thumbnail foto. |
| `public/assets/pjp-preview/*-700.webp` | Tiga varian foto; sumber 650px tidak di-upscale. |
| `DESIGN.md` | Menyelaraskan dokumentasi dengan hasil responsive dan interaksi baru. |
| `scripts/ui-audit.mjs` | Matriks 18 viewport, screenshot, axe, font/image/layout metrics. |
| `scripts/ui-interactions.mjs` | Regresi interaksi, keyboard, touch, clipboard, motion dan zoom. |
| `scripts/optimize-project-photos.mjs` | Pembuatan varian foto yang dapat diulang. |
| `docs/ui-ux-20261111/` | Plan, baseline, screenshot final, laporan JSON, manifest foto dan log skill. |
| `docs/UI-UX-AUDIT-20261111.md` | Laporan ini. |

Hash dibandingkan dengan backup: `package.json`, `package-lock.json`, `vite.config.ts`, ketiga tsconfig serta konfigurasi `.codex` dan `.impeccable` tidak diubah. Output build `dist/` diperbarui oleh build lokal. Komponen arsip yang tidak diimpor oleh entrypoint tidak diaktifkan, dihapus atau disajikan sebagai rute baru.

Profil browser sementara milik pemeriksa performa dipindahkan ke `C:\Users\MYCOMP\AppData\Local\Temp\PJP-UI-QA-20261111\chrome-perf`. Ini menghindari Vite memantau file Cookies yang dikunci Chrome; dev server kemudian berhasil dimulai ulang dan kedua rutenya lolos smoke test. Tidak ada konfigurasi watcher/production yang diubah. Preview hasil build tetap lokal di `http://127.0.0.1:4173/`.

## Menjalankan ulang

Alat QA dipasang terpisah di `C:\Projects\PJP-Website-tools` (Playwright, axe dan sharp), sehingga dependencies aplikasi tetap sama. Jalankan dari root proyek:

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Pada terminal lain:

```powershell
$env:PJP_QA_URL='http://127.0.0.1:4173'
node scripts/ui-audit.mjs
node scripts/ui-interactions.mjs
```

Foto dapat dibuat ulang dengan `node scripts/optimize-project-photos.mjs`. Build dan tes tidak mengirim formulir ke pihak luar.

## Batas verifikasi

Pengujian memakai Chrome/Chromium dengan ukuran viewport dan touch tersintesis, bukan perangkat iOS/Android fisik atau Safari/Firefox. Belum ada pengujian screen reader manual atau field Core Web Vitals; angka dari pemeriksa performa adalah pengukuran lokal, bukan Lighthouse score atau p75 pengguna nyata. Kontak resmi dan sistem pengiriman tetap belum tersedia sebagaimana source sebelumnya; form secara jelas menyatakan bahwa ia hanya membuat ringkasan.

DESIGN.md diperbarui; sidecar preview `.impeccable/design.json` yang lebih lama tidak diregenerasi sebagai bagian dari perubahan UI. DESIGN.md dan source aktif menjadi acuan hasil ini.
