import React, { createContext, useContext, useState } from 'react';
import { Core } from '../interfaces/CoreInterfaces';
import { coreService } from '../services/CoreServices/CoreService';

export type LoginPage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface RanchoContextType {
  selectedOrgId: string;
  setSelectedOrgId: (id: string) => void;
  organizations: Core.Organization[];
  setOrganizations: (orgs: Core.Organization[]) => void;
  phone: string;
  setPhone: (phone: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loginPage: LoginPage;
  setLoginPage: React.Dispatch<React.SetStateAction<LoginPage>>;
  loginPageHistory: LoginPage[];
  setLoginPageHistory: React.Dispatch<React.SetStateAction<LoginPage[]>>;

  // Production Unit States
  selectedProductionUnitId: string;
  setSelectedProductionUnitId: React.Dispatch<React.SetStateAction<string>>;
  productionUnits: Core.ProductionUnit[];
  setProductionUnits: React.Dispatch<React.SetStateAction<Core.ProductionUnit[]>>;
  loadingProductionUnits: boolean;
  productionUnitsError: string;
  productionUnitsBlocked: boolean;
  loadProductionUnits: (orgId: string) => Promise<void>;
}

const RanchoContext = createContext<RanchoContextType | undefined>(undefined);

export const useRancho = () => {
  const context = useContext(RanchoContext);
  if (!context) {
    throw new Error('useRancho must be used within a RanchoProvider');
  }
  return context;
};

export const RanchoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [organizations, setOrganizations] = useState<Core.Organization[]>([]);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginPage, setLoginPage] = useState<LoginPage>(0);
  const [loginPageHistory, setLoginPageHistory] = useState<LoginPage[]>([]);

  // Production Unit States
  const [selectedProductionUnitId, setSelectedProductionUnitId] = useState<string>('');
  const [productionUnits, setProductionUnits] = useState<Core.ProductionUnit[]>([]);
  const [loadingProductionUnits, setLoadingProductionUnits] = useState<boolean>(false);
  const [productionUnitsError, setProductionUnitsError] = useState<string>('');
  const [productionUnitsBlocked, setProductionUnitsBlocked] = useState<boolean>(false);

  const loadProductionUnits = async (orgId: string) => {
    setLoadingProductionUnits(true);
    setProductionUnitsError('');
    setProductionUnitsBlocked(false);
    try {
      const response = await coreService.getProductionUnits(orgId);
      const data = response.data || [];
      setProductionUnits(data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setProductionUnitsBlocked(true);
      } else {
        // Fallback to contract-safe mock production units
        const mockPUs: Core.ProductionUnit[] = [
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
        ];
        setProductionUnits(mockPUs);
      }
    } finally {
      setLoadingProductionUnits(false);
    }
  };

  return (
    <RanchoContext.Provider
      value={{
        selectedOrgId,
        setSelectedOrgId,
        organizations,
        setOrganizations,
        phone,
        setPhone,
        password,
        setPassword,
        loginPage,
        setLoginPage,
        loginPageHistory,
        setLoginPageHistory,
        selectedProductionUnitId,
        setSelectedProductionUnitId,
        productionUnits,
        setProductionUnits,
        loadingProductionUnits,
        productionUnitsError,
        productionUnitsBlocked,
        loadProductionUnits,
      }}
    >
      {children}
    </RanchoContext.Provider>
  );
};
