import path from 'node:path';
import { readJsonFile } from './news-files.mjs';
import { selectNewsCover } from './news-cover.mjs';

const inputPath = process.argv[2] && path.resolve(process.argv[2]);

if (!inputPath) {
  console.error('Uso: npm run news:cover -- ruta/a/candidatos-del-correo.json');
  process.exit(1);
}

try {
  const input = await readJsonFile(inputPath);
  console.log(JSON.stringify(selectNewsCover(input), null, 2));
} catch (error) {
  console.error(`No se pudo seleccionar la portada: ${error.message}`);
  process.exit(1);
}
