'use client';

import { useState } from 'react';
import { useLoginForm } from './useLoginForm';
import {
  LucideMail,
  LucideLock,
  LucideLoader2,
  LucideEye,
  LucideEyeOff,
  LucideArrowRight,
  LucideArrowLeft,
  LucideAlertTriangle,
  LucideShieldCheck,
} from 'lucide-react';
import { ForgotPasswordForm } from '../forgot-password-form/ForgotPasswordForm';

export function LoginForm() {
  const [view, setView] = useState<'login' | 'forgot-password'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [showSetupConfirm, setShowSetupConfirm] = useState(false);
  const {
    step,
    emailForm,
    passwordForm,
    setupPasswordForm,
    emailValue,
    onCheckEmail,
    onLogin,
    onSetupPassword,
    isChecking,
    isLoading,
    isSettingUp,
    error,
    checkError,
    setupError,
    goBack,
  } = useLoginForm();

  if (view === 'forgot-password') {
    return <ForgotPasswordForm onBack={() => setView('login')} />;
  }

  const emailPill = (
    <div className="flex items-center gap-2 px-3 py-2 bg-background-secondary border border-border rounded-lg">
      <LucideMail className="h-4 w-4 text-slate-500 shrink-0" />
      <span className="text-sm text-slate-300 truncate flex-1">{emailValue}</span>
      <button
        type="button"
        onClick={goBack}
        className="text-xs text-vision-500 hover:text-vision-400 transition-colors shrink-0"
      >
        Alterar
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-sm space-y-6 animate-in fade-in duration-500">

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-ice-50">
          {step === 'email' && 'Entrar na Central'}
          {step === 'password' && 'Bem-vindo de volta'}
          {step === 'setup_password' && 'Primeiro acesso'}
          {step === 'not_found' && 'E-mail não encontrado'}
        </h2>
        <p className="text-sm text-slate-400">
          {step === 'email' && 'Identifique-se para acessar o ecossistema VisionBiz.'}
          {step === 'password' && 'Digite sua senha para continuar.'}
          {step === 'setup_password' && 'Crie uma senha para ativar sua conta.'}
          {step === 'not_found' && 'Este e-mail não está cadastrado no sistema.'}
        </p>
      </div>

      {/* Step 1 — Email */}
      {step === 'email' && (
        <form onSubmit={onCheckEmail} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="email">
              E-mail corporativo
            </label>
            <div className="relative">
              <LucideMail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                {...emailForm.register('email')}
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                autoFocus
                className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
              />
            </div>
            {emailForm.formState.errors.email && (
              <p className="text-xs text-danger-500">{emailForm.formState.errors.email.message}</p>
            )}
          </div>

          {checkError && (
            <div className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg">
              <p className="text-xs text-danger-500 text-center">{checkError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isChecking}
            className="vision-button-primary w-full flex items-center justify-center gap-2"
          >
            {isChecking ? (
              <LucideLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Continuar <LucideArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}

      {/* Step 2a — Enter password */}
      {step === 'password' && (
        <form onSubmit={onLogin} className="space-y-4">
          {emailPill}

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
                {...passwordForm.register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoFocus
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
            {passwordForm.formState.errors.password && (
              <p className="text-xs text-danger-500">{passwordForm.formState.errors.password.message}</p>
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
            {isLoading ? <LucideLoader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
          </button>
        </form>
      )}

      {/* Step 2b — First access: create password */}
      {step === 'setup_password' && (
        <form onSubmit={onSetupPassword} className="space-y-4">
          {emailPill}

          <div className="p-3 bg-vision-500/10 border border-vision-500/20 rounded-lg flex items-start gap-2">
            <LucideShieldCheck className="w-4 h-4 text-vision-500 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-300">
              Seu acesso foi configurado pelo administrador. Defina uma senha para ativar sua conta.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="setup-password">
              Nova senha
            </label>
            <div className="relative">
              <LucideLock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                {...setupPasswordForm.register('password')}
                id="setup-password"
                type={showSetup ? 'text' : 'password'}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-10 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSetup((v) => !v)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showSetup ? <LucideEyeOff className="h-4 w-4" /> : <LucideEye className="h-4 w-4" />}
              </button>
            </div>
            {setupPasswordForm.formState.errors.password && (
              <p className="text-xs text-danger-500">{setupPasswordForm.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="setup-confirm">
              Confirmar senha
            </label>
            <div className="relative">
              <LucideLock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                {...setupPasswordForm.register('confirmPassword')}
                id="setup-confirm"
                type={showSetupConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-background-secondary border border-border rounded-lg pl-10 pr-10 py-2 text-sm focus:border-vision-500 focus:ring-1 focus:ring-vision-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSetupConfirm((v) => !v)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showSetupConfirm ? <LucideEyeOff className="h-4 w-4" /> : <LucideEye className="h-4 w-4" />}
              </button>
            </div>
            {setupPasswordForm.formState.errors.confirmPassword && (
              <p className="text-xs text-danger-500">{setupPasswordForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          {setupError && (
            <div className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg">
              <p className="text-xs text-danger-500 text-center">{setupError}</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-danger-500/10 border border-danger-500/20 rounded-lg">
              <p className="text-xs text-danger-500 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSettingUp || isLoading}
            className="vision-button-primary w-full flex items-center justify-center gap-2"
          >
            {isSettingUp || isLoading ? (
              <LucideLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Criar senha e entrar <LucideArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}

      {/* Step 2c — Not found */}
      {step === 'not_found' && (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-danger-500/10 rounded-2xl">
              <LucideAlertTriangle className="w-10 h-10 text-danger-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">
                O e-mail <span className="text-slate-300 font-medium">{emailValue}</span> não está cadastrado no VisionBiz.
              </p>
              <p className="text-xs text-slate-500">
                Solicite acesso ao administrador da sua organização.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={goBack}
            className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <LucideArrowLeft className="w-4 h-4" />
            Tentar outro e-mail
          </button>
        </div>
      )}

    </div>
  );
}
