import { FALLBACK_NEWS_IMAGE, getNewsCover } from './news.js';

export const SITE_URL = 'https://globaltriplog.com';

// Canonicals always identify the public article; preview assets must exist on the preview.
export function getNewsMetadata(post, assetOrigin = SITE_URL) {
  const cover = getNewsCover(post);
  const fallback = cover === FALLBACK_NEWS_IMAGE;
  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = `${SITE_URL}/noticias/${post.slug}`;
  const image = new URL(cover, assetOrigin).href;
  const alt = fallback ? 'GlobalTrip — Noticias de comercio exterior' : post.coverImageAlt || post.title;
  const width = fallback ? 1200 : post.coverImageWidth;
  const height = fallback ? 630 : post.coverImageHeight;
  return {
    title,
    canonical,
    tags: [
      ['name', 'description', description],
      ['property', 'og:type', 'article'],
      ['property', 'og:site_name', 'GlobalTrip'],
      ['property', 'og:locale', 'es_AR'],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:url', canonical],
      ['property', 'og:image', image],
      ['property', 'og:image:alt', alt],
      ...(width && height ? [
        ['property', 'og:image:width', String(width)],
        ['property', 'og:image:height', String(height)],
      ] : []),
      ...(fallback || post.coverImageType ? [
        ['property', 'og:image:type', fallback ? 'image/png' : post.coverImageType],
      ] : []),
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', image],
      ['name', 'twitter:image:alt', alt],
      ['property', 'article:published_time', post.publishedAt],
    ],
  };
}
