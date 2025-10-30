import AboutGallery from '@/components/about/AboutGallery'
import AboutSection from '@/components/about/AboutSection'
import AboutSkills from '@/components/about/AboutSkills'
import MissionVisionValues from '@/components/about/MissionVisionValues'
import WhyChooseUs from '@/components/about/WhyChooseUs'
import PerformanceBanner from '@/components/landing/PerformanceBanner'
import TestimonialsSplit from '@/components/landing/TestimonialsSplit'
import FooterBlue from '@/components/layout/FooterBlue'
import PageHeader from '@/components/layout/PageHeader'

export const metadata = {
  title: 'About Us | Concreate Solutions Sydney',
  description:
    'We deliver reliable brick and concrete work across Sydney with ISO-aligned practices and tidy finishes. Learn about our crew, process, and values.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main className="space-y-12 md:space-y-16">
      <PageHeader
        kicker="WHO WE ARE"
        title="About Us"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
        imageSrc="/images/about/about1.png"
        imageAlt="Concreate Solutions team on site"
        bgImage="/images/headers/header.png"       
        accent="#ff8a00"                            
      />

      {/* <AboutSection/> */}
      <AboutSkills/>
      <MissionVisionValues/>
      <TestimonialsSplit
        kicker="TESTIMONIALS"
        title="What Client Says, About Us"
        videoSrc="/videos/video5.mp4"
        poster="/images/testimonials/poster.jpg"
        whatsapp="0712758785"
        phone="0712758785"
      /> 
      <AboutGallery/>
      <WhyChooseUs/>   
      <PerformanceBanner
        videoSrcMp4="/videos/video4.mp4"
        poster="/images/team-thumbs.jpg"
      />  
      <FooterBlue/>
    </main>
  )
}
