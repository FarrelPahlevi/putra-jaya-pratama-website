export const FIELD_PHOTOS = [
  { archive: '112', width: 1400, height: 2490, label: 'Permukaan jalan', alt: 'Permukaan jalan aspal di antara pepohonan, dokumentasi asli PJP arsip 112', position: '50% 57%' },
  { archive: '035', width: 1400, height: 787, label: 'Pekerjaan di lapangan', alt: 'Tim lapangan mengerjakan permukaan aspal dengan alat perata, arsip PJP 035', position: '50% 50%' },
  { archive: '142', width: 1280, height: 960, label: 'Pemadatan aspal', alt: 'Alat pemadat Sakai pada permukaan jalan aspal, arsip PJP 142', position: '50% 58%' },
  { archive: '198', width: 1400, height: 1050, label: 'Pengaspalan area', alt: 'Pekerja dan alat pemadat di area pengaspalan, arsip PJP 198', position: '50% 50%' },
] as const

export type FieldPhoto = typeof FIELD_PHOTOS[number]
export const photoPath = (photo: FieldPhoto, size?: 400 | 700) => `/assets/project-gallery/${photo.archive}${size ? `-${size}` : ''}.webp`
