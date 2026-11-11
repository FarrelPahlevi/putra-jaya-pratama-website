# Galeri Proyek: minimal refinement

Implementasi langsung pada `/galeri-proyek`, 11 November 2026.

## Perubahan

- Hero beserta foto latar, overlay, headline, deskripsi, wrapper dan seluruh selector `project-hero` dihapus.
- Halaman dimulai dengan H1 **Galeri Proyek.**, setelah fixed header. Clearance judul mengikuti tinggi header: 40px pada mobile dan 48–80px pada layar lebih besar.
- Label `01 / PORTOFOLIO`, angka pada kedua filter serta jumlah hasil yang sebelumnya terlihat di samping filter dihapus.
- Status jumlah hasil tetap tersedia dalam live region tersembunyi, dengan `role="status"`, `aria-live="polite"` dan `aria-atomic="true"`.
- Nama filter, selection `aria-pressed` dan filtering dipertahankan. Filter mendapat satu garis pemisah dan gap 8px tanpa badge angka.
- Judul kategori **Asphalt Hotmix**, **04 FOTO**, keempat foto, responsive srcset dan lightbox dipertahankan. Heading kategori menjadi H2 agar urut setelah H1.
- Foto pertama kini eager/high priority karena menjadi visual utama setelah hero dihapus. Foto asli tetap ditampilkan utuh melalui lightbox `object-fit:contain`; thumbnail mempertahankan crop `cover` dan grid yang sudah ada.

Tidak ada elemen dekoratif, gambar atau copy pengganti yang ditambahkan. Barlow, pumpkin, charcoal dan warm paper mengikuti sistem Minimal Industrial yang ada.

## File

| File | Perubahan |
| --- | --- |
| `src/GalleryPage.tsx` | Menghapus hero/label/badge; H1/H2; status tersembunyi; prioritas foto pertama. |
| `src/project-gallery.css` | Menghapus CSS hero dan badge; merapikan top padding, heading dan filter. Selector bersama untuk Beranda/header tetap identik dengan backup. |
| `scripts/ui-interactions.mjs` | Menyesuaikan pencarian tombol dengan label baru tanpa angka. |
| `scripts/gallery-refinement.mjs` | Pengujian khusus delapan viewport, axe, interaksi dan screenshot. |
| `docs/gallery-minimal-20261111/` | Screenshot baseline/hasil, lightbox dan laporan JSON. |
| `docs/PJP-GALLERY-MINIMAL-20261111.md` | Laporan ini. |

Cache `.impeccable/hook.cache.json` diperbarui otomatis oleh detector. Konfigurasi production tidak diubah.

## Backup dan batas scope

Backup: `C:\Projects\PJP-Website-backups\gallery-minimal-20261111-151513`.

79 file diverifikasi SHA-256 sebelum source diubah. Backup mencakup source, public, scripts dan konfigurasi; dependency/generated folders serta dokumen/screenshot lama dikecualikan.

Hash berikut dibandingkan dengan backup dan tetap identik: `MinimalIndustrial.tsx`, `minimal-industrial.css`, `SiteHeader.tsx`, `SiteFooter.tsx`, `index.css`, `App.tsx`, `DESIGN.md`, `index.html`, `vite.config.ts`, `package.json` dan `package-lock.json`. Seluruh rule header dan teaser Beranda dalam stylesheet galeri juga tetap identik. Tidak ada deploy atau Git push.

## Hasil verifikasi

Build: `npm.cmd run build` berhasil, TypeScript dan Vite exit 0. Browser final menguji hasil build pada `http://127.0.0.1:4173/galeri-proyek`.

| Viewport | Pemeriksaan | Hasil |
| --- | --- | --- |
| 320 × 740 | 8 | PASS |
| 390 × 844 | 8 | PASS |
| 430 × 932 | 8 | PASS |
| 768 × 1024 | 8 | PASS |
| 1024 × 768 | 8 | PASS |
| 1280 × 800 | 8 | PASS |
| 1440 × 900 | 8 | PASS |
| 1920 × 1080 | 8 | PASS |

Total **64/64 pemeriksaan lulus**. Tidak ditemukan overflow horizontal, teks keluar container, overlap foto, foto gagal dimuat atau pelanggaran axe pada state halaman yang diperiksa. Seluruh judul mempunyai jarak aman dari header; target filter minimal 44px. Console dan runtime bersih.

Setiap viewport memeriksa: elemen yang dihapus, hierarchy/layout, kategori dan foto yang dipertahankan, axe, kedua filter, keempat foto/lightbox, navigasi/konsultasi dan console. Lightbox diuji dengan tombol sebelumnya/berikutnya, ArrowLeft/ArrowRight, Tab focus loop, Escape dan focus return. Keyboard Space mengaktifkan filter. Navigasi mobile tetap menampilkan current page; entry konsultasi tetap membuka dan menutup dialog.

Visual review mencakup mobile 320/390, tablet 768 dan desktop 1440/1920; screenshot otomatis tersedia pada seluruh delapan ukuran. Pengujian memakai Chrome/Playwright dengan viewport dan touch emulation, bukan perangkat fisik atau Safari. Hasil axe bukan sertifikasi WCAG menyeluruh.

## Skill dan alasan desain

- **Impeccable:** distill dan craft floor; menghapus hierarki ganda, menyederhanakan wrapper dan menjaga H1 → H2.
- **Taste Skill:** equal edges, fokus pada foto yang sudah ada, satu sistem tipografi dan visual review. Instruksi hero/full-screen section dari kit tidak diterapkan karena brief ini secara eksplisit meminta hero dihapus dan perubahan dibatasi pada galeri. Gate otomatis kit tidak diklaim PASS.
- **UI UX Pro Max:** hierarchy heading, whitespace dan minimum gap/target filter; pencarian lokal `heading hierarchy spacing` digunakan.
- **Antislop DURING:** melanjutkan mode yang dipilih pengguna dalam percakapan; tidak menambah dekorasi, klaim, aset atau kontrol baru.

Reading this as: galeri dokumentasi konstruksi dengan visual Minimal Industrial, ENERGY 2 / RHYTHM 2 / MOTION 1. H1 menjadi orientasi utama, filter dibatasi pada nama layanan, dan foto menjadi konten utama. Motion hover dan interaksi lightbox tetap mengikuti implementasi yang ada.

## Delivery gate scoped

- PASS responsive: delapan ukuran tanpa overflow/overlap; seluruh filter minimal 44px.
- PASS aksesibilitas: heading berurutan, hidden live region, aria-pressed, axe 0 dan focus loop/return diuji.
- PASS fungsionalitas: kedua filter, seluruh foto dan tombol/keyboard lightbox bekerja pada delapan viewport.
- PASS integritas: kategori/count/foto tetap ada; Beranda, header dan konfigurasi tidak berubah berdasarkan hash.
- PASS purpose dan identitas: pengurangan elemen mengikuti brief; Barlow dan palet existing dipertahankan tanpa dekorasi pengganti.
- PASS gambar: sumber gambar tidak diubah, dimensi/srcset dipertahankan, gambar pertama diprioritaskan dan sumber asli tersedia dalam lightbox.
- PASS verifikasi: build, 64 pemeriksaan dan screenshot tersedia.

## Artefak dan reproduksi

- [Report JSON](gallery-minimal-20261111/after/report.json)
- [Screenshot mobile](gallery-minimal-20261111/after/gallery-390.png)
- [Screenshot tablet](gallery-minimal-20261111/after/gallery-768.png)
- [Screenshot desktop](gallery-minimal-20261111/after/gallery-1440.png)
- [Lightbox mobile](gallery-minimal-20261111/after/lightbox-390.png)
- [Baseline](gallery-minimal-20261111/before/)

```powershell
npm.cmd run build
# Jalankan preview lokal pada terminal tersendiri jika belum aktif.
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
$env:PJP_QA_URL='http://127.0.0.1:4173'
node scripts/gallery-refinement.mjs
```

Alat QA memakai Playwright dan axe yang sudah tersedia terpisah di `C:\Projects\PJP-Website-tools`; dependencies aplikasi tidak berubah.
