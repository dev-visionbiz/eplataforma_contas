import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthSession, User } from '../types';
import { authService } from '../services/auth-service';

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const session = await authService.login(email, password);
          set({ session, user: session.user, isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      logout: async () => {
        await authService.logout();
        set({ session: null, user: null });
      },
    }),
    {
      name: 'visionbiz-auth-storage',
    }
  )
);
