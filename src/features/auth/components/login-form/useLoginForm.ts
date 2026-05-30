import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/use-auth';
import { isAllowedRedirect, getRedirectTo } from '@/lib/auth/redirect';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const { login, isLoading, error } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password);
    const { user, session, error: loginError } = useAuth.getState();
    if (user && session && !loginError) {
      const redirectTo = getRedirectTo();
      if (redirectTo && isAllowedRedirect(redirectTo)) {
        const url = new URL(redirectTo);
        url.searchParams.set('access_token', session.accessToken);
        url.searchParams.set('refresh_token', session.refreshToken);
        window.location.href = url.toString();
      }
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
  };
}
