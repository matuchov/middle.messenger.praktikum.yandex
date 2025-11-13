import fs from 'fs';

export default function vitePluginTple() {
  return {
    name: 'vite-plugin-tple',
    enforce: 'pre',
    load(id: string) {
      if (id.endsWith('.tple')) {
        const raw = fs.readFileSync(id, 'utf-8');

        const result: Record<string, ((arg: HTMLElement) => void) | ((arg: string) => void)> = {};
        const el = document.createElement('div');

        el.innerHTML = raw;

        const traverseAllNodes = (node: ChildNode) => {
          const triple = /\{\{\{([^{}]+)\}\}\}/g;
          const double = /(?<!\{)\{\{([^{}]+)\}\}(?!\})/g;
          const clear = /[^a-zA-Z0-9_-]/g;
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text && typeof text === 'string') {
              if (text.match(triple)) {
                console.log(node);
                result[text.replace(clear, '')] = (element: HTMLElement) => {
                  node.replaceWith(element);
                };
              } else if (text.match(double)) {
                result[text.replace(clear, '')] = (value: string) => {
                  node.textContent = value;
                };
              }
            }
          }
          for (const child of node.childNodes) {
            traverseAllNodes(child);
          }
        };
        traverseAllNodes(el);
        // const values: string[] = [];

        // const processed = raw.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => {
        //   values.push(name);
        //   return `\${data.${name}}`;
        // });

        // const typeFile = `export default function render(data?: { ${values
        //   .map((value) => `${value}: string;`)
        //   .join('')} }): string\n`;

        // const result = `export default function render(data = { }){ return \`${processed}\` }
        // \n
        // `;
        // const typePath = `${id}.d.ts`;
        // let shouldWrite = true;

        // try {
        //   const existing = fs.readFileSync(typePath, 'utf-8');

        //   const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();

        //   if (normalize(existing) === normalize(typeFile)) {
        //     shouldWrite = false;
        //   }
        // } catch {
        //   console.log('error');
        // }

        // if (shouldWrite) {
        //   fs.writeFileSync(typePath, typeFile);
        // }

        return result;
      }
    },
  };
}
