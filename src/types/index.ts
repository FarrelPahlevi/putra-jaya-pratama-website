import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
}

export interface ServiceItem {
  id: string
  title: string
  metaCode: string
  summary: string
  detailText: string
  iconGlyph: string
  isBricks?: boolean
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ProjectItem {
  id: string
  title: string
  kind: string
  category: 'aspal' | 'drainase' | 'beton'
  categoryLabel: string
  image: string
  isWide?: boolean
  needsReview?: boolean
  sourceFilename?: string
}

export interface ConsultationFormData {
  name: string
  service: string
  location: string
  details: string
}

// Backward compatibility interfaces
export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface EquipmentItem {
  id: string
  name: string
  category: string
  description: string
  role: string
  specs: { label: string; value: string }[]
  image: string
  badgeText: string
}

export interface BenefitItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  badge: string
  highlight?: string
}
