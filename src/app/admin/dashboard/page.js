'use client'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(d => setItems(d.items || []))
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <a href="/admin/posts/new" className="rounded bg-black text-white px-3 py-2 text-sm">New Post</a>
      </div>
      <ul className="space-y-3">
        {items.map(p => (
          <li key={p.id} className="border rounded p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-500">/{p.slug}</div>
            </div>
            <a href={`/admin/posts/${p.id}/edit`} className="text-sm underline">Edit</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
