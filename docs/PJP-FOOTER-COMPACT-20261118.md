# PJP footer compact dan Instagram

Tanggal: 18 November 2026. Implementasi langsung di `C:\Projects\PJP-Website`.

## Hasil

- CTA besar “Punya Proyek Jalan?”, deskripsi, dan tombol konsultasi bagian atas dihapus seluruhnya.
- Signature “Konstruksi jalan”, ornamen garis jalan, dan wordmark raksasa bagian bawah dihapus seluruhnya.
- CSS kedua area, aturan breakpoint, hover CTA, dan atribut motion yang terkait dihapus. `container-type` yang hanya mendukung tipografi besar juga dihapus.
- Empat kelompok informasi tetap tersedia: identitas, navigasi, enam layanan, dan kontak. Copyright serta “Ke atas” tetap tersedia.
- `@jasa_aspalhotmix_official` ditempatkan tepat setelah WhatsApp. Link menggunakan `target="_blank"`, `rel="noopener noreferrer"`, nama aksesibel, hover garis bawah, dan focus ring.
- URL dan username Instagram berada pada `CONTACT.instagramUrl` dan `CONTACT.instagramUsername`.
- Versi `lucide-react` terpasang tidak mengekspor `Instagram`. Ikon menggunakan SVG inline 18px, stroke 1.6, tanpa dependensi tambahan.
- Observer footer dipertahankan karena masih mengecilkan floating WhatsApp saat footer masuk viewport. Jalur aman di sisi kanan mencegah tumpang tindih pada seluruh posisi scroll footer.

## File

Source yang diubah:

- `src/SiteFooter.tsx`
- `src/site-footer.css`
- `src/config/contact.ts`

QA baru: `scripts/footer-compact-audit.mjs`. Bukti visual dan JSON: `docs/footer-compact-20261118/before/` dan `after/`.

Smoke test form tambahan: `docs/footer-compact-20261118/inquiry-smoke.mjs` dan hasil `inquiry-smoke.json`.

Backup sebelum pengeditan:

`C:\Projects\PJP-Website-backups\footer-instagram-20261118-095217\src\`

Backup memuat ketiga file source di atas, dengan struktur `config/contact.ts` dipertahankan.

## Responsivitas dan tinggi

Pengukuran Chrome headless pada homepage dan `/galeri-proyek` menghasilkan angka identik karena keduanya menggunakan `SiteFooter` yang sama. Tinggi mengikuti konten; tidak ada fixed height.

| Lebar | Kolom sesudah | Tinggi sebelum | Tinggi sesudah | Pengurangan |
| --- | --- | --- | --- | --- |
| 390px | 1 | 1447px | 1068px | 26% |
| 768px | 2 | 1197px | 729px | 39% |
| 1024px | 4 | 1203px | 455px | 62% |
| 1440px | 4 | 1151px | 455px | 60% |

Tidak ada overflow horizontal pada kedelapan kombinasi viewport/route. Seluruh target footer minimal 44px. Captures konteks menggunakan tinggi viewport 900px; capture footer panjang mobile menambah tinggi viewport agar fixed header tidak masuk ke tengah hasil screenshot.

## Verifikasi

- PASS: `npm.cmd run build`, termasuk TypeScript strict, client build, SSR build, serta prerender kedua route.
- PASS: `node scripts/footer-compact-audit.mjs`, 68 pemeriksaan, 0 gagal. Bukti lengkap: `footer-compact-20261118/after/report.json`.
- PASS: `node --test scripts/inquiry-message.test.mjs`, 5 pengujian, 0 gagal, termasuk nomor resmi dan encoding pesan.
- PASS: `node docs/footer-compact-20261118/inquiry-smoke.mjs`, 4 skenario pada 320/1440px di kedua route: validasi wajib, handoff WhatsApp yang dicegat, tautan fallback, fallback clipboard ditolak, dan overflow footer. Tidak ada pesan dikirim.
- PASS: seluruh navigasi footer, logo, enam pilihan layanan, form umum, pengembalian fokus dialog, “Ke atas”, urutan Tab dan aktivasi Enter/Escape.
- PASS: tautan WhatsApp dan Instagram membuka tujuan yang diberikan di tab baru. Tujuan eksternal dicegat oleh QA; tidak ada pesan yang dikirim dan isi akun Instagram tidak diperiksa.
- PASS: audit axe pada footer di kedua route dan keempat lebar, termasuk contrast dan nama aksesibel, 0 pelanggaran WCAG A/AA yang terdeteksi.
- PASS: collision sweep pada setiap kontrol footer saat disejajarkan dengan floating WhatsApp, 0 tumpang tindih.
- PASS: hover Instagram, smooth back-to-top, reduced motion, serta fallback tanpa IntersectionObserver.
- PASS: 0 console error dan 0 uncaught exception selama audit footer.
- PASS: review kode independen terhadap ketiga file dan backup, tanpa temuan yang menghalangi.
- PASS: inspeksi visual langsung capture keempat viewport; charcoal, Barlow, dan pumpkin dipertahankan.

Fokus section homepage diuji untuk navigasi dalam halaman. Untuk navigasi dari galeri, QA memeriksa URL dan posisi section setelah pemuatan homepage; perilaku fokus existing saat perpindahan dokumen tidak diubah.

## Antislop delivery gate untuk lingkup footer

Arah: footer layanan konstruksi untuk calon pelanggan PJP, Minimal Industrial. ENERGY 1 / RHYTHM 1 / MOTION 1: kelompok stabil, informasi mudah dipindai, gerak hanya sebagai feedback kontrol. Brief pengguna dan implementasi existing menjadi acuan.

- R-02 PASS: tidak ada em dash pada copy footer.
- R-03 PASS: 8 kombinasi viewport/route tanpa overflow; seluruh kontrol tetap dalam viewport.
- R-17 PASS: tidak menambahkan statistik atau klaim bisnis.
- R-18 PASS: tidak menambahkan testimonial.
- R-23 PASS: penambahan Instagram dan ikon diminta pengguna; logo existing dipertahankan.
- R-24 PASS: lima tujuan navigasi dan logo diklik pada kedua route di keempat viewport.
- R-25 PASS: axe tidak menemukan pelanggaran contrast footer pada 8 render.
- R-26 PASS: 16 kontrol footer memiliki `href` atau handler; navigasi, kontak, form, dan back-to-top diuji.
- R-27 PASS: footer berisi data statis; keadaan dialog existing dipertahankan dan buka/tutup diuji.
- R-28 PASS: tidak menambahkan FAQ.
- R-32 PASS: Tab berurutan, focus ring, Enter untuk form, dan Escape untuk dialog diuji.
- R-33 PASS: implementasi pada source React/CSS, tanpa runtime patch.
- R-34 PASS: tidak menambah theme toggle atau tema baru.
- R-35 PASS: build berhasil dan 68 pemeriksaan browser selesai.
- R-36 PASS: angka tinggi berasal dari bounding rectangle pada browser; tidak melaporkan skor performa yang tidak diukur.
- R-37 PASS: arah warna, tipografi, struktur, dan pengurangan dekorasi mengikuti brief pengguna dan sistem existing.
- R-38 PASS: kontak Instagram berasal dari pengguna; informasi perusahaan existing dipertahankan.
- R-39 PASS: kontrol native dan nama aksesibel, cursor existing, focus ring, hover underline, dan reduced motion diverifikasi.
- R-40 PASS: tidak menambah media berat atau script pihak ketiga; SVG memiliki dimensi eksplisit.
- R-01/R-07/R-09/R-10/R-12/R-13/R-14/R-22 PASS: tidak menambah gradient, grid dekoratif, badge, blur, shadow, glow, card, atau ilustrasi.
- R-04 PASS: ikon Instagram mengidentifikasi kontak sosial; ikon arah existing menunjukkan form dan kembali ke atas.
- R-06 PASS: Barlow mengikuti identitas industrial PJP; condensed dipakai untuk nomor WhatsApp utama.
- R-08 PASS: ikon panah dipertahankan hanya pada form dan “Ke atas”; tidak ditambahkan pada seluruh link.
- R-19 PASS: tidak menambah animasi masuk; feedback hover singkat dan reduced motion tetap berlaku.
- Liveliness PASS: nomor WhatsApp menjadi fokus kontak, pumpkin pada pemicu form, kelompok dipisahkan spacing, identitas Barlow dan logo PJP tetap terbaca.
- C-1/C-2/C-3/C-4/C-5 PASS: keputusan mengikuti kebutuhan informasi; kontrol berfungsi; tidak ada blok pengisi atau klaim baru; ukuran layar dan keyboard diuji.
- R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 PASS: empat kelompok sesuai brief dan isi PJP; tanpa card/pill baru, buzzword, tema baru, warna tambahan, atau peniruan desain lain.

## Batas perubahan dan preview

Header, homepage, galeri, komponen floating WhatsApp, nomor telepon, form, dan sistem motion global tidak diedit. Tidak ada push GitHub, deployment Cloudflare Pages, atau perubahan konfigurasi production.

- Homepage: http://localhost:5173/
- Galeri: http://localhost:5173/galeri-proyek

Hasil Taste Skill gate global dicatat terpisah pada `footer-compact-20261118/taste-gate.txt`; gate tersebut memeriksa keseluruhan homepage, lebih luas daripada lingkup footer tugas ini.

## Taste Skill global gate

Status terukur: **GATE: FAIL 59 (round 2 of 3)**, 24 WARN. Ini bukan hasil audit footer 68/68 di atas. Seluruh temuan yang masih terbuka ada di `footer-compact-20261118/taste-gate.txt` dan JSON terstruktur `.taste-skill/gate/consistency/report.json`.

Run pertama pada dev server tidak dapat memuat script React Refresh. Run kedua memakai `dist/index.html --root dist`, sehingga membaca HTML yang sudah diprerender. Profil Chrome dalam folder proyek menyebabkan Vite di Windows berhenti dengan `EBUSY` pada file Cookies; profil sementara dipindahkan ke `C:\Users\MYCOMP\AppData\Local\Temp\pjp-footer-chrome-20261118` setelah gate selesai, lalu dev server dinyalakan kembali. Konfigurasi Vite tidak diubah.

Temuan gate tidak diterapkan secara otomatis karena lingkup tugas dan brief pengguna:

- Aturan section satu layar menganggap footer 455px terlalu pendek dan menyarankan fixed height 900px. Ini bertentangan langsung dengan footer compact yang tingginya mengikuti konten.
- `row-lines` menganggap inset kanan 11px pada desktop salah; inset ini mempertahankan jalur aman floating WhatsApp. Collision sweep footer lulus pada seluruh viewport yang diminta.
- `scroll-reveal` footer menunjuk transisi **color** pada link yang ter-hover saat checker menggulir, bukan animasi masuk. Footer tidak lagi memiliki atribut motion; observer hanya memperbarui ukuran shortcut WhatsApp.
- `phone-number` menandai nomor resmi yang secara eksplisit diminta pengguna untuk dipertahankan.
- Temuan lain mencakup header, hero, section layanan/tentang/proyek/kontak, global motion, tombol floating di luar footer, aturan nama class `.wrap`, dan sistem spacing satu layar. Source terkait tidak diedit sesuai batas tugas.

Tidak ada waiver yang ditambahkan dan tidak ada perubahan pada script skill untuk meloloskan gate. Footer dinilai menggunakan brief, audit browser terarah, axe, build, review kode, dan pemeriksaan visual. Gate global tidak diklaim lulus.
