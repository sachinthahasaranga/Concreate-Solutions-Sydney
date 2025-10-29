'use client'
import { useState } from 'react'

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    if (res.ok) window.location.href = '/admin/dashboard'
    else {
      const j = await res.json().catch(() => ({}))
      setErr(j?.error || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border rounded-lg p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {!!err && <p className="text-red-600 text-sm">{err}</p>}
        <input className="w-full border rounded p-2" placeholder="Username or Email" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
        <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded bg-black text-white py-2">Sign in</button>
      </form>
    </main>
  )
}
