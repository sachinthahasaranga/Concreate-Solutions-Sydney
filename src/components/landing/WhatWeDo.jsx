'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'

const waUrlFor = (raw, text = "Hi Concreate Solutions — I'd like a quote.") =>
  `https://wa.me/${raw.replace(/^0/, '94').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

export default function WhatWeDo({
  headingKicker = 'WHAT WE DO',
  heading = ['Start Your Journey With', 'Our Experts.'],
  paragraph =   `With over a decade of experience, Concrete Solutions delivers high-quality, affordable concrete and masonry 
                work for homes and businesses across Sydney on time, safely, and to spec.`,
  bullets = [
    'Tailored solutions for unique client needs',
    'Expertise in residential & commercial projects',
    'On-time delivery and unmatched quality',
  ],
  ctaLabel = 'Get A Quote',
  ctaHref = '/contact',
  imageSrc = '/images/whatwedo-main.png',
  whatsapp = '0712758785',
  callLabel = 'Call Us',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 120 })
  }, [])

  const waUrl = waUrlFor(whatsapp)
  const telUrl = 'tel:+94712758785'

  return (
    <section className="whatwedo-section relative bg-[#0b1220] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">

        <div className="relative" data-aos="fade-up-right">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
            <Image
              src={imageSrc}
              alt="Concreate Solutions crew on site"
              width={900}
              height={1100}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-10 left-10">
            <div className="relative overflow-hidden rounded-2xl bg-[#f5911a] text-white shadow-2xl">

              <span className="absolute -left-4 -top-4 h-12 w-12 rotate-45 bg-[#f5911a]" />
              <div className="relative z-10 p-6 md:p-7">
                <p className="max-w-[22ch] text-lg font-semibold leading-snug">
                  We Provide Exceptional Service for Every Project
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0b1220] hover:bg-white"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp us"
                >
                  +
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#f5911a]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-white/70">{headingKicker}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {heading.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h2>

          <p className="mt-5 max-w-prose text-white/80">
            {paragraph}
          </p>

          <ul className="mt-6 space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-white/90">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30">
                  <span className="block h-2 w-2 rounded-full bg-[#f5911a]" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#0b1220] shadow-sm hover:translate-x-0.5"
            >
              {ctaLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b1220] shadow-lg hover:shadow-xl"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.52 3.48A11.91 11.91 0 0 0 12.03 0 11.93 11.93 0 0 0 0 12c0 2.1.56 4.12 1.64 5.9L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24h.03c6.61 0 11.97-5.36 11.97-12 0-3.2-1.25-6.21-3.48-8.52Z" />
          </svg>
          WhatsApp Us
        </a>
        <a
          href={telUrl}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b1220] shadow-lg hover:shadow-xl"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.4 21 3 12.6 3 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" />
          </svg>
          {callLabel}
        </a>
      </div>
    </section>
  )
}
