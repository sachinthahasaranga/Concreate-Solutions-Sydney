'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AboutSkills({
  kicker = 'WHO WE ARE',
  title = 'Concreate Solutions: The New Face of Trusted Masonry & Concrete',
  paragraphs = [
    `For over 12 years, we’ve helped Sydney homeowners and builders deliver durable,
     tidy brickwork and concrete outcomes on schedule and within scope. From
     retaining walls and blockwork to architectural finishes, our crews prioritise
     structural integrity and safe, organised sites.`,
    `As we evolve, our focus remains the same: modern methods, transparent comms,
     and predictable delivery. With the same experienced team and strong values,
     we’re committed to raising the standard for brick and concrete work across
     Sydney so your projects stay straightforward from pour to handover.`,
  ],
  imageSrc = '/images/about/site-work.png',
  imageAlt = 'Concreate Solutions team preparing reinforcement and formwork',
  skills = [
    { label: 'Structural Planning & Set-out', value: 95 },
    { label: 'Project Scheduling & Handover', value: 90 },
    { label: 'Quality Control & Finishes', value: 88 },
  ],
  barColor = '#ff8a00',
  trackColor = '#e5e7eb',
}) {
  useEffect(() => {
    AOS.init({
      duration: 700, 
      once: true,         
      easing: 'ease-out-cubic',
      offset: 80,        
    })
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <div className="relative" data-aos="fade-right">
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1000}
              height={1250}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

        <div data-aos="fade-left">
          <div className="mb-3 inline-flex items-center gap-3" data-aos="fade-down" data-aos-delay="50">
            <span className="h-[2px] w-10 bg-[#ff8a00]" aria-hidden />
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold tracking-wide text-[#0b2a4a]">
              {kicker}
            </span>
          </div>

          <h2
            className="text-4xl font-extrabold leading-tight text-[#0b2a4a] md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {title}
          </h2>

          <div className="mt-5 space-y-4 text-[15px] leading-7 text-gray-600">
            {paragraphs.map((p, i) => (
              <p key={i} data-aos="fade-up" data-aos-delay={150 + i * 100}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {skills.map((s, i) => {
              const pct = Math.max(0, Math.min(100, Number(s.value) || 0))
              const delay = 200 + i * 120
              return (
                <div key={i} data-aos="fade-up" data-aos-delay={delay}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#0b2a4a]">
                      {s.label}
                    </span>
                    <span className="text-sm font-bold text-[#ff8a00]">
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: trackColor }}
                    role="progressbar"
                    aria-label={s.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                  >
                    <div
                      className="h-2 rounded-full transition-[width] duration-700"
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
