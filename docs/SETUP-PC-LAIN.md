# Panduan Pengembangan PJP di PC Lain

Panduan ini untuk melanjutkan pengembangan website **Putra Jaya Pratama** menggunakan source terbaru.

- GitHub: https://github.com/FarrelPahlevi/putra-jaya-pratama-website
- Website: https://putra-jaya-pratama.pages.dev
- Branch utama: `main`
- Stack: React, TypeScript, Vite, Tailwind CSS, Motion

## 1. Clone dan jalankan

Pasang Git dan Node.js yang kompatibel dengan proyek (GitHub Actions menggunakan Node 24). Pada CMD Windows:

```cmd
git clone https://github.com/FarrelPahlevi/putra-jaya-pratama-website.git
cd putra-jaya-pratama-website
npm.cmd ci
npm.cmd run dev
```

Buka URL lokal yang ditampilkan Vite.

```cmd
npm.cmd run build
npm.cmd run preview
```

Build juga membuat output SSR dan halaman statis untuk `/` serta `/galeri-proyek`. Folder `dist/` tidak disimpan di Git dan dapat dibuat ulang.

## 2. Melanjutkan perubahan pada repository yang sudah ada

```cmd
git pull origin main
npm.cmd ci
npm.cmd run dev
```

Pastikan `git status` bersih sebelum `pull`. Jika PC masih memakai URL repository lama, ubah remote:

```cmd
git remote set-url origin https://github.com/FarrelPahlevi/putra-jaya-pratama-website.git
```

## 3. Dokumen penting

- `DESIGN.md`: prinsip desain, typography Barlow, warna, dan komponen.
- `docs/PJP-MOTION-20261111.md`: sistem animasi scroll dan reduced motion.
- `docs/PJP-VISUAL-QA-20261113.md`: laporan visual QA terbaru.
- `docs/DEPLOYMENT.md`: cara membangun dan menerbitkan website.
- `src/`, `public/`, `scripts/`: source dan aset utama.

Screenshot QA penuh serta cache tool tidak ikut ke repository; laporan dan JSON pengujian tetap tersedia.

## 4. Codex dan skill (opsional)

Pasang Codex dan login menggunakan akun ChatGPT yang diizinkan:

```cmd
npm.cmd install -g @openai/codex@latest
codex
```

Skill desain yang digunakan: Antislop, Impeccable, UI UX Pro Max, dan Taste Skill. Plugin pihak ketiga harus dipasang kembali pada PC baru. File konfigurasi proyek dalam `.codex/` dan `.impeccable/` bukan pengganti instalasi binary skill.

Pengaturan model dan reasoning tidak ikut tersimpan dalam Git. Perangkat sebelumnya menggunakan GPT-6.1 Sol dengan reasoning `xhigh`.

## 5. Pengujian visual (opsional)

Skrip QA menggunakan Playwright, Chrome, dan axe-core. Siapkan dependency tooling pada folder saudara `../PJP-Website-tools` bila dibutuhkan:

```cmd
mkdir ..\PJP-Website-tools
npm.cmd install --prefix ..\PJP-Website-tools playwright @axe-core/playwright sharp
```

Jalankan `npm.cmd run preview` di terminal terpisah, lalu:

```cmd
set PJP_QA_URL=http://127.0.0.1:4173
node scripts/ui-audit.mjs
node scripts/ui-interactions.mjs
```

Script QA memiliki opsi output dan dapat menghasilkan laporan/screenshot baru. Jangan menganggap laporan terdahulu sebagai pengujian perubahan saat ini.

## 6. Deployment

GitHub **tidak otomatis men-deploy** Cloudflare Pages. Perubahan harus dibangun dan diunggah secara terpisah dengan Wrangler ke proyek `putra-jaya-pratama`. Ikuti [panduan deployment](DEPLOYMENT.md).

Jangan memasukkan `.env`, token, private key, cache Codex, maupun credentials Cloudflare ke Git.
