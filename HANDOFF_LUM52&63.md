# Handoff del Sprint 4: Módulo de Animales y Tema de Unidades Productivas

---

## 1. Vista de Animales (`AnimalsView`)

Se implementó la vista principal temporal de gestión de animales asociada a la unidad productiva activa.
Consume el contexto de `RanchoContext` para obtener el listado de animales y expone todas las operaciones CRUD disponibles en el sprint.

### Flujo de Experiencia de Usuario (UX)

1. **Entrada a la vista**: Desde `HomeView`, el usuario presiona sobre una Unidad Productiva activa y la navegación empuja la ruta `Animals`.
2. **Carga automática**: Al montar el componente (o al cambiar la PU seleccionada), se ejecuta `loadAnimals(orgId, puId)` con caché por clave compuesta `orgId_puId`.
3. **Listado de animales**: Cada animal muestra nombre, tipo (badge dorado), color (badge blanco semitransparente), arete, series de marcas y edad/fecha de nacimiento.
4. **Agregar animal** (`AnimalCreateFormComponent`): Botón "Agregar" en el header de sección; el formulario recoge todos los campos del contrato `Core.Animal` y añade el registro al contexto local (mock).
5. **Editar animal** (`AnimalEditFormComponent`): Ícono de lápiz por tarjeta; pre-rellena todos los campos con los valores actuales y actualiza el registro en contexto.
6. **Mover animal** (`AnimalMoveFormComponent`): Ícono de movimiento por tarjeta; permite seleccionar organización y unidad productiva destino. La lógica vive en `RanchoContext.moveAnimal`.
7. **Eliminar animal**: Ícono de papelera; muestra `Alert.alert` de confirmación antes de filtrar el animal del contexto (pendiente reemplazar por modal).

### Estados de UI cubiertos

| Estado          | Descripción                                                          |
|-----------------|----------------------------------------------------------------------|
| `loadingAnimals` | `ActivityIndicator` centrado con texto "Cargando animales..."        |
| `animalsError`   | Ícono de alerta rojo + mensaje + botón "Reintentar"                  |
| Lista vacía     | Ícono gris + mensaje "No se encontraron animales en esta unidad"     |
| Lista con datos | Tarjetas `puCard` con acciones de mover / editar / eliminar          |
| Formulario open | La sección de lista se reemplaza por el formulario correspondiente   |

### Componentes involucrados

| Componente                     | Ruta                                                                                        | Propósito                                   |
|--------------------------------|---------------------------------------------------------------------------------------------|---------------------------------------------|
| `AnimalsView`                  | `src/views/AnimalsView/AnimalsView.tsx`                                                     | Vista principal                             |
| `AnimalCreateFormComponent`    | `src/components/Forms/AnimalCreateFormComponent/AnimalCreateFormComponent.tsx`              | Formulario de registro de animal            |
| `AnimalEditFormComponent`      | `src/components/Forms/AnimalEditFormComponent/AnimalEditFormComponent.tsx`                  | Formulario de edición de animal             |
| `AnimalMoveFormComponent`      | `src/components/Forms/AnimalMoveFormComponent/AnimalMoveFormComponent.tsx`                  | Formulario de traslado inter-PU / inter-org |

---

## 2. Contexto de Animales en `RanchoContext`

Se añadieron los siguientes estados y acciones al proveedor `RanchoContext`:

### Estados nuevos

| Estado / Setter           | Tipo                                        | Descripción                                                      |
|---------------------------|---------------------------------------------|------------------------------------------------------------------|
| `animalsByPU`             | `Record<string, Core.Animal[]>`             | Caché interna: clave = `orgId_puId`                              |
| `animals` (derivado)      | `Core.Animal[]`                             | Vista del caché para la PU activa                                |
| `setAnimals` (derivado)   | `Dispatch<SetStateAction<Core.Animal[]>>`   | Mutador con escritura al caché de la PU activa                   |
| `loadingAnimals`          | `boolean`                                   | Indicador de carga al llamar `getAnimals`                        |
| `animalsError`            | `string`                                    | Mensaje de error si la carga falla                               |
| `animalToMove`            | `Core.Animal \| null`                       | Animal seleccionado para la operación de traslado                |
| `setAnimalToMove`         | `Dispatch`                                  | Setter de `animalToMove`                                         |

### Acciones nuevas

| Función       | Firma                                                                               | Descripción                                                                        |
|---------------|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `loadAnimals` | `(orgId, puId) => Promise<void>`                                                    | Llama a `coreService.getAnimals` con caché; no refetch si ya existe                |
| `moveAnimal`  | `(animal, fromOrgId, fromPuId, toOrgId, toPuId) => Promise<void>`                  | Quita el animal de la lista origen y lo inserta en la lista destino (caché condicional) |

### Caché de animales

La estrategia de caché es **cargar una sola vez por clave**: si `animalsByPU[cacheKey]` ya existe, `loadAnimals` retorna inmediatamente sin hacer ninguna petición adicional.

---

## 3. Tema de Unidades Productivas (UNID Production Theme)

Los estilos estan completamente sujetos a cambios, se tomo esta perspectiva solo para dar una vista clara a la logica


## 4. Contrato de datos — `Core.Animal`
Contrato en base al archivo inventario nueva luz
```ts
interface Animal {
  id: number;
  nombre: string;
  edad: number;
  animalType: 'VACA' | 'BECERRO' | 'TORO' | string;
  Color: string;
  Pierna1: string;
  Pierna2: String;   
  Serie1: string;
  Serie2: String;
  Arete: String;
  fechaNacimiento: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}
```


## 5. Pendientes / Deuda técnica

- [ ] Reemplazar `Alert.alert` de confirmación de eliminación por un componente Modal reutilizable.
- [ ] Conectar `AnimalCreateFormComponent` al endpoint real `POST /organizations/{orgId}/production-units/{puId}/animals`.
- [ ] Conectar `AnimalEditFormComponent` al endpoint real `PUT /animals/{id}`.
- [ ] Conectar `AnimalMoveFormComponent` al endpoint real de traslado.
- [ ] Conectar `handleDelete` al endpoint real `DELETE /animals/{id}`.
- [ ] Normalizar typo `Pieran2` → `Pierna2` al definir el contrato final con backend.
- [ ] Migrar colores hardcoded de formularios de animal al sistema de tokens `theme.ts`.
- [ ] Implementar invalidación de caché al editar / mover / eliminar un animal (actualmente la caché no se invalida en operaciones locales de mutación).
