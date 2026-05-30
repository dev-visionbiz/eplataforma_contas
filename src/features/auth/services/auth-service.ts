import { createClient } from '@/lib/supabase/client';
import { AuthSession } from '../types';

const supabase = createClient();

function mapAuthError(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes('invalid login credentials') || msg.includes('invalid password') || msg.includes('user not found')) {
    return 'E-mail ou senha incorretos.';
  }
  if (msg.includes('email not confirmed')) {
    return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
  }
  if (msg.includes('too many requests') || msg.includes('rate limit')) {
    return 'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Falha de conexão. Verifique sua internet e tente novamente.';
  }
  return 'Ocorreu um erro ao autenticar. Tente novamente.';
}

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(mapAuthError(error.message));
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*, tenants!tenant_id(*)')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error('Acesso não configurado para esta conta. Entre em contato com o administrador.');
    }

    if (!profile.tenants) {
      await supabase.auth.signOut();
      throw new Error('Conta sem organização vinculada. Entre em contato com o administrador.');
    }

    return {
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        tenantId: profile.tenant_id,
      },
      tenant: {
        id: profile.tenants.id,
        name: profile.tenants.name,
        slug: profile.tenants.slug,
        type: profile.tenants.type,
        branding: {
          logoUrl: profile.tenants.logo_url,
          primaryColor: profile.tenants.primary_color,
          secondaryColor: profile.tenants.secondary_color,
        },
      },
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token!,
    };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async updatePassword(password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  async getCurrentSession(): Promise<AuthSession | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*, tenants!tenant_id(*)')
      .eq('id', session.user.id)
      .single();

    if (!profile) return null;

    return {
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role,
        tenantId: profile.tenant_id,
      },
      tenant: {
        id: profile.tenants.id,
        name: profile.tenants.name,
        slug: profile.tenants.slug,
        type: profile.tenants.type,
      },
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
};
