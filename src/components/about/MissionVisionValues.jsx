'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MissionVisionValues({
  items = [
    {
      icon: '/brand/icons/mission.png',
      title: 'Our Mission',
      text:
        'To provide high-quality, affordable masonry and concrete solutions that exceed expectations, reflecting our dedication to craftsmanship and value.',
    },
    {
      icon: '/brand/icons/vision.png',
      title: 'Our Vision',
      text:
        'To become Sydney’s most trusted partner for brickwork and concrete—setting new benchmarks for quality, transparency, and predictable delivery.',
    },
    {
      icon: '/brand/icons/values.png',
      title: 'Our Values',
      text:
        'We honour our experience while embracing innovation. We stand for safety, tidy sites, clear communication, and competitive pricing.',
    },
  ],
  accent = '#ff8a00',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <article
            key={i}
            className="rounded-[14px] border border-black/10 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
            data-aos="fade-up"
            data-aos-delay={i * 120}
          >
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-orange-50">
              <Image
                src={it.icon}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                style={{ filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' }}
                priority={i === 0}
              />
            </div>

            <h3 className="text-lg font-extrabold text-[#0b2a4a]">{it.title}</h3>

            <p className="mx-auto mt-3 max-w-[36ch] text-[15px] leading-7 text-gray-600">
              {it.text}
            </p>

            <span
              aria-hidden
              className="mt-6 inline-block h-[2px] w-12"
              style={{ backgroundColor: accent }}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
