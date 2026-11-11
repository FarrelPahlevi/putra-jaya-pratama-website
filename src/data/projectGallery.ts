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
  width: number
  height: number
  alt: string
  caption: string
}

export const PROJECT_PHOTOS: ProjectPhoto[] = [
  {
    id: 'aspal-01',
    serviceId: 'asphalt-hotmix',
    title: 'Akses jalan beraspal',
    image: '/assets/pjp-preview/asphalt-road-preview.webp',
    width: 900,
    height: 1600,
    alt: 'Jalan beraspal di antara pepohonan',
    caption: 'Hasil pekerjaan perkerasan jalan.',
  },
  {
    id: 'aspal-02',
    serviceId: 'asphalt-hotmix',
    title: 'Pengaspalan area akses',
    image: '/assets/pjp-preview/asphalt-access-preview.webp',
    width: 1200,
    height: 900,
    alt: 'Area akses jalan dengan pekerjaan pengaspalan',
    caption: 'Pekerjaan pengaspalan di area akses.',
  },
  {
    id: 'aspal-03',
    serviceId: 'asphalt-hotmix',
    title: 'Pemadatan jalan',
    image: '/assets/pjp-preview/road-roller-preview.webp',
    width: 1200,
    height: 900,
    alt: 'Road roller di area pekerjaan jalan.',
    caption: 'Pemadatan jalan menggunakan road roller.',
  },
  {
    id: 'aspal-04',
    serviceId: 'asphalt-hotmix',
    title: 'Permukaan jalan akses',
    image: '/assets/pjp-preview/tree-lined-road-preview.webp',
    width: 650,
    height: 1156,
    alt: 'Akses jalan yang dikelilingi pepohonan',
    caption: 'Kondisi permukaan jalan akses.',
  },
]

export const projectPhotoSrcSet = (photo: ProjectPhoto) => [
  `${photo.image.replace('.webp', '-400.webp')} 400w`,
  ...(photo.width > 700 ? [`${photo.image.replace('.webp', '-700.webp')} 700w`] : []),
  `${photo.image} ${photo.width}w`,
].join(', ')
