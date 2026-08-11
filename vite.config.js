import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Multi-page app: every top-level *.html file is its own Vite entry point,
// mirroring the original static-HTML-page structure (each mounts its own
// React tree via a matching src/main-*.jsx).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        adminLogin: resolve(__dirname, 'admin-login.html'),
        studentLogin: resolve(__dirname, 'student-login.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html'),
        studentDashboard: resolve(__dirname, 'student-dashboard.html'),
        floorNavigation: resolve(__dirname, 'floornavigation.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
})
