const DEFAULT_ALLOWED_ORIGINS = ['localhost:3000', 'visionbiz-hub.vercel.app'];

function getAllowedOrigins(): string[] {
  const envVar = process.env.NEXT_PUBLIC_ALLOWED_REDIRECT_ORIGINS;
  const extra = envVar ? envVar.split(',').map((s) => s.trim()).filter(Boolean) : [];
  return [...DEFAULT_ALLOWED_ORIGINS, ...extra];
}

export function isAllowedRedirect(url: string): boolean {
  try {
    const target = new URL(url);
    return getAllowedOrigins().some((origin) => {
      const base = origin.includes('://') ? origin : `https://${origin}`;
      const allowed = new URL(base);
      return target.hostname === allowed.hostname && target.port === allowed.port;
    });
  } catch {
    return false;
  }
}

export function getRedirectTo(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('redirect_to');
}
