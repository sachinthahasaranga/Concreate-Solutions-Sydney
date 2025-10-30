import HeroSignature from '@/components/landing/HeroSignature'
import HomeQuoteSection from '@/components/landing/HomeQuoteSection'
import PerformanceBanner from '@/components/landing/PerformanceBanner'
import ServicesShowcase from '@/components/landing/ServicesShowcase'
import TestimonialsSplit from '@/components/landing/TestimonialsSplit'
import ValueProps from '@/components/landing/ValueProps'
import WhatWeDo from '@/components/landing/WhatWeDo'
import FooterBlue from '@/components/layout/FooterBlue'

export default function HomePage() {
  return (
    <main className="space-y-16">
      <HeroSignature
        kicker="Built right, first time"
        titleLines={['Unique Masonry', 'for Modern', 'Sydney Spaces']}
        blurb="From architectural face brick to structural blockwork ISO-compliant delivery, tight tolerances, and tidy finishes."
        ctaPrimaryLabel="Request a Quote"
        ctaPrimaryHref="/contact"
        ctaSecondaryLabel="View Projects"
        ctaSecondaryHref="/blog"
        videoSrcMp4="/videos/hero.mp4"
        poster="/images/hero-poster.jpg"
        theme={{
          bgFrom: '#0b1220',
          bgTo: '#060913',
          accent: '#ffd166',
          text: '#e5e7eb',
        }}
      />

      <ValueProps />
      <WhatWeDo
        imageSrc="/images/whatwedo-main.png"
        whatsapp="0712758785"
      />
       <ServicesShowcase />

       <PerformanceBanner
        videoSrcMp4="/videos/video4.mp4"
        poster="/images/team-thumbs.jpg"
      />

      <TestimonialsSplit
        kicker="TESTIMONIALS"
        title="What Client Says, About Us"
        videoSrc="/videos/video5.mp4"
        poster="/images/testimonials/poster.jpg"
        whatsapp="0712758785"
        phone="0712758785"
      />
      <HomeQuoteSection />
      <FooterBlue/>

      
    </main>
  )
}
