import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Calculator,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react'
import { COMPANY_INFO } from '../data/mockData'
import { useMotionConfig } from '../utils/motion'

export const Contact: React.FC = () => {
  const { staggerItem } = useMotionConfig()

  // Estimator Calculator State
  const [areaLength, setAreaLength] = useState<string>('50')
  const [areaWidth, setAreaWidth] = useState<string>('6')
  const [thickness, setThickness] = useState<string>('4') // cm
  const [calculatedArea, setCalculatedArea] = useState<number>(300)
  const [estimatedTonnage, setEstimatedTonnage] = useState<number>(27.6)

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: 'Pengaspalan Hotmix Baru',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Recalculate on input change
  const handleCalculate = (l: string, w: string, t: string) => {
    const length = parseFloat(l) || 0
    const width = parseFloat(w) || 0
    const thickCm = parseFloat(t) || 0

    const area = length * width
    // Hotmix density is approximately 2.3 ton / m³
    const volumeM3 = area * (thickCm / 100)
    const tonnage = volumeM3 * 2.3

    setCalculatedArea(Math.round(area))
    setEstimatedTonnage(Math.round(tonnage * 10) / 10)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="kontak" className="py-24 bg-[#090a0c] relative border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">
            Konsultasi & Estimasi
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Mulai Konsultasi <br />
            <span className="text-yellow-400">Proyek Jalan Anda</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Dapatkan rekomendasi teknis, estimasi tonase aspal, dan penawaran transparan tanpa biaya survei awal.
            Tim Putra Jaya Pratama siap membantu perencanaan proyek Anda.
          </p>
        </div>

        {/* Master Bento Contact Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Estimator & Info Cards (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Interactive Asphalt Estimator Tool */}
            <motion.div
              {...staggerItem(0)}
              className="rounded-3xl border border-yellow-400/40 bg-[#121418] p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Calculator className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Kalkulator Estimasi Aspal</h3>
                  <p className="text-xs text-zinc-400">Simulasi kebutuhan tonase material hotmix</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Panjang Jalan (m)</label>
                    <input
                      type="number"
                      value={areaLength}
                      onChange={(e) => {
                        setAreaLength(e.target.value)
                        handleCalculate(e.target.value, areaWidth, thickness)
                      }}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white font-mono focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Lebar Jalan (m)</label>
                    <input
                      type="number"
                      value={areaWidth}
                      onChange={(e) => {
                        setAreaWidth(e.target.value)
                        handleCalculate(areaLength, e.target.value, thickness)
                      }}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white font-mono focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Target Tebal Gelar (cm)</label>
                  <select
                    value={thickness}
                    onChange={(e) => {
                      setThickness(e.target.value)
                      handleCalculate(areaLength, areaWidth, e.target.value)
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="3">3 cm (Overlay Halus / Jalan Lingkungan)</option>
                    <option value="4">4 cm (Standar AC-WC Jalan Raya / Kompleks)</option>
                    <option value="5">5 cm (Heavy-Duty AC-BC Pergudangan)</option>
                    <option value="6">6 cm (Perkerasan Tugas Ekstra Berat)</option>
                  </select>
                </div>

                {/* Calculation Summary Box */}
                <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 mt-2">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Luas Permukaan</div>
                      <div className="text-xl font-black text-white mt-0.5">{calculatedArea} m²</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Estimasi Hotmix</div>
                      <div className="text-xl font-black text-yellow-400 mt-0.5">± {estimatedTonnage} Ton</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 text-center">
                    *Estimasi teoritis BJ hotmix 2.3 ton/m³. Kebutuhan riil dihitung setelah survei kondisi elevasi eksisting.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Official Contact Details & Review Placeholders */}
            <motion.div
              {...staggerItem(1)}
              className="rounded-3xl border border-zinc-800 bg-[#121418] p-6 sm:p-8 flex flex-col gap-5"
            >
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Informasi Kontak Perusahaan
              </h3>

              {/* Placeholder warning badge for company review */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-yellow-400 block mb-0.5">Catatan Tinjauan Data Perusahaan:</strong>
                    Kontak resmi di bawah ini menggunakan penanda placeholder untuk proses peninjauan manajemen Putra Jaya Pratama sebelum publikasi live.
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-yellow-400 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-semibold">Alamat Kantor / Workshop:</span>
                    <span className="text-zinc-300 font-mono font-medium">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-yellow-400 shrink-0">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-semibold">WhatsApp & Telepon:</span>
                    <span className="text-yellow-400 font-mono font-bold">{COMPANY_INFO.whatsapp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-yellow-400 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-semibold">Email Resmi:</span>
                    <span className="text-zinc-300 font-mono">{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-yellow-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-semibold">Jam Operasional:</span>
                    <span className="text-zinc-300 leading-relaxed">{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Fast Consultation & Survey Form (Span 7) */}
          <motion.div
            {...staggerItem(2)}
            className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#121418] p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Formulir Permintaan Survei & Penawaran
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Isi rincian awal lokasi untuk mempermudah tim teknis kami menyusun skema anggaran.
                  </p>
                </div>
                <span className="hidden sm:inline-block rounded-full bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 text-[11px] font-bold text-yellow-400">
                  Respon Cepat
                </span>
              </div>

              {submitted ? (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black mb-4">
                    <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
                  </div>
                  <h4 className="text-2xl font-black text-white">Permintaan Terkirim!</h4>
                  <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto">
                    Terima kasih telah menghubungi Putra Jaya Pratama. Tim estimator kami akan segera meninjau data Anda dan menghubungi via WhatsApp/Telepon untuk konfirmasi jadwal survei lapangan.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full border border-zinc-700 bg-zinc-900 px-6 py-2.5 text-xs font-bold text-zinc-300 hover:text-white"
                  >
                    Kirim Permintaan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nama Lengkap / Instansi <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bpk. Hendra / PT Karya Maju"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nomor WhatsApp / Telp Aktif <span className="text-yellow-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0812-XXXX-XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Jenis Pekerjaan Yang Dibutuhkan
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="Pengaspalan Hotmix Baru">Pengaspalan Hotmix Baru (AC-WC / AC-BC)</option>
                        <option value="Overlay / Pelapisan Ulang">Overlay / Pelapisan Ulang Aspal Lama</option>
                        <option value="Perbaikan Patching Jalan">Perbaikan Lubang & Patching Jalan</option>
                        <option value="Kawasan Industri & Gudang">Area Parkir & Industri Heavy-Duty</option>
                        <option value="Jalan Perumahan Cluster">Jalan Lingkungan & Perumahan Cluster</option>
                        <option value="Pengecoran Beton Rigid">Pengecoran Jalan Beton (Rigid Pavement)</option>
                        <option value="Paving Block & Drainase">Paving Block & U-Ditch Drainase</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Lokasi Proyek / Wilayah
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Kawasan Industri MM2100, Cikarang"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Catatan Tambahan & Perkiraan Luas (m²)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Sebutkan perkiraan luas area (misal: 1.000 m²), kondisi tanah eksisting, atau waktu pengerjaan yang diinginkan..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-black uppercase tracking-wider text-black shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-all active:scale-[0.99]"
                    >
                      <span>Kirim Permintaan Konsultasi & Jadwal Survei</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="text-center text-[11px] text-zinc-500">
                    Bebas biaya survei lokasi awal untuk wilayah operasional aktif.
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
