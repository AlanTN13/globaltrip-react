import fs from 'node:fs/promises';
import path from 'node:path';
import { loadNewsEntries, readJsonFile } from './news-files.mjs';
import { NEWS_DIRECTORY, validateNewsCollection } from './news-validation.mjs';

const inputPath = process.argv[2] && path.resolve(process.argv[2]);

if (!inputPath) {
  console.error('Uso: npm run news:add -- ruta/a/noticia.json');
  process.exit(1);
}

try {
  const [entries, candidate] = await Promise.all([
    loadNewsEntries(),
    readJsonFile(inputPath),
  ]);
  const candidateLabel = path.relative(process.cwd(), inputPath);
  const errors = validateNewsCollection([
    ...entries,
    { post: candidate, label: candidateLabel },
  ]);

  if (errors.length > 0) {
    console.error('La noticia no fue incorporada:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  const destination = path.join(NEWS_DIRECTORY, `${candidate.slug}.json`);
  await fs.writeFile(destination, `${JSON.stringify(candidate, null, 2)}\n`, {
    encoding: 'utf8',
    flag: 'wx',
  });
  console.log(`Noticia incorporada en ${path.relative(process.cwd(), destination)}`);
} catch (error) {
  console.error(`La noticia no fue incorporada: ${error.message}`);
  process.exit(1);
}
