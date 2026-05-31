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

    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }

    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (!profile) {
      return NextResponse.json({ status: 'not_found' });
    }

    const { data: { user: authUser } } = await supabaseAdmin.auth.admin.getUserById(profile.id);

    if (!authUser) {
      return NextResponse.json({ status: 'not_found' });
    }

    if (!authUser.email_confirmed_at) {
      // Invited via inviteUserByEmail → link still pending
      if (authUser.invited_at) {
        return NextResponse.json({ status: 'pending_invite' });
      }
      // Created directly (e.g. Supabase dashboard) without auto-confirm →
      // confirm now so the user can proceed to set/enter their password
      await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
        email_confirm: true,
      });
    }

    return NextResponse.json({ status: 'active' });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
