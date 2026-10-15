# Recuperación Noticias — 2026-10-15

EXECUTION PREFLIGHT
- Rol/superficie: Dirección de Ejecución; web globaltrip-react y tarea existente de Noticias.
- Autorización: encargo adjunto de Alan 15/10: portada segunda Courier, prevención simple, correo1a13cc23be6628ab, recuperación y detección de fallas.
- Contexto: AlanOS c782888; Execution_Runtime_Contract.md, Bootstrap V2, Delivery Team Design y GlobalTrip/Automatizacion_Noticias_2026-08-13.md.
- Baseline: main acd59bb9d57bc551bae86eed7103a2e525e22d28; checkout limpio.
- Budget M/T2/R2. Ejecución directa, un escritor: cambios locales independientes de control del scheduler, integración centralizada. Sin cambios de auth/datos sensibles.
- PATCH MODE: congelados diseño, contenido histórico salvo portada expresamente autorizada, dedupe por Gmail ID/slug, cotizador y demás clientes. No backfill.
- Validación: tests focalizados, build, preview desktop/móvil, PR/merge, producción y Gmail posterior. Scheduler: estado/historial/notificaciones/control real, separar límites de observabilidad de causa.
- Rollback web: revertir exclusivamente commit de este PR; no tocar publicaciones ajenas. Scheduler: conservar configuración anterior antes de mutar.
- STOP: fuente material no verificable bloquea sólo publicación; falta de observabilidad no acredita continuidad. No agregar publicador paralelo.

Estado: ejecución en curso. Scheduler sin causa demostrada; no declarar estable por reactivación.
