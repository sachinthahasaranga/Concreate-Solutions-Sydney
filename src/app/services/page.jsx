import FooterBlue from '@/components/layout/FooterBlue'
import PageHeader from '@/components/layout/PageHeader'
import ServicesGrid from '@/components/services/ServicesGrid'
import ServicesHero from '@/components/services/ServicesHero'
import StandardsList from '@/components/services/StandardsList'
import services from '@/data/services.json'

export const metadata = {
  title: 'Services | Concreate Solutions Sydney',
  description: 'Brickwork, blockwork, retaining walls, architectural concrete, and more—delivered on time across Sydney.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main className="space-y-12 md:space-y-16">
      <PageHeader
        kicker="OUR SERVICES"
        title="What We Deliver"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        imageSrc="/images/services/service_header.png"
        imageAlt="Team on site"
        bgImage="/images/headers/header.png"
        accent="#ff8a00"
      />

      <ServicesHero
        title={['Your Complete Partner:', 'From Foundations to', 'Final Finishes.']}
        blurb={`From structural blockwork and retaining walls to concrete driveways and paths,
                our Sydney crews manage the full scope with clear communication and tidy handovers.`}
        phoneNumber="071 275 8785"
      />

       <ServicesGrid items={services} />
       <StandardsList/>
       <FooterBlue/>
    </main>
  )
}
