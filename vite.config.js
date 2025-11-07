import path from 'path';

import { defineConfig } from 'vite';
import vitePluginMtmp from './vite-plugin-mtmp';

export default defineConfig({
  plugins: [vitePluginMtmp()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
