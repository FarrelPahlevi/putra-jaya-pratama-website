/**
 * Tambahkan foto baru di sini, lalu pilih salah satu serviceId dari SERVICES_LIST.
 * Saat suatu kategori memiliki foto, filter layanan akan muncul otomatis.
 * Jangan mengarang detail pekerjaan, tanggal atau lokasi proyek.
 */
export type ProjectPhoto = {
  id: string
  serviceId: string
  title: string
  image: string
  alt: string
  caption: string
}

export const PROJECT_PHOTOS: ProjectPhoto[] = [
  {
    id: 'aspal-01',
    serviceId: 'asphalt-hotmix',
    title: 'Akses jalan beraspal',
    image: '/assets/pjp-preview/asphalt-road-preview.webp',
    alt: 'Jalan beraspal di antara pepohonan',
    caption: 'Dokumentasi hasil perkerasan jalan',
  },
  {
    id: 'aspal-02',
    serviceId: 'asphalt-hotmix',
    title: 'Penanganan permukaan',
    image: '/assets/pjp-preview/asphalt-access-preview.webp',
    alt: 'Area akses jalan dengan pekerjaan pengaspalan',
    caption: 'Dokumentasi pekerjaan area akses',
  },
  {
    id: 'aspal-03',
    serviceId: 'asphalt-hotmix',
    title: 'Tahap pemadatan',
    image: '/assets/pjp-preview/road-roller-preview.webp',
    alt: 'Alat road roller di area pekerjaan jalan',
    caption: 'Dokumentasi pemadatan di lapangan',
  },
  {
    id: 'aspal-04',
    serviceId: 'asphalt-hotmix',
    title: 'Jalan dan lingkungan',
    image: '/assets/pjp-preview/tree-lined-road-preview.webp',
    alt: 'Akses jalan yang dikelilingi pepohonan',
    caption: 'Dokumentasi permukaan akses jalan',
  },
]
