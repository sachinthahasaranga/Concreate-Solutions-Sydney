'use client'
import { useState } from 'react'

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })
      if (res.ok) {
        window.location.href = '/admin/dashboard'
      } else {
        const j = await res.json().catch(() => ({}))
        setErr(j?.error || 'Login failed')
      }
    } catch (e) {
      setErr('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen relative flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('/images/loginbg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-[80%] bg-amber-300/20 blur-3xl" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-white/20 ring-1 ring-white/30 grid place-items-center">
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-white/90">
              <path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Admin Sign In</h1>
          <p className="mt-1 text-sm text-white/80">Manage posts, pages and settings</p>
        </div>

        {/* error */}
        {!!err && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100"
          >
            {err}
          </div>
        )}

        <label className="block text-sm font-semibold text-white/90">
          Username or Email
          <div className="mt-2 relative">
            <input
              className="peer w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-white placeholder-white/60 outline-none transition focus:border-white/40"
              placeholder="you@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              required
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 12q1.65 0 2.825-1.175Q16 9.65 16 8t-1.175-2.825Q13.65 4 12 4T9.175 5.175Q8 6.35 8 8t1.175 2.825Q10.35 12 12 12Zm0 2q-2.075 0-3.537 1.463Q7 16.925 7 19v1h10v-1q0-2.075-1.463-3.537Q14.075 14 12 14Z"/>
              </svg>
            </span>
          </div>
        </label>

        <label className="mt-4 block text-sm font-semibold text-white/90">
          Password
          <div className="mt-2 relative">
            <input
              className="peer w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-12 text-white placeholder-white/60 outline-none transition focus:border-white/40"
              type={show ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/10"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        <div className="mt-6 flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-white/80">
            <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-white/10" />
            Remember me
          </label>
          <a href="#" className="text-white/90 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7.07 3.93a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 1 1-1.41-1.41l1.41-1.42a1 1 0 0 1 1.42 0ZM21 11a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2ZM6.34 6.34a1 1 0 0 1 1.41 0L9.17 7.76a1 1 0 1 1-1.41 1.41L6.34 7.75a1 1 0 0 1 0-1.41ZM4 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h2Zm2.34 8.66a1 1 0 0 1 0-1.41l1.42-1.42a1 1 0 1 1 1.41 1.41l-1.41 1.42a1 1 0 0 1-1.42 0ZM12 19a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm8.66-1.34a1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 0 1 0 1.42Z"/>
              </svg>
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>

        <p className="mt-4 text-center text-xs text-white/70">
          Need access? Contact an administrator.
        </p>
      </form>
    </main>
  )
}
