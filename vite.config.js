import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Support both GEMINI_API_KEY and API_KEY in .env.local
  const apiKey = env.GEMINI_API_KEY || env.API_KEY;
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    }
  }
})