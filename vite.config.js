/* eslint-env node */
/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8000'
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // inoltra tutte le richieste /api (es. /api/v1/pizzas) al backend Laravel
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          // se il backend è servito sotto /, non è necessario riscrivere il path
          // rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  }
})
