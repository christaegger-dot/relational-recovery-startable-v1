import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['localhost'],
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['localhost'],
  },
  build: {
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        // Audit 16 P1-1: Function-Form statt Array-Form. Der Array-Form
        // (`{ vendor: ['react', 'react-dom'] }`) reicht Rollup nicht, um
        // die React-Interna zuverlaessig aus dem Entry herauszuschneiden
        // — im Build landete vendor-*.js bei 3.65 KB und die eigentliche
        // Runtime im 298 KB grossen Entry-Chunk. Die Pfad-basierte
        // Function-Form matched ALLE node_modules-IDs der Packages und
        // hebt React+ReactDOM+scheduler sauber in einen langfristig
        // cachebaren Chunk.
        manualChunks: (id) => {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
        },
      },
    },
  },
});
