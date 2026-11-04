import React from 'react'
import { motion } from 'motion/react'
import {
  ShieldAlert,
  CheckCircle2,
  HardHat,
  FileText,
  Sparkles,
} from 'lucide-react'
import { COMPANY_INFO } from '../data/mockData'
import { useMotionConfig } from '../utils/motion'

export const About: React.FC = () => {
  const { staggerItem } = useMotionConfig()

  return (
    <section id="tentang" className="py-24 bg-[#090a0c] relative border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">
            Profil & Integritas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Tentang Putra Jaya <span className="text-yellow-400">Pratama</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Kami hadir dengan satu komitmen mendasar: menghilangkan kekhawatiran klien terhadap aspal
            yang cepat rusak atau ketebalan yang dimanipulasi. Dengan armada alat berat sendiri dan
            kepatuhan spesifikasi teknis, kami menghasilkan jalan yang kokoh bernilai investasi panjang.
          </p>
        </div>

        {/* Bento Grid About */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Filosofi & Nilai Kerja */}
          <motion.div
            {...staggerItem(0)}
            className="md:col-span-2 rounded-3xl border border-zinc-800 bg-[#121418] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400">
                  Filosofi Pengerjaan
                </span>
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-400">
                  Standar Lapangan
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mt-4 tracking-tight">
                Kejujuran Ketebalan & Kepadatan Maksimal
              </h3>

              <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
                Di lapangan, tantangan terbesar pekerjaan aspal sering kali berakar pada penurunan suhu hotmix
                sebelum dihamparkan dan pemadatan yang kurang optimal. Di Putra Jaya Pratama, kami memastikan:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Suhu AMP Terpantau</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Pengiriman hotmix menggunakan dump truck berpenutup terpal untuk menjaga suhu saat dihamparkan paver.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Pemadatan Tiga Tahap</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Breakdown rolling (Tandem), Intermediate rolling (Pneumatic/Vibro), dan Finishing rolling (Tandem) berurutan.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center gap-4 text-xs text-zinc-400">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Transparansi pengukuran bersama saat survei pra-proyek maupun opname akhir</span>
            </div>
          </motion.div>

          {/* Card 2: Legalitas & Kepatuhan (Marked honestly with review placeholder) */}
          <motion.div
            {...staggerItem(1)}
            className="rounded-3xl border border-zinc-800 bg-[#121418] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-yellow-400 mb-6">
                <FileText className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-black text-white tracking-tight">
                Legalitas & Administrasi
              </h3>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Kami siap mendukung kebutuhan pengadaan konstruksi jalan baik untuk sektor swasta,
                komersial, kawasan industri, maupun kemitraan formal.
              </p>

              {/* Explicit placeholder notice for company data */}
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-zinc-300 leading-relaxed">
                    <span className="font-bold text-yellow-400 block mb-1">Status Data Legalitas:</span>
                    {COMPANY_INFO.legalNotice}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] font-mono text-zinc-500">
              Verifikasi dokumen resmi dapat diminta saat pengajuan proposal teknis.
            </div>
          </motion.div>

          {/* Card 3: Keselamatan Kerja & K3 */}
          <motion.div
            {...staggerItem(2)}
            className="rounded-3xl border border-zinc-800 bg-[#121418] p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black mb-6">
                <HardHat className="h-6 w-6 stroke-[2.2]" />
              </div>

              <h3 className="text-xl font-black text-white tracking-tight">
                Disiplin K3 & Rambu Lalu Lintas
              </h3>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Pekerjaan jalan raya menuntut standar keselamatan ekstra tinggi. Tim kami dilengkapi rompi reflektif,
                rambu pengalihan lalu lintas berlampu rotary, serta petugas flagman untuk memandu kendaraan.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                Peralatan APD Lengkap
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                Traffic Cone & Barricade
              </span>
            </div>
          </motion.div>

          {/* Card 4: Kesiapan Pengerjaan Malam */}
          <motion.div
            {...staggerItem(3)}
            className="md:col-span-2 rounded-3xl border border-zinc-800 bg-[#121418] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400">
                Fleksibilitas Operasional
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Layanan Pengerjaan Shift Malam (Night Work)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
                Untuk area perkantoran, pusat perbelanjaan, atau jalan protokol dengan arus lalu lintas padat di siang hari,
                kami menyediakan opsi pengerjaan malam dengan penerangan floodlight mandiri sehingga bisnis Anda tetap beroperasi tanpa gangguan.
              </p>
            </div>

            <a
              href="#kontak"
              className="shrink-0 rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold text-white hover:border-yellow-400 hover:text-yellow-400 transition-colors"
            >
              Jadwalkan Konsultasi
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
