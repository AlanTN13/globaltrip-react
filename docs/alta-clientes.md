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

La fuente también menciona fichas individuales en Drive y correos (C24:C25). Se consultó por separado ese alcance: esta implementación cubre el objetivo solicitado de formulario y persistencia en Sheet, sin enviar mensajes. La dirección de Yamila escrita en la fuente requiere confirmación antes de implementar correos.

## Arquitectura

Cliente → React/Vite → `POST /api/alta-clientes` (Vercel Node) → Apps Script dedicado, solicitud firmada HMAC-SHA256 → `Hoja 1` de la Sheet destino → comprobante solo después de escribir, `flush()` y verificar ID/huella.

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

Vercel, exclusivamente en `Preview` y rama `feat/alta-clientes-postventa`:

- `ALTA_CLIENTES_WEBHOOK_URL`: URL `/exec` del receptor.
- `ALTA_CLIENTES_SECRET`: secreto aleatorio de 32 bytes, idéntico al de Apps Script.

Apps Script, proyecto independiente `GlobalTrip - Alta clientes - Preview`:

- Código: `google-apps-script/alta-clientes.gs`.
- Manifiesto: `google-apps-script/alta-clientes-appsscript.json`.
- Propiedades: `ALTA_CLIENTES_SECRET` y `ALTA_CLIENTES_SHEET_ID`.
- Implementar app web, ejecutar como cuenta desplegadora, accesible a cualquiera; el handler exige firma antes de acceder a datos. No editar el Apps Script comercial.
- La Sheet debe tener exactamente los 17 encabezados de `HEADERS` en A1:Q1, pestaña `Hoja 1`. A = ID, B = fecha UTC, C = entorno, Q = huella HMAC. Un cambio de encabezados provoca error seguro, no escritura desalineada.

## Operación y publicación posterior

En error, mantener los datos y reintentar. Si hay demora o se perdió la respuesta, el reenvío recupera el comprobante ya existente. Si persiste un 502, revisar disponibilidad/versión del Apps Script, sus propiedades, permisos, cuotas y encabezados; no cargar manualmente una fila para compensar.

Producción queda pendiente: aprobar PR, definir credenciales/receptor de producción y configurar variables de Production, verificar permisos y repetir un alta controlada. No promover este preview sin configurar explícitamente esas variables. Publicar código de frontend no publica automáticamente una nueva versión del Apps Script.

## Pruebas

`npm run build`, `npm run alta:test`, `npm run news:test`. Lint dirigido a archivos modificados pasa. `npm run lint` general tiene un error preexistente `react-hooks/set-state-in-effect` en `src/components/Header.jsx:29`.

Las pruebas automatizadas cubren condicionales, normalización, errores, firma, origen, respuestas falsas, deduplicación durable, conflicto de ID, escape de fórmulas y liberación del bloqueo. El entorno de Apps Script está simulado en estas pruebas; la evidencia del envío real se registra por separado en el PR.
