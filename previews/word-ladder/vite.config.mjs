import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  publicDir: false,
  resolve: {
    tsconfigPaths: true,
    alias: {
      '#/lib/analytics': fileURLToPath(new URL('./analytics.mjs', import.meta.url)),
    },
  },
  plugins: [tailwindcss(), react()],
})
