import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../API/wwwroot',
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true
  },
  plugins: [
    react(),
    mkcert(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
