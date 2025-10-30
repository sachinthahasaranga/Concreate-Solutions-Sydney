import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345'

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin', description: 'Full administrative access' },
  })

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 11)

  const adminUser = await prisma.user.upsert({
    where: { username: ADMIN_USERNAME },
    update: {
      email: ADMIN_EMAIL,
      passwordHash,
      isActive: true,
    },
    create: {
      email: ADMIN_EMAIL,
      username: ADMIN_USERNAME,
      passwordHash,
      isActive: true,
    },
  })

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: { userId: adminUser.id, roleId: adminRole.id },
  })

  const count = await prisma.post.count()
  if (count === 0) {
    const now = new Date()
    await prisma.post.createMany({
      data: [
        {
          title: 'Welcome to RRR Bricklaying',
          slug: 'welcome-to-concreate-solutions-sydney',
          description:
            'Introducing our professional concrete services across Sydney — driveways, pathways, and retaining walls.',
          content:
            '<p>We specialize in quality concrete work with durable finishes and modern aesthetics.</p>',
          imageUrl:
            'https://www.park.edu/wp-content/uploads/2025/04/Construction-Management-Park-University-min.png',
          publishedAt: now,
          createdAt: now,
        },
        {
          title: 'Concrete Driveways: What to Know',
          slug: 'concrete-driveways-what-to-know',
          description:
            'A quick guide to planning, pouring, and maintaining a long-lasting concrete driveway.',
          content:
            '<p>From base preparation to sealing, here are best practices to extend the life of your driveway.</p>',
          imageUrl:
            'https://ccemagazine.com/wp-content/uploads/sites/11/2025/04/types-of-building-construction-types.png',
          publishedAt: now,
          createdAt: now,
        },
      ],
    })
  }

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
