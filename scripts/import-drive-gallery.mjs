
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'

const sharp = createRequire(path.resolve('../PJP-Website-tools/package.json'))('sharp')
const list = JSON.parse(await fs.readFile('docs/gallery-drive-manifest.json', 'utf8'))
const outDir = path.resolve('public/assets/project-gallery')
const cacheDir = path.resolve('docs/gallery-import-cache')
await fs.mkdir(outDir, { recursive: true })
await fs.mkdir(cacheDir, { recursive: true })
const results = Array(list.length)
const errors = []
const fullName = item => String(item.index).padStart(3, '0') + '.webp'
const exists = async p => fs.stat(p).then(s=>s.size>0).catch(()=>false)
const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms))
async function processItem(item) {
  const name = fullName(item)
  const target = path.join(outDir, name)
  const cache = path.join(cacheDir, String(item.index).padStart(3,'0') + '.json')
  try {
    if (await exists(cache) && await exists(target)) {
      const record = JSON.parse(await fs.readFile(cache,'utf8'))
      if (record.id === item.id) return record
    }
  } catch {}
  let lastError
  for(let attempt=1; attempt<=4; attempt++){
    try {
      const url = 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(item.id)
      const response = await fetch(url, {signal:AbortSignal.timeout(60000),redirect:'follow'})
      const contentType = response.headers.get('content-type') || ''
      if (!response.ok || !contentType.startsWith('image/')) throw new Error('HTTP '+response.status+' '+contentType)
      const buffer = Buffer.from(await response.arrayBuffer())
      if (buffer.length < 1500) throw new Error('Berkas terlalu kecil: '+buffer.length)
      const meta = await sharp(buffer).metadata()
      if (!meta.width || !meta.height) throw new Error('Dimensi tak valid')
      const full = await sharp(buffer).rotate().resize({ width: 1400, withoutEnlargement:true }).webp({quality:80, effort:4}).toFile(target)
      for(const width of [400,700]) {
        if (width>=full.width) continue
        await sharp(buffer).rotate().resize({width,withoutEnlargement:true}).webp({quality:78,effort:4}).toFile(path.join(outDir, name.replace('.webp','-'+width+'.webp')))
      }
      const record = {index:item.index,id:item.id,original:item.name,name,width:full.width,height:full.height,bytes:full.size,sha256:crypto.createHash('sha256').update(buffer).digest('hex')}
      await fs.writeFile(cache,JSON.stringify(record))
      return record
    } catch(err) {
      lastError = err
      if (attempt<4) await sleep(750 * attempt * attempt)
    }
  }
  throw new Error(item.name+': '+String(lastError))
}
let next=0,done=0
async function worker(){
  while(next<list.length){
    const ix=next++
    const item=list[ix]
    try{ results[ix]=await processItem(item) }
    catch(err){errors.push(String(err))}
    done++
    if (done%10===0 || done===list.length) console.log('PROGRESS '+done+'/'+list.length+' errors='+errors.length)
  }
}
await Promise.all(Array.from({length:8},worker))
if(errors.length) {
  await fs.writeFile('docs/gallery-import-errors.json',JSON.stringify(errors,null,2))
  console.error('FAILED '+errors.length+' photos; see docs/gallery-import-errors.json')
  process.exitCode=1
} else {
  const safe = value => JSON.stringify(value)
  const source = [
    '/** Foto yang diimpor dari folder dokumentasi PJP (2026-11-17). Jangan mengarang lokasi, klien, atau detail proyek. */',
    'export type ProjectPhoto = { id:string; serviceId:string; title:string; image:string; width:number; height:number; alt:string; caption:string }',
    'export const PROJECT_PHOTOS: ProjectPhoto[] = [',
    ...results.map(r=> '  { id: '+safe('arsip-'+String(r.index).padStart(3,'0'))+', serviceId: '+safe('asphalt-hotmix')+', title: '+safe('Dokumentasi lapangan '+String(r.index).padStart(3,'0'))+', image: '+safe('/assets/project-gallery/'+r.name)+', width: '+r.width+', height: '+r.height+', alt: '+safe('Dokumentasi kegiatan pekerjaan jalan, arsip '+r.original)+', caption: '+safe('Foto dokumentasi kegiatan lapangan.')+' },'),
    ']',
    'export const projectPhotoSrcSet = (photo: ProjectPhoto) => [',
    ' ...(photo.width > 400 ? [photo.image.replace(/\\.webp$/, \'-400.webp\') + \' 400w\'] : []),',
    ' ...(photo.width > 700 ? [photo.image.replace(/\\.webp$/, \'-700.webp\') + \' 700w\'] : []),',
    ' photo.image + \' \' + photo.width + \'w\',',
    '].join(\', \')',
  ].join('\n')+'\n'
  await fs.writeFile('src/data/projectGallery.ts',source)
  await fs.writeFile('docs/gallery-import-report.json',JSON.stringify({imported:results.length,source:'https://drive.google.com/drive/folders/14kTnYhFxqW2EmTsJ6o3zremG9hZOlSuc',bytes:results.reduce((s,x)=>s+x.bytes,0),exactDuplicateGroups:Object.entries(Object.groupBy(results, r=>r.sha256)).filter(([_,items])=>items.length>1).map(([sha,items])=>items.map(x=>x.original)),files:results},null,2))
  console.log('SUCCESS: '+results.length+' source photos converted and gallery data generated')
}
