import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/use-auth';
import { isAllowedRedirect, getRedirectTo } from '@/lib/auth/redirect';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'https://visionbiz-hub.vercel.app';

function redirectAfterLogin(accessToken: string, refreshToken: string) {
  const redirectTo = getRedirectTo();
  const target = redirectTo && isAllowedRedirect(redirectTo) ? redirectTo : HUB_URL;
  const url = new URL(target);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('refresh_token', refreshToken);
  window.location.href = url.toString();
}

export type LoginStep = 'email' | 'password' | 'setup_password' | 'not_found';

const emailSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

const passwordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const setupPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirme sua senha'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
type SetupPasswordFormValues = z.infer<typeof setupPasswordSchema>;

export function useLoginForm() {
  const { login, isLoading, error } = useAuth();
  const [step, setStep] = useState<LoginStep>('email');
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState('');

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
  });

  const setupPasswordForm = useForm<SetupPasswordFormValues>({
    resolver: zodResolver(setupPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onCheckEmail = async (values: EmailFormValues) => {
    setIsChecking(true);
    setCheckError(null);
    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      setEmailValue(values.email);

      if (data.status === 'active') {
        setStep('password');
      } else if (data.status === 'pending_invite') {
        setStep('setup_password');
      } else {
        setStep('not_found');
      }
    } catch {
      setCheckError('Falha de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsChecking(false);
    }
  };

  const onLogin = async (values: PasswordFormValues) => {
    await login(emailValue, values.password);
    const { user, session, error: loginError } = useAuth.getState();
    if (user && session && !loginError) {
      redirectAfterLogin(session.accessToken, session.refreshToken);
    }
  };

  const onSetupPassword = async (values: SetupPasswordFormValues) => {
    setIsSettingUp(true);
    setSetupError(null);
    try {
      const res = await fetch('/api/auth/setup-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, password: values.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSetupError(data.error || 'Erro ao criar senha. Tente novamente.');
        return;
      }
      // Auto-login after password setup
      await login(emailValue, values.password);
      const { user, session, error: loginError } = useAuth.getState();
      if (user && session && !loginError) {
        redirectAfterLogin(session.accessToken, session.refreshToken);
      }
    } catch {
      setSetupError('Falha de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSettingUp(false);
    }
  };

  const goBack = () => {
    setStep('email');
    setCheckError(null);
    setSetupError(null);
    passwordForm.reset();
    setupPasswordForm.reset();
    useAuth.setState({ error: null });
  };

  return {
    step,
    emailForm,
    passwordForm,
    setupPasswordForm,
    emailValue,
    onCheckEmail: emailForm.handleSubmit(onCheckEmail),
    onLogin: passwordForm.handleSubmit(onLogin),
    onSetupPassword: setupPasswordForm.handleSubmit(onSetupPassword),
    isChecking,
    isLoading,
    isSettingUp,
    error,
    checkError,
    setupError,
    goBack,
  };
}
