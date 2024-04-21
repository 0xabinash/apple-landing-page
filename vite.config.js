import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/apple-landing-page/",
  plugins: [react(), sentryVitePlugin({
    org: "jsm-hy",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})