import path from 'node:path';

export const NEWS_DIRECTORY = path.resolve('src/data/news');

export const VALID_CATEGORIES = new Set([
  'aduana',
  'economia',
  'exportacion',
  'importacion',
  'logistica',
]);

const REQUIRED_STRING_FIELDS = [
  'title',
  'slug',
  'category',
  'publishedAt',
  'excerpt',
  'sourceName',
  'sourceUrl',
  'seoTitle',
  'metaDescription',
  'gmailMessageId',
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CONTENT_TYPES = new Set(['paragraph', 'heading', 'list', 'quote']);
const COVER_IMAGE_PATTERN = /^(?:https:\/\/|\/)[^\s]+$/;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateContent = (content, label) => {
  const errors = [];

  if (!Array.isArray(content) || content.length === 0) {
    return [`${label}: content debe ser un array no vacío`];
  }

  content.forEach((block, index) => {
    const blockLabel = `${label}: content[${index}]`;
    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      errors.push(`${blockLabel} debe ser un objeto`);
      return;
    }

    if (!CONTENT_TYPES.has(block.type)) {
      errors.push(`${blockLabel}.type inválido: ${String(block.type)}`);
      return;
    }

    if (block.type === 'list') {
      if (
        !Array.isArray(block.items) ||
        block.items.length === 0 ||
        block.items.some((item) => !isNonEmptyString(item))
      ) {
        errors.push(`${blockLabel}.items debe ser un array no vacío de textos`);
      }
      return;
    }

    if (!isNonEmptyString(block.text)) {
      errors.push(`${blockLabel}.text debe ser un texto no vacío`);
    }
  });

  return errors;
};

export const validateNewsPost = (post, label = 'noticia') => {
  if (!post || typeof post !== 'object' || Array.isArray(post)) {
    return [`${label}: la noticia debe ser un objeto JSON`];
  }

  const errors = [];

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!isNonEmptyString(post[field])) {
      errors.push(`${label}: falta el campo obligatorio ${field}`);
    }
  }

  if (isNonEmptyString(post.slug) && !SLUG_PATTERN.test(post.slug)) {
    errors.push(`${label}: slug inválido "${post.slug}"`);
  }

  if (isNonEmptyString(post.category) && !VALID_CATEGORIES.has(post.category)) {
    errors.push(`${label}: categoría inválida "${post.category}"`);
  }

  if (isNonEmptyString(post.publishedAt)) {
    const parsedDate = new Date(`${post.publishedAt}T00:00:00Z`);
    if (
      !DATE_PATTERN.test(post.publishedAt) ||
      Number.isNaN(parsedDate.valueOf()) ||
      parsedDate.toISOString().slice(0, 10) !== post.publishedAt
    ) {
      errors.push(`${label}: publishedAt debe usar una fecha válida YYYY-MM-DD`);
    }
  }

  if (post.coverImage != null && !isNonEmptyString(post.coverImage)) {
    errors.push(`${label}: coverImage debe ser un texto no vacío cuando está presente`);
  } else if (isNonEmptyString(post.coverImage) && !COVER_IMAGE_PATTERN.test(post.coverImage)) {
    errors.push(`${label}: coverImage debe ser una URL https o una ruta pública absoluta`);
  }

  if (post.featured != null && typeof post.featured !== 'boolean') {
    errors.push(`${label}: featured debe ser booleano cuando está presente`);
  }

  errors.push(...validateContent(post.content, label));
  return errors;
};

export const validateNewsCollection = (entries) => {
  const errors = entries.flatMap(({ post, label }) => validateNewsPost(post, label));
  const slugOwners = new Map();
  const messageOwners = new Map();

  for (const { post, label } of entries) {
    if (!post || typeof post !== 'object') continue;

    for (const [field, owners, description] of [
      ['slug', slugOwners, 'slug duplicado'],
      ['gmailMessageId', messageOwners, 'gmailMessageId duplicado'],
    ]) {
      const value = post[field];
      if (!isNonEmptyString(value)) continue;
      if (owners.has(value)) {
        errors.push(`${label}: ${description} "${value}" (también en ${owners.get(value)})`);
      } else {
        owners.set(value, label);
      }
    }
  }

  return errors;
};
