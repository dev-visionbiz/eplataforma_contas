-- ePlataforma: SQL Trigger for User Synchronization
-- Run this in your Supabase SQL Editor to automatically link Auth users to your public.users table.

-- 1. Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_tenant_id UUID;
BEGIN
  SELECT id INTO default_tenant_id FROM public.tenants LIMIT 1;

  IF default_tenant_id IS NULL THEN
    RAISE EXCEPTION 'Nenhum tenant encontrado. Crie um tenant antes de adicionar usuários.';
  END IF;

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

-- 2. Create the trigger on auth.users
-- Important: If this trigger fails, the user signup will also fail.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
