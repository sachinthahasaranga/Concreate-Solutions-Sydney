'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function StandardsList({
  kicker = 'BUILT TO STANDARD',
  title = ['Solutions That Last,', 'Engineered for Australia.'],
  blurb = `From steep blocks to tight access, our Sydney work is planned and built to code with
  clean finishes and predictable delivery.`,
  items = [
    'New Build & Extension Brickwork',
    'Mini Excavation & Earthmoving',
    'Structural Retaining Wall Systems',
    'Brickwork & Concrete Repair',
    'Concrete Driveways & Paths',
    'Boundary Walls & Fencing',
    'Patio / Paving Solutions',
    'Drainage & Erosion Control',
    'Decorative / Exposed Concrete',
    'Shed & Foundation Slabs',
  ],
  accent = '#ff8a00',  
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-64 w-[90%] rounded-[48px] bg-amber-300/20 blur-3xl"
      />

      
      <div className="relative z-10 text-center" data-aos="fade-down">
        <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-wide text-[#0b2a4a]">
          {kicker}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#0b2a4a] md:text-4xl">
          {title.map((t, i) => (
            <span key={i} className="block">{t}</span>
          ))}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-7 text-gray-600">
          {blurb}
        </p>
      </div>

      
      <div
        className="relative z-10 mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
        data-aos="fade-up"
      >
        {items.map((label, i) => (
          <div
            key={i}
            className="group relative flex items-center gap-3 rounded-2xl border border-black/10 bg-white/90 p-4 pr-5 shadow-sm
                       transition hover:shadow-md"
          >
            
            <span
              aria-hidden
              className="h-10 w-1.5 shrink-0 rounded-full"
              style={{ background: `linear-gradient(180deg, ${accent}, #ffd39a)` }}
            />
            
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0b2a4a] text-white shadow-sm">
              
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            
            <span className="text-[15px] font-semibold text-[#0b2a4a]">{label}</span>

            
            <span className="ml-auto opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 text-[#0b2a4a]/70">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
