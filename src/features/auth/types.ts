export type UserRole = 
  | 'master_admin' 
  | 'accounting_admin' 
  | 'client_admin' 
  | 'analyst' 
  | 'employee';

export type TenantType = 'enterprise' | 'accounting';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: TenantType;
  parentId?: string;
  branding?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface AuthSession {
  user: User;
  tenant: Tenant;
  accessToken: string;
  refreshToken: string;
}
