'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import data from '@/data/services.json'

export default function ServicesShowcase({
  kicker = 'OUR CORE SERVICES',
  heading = 'Expert Construction & Hardscaping in Sydney',
  subtext = 'We deliver integrated hardscaping and construction services—from site prep to the final finish.',
}) {
  const [hovered, setHovered] = useState(null)               
  const scroller = useRef(null)                

  const nudge = (dir = 1) => {
    const el = scroller.current
    if (!el) return
    const step = Math.min(el.clientWidth * 0.9, 900)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nudge(+1)
      if (e.key === 'ArrowLeft') nudge(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="services-band relative overflow-hidden py-16 md:py-24">
      <Image
        src="/images/services/service-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-70"
      />

      
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="">
          <div className="mb-6 text-black">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-0.5 w-8 rounded bg-[#f5911a]" />
              <span className="text-xs font-semibold tracking-[0.22em] text-black/80">{kicker}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">{heading}</h2>
            <p className="mt-3 max-w-3xl text-black/80">{subtext}</p>
          </div>
          <div
            ref={scroller}
            className="group grid grid-flow-col auto-cols-[85%] gap-6 overflow-x-auto pb-2 md:auto-cols-fr md:grid-cols-5 md:overflow-visible"
          >
            {data.map((item, idx) => {
              const isDim = hovered !== null && hovered !== idx
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className={[
                    'relative isolate flex flex-col overflow-hidden rounded-2xl bg-[#102c54] text-white',
                    'ring-1 ring-white/10 transition transform-gpu will-change-transform',
                    isDim ? 'opacity-60' : 'opacity-100',
                    !isDim && 'hover:-translate-y-1 hover:shadow-2xl hover:ring-amber-300/60',
                  ].join(' ')}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 20vw, 85vw"
                      className="object-cover transition contrast-90 brightness-90"
                    />
                    <span
                      className={[
                        'absolute inset-0 bg-black/40 transition',
                        !isDim && 'group-hover:bg-black/0',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative z-10 space-y-2 p-5">
                    <h3 className="text-lg font-extrabold">{item.title}</h3>
                    <p className="text-[13.5px] leading-relaxed text-white/80">{item.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
          <div className="mt-6 flex gap-3 md:hidden">
            <button
              onClick={() => nudge(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={() => nudge(+1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-black/90">
            
            <p className="text-sm">
              We work around your build timeline. Crews ready to start when you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
