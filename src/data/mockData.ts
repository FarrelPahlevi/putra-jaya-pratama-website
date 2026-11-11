import type { NavLink, ServiceItem, ProcessStep, ProjectItem } from '../types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Galeri Proyek', href: '/galeri-proyek' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Kontak', href: '#kontak' },
]

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'asphalt-hotmix',
    title: 'Pengaspalan hotmix',
    metaCode: '01 / HOTMIX',
    summary: 'Pelapisan permukaan menggunakan campuran aspal panas untuk kebutuhan jalan dan area kendaraan.',
    detailText: 'Pekerjaan perkerasan menggunakan campuran aspal panas. Informasi seperti kondisi dasar, ketebalan rencana, luas area, dan penggunaan jalan perlu dievaluasi sebelum penawaran.',
    iconGlyph: '▰▰▰',
  },
  {
    id: 'paving-block',
    title: 'Paving block',
    metaCode: '02 / PAVING',
    summary: 'Pemasangan perkerasan modular untuk area parkir, halaman, akses lingkungan, dan area luar bangunan.',
    detailText: 'Pekerjaan perkerasan dengan elemen paving modular. Perlu mempertimbangkan beban kendaraan, susunan lapisan dasar, elevasi, dan drainase area.',
    iconGlyph: '▦',
    isBricks: true,
  },
  {
    id: 'cut-and-fill',
    title: 'Cut and fill',
    metaCode: '03 / EARTHWORK',
    summary: 'Pekerjaan pemotongan dan penimbunan tanah untuk menyiapkan elevasi dan kondisi lahan.',
    detailText: 'Pemotongan dan penimbunan tanah untuk membentuk elevasi lahan. Volume, kontur, kondisi tanah, serta pemadatan memengaruhi metode pekerjaan.',
    iconGlyph: '⌁',
  },
  {
    id: 'cor-beton',
    title: 'Cor beton',
    metaCode: '04 / CONCRETE',
    summary: 'Pekerjaan perkerasan beton untuk kebutuhan permukaan kuat sesuai perencanaan dan fungsi area.',
    detailText: 'Pembuatan perkerasan beton dengan spesifikasi yang disesuaikan fungsi dan beban area. Detail desain, tebal, tulangan/sambungan, dan curing harus direncanakan.',
    iconGlyph: '▤',
  },
  {
    id: 'saluran-u-ditch',
    title: 'Saluran U-Ditch',
    metaCode: '05 / DRAINAGE',
    summary: 'Pemasangan elemen saluran drainase untuk membantu mengalirkan air di area proyek.',
    detailText: 'Pekerjaan pemasangan elemen drainase berbentuk U untuk menyalurkan air. Ukuran saluran serta kemiringan perlu disesuaikan dengan kondisi dan kebutuhan aliran.',
    iconGlyph: '∪',
  },
  {
    id: 'resapan-air',
    title: 'Resapan air',
    metaCode: '06 / WATER',
    summary: 'Solusi fasilitas resapan untuk membantu pengelolaan limpasan air sesuai kebutuhan dan kondisi lokasi.',
    detailText: 'Fasilitas pendukung infiltrasi atau pengelolaan air. Pendekatan konstruksi harus mempertimbangkan kondisi tanah, muka air dan kebutuhan setempat.',
    iconGlyph: '◉',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Pembahasan awal',
    description: 'Ceritakan pekerjaan yang dibutuhkan dan hasil yang Anda harapkan. Sampaikan juga kondisi lokasi yang Anda ketahui.',
  },
  {
    number: '02',
    title: 'Rencana kerja',
    description: 'Kami menilai data lapangan yang diperlukan, lalu menyusun cara pengerjaan sesuai kondisi lokasi.',
  },
  {
    number: '03',
    title: 'Pengerjaan di lapangan',
    description: 'Kami mengerjakan proyek sesuai rencana dan cakupan pekerjaan yang sudah disepakati bersama.',
  },
  {
    number: '04',
    title: 'Pemeriksaan hasil',
    description: 'Kami memeriksa hasil pekerjaan bersama Anda, mengacu pada target dan persyaratan yang sudah disepakati.',
  },
]

export const EQUIPMENT_TAGS: string[] = [
  'ASPHALT FINISHER',
  'ROAD ROLLER',
  'COMPACTOR',
  'DUMP TRUCK',
]

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'photo-aspal-akses',
    title: 'Dokumentasi permukaan area akses',
    kind: '01 / FOTO PENGASPALAN',
    category: 'aspal',
    categoryLabel: 'FOTO REFERENSI',
    image: '/assets/pjp-preview/asphalt-access-preview.webp',
    isWide: true,
    needsReview: true,
    sourceFilename: 'IMG-20261012-WA0052.jpg',
  },
  {
    id: 'photo-jalan-beraspal',
    title: 'Permukaan jalan beraspal',
    kind: '02 / FOTO PENGASPALAN',
    category: 'aspal',
    categoryLabel: 'FOTO REFERENSI',
    image: '/assets/pjp-preview/asphalt-road-preview.webp',
    needsReview: true,
    sourceFilename: 'IMG-20261014-WA0248.jpg',
  },
  {
    id: 'photo-pemadatan',
    title: 'Aktivitas pemadatan area kerja',
    kind: '03 / FOTO PENGERJAAN',
    category: 'aspal',
    categoryLabel: 'FOTO REFERENSI',
    image: '/assets/pjp-preview/road-roller-preview.webp',
    needsReview: true,
    sourceFilename: 'IMG-20261012-WA0035.jpg',
  },
  {
    id: 'demo-saluran',
    title: 'Saluran air & U-Ditch',
    kind: '04 / ILUSTRASI DRAINASE',
    category: 'drainase',
    categoryLabel: 'ILUSTRASI DEMO',
    image: '/assets/drainage.svg',
  },
  {
    id: 'demo-beton',
    title: 'Perkerasan permukaan beton',
    kind: '05 / ILUSTRASI BETON',
    category: 'beton',
    categoryLabel: 'ILUSTRASI DEMO',
    image: '/assets/concrete.svg',
  },
]

export const COMPANY_INFO = {
  name: 'Putra Jaya Pratama',
  tagline: 'Solusi Konstruksi Jalan',
  phone: '[Placeholder: Nomor Telepon Resmi PJP]',
  whatsapp: '[Placeholder: WhatsApp Resmi PJP]',
  email: '[Placeholder: info@putrajayapratama.co.id]',
  address: '[Placeholder: Alamat Kantor PJP]',
  workingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
  legalNotice: '[Placeholder: Legalitas Perusahaan Sedang Dalam Proses Verifikasi]',
}

export const WHY_CHOOSE_US = [
  {
    id: '1',
    title: 'Material Hotmix Standar Bina Marga',
    description: 'Material aspal diproduksi langsung dari AMP resmi dengan pengawasan suhu terjaga.',
    icon: () => null,
    badge: 'Standar SNI',
  },
  {
    id: '2',
    title: 'Armada & Alat Berat Siap Pakai',
    description: 'Didukung peralatan konstruksi terawat untuk pekerjaan tepat waktu.',
    icon: () => null,
    badge: 'Unit Siap Kerja',
  },
  {
    id: '3',
    title: 'Transparansi Volume & Ketebalan',
    description: 'Pengukuran terbuka bersama dan kesiapan uji core drill lapangan.',
    icon: () => null,
    badge: 'Integritas',
  },
  {
    id: '4',
    title: 'Pengerjaan Cepat & Rambu K3',
    description: 'Metode terencana dengan pengalihan rambu lalu lintas yang tertib.',
    icon: () => null,
    badge: 'Keselamatan',
  },
  {
    id: '5',
    title: 'Garansi Mutu Paska Pekerjaan',
    description: 'Komitmen pemeliharaan dan jaminan mutu serah terima.',
    icon: () => null,
    badge: 'Garansi',
  },
]

export const EQUIPMENT_LIST = [
  {
    id: 'asphalt-paver',
    name: 'Asphalt Paver (Finisher)',
    category: 'Penghampar',
    description: 'Unit utama penghampar material aspal panas dengan screed otomatis.',
    role: 'Penghamparan aspal hotmix utama.',
    specs: [{ label: 'Kategori', value: 'Asphalt Paver' }],
    image: '/assets/hero-road.svg',
    badgeText: 'Presisi Gelaran',
  },
]
