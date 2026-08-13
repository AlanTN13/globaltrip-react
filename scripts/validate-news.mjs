import { loadNewsEntries } from './news-files.mjs';
import { validateNewsCollection } from './news-validation.mjs';

try {
  const entries = await loadNewsEntries();
  const errors = validateNewsCollection(entries);

  if (errors.length > 0) {
    console.error(`Validación fallida (${errors.length} error${errors.length === 1 ? '' : 'es'}):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`${entries.length} noticias válidas, sin slugs ni gmailMessageId duplicados.`);
  }
} catch (error) {
  console.error(`No se pudieron validar las noticias: ${error.message}`);
  process.exitCode = 1;
}
