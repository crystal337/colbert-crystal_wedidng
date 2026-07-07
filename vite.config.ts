import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/colbert-crystal_wedidng/ on GitHub Pages.
  base: '/colbert-crystal_wedidng/',
  plugins: [react(), tailwindcss()],
})
