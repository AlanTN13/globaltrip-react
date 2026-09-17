import fs from 'node:fs/promises';
import path from 'node:path';
import { getNewsMetadata, SITE_URL } from '../src/lib/newsMetadata.js';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const NEWS_DIR = path.join(ROOT, 'src/data/news');
const ASSET_ORIGIN = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}` : SITE_URL;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function cleanHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+(?:property|name)=["'](?:og|twitter):[^"']+["'][^>]*>/gi, '');
}

function injectMetadata(template, article) {
  const { title, canonical, tags: metadataTags } = getNewsMetadata(article, ASSET_ORIGIN);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    ...metadataTags.map(([attribute, name, content]) =>
      `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`),
  ].join('\n    ');
  return cleanHead(template).replace('</head>', `    ${tags}\n  </head>`);
}

async function readArticles() {
  const files = (await fs.readdir(NEWS_DIR)).filter((name) => name.endsWith('.json')).sort();
  const articles = [];
  for (const file of files) {
    articles.push(JSON.parse(await fs.readFile(path.join(NEWS_DIR, file), 'utf8')));
  }
  return articles;
}

async function main() {
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  const articles = await readArticles();
  const newsDist = path.join(DIST, 'noticias');
  await fs.mkdir(newsDist, { recursive: true });

  for (const article of articles) {
    const html = injectMetadata(template, article);
    await fs.writeFile(path.join(newsDist, `${article.slug}.html`), html, 'utf8');
  }

  console.log(`news:og OK — ${articles.length} artículo(s) con OG/Twitter estático`);
}

main().catch((error) => {
  console.error(`news:og ERROR — ${error.message}`);
  process.exit(1);
});
