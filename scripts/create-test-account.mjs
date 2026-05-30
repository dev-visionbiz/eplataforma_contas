import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env.local')
  const content = readFileSync(envPath, 'utf8')
  content.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestAccount() {
  const email = 'admin@eplataforma.com'
  const password = 'TestPassword123!'
  const fullName = 'Admin Teste ePlataforma'
  
  console.log(`Tentando criar conta para: ${email}...`)

  // 1. Create user in Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  })

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('Usuário já existe no Auth.')
    } else {
      console.error('Erro ao criar usuário no Auth:', authError.message)
      return
    }
  } else {
    console.log('Usuário criado no Auth com sucesso.')
  }

  // Get user ID (either from creation or by searching)
  let userId
  if (authUser?.user) {
    userId = authUser.user.id
  } else {
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    userId = existingUsers.users.find(u => u.email === email)?.id
  }

  if (!userId) {
    console.error('Não foi possível obter o ID do usuário.')
    return
  }

  // 2. Ensure a tenant exists
  let { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('id')
    .limit(1)
    .single()

  if (tenantError || !tenant) {
    console.log('Criando tenant inicial...')
    const { data: newTenant, error: createTenantError } = await supabase
      .from('tenants')
      .insert({
        name: 'ePlataforma Master',
        slug: 'master',
        type: 'enterprise'
      })
      .select()
      .single()
    
    if (createTenantError) {
      console.error('Erro ao criar tenant:', createTenantError.message)
      return
    }
    tenant = newTenant
  }

  // 3. Ensure user exists in public.users table (synced)
  const { error: publicUserError } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email: email,
      full_name: fullName,
      role: 'master_admin',
      tenant_id: tenant.id
    })

  if (publicUserError) {
    console.error('Erro ao sincronizar na tabela public.users:', publicUserError.message)
  } else {
    console.log('Conta de teste pronta para uso!')
    console.log('-------------------------------')
    console.log(`Email: ${email}`)
    console.log(`Senha: ${password}`)
    console.log('-------------------------------')
  }
}

createTestAccount()
