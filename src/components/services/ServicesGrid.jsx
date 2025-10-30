'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export default function ServicesGrid({ items = [], id = 'services-grid' }) {
  const [openId, setOpenId] = useState(null)
  const cardRefs = useRef({})

  useEffect(() => {
    if (!openId) return
    const el = cardRefs.current[openId]
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [openId])

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 z-0 mx-auto h-72 w-[92%] rounded-[48px] bg-amber-300/20 blur-3xl"
      />

      
      <div className="relative z-10 mb-8 text-center md:mb-12">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-wide text-[#0b2a4a]">
          OUR SERVICES
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#0b2a4a] md:text-4xl">
          Expert Construction & Hardscaping in Sydney
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-7 text-gray-600">
          We go beyond standard brickwork with an integrated suite of services—from site prep to the final finish.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const isOpen = openId === s.id
          return (
            <div
              key={s.id}
              ref={(el) => (cardRefs.current[s.id] = el)}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
            >
              
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/80 via-[#0b2a4a]/0 to-transparent" />
              </div>

              
              <div className="relative -mt-8 mx-4 rounded-xl bg-white p-4 shadow-md">
                <div className="mb-1 flex items-center gap-2">
                  {s.icon && (
                    <Image src={s.icon} alt="" width={18} height={18} className="opacity-80" />
                  )}
                  <h3 className="text-[17px] font-extrabold text-[#0b2a4a]">{s.title}</h3>
                  {s.badge && (
                    <span className="ml-auto rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-[#0b2a4a]">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="text-[14px] leading-6 text-gray-600">{s.desc}</p>

                
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.id}`}
                    className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#0b2a4a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px]"
                  >
                    {isOpen ? 'Hide Details' : 'More Details'}
                    <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                  </button>
                </div>
              </div>

              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`svc-${s.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="px-4 pb-4"
                  >
                    <div className="mt-4 rounded-xl border border-black/10 bg-white p-4">
                      {s.tagline && (
                        <p className="mb-3 text-sm font-extrabold tracking-wide text-[#0b2a4a]">
                          {s.tagline}
                        </p>
                      )}

                      {s.longDesc && (
                        <p className="text-[14px] leading-6 text-gray-700">{s.longDesc}</p>
                      )}

                      {!!(s.features && s.features.length) && (
                        <ul className="mt-3 grid list-disc gap-x-6 gap-y-1 pl-5 text-[14px] leading-6 text-gray-700 md:grid-cols-2">
                          {s.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      )}

                      {!!(s.gallery && s.gallery.length) && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {s.gallery.slice(0, 2).map((g, i) => (
                            <div key={i} className="overflow-hidden rounded-lg ring-1 ring-black/5">
                              <Image
                                src={g}
                                alt=""
                                width={800}
                                height={600}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <Link
                          href="/contact"
                          className="rounded-full bg-[#0b2a4a] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                          Get a Quote
                        </Link>
                        {s.cta?.href && (
                          <Link
                            href={s.cta.href}
                            className="rounded-full border border-[#0b2a4a]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0b2a4a]"
                          >
                            {s.cta.label || 'Learn More'}
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
