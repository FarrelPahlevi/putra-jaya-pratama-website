import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const output = path.resolve('preview/final-sections')
await build({ build: { outDir: output, rollupOptions: { input: path.resolve('prototype-final.html') } } })
await build({ build: { ssr: 'src/prototypes/final-sections/entry-server.tsx', outDir: 'preview/final-sections-ssr' } })
const { render } = await import(pathToFileURL(path.resolve('preview/final-sections-ssr/entry-server.js')).href)
const page = path.join(output, 'prototype-final.html')
const template = await fs.readFile(page, 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('Prototype root placeholder missing')
await fs.writeFile(page, template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
// The review bundle includes the approved pages so comparison/navigation also work in static preview.
await fs.copyFile(path.resolve('dist/index.html'), path.join(output, 'index.html'))
await fs.copyFile(path.resolve('dist/galeri-proyek.html'), path.join(output, 'galeri-proyek.html'))
await fs.cp(path.resolve('dist/galeri-proyek'), path.join(output, 'galeri-proyek'), { recursive: true })
await fs.cp(path.resolve('dist/assets'), path.join(output, 'assets'), { recursive: true })
console.log('Prerendered isolated prototype: ' + page)
