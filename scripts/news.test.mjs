import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getAllNewsPosts,
  getFeaturedNewsPost,
  normalizeNewsPost,
} from '../src/lib/news.js';
import { validateNewsCollection, validateNewsPost } from './news-validation.mjs';
import {
  extractImageGuidelines,
  getImageRejectionReasons,
  selectNewsCover,
} from './news-cover.mjs';

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

test('rechaza una portada que no sea https ni una ruta pública', () => {
  const errors = validateNewsPost({ ...validPost, coverImage: 'firma.png' });
  assert.ok(errors.some((error) => error.includes('URL https o una ruta pública')));
});

test('rechaza slug y gmailMessageId duplicados', () => {
  const errors = validateNewsCollection([
    { label: 'uno.json', post: validPost },
    { label: 'dos.json', post: { ...validPost } },
  ]);
  assert.ok(errors.some((error) => error.includes('slug duplicado')));
  assert.ok(errors.some((error) => error.includes('gmailMessageId duplicado')));
});

test('mantiene orden por fecha y usa la noticia más reciente como destacada', () => {
  const posts = [
    { ...validPost, slug: 'vieja', publishedAt: '2026-01-01', featured: true },
    { ...validPost, slug: 'nueva', publishedAt: '2026-08-13', featured: false },
  ];
  assert.deepEqual(getAllNewsPosts(posts).map((post) => post.slug), ['nueva', 'vieja']);
  assert.equal(getFeaturedNewsPost(posts).slug, 'nueva');
});

test('extrae el anexo de lineamientos para preparar una portada', () => {
  assert.equal(
    extractImageGuidelines(
      'Cuerpo de la noticia\n\nANEXO — LINEAMIENTOS PARA LA IMAGEN\nFoto documental de una terminal de cargas.\n\nFUENTE: ejemplo',
    ),
    'Foto documental de una terminal de cargas.',
  );
});

test('rechaza imágenes inline de firma, branding y archivos chicos', () => {
  const reasons = getImageRejectionReasons({
    source: 'inline',
    url: 'https://mail.example/firma-logo.png',
    filename: 'firma-logo.png',
    mimeType: 'image/png',
    width: 320,
    height: 90,
    byteSize: 12_000,
  });

  assert.ok(reasons.includes('firma o branding detectado'));
  assert.ok(reasons.includes('dimensiones insuficientes'));
  assert.ok(reasons.includes('archivo demasiado chico'));
});

test('prioriza una imagen explícita válida por sobre una generada', () => {
  const selection = selectNewsCover({
    bodyText: 'ANEXO — LINEAMIENTOS PARA LA IMAGEN\nEscena logística documental.',
    images: [{
      source: 'attachment',
      url: '/news/imagen-enviada.jpg',
      filename: 'operacion-aerea.jpg',
      mimeType: 'image/jpeg',
      width: 1600,
      height: 900,
      byteSize: 300_000,
    }],
    generatedImage: {
      url: '/news/imagen-generada.jpg',
      filename: 'imagen-generada.jpg',
      mimeType: 'image/jpeg',
      width: 1600,
      height: 900,
      byteSize: 300_000,
    },
  });

  assert.equal(selection.strategy, 'explicit-image');
  assert.equal(selection.coverImage, '/news/imagen-enviada.jpg');
});

test('usa una portada generada con lineamientos cuando no hay explícita válida', () => {
  const selection = selectNewsCover({
    bodyText: 'ANEXO - LINEAMIENTOS PARA LA IMAGEN\nCruce andino nevado sin texto.',
    images: [{
      source: 'inline',
      url: 'https://mail.example/logo.png',
      filename: 'logo.png',
      mimeType: 'image/png',
      width: 180,
      height: 60,
      byteSize: 8_000,
    }],
    generatedImage: {
      url: '/news/cruce-andino.jpg',
      filename: 'cruce-andino.jpg',
      mimeType: 'image/jpeg',
      width: 1672,
      height: 941,
      byteSize: 400_000,
    },
  });

  assert.equal(selection.strategy, 'generated-from-guidelines');
  assert.equal(selection.coverImage, '/news/cruce-andino.jpg');
  assert.equal(selection.rejectedImages.length, 1);
});
