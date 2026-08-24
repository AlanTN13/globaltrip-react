const FALLBACK_NEWS_IMAGE =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1600';

const localeByLanguage = {
  es: 'es-AR',
  en: 'en-US',
  pt: 'pt-BR',
};

export const getLocaleForLanguage = (language) => localeByLanguage[language] ?? 'es-AR';

export const createSlug = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const normalizeNewsPost = (post) => ({
  ...post,
  slug: post.slug || createSlug(post.title),
  coverImage: post.coverImage || FALLBACK_NEWS_IMAGE,
});

export const sortNewsPosts = (posts) =>
  [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

export const getAllNewsPosts = (posts) => sortNewsPosts(posts.map(normalizeNewsPost));

export const getFeaturedNewsPost = (posts) =>
  getAllNewsPosts(posts)[0] || null;

export const getRelatedNewsPosts = (posts, currentSlug, limit = 3) =>
  getAllNewsPosts(posts).filter((post) => post.slug !== currentSlug).slice(0, limit);

export const formatNewsDate = (date, language) =>
  new Intl.DateTimeFormat(getLocaleForLanguage(language), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
