import React from 'react'
import { motion } from 'motion/react'
import { Award, Clock, Shield, Target, TrendingUp, Users } from 'lucide-react'
import type { FeatureItem } from '../types'

const FEATURES: FeatureItem[] = [
  {
    id: '1',
    title: 'Standar Kualitas Unggul',
    description: 'Setiap proses dan hasil kerja dikerjakan dengan standar kontrol kualitas yang ketat demi kepuasan pelanggan.',
    icon: Award,
  },
  {
    id: '2',
    title: 'Tim Berpengalaman',
    description: 'Didukung oleh tenaga ahli profesional yang kompeten dan berdedikasi tinggi di bidangnya.',
    icon: Users,
  },
  {
    id: '3',
    title: 'Keamanan & Keandalan',
    description: 'Menjaga kepatuhan dan keandalan operasional untuk menjamin keamanan setiap proyek dan kemitraan.',
    icon: Shield,
  },
  {
    id: '4',
    title: 'Tepat Waktu',
    description: 'Manajemen proyek yang terstruktur memastikan setiap komitmen selesai tepat waktu sesuai jadwal.',
    icon: Clock,
  },
  {
    id: '5',
    title: 'Fokus pada Solusi',
    description: 'Pendekatan yang fleksibel dan berorientasi pada kebutuhan unik dari setiap rekan bisnis kami.',
    icon: Target,
  },
  {
    id: '6',
    title: 'Inovasi Berkelanjutan',
    description: 'Terus mengadopsi teknologi dan metode modern untuk memberikan efisiensi yang optimal.',
    icon: TrendingUp,
  },
]

export const Features: React.FC = () => {
  return (
    <section id="layanan" className="py-20 bg-slate-900/50 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400">
            Keunggulan Kami
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mengapa Memilih Putra Jaya Pratama?
          </p>
          <p className="mt-4 text-base text-slate-400">
            Komitmen kami adalah memberikan nilai tambah nyata bagi setiap mitra melalui keunggulan layanan dan integritas.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:border-blue-500/50 hover:bg-slate-800/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
