import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  let tenantSlug = ''
  if (hostname.includes('visionbiz.com')) {
    const parts = hostname.split('.')
    if (parts.length > 2) {
      tenantSlug = parts[0]
    }
  }

  const requestHeaders = new Headers(request.headers)
  if (tenantSlug) {
    requestHeaders.set('x-visionbiz-tenant', tenantSlug)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
