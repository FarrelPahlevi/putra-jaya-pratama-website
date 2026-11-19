# PJP: audit fungsi dan floating WhatsApp — 19 November 2026

## Ruang lingkup
Pemeriksaan workspace lokal `C:\Projects\PJP-Website` pada Beranda dan Galeri Proyek. Tidak ada push GitHub atau deploy Cloudflare Pages.

## Ringkasan versi yang ditemukan
- Konsep A Industrial Editorial sudah menjadi bagian homepage, dengan lightbox foto asli, konsultasi, footer compact, WhatsApp dan Instagram.
- Hero sudah memakai headline `Pengaspalan dan konstruksi jalan` tanpa tanda titik; label Tentang Kami menjadi `02 / TENTANG KAMI`; WhatsApp berwarna hijau.
- Repository Git terpisah di `C:\Projects\PJP-Repository` belum mencatat perubahan lokal terbaru (HEAD terakhir `2e93366`, 17 Nov).

## Penyebab bug dan perbaikan
- `src/components/FloatingWhatsApp.tsx` sebelumnya memasang IntersectionObserver pada container `[data-avoid-floating-contact]` yang berukuran besar. Ketika container berada di sudut kanan bawah viewport, `overlapsContent=true` menyetel `data-blocked=true`, membuat widget hilang selama scrolling.
- Observer tersebut dihapus. Widget tetap terlihat untuk scroll biasa, namun tetap disembunyikan saat form, lightbox atau menu blocking dibuka dan dipulihkan sesudah ditutup.
- Pada `src/components/floating-whatsapp.css`, shortcut berubah menjadi ikon bulat pada viewport <=1199px agar tidak menutupi link layanan di tablet; pada desktop lebar, label teks tetap tersedia. Saat footer tampak, perilaku ringkas sebelumnya tetap ada.

## Verifikasi
- Baseline homepage: tersembunyi 6 dari 39 sampel (390px), 7/30 (768px), 9/27 (1440px). Setelah perbaikan: masing-masing 0; Galeri juga 0 untuk ketiga ukuran.
- Build lokal `npm.cmd run build`: berhasil, termasuk TypeScript, Vite client/SSR dan prerender dua halaman.
- `scripts/ui-interactions.mjs`: 37/37 lulus. Meliputi menu mobile, form konsultasi, validasi, clipboard, tombol layanan, navigasi, gallery filter dan lightbox, keyboard, reduced motion, overflow pada kasus khusus.
- `scripts/floating-whatsapp-audit.mjs`: 95/97 lulus pada server development, tanpa tabrakan link footer. Dua tes tanpa JS gagal karena Vite development mengirim HTML mount kosong, bukan HTML prerender; diuji kembali pada build lokal port 4173, WhatsApp terlihat dengan JS dimatikan pada Beranda dan Galeri.
- `scripts/functional-coverage-20261119.mjs`: 6 kombinasi Beranda/Galeri x 390/768/1440px, 0 pelanggaran axe WCAG terdeteksi, 0 JS page error, 0 horizontal overflow, 0 broken internal anchors; WhatsApp dan Instagram sesuai URL resmi.
- `scripts/interactive-collision-review-20261119.mjs`: link layanan di tablet tidak lagi bertabrakan setelah WhatsApp dibuat ringkas. Widget fixed tetap dapat menutupi *sebagian sudut foto* (fotografi berfungsi sebagai tombol besar); tombol foto dapat diakses di area lain. Tidak ada collision link footer pada suite floating.
- Tes lama `scripts/ui-audit.mjs` berhenti karena masih mencari section `#proses` yang dihapus pada redesign sebelumnya. Tes lama `scripts/whatsapp-audit.mjs` memakai beberapa selector lama/ambigu dan dihentikan setelah diverifikasi lewat suite interaksi terbaru. Ini batasan test harness, bukan bukti regresi produk baru.

## File, bukti, dan rollback
- Source yang diubah: `src/components/FloatingWhatsApp.tsx`, `src/components/floating-whatsapp.css`.
- Backup utuh kedua file sebelum modifikasi: `C:\Projects\PJP-Website-backups\whatsapp-scroll-20261119-104134`.
- Bukti pengujian: `docs/whatsapp-scroll-review-20261119/` (before.json, after.json, after-tablet-compact.json, interactive-collisions.json, full-functional.json, functional/report.json, hasil UI).
- Rollback manual: salin kedua file dari folder backup ke lokasi source masing-masing dan jalankan `npm.cmd run build`.

## Batas pemeriksaan
Browser QA memakai Chrome headless dengan viewport simulasi. Tidak menguji ponsel fisik, Safari/Firefox, atau perilaku Cloudflare production terbaru. Tidak ada pesan WhatsApp sungguhan dikirim.
