import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '0.0.0.0', //解决“vite use `--host` to expose”
    port: 8080,
    open: true
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
