import { headers } from 'next/headers'
import BlogCard from './BlogCard'

function makeUrl(path) {
  const h = headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  return `${proto}://${host}${path}`
}

async function getPosts(limit = 6) {
  const res = await fetch(makeUrl('/api/posts'), { cache: 'no-store' })
  if (!res.ok) return []
  const { items } = await res.json()
  return (items || []).slice(0, limit)
}

export default async function BlogSection({
  title = 'From the Blog',
  blurb = 'Tips and insights from our Sydney team.',
  limit = 6,
}) {
  const posts = await getPosts(limit)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <h2 className="text-3xl font-extrabold text-[#0b2a4a] md:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-7 text-gray-600">{blurb}</p>
      </div>

      {posts.length === 0 ? (
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
