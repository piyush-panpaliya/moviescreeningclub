import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['../constants']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@constants': path.resolve(__dirname, './src/constants')
    }
  }
})
