const MIN_WIDTH = 640;
const MIN_HEIGHT = 360;
const MIN_BYTES = 50_000;

const BRANDING_PATTERN =
  /(?:^|[\s._-])(firma|signature|logo|logotipo|brand|branding|footer|header|banner|avatar|icon|spacer|pixel|tracking|facebook|instagram|linkedin|twitter|whatsapp|placeholder|default|generic|no-?image|image00\d)(?:[\s._-]|$)/i;

const normalizeText = (value) => String(value || '').trim();

export const extractImageGuidelines = (text) => {
  const source = normalizeText(text).replace(/\r\n?/g, '\n');
  const heading = /ANEXO\s*[—–-]\s*LINEAMIENTOS PARA LA IMAGEN\s*:?[ \t]*/i;
  const match = heading.exec(source);

  if (!match) return '';

  const remainder = source.slice(match.index + match[0].length);
  const nextSection = remainder.search(/\n\s*(?:ANEXO\b|#{1,6}\s+|[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{5,}:)\s*/);
  return normalizeText(nextSection === -1 ? remainder : remainder.slice(0, nextSection));
};

const candidateLabel = (candidate) =>
  [candidate.filename, candidate.contentId, candidate.altText, candidate.url]
    .map(normalizeText)
    .filter(Boolean)
    .join(' ');

export const getImageRejectionReasons = (candidate) => {
  if (!candidate || typeof candidate !== 'object') return ['candidato inválido'];

  const reasons = [];
  const label = candidateLabel(candidate);
  const width = Number(candidate.width || 0);
  const height = Number(candidate.height || 0);
  const byteSize = Number(candidate.byteSize || 0);

  if (!normalizeText(candidate.url)) reasons.push('falta url o ruta pública');
  if (!normalizeText(candidate.mimeType).startsWith('image/')) reasons.push('no es una imagen');
  if (width < MIN_WIDTH || height < MIN_HEIGHT) reasons.push('dimensiones insuficientes');
  if (byteSize < MIN_BYTES) reasons.push('archivo demasiado chico');
  if (BRANDING_PATTERN.test(label)) reasons.push('firma o branding detectado');
  if (width && height && (width / height > 4 || height / width > 2)) {
    reasons.push('proporción típica de banner, ícono o firma');
  }

  return reasons;
};

export const selectNewsCover = ({ bodyText = '', images = [], generatedImage = null } = {}) => {
  const imageGuidelines = extractImageGuidelines(bodyText);
  const assessedImages = images.map((candidate) => ({
    candidate,
    rejectionReasons: getImageRejectionReasons(candidate),
  }));
  const explicitImage = assessedImages.find(
    ({ candidate, rejectionReasons }) =>
      rejectionReasons.length === 0 && candidate.source !== 'generated',
  );

  if (explicitImage) {
    return {
      coverImage: explicitImage.candidate.url,
      strategy: 'explicit-image',
      imageGuidelines,
      rejectedImages: assessedImages.filter(({ rejectionReasons }) => rejectionReasons.length > 0),
    };
  }

  if (imageGuidelines && generatedImage) {
    const rejectionReasons = getImageRejectionReasons({
      ...generatedImage,
      source: 'generated',
    });
    if (rejectionReasons.length === 0) {
      return {
        coverImage: generatedImage.url,
        strategy: 'generated-from-guidelines',
        imageGuidelines,
        rejectedImages: assessedImages.filter(({ rejectionReasons: reasons }) => reasons.length > 0),
      };
    }
  }

  return {
    coverImage: null,
    strategy: 'fallback',
    imageGuidelines,
    rejectedImages: assessedImages.filter(({ rejectionReasons }) => rejectionReasons.length > 0),
  };
};
