# SPRINT 2 HANDOFF: Entregables Mobile & Contratos API

Este documento contiene la especificación de diseño de integración ("contract-first") entre la aplicación Mobile y el Backend para la autenticación, selección de organización y preparación para el desarrollo del Sprint 3.

---

## 1. Checklist de Necesidades Mobile (Auth y Organizaciones - Sprint 2)

Para garantizar un flujo óptimo y seguro en la aplicación móvil durante el Sprint 2, se requieren las siguientes capacidades en los flujos de autenticación e inicio de sesión:

- [ ] **Validación de Número de Teléfono (Pre-login)**
  - Comprobación rápida para decidir si el teléfono está registrado (ir a ingreso de contraseña) o no (ir a registro o invitación).
- [ ] **Autenticación Basada en Contraseña**
  - Inicio de sesión tradicional mediante número telefónico y contraseña de usuario.
- [ ] **Flujo OTP (One-Time Password) vía SMS**
  - Envío y verificación de código de 6 dígitos para validación de número celular, flujo de invitación y recuperación/restablecimiento de contraseña.
- [ ] **Acceso Multi-Organización (Multi-tenant) y Roles**
  - Tras el login, soporte para que un mismo usuario pertenezca a múltiples Organizaciones/Ranchos.
  - Obtener el listado de organizaciones vinculadas junto con su **Rol** en cada una
  - Selección de la organización activa en el inicio de la app.
- [ ] **Persistencia y Renovación de Tokens**
  - Uso de tokens de sesión estándar (JWT) con un `Access Token` corto y un `Refresh Token` para renovación en segundo plano.
  - Almacenamiento seguro en el cliente móvil utilizando `SecureStore` (iOS/Android).

---

## 2. Lista de Endpoints Requeridos (Sprint 3)

Propuesta de firmas y contratos de API para sprint3:

### Módulo de Autenticación (`/auth`)

#### 1. Verificar Teléfono
* **Endpoint:** `POST /api/v1/auth/check-phone`
* **Request Body:**
  ```json
  {
    "phone": "+525512345678"
  }
  ```
* **Response:**
  ```json
  {
    "exists": true,
    "verified": true
  }
  ```

#### 2. Login con Contraseña
* **Endpoint:** `POST /api/v1/auth/login`
* **Request Body:**
  ```json
  {
    "phone": "+525512345678",
    "password": "Password"
  }
  ```
* **Response:**
  ```json
  {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "rf_eyJhbGci...",
    "expires_in": 3600,
    "user": {
      "id": "usr_982347a",
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez@email.com",
      "phone": "+525512345678",
    }
  }
  ```

#### 3. Registro
Datos de request pendientes por definir.
* **Endpoint:** `POST /api/v1/auth/register`
* **Request Body:**
  ```json
  {
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan.perez@email.com",
    "phone": "+525512345678",
    "password": "PasswordSegura123"
  }
  ```
* **Response:**
  ```json
  {
    "message": "Registro exitoso. Código de verificación enviado.",
    "otp_ttl_seconds": 30
  }
  ```

#### 4. Enviar Código OTP (SMS)
* **Endpoint:** `POST /api/v1/auth/otp/send`
* **Request Body:**
  ```json
  {
    "phone": "+525512345678",
    "reason": "register" | "forgot_password" // "register", "reset_password", "invitation"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "otp_ttl_seconds": 30
  }
  ```

#### 5. Verificar Código OTP
* **Endpoint:** `POST /api/v1/auth/otp/verify`
* **Request Body:**
  ```json
  {
    "phone": "+525512345678",
    "code": "123456",
    "reason": "register" | "forgot_password"
  }
  ```
* **Response:**
  ```json
  {
    "verified": true,
    "temp_token": "tmp_tok_abcdef123" // Opcional, para flujos como reestablecer contraseña
  }
  ```

#### 6. Restablecer Contraseña
* **Endpoint:** `POST /api/v1/auth/password/reset`
* **Request Body:**
  ```json
  {
    "phone": "+525512345678",
    "temp_token": "tmp_tkn",
    "new_password": "NewPassword"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "message": "Contraseña actualizada correctamente"
  }
  ```

---

### Módulo de Organizaciones y Roles (`/organizations`)

#### 7. Listar Organizaciones del Usuario
* **Endpoint:** `GET /api/v1/user/organizations`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    {
      "org_id": "org_amanecer",
      "org_name": "Rancho El Amanecer",
      "role": "Administrador"
    },
    {
      "org_id": "org_robles",
      "org_name": "Ganadera Los Robles",
      "role": "Supervisor"
    }
  ]
  ```

#### 8. Seleccionar Organización
* **Endpoint:** `POST /api/v1/user/organizations/select`
* **Headers:** `Authorization: Bearer <access_token>`
* **Request Body:**
  ```json
  {
    "org_id": "org_amanecer"
  }
  ```
* **Response:**
  ```json
  {
    "access_token": "eyJhbGciOi...org_context_encoded...",
    "active_org": {
      "org_id": "org_amanecer",
      "org_name": "Rancho El Amanecer",
      "role": "Administrador"
    }
  }
  ```

---

### Módulo de Unidades Productivas (`/production-units`)

#### 9. Listar Unidades Productivas de la Organización
* **Endpoint:** `GET /api/v1/organizations/{org_id}/production-units`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    {
      "id": "pu_amanecer_principal",
      "name": "Sección Agrícola Principal",
      "address": {
        "street": "Carr. Nacional Km 45",
        "city": "Montemorelos",
        "state": "Nuevo León",
        "country": "México"
      },
      "membership": {
        "joined_at": "2026-01-10T14:30:00Z",
        "status": "active"
      }
    },
    {
      "id": "pu_amanecer_invernaderos",
      "name": "Complejo Invernaderos A-C",
      "address": {
        "street": "Camino Vecinal Ejido La Luz S/N",
        "city": "Montemorelos",
        "state": "Nuevo León",
        "country": "México"
      },
      "membership": {
        "joined_at": "2026-03-12T09:00:00Z",
        "status": "active"
      }
    }
  ]
  ```

#### 10. Detalle de Unidad Productiva
* **Endpoint:** `GET /api/v1/organizations/{org_id}/production-units/{pu_id}`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  {
    "id": "pu_amanecer_principal",
    "name": "Sección Agrícola Principal",
    "address": {
      "street": "Carr. Nacional Km 45",
      "city": "Montemorelos",
      "state": "Nuevo León",
      "country": "México"
    },
    "locations": [
      {
        "location_id": "loc_paddock_1",
        "name": "Potrero Norte 1",
      },
      {
        "location_id": "loc_corral_a",
        "name": "Corral de Engorda A",
      }
    ]
  }
  ```

#### 11. Listar Ubicaciones Internas
* **Endpoint:** `GET /api/v1/organizations/{org_id}/production-units/{pu_id}/locations`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    {
      "location_id": "loc_paddock_1",
      "name": "Potrero Norte 1",
      "type": "paddock"
    },
    {
      "location_id": "loc_corral_a",
      "name": "Corral de Engorda A",
      "type": "corral"
    }
  ]
  ```

---

### Módulo de Catálogos Base (`/catalogs`)

#### 12. Consultar Catálogos de Especies
* **Endpoint:** `GET /api/v1/catalogs/species`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    { "id": "spec_bovine", "name": "Bovino" },
    { "id": "spec_equine", "name": "Equino" },
    { "id": "spec_poultry", "name": "Avícola" }
  ]
  ```

#### 13. Consultar Catálogos de Razas por Especie
* **Endpoint:** `GET /api/v1/catalogs/breeds`
* **Query Params:** `species_id=spec_bovine`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    { "id": "breed_angus", "name": "Angus", "species_id": "spec_bovine" },
    { "id": "breed_hereford", "name": "Hereford", "species_id": "spec_bovine" },
    { "id": "breed_charolais", "name": "Charolais", "species_id": "spec_bovine" }
  ]
  ```

#### 14. Consultar Tipos de Producción
* **Endpoint:** `GET /api/v1/catalogs/production-types`
* **Headers:** `Authorization: Bearer <access_token>`
* **Response:**
  ```json
  [
    { "id": "prod_meat", "name": "Carne" },
    { "id": "prod_milk", "name": "Leche" },
    { "id": "prod_agriculture", "name": "Agrícola" }
  ]
  ```

---

## 3. Dudas y Bloqueos (API / Backend / UX)

1. **Contexto Multitenant y Token de Sesión:**
   ¿Se asociara la organización activa al token del usuario?
2. **Control y Validación de Roles en Mobile:**
   ¿Qué endpoints estarán restringidos por rol en el backend para evitar consumos no autorizados?
3. **Estructura Geográfica de las Direcciones (`addresses`):**
   ¿Las direcciones de las unidades productivas se guardarán en un formato plano de texto o tendrán campos estructurados rígidos
4. **Dinamismo de Especies y Razas:**
   ¿Los catálogos de especies y razas serán globales del sistema o pueden ser dados de alta a nivel organización?, ¿puede un Rancho agregar una especie personalizada que no aparezca a otros Ranchos?