import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/repos/posts'

export async function GET(_req, { params }) {
  const slug = params?.slug
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  const post = await getPostBySlug(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ post })
}
