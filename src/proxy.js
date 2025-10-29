import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'session'
const ADMIN_PREFIX = '/admin'
const LOGIN_PATH = '/admin/login'

export async function proxy(req) {
  const { pathname } = new URL(req.url)

  if (pathname === LOGIN_PATH || pathname.startsWith('/api/auth/')) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
        const roles = payload?.roles || []
        if (roles.includes('admin')) {
          const url = new URL('/admin/dashboard', req.url)
          return NextResponse.redirect(url)
        }
      } catch {
      }
    }
    return NextResponse.next()
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (!token) return redirectToLogin(req)

    try {
      const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
      const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
      const roles = payload?.roles || []
      if (!roles.includes('admin')) return redirectToLogin(req)
      return NextResponse.next()
    } catch {
      return redirectToLogin(req)
    }
  }

  return NextResponse.next()
}

function redirectToLogin(req) {
  const url = new URL(LOGIN_PATH, req.url)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
