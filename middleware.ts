import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuth } from "@/hooks/use-auth"

export async function middleware(req: NextRequest) {
  const { isAuthenticated } = await useAuth.getState();
  const res = NextResponse.next();
  console.log('in middlware, isauthenticated =', isAuthenticated)
  if (!isAuthenticated && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Redirecting to home - no session');
    const redirectUrl = new URL('/', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/signin')) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/', '/signin', '/dashboard/:path*'],
}