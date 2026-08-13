import fs from 'node:fs/promises';
import path from 'node:path';
import { NEWS_DIRECTORY } from './news-validation.mjs';

export const readJsonFile = async (filePath) => {
  const source = await fs.readFile(filePath, 'utf8');
  return JSON.parse(source);
};

export const loadNewsEntries = async () => {
  const names = (await fs.readdir(NEWS_DIRECTORY))
    .filter((name) => name.endsWith('.json'))
    .sort();

  return Promise.all(
    names.map(async (name) => ({
      label: path.relative(process.cwd(), path.join(NEWS_DIRECTORY, name)),
      path: path.join(NEWS_DIRECTORY, name),
      post: await readJsonFile(path.join(NEWS_DIRECTORY, name)),
    })),
  );
};
