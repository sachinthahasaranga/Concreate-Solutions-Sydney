import PageHeader from '@/components/layout/PageHeader'
import BlogSectionClient from '@/components/blog/BlogSection.client'

export const metadata = {
  title: 'Blogs | Concreate Solutions Sydney',
  description:
    'Get a fast quote or speak with our Sydney bricklaying team about your project. Phone, email, and business hours.',
  alternates: { canonical: '/contact' },
}

export default function BlogPage() {
  return (
    <main className="space-y-12 md:space-y-16">
      <PageHeader
        kicker="INSIGHTS"
        title="Latest Articles & Guides"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        imageSrc="/images/blog/header.jpg"
        imageAlt="Project collage"
        bgImage="/images/headers/header.png"
        accent="#ff8a00"
      />
      <BlogSectionClient />
    </main>
  )
}
