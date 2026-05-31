'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ConfirmInviteForm } from '@/features/auth/components/confirm-invite-form/ConfirmInviteForm';
import { LucideUserCheck, LucideLoader2, LucideAlertCircle } from 'lucide-react';
import Link from 'next/link';

type Status = 'loading' | 'ready' | 'error';

export default function ConfirmPage() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const supabase = createClient();
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get('token_hash');
    const type = params.get('type');

    // Fluxo PKCE: token_hash vem como query param com type=invite
    if (tokenHash && type === 'invite') {
      supabase.auth
        .verifyOtp({ token_hash: tokenHash, type: 'invite' })
        .then(({ error }) => {
          setStatus(error ? 'error' : 'ready');
        });
      return;
    }

    // Fluxo implícito: sessão chega via hash fragment e dispara SIGNED_IN
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setStatus('ready');
      }
    });

    const timeout = setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'error' : prev));
    }, 6000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-primary">
      <div className="vision-card max-w-md w-full flex flex-col items-center space-y-8">
        <div className="flex justify-center">
          <div className="p-3 bg-vision-500/10 rounded-2xl">
            <LucideUserCheck className="w-12 h-12 text-vision-500" />
          </div>
        </div>

        {status === 'loading' && (
          <div className="w-full text-center space-y-4 animate-in fade-in duration-300">
            <LucideLoader2 className="w-8 h-8 animate-spin text-vision-500 mx-auto" />
            <p className="text-sm text-slate-400">Validando seu convite...</p>
          </div>
        )}

        {status === 'ready' && <ConfirmInviteForm />}

        {status === 'error' && (
          <div className="w-full space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
              <div className="p-3 bg-danger-500/10 rounded-2xl">
                <LucideAlertCircle className="w-12 h-12 text-danger-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
                Convite inválido ou expirado
              </h2>
              <p className="text-sm text-slate-400">
                O link de convite não é mais válido. Solicite um novo convite ao administrador.
              </p>
            </div>
            <Link href="/" className="vision-button-primary w-full flex items-center justify-center">
              Voltar para o login
            </Link>
          </div>
        )}

        <div className="pt-2 text-xs text-slate-500 border-t border-border w-full text-center">
          Powered by VisionBiz Infrastructure
        </div>
      </div>
    </main>
  );
}
