# Handoff del Sprint: Módulo de Autenticación y Fundamentos Mobile


# Unidades productivas

Se ha implementado el listado y selección de la unidad productiva activa dentro del flujo autenticado, consumiendo los endpoints de `BE-PU-001` / `API-PU-001`.

### Flujo de Experiencia de Usuario (UX)
1. **Organización activa**: El usuario inicia sesión y selecciona la organización activa en el formulario de inicio de sesión.
2. **Listar unidades productivas**: Al ingresar a la aplicación (`HomeView`), se realiza una llamada al endpoint real `/organizations/{org_id}/production-units` para obtener las unidades de la organización activa.
3. **Seleccionar unidad activa**: Si no hay ninguna seleccionada, se muestra una pantalla de selección con todos los estados requeridos (cargando, error, vacía, bloqueada, éxito).
4. **Conservar contexto**: Tras elegir la unidad activa, se almacena en el `RanchoContext` y se despliega el Dashboard principal. El nombre de la unidad se muestra en la barra de navegación superior junto al de la organización.
5. **Re-selección**: Al pulsar el botón de retroceso (flecha de volver) al lado del nombre de la unidad, se limpia la selección y se vuelve al listado de unidades productivas.

### Contratos de API Consumidos
* **Listar unidades productivas**: `GET /api/v1/organizations/{org_id}/production-units` (definido en `coreService.getProductionUnits`).
* **Respaldo Mock Contract-Safe**: Si la API está caída o el backend no está disponible, se realiza un fallback automático a una respuesta de simulación contract-safe que emula el formato de datos esperado del contrato de backend.

