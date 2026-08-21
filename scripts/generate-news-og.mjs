import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const NEWS_DIR = path.join(ROOT, 'src/data/news');
const SITE_URL = 'https://globaltriplog.com';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function absoluteUrl(value) {
  if (!value) return `${SITE_URL}/favicon-globaltrip.png`;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function cleanHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+(?:property|name)=["'](?:og|twitter):[^"']+["'][^>]*>/gi, '');
}

function injectMetadata(template, article) {
  const canonical = `${SITE_URL}/noticias/${article.slug}`;
  const title = article.seoTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const image = absoluteUrl(article.coverImage);
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    '<meta property="og:type" content="article">',
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(image)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(image)}">`,
    `<meta property="article:published_time" content="${escapeHtml(article.publishedAt)}">`,
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
