# PJP — Floating WhatsApp Selalu Terlihat

**Tanggal:** 13 November 2026
**Status:** implementasi dan audit lokal selesai, **belum di-push atau deploy**

## Masalah yang ditemukan

Implementasi sebelumnya memakai ambang scroll 360/250px, penundaan collision 160ms, dan observer untuk melindungi teks serta tautan kontak. Pemeriksaan Chrome lokal mereproduksi tombol yang awalnya tersembunyi, kemudian bisa menghilang lagi di tengah atau akhir halaman. Hal ini membuat jalur WhatsApp terasa tidak konsisten.

## Perbaikan

1. Floating WhatsApp sekarang **terlihat sejak HTML pertama kali ditampilkan** di Beranda dan Galeri, tanpa menunggu scroll atau animasi masuk.
2. Tombol tetap terlihat pada seluruh posisi scroll dan menggunakan nomor resmi dari `src/config/contact.ts`.
3. Tombol disembunyikan sementara ketika modal konsultasi, lightbox, atau menu mobile terbuka, lalu muncul lagi ketika overlay ditutup.
4. Menghapus mekanisme scroll/collision yang berlebihan beserta file `src/components/floatingWhatsAppVisibility.ts` yang sudah tidak dipakai.
5. Mempertahankan ukuran, warna, ikon, hover, focus ring, dan safe-area responsif. Tidak ada dependency baru.
6. Menambah ruang footer bawah agar tombol tetap terlihat **tanpa bertabrakan** dengan tautan "Kembali ke atas", termasuk di mobile.
7. Menambahkan pengaman apabila `MutationObserver` tidak tersedia. Tanpa JavaScript, link tetap hadir pada HTML hasil prerender.

## File yang berubah

- `src/components/FloatingWhatsApp.tsx`: logika visibility disederhanakan, tidak tergantung scroll.
- `src/components/floating-whatsapp.css`: visibilitas langsung; hanya disembunyikan ketika overlay aktif.
- `src/minimal-industrial.css`: ruang aman bagian bawah footer.
- `scripts/floating-whatsapp-audit.mjs`: audit baru untuk aturan selalu terlihat, modal, menu, lightbox, click-to-chat, dan footer.
- `src/components/floatingWhatsAppVisibility.ts`: dihapus karena tidak digunakan lagi.

## Pengujian

**97/97 pemeriksaan Playwright lulus** pada Beranda dan Galeri di 320, 360, 390, 430, 768, 1024, 1280, 1440 dan 1920px.

- Tombol terlihat pada saat halaman pertama kali dibuka.
- Tetap terlihat pada scroll awal, tengah, dan posisi paling bawah.
- Hidden/inert saat dialog, lightbox, dan menu mobile aktif; normal kembali setelah ditutup.
- Tujuan `https://wa.me/6281313884080` benar; tautan diuji memakai intercept (tidak mengirim WhatsApp sungguhan).
- Tanpa error JavaScript atau horizontal overflow pada matriks pengujian.
- Link floating tetap terlihat pada kedua route walaupun JavaScript dimatikan.
- **0 benturan dengan tautan footer** pada posisi halaman paling bawah.
- TypeScript, Vite client, SSR, dan prerender kedua route berhasil dibuild.

Bukti: `docs/floating-always-visible-20261113/report.json`. Screenshot awal mobile/desktop berada di folder yang sama.

## Backup dan rollback

Backup file sebelum perubahan:

`C:\Projects\PJP-Website-backups\floating-always-visible-20261113-1559`

File komponen, CSS floating, helper lama, script audit, dan CSS footer disalin ke sana dengan hash diverifikasi sebelum diubah.

Untuk rollback, salin kembali setiap file dari folder backup ke path relatif yang sama pada `C:\Projects\PJP-Website`, lalu jalankan:

```cmd
cd /d C:\Projects\PJP-Website
npm.cmd run build
```

**Catatan:** PJP masih menggunakan repository GitHub dan deployment Cloudflare yang terpisah dari folder source ini. Perubahan ini **hanya lokal** sampai ada instruksi untuk commit, push, dan deploy.
