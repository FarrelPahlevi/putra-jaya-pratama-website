GATE: OPEN 46 (rounds used up)

# Penilaian temuan Taste Skill

Run final menargetkan hasil build lokal pada port 4173. Tidak ada waiver yang diajukan dan file checker tidak diubah. Ini daftar seluruh 46 FAIL yang tetap berstatus OPEN pada gate, beserta keputusan terhadap brief. Pemeriksaan Playwright/axe/performa dilaporkan terpisah.

## 1. flush

Target: section#tentang > div.minimal-story__image > img "img: Dokumentasi pemadatan area pekerjaa"

Viewport: 1440px.

Temuan checker: its first line sits 0px under the top edge of section#tentang, where the ground changes

Penilaian: Foto full-bleed story memang bertemu tepi section sesuai DESIGN.md.

## 2. nav

Target: div.minimal-site > header.minimal-header > div.minimal-container.minimal-header__inner > a.minimal-brand "P . PUTRA JAYA PRATAMA"

Viewport: 1440, 390px.

Temuan checker: nav link wraps to a second line

Penilaian: Lockup merek sengaja dua baris. Link navigasi tetap satu baris dan memenuhi target sentuh.

## 3. nav

Target: div.minimal-site > header.minimal-header.minimal-header--scrolled > div.minimal-container.minimal-header__inner > a.minimal-brand "P . PUTRA JAYA PRATAMA"

Viewport: 1440, 390px.

Temuan checker: nav link wraps to a second line

Penilaian: Lockup merek sengaja dua baris. Link navigasi tetap satu baris dan memenuhi target sentuh.

## 4. no-visual

Target: section#proses "Dari kebutuhan, hingga pelaksanaan."

Viewport: 1440, 390px.

Temuan checker: no picture, effect or mock in this section; a feature section needs a visual

Penilaian: Section proses dan link galeri tetap berbasis informasi yang ada; tidak ditambah foto pengisi.

## 5. no-visual

Target: section#proyek "Lihat hasil kerja di lapangan."

Viewport: 1440, 390px.

Temuan checker: no picture, effect or mock in this section; a feature section needs a visual

Penilaian: Section proses dan link galeri tetap berbasis informasi yang ada; tidak ditambah foto pengisi.

## 6. text-only

Target: section#kontak "Ada rencana jalan yang perlu dikerjakan?"

Viewport: 1440, 390px.

Temuan checker: the closing section is only text: no picture, icon, mock or effect in it

Penilaian: CTA ringkas sesuai komposisi PJP dipertahankan.

## 7. button-styles

Target: (the page)

Viewport: 1440, 390px.

Temuan checker: 3 button styles on the page: soft, fill #b55514, outline #b55514 x1 ("Lihat Layanan"); soft, outline #ffffff x1 ("Bahas Kebutuhan"); soft, fill #151513 x1 ("Mulai Konsultasi")

Penilaian: Tiga varian kontekstual tercatat pada DESIGN.md: pumpkin, outline pada foto dan dark pada pumpkin.

## 8. copy-fact

Target: h1#minimal-hero-title "Membangun jalan. Membuka akses."

Viewport: 1440px.

Temuan checker: the first screen holds no number, price, date, place, platform or genre

Penilaian: Tidak menambah angka/harga/lokasi yang tidak diberikan demi memenuhi checker.

## 9. copy-headings

Target: h3#service-asphalt-hotmix "Asphalt Hotmix"

Viewport: 1440px.

Temuan checker: "Asphalt Hotmix" names no product, part, place or section (10 headings like it; at most one brand line per page) (and 9 more like it: "Paving Block", "Cut and Fill", "Cor Beton", "Resapan Air", ...)

Penilaian: Nama layanan Indonesia/teknis merupakan kategori bisnis nyata; kamus checker tidak mengenalinya.

## 10. centre-axis

Target: section#beranda > div.minimal-container.minimal-hero__content > div.minimal-kicker.minimal-kicker--light "PUTRA JAYA PRATAMA / KONSTRUKSI JALAN"

Viewport: 1440, 390px.

Temuan checker: centred text 21px right of the middle of its page (741px against 720px)

Penilaian: Kotak kicker termasuk garis dekoratif berada pada axis; checker hanya mengukur teks di dalamnya.

## 11. text-contrast

Target: section#layanan > div.minimal-container > div.minimal-section-heading.minimal-section-heading--center > p "Pekerjaan jalan dan area pendukungnya me"

Viewport: 1440, 390px.

Temuan checker: body text in #64615c on #f5f3ef reads 5.56:1 (needs 7:1)

Penilaian: Ambang skill adalah 7:1. Pasangan ini melampaui minimum AA 4.5:1 dan axe lulus.

## 12. text-contrast

Target: section#proses > div.minimal-container > div.minimal-section-heading.minimal-section-heading--center > p "Empat tahapan awal untuk menyamakan gamb"

Viewport: 1440, 390px.

Temuan checker: body text in #64615c on #f1eee9 reads 5.33:1 (needs 7:1)

Penilaian: Ambang skill adalah 7:1. Pasangan ini melampaui minimum AA 4.5:1 dan axe lulus.

## 13. text-contrast

Target: div.minimal-container > div.minimal-process__grid > article.minimal-process__step:nth-of-type(1) > p "Diskusikan jenis pekerjaan, gambaran are"

Viewport: 1440, 390px.

Temuan checker: body text in #625e58 on #f1eee9 reads 5.56:1 (needs 7:1)

Penilaian: Ambang skill adalah 7:1. Pasangan ini melampaui minimum AA 4.5:1 dan axe lulus.

## 14. text-contrast

Target: section#proyek > div.minimal-container.minimal-gallery-teaser__inner > div > p "Dokumentasi pekerjaan sekarang punya hal"

Viewport: 1440, 390px.

Temuan checker: body text in #68635d on #f3f0eb reads 5.23:1 (needs 7:1)

Penilaian: Ambang skill adalah 7:1. Pasangan ini melampaui minimum AA 4.5:1 dan axe lulus.

## 15. text-contrast

Target: section#kontak > div.minimal-container.minimal-contact__inner > div > p "Ceritakan kondisi area dan kebutuhan pek"

Viewport: 1440, 390px.

Temuan checker: body text in #ffffff on #a74f16 reads 5.57:1 (needs 7:1)

Penilaian: Ambang skill adalah 7:1. Pasangan ini melampaui minimum AA 4.5:1 dan axe lulus.

## 16. section-gaps

Target: section#proses / section#proyek

Viewport: 1440, 390px.

Temuan checker: 240px between these sections, +95% against the median 123px

Penilaian: Ritme section kontekstual dipertahankan; teaser sudah dipadatkan, tanpa memaksakan interval identik.

## 17. section-gaps

Target: section#proyek / section#kontak

Viewport: 1440px.

Temuan checker: 218px between these sections, +77% against the median 123px of gaps at a change of ground

Penilaian: Ritme section kontekstual dipertahankan; teaser sudah dipadatkan, tanpa memaksakan interval identik.

## 18. photo-upscale

Target: section#tentang > div.minimal-story__image > img "img: Dokumentasi pemadatan area pekerjaa"

Viewport: 1440px.

Temuan checker: road-roller-preview.webp: 720x540 shown at 720x803, blown up 1.49x

Penilaian: Foto story asli 1200x900 cukup untuk frame 720x803. Checker membaca naturalWidth yang sudah dikoreksi density srcset (720x540), bukan dimensi file asli.

## 19. focus-ring

Target: .focus\:outline-none:focus

Viewport: 1440px.

Temuan checker: ".focus\:outline-none:focus" in index-D1DVnOcB.css removes the focus outline and sets nothing in its place

Penilaian: Utility lama tidak digunakan pada kontrol aktif; outline-none section hanya untuk target non-interaktif. Semua kontrol aktif diuji ring dan Tab.

## 20. focus-ring

Target: .minimal-site :is(main, section)[tabindex="-1"]:focus

Viewport: 1440px.

Temuan checker: ".minimal-site :is(main, section)[tabindex="-1"]:focus" in index-D1DVnOcB.css removes the focus outline and sets nothing in its place

Penilaian: Utility lama tidak digunakan pada kontrol aktif; outline-none section hanya untuk target non-interaktif. Semua kontrol aktif diuji ring dan Tab.

## 21. focus-visible

Target: section#tentang > div.minimal-story__copy:nth-of-type(2) > div.minimal-story__copy-inner > button.minimal-text-button.minimal-text-button--light "Diskusikan pekerjaan"

Viewport: 1440px.

Temuan checker: Tab stop 10, button "Diskusikan pekerjaan": the focus lands on something you cannot see

Penilaian: Uji Tab normal motion pada seluruh kontrol aktif memverifikasi fokus berada di viewport, di bawah header, dan memiliki outline minimal 2px. Hasil heuristik tidak direproduksi.

## 22. focus-visible

Target: section#proyek > div.minimal-container.minimal-gallery-teaser__inner > a.minimal-gallery-teaser__link "Jelajahi Galeri Proyek"

Viewport: 1440px.

Temuan checker: Tab stop 11, a "Jelajahi Galeri Proyek": the focus lands on something you cannot see

Penilaian: Uji Tab normal motion pada seluruh kontrol aktif memverifikasi fokus berada di viewport, di bawah header, dan memiliki outline minimal 2px. Hasil heuristik tidak direproduksi.

## 23. focus-visible

Target: section#kontak > div.minimal-container.minimal-contact__inner > button.minimal-button.minimal-button--dark "Mulai Konsultasi"

Viewport: 1440px.

Temuan checker: Tab stop 12, button "Mulai Konsultasi": the focus lands on something you cannot see

Penilaian: Uji Tab normal motion pada seluruh kontrol aktif memverifikasi fokus berada di viewport, di bawah header, dan memiliki outline minimal 2px. Hasil heuristik tidak direproduksi.

## 24. focus-visible

Target: footer.minimal-footer > div.minimal-container.minimal-footer__main:nth-of-type(1) > div.minimal-footer__links:nth-of-type(2) > a:nth-of-type(1) "Beranda"

Viewport: 1440px.

Temuan checker: Tab stop 13, a "Beranda": the focus lands on something you cannot see

Penilaian: Uji Tab normal motion pada seluruh kontrol aktif memverifikasi fokus berada di viewport, di bawah header, dan memiliki outline minimal 2px. Hasil heuristik tidak direproduksi.

## 25. moment-none

Target: (the page)

Viewport: 1440px.

Temuan checker: a service page (--type) deals no moment: every kind carries one, two on a long page (moments.md)

Penilaian: MOTION 1 dari brief; entrance sekali dan hover yang ringan dipakai tanpa kit scroll moment.

## 26. section-height

Target: section#proyek "04 / DOKUMENTASI PROYEKLihat hasil kerja"

Viewport: 1440px.

Temuan checker: the section is 385px tall (0.4 screens), 515px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

Penilaian: Tinggi mengikuti isi yang responsif, tidak diwajibkan kelipatan layar pada DESIGN.md.

## 27. section-height

Target: div#root > div.minimal-site > footer.minimal-footer "P.PUTRA JAYAPRATAMAJasa pengaspalan, per"

Viewport: 1440px.

Temuan checker: the section is 463px tall (0.5 screens), 437px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

Penilaian: Tinggi mengikuti isi yang responsif, tidak diwajibkan kelipatan layar pada DESIGN.md.

## 28. section-height

Target: section#kontak "05 / KONSULTASIAda rencana jalanyang per"

Viewport: 1440px.

Temuan checker: the section is 477px tall (0.5 screens), 423px short of one screen (900px): every section after the hero is one screen or two, 2px either way (and 3 more like it: "01 / LAYANANBerbagai keb", "PROSES PENGERJAAN / DOKU", "03 / PROSES KERJADari ke") (SR-2)

Penilaian: Tinggi mengikuti isi yang responsif, tidak diwajibkan kelipatan layar pada DESIGN.md.

## 29. section-height

Target: section#tentang "PROSES PENGERJAAN / DOKUMENTASI02 / PEND"

Viewport: 1440px.

Temuan checker: the section starts at 2191px, 391px below the screen grid (2 x 900px): sections start on whole screens (SR-2)

Penilaian: Tinggi mengikuti isi yang responsif, tidak diwajibkan kelipatan layar pada DESIGN.md.

## 30. section-height

Target: section#proses "03 / PROSES KERJADari kebutuhan,hingga p"

Viewport: 1440px.

Temuan checker: the section starts at 2993px, 293px below the screen grid (3 x 900px): sections start on whole screens (SR-2)

Penilaian: Tinggi mengikuti isi yang responsif, tidak diwajibkan kelipatan layar pada DESIGN.md.

## 31. section-air

Target: section#proses > div.minimal-container > div.minimal-process__grid "01Konsultasi kebutuhanDiskusikan jenis p"

Viewport: 1440px.

Temuan checker: a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)

Penilaian: Garis pembatas proses merupakan pola industrial yang tercatat pada DESIGN.md.

## 32. one-section

Target: h2#minimal-contact-title "Ada rencana jalanyang perlu dikerjakan?"

Viewport: 1440px.

Temuan checker: the screen at scroll 4216px (the top of section 6) shows 390px of section 6 and the heading of section 6 whole and the content of 2 sections, over 24px each beside section 7: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

Penilaian: Tetangga section dapat terlihat saat scroll; tidak digunakan full-screen section snapping.

## 33. one-section

Target: section#layanan "01 / LAYANANBerbagai kebutuhan.Satu mitr"

Viewport: 1440px.

Temuan checker: the screen at scroll 1800px (stride 2) shows 303px of section 2 and the content of 2 sections, over 24px each beside section 3: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

Penilaian: Tetangga section dapat terlihat saat scroll; tidak digunakan full-screen section snapping.

## 34. one-section

Target: h2#minimal-gallery-teaser-title "Lihat hasil kerja di lapangan."

Viewport: 1440px.

Temuan checker: the screen at scroll 3831px (the top of section 5) shows 297px of section 5 and the heading of section 5 whole and the content of 2 sections, over 24px each beside section 6: a screen shows one section (another may peek 8px, 24px WARN) (and 4 more like it: scroll 3600px, scroll 2700px, scroll 2191px) (SR-4)

Penilaian: Tetangga section dapat terlihat saat scroll; tidak digunakan full-screen section snapping.

## 35. one-heading

Target: h2#minimal-contact-title "Ada rencana jalanyang perlu dikerjakan?"

Viewport: 1440px.

Temuan checker: headings of two sections show whole on one screen at 5 of 86 scroll positions (5.8%; at scroll 3650, 3700, 3750, 3800px), here with "Lihat hasil kerja di lapangan.": at most 3% on a desktop (SR-5)

Penilaian: Hierarki heading mengikuti isi; tidak diwajibkan satu heading untuk setiap screen tile.

## 36. container-edges

Target: section#tentang "PROSES PENGERJAAN / DOKUMENTASI02 / PEND"

Viewport: 1440px.

Temuan checker: the content of section 3 runs 0px from the left and 0px from the right (read from its outermost blocks: no .wrap): the page's container starts at 85px; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 37. container-edges

Target: div#root "Lewati ke kontenP.PUTRA JAYAPRATAMABeran"

Viewport: 1440px.

Temuan checker: a <div> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 38. container-edges

Target: section#beranda "PUTRA JAYA PRATAMA / KONSTRUKSI JALANMem"

Viewport: 1440px.

Temuan checker: the section needs exactly one in-flow child .wrap (it has 1 in-flow child, 0 .wrap) (and 9 more like it: "Dokumentasi pekerjaan pe", section#beranda > div.minimal-hero__shade, "PUTRA JAYA PRATAMA / KON") (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 39. container-edges

Target: section#beranda > div.minimal-hero__shade

Viewport: 1440px.

Temuan checker: a box runs 0-1440px, outside the container lines of section 1 at 85-1355px: full width is for background layers and grounds only (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 40. container-edges

Target: h2#minimal-story-title "Pekerjaan yang baik dimulai dari pemaham"

Viewport: 1440px.

Temuan checker: the h2 starts 793px right of the container's left: every h1 and h2 starts on it, 2px either way (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 41. container-edges

Target: h2#minimal-process-title "Dari kebutuhan,hingga pelaksanaan."

Viewport: 1440px.

Temuan checker: 1 text block starts on a left line at x 498, 413px from the container's left: text starts on the container's left, or on one split line (x 624, 732, 840) (and 7 more like it: "Dari kebutuhan,hingga pe", x 438, x 427) (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 42. container-edges

Target: h2#minimal-services-title "Berbagai kebutuhan.Satu mitra kerja."

Viewport: 1440px.

Temuan checker: "Berbagai kebutuhan.Satu mitra ke" is set centred across 1270px, over half the 1270px container: text that wide is set left (and 1 more like it: "Dari kebutuhan,hingga pe") (SR-6)

Penilaian: React root, container bernama minimal-container, story full-bleed serta heading centered/split adalah sistem PJP yang dipertahankan.

## 43. row-lines

Target: section#layanan > div.minimal-container > div.minimal-service-grid "Asphalt HotmixPaving BlockCut and FillCo"

Viewport: 1440px.

Temuan checker: a row of 3 items: its first item starts at 140px, the container's left line at 85px; its last item ends at 1300px, the container's right line at 1355px (2px either way) (SR-7)

Penilaian: Grid ilustrasi 1160px sengaja lebih sempit dan simetris di dalam container 1270px.

## 44. collide

Target: div#root > div.minimal-site > header.minimal-header "P . PUTRA JAYA PRATAMA"

Viewport: 390, 320px.

Temuan checker: at the top of the page the fixed bar covers the picture "img: Dokumentasi pekerjaan penga": nothing scrolls it out from under the bar

Penilaian: Header memang overlay di atas foto latar. Teks/CTA diberi padding dan tidak tertutup.

## 45. photo-upscale

Target: section#beranda > img.minimal-hero__image "img: Dokumentasi pekerjaan pengaspalan d"

Viewport: 390px.

Temuan checker: asphalt-access-preview-400.webp: 390x292 shown at 390x844, blown up 2.89x

Penilaian: Setelah run gate, sizes hero diperbaiki menjadi max(100vw,134svh); thumbnail 400px tidak lagi dipakai untuk cover hero portrait. Verifikasi akhir ada pada hero-source.json.

## 46. container

Target: page

Viewport: 1440, 390px.

Temuan checker: no .wrap

Penilaian: minimal-container menjalankan fungsi container; tidak diganti namanya menjadi .wrap demi checker.

## WARN dan copy-lint

Semua WARN yang dikembalikan checker disimpan tanpa dihapus pada JSON dan log. Copy bisnis pengguna tetap menjadi acuan; tidak ada harga, jam, alamat, nama perusahaan atau fakta yang diasumsikan.

```json
[
  {
    "check": "nav",
    "where": "div.minimal-site > header.minimal-header > div.minimal-container.minimal-header__inner > a.minimal-brand \"P . PUTRA JAYA PRATAMA\"",
    "msg": "the nav is lopsided: its first item starts 12px inside the content's edge (85px), while its last ends on the other edge",
    "fix": "start the nav's first item and end its last on the content's two edges",
    "widths": [
      1440,
      390
    ],
    "from": "consistency"
  },
  {
    "check": "copy-buttons",
    "where": "div#root > div.minimal-site > a.minimal-skip \"Lewati ke konten\"",
    "msg": "\"Lewati ke konten\" does not start with a verb (book, buy, try, start, get, see...) (and 3 more like it: \"Lihat Layanan\", \"Bahas Kebutuhan\", \"Mulai Konsultasi\")",
    "fix": "label buttons with a verb and what the visitor gets (\"Book a room\", \"Start free trial\")",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "copy-actions",
    "where": "(the page)",
    "msg": "the main action \"Mulai Konsultasi\" does not read word for word the same in the nav or hero",
    "fix": "few actions, one wording: at most 2 in the hero, the main action word for word in nav, hero and close",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "heading-scale",
    "where": "h2#minimal-services-title \"Berbagai kebutuhan. Satu mitra kerja.\"",
    "msg": "h2 headings in 4 sizes, 61.9px (\"Pekerjaan yang baik dimu\") to 74.9px (x1.21)",
    "fix": "size headings by level: the h1 largest, one size per level, each level below the one above",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "busy-ground",
    "where": "section#beranda > div.minimal-container.minimal-hero__content > div.minimal-kicker.minimal-kicker--light \"PUTRA JAYA PRATAMA / KONSTRUKSI JALAN\"",
    "msg": "text over a detailed part of a picture (its ground changes by 1.8 L* from one pixel to the next under the words) (and 3 more like it: \"Membangun jalan. Membuka\", \"Membuka akses.\", \"PROSES PENGERJAAN / DOKU\")",
    "fix": "move the text to a calm part of the picture, or put it on a panel",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "photo-set",
    "where": "section#beranda > img.minimal-hero__image \"asphalt-access-preview.webp\"",
    "msg": "7 photographs in more than one look: lightness from 0.20 to 0.80; the odd one out is asphalt-access-preview.webp",
    "fix": "grade the photographs to one look (light, colour, warmth), or replace the odd one out",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "nav-family",
    "where": "div#root > div.minimal-site > header.minimal-header.minimal-header--scrolled",
    "msg": "the nav changes form as the page scrolls: header.minimal-header gives way to header.minimal-header.minimal-header--scrolled",
    "fix": "keep one nav on every screen: the same bar, fill, links and type",
    "widths": [
      1440,
      390
    ],
    "from": "consistency"
  },
  {
    "check": "nav-labels",
    "where": "header.minimal-header > div.minimal-container.minimal-header__inner > nav.minimal-nav > a:nth-of-type(1) \"Beranda\"",
    "msg": "\"Beranda\" opens a section headed \"Membangun jalan. Membuka akses.\"",
    "fix": "name each nav link after the heading of the section it opens",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "nav-labels",
    "where": "header.minimal-header > div.minimal-container.minimal-header__inner > nav.minimal-nav > a:nth-of-type(2) \"Layanan\"",
    "msg": "\"Layanan\" opens a section headed \"Berbagai kebutuhan. Satu mitra kerja.\"",
    "fix": "name each nav link after the heading of the section it opens",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "nav-labels",
    "where": "header.minimal-header > div.minimal-container.minimal-header__inner > nav.minimal-nav > a:nth-of-type(4) \"Tentang Kami\"",
    "msg": "\"Tentang Kami\" opens a section headed \"Pekerjaan yang baik dimulai dari pemahaman.\"",
    "fix": "name each nav link after the heading of the section it opens",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "nav-labels",
    "where": "header.minimal-header > div.minimal-container.minimal-header__inner > nav.minimal-nav > a:nth-of-type(5) \"Kontak\"",
    "msg": "\"Kontak\" opens a section headed \"Ada rencana jalan yang perlu dikerjakan?\"",
    "fix": "name each nav link after the heading of the section it opens",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "link-styles",
    "where": "section#proyek > div.minimal-container.minimal-gallery-teaser__inner > a.minimal-gallery-teaser__link \"Jelajahi Galeri Proyek\"",
    "msg": "text links in 3 looks: border 1px, bold (1, like \"Jelajahi Galeri Proy\"); no line, regular (5, like \"Beranda\"); no line, bold (1, like \"KEMBALI KE ATAS ↑\")",
    "fix": "give text links one look wherever they sit: one underline, one weight",
    "widths": [
      1440,
      390
    ],
    "from": "consistency"
  },
  {
    "check": "stranded-action",
    "where": "section#kontak > div.minimal-container.minimal-contact__inner > button.minimal-button.minimal-button--dark \"Mulai Konsultasi\"",
    "msg": "stands 433px across from the nearest text of its block (\"Ada rencana jalan yang perlu d\")",
    "fix": "put the button under or beside the text it belongs to",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "visual-caption",
    "where": "section#tentang > div.minimal-story__image > span \"PROSES PENGERJAAN / DOKUMENTASI\"",
    "msg": "a small 10px line is laid over the lower half of the picture road-roller-preview.webp: \"PROSES PENGERJAAN / DOKUMENTASI\"; no caption or description under any image, render or visual (house rule)",
    "fix": "take the line away: no caption or description under, over or on any image, render or visual; a licence credit goes in one footer line",
    "widths": [
      1440,
      390
    ],
    "from": "consistency"
  },
  {
    "check": "skip-link",
    "where": "div#root > div.minimal-site > a.minimal-skip \"Lewati ke konten\"",
    "msg": "the first Tab stop is \"Lewati ke konten\", not a skip link: a keyboard user tabs through the whole nav on every visit",
    "fix": "add the starter's skip link as the header's first child: <a class=\"skip-link\" href=\"#top\">Skip to content</a>",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "share-meta",
    "where": "head",
    "msg": "the head lacks og:title, og:description, og:image, twitter:card: a shared link shows no picture or title of its own",
    "fix": "copy the head block of starter.html: og tags, twitter:card, the icon and theme-color (references/system.md, Head)",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "section-air",
    "where": "section#layanan / section#tentang",
    "msg": "115px of air between the content of these two sections: 128-480px (64-600px WARN) (every gap out of the band at 1440px, top to bottom: 115px after \"01 / LAYANANBerbagai\", 123px after \"PROSES PENGERJAAN / \") (SR-3)",
    "fix": "keep 128-480px of air between the content of neighbouring sections (112-420px on a phone): the sections' padding (--padt, --padb)",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "section-air",
    "where": "section#tentang / section#proses",
    "msg": "123px of air between the content of these two sections: 128-480px (64-600px WARN) (SR-3)",
    "fix": "keep 128-480px of air between the content of neighbouring sections (112-420px on a phone): the sections' padding (--padt, --padb)",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "section-air",
    "where": "section#proyek \"04 / DOKUMENTASI PROYEKLihat hasil kerja\"",
    "msg": "the content fills 42.3% of the section's height (163 of 385px): 55% or more (40% WARN) (SR-3)",
    "fix": "fill the section to 55%: more content, a picture or a background layer, or merge it into the section above as its last block",
    "widths": [
      1440
    ],
    "from": "consistency"
  },
  {
    "check": "cta",
    "where": "section#layanan \"Berbagai kebutuhan. Satu mitra kerja.\"",
    "msg": "a section over 1.5 screens long with no link or button in it",
    "fix": "add the action: a button in the hero, one on every priced item, one in the closing section",
    "widths": [
      390
    ],
    "from": "consistency"
  },
  {
    "check": "off-grid",
    "where": "section#tentang > div.minimal-story__image > span \"PROSES PENGERJAAN / DOKUMENTASI\"",
    "msg": "left edge at 22px, 2px off the page margin at 20px (31 elements, none of them near it)",
    "fix": "move it onto the page margin, or the column edge its section uses",
    "widths": [
      390
    ],
    "from": "consistency"
  },
  {
    "check": "busy-ground",
    "where": "section#tentang > div.minimal-story__image > span \"PROSES PENGERJAAN / DOKUMENTASI\"",
    "msg": "text over a detailed part of a picture (its ground changes by 2.7 L* from one pixel to the next under the words)",
    "fix": "move the text to a calm part of the picture, or put it on a panel",
    "widths": [
      390
    ],
    "from": "consistency"
  },
  {
    "check": "photo-set",
    "where": "section#beranda > img.minimal-hero__image \"asphalt-access-preview-400.webp\"",
    "msg": "7 photographs in more than one look: lightness from 0.22 to 0.80; the odd one out is asphalt-access-preview-400.webp",
    "fix": "grade the photographs to one look (light, colour, warmth), or replace the odd one out",
    "widths": [
      390
    ],
    "from": "consistency"
  },
  {
    "check": "copy-two-fragment",
    "msg": "two-fragment headings \"X. Y.\": 2, budget 1",
    "fix": "spend it once where it lands hardest; give the other headings a plain label, a claim or the thing they name (references/copy-tells.md)",
    "widths": [],
    "from": "copy",
    "where": "copy x2: \"Membangun jalan. Memb...\", \"Berbagai kebutuhan. S...\"",
    "exact": false
  },
  {
    "check": "copy-numbered",
    "msg": "7 step numbers",
    "fix": "number only steps that happen in order (references/copy-tells.md)",
    "widths": [],
    "from": "copy",
    "where": "(the copy)",
    "exact": false
  }
]
```
