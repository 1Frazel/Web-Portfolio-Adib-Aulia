import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const ghPagesSpaRoutesPlugin = () => ({
  name: 'gh-pages-spa-routes',
  closeBundle() {
    const distDir = path.resolve(__dirname, 'dist')
    const indexHtml = path.join(distDir, 'index.html')

    if (fs.existsSync(indexHtml)) {
      // Create 404.html fallback for GitHub Pages
      fs.copyFileSync(indexHtml, path.join(distDir, '404.html'))

      // Create dedicated /ui-ux/index.html entrypoint so GitHub Pages serves 200 OK on /ui-ux
      const uiuxDir = path.join(distDir, 'ui-ux')
      fs.mkdirSync(uiuxDir, { recursive: true })
      fs.copyFileSync(indexHtml, path.join(uiuxDir, 'index.html'))
    }
  },
})

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Web-Portfolio-Adib-Aulia/' : '/',
  plugins: [react(), ghPagesSpaRoutesPlugin()],
}))

