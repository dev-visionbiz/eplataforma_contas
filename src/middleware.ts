import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Logic to resolve tenant from hostname
  // Examples:
  // - client.visionbiz.com -> tenant slug = 'client'
  // - customdomain.com -> look up in DB
  
  // For now, let's extract the subdomain as a simple resolution strategy
  let tenantSlug = ''
  if (hostname.includes('visionbiz.com')) {
    const parts = hostname.split('.')
    if (parts.length > 2) {
      tenantSlug = parts[0]
    }
  }

  // If we have a tenant slug, we can pass it to the application via headers
  const requestHeaders = new Headers(request.headers)
  if (tenantSlug) {
    requestHeaders.set('x-visionbiz-tenant', tenantSlug)
  }

  // Rewrite or continue
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
