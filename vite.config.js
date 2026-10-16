import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // historyApiFallback: ensures the dev server serves index.html for all
  // non-asset paths, so deep links like /academics work on direct load.
  // For production (Vercel), add a vercel.json rewrite rule (see README).
  server: {
    historyApiFallback: true,
  },
})
