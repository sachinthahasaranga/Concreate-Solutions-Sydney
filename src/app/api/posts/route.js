import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, requireRole } from '@/lib/auth'
import { toSlug } from '@/lib/slugify'

export async function GET() {
  const items = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
    select: { id: true, title: true, slug: true, imageUrl: true, description: true, publishedAt: true },
  })
  return NextResponse.json({ items })
}

export async function POST(req) {
  const session = await getSession()
  if (!requireRole(session, 'admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { title, imageUrl, description, content } = await req.json()
    if (!title || !description || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    let slug = toSlug(title), i = 1
    while (await prisma.post.findUnique({ where: { slug } })) slug = `${toSlug(title)}-${i++}`
    const post = await prisma.post.create({
      data: { title, slug, imageUrl: imageUrl || null, description, content, authorId: session?.sub ? Number(session.sub) : null },
      select: { id: true, title: true, slug: true },
    })
    return NextResponse.json({ ok: true, post }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
