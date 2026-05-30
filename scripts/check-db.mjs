import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env.local')
  try {
    const content = readFileSync(envPath, 'utf8')
    content.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim()
      }
    })
  } catch (e) {
    console.error('Erro ao ler .env.local. Certifique-se de que o arquivo existe.')
    process.exit(1)
  }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkDatabase() {
  console.log('--- Verificando Saúde do Banco de Dados Supabase ---')
  
  // 1. Check Tenants table
  const { data: tenants, error: tError } = await supabase.from('tenants').select('count', { count: 'exact' })
  if (tError) {
    console.error('❌ Tabela "tenants" não encontrada ou erro de acesso:', tError.message)
  } else {
    console.log(`✅ Tabela "tenants" OK. Total de registros: ${tenants[0]?.count || 0}`)
  }

  // 2. Check Users table
  const { data: users, error: uError } = await supabase.from('users').select('count', { count: 'exact' })
  if (uError) {
    console.error('❌ Tabela "users" não encontrada ou erro de acesso:', uError.message)
  } else {
    console.log(`✅ Tabela "users" OK. Total de registros: ${users[0]?.count || 0}`)
  }

  // 3. Check for specific test user
  const { data: testUser, error: tuError } = await supabase
    .from('users')
    .select('email, role')
    .eq('email', 'admin@eplataforma.com')
    .single()

  if (tuError) {
    console.log('⚠️ Usuário admin@eplataforma.com não encontrado na tabela public.users.')
  } else {
    console.log(`✅ Usuário de teste pronto: ${testUser.email} (Role: ${testUser.role})`)
  }

  console.log('--- Fim da Verificação ---')
}

checkDatabase()
