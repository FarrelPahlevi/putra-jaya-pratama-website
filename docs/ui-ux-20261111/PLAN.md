# PJP UI/UX audit dan responsive redesign

Jenis: website jasa pengaspalan dan konstruksi jalan, dua halaman aktif.

Acuan: DESIGN.md. Pertahankan konten bisnis, Barlow / Barlow Semi Condensed, pumpkin, charcoal, warm paper, ilustrasi layanan, foto dan seluruh fungsi yang sudah tersedia. Tidak ada deployment, push, atau perubahan konfigurasi production.

Reading this as: situs jasa konstruksi untuk calon pemilik proyek, dengan bahasa visual Minimal Industrial; ENERGY 2 / RHYTHM 2 / MOTION 1.

Voice: bahasa Indonesia PJP yang sudah tersedia, langsung dan profesional. Perubahan teks dibatasi pada label, validasi, status dan aksesibilitas; tidak menambah klaim.

## Backup

`C:\Projects\PJP-Website-backups\ui-ux-20261111-135757`

51 file source dan public diverifikasi SHA-256 sebelum perubahan. Salinan proyek mengecualikan node_modules, dist, paket skill .agents, serta output pemeriksaan .taste-skill.

## Scope dan tahapan

1. Baseline kedua rute, sembilan viewport, screenshot penuh, axe dan regresi interaksi formulir.
2. Fondasi: satu gutter dan lebar konten, tipografi fluid, logo sejajar, target 44px, fokus, feedback pointer dan reduced motion.
3. Halaman: hero, layanan, story, proses, CTA, footer, grid dan filter galeri; navigasi mobile serta dialog konsultasi/lightbox.
4. Playwright: 18 kombinasi rute/viewport, keyboard, input touch tersintesis, clipboard berhasil/ditolak, validasi, zoom teks, landscape, reduced motion; visual review dan build.

## Temuan baseline

| Prioritas | Temuan terverifikasi | Penyebab dan perbaikan |
| --- | --- | --- |
| P1 | Foto galeri bertabrakan pada 320, 360, 390, 430 | Feature min-height 340px melebihi grid-auto-rows 285px. Gunakan grid auto dengan aspect ratio pada mobile. |
| P1 | Fokus formulir tetap di halaman, Tab keluar dialog, Escape tidak mengembalikan fokus | Overlay div tanpa manajemen fokus. Ganti dengan dialog native dan pemulihan fokus. |
| P1 | Label form tidak terkait dengan field; select tanpa accessible name | Tambahkan htmlFor/id, label output, asosiasi error dan fokus field invalid. |
| P1 | Kontras CTA dan filter gagal axe pada seluruh lebar | Gunakan foreground yang cukup kontras; hapus opacity angka filter. |
| P2 | 7–10 kontrol per halaman kurang dari 44px | Ukuran logo/toggle, text action dan footer. Tambahkan area interaksi serta jarak yang konsisten. |
| P2 | Menu dapat membiarkan fokus masuk ke konten belakang, tidak menutup saat resize desktop | Scroll lock, inert background, siklus fokus dan media-query listener. |
| P2 | Gutter story tablet berbeda dari container dan copy lebih sempit | Gunakan token gutter bersama dan batas lebar yang sama. |
| P2 | Dot pada brand keluar dari kotak | Grid menempatkan P dan span dot dalam baris terpisah. Pakai inline flex. |
| P2 | Lightbox ponsel memiliki kontrol 39px, footer padat, gesture vertikal dianggap swipe | Minimum 44px, footer stack, deteksi arah serta touch cancel. |
| P3 | Hero tinggi tetap dan type/spacing tidak konsisten antarlebar | Ukuran fluid berbasis viewport dan ruang aman, tetap tumbuh untuk layar pendek. |

Baseline: 18/18 tanpa overflow horizontal dan tanpa gambar rusak; 4/4 grid mobile overlap; semua halaman memiliki satu kategori pelanggaran axe color-contrast. Lihat `before/report.json` dan `before/interactions.json`.

## Alasan desain

- Pumpkin dan Barlow dipertahankan untuk identitas industrial PJP; ukuran dan kontras diperbaiki untuk keterbacaan.
- Foto tetap square-edged, ilustrasi layanan tetap terbuka tanpa kartu, dan galeri tetap image-only sesuai DESIGN.md.
- Container maksimum dan gutter simetris menyatukan header, isi, CTA serta footer; story full-bleed tetap menjadi variasi komposisi.
- Tipografi fluid menghindari heading terlalu besar pada 320px maupun copy terlalu lebar pada 1920px.
- Fokus, state aktif dan area sentuh dipertegas agar kontrol bekerja dengan keyboard, mouse serta touch.
- Gerak dibatasi pada entrance hero sekali dan hover/press sebagai umpan balik; tidak menambahkan parallax, autoplay atau animasi scroll.
- Bentuk dialog dan filter yang tercatat di DESIGN.md dipertahankan; dialog memerlukan fokus terlindungi untuk menyusun ringkasan.

## Penerapan skill dan pengecualian brief

- Impeccable: context, audit/adapt/craft-floor/polish, pemeriksaan teknis dan visual. Label orientasi yang sudah tercatat pada DESIGN.md tetap dipertahankan sesuai brief pengguna.
- UI UX Pro Max: prioritas aksesibilitas, target sentuh, reflow dan reduced motion; pencarian `keyboard focus modal` (ux) dan `state effects` (react) digunakan sesuai hasil yang relevan.
- Taste Skill: satu sistem, equal edges, fotografi nyata yang sudah tersedia, hierarki dan feedback. Tidak mengganti merek/font dengan hasil deal acak, memasukkan kit, mengubah copy bisnis, memaksa seluruh section menjadi kelipatan layar, atau mengganti fungsi konsultasi dengan mailto; batas ini mengikuti brief mempertahankan DESIGN.md dan fungsi. Pemeriksaan browser/Playwright tetap digunakan karena diminta eksplisit pengguna.
- Antislop: mode DURING dipilih pengguna; purpose, data nyata, kontrol berfungsi, fokus, kontras, responsive dan delivery gate.

Komponen lama di `src/components` yang tidak diimpor oleh entrypoint aktif adalah arsip implementasi, bukan halaman yang dapat dikunjungi; tidak diaktifkan atau dihapus dalam redesign ini. `InquiryModal` adalah komponen aktif dari folder tersebut.
