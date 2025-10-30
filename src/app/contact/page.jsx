import PageHeader from '@/components/layout/PageHeader'
import ContactIntro from '@/components/contact/ContactIntro'
import HomeQuoteSection from '@/components/landing/HomeQuoteSection'
import MapSection from '@/components/contact/MapSection'
import FooterBlue from '@/components/layout/FooterBlue'

export const metadata = {
  title: 'Contact Us | Concreate Solutions Sydney',
  description:
    'Get a fast quote or speak with our Sydney bricklaying team about your project. Phone, email, and business hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="space-y-12 md:space-y-16">
      <PageHeader
        kicker="GET IN TOUCH"
        title="Contact Us"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        imageSrc="/images/about/contactus.png"
        imageAlt="Team on site"
        bgImage="/images/headers/header.png"
        accent="#ff8a00"
      />
      
      <ContactIntro/>
      <MapSection/>
      <HomeQuoteSection />
      <FooterBlue/>
    </main>
  )
}
