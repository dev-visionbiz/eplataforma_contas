'use client';

import { useState } from 'react';
import { useLoginForm } from './useLoginForm';
import { LucideMail, LucideLock, LucideLoader2, LucideEye, LucideEyeOff } from 'lucide-react';
import { ForgotPasswordForm } from '../forgot-password-form/ForgotPasswordForm';

export function LoginForm() {
  const [view, setView] = useState<'login' | 'forgot-password'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isLoading, error } = useLoginForm();
  const { register, formState: { errors } } = form;

  if (view === 'forgot-password') {
    return <ForgotPasswordForm onBack={() => setView('login')} />;
  }

  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
          Entrar na Central
        </h2>
        <p className="text-sm text-slate-400">
          Identifique-se para acessar o ecossistema VisionBiz.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="email">
            E-mail corporativo
          </label>
          <div className="relative">
            <LucideMail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="nome@empresa.com"
              className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-danger-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300" htmlFor="password">
              Senha
            </label>
            <button
              type="button"
              onClick={() => setView('forgot-password')}
              className="text-xs text-vision-500 hover:text-vision-400 transition-colors"
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className="relative">
            <LucideLock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-10 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <LucideEyeOff className="h-4 w-4" /> : <LucideEye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-danger-500">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg">
            <p className="text-xs text-danger-500 text-center">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="vision-button-primary w-full flex items-center justify-center"
        >
          {isLoading ? (
            <LucideLoader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Entrar'
          )}
        </button>
      </form>
    </div>
  );
}
