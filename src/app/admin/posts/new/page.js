'use client'
import { useState } from 'react'

export default function NewPost() {
  const [form, setForm] = useState({ title: '', imageUrl: '', description: '', content: '' })
  const [err, setErr] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) window.location.href = '/admin/dashboard'
    else setErr((await res.json().catch(()=>({})))?.error || 'Failed')
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">New Post</h1>
      {!!err && <p className="text-red-600 text-sm">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2" placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})}/>
        <input className="w-full border rounded p-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <textarea className="w-full border rounded p-2 min-h-[160px]" placeholder="Content (HTML or Markdown)" value={form.content} onChange={e=>setForm({...form, content:e.target.value})}/>
        <button className="rounded bg-black text-white px-3 py-2">Create</button>
      </form>
    </main>
  )
}
