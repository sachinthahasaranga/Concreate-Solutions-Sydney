'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ServicesHero({
  kicker = 'WHAT WE DO',
  title = ['Your Complete Partner:', 'From Site Prep to', 'Signature Finishes.'],
  blurb =   `At Concreate Solutions, we go beyond basic brickwork. Our licensed bricklayers
            and hardscaping specialists deliver an integrated suite of services across Sydney 
            from blockwork and retaining walls to architectural concrete and driveways. Expect
            tidy sites, clear scopes, and on-time handovers.`,
  ctaLabel = 'Explore Services',
  ctaHref = '/services#list',
  phoneLabel = 'CALL US',
  phoneNumber = '071 275 8785',
  imgMain = '/images/services/s_1.png',
  imgInset = '/images/services/s_11.png',
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 top-10 mx-auto h-72 w-[90%] rounded-[48px]
                   bg-amber-300/25 blur-3xl md:top-0 md:h-80"
      />

      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <div className="relative -ml-4 max-w-[560px] overflow-hidden rounded-[22px] ring-1 ring-black/10">
            <Image
              src={imgMain}
              alt="Brickwork in progress"
              width={1400}
              height={1000}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-10 left-16 w-[78%] overflow-hidden rounded-[18px]">
            <Image
              src={imgInset}
              alt="Finishing concrete detail"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-wide text-[#0b2a4a]">
            {kicker}
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#0b2a4a] md:text-5xl">
            {title.map((t, i) => (
              <span key={i} className="block">{t}</span>
            ))}
          </h1>

          <p className="mt-5 max-w-prose text-[15px] leading-7 text-gray-600">{blurb}</p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#0b2a4a] px-6 py-3 text-sm font-semibold text-white
                         shadow-md shadow-[#0b2a4a]/25 transition hover:translate-y-[-1px]"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </Link>

            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="group inline-flex items-center gap-3 rounded-full border border-[#0b2a4a]/15 bg-white px-5 py-3
                         text-[#0b2a4a] shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2a4a] text-white shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8c1.2 2.3 3.3 4.3 5.6 5.6l2-2a1 1 0 011.1-.22c1.2.48 2.5.75 3.9.75a1 1 0 011 1V19a1 1 0 01-1 1C11.7 20 4 12.3 4 3a1 1 0 011-1h3.07a1 1 0 011 1c0 1.37.27 2.7.75 3.9a1 1 0 01-.22 1.1l-2 2z" fill="currentColor"/>
                </svg>
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold opacity-70">{phoneLabel}</span>
                <span className="block text-[17px] font-extrabold tracking-tight">{phoneNumber}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
