'use client';

import { useEffect, useState } from 'react';
import { useResetPasswordForm } from '../reset-password-form/useResetPasswordForm';
import {
  LucideLock,
  LucideLoader2,
  LucideCheckCircle2,
  LucideEye,
  LucideEyeOff,
  LucideArrowRight,
} from 'lucide-react';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'https://visionbiz-hub.vercel.app';

export function ConfirmInviteForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { form, onSubmit, isLoading, error, isSuccess } = useResetPasswordForm();
  const { register, formState: { errors } } = form;

  useEffect(() => {
    if (isSuccess) {
      window.location.href = HUB_URL;
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="w-full max-w-sm space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center">
          <div className="p-3 bg-success-500/10 rounded-2xl">
            <LucideCheckCircle2 className="w-12 h-12 text-success-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-ice-50">Conta criada!</h2>
          <p className="text-sm text-slate-400">Redirecionando para o VisionBiz Hub…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ice-50">Criar senha</h2>
        <p className="text-sm text-slate-400">
          Bem-vindo ao VisionBiz! Defina uma senha para acessar a plataforma.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="password">
            Senha
          </label>
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
          {errors.password && <p className="text-xs text-danger-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="confirmPassword">
            Confirmar senha
          </label>
          <div className="relative">
            <LucideLock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-10 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <LucideEyeOff className="h-4 w-4" /> : <LucideEye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-danger-500">{errors.confirmPassword.message}</p>
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
          className="vision-button-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <LucideLoader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Criar senha e acessar
              <LucideArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
