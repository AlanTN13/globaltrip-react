# GlobalTrip — Entrada de agentes

Las instrucciones superiores de la plataforma y los controles reales de acceso prevalecen siempre.

## Gobierno AlanOS

Antes de trabajo sustantivo, leer por una vía autorizada la versión vigente de `Alan/01_Architecture/Execution_Runtime_Contract.md` en `AlanTN13/Alanos` y registrar la revisión consultada.

URL canónica: https://github.com/AlanTN13/Alanos/blob/main/Alan/01_Architecture/Execution_Runtime_Contract.md

Un enlace no se carga solo. Si el contrato no está accesible, declarar `BLOCKED_EXTERNAL` y no iniciar cambios; no reconstruir reglas de memoria ni ampliar exploración por reflejo. Una sesión ya abierta no se da por actualizada.

Contexto de negocio/cuenta en AlanOS:
- `Alan/04_Clientes NexOps/Global_Trip/`;
- `Alan/04_Clientes NexOps/GlobalTrip/`.

Leer sólo lo necesario para el resultado pedido y verificar la decisión más reciente. El repositorio técnico conserva la verdad de código, PR, CI y deploy; AlanOS conserva contexto, decisiones, prioridad y compromisos.

## Preflight obligatorio

Antes de modificar, dejar evidencia compacta de:

```text
EXECUTION PREFLIGHT
Rol y superficie real:
Resultado y autorización:
Contexto verificado / revisión:
Budget / tipo / riesgo:
Dentro y fuera de alcance:
Aceptación y validaciones:
Permisos de producción / recuperación:
STOP y señal de BUDGET_RISK:
```

## Límites

- Una consulta, revisión o asunción de rol no autoriza ejecución.
- No ampliar alcance por hallazgos laterales.
- Un hallazgo no bloqueante se registra; no se implementa automáticamente.
- Si un defecto invalida el resultado o seguridad, no declarar éxito.
- No tocar producción, publicar noticias, etiquetar correos, modificar datos reales, secretos o permisos sin el gate específico vigente.
- No inferir que merge, deploy o validación de cliente son lo mismo.
- No cambiar decisiones de negocio o compromisos con GlobalTrip desde el repositorio técnico.

## Cierre

Toda entrega no trivial debe dejar evidencia durable y `EXECUTION RECEIPT`/checkpoint según el contrato vigente, con qué se hizo, qué se validó realmente, qué quedó fuera y dónde detenerse.
