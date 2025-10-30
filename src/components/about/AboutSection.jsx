'use client'

import { useState } from 'react'

export default function AboutSection({
  kicker = 'WHO WE ARE',
  title = 'Your Trusted Project Partners in Masonry & Concrete',
  copy = `We’re a Sydney-based team of licensed bricklayers and concrete specialists.
        Our crews focus on safe, tidy sites and predictable delivery—so you get
        structurally sound masonry and clean finishes without the stress.`,
  items = [
    {
      id: 'mission',
      title: 'Our Mission',
      body:
        `To be the most reliable and highly-regarded bricklaying contractors in Sydney.
        We guarantee structural integrity and deliver efficient, end-to-end solutions
        with transparency from project start to finish.`,
    },
    {
      id: 'vision',
      title: 'Our Vision',
      body:
        `Raise the benchmark for modern masonry in Sydney combining craftsmanship,
        safety, and predictable delivery so builders and homeowners can plan with confidence.`,
    },
    {
      id: 'values',
      title: 'Our Core Values',
      body:
        `Safety first. Honest scopes. Tidy sites. Clear communication. On-time,
        on-budget delivery with accountability at every stage.`,
    },
  ],
  accent = '#0b2a4a',
}) {
  const [openId, setOpenId] = useState(items?.[0]?.id)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
        <div className="order-1 space-y-4 md:order-none">
          {items.map((it) => {
            const isOpen = openId === it.id
            return (
              <div
                key={it.id}
                className="rounded-2xl border border-black/5 bg-white shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : it.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${it.id}`}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[17px] font-extrabold text-[#0b2a4a]">
                    {it.title}
                  </span>
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border transition ${
                      isOpen
                        ? 'rotate-180 border-[#0b2a4a] text-[#0b2a4a]'
                        : 'border-gray-300 text-gray-500'
                    }`}
                    aria-hidden
                    title={isOpen ? 'Collapse' : 'Expand'}
                  >
                    ▾
                  </span>
                </button>

                <div
                  id={`panel-${it.id}`}
                  role="region"
                  className={`px-5 pb-5 pt-0 text-[15px] leading-relaxed text-gray-600 transition-[grid-template-rows,opacity] ${
                    isOpen ? 'opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  {it.body}
                </div>
              </div>
            )
          })}
        </div>

        <div className="order-0 md:order-none">
          <span
            className="inline-block rounded-full px-4 py-2 text-xs font-bold tracking-wide text-[#0b2a4a]/90"
            style={{ backgroundColor: '#f7e2c7' }}
          >
            {kicker}
          </span>

          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0b2a4a] md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-prose text-[15px] leading-7 text-gray-600">
            {copy}
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                label: 'Reliable Local Brickies',
                desc:
                  'Sydney-based teams that mobilise quickly and arrive on time—every time.',
                emoji: '🧱',
              },
              {
                label: 'Start-to-Finish Management',
                desc:
                  'One accountable crew from prep to final handover for clean, predictable delivery.',
                emoji: '🧰',
              },
              {
                label: 'Transparent Pricing',
                desc:
                  'Clear scopes with fixed quotes where possible and no surprises on your invoice.',
                emoji: '💬',
              },
            ].map((f, i) => (
              <li
                key={i}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-3xl" aria-hidden>{f.emoji}</div>
                <h3 className="text-[15px] font-extrabold text-[#0b2a4a]">
                  {f.label}
                </h3>
                <p className="mt-2 text-[13.5px] leading-6 text-gray-600">
                  {f.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
