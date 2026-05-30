-- =============================================================
-- FIX: RLS policies + backfill de perfis ausentes
-- Execute este script no SQL Editor do Supabase (dashboard)
-- =============================================================

-- PASSO 1: Verificar usuários auth sem perfil em public.users
-- (rode esta query primeiro para diagnosticar)
SELECT au.id, au.email, au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL;

-- =============================================================
-- PASSO 2: Criar as RLS policies (se ainda não existem)
-- =============================================================

-- Policies: users
DROP POLICY IF EXISTS "users_select_own" ON users;
CREATE POLICY "users_select_own" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_select_master_admin" ON users;
CREATE POLICY "users_select_master_admin" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'master_admin'
    )
  );

DROP POLICY IF EXISTS "users_select_same_tenant" ON users;
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
DROP POLICY IF EXISTS "tenants_select_own" ON tenants;
CREATE POLICY "tenants_select_own" ON tenants
  FOR SELECT TO authenticated
  USING (
    id = (SELECT tenant_id FROM users WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "tenants_select_master_admin" ON tenants;
CREATE POLICY "tenants_select_master_admin" ON tenants
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() AND u.role = 'master_admin'
    )
  );

-- =============================================================
-- PASSO 3: Backfill — criar perfil para usuários sem registro
-- (ajuste o tenant_id e role conforme necessário)
-- =============================================================

-- Primeiro, verifique qual tenant existe:
-- SELECT id, name, slug FROM public.tenants;

-- Depois rode o INSERT substituindo <TENANT_ID> pelo UUID real:
/*
INSERT INTO public.users (id, email, full_name, role, tenant_id)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  'master_admin',   -- ajuste o role conforme o usuário
  '<TENANT_ID>'     -- substitua pelo UUID do tenant
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL;
*/

-- =============================================================
-- PASSO 4: Garantir que o trigger de criação automática existe
-- =============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_tenant_id UUID;
BEGIN
  SELECT id INTO default_tenant_id FROM public.tenants LIMIT 1;

  INSERT INTO public.users (id, email, full_name, role, tenant_id)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'employee',
    default_tenant_id
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
