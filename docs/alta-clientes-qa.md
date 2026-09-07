# Evidencia de aceptación — 7 septiembre 2026

Código funcional validado: `243bb24` (rama `feat/alta-clientes-postventa`, base `main` `5e696f8`).

Preview validado: https://globaltrip-react-lg5carq8t-alan-fernandezs-projects-f6e1f457.vercel.app/alta-cliente

| Prueba | Resultado observado |
| --- | --- |
| Alta real desde navegador | Comprobante `b6846d07-a0a2-44d9-9c37-ece9c760aa8d`; pantalla «Tu alta quedó registrada» |
| Lectura independiente de Sheet | Una fila en `Hoja 1!A2:Q2`, fecha `2026-09-07T20:05:45.770Z`, entorno `preview` |
| Doble clic en envío | Botón y edición deshabilitados inmediatamente; una fila |
| Tres reenvíos simultáneos vía API | Tres HTTP 200, `duplicate: true`, mismo comprobante; incluye un ID de solicitud distinto |
| Reenvío móvil desde otra pestaña | Mismo comprobante y una sola fila después de completar nuevamente los cuatro pasos |
| Mismo ID con datos distintos | HTTP 409 `idempotency_conflict`; ninguna fila adicional |
| Asesor fuera de la ficha | HTTP 422, error asociado al campo `asesor` |
| Origin ajeno | HTTP 403 `invalid_origin` |
| Apps Script sin firma válida | `{ "ok": false, "error": "unauthorized" }` |
| Campos obligatorios vacíos | Mensajes junto a los campos; foco en el primero |
| Importador registrado | Aparece únicamente para Responsable inscripto |
| Curso = Sí, nombre vacío | Impide continuar y solicita el curso |
| Error de integración | Datos conservados, mensaje claro, reintento habilitado, sin falso éxito |
| Responsive | Escritorio 1054 px y móvil 390 × 844; ancho de documento móvil 390 px, sin desborde |
| Pruebas locales | Build OK; 3 grupos de pruebas del alta y 9 de noticias pasan |
| Lint | Archivos modificados pasan; error preexistente en Header.jsx:29 |

La única fila es ficticia y se identifica como `PRUEBA QA NEXOPS - NO ES CLIENTE`; email reservado `qa@example.com`. Se conserva como evidencia, no es un cliente real.

La prueba real atravesó navegador → API Vercel → Apps Script → Sheet → comprobante. Las llamadas de lectura mediante el conector de Google fueron verificación independiente, no el mecanismo de persistencia. Las pruebas de API emplearon acceso temporal al preview protegido sin desactivar la protección de Vercel.

Producción no se desplegó ni modificó. Ambas variables nuevas se guardaron solo en Preview, restringidas a esta rama. El receptor de contacto/newsletter no fue alterado.
