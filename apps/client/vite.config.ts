import path from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
  },
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
