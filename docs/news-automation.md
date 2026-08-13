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

`coverImage` es opcional. Si se omite, la UI usa el fallback actual. `featured` también
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
