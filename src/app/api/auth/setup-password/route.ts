import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.toLowerCase().trim() : null;
    const password = typeof body.password === 'string' ? body.password : null;

    if (!email || !password) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    // Only allow this for emails that exist in our system (admin-managed users)
    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const { data: { user: authUser } } = await supabaseAdmin.auth.admin.getUserById(profile.id);

    if (!authUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Only allow first-time password setup (user not yet confirmed)
    if (authUser.email_confirmed_at) {
      return NextResponse.json({ error: 'Esta conta já possui acesso configurado' }, { status: 409 });
    }

    await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
      email_confirm: true,
      password,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
