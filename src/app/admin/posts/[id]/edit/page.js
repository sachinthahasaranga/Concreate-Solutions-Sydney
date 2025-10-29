'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditPost() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const [form, setForm] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(r => r.json()).then(d => {
      if (d.post) setForm(d.post); else setErr('Not found')
    })
  }, [id])

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: form.title,
        imageUrl: form.imageUrl,
        description: form.description,
        content: form.content,
      }),
    })
    if (res.ok) router.push('/admin/dashboard')
    else setErr((await res.json().catch(()=>({})))?.error || 'Failed')
  }

  async function onDelete() {
    if (!confirm('Delete this post?')) return
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) router.push('/admin/dashboard')
    else alert('Delete failed')
  }

  if (!form) return <main className="p-6">Loading…</main>
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Post</h1>
      {!!err && <p className="text-red-600 text-sm">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded p-2" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border rounded p-2" value={form.imageUrl ?? ''} onChange={e=>setForm({...form, imageUrl:e.target.value})}/>
        <input className="w-full border rounded p-2" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <textarea className="w-full border rounded p-2 min-h-[160px]" value={form.content} onChange={e=>setForm({...form, content:e.target.value})}/>
        <div className="flex gap-3">
          <button className="rounded bg-black text-white px-3 py-2" type="submit">Save</button>
          <button className="rounded border px-3 py-2" type="button" onClick={onDelete}>Delete</button>
        </div>
      </form>
    </main>
  )
}
