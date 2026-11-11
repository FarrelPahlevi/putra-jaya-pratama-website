# PJP: audit dan perbaikan copywriting

11 November 2026. Mode Antislop DURING, sesuai instruksi pengguna.

Copy pada homepage, `/galeri-proyek`, navigasi/footer bersama, formulir dan ringkasan konsultasi ditinjau dari source yang benar-benar dirender. Sebanyak **88 bagian teks diperbaiki**. Teks yang sudah jelas dipertahankan, termasuk nama navigasi, judul Galeri Proyek, beberapa label formulir dan kontrol foto.

[Tabel lengkap sebelum, sesudah dan alasan untuk 88 perubahan](copywriting-20261111/comparison.md) · [Data perubahan](copywriting-20261111/copy-changes.json)

## Arah bahasa dan temuan audit

Bahasa Indonesia yang sopan, langsung dan komunikatif. PJP berbicara sebagai kami kepada Anda; istilah teknis tetap dipakai ketika membantu menjelaskan pekerjaan. Tidak ada penambahan pengalaman, sertifikasi, jumlah proyek, harga, garansi atau testimoni.

Temuan awal:

- Headline memakai slogan dan ungkapan umum yang kurang menjelaskan jasa PJP.
- Sebagian deskripsi proses memakai kalimat pasif dan istilah yang terlalu abstrak.
- Deskripsi galeri membicarakan perubahan website, bukan foto yang bisa dilihat pengunjung.
- Nama CTA berbeda-beda untuk formulir yang sama. Mulai Konsultasi dapat menyiratkan percakapan langsung, sementara formulir hanya membuat ringkasan.
- Beberapa label dan pesan clipboard terasa teknis. Instruksi penyalinan manual sebelumnya lebih berorientasi pada keyboard.
- Nama gaya desain dan kata Preview/Demo muncul pada copy pengunjung; status pratinjau tetap perlu dijelaskan dengan bahasa yang lebih natural.

## Contoh perubahan

| Bagian | Sebelum | Sesudah | Alasan |
| --- | --- | --- | --- |
| Hero | Membangun jalan. Membuka akses. | Pengaspalan dan konstruksi jalan. | Menjelaskan jasa secara langsung, mengganti slogan. |
| Layanan | Berbagai kebutuhan. Satu mitra kerja. | Pekerjaan yang kami tangani. | Mengantar jenis pekerjaan yang memang ditawarkan. |
| Tentang Kami | Pekerjaan yang baik dimulai dari pemahaman. | Kami mulai dari kondisi lapangan. | Menyebut langkah nyata yang dijelaskan pada paragraf berikutnya. |
| Proses | Dari kebutuhan, hingga pelaksanaan. | Empat tahap pengerjaan proyek. | Mengacu pada empat tahap yang tersedia, termasuk pemeriksaan hasil. |
| CTA formulir | Mulai Konsultasi / Bahas Kebutuhan | Isi kebutuhan proyek | Menjelaskan aksi membuka dan mengisi formulir, tanpa mengesankan percakapan langsung. |
| Link galeri | Jelajahi Galeri Proyek | Lihat foto proyek | Lebih sederhana dan sesuai tujuan tautan. |
| Pengantar galeri di Beranda | Dokumentasi pekerjaan sekarang punya halaman tersendiri, tersusun berdasarkan jenis layanan agar lebih mudah dijelajahi. | Lihat dokumentasi pengaspalan dan pemadatan jalan, tersusun berdasarkan jenis pekerjaan. | Menjelaskan isi galeri, bukan riwayat pengembangan website. |
| Label formulir | Gambaran kebutuhan | Rencana pekerjaan | Lebih konkret dan sesuai informasi yang ingin ditulis calon pelanggan. |
| Validasi | Tulis gambaran kebutuhan minimal 12 karakter agar ringkasannya berguna. | Ceritakan rencana pekerjaan Anda dalam minimal 12 karakter. | Memberi instruksi perbaikan tanpa menilai tulisan pelanggan. |
| Pesan gagal salin | Clipboard otomatis tidak tersedia pada browser ini. Pilih teks di bawah lalu salin secara manual (Ctrl+C). | Penyalinan otomatis belum berhasil. Pilih teks ringkasan, lalu salin lewat menu perangkat atau tekan Ctrl+C. | Tidak menebak penyebab kegagalan; instruksinya berguna untuk ponsel maupun keyboard. |

## Enam layanan

| Sebelum | Sesudah | Keputusan |
| --- | --- | --- |
| Asphalt Hotmix | Pengaspalan hotmix | Menggunakan istilah pekerjaan dalam bahasa Indonesia. |
| Paving Block | Paving block | Mempertahankan istilah teknis dengan sentence case. |
| Cut and Fill | Cut and fill | Istilah teknis tetap dipakai. |
| Cor Beton | Cor beton | Penulisan lebih natural, maksud sama. |
| Saluran U-Ditch | Saluran U-Ditch | Sudah jelas dan tepat; dipertahankan. |
| Resapan Air | Resapan air | Penulisan diselaraskan dengan layanan lain. |

Halaman aktif menampilkan nama layanan dan ilustrasi, bukan paragraf deskripsi pada setiap kartu. Penamaan dan alt ilustrasi diperbaiki tanpa menambah paragraf atau mengubah layout. Field `summary`/`detailText` yang hanya dipakai komponen lama tidak ditulis ulang.

## Penerapan skill

Aturan inti [Antislop](C:/Users/MYCOMP/.codex/plugins/cache/anti-slop/antislop/3.2.28/skills/antislop/SKILL.md) digunakan bersama [antislop-copywriting](C:/Users/MYCOMP/.codex/plugins/cache/anti-slop/antislop/3.2.28/skills/antislop-copywriting/SKILL.md).

Putaran draft, audit dan final diterapkan pada copy, dengan dua pertanyaan pemeriksaan:

1. Apa yang masih terasa seperti tulisan AI? Slogan, ungkapan abstrak, kalimat pasif tanpa subjek serta metacopy pengembangan diganti. Panjang kalimat dibuat bervariasi; istilah teknis dan label yang sudah familiar tidak dipaksa menjadi sinonim lain.
2. Apakah ada fakta, nama, angka, tanggal atau klaim baru? Tidak. Empat tahap berasal dari empat item proses yang sudah ada, dan batas 12 karakter berasal dari validasi existing. Status kontak yang belum tersedia, formulir yang tidak mengirim pesan, dan keterangan izin publikasi foto dipertahankan dari source sebelumnya. Tidak ada detail proyek atau identitas pelanggan yang dikarang.

Copy dibaca sebagai percakapan kontraktor dengan calon pelanggan. Judul dan paragraf tetap mempunyai isi yang konkret; tidak ada buzzword pemasaran, metafora pengisi, em/en dash atau penekanan berlebihan dalam paragraf. Kapital pada merek dan label orientasi mengikuti hierarchy visual existing.

## Backup dan perlindungan scope

Backup sebelum perubahan: `C:\Projects\PJP-Website-backups\copywriting-20261111-153700`.

80 file source, public, script dan konfigurasi diverifikasi SHA-256. Dependency/generated folders, dokumentasi dan screenshot lama dikecualikan dari salinan tersebut.

Pemeriksaan AST memastikan struktur markup dan logika pada delapan file TypeScript/TSX yang disentuh tetap sama setelah isi teks dikesampingkan. Atribut non-copy, termasuk class, ID, href, role, label association, dimensi dan sumber gambar, tidak berubah. HTML hanya berubah pada judul dan meta description.

53 file yang dilindungi tetap identik berdasarkan hash, termasuk empat stylesheet, seluruh aset public, komponen arsip, App/main, DESIGN.md, Vite config dan package files. Export data yang tidak dipakai halaman aktif, serta deskripsi layanan arsip, tetap identik. Dalam data bersama, perubahan dibatasi pada nama layanan dan copy proses yang memang dirender oleh halaman aktif.

Tidak ada perubahan desain, gambar, susunan komponen atau fungsi. Pembungkusan baris mengikuti panjang teks baru dengan CSS yang sama. Tidak ada deployment atau git push.

## File yang diedit

| File | Isi perubahan |
| --- | --- |
| `src/MinimalIndustrial.tsx` | Hero, layanan, Tentang Kami, proses, pengantar galeri, kontak, CTA dan alt foto. |
| `src/SiteHeader.tsx` | Label buka/tutup menu, accessible name menu mobile dan CTA formulir. |
| `src/SiteFooter.tsx` | Deskripsi PJP, konteks konsultasi, status pratinjau dan CTA. |
| `src/GalleryPage.tsx` | Pengantar, filter/status, catatan foto, CTA, accessible name lightbox dan meta description. |
| `src/components/InquiryModal.tsx` | Petunjuk, label/placeholder, validasi, pesan salin, tombol dan teks ringkasan. |
| `src/data/mockData.ts` | Nama lima layanan dan copy empat tahap kerja; layanan keenam dan data arsip dipertahankan. |
| `src/data/projectGallery.ts` | Judul, caption dan alt tertentu agar lebih konkret. |
| `src/data/serviceIllustrations.ts` | Alt enam ilustrasi dengan bahasa yang lebih mudah dipahami. |
| `index.html` | Judul tab dan meta description dalam bahasa Indonesia. |
| `scripts/ui-audit.mjs` | Folder output per tugas, inventaris copy visible dan pencatatan console error. |
| `scripts/ui-interactions.mjs` | Memperbarui ekspektasi label dan folder output tanpa mengurangi assertion perilaku. |
| `scripts/gallery-refinement.mjs` | Memperbarui label filter/kategori/status/menu dan folder output. |
| `scripts/copy-review.mjs` | Verifikasi scope serta pembuatan tabel dari source sebelum/sesudah. |
| `docs/copywriting-20261111/` | Tabel lengkap, data perubahan, baseline, screenshot, hasil browser dan source verification. |
| `docs/PJP-COPYWRITING-20261111.md` | Laporan ini. |

Cache `.impeccable/hook.cache.json` diperbarui otomatis oleh hook editor. Konfigurasi hook/production tidak diubah.

## Pengujian

Build `npm.cmd run build` berhasil: TypeScript dan Vite exit 0. Browser menguji hasil build lokal melalui `http://127.0.0.1:4173/`.

| Kelompok | Lebar | Halaman/viewport | Hasil |
| --- | --- | --- | --- |
| Mobile | 320, 360, 390, 430px | 8 | PASS |
| Tablet | 768, 1024px | 4 | PASS |
| Desktop | 1280, 1440, 1920px | 6 | PASS |

18/18 kombinasi halaman/viewport lulus. Tidak ada overflow horizontal, teks keluar container, overlap foto, target terlalu kecil, gambar rusak, exception JavaScript atau console error yang terdeteksi. Axe tidak menemukan pelanggaran pada state yang diuji.

37/37 uji interaksi lulus, meliputi navigasi, skip link, formulir/validasi, clipboard berhasil dan ditolak, salin ulang, retensi isian, filter, seluruh foto/lightbox, arrow keys, Tab/Escape/focus return, touch swipe tersintesis, landscape, pembesaran teks 200% serta reduced/normal motion. Semua enam pilihan layanan juga diuji menghasilkan nama layanan dan isi ringkasan yang sesuai.

Visual review mencakup hero mobile/desktop, Tentang Kami, proses, galeri tablet serta formulir/hasil ringkasan. Screenshot otomatis tersedia pada seluruh viewport. Tidak diperlukan perubahan CSS untuk menampung copy baru.

Pengujian memakai Chrome 157 dan Playwright, bukan perangkat fisik atau Safari. Hasil axe bukan sertifikasi WCAG menyeluruh.

## Antislop delivery gate

- PASS R-02/R-16: tidak ada em/en dash atau buzzword yang diperiksa dalam 88 bagian copy baru; tabel bersumber langsung dari source.
- PASS R-15/R-26: CTA formulir konsisten Isi kebutuhan proyek, submit menyebut buat dan salin; semua pemicu/aksi diuji dan tidak mengklaim pesan terkirim.
- PASS R-17/R-18/R-36/R-38: tidak ada klaim bisnis baru atau statistik/testimoni rekaan. Angka empat tahap dan 12 karakter berasal dari data/logika existing.
- PASS R-23/R-37: arah suara berasal dari instruksi pengguna; tidak membuat aset atau mengganti arah visual. ENERGY 2 / RHYTHM 2 / MOTION 1 tetap mengikuti implementasi sebelumnya.
- PASS R-03/R-25/R-32/R-39: sembilan ukuran pada kedua halaman tanpa teks terpotong; axe dan keyboard/focus checks lulus.
- PASS R-27/R-34: validasi, loading/disabled copy, output dan kegagalan clipboard tetap tersedia. Surface terang/gelap memakai stylesheet yang sama; tidak menambah theme toggle.
- PASS R-33: teks UI diedit langsung pada source. Script laporan hanya membaca source dan menulis dokumentasi, tidak melakukan string replacement pada UI/CSS.
- PASS R-35/R-40: build dan browser checks tersedia; atribut/sumber gambar tetap sama dan tidak ada skor performa yang dikarang.
- PASS Purpose/Liveliness/Craftsmanship: copy menamai pekerjaan dan tindakan nyata; merek, kontras, hierarchy dan motion tidak ditambah atau diubah.
- PASS Copywriting checklist: tanpa fakta baru, slogan pengisi, perbandingan negatif berulang, formula aforisme, rentang palsu atau jargon pengantar. Actor dinyatakan saat diketahui; label teknis yang tepat dipertahankan.

## Bukti dan reproduksi

- [Perbandingan 88 bagian copy](copywriting-20261111/comparison.md)
- [Verifikasi source dan file terlindungi](copywriting-20261111/source-verification.json)
- [Matriks viewport](copywriting-20261111/after/report.json)
- [37 uji interaksi](copywriting-20261111/after/interactions.json)
- [Pemeriksaan enam layanan dan pesan formulir](copywriting-20261111/after/content-checks.json)
- [Hero mobile](copywriting-20261111/after/home-320-hero.png)
- [Hero desktop](copywriting-20261111/after/home-1440-hero.png)
- [Formulir](copywriting-20261111/after/form-390.png)
- [Ringkasan siap](copywriting-20261111/after/form-390-success.png)
- [Validasi](copywriting-20261111/after/form-390-validation.png)
- [Penyalinan manual](copywriting-20261111/after/form-390-copy-denied.png)

```powershell
npm.cmd run build
# Pada terminal tersendiri bila preview belum berjalan:
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
# Dari root proyek pada terminal lain:
$env:PJP_QA_URL='http://127.0.0.1:4173'
$env:PJP_QA_OUTPUT='docs/copywriting-20261111'
node scripts/ui-audit.mjs
node scripts/ui-interactions.mjs
node scripts/copy-review.mjs C:\Projects\PJP-Website-backups\copywriting-20261111-153700
```

Playwright/axe menggunakan alat QA terpisah yang sudah tersedia di `C:\Projects\PJP-Website-tools`. Dependencies aplikasi tetap sama.
