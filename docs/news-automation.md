# Automatización de noticias

Las noticias viven como archivos JSON independientes en `src/data/news/`. El frontend
las reúne automáticamente y conserva el orden por fecha, la noticia destacada y el
fallback de imagen existentes.

## Incorporar una noticia normalizada

La automatización externa debe preparar un JSON con esta forma:

```json
{
  "title": "Título",
  "slug": "titulo",
  "category": "aduana",
  "publishedAt": "2026-08-13",
  "coverImage": "https://example.com/imagen.jpg",
  "excerpt": "Resumen",
  "sourceName": "Fuente",
  "sourceUrl": "https://example.com/noticia",
  "seoTitle": "Título SEO",
  "metaDescription": "Descripción SEO",
  "content": [{ "type": "paragraph", "text": "Contenido" }],
  "gmailMessageId": "id-inmutable-de-gmail"
}
```

`coverImage` es opcional y debe ser una URL `https` o una ruta pública absoluta. Si se
omite, la UI usa el fallback actual. `featured` también
es opcional y, cuando se incluye, debe ser booleano. Las categorías admitidas son
`aduana`, `economia`, `exportacion`, `importacion` y `logistica`. Los bloques de
contenido admiten `paragraph`, `heading`, `quote` (con `text`) y `list` (con `items`).

Antes de modificar el repositorio, incorporar el archivo con:

```bash
npm run news:add -- /ruta/a/noticia-normalizada.json
```

El comando valida la colección completa y rechaza campos faltantes, slugs o categorías
inválidos, contenido mal formado y duplicados de `slug` o `gmailMessageId`. Solo crea
`src/data/news/<slug>.json` cuando toda la colección es válida. Nunca modifica Gmail.

Luego, el flujo externo puede ejecutar:

```bash
npm run news:validate
npm run build
```

El commit, deploy, verificación y marcado del correo como procesado deben ocurrir en ese
orden y fuera de estos scripts. El correo solo debe marcarse después de verificar el
deploy exitoso.

## Criterio de selección de portada

El normalizador externo debe enviar los candidatos a `npm run news:cover -- entrada.json`
con URL pública, MIME type, ancho, alto, tamaño, nombre de archivo, origen (`attachment`
o `inline`) y, cuando exista, `contentId` y texto alternativo. El comando usa
`scripts/news-cover.mjs` y devuelve una decisión JSON auditable. No se debe copiar el
primer adjunto o la primera imagen inline directamente a `coverImage`.

La selección aplica este orden:

1. imagen explícita válida enviada con el contenido;
2. imagen generada o preparada a partir de `ANEXO — LINEAMIENTOS PARA LA IMAGEN`;
3. fallback del frontend, únicamente cuando no existe una opción mejor.

Se rechazan candidatos menores a 640 × 360 px o 50 KB, proporciones extremas típicas
de banners o íconos y nombres/metadatos asociados a firmas, logos, branding, redes
sociales, píxeles de seguimiento o separadores. Una imagen inline puede ser válida,
pero nunca por el solo hecho de ser inline: debe superar los mismos controles.

`extractImageGuidelines()` conserva el texto del anexo para usarlo como instrucción
principal al preparar la imagen. `selectNewsCover()` devuelve la estrategia aplicada,
la portada elegida y los descartes con sus motivos para permitir auditoría del flujo.
