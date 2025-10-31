import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/layout/PageHeader'
import FooterBlue from '@/components/layout/FooterBlue'
import { getPostBySlug, listRecentPosts } from '@/lib/repos/posts'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} | Blog`, description: post.description }
}

function fmtAU(d) {
  return new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
}
const authorLabel = (a) => a?.username || a?.email || 'RRR Team'

export default async function PostDetail({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  const recent = await listRecentPosts({ take: 3, excludeSlug: slug })

  return (
    <main>
      <PageHeader
        kicker="INSIGHTS"
        title={post.title}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]}
        imageSrc="/images/bgdetail.png"
        imageAlt="Project collage"
        bgImage="/images/headers/header.png"
        accent="#ff8a00"
      />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-semibold tracking-wide text-[#0b2a4a]">
              <span className="uppercase">{fmtAU(post.publishedAt)}</span>
              <span className="opacity-30">|</span>
              <span className="uppercase">{authorLabel(post.author)}</span>
            </div>

            {!!post.imageUrl && (
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/10 relative h-60 sm:h-72 md:h-130 w-full">
                <Image src={post.imageUrl} alt={post.title} width={1600} height={400} className="h-auto w-full object-cover" unoptimized />
              </div>
            )}

            <div className="mt-8 space-y-6">
              <p className="text-[15px] leading-7 text-gray-700">{post.description}</p>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-[15px] leading-7 text-gray-800">{post.content}</div>
              </div>
            </div>
          </article>

          <aside className="lg:pl-4 mt-10">
            <div>
              <h3 className="text-2xl font-extrabold text-[#0b2a4a]">About The Blog</h3>
              <p className="mt-3 text-[15px] leading-7 text-gray-700">{post.description}</p>
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-extrabold text-[#0b2a4a]">Recent Posts</h3>
              <ul className="mt-4 space-y-5">
                {recent.map((p) => (
                  <li key={p.id} className="border-b border-black/5 pb-5 last:border-none last:pb-0">
                    <div className="mb-1 text-xs font-semibold tracking-wide text-gray-500">
                      {fmtAU(p.publishedAt)} <span className="mx-2 opacity-30">|</span> {authorLabel(p.author)}
                    </div>
                    <Link href={`/blog/${p.slug}`} className="text-[15px] font-bold leading-6 text-[#0b2a4a] hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FooterBlue />
    </main>
  )
}
