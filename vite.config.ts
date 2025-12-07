import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * GitHub Pages Deployment Configuration
   * 
   * Deploying to https://srikolagani.github.io/
   * Repo name: srikolagani.github.io
   */
  base: '/',
})
