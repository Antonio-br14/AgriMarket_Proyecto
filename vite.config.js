import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// El plugin singlefile genera un unico index.html autocontenido en dist/,
// que se puede abrir directamente sin servidor. Para desarrollo normal:
//   npm run dev
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
