'use client';

import { LucideLayoutDashboard, LucideLogOut, LucideLoader2 } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form/LoginForm";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { authService } from "@/features/auth/services/auth-service";
import { isAllowedRedirect, getRedirectTo } from "@/lib/auth/redirect";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const { user, session, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const redirectToHub = useCallback((accessToken: string, refreshToken: string) => {
    const redirectTo = getRedirectTo();
    const hubUrl = process.env.NEXT_PUBLIC_HUB_URL ?? 'https://visionbiz-hub.vercel.app';
    const url = new URL(redirectTo && isAllowedRedirect(redirectTo) ? redirectTo : hubUrl);
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('refresh_token', refreshToken);
    window.location.href = url.toString();
  }, []);

  // Auto-redirect when user is already persisted in Zustand
  useEffect(() => {
    if (!mounted || !user || !session) return;
    redirectToHub(session.accessToken, session.refreshToken);
  }, [mounted, user, session, redirectToHub]);

  // Hydrate Zustand from active Supabase session (e.g. after invite flow)
  useEffect(() => {
    if (!mounted || user) return;
    authService.getCurrentSession().then((supaSession) => {
      if (!supaSession) return;
      useAuth.setState({ user: supaSession.user, session: supaSession });
      redirectToHub(supaSession.accessToken, supaSession.refreshToken);
    });
  }, [mounted, user, redirectToHub]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-primary">
      <div className="vision-card max-w-md w-full flex flex-col items-center space-y-8">

        {user ? (
          <div className="w-full space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
                Bem-vindo, {user.fullName}
              </h2>
              <p className="text-sm text-slate-400">
                Você já está autenticado. Redirecionando para o painel...
              </p>
            </div>

            <LucideLoader2 className="w-6 h-6 text-slate-500 animate-spin mx-auto" />

            <button
              onClick={() => session && redirectToHub(session.accessToken, session.refreshToken)}
              className="vision-button-primary w-full flex items-center justify-center gap-2"
            >
              <LucideLayoutDashboard className="w-4 h-4" />
              Acessar painel Hub
            </button>

            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-danger-500 transition-colors"
            >
              <LucideLogOut className="w-4 h-4" />
              Desconectar
            </button>
          </div>
        ) : (
          <LoginForm />
        )}

        <div className="pt-2 text-xs text-slate-500 border-t border-border w-full text-center">
          Powered by VisionBiz Infrastructure
        </div>
      </div>
    </main>
  );
}
