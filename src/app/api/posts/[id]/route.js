import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, requireRole } from '@/lib/auth'
import { toSlug } from '@/lib/slugify'

export async function GET(_req, ctx) {
  const { id } = await ctx.params 
  const postId = Number(id)
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function PUT(req, ctx) {
  const session = await getSession()
  if (!requireRole(session, 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const postId = Number(id)
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const data = {}
    if (body.title) {
      data.title = body.title
      let slug = toSlug(body.title), i = 1
      while (await prisma.post.findUnique({ where: { slug } })) {
        slug = `${toSlug(body.title)}-${i++}`
      }
      data.slug = slug
    }
    if (typeof body.imageUrl !== 'undefined') data.imageUrl = body.imageUrl || null
    if (typeof body.description === 'string') data.description = body.description
    if (typeof body.content === 'string') data.content = body.content

    const post = await prisma.post.update({ where: { id: postId }, data })
    return NextResponse.json({ ok: true, post })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_req, ctx) {
  const session = await getSession()
  if (!requireRole(session, 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const postId = Number(id)
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await prisma.post.delete({ where: { id: postId } })
  return NextResponse.json({ ok: true })
}
