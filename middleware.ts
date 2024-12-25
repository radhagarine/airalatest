import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from './lib/database.types'

function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt * 1000; // Convert to milliseconds
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookie = req.cookies.get(name)?.value
          if (cookie?.startsWith('base64-')) {
            console.log(`Decoding cookie ${name}`)
            const decoded = Buffer.from(cookie.replace('base64-', ''), 'base64').toString()
            return decoded
          }
          return cookie
        },
        set: (name: string, value: string, options: any) => {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name: string, options: any) => {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const token = req.cookies.get('sb-wkaxxwrvnqsxkuppjqkg-auth-token')?.value
  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token.split('base64-')[1], 'base64').toString())
      console.log('Decoded token type:', typeof decoded)  // Debug
      console.log('Decoded token:', decoded)
      if (decoded.access_token && !isTokenExpired(decoded.expires_at)) {
        await supabase.auth.setSession({
          access_token: decoded.access_token,
          refresh_token: decoded.refresh_token
        })
        return res
      }
    } catch (e) {
      console.error('Error decoding token:', e)
    }
  }

  const { data: { session } } = await supabase.auth.getSession()
  console.log('test3 Session in middleware:', session)
  console.log('test4 Request path:', req.nextUrl.pathname)
  console.log('All cookies:', Object.fromEntries(req.cookies))
  console.log('Auth token:', req.cookies.get('sb-access-token'))


  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Redirecting to home - no session')
    if (req.method === 'POST') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}