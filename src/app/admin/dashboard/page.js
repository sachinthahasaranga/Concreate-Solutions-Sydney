'use client'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const r = await fetch('/api/posts', { cache: 'no-store' })
        if (!r.ok) throw new Error('Failed to load posts')
        const { items } = await r.json()
        if (alive) setItems(items || [])
      } catch (e) {
        if (alive) setErr(e?.message || 'Error loading posts')
        // Show a SweetAlert error too
        Swal.fire({
          icon: 'error',
          title: 'Load failed',
          text: e?.message || 'Error loading posts',
          confirmButtonColor: '#111827',
        })
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(p =>
      (p.title || '').toLowerCase().includes(s) ||
      (p.slug || '').toLowerCase().includes(s) ||
      (p.description || '').toLowerCase().includes(s)
    )
  }, [items, q])

  async function onDelete(id) {
    const res = await Swal.fire({
      title: 'Delete this post?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
      focusCancel: true,
    })
    if (!res.isConfirmed) return

    try {
      const r = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (!r.ok) throw new Error('Delete failed')
      setItems(prev => prev.filter(x => x.id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'The post has been removed.',
        timer: 1200,
        showConfirmButton: false,
      })
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: e?.message || 'Could not delete the post.',
        confirmButtonColor: '#111827',
      })
    }
  }

  async function onLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      await Swal.fire({
        icon: 'success',
        title: 'Signed out',
        text: 'You have been logged out.',
        timer: 1200,
        showConfirmButton: false,
      })
    } catch {
      // even if it fails, still navigate to login
    } finally {
      window.location.href = '/admin/login'
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-900 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Admin Dashboard</div>
              <div className="text-xs text-gray-500">Manage posts</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/admin/posts/new"
              className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:translate-y-[-1px] transition"
            >
              New Post
            </a>
            <button
              onClick={onLogout}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xl font-semibold text-gray-900">
            Posts <span className="ml-1 text-gray-500 text-base">({items.length})</span>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pl-9 text-sm outline-none focus:border-gray-500"
              placeholder="Search by title, slug, or description…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 20.49 21.49 19 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
              </svg>
            </span>
          </div>
        </div>

        {loading && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">Loading…</div>
        )}
        {!!err && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">{err}</div>
        )}
        {!loading && !err && filtered.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
            No posts match your search.
          </div>
        )}

        {!loading && !err && filtered.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="hidden grid-cols-[auto_1fr_auto] gap-4 border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:grid">
              <div>Published</div>
              <div>Title / Slug</div>
              <div>Actions</div>
            </div>

            <ul className="divide-y divide-gray-200">
              {filtered.map((p) => (
                <li key={p.id} className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <div className="text-sm text-gray-600">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-AU', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    }) : '-'}
                  </div>

                  <div>
                    <div className="line-clamp-1 font-medium text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-500">/{p.slug}</div>
                    {p.description && (
                      <div className="mt-1 line-clamp-2 text-sm text-gray-600">{p.description}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-start gap-2 sm:justify-end">
                    <a
                      href={`/blog/${p.slug}`}
                      className="rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      target="_blank"
                      rel="noreferrer"
                      title="View"
                    >
                      View
                    </a>
                    <a
                      href={`/admin/posts/${p.id}/edit`}
                      className="rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:translate-y-[-1px] transition"
                      title="Edit"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="rounded-lg border border-red-300 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}
