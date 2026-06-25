import { apiClient } from '../../lib/apiClient';
import { Core } from '../../interfaces/CoreInterfaces';
import { AxiosResponse } from 'axios';
import { withLoader } from '../../context/LoaderContext';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Helper to create a mocked AxiosResponse
const createMockResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any,
});

export const coreService = {
  // --- Organizations & Roles ---

  getUserOrganizations: async (): Promise<AxiosResponse<Core.Organization[]>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse([
        { org_id: 'org_amanecer', org_name: 'Rancho El Amanecer', role: 'Administrador' },
        { org_id: 'org_robles', org_name: 'Ganadera Los Robles', role: 'Supervisor' },
        { org_id: 'org_isidro', org_name: 'Unidad San Isidro', role: 'Trabajador' }
      ]);
    }),

  selectOrganization: async (orgId: string): Promise<AxiosResponse<Core.SelectOrgResponse>> => {
    const response: AxiosResponse<Core.SelectOrgResponse> = await apiClient.post('/user/organizations/select', { org_id: orgId });
    return response;
  },

  // --- Production Units ---

  getProductionUnits: async (orgId: string): Promise<AxiosResponse<Core.ProductionUnit[]>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse([
        {
          id: 'pu_norte',
          name: 'Unidad Productiva Norte',
          address: { street: 'Km 15 Carr. Norte', city: 'Villahermosa', state: 'Tabasco', country: 'México' },
          membership: { joined_at: new Date().toISOString(), status: 'active' }
        },
        {
          id: 'pu_sur',
          name: 'Unidad Productiva Sur',
          address: { street: 'Km 22 Carr. Sur', city: 'Teapa', state: 'Tabasco', country: 'México' },
          membership: { joined_at: new Date().toISOString(), status: 'active' }
        }
      ]);
    }),

  createProductionUnit: async (orgId: string, data: Core.ProductionUnitCreateInput): Promise<AxiosResponse<Core.ProductionUnit>> => {
    const response: AxiosResponse<Core.ProductionUnit> = await apiClient.post(`/organizations/${orgId}/production-units`, data);
    return response;
  },

  getProductionUnitDetail: async (orgId: string, puId: string): Promise<AxiosResponse<Core.ProductionUnitDetail>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        id: puId,
        name: puId === 'pu_norte' ? 'Unidad Productiva Norte' : 'Unidad Productiva Sur',
        address: { street: 'Km 15 Carr. Norte', city: 'Villahermosa', state: 'Tabasco', country: 'México' },
        locations: [
          { location_id: 'loc_1', name: 'Potrero Grande', type: 'paddock' },
          { location_id: 'loc_2', name: 'Corral de Manejo', type: 'corral' }
        ]
      });
    }),

  getProductionUnitDetails: async (puId: string): Promise<AxiosResponse<Core.ProductionUnitDetail>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse({
        id: puId,
        name: puId === '<z>u_norte' ? 'Unidad Productiva Norte' : 'Unidad Productiva Sur',
        address: { street: 'Km 15 Carr. Norte', city: 'Villahermosa', state: 'Tabasco', country: 'México' },
        locations: [
          { location_id: 'loc_1', name: 'Potrero Grande', type: 'paddock' },
          { location_id: 'loc_2', name: 'Corral de Manejo', type: 'corral' }
        ]
      });
    }),

  // --- Production Units animals ---

  getProductionUnitsAnimals: async (orgId: string, puId: string): Promise<AxiosResponse<Core.Animal[]>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse([
        {
          id: Math.random()*10000000,
          nombre:"tilin",
          edad: 2,
          fechaNacimiento: '2024-03-15',
          animalType: 'VACA',
          Color: 'Blanco con Negro',
          Pierna1: 'Hierro 1',
          Pieran2: 'Hierro 2',
          Serie1: '12345',
          Serie2: '67890',
          Arete: 'TAG-001',
          created_by: 'user_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: Math.random()*10000000,
          nombre:"tilin2",
          edad: 3,
          fechaNacimiento: '2023-11-20',
          animalType: 'TORO',
          Color: 'Café',
          Pierna1: 'Hierro A',
          Pieran2: 'Hierro B',
          Serie1: '54321',
          Serie2: '09876',
          Arete: 'TAG-002',
          created_by: 'user_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);
    }),

  // --- Locations ---

  getLocations: async (orgId: string, puId: string): Promise<AxiosResponse<Core.Location[]>> => {
    const response: AxiosResponse<Core.Location[]> = await apiClient.get(`/organizations/${orgId}/production-units/${puId}/locations`);
    return response;
  },

  createLocation: async (orgId: string, puId: string, data: Core.LocationCreateInput): Promise<AxiosResponse<Core.Location>> => {
    const response: AxiosResponse<Core.Location> = await apiClient.post(`/organizations/${orgId}/production-units/${puId}/locations`, data);
    return response;
  },

  // --- Catalogs ---

  getSpecies: async (): Promise<AxiosResponse<Core.CatalogItem[]>> => {
    const response: AxiosResponse<Core.CatalogItem[]> = await apiClient.get('/catalogs/species');
    return response;
  },

  getBreeds: async (speciesId: string): Promise<AxiosResponse<Core.CatalogItem[]>> => {
    const response: AxiosResponse<Core.CatalogItem[]> = await apiClient.get('/catalogs/breeds', {
      params: { species_id: speciesId }
    });
    return response;
  },

  getProductionTypes: async (): Promise<AxiosResponse<Core.CatalogItem[]>> => {
    const response: AxiosResponse<Core.CatalogItem[]> = await apiClient.get('/catalogs/production-types');
    return response;
  },

  // --- Animals ---

  getAnimals: async (orgId: string, puId: string): Promise<AxiosResponse<Core.Animal[]>> =>
    withLoader(async () => {
      await delay(800);
      return createMockResponse([
        {
          id: Math.random()*10000000,
          nombre:'tilin',
          edad: 2,
          fechaNacimiento: '2024-03-15',
          animalType: 'VACA',
          Color: 'Blanco con Negro',
          Pierna1: 'Hierro 1',
          Pieran2: 'Hierro 2',
          Serie1: '12345',
          Serie2: '67890',
          Arete: 'TAG-001',
          created_by: 'user_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: Math.random()*10000000,
          nombre:'tilin2',
          edad: 3,
          fechaNacimiento: '2023-11-20',
          animalType: 'TORO',
          Color: 'Café',
          Pierna1: 'Hierro A',
          Pieran2: 'Hierro B',
          Serie1: '54321',
          Serie2: '09876',
          Arete: 'TAG-002',
          created_by: 'user_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);
    }),

  createAnimal: async (orgId: string, puId: string, data: Core.AnimalCreateInput): Promise<AxiosResponse<Core.Animal>> => {
    const response: AxiosResponse<Core.Animal> = await apiClient.post(`/organizations/${orgId}/production-units/${puId}/animals`, data);
    return response;
  },

  // --- Sanitary Events ---

  getSanitaryEvents: async (orgId: string, animalId: string): Promise<AxiosResponse<Core.SanitaryEvent[]>> => {
    const response: AxiosResponse<Core.SanitaryEvent[]> = await apiClient.get(`/organizations/${orgId}/animals/${animalId}/sanitary-events`);
    return response;
  },

  createSanitaryEvent: async (orgId: string, animalId: string, data: Core.SanitaryEventCreateInput): Promise<AxiosResponse<Core.SanitaryEvent>> => {
    const response: AxiosResponse<Core.SanitaryEvent> = await apiClient.post(`/organizations/${orgId}/animals/${animalId}/sanitary-events`, data);
    return response;
  },
};
