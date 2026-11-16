export const UNKNOWN_SERVICE = 'Belum yakin / perlu konsultasi'

export const INQUIRY_LIMITS = {
  name: 80,
  service: 80,
  location: 120,
  area: 100,
  timing: 100,
  details: 900,
} as const

export type InquiryFields = Record<keyof typeof INQUIRY_LIMITS, string>
export type InquiryErrors = Partial<Record<'name' | 'service' | 'location', string>>

function normalize(value: string, maxLength: number, multiline = false) {
  const clean = value.normalize('NFC').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '')
  const spaced = multiline
    ? clean.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).join('\n').replace(/\n{3,}/g, '\n\n')
    : clean.replace(/\s+/g, ' ')
  // Repair isolated UTF-16 surrogates so URL encoding cannot fail on pasted text.
  return Array.from(spaced.trim()).slice(0, maxLength).map(character =>
    character.length === 1 && /[\ud800-\udfff]/.test(character) ? '\ufffd' : character,
  ).join('')
}

export function normalizeInquiry(fields: InquiryFields): InquiryFields {
  return Object.fromEntries(Object.entries(INQUIRY_LIMITS).map(([key, max]) => [
    key, normalize(fields[key as keyof InquiryFields], max, key === 'details'),
  ])) as InquiryFields
}

export function validateInquiry(fields: InquiryFields, services: readonly string[]): InquiryErrors {
  const values = normalizeInquiry(fields)
  return {
    ...(!values.name ? { name: 'Isi nama atau penanggung jawab pekerjaan.' } : {}),
    ...(!services.includes(values.service) ? { service: 'Pilih jenis pekerjaan atau Belum yakin.' } : {}),
    ...(!values.location ? { location: 'Isi lokasi pekerjaan, misalnya kawasan atau kota.' } : {}),
  }
}

export function buildInquiryMessage(fields: InquiryFields) {
  const values = normalizeInquiry(fields)
  return [
    'Konsultasi Proyek - Putra Jaya Pratama',
    '',
    'Halo, saya ingin konsultasi mengenai pekerjaan konstruksi.',
    '',
    `Nama: ${values.name}`,
    `Jenis pekerjaan: ${values.service}`,
    `Lokasi pekerjaan: ${values.location}`,
    ...(values.area ? [`Perkiraan luas: ${values.area}`] : []),
    ...(values.timing ? [`Rencana pengerjaan: ${values.timing}`] : []),
    ...(values.details ? [`Keterangan: ${values.details}`] : []),
    '',
    'Mohon informasi lebih lanjut mengenai pekerjaan tersebut. Terima kasih.',
  ].join('\n')
}
