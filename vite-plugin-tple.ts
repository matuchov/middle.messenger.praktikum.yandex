import fs from 'fs';

export default function vitePluginTple() {
  return {
    name: 'vite-plugin-tple',
    enforce: 'pre',
    load(id: string) {
      if (id.endsWith('.tple')) {
        const raw = fs.readFileSync(id, 'utf-8');

        return `export default ${JSON.stringify(raw)}`;
      }
    },
  };
}
