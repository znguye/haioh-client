import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    ],
  server: {
    proxy: {
      '/auth': 'http://localhost:5005',
      '/profiles': 'http://localhost:5005',
      '/matchmakingActions': 'http://localhost:5005',
    },
  },
      
})
