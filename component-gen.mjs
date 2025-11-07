import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];
const folder = process.argv[3] || 'shared';

if (!componentName) {
  console.error('Укажите имя компонента. Пример: component-gen Button');
  process.exit(1);
}

const basePath = path.resolve(`src/${folder}`, componentName);

const files = {
  [`ui/${componentName}.ts`]: `import type { ${componentName}Props } from "../model/types";
import ${componentName}Temlpate from "../template/${componentName}.mtmp"
import './${componentName}.css'

export const ${componentName} = ({}: ${componentName}Props) => {
  return ${componentName}Temlpate()
};
`,

  'model/types.ts': `export interface ${componentName}Props {
}
`,
  [`template/${componentName}.mtmp`]: `<div></div>`,

  'index.ts': `export { ${componentName} } from "./ui/${componentName}";
export type { ${componentName}Props } from "./model/types";
`,
  [`ui/${componentName}.css`]: '',
};

fs.mkdirSync(path.join(basePath, 'ui'), { recursive: true });
fs.mkdirSync(path.join(basePath, 'model'), { recursive: true });
fs.mkdirSync(path.join(basePath, 'template'), { recursive: true });

for (const [file, content] of Object.entries(files)) {
  const fullPath = path.join(basePath, file);
  fs.writeFileSync(fullPath, content);
  console.log('✅ Создан:', fullPath);
}
