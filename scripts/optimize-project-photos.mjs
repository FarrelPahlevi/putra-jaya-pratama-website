import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const sharp = require('sharp')
const folder = path.resolve('public/assets/pjp-preview')
const names = ['asphalt-access-preview','asphalt-road-preview','road-roller-preview','tree-lined-road-preview']
const manifest = []
for (const name of names) {
  const original = path.join(folder, `${name}.webp`)
  const metadata = await sharp(original).metadata()
  const variants = []
  for (const width of [400,700]) {
    if (width >= metadata.width) continue
    const file = `${name}-${width}.webp`
    const info = await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(folder, file))
    variants.push({ file, width: info.width, height: info.height, bytes: info.size })
  }
  manifest.push({ original: `${name}.webp`, width: metadata.width, height: metadata.height, variants })
}
await fs.mkdir('docs/ui-ux-20261111', { recursive: true })
await fs.writeFile('docs/ui-ux-20261111/photo-variants.json', JSON.stringify(manifest, null, 2))
console.log(JSON.stringify(manifest, null, 2))
