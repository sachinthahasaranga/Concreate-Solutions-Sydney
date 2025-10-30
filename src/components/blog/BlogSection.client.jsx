'use client'
import { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

export default function BlogSectionClient({
  title = 'From the Blog',
  blurb = 'Tips and project insights from our RRR Team.',
  limit = 6,
}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true;(async () => {
      try {
        const r = await fetch('/api/posts', { cache: 'no-store' })
        if (!r.ok) throw new Error('Failed to load posts')
        const { items } = await r.json()
        if (alive) setPosts((items || []).slice(0, limit))
      } catch (e) {
        if (alive) setError(e?.message || 'Error loading posts')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [limit])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <h2 className="text-3xl font-extrabold text-[#0b2a4a] md:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-7 text-gray-600">{blurb}</p>
      </div>

      {loading ? (
        <p className="mx-auto max-w-2xl rounded-xl border border-black/10 bg-white p-6 text-center text-gray-600">
          Loading posts…
        </p>
      ) : error ? (
        <p className="mx-auto max-w-2xl rounded-xl border border-black/10 bg-white p-6 text-center text-red-600">
          {error}
        </p>
      ) : posts.length === 0 ? (
        <p className="mx-auto max-w-2xl rounded-xl border border-black/10 bg-white p-6 text-center text-gray-600">
          No posts yet. Add one in your admin dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </section>
  )
}
