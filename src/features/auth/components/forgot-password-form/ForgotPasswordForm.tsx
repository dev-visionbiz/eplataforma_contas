'use client';

import { useForgotPasswordForm } from './useForgotPasswordForm';
import { LucideMail, LucideLoader2, LucideArrowLeft, LucideCheckCircle2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const { form, onSubmit, isLoading, error, isSuccess } = useForgotPasswordForm();
  const { register, formState: { errors } } = form;

  if (isSuccess) {
    return (
      <div className="w-full max-w-sm space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center">
          <div className="p-3 bg-success-500/10 rounded-2xl">
            <LucideCheckCircle2 className="w-12 h-12 text-success-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
            E-mail enviado!
          </h2>
          <p className="text-sm text-slate-400">
            Enviamos as instruções de recuperação para o seu e-mail corporativo.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm font-medium text-vision-500 hover:text-vision-400 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <LucideArrowLeft className="w-4 h-4" />
          Voltar para o login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="text-xs font-medium text-slate-500 hover:text-vision-500 transition-colors flex items-center gap-1 mb-2"
        >
          <LucideArrowLeft className="w-3 h-3" />
          Voltar
        </button>
        <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
          Recuperar senha
        </h2>
        <p className="text-sm text-slate-400">
          Insira seu e-mail para receber um link de recuperação.
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
            'Enviar recuperação'
          )}
        </button>
      </form>
    </div>
  );
}
