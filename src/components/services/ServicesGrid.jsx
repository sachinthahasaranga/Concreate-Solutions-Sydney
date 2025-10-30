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
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  }, [openId])

  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 z-0 mx-auto h-72 w-[92%] rounded-[48px] bg-amber-300/20 blur-3xl" />

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

      <div className="relative z-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const isOpen = openId === s.id
          return (
            <div
              key={s.id}
              ref={(el) => (cardRefs.current[s.id] = el)}
              className="group relative h-[520px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm" 
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/80 via-[#0b2a4a]/0 to-transparent" />
              </div>

              <div className="relative -mt-8 mx-4 flex h-[calc(520px-18rem)] flex-col rounded-xl bg-white p-4 shadow-md">
                <div className="mb-1 flex items-center gap-2">
                  {s.icon && <Image src={s.icon} alt="" width={18} height={18} className="opacity-80" />}
                  <h3 className="text-[17px] font-extrabold text-[#0b2a4a]">{s.title}</h3>
                  {s.badge && (
                    <span className="ml-auto rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-[#0b2a4a]">
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="line-clamp-3 text-[14px] leading-6 text-gray-600">{s.desc}</p>

                <div className="mt-auto flex items-center gap-3 pt-3">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="absolute inset-0 z-20"
                    aria-modal="true"
                    role="dialog"
                  >
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm ring-1 ring-black/10 rounded-2xl overflow-hidden">
                      <div className="flex h-full flex-col p-4">
                        <div className="flex items-start gap-3">
                          <h4 className="text-base font-extrabold text-[#0b2a4a]">{s.title}</h4>
                          <button
                            onClick={() => setOpenId(null)}
                            className="ml-auto rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            aria-label="Close"
                          >
                            Close
                          </button>
                        </div>

                        <div className="mt-3 grid flex-1 grid-cols-1 gap-3 overflow-auto pr-1 md:grid-cols-2">
                          {s.tagline && (
                            <p className="col-span-1 text-sm font-extrabold tracking-wide text-[#0b2a4a] md:col-span-2">
                              {s.tagline}
                            </p>
                          )}

                          {s.longDesc && <p className="text-[14px] leading-6 text-gray-700">{s.longDesc}</p>}

                          {!!(s.features?.length) && (
                            <ul className="list-disc pl-5 text-[14px] leading-6 text-gray-700">
                              {s.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                          )}

                          {!!(s.gallery?.length) && (
                            <div className="md:col-span-2 grid grid-cols-2 gap-2">
                              {s.gallery.slice(0, 2).map((g, i) => (
                                <div key={i} className="overflow-hidden rounded-lg ring-1 ring-black/5">
                                  <Image src={g} alt="" width={800} height={600} className="h-full w-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <Link href="/contact" className="rounded-full bg-[#0b2a4a] px-4 py-2 text-sm font-semibold text-white shadow-sm">
                            Get a Quote
                          </Link>
                          <button
                            onClick={() => setOpenId(null)}
                            className="rounded-full border border-[#0b2a4a]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0b2a4a]"
                            aria-label="Close"
                          >
                            Close
                          </button>
    
                        </div>
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
