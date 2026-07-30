import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  //base: "/happy-birthday/",
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.mp3', '**/*.m4a', '**/*.wav', '**/*.ogg', '**/*.aac'],
})
