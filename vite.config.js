import path from 'path';

import { defineConfig } from 'vite';
import vitePluginMtmp from './vite-plugin-mtmp';
import vitePluginTple from './vite-plugin-tple';

export default defineConfig({
  plugins: [vitePluginMtmp(), vitePluginTple()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  assetsInclude: ['**/*.tple'],
});
