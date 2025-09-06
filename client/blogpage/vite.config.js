// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 스프링 포트
        changeOrigin: true,
        // rewrite 필요 없음: /api 그대로 유지
      }
    }
  }
})
