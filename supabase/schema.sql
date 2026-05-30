-- ePlataforma: Core Database Schema (Supabase/PostgreSQL)

-- 1. Tenants Table (Multi-tenant & White-Label)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- used for subdomains (e.g., tenant.visionbiz.com)
  domain TEXT UNIQUE, -- custom domain (e.g., portal.client.com)
  type TEXT NOT NULL CHECK (type IN ('enterprise', 'accounting')),
  parent_id UUID REFERENCES tenants(id), -- relationship between client and accounting firm
  
  -- Branding (White-Label)
  logo_url TEXT,
  primary_color TEXT DEFAULT '#2563EB',
  secondary_color TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users Table (RBAC)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('master_admin', 'accounting_admin', 'client_admin', 'analyst', 'employee')),
  tenant_id UUID REFERENCES tenants(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. User Refresh Tokens (Session Security)
CREATE TABLE user_refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  revoked BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_allowed_clients ENABLE ROW LEVEL SECURITY;

-- Policies: users
-- Cada usuário lê apenas o próprio perfil
CREATE POLICY "users_select_own" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- master_admin pode ler todos os usuários do sistema
CREATE POLICY "users_select_master_admin" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'master_admin'
    )
  );

-- admin de tenant lê usuários do próprio tenant
CREATE POLICY "users_select_same_tenant" ON users
  FOR SELECT TO authenticated
  USING (
    tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid())
    AND EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
        AND u.role IN ('accounting_admin', 'client_admin')
    )
  );

-- Policies: tenants
-- Usuário lê o próprio tenant
CREATE POLICY "tenants_select_own" ON tenants
  FOR SELECT TO authenticated
  USING (
    id = (SELECT tenant_id FROM users WHERE id = auth.uid())
  );

-- master_admin lê todos os tenants
CREATE POLICY "tenants_select_master_admin" ON tenants
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'master_admin'
    )
  );

-- Policies: user_refresh_tokens
CREATE POLICY "tokens_select_own" ON user_refresh_tokens
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "tokens_insert_own" ON user_refresh_tokens
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tokens_delete_own" ON user_refresh_tokens
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Policies: user_allowed_clients
CREATE POLICY "allowed_clients_select_own" ON user_allowed_clients
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- JWT Claims Function (Supabase custom claims)
-- This function will be called by Supabase to populate the JWT with custom data.
CREATE OR REPLACE FUNCTION public.get_auth_context(user_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT 
    jsonb_build_object(
      'tenant_id', u.tenant_id,
      'tenant_type', t.type,
      'parent_id', t.parent_id,
      'role', u.role,
      'allowed_clients', (
        CASE 
          WHEN u.role = 'analyst' THEN 
            (SELECT jsonb_agg(client_id) FROM user_allowed_clients WHERE user_id = $1)
          ELSE '[]'::jsonb
        END
      )
    ) INTO result
  FROM public.users u
  JOIN public.tenants t ON t.id = u.tenant_id
  WHERE u.id = $1;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Table for analyst client access (allowed_clients)
CREATE TABLE user_allowed_clients (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, client_id)
);
