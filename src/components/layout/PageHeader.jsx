'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PageHeader({
  kicker = 'WHO WE ARE',
  title = 'About Us',
  crumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
  ],
  imageSrc = '/images/about/hero.jpg',  
  imageAlt = 'Team member at work',
  bgImage = '/images/headers/header.png', 
  accent = '#ff8a00', 
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0b2a4a',
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
        backgroundSize: 'cover',
      }}
      aria-label={title}
    >
      

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.05)] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-12">
        
        <div className="space-y-3">
          <span
            className="inline-block rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white"
            style={{ backgroundColor: accent }}
          >
            {kicker}
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {title}
          </h1>

          
          <nav aria-label="Breadcrumb" className="pt-1">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1
                return (
                  <li key={i} className="flex items-center gap-2">
                    {c.href && !isLast ? (
                      <Link href={c.href} className="font-semibold text-white hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={`font-semibold ${isLast ? 'text-white/80' : 'text-white'}`}>
                        {c.label}
                      </span>
                    )}
                    {!isLast && <span className="text-white/70">›</span>}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>

        
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="rounded-xl overflow-hidden ring-1 ring-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1120}
              height={700}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
