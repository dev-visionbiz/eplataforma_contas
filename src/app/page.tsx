'use client';

import { LucideLayoutDashboard, LucideLogOut, LucideLoader2 } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form/LoginForm";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { authService } from "@/features/auth/services/auth-service";
import { isAllowedRedirect, getRedirectTo } from "@/lib/auth/redirect";
import { useEffect, useState, useCallback } from "react";

type PageState = 'loading' | 'login' | 'redirecting';

export default function Home() {
  const { logout } = useAuth();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [userName, setUserName] = useState('');
  const [liveTokens, setLiveTokens] = useState<{ accessToken: string; refreshToken: string } | null>(null);

  const buildHubUrl = useCallback((accessToken: string, refreshToken: string): string => {
    const redirectTo = getRedirectTo();
    const hubUrl = process.env.NEXT_PUBLIC_HUB_URL ?? 'https://visionbiz-hub.vercel.app';
    const url = new URL(redirectTo && isAllowedRedirect(redirectTo) ? redirectTo : hubUrl);
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('refresh_token', refreshToken);
    return url.toString();
  }, []);

  const signOutAndShowLogin = useCallback(() => {
    authService.logout()
      .catch(() => {})
      .finally(() => {
        useAuth.setState({ user: null, session: null });
        window.history.replaceState({}, '', window.location.pathname);
        setLiveTokens(null);
        setPageState('login');
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Hub sinaliza logout redirecionando com ?signout=true
    if (params.get('signout') === 'true') {
      signOutAndShowLogin();
      return;
    }

    // Verifica sessão ao vivo no Supabase — nunca confia apenas no Zustand
    authService.getCurrentSession().then((liveSession) => {
      if (liveSession) {
        useAuth.setState({ user: liveSession.user, session: liveSession });
        setUserName(liveSession.user.fullName);
        setLiveTokens({ accessToken: liveSession.accessToken, refreshToken: liveSession.refreshToken });
        setPageState('redirecting');
        window.location.href = buildHubUrl(liveSession.accessToken, liveSession.refreshToken);
      } else {
        useAuth.setState({ user: null, session: null });
        setPageState('login');
      }
    });
  }, [buildHubUrl, signOutAndShowLogin]);

  if (pageState === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background-primary">
        <LucideLoader2 className="w-6 h-6 text-slate-500 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-primary">
      <div className="vision-card max-w-md w-full flex flex-col items-center space-y-8">

        {pageState === 'redirecting' ? (
          <div className="w-full space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
                Bem-vindo, {userName}
              </h2>
              <p className="text-sm text-slate-400">
                Redirecionando para o painel...
              </p>
            </div>

            <LucideLoader2 className="w-6 h-6 text-slate-500 animate-spin mx-auto" />

            {liveTokens && (
              <button
                onClick={() => { window.location.href = buildHubUrl(liveTokens.accessToken, liveTokens.refreshToken); }}
                className="vision-button-primary w-full flex items-center justify-center gap-2"
              >
                <LucideLayoutDashboard className="w-4 h-4" />
                Acessar painel Hub
              </button>
            )}

            <button
              onClick={signOutAndShowLogin}
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
