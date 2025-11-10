import fs from 'fs';

export default function vitePluginMtmp() {
  return {
    name: 'vite-plugin-data',
    enforce: 'pre',

    load(id: string) {
      if (id.endsWith('.mtmp')) {
        const raw = fs.readFileSync(id, 'utf-8');
        const values: string[] = [];
        const processed = raw.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => {
          values.push(name);
          return `\${data.${name}}`;
        });

        const typeFile = `export default function render(data?: { ${values
          .map((value) => `${value}: string;`)
          .join('')} }): string\n`;

        const result = `export default function render(data = { }){ return \`${processed}\` }
        \n
        `;
        const typePath = `${id}.d.ts`;
        let shouldWrite = true;

        try {
          const existing = fs.readFileSync(typePath, 'utf-8');

          const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();

          if (normalize(existing) === normalize(typeFile)) {
            shouldWrite = false;
          }
        } catch {
          console.log('error');
        }

        if (shouldWrite) {
          fs.writeFileSync(typePath, typeFile);
        }

        return result;
      }
      return '';
    },
  };
}
