import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['date-fns'], // Exclude date-fns from the bundle
  },
})
