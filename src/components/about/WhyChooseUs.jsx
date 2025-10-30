'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function WhyChooseUs({
  heading = 'Why Choose Us?',
  items = [
    {
      icon: '/brand/icons/staff.png',
      title: 'Expert Bricklaying Team',
      text:
        'Our team consists of fully licensed, insured, and experienced professional bricklayers and mason bricklayers. We pride ourselves on attention to detail, ensuring every project meets the highest Australian standards for safety and finish',
    },
    {
      icon: '/brand/icons/price.png',
      title: 'Quality, Affordable Prices',
      text:
        'We guarantee quality work for affordable prices. By managing our operations efficiently as dedicated bricklaying contractors, we cut down overheads and pass the savings directly to you. No hidden fees, just competitive, honest quotes',
    },
    {
      icon: '/brand/icons/staff.png',
      title: 'Friendly & Trustworthy Staff',
      text:
        'You are dealing with friendly and trustworthy staff from the first call to final cleanup. We are the local bricklayers near me who treat your property with respect, communicate clearly, and ensure a hassle-free building experience.',
    },
    {
      icon: '/brand/icons/location.png',
      title: 'Local Sydney Expertise',
      text:
        'Based in Seven Hills NSW, we have intimate knowledge of local building regulations across the 30km radius of Greater Sydney. We are your reliable brick layer near me, committed to prompt and reliable service delivery.',
    },
  ],
  cardClassName = '',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 ">
      <h2
        className="mb-8 text-center text-3xl font-extrabold text-[#0b2a4a] md:mb-12 md:text-4xl"
        data-aos="fade-down"
      >
        {heading}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <article
            key={i}
            className={`rounded-2xl border border-black/10 bg-white p-7 shadow-sm ring-0 transition hover:shadow-md ${cardClassName}`}
            data-aos="fade-up"
            data-aos-delay={i * 120}
          >
            <div className="flex items-start gap-4">
              
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-50">
                <Image
                  src={it.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-6 object-contain"
                  priority={i < 2}
                />
              </span>

              
              <div>
                <h3 className="text-lg font-extrabold text-[#0b2a4a]">
                  {it.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-gray-600">
                  {it.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
