import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(process.argv[2] || 'src'); // можно указать путь аргументом

function checkFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    fs.readdirSync(filePath).forEach((f) => checkFile(path.join(filePath, f)));
  } else {
    const buffer = fs.readFileSync(filePath);
    // Пропускаем бинарные файлы
    if (buffer.includes(0)) return;

    const lastByte = buffer[buffer.length - 1];
    if (lastByte !== 0x0a) {
      console.log(`⚠️  No newline at end of file: ${filePath}`);
    }
  }
}

console.log(`🔍 Checking for missing newlines in: ${rootDir}\n`);
checkFile(rootDir);
console.log('\n✅ Done.');
