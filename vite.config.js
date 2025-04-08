import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'chart.js': resolve(__dirname, 'node_modules/chart.js'),
      'react-chartjs-2': resolve(__dirname, 'node_modules/react-chartjs-2'),
    },
  },
  optimizeDeps: {
    include: ['chart.js', 'react-chartjs-2'],
  },
});