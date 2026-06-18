import { apiClient } from '../../lib/apiClient';
import { Core } from '../../interfaces/CoreInterfaces';
import { AxiosResponse } from 'axios';

export const coreService = {
  // --- Organizations & Roles ---

  getUserOrganizations: async (): Promise<AxiosResponse<Core.Organization[]>> => {
    const response: AxiosResponse<Core.Organization[]> = await apiClient.get('/user/organizations');
    return response;
  },

  selectOrganization: async (orgId: string): Promise<AxiosResponse<Core.SelectOrgResponse>> => {
    const response: AxiosResponse<Core.SelectOrgResponse> = await apiClient.post('/user/organizations/select', { org_id: orgId });
    return response;
  },

  // --- Production Units ---

  getProductionUnits: async (orgId: string): Promise<AxiosResponse<Core.ProductionUnit[]>> => {
    const response: AxiosResponse<Core.ProductionUnit[]> = await apiClient.get(`/organizations/${orgId}/production-units`);
    return response;
  },

  createProductionUnit: async (orgId: string, data: Core.ProductionUnitCreateInput): Promise<AxiosResponse<Core.ProductionUnit>> => {
    const response: AxiosResponse<Core.ProductionUnit> = await apiClient.post(`/organizations/${orgId}/production-units`, data);
    return response;
  },

  getProductionUnitDetail: async (orgId: string, puId: string): Promise<AxiosResponse<Core.ProductionUnitDetail>> => {
    const response: AxiosResponse<Core.ProductionUnitDetail> = await apiClient.get(`/organizations/${orgId}/production-units/${puId}`);
    return response;
  },

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

  getAnimals: async (orgId: string, puId: string): Promise<AxiosResponse<Core.Animal[]>> => {
    const response: AxiosResponse<Core.Animal[]> = await apiClient.get(`/organizations/${orgId}/production-units/${puId}/animals`);
    return response;
  },

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
