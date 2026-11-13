# Deployment Website Putra Jaya Pratama

## Lokasi produksi

- Cloudflare Pages: `putra-jaya-pratama`
- URL: https://putra-jaya-pratama.pages.dev
- GitHub: https://github.com/FarrelPahlevi/putra-jaya-pratama-website
- Branch: `main`
- Metode: Cloudflare Pages **Direct Upload**, bukan integrasi auto-deploy Git

## Publish versi terbaru

Pastikan source sudah ditinjau dan branch sesuai:

```cmd
git status
git pull origin main
npm.cmd ci
npm.cmd run build
```

Verifikasi file `dist/index.html`, `dist/galeri-proyek/index.html`, dan asset bundle terbuat.

Login Wrangler (jika belum autentikasi), lalu jalankan:

```cmd
npx.cmd wrangler login
npx.cmd wrangler pages deploy dist --project-name putra-jaya-pratama --branch main
```

Periksa kedua URL publik:

- https://putra-jaya-pratama.pages.dev/
- https://putra-jaya-pratama.pages.dev/galeri-proyek

Untuk rollback, deploy ulang build dari commit Git yang sebelumnya stabil.

## Catatan keamanan dan branding

- Jangan commit kredensial, token, atau file konfigurasi privat.
- Repository saat ini private; mengubah nama repo tidak mengubah visibilitasnya.
- Meta `robots` masih `noindex,nofollow` sampai kontak dan informasi usaha terverifikasi.
- Jangan menyebut situs sebagai sudah siap peluncuran penuh hanya karena Pages berhasil deploy.
- Dokumentasi lama tetap ada untuk keperluan audit historis.
