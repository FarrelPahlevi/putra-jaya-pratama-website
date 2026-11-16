export const CONTACT = {
  whatsappNumber: '6281313884080',
  whatsappDisplay: '+62 813-1388-4080',
} as const

export function getWhatsAppUrl(message = '') {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
