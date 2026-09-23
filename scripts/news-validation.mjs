import path from 'node:path';
import { FALLBACK_NEWS_IMAGE } from '../src/lib/news.js';

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

// Closed pre-policy inventory at c53ad2a. Do not add new posts here.
// Keeps historical articles untouched; publication dates cannot bypass the new gate.
const LEGACY_COVER_SLUGS = new Set([
  "actualizan-regulaciones-mercosur-para-cosmeticos-y-productos-domisanitarios",
  "aduana-deja-de-intervenir-control-especifico-pilas-baterias",
  "aduana-permitira-garantias-mediante-declaracion-jurada-digital",
  "amplian-el-regimen-de-aduana-en-factoria",
  "argentina-abrio-el-mercado-de-indonesia-para-carne-bovina-y-lacteos",
  "argentina-aprobo-acuerdo-mercosur-singapur-2026",
  "argentina-bate-record-de-exportaciones-y-proyecta-un-fuerte-saldo-comercial-en-2026",
  "aumentan-controles-y-requisitos-para-productos-controlados",
  "cambios-en-exporta-simple-suben-limites-y-beneficios",
  "cambios-en-reintegro-de-iva-a-turistas-extranjeros",
  "compras-puerta-a-puerta-unifican-beneficios-con-el-regimen-courier",
  "control-de-alimentos-el-senasa-asume-las-funciones-operativas-del-inal",
  "eliminan-el-antidumping-para-calzado-deportivo-desmontado-importado-desde-china",
  "estados-unidos-aplicara-a-la-argentina-su-arancel-general-mas-bajo",
  "modifican-requisitos-para-depositos-fiscales-y-cargas-de-exportacion-en-planta",
  "nuevo-regimen-para-medianas-inversiones-con-impacto-aduanero",
  "nuevos-aranceles-anmat-para-importacion-de-productos-medicos-y-cosmeticos",
  "paso-cristo-redentor-cerrado-agosto-2026",
  "rosario-primera-importacion-aerea-alimentos",
  "suspenden-antidumping-crucetas-tricetas-china-2026"
]);

export const validatePublicationCover = (post, label = 'noticia') => {
  const errors = [];
  if (!isNonEmptyString(post?.coverImage) ||
      !COVER_IMAGE_PATTERN.test(post.coverImage) ||
      post.coverImage.includes('globaltrip-editorial-default') ||
      post.coverImage === FALLBACK_NEWS_IMAGE) {
    errors.push(`${label}: se requiere una portada temática; no publicar sin imagen ni con fallback institucional`);
  }
  const review = post?.coverReview;
  if (!review || review.image !== post.coverImage ||
      review.relevant !== true || review.cropSafe !== true ||
      review.noTextOrBranding !== true || !isNonEmptyString(review.reason)) {
    errors.push(`${label}: falta revisión visual de la portada elegida (tema, recorte, sin texto/branding)`);
  }
  return errors;
};

export const validateForwardCovers = (entries) => entries.flatMap(({ post, label }) =>
  LEGACY_COVER_SLUGS.has(post?.slug) ? [] : validatePublicationCover(post, label));
