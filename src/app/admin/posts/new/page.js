'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2'

const slugify = (s = '') =>
  s.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export default function NewPost() {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',      // gets filled after Cloudinary upload
    description: '',
    content: '',
  })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef(null)

  const derivedSlug = useMemo(() => slugify(form.title || ''), [form.title])
  const descCount = form.description.trim().length
  const contentWords = useMemo(
    () => (form.content.trim() ? form.content.trim().split(/\s+/).length : 0),
    [form.content]
  )

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function validate() {
    if (!form.title.trim()) return 'Title is required'
    if (!form.description.trim()) return 'Description is required'
    if (!form.content.trim()) return 'Content is required'
    if (!form.imageUrl.trim()) return 'Cover image is required'
    return ''
  }

  async function onSubmit(e) {
    e.preventDefault()
    setErr('')
    const v = validate()
    if (v) { setErr(v); return }
    setLoading(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Post created',
          text: 'Your article has been published.',
          confirmButtonColor: '#111827',
        })
        window.location.href = '/admin/dashboard'
      } else {
        const j = await res.json().catch(() => ({}))
        setErr(j?.error || 'Failed to create post')
      }
    } catch {
      setErr('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'enter') {
        const formEl = document.getElementById('new-post-form')
        formEl?.requestSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      setErr('')
      setUploading(true)
      const url = await uploadToCloudinary(file)
      update('imageUrl', url)
      await Swal.fire({
        icon: 'success',
        title: 'Image uploaded',
        text: 'Cover image added successfully.',
        confirmButtonColor: '#111827',
      })
    } catch (error) {
      setErr(error?.message || 'Upload failed')
    } finally {
      setUploading(false)
      // reset the file input so same file can be chosen again if needed
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-900 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z"/></svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">New Post</div>
              <div className="text-xs text-gray-500">Create a blog article</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href="/admin/dashboard" className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Cancel
            </a>
            <button
              form="new-post-form"
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] disabled:opacity-60"
              title="Ctrl/⌘ + Enter"
            >
              {loading ? 'Saving…' : 'Create'}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        {!!err && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <form id="new-post-form" onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                placeholder="Concrete Driveways: What To Know"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                required
              />
              <div className="mt-1 text-xs text-gray-500">
                Slug: <code className="rounded bg-gray-100 px-1 py-0.5">/blog/{derivedSlug || '…'}</code>
              </div>
            </div>

            {/* Image upload (button only) + preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Cover Image <span className="text-red-600">*</span>
              </label>

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
                  {form.imageUrl ? 'Image added' : 'No image selected'}
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

              <p className="mt-1 text-xs text-gray-500">Recommended: 1600×900 (16:9).</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                placeholder="Short summary shown in lists and social previews."
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={3}
                required
              />
              <div className="mt-1 text-xs text-gray-500">{descCount} chars</div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Content <span className="text-red-600">*</span>
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500 font-mono"
                placeholder="Write your article here (Markdown or plain text)."
                value={form.content}
                onChange={(e) => update('content', e.target.value)}
                rows={14}
                required
              />
              <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                <span>{contentWords} words</span>
                <span>Tip: press <kbd className="rounded bg-gray-100 px-1">Ctrl/⌘</kbd> + <kbd className="rounded bg-gray-100 px-1">Enter</kbd> to submit</span>
              </div>
            </div>
          </form>

          {/* Right panel */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Publishing</div>
              <p className="mt-2 text-sm text-gray-600">
                Posts are published immediately. You can edit or delete any time from the dashboard.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  form="new-post-form"
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] disabled:opacity-60"
                >
                  {loading ? 'Saving…' : 'Create Post'}
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
              <div className="text-sm font-semibold text-gray-900">SEO tips</div>
              <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                <li>Keep description around 140–160 characters</li>
                <li>Use clear keywords in the title</li>
                <li>Add a relevant, high-quality cover image</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
