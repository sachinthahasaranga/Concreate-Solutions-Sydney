import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'session'
const ALG = 'HS256'

function getSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET missing')
  return new TextEncoder().encode(secret)
}

export async function signSession(payload, { expiresIn = '8h' } = {}) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + parseExp(expiresIn)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(getSecret())
}

export async function verifySession(token) {
  const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] })
  return payload
}

export async function getSession() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  try { return await verifySession(token) } catch { return null }
}

export async function setSessionCookie(token) {
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export function requireRole(session, roleName = 'admin') {
  const roles = session?.roles || []
  return roles.includes(roleName)
}

function parseExp(s) {
  if (typeof s === 'number') return s
  const m = /^(\d+)([smhd])$/.exec(s)
  if (!m) return 8 * 60 * 60
  const n = Number(m[1]); const u = m[2]
  return u === 's' ? n : u === 'm' ? n*60 : u === 'h' ? n*3600 : n*86400
}
