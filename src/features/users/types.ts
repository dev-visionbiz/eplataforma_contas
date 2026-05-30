import { UserRole } from '@/features/auth/types';

export interface ManagedUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface CreateUserPayload {
  email: string;
  fullName: string;
  role: UserRole;
  tenantId: string;
}
