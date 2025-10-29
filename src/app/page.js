import HeroSignature from '@/components/landing/HeroSignature'

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

      {/* …other sections later… */}
    </main>
  )
}
