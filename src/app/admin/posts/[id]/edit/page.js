'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const slugify = (s = '') =>
  s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export default function EditPost() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')

  const fileInputRef = useRef(null)

  const derivedSlug = useMemo(() => slugify(form?.title || ''), [form?.title])
  const descCount = (form?.description || '').trim().length
  const contentWords = useMemo(
    () => (form?.content?.trim() ? form.content.trim().split(/\s+/).length : 0),
    [form?.content]
  )

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const r = await fetch(`/api/posts/${id}`, { cache: 'no-store' })
        const j = await r.json().catch(() => ({}))
        if (!r.ok || !j?.post) throw new Error(j?.error || 'Not found')
        if (alive) setForm(j.post)
      } catch (e) {
        setErr(e?.message || 'Failed to load post')
        Swal.fire({
          icon: 'error',
          title: 'Load failed',
          text: e?.message || 'Failed to load post',
          confirmButtonColor: '#111827',
        })
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [id])

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function validate() {
    if (!form?.title?.trim()) return 'Title is required'
    if (!form?.description?.trim()) return 'Description is required'
    if (!form?.content?.trim()) return 'Content is required'
    // image optional during edit, but you can enforce if you want:
    // if (!form?.imageUrl?.trim()) return 'Cover image is required'
    return ''
  }

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    const v = validate()
    if (v) { setErr(v); return }
    setSaving(true)
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          imageUrl: form.imageUrl || null,
          description: form.description,
          content: form.content,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || 'Save failed')
      }
      await Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'Post updated successfully.',
        timer: 1200,
        showConfirmButton: false,
      })
      router.push('/admin/dashboard')
    } catch (e) {
      setErr(e?.message || 'Save failed')
      Swal.fire({
        icon: 'error',
        title: 'Save failed',
        text: e?.message || 'Could not update the post.',
        confirmButtonColor: '#111827',
      })
    } finally {
      setSaving(false)
    }
  }

  async function onDelete() {
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
      await Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'The post has been removed.',
        timer: 1200,
        showConfirmButton: false,
      })
      router.push('/admin/dashboard')
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: e?.message || 'Could not delete the post.',
        confirmButtonColor: '#111827',
      })
    }
  }

  async function uploadToCloudinary(file) {
    const ts = Math.floor(Date.now() / 1000)
    const folder = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || 'concreate/blog'

    const signRes = await fetch('/api/upload/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: ts, folder }),
    })
    if (!signRes.ok) throw new Error('Failed to sign upload')
    const { signature, apiKey, cloudName } = await signRes.json()

    const fd = new FormData()
    fd.append('file', file)
    fd.append('api_key', apiKey)
    fd.append('timestamp', String(ts))
    fd.append('signature', signature)
    fd.append('folder', folder)

    const up = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: fd,
    })
    if (!up.ok) throw new Error('Upload failed')
    const json = await up.json()
    return json.secure_url
  }

  async function onPickFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const url = await uploadToCloudinary(file)
      update('imageUrl', url)
      await Swal.fire({
        icon: 'success',
        title: 'Image uploaded',
        text: 'Cover image replaced successfully.',
        confirmButtonColor: '#111827',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload failed',
        text: error?.message || 'Could not upload the image.',
        confirmButtonColor: '#111827',
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  if (loading) return <main className="p-6 text-gray-600">Loading…</main>
  if (!form) return <main className="p-6 text-red-600">{err || 'Not found'}</main>

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-900 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/></svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Edit Post</div>
              <div className="text-xs text-gray-500">/{derivedSlug || form.slug}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/admin/dashboard"
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back
            </a>
            <button
              onClick={onDelete}
              className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
              title="Delete post"
            >
              Delete
            </button>
            <button
              form="edit-post-form"
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        {!!err && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <form id="edit-post-form" onSubmit={onSubmit} className="hidden" />
          <form id="edit-post-form-real" onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Title</label>
              <input
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Post title"
              />
              <div className="mt-1 text-xs text-gray-500">
                Slug preview: <code className="rounded bg-gray-100 px-1 py-0.5">/blog/{derivedSlug || form.slug}</code>
              </div>
            </div>

            {/* Cover image: replace via Cloudinary */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Cover Image</label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickFile}
              />

              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  {uploading ? 'Uploading…' : (form.imageUrl ? 'Replace Image' : 'Add Image')}
                </button>
                <span className={`text-xs ${form.imageUrl ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {form.imageUrl ? 'Image set' : 'No image selected'}
                </span>
              </div>

              {form.imageUrl?.trim() ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={form.imageUrl}
                    alt="Cover preview"
                    className="h-44 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
              ) : null}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Description</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                rows={3}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Short summary for lists & social."
              />
              <div className="mt-1 text-xs text-gray-500">{descCount} chars</div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Content</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 font-mono"
                rows={14}
                value={form.content}
                onChange={(e) => update('content', e.target.value)}
                placeholder="Markdown or plain text."
              />
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>{contentWords} words</span>
                <span>Tip: use clear headings & short paragraphs</span>
              </div>
            </div>
          </form>

          {/* Right panel */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Actions</div>
              <p className="mt-2 text-sm text-gray-600">
                Update post details or replace the cover image. Changes are saved immediately when you press <strong>Save</strong>.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  form="edit-post-form-real"
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <a
                  href="/admin/dashboard"
                  className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Info</div>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                <li>Use descriptive titles with key terms.</li>
                <li>1600×900 image recommended for social cards.</li>
                <li>Keep description around 140–160 chars.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
