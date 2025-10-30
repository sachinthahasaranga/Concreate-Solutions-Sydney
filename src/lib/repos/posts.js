import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getPostBySlug(slug) {
  if (!slug) return null
  return prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { username: true, email: true } } },
  })
}

export async function listRecentPosts({ take = 3, excludeSlug = null } = {}) {
  return prisma.post.findMany({
    where: excludeSlug ? { NOT: { slug: excludeSlug } } : undefined,
    orderBy: { publishedAt: 'desc' },
    take,
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      author: { select: { username: true, email: true } },
    },
  })
}
