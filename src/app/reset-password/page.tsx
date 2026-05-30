'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form/ResetPasswordForm';
import { LucideShieldCheck, LucideLoader2, LucideAlertCircle } from 'lucide-react';
import Link from 'next/link';

type Status = 'loading' | 'ready' | 'error';

export default function ResetPasswordPage() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const supabase = createClient();

    // Fluxo PKCE (padrão do @supabase/ssr): token_hash vem como query param
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get('token_hash');
    const type = params.get('type');

    if (tokenHash && type === 'recovery') {
      supabase.auth
        .verifyOtp({ token_hash: tokenHash, type: 'recovery' })
        .then(({ error }) => {
          setStatus(error ? 'error' : 'ready');
        });
      return;
    }

    // Fluxo implícito (fallback): token vem no hash da URL e dispara o evento
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStatus('ready');
      }
    });

    // Se nenhum dos dois fluxos resolver em 6s, o link é inválido/expirado
    const timeout = setTimeout(() => {
      setStatus((prev) => prev === 'loading' ? 'error' : prev);
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
            <LucideShieldCheck className="w-12 h-12 text-vision-500" />
          </div>
        </div>

        {status === 'loading' && (
          <div className="w-full text-center space-y-4 animate-in fade-in duration-300">
            <LucideLoader2 className="w-8 h-8 animate-spin text-vision-500 mx-auto" />
            <p className="text-sm text-slate-400">Verificando link de recuperação...</p>
          </div>
        )}

        {status === 'ready' && <ResetPasswordForm />}

        {status === 'error' && (
          <div className="w-full space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
              <div className="p-3 bg-danger-500/10 rounded-2xl">
                <LucideAlertCircle className="w-12 h-12 text-danger-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
                Link inválido ou expirado
              </h2>
              <p className="text-sm text-slate-400">
                O link de recuperação não é mais válido. Solicite um novo link a partir da tela de login.
              </p>
            </div>
            <Link
              href="/"
              className="vision-button-primary w-full flex items-center justify-center"
            >
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
