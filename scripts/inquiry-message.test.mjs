import test from 'node:test'
import assert from 'node:assert/strict'
import { CONTACT, getWhatsAppUrl } from '../src/config/contact.ts'
import { buildInquiryMessage, normalizeInquiry, validateInquiry, UNKNOWN_SERVICE, INQUIRY_LIMITS } from '../src/utils/inquiry.ts'
import { SERVICES_LIST } from '../src/data/mockData.ts'

const services = [UNKNOWN_SERVICE, ...SERVICES_LIST.map(service => service.title)]
const draft = { name: 'Budi', service: UNKNOWN_SERVICE, location: 'Bekasi', area: '', timing: '', details: '' }

test('official number and URL use international digits only', () => {
  assert.equal(CONTACT.whatsappNumber, '6281313884080')
  assert.match(CONTACT.whatsappNumber, /^\d+$/)
  assert.equal(CONTACT.whatsappDisplay.replace(/\D/g, ''), CONTACT.whatsappNumber)
  assert.equal(getWhatsAppUrl(), 'https://wa.me/6281313884080')
  assert.equal(getWhatsAppUrl('Halo PJP'), 'https://wa.me/6281313884080?text=Halo%20PJP')
})

test('required fields and all six existing services plus Belum yakin validate', () => {
  assert.equal(SERVICES_LIST.length, 6)
  for (const service of services) assert.deepEqual(validateInquiry({ ...draft, service }, services), {})
  assert.deepEqual(Object.keys(validateInquiry({ ...draft, name:'  ', location:'\t', service:'invalid' }, services)), ['name','service','location'])
})

test('empty optional fields are omitted and line breaks remain readable', () => {
  const message = buildInquiryMessage(draft)
  assert(message.startsWith('Konsultasi Proyek - Putra Jaya Pratama\n\nHalo,'))
  assert(message.includes('Nama: Budi\nJenis pekerjaan: Belum yakin / perlu konsultasi\nLokasi pekerjaan: Bekasi'))
  assert(!/Perkiraan luas:|Rencana pengerjaan:|Keterangan:|undefined|null|belum diisi/.test(message))
})

test('optional fields, Unicode and special characters survive URL encoding exactly once', () => {
  const message = buildInquiryMessage({ ...draft, name:'  E\u0301ko & "Tim" + #1 / 50% ', area:' 500 m² / 20 × 25 m ', timing:' setelah survei ', details:'Jalan akses & parkir.\r\nBeban > 5 ton; 50% rusak.' })
  assert(message.includes('Nama: Éko & "Tim" + #1 / 50%'))
  assert(message.includes('Perkiraan luas: 500 m² / 20 × 25 m\nRencana pengerjaan: setelah survei\nKeterangan: Jalan akses & parkir.\nBeban > 5 ton; 50% rusak.'))
  const href = getWhatsAppUrl(message)
  const url = new URL(href)
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/6281313884080')
  assert.equal(url.searchParams.size, 1)
  assert.equal(url.searchParams.get('text'), message)
  assert.equal(href, `https://wa.me/6281313884080?text=${encodeURIComponent(message)}`)
})

test('whitespace, control characters, bounds and malformed surrogate text are normalized safely', () => {
  const values = normalizeInquiry({ ...draft, name:' \u0000 Budi\t  Santoso ', location:' Bekasi\n Barat ', area:'   ', details:' A\r\n\r\n\r\n B\u0001\n\ud800 ' })
  assert.equal(values.name, 'Budi Santoso')
  assert.equal(values.location, 'Bekasi Barat')
  assert.equal(values.area, '')
  assert.equal(values.details, 'A\n\nB\n�')
  const bounded = normalizeInquiry({ ...draft, name:'A'.repeat(200), details:'x'.repeat(1500) })
  assert.equal(bounded.name.length, INQUIRY_LIMITS.name)
  assert.equal(bounded.details.length, INQUIRY_LIMITS.details)
  assert.doesNotThrow(() => getWhatsAppUrl(buildInquiryMessage({ ...draft, details:'\ud800🙂' })))
})
