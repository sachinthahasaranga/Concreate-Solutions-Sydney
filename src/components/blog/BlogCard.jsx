'use client'

import Image from 'next/image'
import Link from 'next/link'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default function BlogCard({
  post,
  hrefBase = '/blog',
  fallbackImg = '/images/blog/fallback.jpg',
}) {
  const date = new Date(post.publishedAt)
  const day = String(date.getDate()).padStart(2,'0')
  const mon = MONTHS[date.getMonth()]

  const category = post.category || post.tag || null
  const authorName = post.authorName || post.author?.name || null

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
      <div className="relative h-64 w-full">
        <Image
          src={post.imageUrl || fallbackImg}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw,(min-width:768px) 50vw,100vw"
          priority={false}
          unoptimized
        />
        <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-md">
          <div className="text-lg font-extrabold text-[#0b2a4a] leading-none">{day}</div>
          <div className="mt-1 rounded-md bg-[#0b2a4a] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
            {mon}
          </div>
        </div>
      </div>

      <div className="p-6">
        {category && (
          <span className="inline-block rounded-full bg-[#0b2a4a]/10 px-3 py-1 text-xs font-extrabold tracking-wide text-[#0b2a4a]">
            {category}
          </span>
        )}

        <h3 className="mt-3 text-xl font-extrabold leading-snug text-[#0b2a4a]">
          <Link href={`${hrefBase}/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 text-[15px] leading-7 text-gray-600 line-clamp-4">
          {post.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`${hrefBase}/${post.slug}`}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0b2a4a]"
          >
            Read More <span aria-hidden>›</span>
          </Link>
          {authorName && (
            <span className="text-sm text-gray-600">by <span className="font-semibold text-[#0b2a4a]">{authorName}</span></span>
          )}
        </div>
      </div>
    </article>
  )
}
