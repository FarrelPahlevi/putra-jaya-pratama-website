# Melanjutkan PJP di PC Lain

Repositori: https://github.com/FarrelPahlevi/pjp-website-glass

Desain aktif saat sinkronisasi 11 November 2026 adalah **PJP Minimal Industrial**, bukan Glassmorphism. Isi repository berasal dari source terbaru di PC pengembangan. Folder Git lama dipakai hanya sebagai tempat sinkronisasi agar riwayat commit tidak hilang.

## Jalankan website

Pasang Git dan Node.js 24 LTS (atau versi Node kompatibel dengan proyek). Di CMD Windows:

```cmd
git clone https://github.com/FarrelPahlevi/pjp-website-glass.git
cd pjp-website-glass
npm.cmd ci
npm.cmd run dev
```

Buka alamat localhost yang dicetak oleh Vite. Untuk memvalidasi:

```cmd
npm.cmd run build
npm.cmd run preview
```

## Kode dan dokumen

- `src/`, `public/`, `scripts/`, `index.html` dan berkas konfigurasi Vite/TypeScript adalah source terbaru.
- `DESIGN.md`, `docs/PJP-GALLERY-MINIMAL-20261111.md`, `docs/PJP-COPYWRITING-20261111.md` dan `docs/UI-UX-AUDIT-20261111.md` mencatat keputusan desain serta pekerjaan terkini.
- `.codex/hooks.json` dan `.impeccable/config.json` adalah konfigurasi proyek; plugin/skill Impeccable perlu dipasang ulang di PC baru agar hook dapat bekerja.
- `node_modules/`, `dist/`, `preview/`, file hasil screenshot QA yang besar, cache, plugin binaries, `.env` dan konfigurasi privat PC sengaja tidak disimpan di Git. Jalankan install/build untuk membuat ulang yang diperlukan.
- `docs/ui-ux-20261111/` di Git menyimpan ringkasan, keputusan, dan data JSON; screenshot sebelum/sesudah lengkap tetap di PC asal.

## Codex dan skill (opsional)

Sign in dengan akun ChatGPT yang sesuai pada PC baru setelah menginstal Codex CLI.

```cmd
npm.cmd install -g @openai/codex@latest
codex
```

Untuk memasang skill/plugin desain yang dipakai dalam pengembangan:

```cmd
npx.cmd impeccable install
npm.cmd install -g ui-ux-pro-max-cli
uipro init --ai codex
codex plugin marketplace add miqdadbadjuber/anti-slop
codex plugin add antislop@anti-slop
codex plugin marketplace add Leonxlnx/taste-skill
codex plugin add taste-skill@taste-skill
```

Saat installer Impeccable meminta pilihan, gunakan Codex dan cakupan Project. Jangan mengganti file desain atau menambah hooks otomatis tanpa memeriksa keadaan proyek. Di Windows PowerShell, gunakan launcher `.cmd` apabila skrip `.ps1` diblokir.

Model dan reasoning effort Codex adalah pengaturan akun/perangkat, bukan bagian dari repo ini. Setting sebelumnya adalah GPT-6.1 Sol dengan xhigh yang dipilih pengguna.

## Pengujian Playwright (opsional)

Skrip QA menggunakan dependensi yang dipasang di folder saudara `../PJP-Website-tools`, bukan di dependency aplikasi. Pada PC lain, buat folder itu dan pasang dependensi jika ingin menjalankan pengujian otomatis:

```cmd
mkdir ..\PJP-Website-tools
npm.cmd install --prefix ..\PJP-Website-tools playwright @axe-core/playwright sharp
```

Chrome harus tersedia untuk skrip yang menggunakan `channel: 'chrome'`. Jalankan preview terlebih dahulu pada `http://127.0.0.1:4173`, kemudian pada terminal CMD lain:

```cmd
set PJP_QA_URL=http://127.0.0.1:4173
node scripts/ui-audit.mjs
node scripts/ui-interactions.mjs
```

Uji ini menulis laporan/screenshot ke folder dokumentasi. Hasil audit lama dapat dilihat pada `docs/UI-UX-AUDIT-20261111.md`.

## Deployment

Push GitHub adalah sinkronisasi source, **bukan** deployment Cloudflare Pages. Proyek Cloudflare Pages sebelumnya menggunakan Direct Upload dan tidak otomatis dipublikasikan dari push GitHub. Tinjau desain dan uji sebelum deployment manual ke production.
