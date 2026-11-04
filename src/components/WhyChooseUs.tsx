import React from 'react'
import { motion } from 'motion/react'
import {
  ShieldCheck,
  Truck,
  FileCheck2,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { WHY_CHOOSE_US } from '../data/mockData'
import { useMotionConfig } from '../utils/motion'

export const WhyChooseUs: React.FC = () => {
  const { staggerItem } = useMotionConfig()

  return (
    <section id="keunggulan" className="py-24 bg-[#0c0d10] relative border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">
            Keunggulan Utama
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Mengapa Mempercayakan Jalan Anda ke <br />
            <span className="text-yellow-400">Putra Jaya Pratama?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Memilih kontraktor aspal bukan sekadar mencari harga termurah per meter persegi,
            melainkan memastikan ketebalan riil, kepadatan pondasi, dan komitmen garansi saat serah terima.
          </p>
        </div>

        {/* Bento Composition Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: SNI & Material (Span 7) */}
          <motion.div
            {...staggerItem(0)}
            className="md:col-span-7 rounded-3xl border border-zinc-800 bg-[#121418] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-yellow-400/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
                </div>
                <span className="rounded-full bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 text-[11px] font-bold text-yellow-400 uppercase">
                  {WHY_CHOOSE_US[0].badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mt-6 tracking-tight group-hover:text-yellow-400 transition-colors">
                {WHY_CHOOSE_US[0].title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {WHY_CHOOSE_US[0].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Suhu minimum hampar terjaga di atas 130°C untuk pengikatan aspal sempurna</span>
            </div>
          </motion.div>

          {/* Card 2: Armada Mandiri (Span 5) */}
          <motion.div
            {...staggerItem(1)}
            className="md:col-span-5 rounded-3xl border border-zinc-800 bg-[#121418] p-8 sm:p-10 flex flex-col justify-between group hover:border-yellow-400/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-yellow-400">
                  <Truck className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                  {WHY_CHOOSE_US[1].badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mt-6 tracking-tight group-hover:text-yellow-400 transition-colors">
                {WHY_CHOOSE_US[1].title}
              </h3>

              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                {WHY_CHOOSE_US[1].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">Kesiapan Mobilisasi Cepat</span>
              <a
                href="#alat-berat"
                className="text-xs font-bold text-yellow-400 inline-flex items-center gap-1 hover:underline"
              >
                Lihat Armada
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: Anti Sunat Volume & Transparansi (Span 4) */}
          <motion.div
            {...staggerItem(2)}
            className="md:col-span-4 rounded-3xl border border-zinc-800 bg-[#121418] p-8 flex flex-col justify-between group hover:border-yellow-400/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-yellow-400">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-mono text-yellow-400">
                  Uji Core Drill
                </span>
              </div>

              <h3 className="text-xl font-black text-white mt-5 tracking-tight group-hover:text-yellow-400 transition-colors">
                {WHY_CHOOSE_US[2].title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {WHY_CHOOSE_US[2].description}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-zinc-900/90 p-3.5 border border-zinc-800 text-xs text-zinc-400">
              Pengukuran opname bersama sebelum dan sesudah penggelaran hotmix.
            </div>
          </motion.div>

          {/* Card 4: Kecepatan & Rambu K3 (Span 4) */}
          <motion.div
            {...staggerItem(3)}
            className="md:col-span-4 rounded-3xl border border-zinc-800 bg-[#121418] p-8 flex flex-col justify-between group hover:border-yellow-400/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-yellow-400">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-mono text-zinc-400">
                  Night Shift
                </span>
              </div>

              <h3 className="text-xl font-black text-white mt-5 tracking-tight group-hover:text-yellow-400 transition-colors">
                {WHY_CHOOSE_US[3].title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {WHY_CHOOSE_US[3].description}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-zinc-900/90 p-3.5 border border-zinc-800 text-xs text-zinc-400">
              Minim disrupsi aktivitas usaha dan lalu lintas lingkungan.
            </div>
          </motion.div>

          {/* Card 5: Garansi Pemeliharaan (Span 4) */}
          <motion.div
            {...staggerItem(4)}
            className="md:col-span-4 rounded-3xl border border-yellow-400/40 bg-gradient-to-b from-[#14161a] to-[#0f1013] p-8 flex flex-col justify-between group hover:border-yellow-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <CheckCircle2 className="h-6 w-6 stroke-[2.2]" />
                </div>
                <span className="rounded-full bg-yellow-400 text-black px-3 py-1 text-[10px] font-black uppercase">
                  Masa Retensi
                </span>
              </div>

              <h3 className="text-xl font-black text-white mt-5 tracking-tight group-hover:text-yellow-400 transition-colors">
                {WHY_CHOOSE_US[4].title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {WHY_CHOOSE_US[4].description}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-yellow-400/10 p-3.5 border border-yellow-400/20 text-xs text-yellow-300 font-semibold">
              Ketenangan jangka panjang bagi pengelola gedung, kawasan, dan perumahan.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
