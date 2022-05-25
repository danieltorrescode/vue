import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 8000,
  },
  define: { 'process.env': {} },
  // publicPath: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    //remove the need to specify .vue files 
    // https://vitejs.dev/config/#resolve-extensions
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
});
