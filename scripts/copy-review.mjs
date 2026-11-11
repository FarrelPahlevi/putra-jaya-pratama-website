import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import ts from 'typescript'

const backup = process.argv[2]
if (!backup) throw new Error('Pass the pre-edit backup directory as the first argument.')
const output = path.resolve('docs/copywriting-20261111')
await fs.mkdir(output, { recursive: true })
const files = ['src/MinimalIndustrial.tsx','src/SiteHeader.tsx','src/SiteFooter.tsx','src/GalleryPage.tsx','src/components/InquiryModal.tsx','src/data/mockData.ts','src/data/projectGallery.ts','src/data/serviceIllustrations.ts']
const copyKinds = new Set([ts.SyntaxKind.StringLiteral,ts.SyntaxKind.NoSubstitutionTemplateLiteral,ts.SyntaxKind.TemplateHead,ts.SyntaxKind.TemplateMiddle,ts.SyntaxKind.TemplateTail,ts.SyntaxKind.JsxText])
const blockTags = new Set(['h1','h2','h3','p','label','button','a','strong','span','small','option'])
const normalize = text => text.replace(/\s+/g,' ').trim()
const children = node => { const result=[]; ts.forEachChild(node,child=>{result.push(child)}); return result }
const structure = node => copyKinds.has(node.kind) ? [node.kind,'copy'] : [node.kind,ts.isIdentifier(node)||ts.isNumericLiteral(node)?node.text:null,children(node).map(structure)]
const staticText = node => {
  if(ts.isJsxText(node)) return node.text
  if(ts.isJsxExpression(node)) return !node.expression ? '' : ts.isStringLiteral(node.expression) ? node.expression.text : null
  if(ts.isJsxSelfClosingElement(node)) return node.tagName.getText()==='br' ? ' ' : ''
  if(ts.isJsxElement(node)) {
    const parts=node.children.map(staticText)
    return parts.some(part=>part===null) ? null : parts.join('')
  }
  return ''
}
function indexTree(root) {
  const values=new Map(), blocks=new Map(), attributes=new Map()
  const visit=(node,key)=>{
    if(copyKinds.has(node.kind)) {
      let ancestor=node.parent,attribute=false
      while(ancestor&&!ts.isSourceFile(ancestor)) { if(ts.isJsxAttribute(ancestor)) {attribute=true;break} ancestor=ancestor.parent }
      values.set(key,{node,text:normalize(node.text),attribute})
    }
    if(ts.isJsxElement(node)&&blockTags.has(node.openingElement.tagName.getText())) {
      const text=staticText(node)
      if(text!==null&&normalize(text)) blocks.set(key,{node,text:normalize(text),tag:node.openingElement.tagName.getText()})
    }
    if(ts.isJsxAttribute(node)&&!['alt','aria-label','placeholder','title'].includes(node.name.getText())) attributes.set(key,normalize(node.getText()))
    children(node).forEach((child,index)=>visit(child,`${key}.${index}`))
  }
  visit(root,'0')
  return {values,blocks,attributes}
}
function location(node) {
  for(let parent=node.parent;parent&&!ts.isSourceFile(parent);parent=parent.parent) {
    if(ts.isJsxAttribute(parent)) return parent.name.getText()
    if(ts.isPropertyAssignment(parent)) {
      const object=parent.parent
      const identifier=object.properties?.find(property=>ts.isPropertyAssignment(property)&&['id','number','file'].includes(property.name.getText()))
      return `${identifier?.initializer?.text||'data'}.${parent.name.getText()}`
    }
    if(ts.isCallExpression(parent)) {
      if(ts.isPropertyAccessExpression(parent.expression)) return parent.expression.name.text==='join' ? 'Teks ringkasan' : parent.expression.name.text
      if(ts.isIdentifier(parent.expression)) return parent.expression.text
    }
  }
  return ts.SyntaxKind[node.kind]
}
function reason(file,kind) {
  if(kind==='alt'||kind.endsWith('.alt')) return 'Menjelaskan gambar dengan bahasa yang lebih mudah dibaca screen reader; objek gambar tetap sama.'
  if(kind==='button'||kind==='a') return 'Menyebut tindakan dan hasil yang benar-benar tersedia; memakai kalimat pendek dan konsisten.'
  if(['h1','h2','h3'].includes(kind)) return 'Memperjelas isi bagian dan mengurangi gaya slogan atau ungkapan abstrak.'
  if(file.includes('InquiryModal')) return 'Memperjelas isian, hasil penyalinan atau langkah pemulihan; tidak menyiratkan pesan sudah dikirim.'
  if(file.includes('mockData')) return kind.endsWith('.title') ? 'Penamaan pekerjaan lebih natural; istilah teknis dan jenis layanannya tetap sama.' : 'Menggunakan subjek yang jelas dan kata sehari-hari untuk alur kerja yang sudah ada.'
  if(file.includes('projectGallery')) return 'Menyebut pekerjaan atau kondisi foto secara langsung, tanpa menambah tanggal, lokasi atau klaim proyek.'
  if(file.includes('SiteHeader')) return 'Menggunakan istilah menu yang lebih familiar dan nama aksi formulir yang tepat.'
  if(file.includes('SiteFooter')) return 'Mengurangi istilah internal website dan menjelaskan status pratinjau dengan jujur.'
  return 'Menggunakan bahasa Indonesia yang langsung, hangat dan relevan bagi calon pelanggan.'
}
const editorialReasons={
  'Membangun jalan. Membuka akses.':'Langsung menyebut layanan PJP, mengganti slogan tanpa menambah janji.',
  'Berbagai kebutuhan. Satu mitra kerja.':'Mengantar daftar layanan dan menghapus ungkapan mitra kerja yang terlalu umum.',
  'Pekerjaan yang baik dimulai dari pemahaman.':'Menjelaskan langkah nyata sebelum pekerjaan, bukan pernyataan umum tentang mutu.',
  'Dari kebutuhan, hingga pelaksanaan.':'Menyebut empat tahap yang memang ditampilkan, termasuk pemeriksaan hasil.',
  'Peninjauan & perencanaan':'Merangkum penyusunan rencana; penilaian data lapangan tetap dijelaskan pada deskripsinya.',
  'Mulai Konsultasi':'Tombol membuka formulir; label baru tidak menyiratkan percakapan langsung sudah dimulai.',
  'HUBUNGI KAMI':'Kolom berisi persiapan konsultasi, sementara kontak resmi belum dicantumkan.',
  'WEBSITE PREVIEW / MINIMAL INDUSTRIAL':'Menerjemahkan status pratinjau dan menghapus nama gaya desain yang tidak membantu calon pelanggan.',
  'Tulis gambaran kebutuhan minimal 12 karakter agar ringkasannya berguna.':'Memberi instruksi perbaikan yang spesifik tanpa menilai apakah tulisan pelanggan berguna.',
  'Clipboard otomatis tidak tersedia pada browser ini. Pilih teks di bawah lalu salin secara manual (Ctrl+C).':'Tidak menebak penyebab kegagalan; memberi langkah salin manual melalui perangkat atau keyboard.',
  'Teks tersalin ke clipboard. Kirimkan melalui kontak resmi PJP setelah tersedia.':'Memberitahu hasil penyalinan dengan bahasa sehari-hari dan mempertahankan status kontak resmi.',
}
const changes=[]
const protectedAttributes=[]
for(const file of files) {
  const before=await fs.readFile(path.join(backup,file),'utf8'), after=await fs.readFile(file,'utf8')
  const oldRoot=ts.createSourceFile(file,before,ts.ScriptTarget.Latest,true), newRoot=ts.createSourceFile(file,after,ts.ScriptTarget.Latest,true)
  assert.deepEqual(structure(newRoot),structure(oldRoot),`Code/markup structure changed: ${file}`)
  const oldTree=indexTree(oldRoot),newTree=indexTree(newRoot)
  assert.deepEqual(newTree.attributes,oldTree.attributes,`Non-copy attributes changed: ${file}`)
  protectedAttributes.push({file,count:oldTree.attributes.size})
  const covered=[]
  for(const [key,oldBlock] of oldTree.blocks) {
    const newBlock=newTree.blocks.get(key)
    if(!newBlock||oldBlock.text===newBlock.text||covered.some(parent=>key.startsWith(parent+'.'))) continue
    changes.push({file,line:newRoot.getLineAndCharacterOfPosition(newBlock.node.getStart()).line+1,kind:oldBlock.tag,before:oldBlock.text,after:newBlock.text,reason:editorialReasons[oldBlock.text]||reason(file,oldBlock.tag)})
    covered.push(key)
  }
  for(const [key,oldValue] of oldTree.values) {
    const newValue=newTree.values.get(key)
    if(!newValue||oldValue.text===newValue.text||(!oldValue.attribute&&covered.some(parent=>key.startsWith(parent+'.')))) continue
    const kind=location(newValue.node)
    changes.push({file,line:newRoot.getLineAndCharacterOfPosition(newValue.node.getStart()).line+1,kind,before:oldValue.text,after:newValue.text,reason:editorialReasons[oldValue.text]||reason(file,kind)})
  }
  if(file==='src/data/mockData.ts') {
    for(const [key,oldValue] of oldTree.values) {
      if(ts.isPropertyAssignment(oldValue.node.parent)&&['summary','detailText','metaCode','iconGlyph'].includes(oldValue.node.parent.name.getText())) assert.equal(newTree.values.get(key).text,oldValue.text,'Archived-only service fields changed')
    }
    const active=new Set(['SERVICES_LIST','PROCESS_STEPS'])
    oldRoot.statements.forEach((statement,index)=>{
      if(ts.isVariableStatement(statement)&&statement.declarationList.declarations.every(declaration=>!active.has(declaration.name.getText()))) assert.equal(newRoot.statements[index].getText(),statement.getText(),'Inactive data exports changed')
    })
  }
}
const oldHTML=await fs.readFile(path.join(backup,'index.html'),'utf8'), newHTML=await fs.readFile('index.html','utf8')
const htmlMasks=[{kind:'title',regex:/(<title>)([\s\S]*?)(<\/title>)/},{kind:'meta description',regex:/(<meta\s+name="description"\s+content=")([^"]*)(")/}]
let oldMask=oldHTML,newMask=newHTML
for(const item of htmlMasks) {
  const before=oldHTML.match(item.regex)?.[2],after=newHTML.match(item.regex)?.[2]
  assert(before&&after)
  if(before!==after) changes.push({file:'index.html',kind:item.kind,before,after,reason:'Menjelaskan layanan dan status pratinjau dalam bahasa Indonesia tanpa istilah internal.'})
  oldMask=oldMask.replace(item.regex,'$1COPY$3');newMask=newMask.replace(item.regex,'$1COPY$3')
}
assert.equal(oldMask.replace(/\r\n/g,'\n'),newMask.replace(/\r\n/g,'\n'),'Non-copy HTML changed')
const newText=changes.map(change=>change.after).join('\n')
assert(!/[\u2013\u2014]/.test(newText),'Long dash in rewritten copy')
assert(!/solusi terbaik|terdepan|berkualitas tinggi|terpercaya|revolusioner|seamless|cutting.edge|next.generation/i.test(newText),'Unsupported marketing phrase in rewritten copy')
const hash=async file=>crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex')
const protectedFiles=[]
const checkFolder=async(relative,predicate=()=>true)=>{
  for(const entry of await fs.readdir(path.join(backup,relative),{withFileTypes:true})) {
    const file=path.join(relative,entry.name)
    if(entry.isDirectory()) await checkFolder(file,predicate)
    else if(predicate(file)){assert.equal(await hash(file),await hash(path.join(backup,file)),`Protected file changed: ${file}`);protectedFiles.push(file)}
  }
}
await checkFolder('public')
await checkFolder('src/components',file=>!file.endsWith('InquiryModal.tsx'))
for(const file of ['src/index.css','src/minimal-industrial.css','src/project-gallery.css','src/inquiry-modal.css','src/App.tsx','src/main.tsx','vite.config.ts','package.json','package-lock.json','DESIGN.md']) {
  assert.equal(await hash(file),await hash(path.join(backup,file)),`Protected file changed: ${file}`)
  protectedFiles.push(file)
}
const escape=text=>text.replace(/\|/g,'\\|').replace(/\n/g,' ')
let markdown='# Perbandingan copywriting PJP\n\nTeks berikut diambil dari backup sebelum perubahan dan source aktif sesudah perubahan. Paragraf dan heading digabung dari JSX agar terbaca sebagai satu kalimat.\n\n| Lokasi | Sebelum | Sesudah | Alasan |\n| --- | --- | --- | --- |\n'
for(const row of changes) markdown+=`| ${escape(`${row.file}${row.line?`:${row.line}`:''} (${row.kind})`)} | ${escape(row.before)} | ${escape(row.after)} | ${escape(row.reason)} |\n`
markdown+='\n## Teks yang ditinjau dan dipertahankan\n\n| Teks | Keputusan |\n| --- | --- |\n| Beranda, Layanan, Galeri Proyek, Tentang Kami, Kontak | Nama navigasi sudah familiar dan menunjuk tujuan yang benar. |\n| Saluran U-Ditch | Nama teknis sudah tepat; lima nama layanan lain diselaraskan ke bahasa Indonesia/sentence case. |\n| Galeri Proyek. | Judul halaman sudah jelas dan sesuai refinement sebelumnya. |\n| Ceritakan kebutuhan Anda. | Judul formulir sudah langsung dan komunikatif. |\n| Jenis pekerjaan; Belum yakin / perlu konsultasi | Label dan pilihan awal sudah mudah dipahami. |\n| Batal, Tutup formulir, Salin lagi, Foto sebelumnya, Foto berikutnya, Tutup foto | Menyebut tindakan nyata secara singkat. |\n| Angka kategori, langkah dan posisi foto | Angka berasal dari data/urutan yang benar; bukan statistik pemasaran. |\n| Label orientasi bernomor dan nama merek | Bagian dari hierarchy/branding existing; tidak dipakai sebagai penekanan dalam paragraf. |\n'
await fs.writeFile(path.join(output,'comparison.md'),markdown)
await fs.writeFile(path.join(output,'copy-changes.json'),JSON.stringify(changes,null,2))
await fs.writeFile(path.join(output,'source-verification.json'),JSON.stringify({backup,changes:changes.length,markupAndLogicStructureUnchanged:true,nonCopyAttributesUnchanged:true,protectedAttributes,protectedFiles,archivedOnlyFieldsUnchanged:true,prohibitedCopyHits:0},null,2))
console.log(JSON.stringify({changes:changes.length,markupAndLogicStructureUnchanged:true,nonCopyAttributesUnchanged:true,protectedFiles:protectedFiles.length,prohibitedCopyHits:0},null,2))
