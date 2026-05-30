'use client';

import { LucideShieldCheck, LucideLayoutDashboard, LucideLogOut, LucideUsers } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form/LoginForm";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch with Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-primary">
      <div className="vision-card max-w-md w-full flex flex-col items-center space-y-8">
        <div className="flex justify-center">
          <div className="p-3 bg-vision-500/10 rounded-2xl">
            <LucideShieldCheck className="w-12 h-12 text-vision-500" />
          </div>
        </div>
        
        {user ? (
          <div className="w-full space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
                Bem-vindo, {user.fullName}
              </h2>
              <p className="text-sm text-slate-400">
                Você está autenticado na Central VisionBiz.
              </p>
            </div>

            <div className="p-4 bg-background-secondary rounded-lg border border-border text-left space-y-3">
              <div className="flex items-center gap-3">
                <LucideLayoutDashboard className="w-5 h-5 text-vision-500" />
                <span className="text-sm font-medium">Sessão Ativa</span>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p>ID: {user.id}</p>
                <p>Papel: {user.role}</p>
                <p>Tenant: {user.tenantId}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Link 
                href="/users"
                className="vision-button-primary w-full flex items-center justify-center gap-2"
              >
                <LucideUsers className="w-4 h-4" />
                Gerenciar Usuários
              </Link>
            </div>

            <button 
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-danger-500 transition-colors"
            >
              <LucideLogOut className="w-4 h-4" />
              Sair da conta
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
