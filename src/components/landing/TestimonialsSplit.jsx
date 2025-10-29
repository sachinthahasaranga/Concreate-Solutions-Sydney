'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AnimatePresence, motion } from 'framer-motion'
import testimonials from '@/data/testimonials.json'

const toWa = (raw) => 'https://wa.me/' + raw.replace(/^0/, '94').replace(/\D/g, '')

export default function TestimonialsSplit({
  kicker = 'TESTIMONIALS',
  title = 'What Client Says, About Us',
  videoSrc = '/videos/testimonials.mp4',
  poster = '/images/testimonials/poster.jpg',
}) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1) 

  const N = testimonials.length
  const go = (nextIndex, d) => { setDir(d); setIdx(nextIndex) }
  const prev = () => go((idx - 1 + N) % N, -1)
  const next = () => go((idx + 1) % N, +1)

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 })
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const t = testimonials[idx]

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -24 : 24, transition: { duration: 0.25, ease: 'easeIn' } }),
  }

  return (
    <section className="relative w-full">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden ring-1 ring-black/5">
        <div className="relative aspect-[16/10] md:aspect-auto md:h-[540px] lg:h-[640px]" data-aos="fade-up-right">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>

        <div className="relative bg-[#0b2a4a] text-white px-5 py-8 md:px-10 md:py-12">
          <div className="mb-4 flex items-center justify-center gap-3" data-aos="fade-up" data-aos-delay="50">
            <span className="h-0.5 w-14 rounded bg-[#f5911a]" />
            <span className="text-xs font-semibold tracking-[0.22em] text-white/80">{kicker}</span>
            <span className="h-0.5 w-14 rounded bg-[#f5911a]" />
          </div>

          <h2
            className="mx-auto max-w-[680px] text-center text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {title}
          </h2>

          <div className="mx-auto mt-8 max-w-[760px] text-center">
            <div className="mb-4 text-4xl leading-none">“</div>
            <div className="relative min-h-[140px]">
              <AnimatePresence custom={dir} mode="wait">
                <motion.p
                  key={idx}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-[18px] leading-[1.9] text-white/90"
                >
                  {t.quote}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-2 text-4xl leading-none">”</div>
          </div>

          <div className="mx-auto mt-6 flex max-w-[520px] items-center justify-center gap-4">
            <button
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/20"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`person-${idx}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-center justify-center gap-4"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/10">
                  <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/70">{t.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/20"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: N }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? +1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
