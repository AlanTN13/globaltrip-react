# Alta de clientes postventa

Ruta compartible: `/alta-cliente`. Usa el header y footer compartidos del sitio, con acceso «Alta de cliente» en la navegación de escritorio, menú móvil y enlaces del footer. No aparece en el sitemap. No comparte formulario, handler ni credenciales con contacto/newsletter.

## Fuente y correspondencia

Se inspeccionó el archivo original `Ficha Alta de Clientes (Datos) - PARA ALAN.xlsx`, única pestaña `Ficha de Cliente`, rango C11:D22. El archivo no tiene validaciones nativas: las opciones están escritas en D13 y D22.

| Fuente | Campo web | Hoja destino |
| --- | --- | --- |
| C11 | Nombre, apellido o razón social según ARCA-AFIP | D |
| C12 | CUIT/CUIL | E |
| C13:D13 | Consumidor final / Monotributista / Responsable inscripto | F |
| C14 | Importador registrado, solo para responsable inscripto | G |
| C15 | Por dónde nos conocieron, texto libre | H |
| C16 | Viene de un curso: Sí/No; cuál obligatorio cuando Sí | I:J |
| C17 | Teléfono con país/área | K |
| C18 | E-mail | L |
| C19 | Domicilio | M |
| C20 | Contacto de operación, texto libre | N |
| C21 | Contacto administrativo, texto libre | O |
| C22:D22 | Asesor: seis opciones exactas de Germán | P |

Se conservó literalmente `Matias Pricipato`, tal como aparece en D22. Los contactos permiten escribir nombre y medio de contacto sin imponer un esquema adicional. Todos los datos de la ficha son obligatorios cuando aplican. Campos condicionales ocultos se limpian y se registran como `No aplica`.

La fuente también menciona fichas individuales en Drive y correos (C24:C25). La implementación cubre el formulario, persistencia en Sheet y aviso interno por mail. Las fichas individuales en Drive quedan fuera del alcance. La dirección de Yamila escrita en la fuente requiere confirmación antes de implementar correos.

## Arquitectura

Cliente → React/Vite → `POST /api/alta-clientes` (Vercel Node) → Apps Script dedicado, solicitud firmada HMAC-SHA256 → `Hoja 1` de la Sheet destino → confirmación al cliente solo después de escribir, `flush()` y verificar ID/huella. El identificador de registro se conserva internamente para confirmar el resultado y deduplicar; la pantalla muestra un agradecimiento y los próximos pasos con el asesor, sin exponer el comprobante.

Se reutilizan React Router, diseño/logo/fuentes, Vercel y Apps Script como tecnología ya presente. No se agrega base de datos, cuenta de servicio ni dependencia de automatización manual. Las funciones Node en `/api` están soportadas en [Vite sobre Vercel](https://vercel.com/docs/frameworks/frontend/vite); [LockService](https://developers.google.com/apps-script/reference/lock) serializa la comprobación de duplicados y la escritura.

## Contrato y seguridad

- Esquema y validaciones compartidos por cliente/API/receptor. `npm run alta:script` genera el `.gs` desde el mismo validador; mantenerlo sincronizado antes de publicar una nueva versión de Apps Script.
- API: JSON solamente, tamaño máximo 12 KB, método y Origin, sesión firmada de dos horas, honeypot, límites de longitud, CUIT/CUIL con dígito verificador, email, teléfono, enums y condicionales.
- La URL y la clave del receptor son variables de servidor, jamás `VITE_`. No se envían a analítica ni a logs datos personales, firmas o claves.
- Receptor: firma HMAC, ventana temporal de cinco minutos y validación completa antes de acceder a la Sheet. GET no lee datos. Solo usa el ID configurado y la pestaña `Hoja 1`.
- OAuth de Apps Script requiere permiso amplio de Sheets de la cuenta desplegadora. El usuario autorizó expresamente ese permiso para este receptor. El código no accede a otras hojas ni incluye operaciones de borrado.
- El frontend bloquea doble submit sin esperar un rerender. El receptor mantiene el bloqueo durante la comprobación y escritura. Mismo ID + datos distintos → conflicto. Mismo ID + datos iguales → comprobante anterior. Mismos datos normalizados + entorno, aunque cambie el ID, se deduplican durante 24 horas.
- La deduplicación persiste en A/Q de la propia fila, no en memoria. Mantener ambas columnas íntegras y ordenar filas completas. No borrar filas para reintentar envíos.
- Cuotas de mitigación: 10 altas por IP/10 minutos y 60 globales/10 minutos en cache de Apps Script; son best effort, no reemplazan una protección contra ataques distribuidos. Duplicados confirmados devuelven comprobante sin consumir cuota.
- Textos con prefijos de fórmula se escapan; CUIT/CUIL y teléfonos permanecen texto. No hay credenciales de Google en el navegador.
- Los datos del formulario permanecen en memoria durante la navegación entre pasos y un error de red. No se guardan datos personales en almacenamiento local. Recargar la página borra el borrador; volver a enviar los mismos datos queda cubierto por la huella durante 24 horas.
- API y receptor no aceptan una respuesta HTML, un HTTP 200 sin comprobante o una escritura no confirmada como éxito.

## Configuración

Vercel: configurar estas variables de servidor en `Production` y en `Preview` para la rama `feat/alta-clientes-postventa`:

- `ALTA_CLIENTES_WEBHOOK_URL`: URL `/exec` del receptor.
- `ALTA_CLIENTES_SECRET`: secreto aleatorio de 32 bytes, idéntico al de Apps Script.

Apps Script, proyecto independiente `GlobalTrip - Alta clientes - Preview`:

- Código: `google-apps-script/alta-clientes.gs`.
- Manifiesto: `google-apps-script/alta-clientes-appsscript.json`.
- Propiedades: `ALTA_CLIENTES_SECRET`, `ALTA_CLIENTES_SHEET_ID` y `ALTA_CLIENTES_MAIL_TO` (direcciones internas separadas por coma).
- Implementar app web, ejecutar como cuenta desplegadora, accesible a cualquiera; el handler exige firma antes de acceder a datos. No editar el Apps Script comercial.
- La Sheet debe tener exactamente los 17 encabezados de `HEADERS` en A1:Q1, pestaña `Hoja 1`. A = ID, B = fecha UTC, C = entorno, Q = huella HMAC. Un cambio de encabezados provoca error seguro, no escritura desalineada.

## Operación y publicación posterior

En error, mantener los datos y reintentar. Si hay demora o se perdió la respuesta, el reenvío recupera el comprobante ya existente. Si persiste un 502, revisar disponibilidad/versión del Apps Script, sus propiedades, permisos, cuotas y encabezados; no cargar manualmente una fila para compensar.

Publicar después de configurar las variables de Production, autorizar el envío de correos, instalar el activador y verificar un alta controlada. No promover un preview: generar un despliegue de Production para que las filas queden marcadas correctamente. Publicar código de frontend no publica automáticamente una nueva versión del Apps Script.

## Pruebas

`npm run build`, `npm run alta:test`, `npm run news:test`. Lint dirigido a archivos modificados pasa. `npm run lint` general tiene un error preexistente `react-hooks/set-state-in-effect` en `src/components/Header.jsx:29`.

Las pruebas automatizadas cubren condicionales, normalización, errores, firma, origen, respuestas falsas, deduplicación durable, conflicto de ID, escape de fórmulas y liberación del bloqueo. El entorno de Apps Script está simulado en estas pruebas; la evidencia del envío real se registra por separado en el PR.

## Aviso interno por correo

Al confirmar el último paso, el receptor escribe, hace flush y verifica la fila definitiva; recién entonces intenta enviar el aviso antes de devolver la confirmación al navegador. Navegar entre pasos no guarda ni envía correos. El mismo bloqueo serializa el envío inmediato y el proceso de respaldo para evitar duplicados. Un fallo del mail no revierte el alta ni produce un falso error de persistencia. El activador queda como respaldo para filas todavía sin intento de envío, por ejemplo ante falta de cuota. `setupAltaNotifications` prepara la pestaña «Avisos de alta» y crea un único activador de `processAltaNotifications`. Usa MailApp con permiso de envío solamente, más el permiso para administrar el activador. El remitente es la cuenta que ejecuta la app web y el activador.

El procesador solo toma filas `production`; el destinatario se obtiene de `ALTA_CLIENTES_MAIL_TO`, nunca de campos enviados por el cliente. El correo incluye los 13 datos de la ficha, fecha de Argentina y enlace a la hoja, con el diseño aprobado y sin leyendas de prueba. El texto libre se escapa para HTML. No envía un correo al cliente ni copia direcciones de su ficha.

El estado se guarda por ID en «Avisos de alta»: ENVIANDO antes de llamar al correo y ENVIADO cuando el proveedor acepta el mensaje. Reejecutar no repite IDs procesados. Si falta cuota, se retoma en una ejecución posterior. Si el proveedor falla o se interrumpe la ejecución después de iniciar el envío, queda REVISAR o ENVIANDO: verificar Enviados antes de reintentar manualmente. Google Sheets y MailApp no comparten una transacción, por lo que no se promete entrega exactamente una vez ante una caída en ese intervalo. El alta siempre permanece registrada.

No editar ni reordenar la pestaña de seguimiento mientras se procesa. El historial de correos y el ID de cada fila deben conservarse. `testAltaNotification` solo procesa el ID de preview explícito configurado en `ALTA_CLIENTES_MAIL_TEST_ID`; no se agenda y no reproduce el resto de las pruebas.
