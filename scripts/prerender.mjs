import fs from 'node:fs/promises'
import { render } from '../dist-ssr/entry-server.js'

const template = await fs.readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('Prerender root placeholder is missing')

const fallback = `<noscript>
  <style>.minimal-header button,.minimal-site button,.project-filter-area{display:none!important}.pjp-static-navigation{position:relative}.minimal-header{position:relative}.minimal-hero{padding-top:48px}.project-gallery-section{padding-top:48px}</style>
  <nav class="pjp-static-navigation" aria-label="Navigasi tanpa JavaScript">
    <a href="/#beranda">Beranda</a><a href="/#layanan">Layanan</a><a href="/galeri-proyek">Galeri Proyek</a><a href="/#tentang">Tentang Kami</a><a href="#ringkasan-manual">Tulis kebutuhan proyek</a>
  </nav>
</noscript>`
const summary = `<noscript>
  <section id="ringkasan-manual" class="pjp-static-summary" aria-labelledby="ringkasan-manual-title"><div>
    <h2 id="ringkasan-manual-title">Tulis kebutuhan proyek</h2>
    <p>JavaScript sedang dinonaktifkan. Anda tetap bisa membaca layanan dan membuka foto proyek. Untuk menyiapkan konsultasi, lengkapi ringkasan di bawah lalu salin melalui menu perangkat.</p>
    <p>Kontak resmi PJP belum tersedia di situs pratinjau ini. Ringkasan tidak dikirim otomatis.</p>
    <label for="ringkasan-manual-text">Ringkasan untuk konsultasi</label>
    <textarea id="ringkasan-manual-text" rows="9">Nama atau penanggung jawab:
Jenis pekerjaan:
Lokasi pekerjaan:
Rencana pekerjaan: </textarea>
  </div></section>
</noscript>`

for (const pathname of ['/', '/galeri-proyek']) {
  let html = template.replace('<div id="root"></div>', `${fallback}<div id="root">${render(pathname)}</div>${summary}`)
  if (pathname === '/galeri-proyek') {
    html = html.replace(/<title>.*?<\/title>/, '<title>Galeri Proyek | Putra Jaya Pratama</title>')
      .replace(/(name="description"\s+content=")[^"]*/, '$1Foto pengaspalan dan pekerjaan jalan Putra Jaya Pratama. Lihat dokumentasi pekerjaan berdasarkan jenis layanan.')
      .replace(/(property="og:title"\s+content=")[^"]*/, '$1Galeri Proyek | Putra Jaya Pratama')
      .replace(/(property="og:description"\s+content=")[^"]*/, '$1Dokumentasi foto pekerjaan pengaspalan dan konstruksi jalan Putra Jaya Pratama.')
      .replace(/(property="og:url"\s+content=")[^"]*/, '$1https://putra-jaya-pratama.pages.dev/galeri-proyek')
      .replace(/(name="twitter:title"\s+content=")[^"]*/, '$1Galeri Proyek | Putra Jaya Pratama')
      .replace(/(name="twitter:description"\s+content=")[^"]*/, '$1Dokumentasi pekerjaan pengaspalan dan konstruksi jalan Putra Jaya Pratama.')
    await fs.mkdir(new URL('../dist/galeri-proyek/', import.meta.url), { recursive: true })
    // Vite's clean-URL fallback checks this file before the SPA index.
    await fs.writeFile(new URL('../dist/galeri-proyek.html', import.meta.url), html)
  }
  await fs.writeFile(new URL(pathname === '/' ? '../dist/index.html' : '../dist/galeri-proyek/index.html', import.meta.url), html)
  console.log(`Prerendered ${pathname}`)
}
