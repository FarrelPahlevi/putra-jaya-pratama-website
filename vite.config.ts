import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'pjp-public-preview-privacy-guard',
      apply: 'build',
      closeBundle() {
        // Never publish local-only photographs, even if present in the working folder.
        rmSync(resolve(process.cwd(), 'dist/assets/pjp-preview'), { recursive: true, force: true })
      },
    },
  ],
})
