import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getAllNewsPosts,
  getFeaturedNewsPost,
  normalizeNewsPost,
} from '../src/lib/news.js';
import { validateNewsCollection, validateNewsPost } from './news-validation.mjs';

const validPost = {
  title: 'Noticia de prueba',
  slug: 'noticia-de-prueba',
  category: 'aduana',
  publishedAt: '2026-08-13',
  excerpt: 'Resumen de prueba',
  sourceName: 'Fuente',
  sourceUrl: 'https://example.com/noticia',
  seoTitle: 'Noticia de prueba',
  metaDescription: 'Resumen de prueba',
  content: [{ type: 'paragraph', text: 'Contenido de prueba' }],
  gmailMessageId: 'gmail-1',
};

test('acepta una noticia normalizada válida sin imagen', () => {
  assert.deepEqual(validateNewsPost(validPost), []);
  assert.match(normalizeNewsPost(validPost).coverImage, /^https:\/\//);
});

test('rechaza contenido mal formado y fechas inexistentes', () => {
  const errors = validateNewsPost({
    ...validPost,
    publishedAt: '2026-02-31',
    content: [{ type: 'list', items: [] }],
  });
  assert.ok(errors.some((error) => error.includes('publishedAt')));
  assert.ok(errors.some((error) => error.includes('.items')));
});

test('rechaza slug y gmailMessageId duplicados', () => {
  const errors = validateNewsCollection([
    { label: 'uno.json', post: validPost },
    { label: 'dos.json', post: { ...validPost } },
  ]);
  assert.ok(errors.some((error) => error.includes('slug duplicado')));
  assert.ok(errors.some((error) => error.includes('gmailMessageId duplicado')));
});

test('mantiene orden por fecha y selección de destacada del frontend', () => {
  const posts = [
    { ...validPost, slug: 'vieja', publishedAt: '2026-01-01', featured: true },
    { ...validPost, slug: 'nueva', publishedAt: '2026-08-13', featured: false },
  ];
  assert.deepEqual(getAllNewsPosts(posts).map((post) => post.slug), ['nueva', 'vieja']);
  assert.equal(getFeaturedNewsPost(posts).slug, 'vieja');
});
