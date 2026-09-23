import assert from 'node:assert/strict';
import test from 'node:test';
import { getNewsMetadata, SITE_URL } from '../src/lib/newsMetadata.js';
import {
  FALLBACK_NEWS_IMAGE,
  getAllNewsPosts,
  getFeaturedNewsPost,
  normalizeNewsPost,
} from '../src/lib/news.js';
import { validateNewsCollection, validateNewsPost, validatePublicationCover, validateForwardCovers } from './news-validation.mjs';
import {
  extractImageGuidelines,
  getImageRejectionReasons,
  selectNewsCover,
} from './news-cover.mjs';

const reviewFor = (image) => ({ image, relevant: true, cropSafe: true, noTextOrBranding: true, reason: 'Escena de cargas acorde al contenido y recorte comprobado.' });

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
  assert.equal(normalizeNewsPost(validPost).coverImage, FALLBACK_NEWS_IMAGE);
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
      coverReview: reviewFor('/news/imagen-enviada.jpg'),
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
      coverReview: reviewFor('/news/cruce-andino.jpg'),
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


test('sin portada o con espacios: página y metadata comparten el respaldo neutro', () => {
  for (const coverImage of [undefined, null, '', '   ']) {
    const post = { ...validPost, coverImage };
    const normalized = normalizeNewsPost(post);
    const { tags } = getNewsMetadata(post);
    assert.equal(normalized.coverImage, FALLBACK_NEWS_IMAGE);
    for (const name of ['og:image', 'twitter:image']) {
      assert.equal(tags.find((tag) => tag[1] === name)[2], SITE_URL + normalized.coverImage);
    }
    assert.equal(tags.find((tag) => tag[1] === 'og:image:width')[2], '1200');
    assert.equal(tags.find((tag) => tag[1] === 'og:image:height')[2], '630');
  }
});

test('preview sirve la portada real desde preview y conserva el canonical público', () => {
  const post = { ...validPost, coverImage: '/news/pilas.jpg', coverImageWidth: 1200,
    coverImageHeight: 630, coverImageType: 'image/jpeg', coverImageAlt: 'Pilas en un puerto' };
  const metadata = getNewsMetadata(post, 'https://preview.vercel.app');
  assert.equal(metadata.canonical, SITE_URL + '/noticias/' + post.slug);
  for (const name of ['og:image', 'twitter:image']) {
    assert.equal(metadata.tags.find((tag) => tag[1] === name)[2], 'https://preview.vercel.app/news/pilas.jpg');
    assert.equal(getNewsMetadata(post).tags.find((tag) => tag[1] === name)[2], SITE_URL + '/news/pilas.jpg');
  }
  assert.equal(metadata.tags.find((tag) => tag[1] === 'og:title')[2], post.seoTitle);
  assert.equal(metadata.tags.find((tag) => tag[1] === 'og:description')[2], post.metaDescription);
});

test('conserva portadas externas y no inventa sus dimensiones', () => {
  const metadata = getNewsMetadata({ ...validPost, coverImage: 'https://example.com/photo.jpg' });
  assert.equal(metadata.tags.find((tag) => tag[1] === 'og:image')[2], 'https://example.com/photo.jpg');
  assert.equal(metadata.tags.some((tag) => tag[1] === 'og:image:width'), false);
});


test('nueva publicación bloqueada sin portada o con institucional, incluso con fecha antigua', () => {
  for (const coverImage of [undefined, '/news/globaltrip-editorial-default.png']) {
    const post = { ...validPost, publishedAt: '2020-01-01', coverImage, coverReview: reviewFor(coverImage) };
    assert.ok(validateForwardCovers([{ post, label: 'nueva.json' }]).length > 0);
  }
});

test('revisión vinculada a la imagen: rechaza tema ajeno, recorte roto, branding y evidencia obsoleta', () => {
  const post = { ...validPost, coverImage: '/news/puerto.png', coverReview: reviewFor('/news/puerto.png') };
  assert.deepEqual(validatePublicationCover(post), []);
  for (const delta of [{ relevant: false }, { cropSafe: false }, { noTextOrBranding: false }, { image: '/otra.png' }, { reason: '' }]) {
    assert.ok(validatePublicationCover({ ...post, coverReview: { ...post.coverReview, ...delta } }).length > 0);
  }
});

test('selector no confunde tamaño válido con pertinencia y nunca devuelve fallback publicable', () => {
  const candidate = { url: '/news/puerto.png', mimeType: 'image/png', width: 1672, height: 941, byteSize: 300_000 };
  assert.equal(selectNewsCover({ images: [candidate] }).strategy, 'needs-image');
  assert.equal(selectNewsCover().coverImage, null);
  const selected = selectNewsCover({ bodyText: 'Exportaciones de bienes', generatedImage: { ...candidate, coverReview: reviewFor(candidate.url) } });
  assert.equal(selected.strategy, 'generated-from-content');
  assert.equal(selected.coverImage, candidate.url);
});
