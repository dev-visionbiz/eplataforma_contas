import { ManagedUser, CreateUserPayload } from '../types';

export const userService = {
  async getUsers(): Promise<ManagedUser[]> {
    // Mock users
    return [
      {
        id: '1',
        email: 'admin@visionbiz.com',
        fullName: 'Hélio Administrador',
        role: 'master_admin',
        status: 'active',
        createdAt: '2026-05-20T10:00:00Z',
        lastLogin: '2026-05-28T19:30:00Z',
      },
      {
        id: '2',
        email: 'analista@contabil.com',
        fullName: 'João Silva',
        role: 'analyst',
        status: 'active',
        createdAt: '2026-05-25T14:20:00Z',
        lastLogin: '2026-05-27T11:00:00Z',
      },
      {
        id: '3',
        email: 'cliente@empresa.com',
        fullName: 'Maria Gestora',
        role: 'client_admin',
        status: 'pending',
        createdAt: '2026-05-28T09:00:00Z',
      },
    ];
  },

  async createUser(payload: CreateUserPayload): Promise<ManagedUser> {
    console.log('Inviting user:', payload);
    return {
      id: Math.random().toString(36).substr(2, 9),
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  },

  async deleteUser(id: string): Promise<void> {
    console.log('Deleting user:', id);
  }
};
