import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Esto expone el servidor a todas las IPs externas
    port: 5173,        // Asegúrate de usar el puerto que mapeaste en el Docker Compose
  }
})
