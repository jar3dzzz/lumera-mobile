export namespace Core {
  export interface Organization {
    org_id: string;
    org_name: string;
    role: string;
  }

  export interface SelectOrgRequest {
    org_id: string;
  }

  export interface SelectOrgResponse {
    access_token: string;
    active_org: Organization;
  }

  export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
  }

  export interface ProductionUnit {
    id: string;
    name: string;
    address: Address;
    membership?: {
      joined_at: string;
      status: 'active' | 'inactive' | string;
    };
  }

  export interface ProductionUnitDetail extends ProductionUnit {
    locations: Location[];
  }

  export interface ProductionUnitCreateInput {
    name: string;
    address: Address;
  }

  export interface Location {
    location_id: string;
    name: string;
    type: 'paddock' | 'corral' | string;
  }

  export interface LocationCreateInput {
    name: string;
    type: 'paddock' | 'corral' | string;
  }

  export interface CatalogItem {
    id: string;
    name: string;
    species_id?: string;
  }

  export interface Animal {
    id: string;
    tag_number: string; // caravana/arete
    name?: string;
    species_id: string;
    breed_id: string;
    production_unit_id: string;
    location_id?: string;
    status: 'active' | 'sold' | 'deceased' | 'quarantine' | string;
    birth_date?: string;
    gender: 'M' | 'F';
    weight?: number;
    created_at: string;
    updated_at: string;
  }

  export interface AnimalCreateInput {
    tag_number: string;
    name?: string;
    species_id: string;
    breed_id: string;
    location_id?: string;
    birth_date?: string;
    gender: 'M' | 'F';
    weight?: number;
  }

  export interface SanitaryEvent {
    id: string;
    animal_id: string;
    event_type: string;
    description: string;
    applied_date: string;
    status: 'pending' | 'applied' | 'rejected';
    created_at: string;
    updated_at: string;
    idempotency_key?: string;
  }

  export interface SanitaryEventCreateInput {
    animal_id: string;
    event_type: string;
    description: string;
    applied_date: string;
    idempotency_key: string; // Used to prevent duplicates on mobile retry
  }
}
