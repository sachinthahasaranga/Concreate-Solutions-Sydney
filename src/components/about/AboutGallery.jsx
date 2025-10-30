'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AboutGallery({
  images = [
    { src: '/images/about/g1.png', alt: 'Brickwork close-up' },
    { src: '/images/about/g2.png', alt: 'Site supervisor' },
    { src: '/images/about/g3.png', alt: 'Trowel finishing' },
    { src: '/images/about/g4.png', alt: 'Crew on site' },
    { src: '/images/about/g5.png', alt: 'Bricklayer portrait' },
    { src: '/images/about/g6.png', alt: 'Team reviewing plans' },
  ],
  rounded = 'rounded-2xl',
  gap = 'gap-6',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gap}`}>
        {images.map((img, i) => (
          <figure
            key={i}
            className={`overflow-hidden ${rounded} ring-1 ring-black/5 bg-white`}
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <Image
              src={img.src}
              alt={img.alt || ''}
              width={1200}
              height={900}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={i < 2}
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
