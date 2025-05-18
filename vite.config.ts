import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nomina/frontend/',
  plugins: [react()],
})
