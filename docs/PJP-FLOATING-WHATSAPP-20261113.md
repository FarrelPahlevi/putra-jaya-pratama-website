GATE: OFF (no build active). Taste Skill's automated finish gate returned this status; it is not a PASS. Fresh project Playwright/axe checks provide the browser evidence below.

# Floating WhatsApp PJP

> **Catatan 13 November 2026:** dokumen ini menjelaskan perilaku versi pertama (muncul setelah scroll). Perilaku tersebut sudah diganti menjadi **selalu tampil sejak halaman dibuka**. Lihat `PJP-FLOATING-WHATSAPP-ALWAYS-VISIBLE-20261113.md` untuk status final, pengujian, dan rollback.

Implementasi lokal untuk `/` dan `/galeri-proyek`. Branding, header, isi halaman, ilustrasi, form konsultasi, dan engine animasi utama dipertahankan.

## Perilaku dan desain

- Desktop: pill pumpkin `#b55514`, label **Chat WhatsApp**, tinggi 52px, offset 24px. Tablet: tinggi 50px, offset 20px. Mobile di bawah 480px: ikon 48×48px, offset 16px. Bottom offset ditambah `env(safe-area-inset-bottom)`; sisi kanan memperhitungkan safe area.
- Tampil saat scroll mencapai 360px, disembunyikan kembali pada 250px. Hysteresis mencegah perubahan state bolak-balik di satu ambang. Area yang baru bebas dari overlap menunggu 160ms sebelum menampilkan tombol.
- Entrance opacity/translateY 8px selama 240ms, exit 160ms, easing memakai token Motion PJP. Hover naik 2px; active mengecil sedikit. Tidak ada loop. Focus, reduced motion, dan overlay memakai perubahan segera.
- Collision detection melindungi teks/label/kontrol di sudut layar. Tombol juga disembunyikan saat link WhatsApp kontak/footer sudah terlihat, agar tidak menduplikasi aksi di area tersebut. Tombol dapat tetap tampil di area foto dan whitespace.
- Anchor langsung memakai `getWhatsAppUrl()` dari konfigurasi resmi, tanpa pesan panjang. `target="_blank"`, `rel="noopener noreferrer"`, nama aksesibel menyebut PJP dan tab baru. Tidak ada nomor baru yang di-hardcode dalam komponen.
- Form **Isi kebutuhan proyek**, pilihan layanan, clipboard, filter, dan lightbox tetap menggunakan alur sebelumnya.

## Aksesibilitas dan fallback

Link dapat dicapai lewat Tab dan accessibility tree setelah inisialisasi, termasuk sebelum ambang scroll. Focus menampilkan kontrol segera dan mempertahankannya selama fokus, termasuk saat scroll mundur atau resize. Focus boleh mengesampingkan penekanan overlap biasa agar pengguna tidak kehilangan kontrol yang sedang digunakan.

Saat modal, lightbox, atau menu mobile aktif, kontrol memakai `inert` dan `visibility: hidden`. Dialog/menu mempertahankan pengelolaan fokusnya sendiri. Focus ring memakai charcoal dengan halo putih. Label mobile yang tidak terlihat digantikan nama aksesibel lengkap. Kontras putih terhadap pumpkin: **4.91:1**, hover **7.08:1**, active **8.60:1**.

Tanpa JavaScript, kontrol mengambang tetap inert/tersembunyi dan link WhatsApp asli pada kontak/footer tetap tersedia pada HTML prerender. Jika IntersectionObserver, ResizeObserver, atau MutationObserver tidak tersedia, komponen tidak diaktifkan dan halaman tetap tersedia. Tanpa Web Animations API, kontrol memakai perubahan style langsung.

## Arsitektur dan performa

- React/TypeScript, CSS komponen, `motion/mini`, serta easing proyek. **Tidak ada dependency baru.**
- Satu passive scroll listener hanya memeriksa dua ambang; React tidak diperbarui setiap pixel. IntersectionObserver menangani area overlap dan visibilitas kontak alternatif. ResizeObserver menyesuaikan ukuran kontrol setelah perubahan font/viewport. MutationObserver membaca status overlay dan memperbarui target saat konten main/footer berubah.
- Satu controller per root, pengaman inisialisasi ganda, cleanup idempotent untuk seluruh observer/listener/media query/timer, dan penghentian animasi saat effect berganti/unmount.
- Layout tetap: root fixed, animasi hanya opacity/transform pada surface, hover pada anchor terpisah agar tidak berebut transform. Tidak ada perubahan dimensi konten saat tombol muncul.
- Verifikasi bukan pengukuran FPS atau Core Web Vitals perangkat nyata.

## File produk

| Status | File | Perubahan |
|---|---|---|
| Diubah | `src/App.tsx` | Mount satu kontrol bersama state modal konsultasi. |
| Baru | `src/components/FloatingWhatsApp.tsx` | Anchor reusable, focus, motion, dan fallback WAAPI. |
| Baru | `src/components/floatingWhatsAppVisibility.ts` | Scroll thresholds, collision/overlay detection, resize dan cleanup. |
| Baru | `src/components/floating-whatsapp.css` | Pill/ikon responsif, safe area, focus, hover, active dan reduced motion. |
| Baru | `public/assets/whatsapp.svg` | Glyph WhatsApp lokal, tanpa script atau referensi eksternal. |

QA baru: `scripts/floating-whatsapp-audit.mjs`. Dokumen baru: laporan ini, `docs/floating-whatsapp-20261113/PLAN.md`, dan Delivery Gate. Log, JSON, dan screenshot berada dalam folder evidence tersebut. `.impeccable/hook.cache.json` diperbarui otomatis oleh hook desain. `dist/` dan `dist-ssr/` adalah hasil build lokal yang dibuat ulang.

Ikon berasal dari [Simple Icons v13 WhatsApp](https://github.com/simple-icons/simple-icons/blob/13.0.0/icons/whatsapp.svg), dengan [lisensi CC0 proyek](https://github.com/simple-icons/simple-icons/blob/13.0.0/LICENSE.md). Path glyph dipertahankan; metadata aksesibilitas berada pada anchor/img komponen. Ini bukan klaim bahwa aset diunduh langsung dari Meta.

## Masalah yang ditemukan dan diperbaiki

| Temuan | Akar penyebab | Perbaikan |
|---|---|---|
| Potensi tombol berkedip di sekitar ambang | Satu threshold dapat berganti state saat scroll naik/turun sedikit. | Dua ambang 360/250px dan jeda pelepasan collision. |
| Teks/CTA berpotensi tertutup kontrol fixed | Offset tetap saja tidak mempertimbangkan isi halaman. | Observer area sudut melindungi copy, label, dan kontrol; kontak native yang terlihat menekan duplikasi. |
| Cleanup berulang dan inisialisasi ganda | Owner effect dapat membersihkan controller yang sudah digantikan. | WeakMap satu owner per root dan cleanup idempotent; diuji 50 siklus. |
| Fokus berisiko hilang saat resize | Status kesiapan tidak perlu di-reset ketika geometri observer diperbarui. | Pertahankan kesiapan; evaluasi collision ulang tanpa menonaktifkan link yang sedang difokuskan. |
| Halaman hilang saat IntersectionObserver tidak tersedia | Error constructor dalam effect dapat membuat React melepas seluruh tree; reproduksi sebelum perbaikan menunjukkan footer hilang. | Guard API sebelum membuat observer, serta fallback WAAPI langsung. |
| Assertion reduced motion awal terlalu ketat | CSS global menetapkan `0.01ms`, yang dibaca browser sebagai `1e-05s`. | Uji menerima durasi maksimal 1ms dan tetap memeriksa tidak ada animasi berjalan. CSS global dipertahankan. |
| Console gagal pada satu putaran jaringan | Browser melaporkan perubahan jaringan/disconnected saat memuat resource. | Log gagal disimpan, jaringan diperiksa ulang, lalu seluruh suite fitur dan motion diulang. Tidak ada error yang disaring dari assertion. |

## Skill yang digunakan

- **Impeccable:** konteks desain, craft floor, refinement dan motion untuk feedback; visual review screenshot dan state.
- **Taste Skill:** motion restraint dan browser verification. Gate otomatis berstatus OFF karena tidak ada build Taste aktif; tidak diklaim lulus.
- **UI UX Pro Max:** responsive/touch targets, reduced motion, focus states dan focus-not-obscured, termasuk pencarian panduan UX lokal.
- **Antislop core + human, mode DURING:** mempertahankan arah Minimal Industrial, nama aksi yang jelas, tujuan setiap efek, accessibility dan Delivery Gate pada scope fitur.

## Hasil pengujian baru

Browser **Chrome 157.0.8103.52**, Playwright headless, source lokal dan production preview `http://127.0.0.1:4173`. Seluruh navigasi WhatsApp pada suite fitur/integrasi di-intercept/mock, termasuk klik anchor `_blank`. **Tidak ada pesan atau request chat WhatsApp sungguhan yang dikirim.**

| Kelompok | Hasil akhir | Evidence |
|---|---|---|
| Floating WhatsApp | **161/161 PASS** | `floating-whatsapp-20261113/floating-report.json`, `floating-test.log` |
| Responsive + axe | **18/18 PASS**, 0 violations pada kedua route di 9 viewport | `floating-whatsapp-20261113/regression/after/report.json` |
| Regresi menu/form/filter/lightbox/clipboard | **37/37 PASS** | `floating-whatsapp-20261113/regression/after/interactions.json` |
| Integrasi form WhatsApp, semua layanan, encoding, clipboard, popup fallback | **156/156 PASS** | `floating-whatsapp-20261113/regression/whatsapp/report.json` |
| Motion, refresh, scroll maju/mundur, reduced motion, resize, kegagalan chunk, no-JS | **121/121 PASS** | `floating-whatsapp-20261113/regression/motion/report.json` |
| Unit format pesan/validasi/konfigurasi | **5/5 PASS** | `floating-whatsapp-20261113/message-unit-test.log` |
| Tap pada 4 mobile × 2 route, dan kegagalan unduhan script utama pada 2 route | **10/10 PASS** | `floating-whatsapp-20261113/touch-script-failure-report.json` |
| TypeScript + client build + SSR build + prerender dua route | **PASS** | `floating-whatsapp-20261113/build.log` |

| Viewport | `/` | `/galeri-proyek` | Kontrol |
|---|---|---|---|
| 320×740 | PASS | PASS | Ikon 48px |
| 360×800 | PASS | PASS | Ikon 48px |
| 390×844 | PASS | PASS | Ikon 48px |
| 430×932 | PASS | PASS | Ikon 48px |
| 768×1024 | PASS | PASS | Pill 50px |
| 1024×768 | PASS | PASS | Pill 50px |
| 1280×800 | PASS | PASS | Pill 52px |
| 1440×900 | PASS | PASS | Pill 52px |
| 1920×1080 | PASS | PASS | Pill 52px |

Semua ukuran memeriksa threshold scroll, akses Tab sebelum scroll, focus ring, URL resmi, intercept klik WhatsApp, modal/inert, fast/reverse scroll, duplikasi kontak, reduced motion, axe, dan console. Mobile memeriksa menu; galeri memeriksa filter dan lightbox. Desktop memeriksa hover/active. Tidak ada horizontal overflow, overlap kontrol dengan teks/kontrol yang dilindungi pada state tampil yang diperiksa, maupun console error pada putaran akhir. Foto tetap sama dan audit tidak menemukan gambar rusak atau saling tumpang tindih.

Pengujian tambahan: resize berulang, focus selama resize, landscape 844×390, viewport pendek 768×500/320×568, reflow setara 200% pada 720×450, tanpa JS di kedua route, serta IntersectionObserver/ResizeObserver/MutationObserver/WAAPI yang dinonaktifkan satu per satu. Pemeriksaan CDP terhadap glyph label di seluruh tablet/desktop membuktikan **Barlow SemiBold custom font**, bukan sekadar nilai `font-family` yang dideklarasikan. Controller diuji 50 siklus, duplicate init, tanpa callback terlambat, tanpa observer/listener tersisa, dan 100 event scroll pada posisi tetap tanpa update state.

Tap pada perangkat emulasi mobile (`hasTouch` dan `isMobile`) menghasilkan popup mock bernomor tepat pada seluruh 8 kombinasi. Ketika unduhan main JS sengaja digagalkan, kedua route tetap menampilkan link WhatsApp footer dari HTML prerender; kontrol floating tetap inert. Sepuluh pemeriksaan tambahan ini dieksekusi dengan Playwright dan hasilnya disimpan terpisah.

Build akhir: main JS **280.97 kB / gzip 86.63 kB**, deferred siteMotion **18.63 / 7.43 kB**, CSS **85.50 / 17.57 kB**. Vite dapat membagi ulang kode Motion bersama karena kini dipakai kontrol global; tidak ada library yang ditambahkan atau engine utama yang diganti. Manifest SHA-256 source dan file penting tersedia di `floating-whatsapp-20261113/source-manifest.json`.

Perintah reproduksi (paket Playwright/axe proyek tersedia di sibling tools directory):

```powershell
$env:PJP_QA_URL = 'http://127.0.0.1:4173'
$env:PJP_QA_OUTPUT = 'docs/floating-whatsapp-20261113/regression'
node scripts/floating-whatsapp-audit.mjs
node scripts/ui-audit.mjs
node scripts/ui-interactions.mjs
node scripts/whatsapp-audit.mjs
node scripts/motion-audit.mjs
node --test scripts/inquiry-message.test.mjs
npm.cmd run build
```

Set `PJP_QA_OUTPUT` ke `docs/floating-whatsapp-20261113` jika ingin meletakkan hasil suite floating tepat seperti evidence asli. Tidak tersedia script lint pada package proyek; TypeScript dijalankan melalui build.

## Screenshot dan visual review

Screenshot akhir seluruh 18 kombinasi terdapat di `floating-whatsapp-20261113/after/`. Review visual mencakup kontrol ringkas pada 320/390, pill tablet dan desktop, bentuk glyph, kontras, label, alignment, focus ring, serta suppression dalam dialog/menu.

| State | Sebelum | Sesudah |
|---|---|---|
| Desktop 1440, scroll 600px | [Sebelum](floating-whatsapp-20261113/before/home-1440.png) | [Sesudah](floating-whatsapp-20261113/after/home-1440-comparison.png) |
| Mobile 390, scroll 600px | [Sebelum](floating-whatsapp-20261113/before/home-390.png) | [Sesudah](floating-whatsapp-20261113/after/home-390-comparison.png) |

Contoh akhir: [Desktop](floating-whatsapp-20261113/after/home-1440.png), [mobile 320](floating-whatsapp-20261113/after/home-320.png), [galeri tablet](floating-whatsapp-20261113/after/gallery-1024.png), [fokus keyboard](floating-whatsapp-20261113/states/focus-390.png), [modal](floating-whatsapp-20261113/states/modal-1440.png), [menu mobile](floating-whatsapp-20261113/states/menu-390.png).

## Batas pengujian

Tidak ada masalah kritis/signifikan fitur yang masih diketahui pada matriks ini. Pengujian memakai emulasi viewport/touch Chrome; bukan Safari/iOS fisik, pembaca layar manual, atau pengukuran Core Web Vitals lapangan. Safe area diverifikasi pada CSS dan offset browser biasa; perangkat notch fisik belum diuji. Reflow 200% diuji melalui viewport ekuivalen, bukan klaim browser zoom native. Pengiriman/penerimaan chat nyata tidak diverifikasi karena navigasi di-mock sesuai instruksi.

PJP masih memakai sumber font eksternal yang sudah ada. Satu putaran mengalami gangguan jaringan, disimpan di `floating-test-network.log` dan `motion-test-network.log`; putaran akhir lulus tanpa menyaring error. Tidak ada perubahan sistem font atau konfigurasi production.

## Backup dan rollback

Backup sebelum edit: **`C:\Projects\PJP-Website-backups\floating-whatsapp-20261113-140553`**. Sebanyak **95 file** diverifikasi SHA-256 cocok dengan source sebelum perubahan. Perbandingan sesudah implementasi memastikan file produk lama yang berubah hanya `src/App.tsx`; semua aset/fungsi lama lainnya tetap sama.

Untuk menghapus fitur ini dan membangun ulang versi sebelumnya, jalankan dari PowerShell:

```powershell
Copy-Item -LiteralPath 'C:\Projects\PJP-Website-backups\floating-whatsapp-20261113-140553\src\App.tsx' -Destination 'C:\Projects\PJP-Website\src\App.tsx' -Force
Remove-Item -LiteralPath @(
  'C:\Projects\PJP-Website\src\components\FloatingWhatsApp.tsx',
  'C:\Projects\PJP-Website\src\components\floatingWhatsAppVisibility.ts',
  'C:\Projects\PJP-Website\src\components\floating-whatsapp.css',
  'C:\Projects\PJP-Website\public\assets\whatsapp.svg',
  'C:\Projects\PJP-Website\scripts\floating-whatsapp-audit.mjs'
)
Set-Location -LiteralPath 'C:\Projects\PJP-Website'
npm.cmd run build
```

Dokumentasi/evidence boleh tetap disimpan. Tidak ada commit, push, deployment, perubahan informasi perusahaan, atau perubahan konfigurasi production dalam pekerjaan ini.
