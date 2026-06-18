# Handoff del Sprint: Módulo de Autenticación y Fundamentos Mobile

## Resumen

Este documento resume el trabajo entregado en este sprint para la aplicación móvil, detallando el estado actual de los criterios de aceptación y los endpoints pendientes de integrar para completar los flujos de negocio.

# Consideraciones Actuales

Actualmente el entorno de desarrollo opera sin una base de datos funcional conectada. Para permitir el avance del frontend móvil, se implementó una capa de autenticación simulada (mock) compatible con el formato estándar de errores (`standard_error`), permitiendo validar flujos de navegación y estados de pantalla sin depender de infraestructura persistente.

Una vez habilitada la capa de persistencia y los servicios reales, será necesario sustituir los mocks por integraciones directas con los endpoints definitivos.

# Unidades productivas

El modulo de unidad productiva queda pendiente para ser completado en el PR de la tarea LUM-53.

# states

Se ha implementado un loader temporal con asincronia simulada

---

# Endpoints Pendientes para Completar los Flujos del Negocio

## 1. Manejo de Sesión y Organización Base

### Obtener usuario autenticado

```http
GET /api/v1/users/me
```

**Responsabilidad**

* Retornar información básica del usuario autenticado.
* Rol global.
* Permisos efectivos.
* Organización activa.
* Contexto operativo actual.

### Obtener organizaciones disponibles

```http
GET /api/v1/organizations
```

**Responsabilidad**

* Listar organizaciones asociadas al usuario.
* Permitir poblar el selector de organizaciones.

**Estado actual**

* Contrato parcialmente simulado en la interfaz.

### Seleccionar organización activa

```http
POST /api/v1/organizations/{org_id}/select
```

**Responsabilidad**

* Cambiar el contexto operativo de la sesión.
* Generar un token contextualizado por organización o actualizar la sesión activa.

---

## 2. Gestión de Unidades Productivas

Basado en:

```http
/api/v1/mocks/production-units/contract
```

### Consultar unidades productivas

```http
GET /api/v1/production-units
```

**Responsabilidad**

* Obtener las unidades productivas asociadas a la organización activa.

### Crear unidad productiva

```http
POST /api/v1/production-units
```

**Responsabilidad**

* Registrar una nueva unidad productiva.
* Asociarla a la organización seleccionada.

---

## 3. Ganadería e Inventario

Basado en:

```http
/api/v1/mocks/livestock/contract
```

### Consultar inventario ganadero

```http
GET /api/v1/livestock
```

Alternativamente:

```http
GET /api/v1/animals
GET /api/v1/lots
```

**Responsabilidad**

* Consultar animales o lotes registrados.
* Filtrar por organización y unidad productiva.

### Registrar animal o lote

```http
POST /api/v1/livestock
```

**Responsabilidad**

* Crear un nuevo animal.
* Registrar un lote ganadero.
* Asociar registros a la unidad productiva correspondiente.

---

## 4. Eventos Sanitarios

Basado en:

```http
/api/v1/mocks/health-events/contract
```

### Registrar evento sanitario

```http
POST /api/v1/health-events
```

**Responsabilidad**

* Registrar vacunaciones.
* Registrar tratamientos.
* Registrar enfermedades.
* Registrar controles sanitarios.
* Asociar el evento al animal o lote correspondiente.

---

## 5. Sincronización e Idempotencia Mobile

Basado en:

```http
/api/v1/mocks/sync/contract
```

### Sincronización offline

```http
POST /api/v1/sync
```

**Responsabilidad**

* Permitir envío de operaciones pendientes.
* Resolver conflictos de sincronización.
* Procesar operaciones almacenadas localmente.

### Idempotencia de operaciones

**Recomendación**

Implementar soporte mediante:

```http
Idempotency-Key: <uuid>
```

o identificadores temporales generados por el dispositivo móvil.

**Objetivo**

* Evitar duplicación de registros durante reintentos.
* Garantizar consistencia cuando exista pérdida de conectividad.

---

## 6. Seguimiento de Operaciones

### Consultar estado de operación

Endpoint pendiente de definir:

```http
GET /api/v1/operations/{operation_id}
```

**Estados esperados**

* `pending`
* `applied`
* `rejected`

**Responsabilidad**

* Permitir que la aplicación móvil consulte el resultado de procesos asíncronos.
* Informar al usuario el estado final de la transacción.

---


# Estado General del Sprint

Se completó la base de autenticación, navegación inicial y flujo de incorporación de usuarios mediante mocks. Los módulos de negocio principales (organizaciones, unidades productivas, inventario, sanidad y sincronización) permanecen pendientes de integración con servicios reales a espera de la interfaz .
