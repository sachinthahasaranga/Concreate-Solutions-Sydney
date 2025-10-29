'use client'
import { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import AOS from 'aos'

export default function PerformanceBanner({
  titleLines = ['Delivering Excellence Through', 'Expertise and Dedication'],
  highlightWords = ['Expertise', 'Dedication'], 
  statA = { value: '98%', labelBold: 'On-Time Completion', blurb: 'We use efficient project management to meet timelines for all your hardscaping and bricklaying needs.' },
  statB = { value: '650+', labelBold: 'Projects Completed', blurb: 'Proven experience in residential, commercial, and specialist projects across Sydney Metro.' },
  videoSrcMp4 = '/videos/hero.mp4',
  poster = '/images/team-thumbs.jpg',
  ctaLeftText = 'EXPLORE FURTHER:',
  ctaRightLabel = 'Get Your Free Quote Today',
  ctaRightHref = '/contact',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 })
    AOS.refresh()
  }, [])

  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const vRef = useRef(null)
  useEffect(() => {
    const el = vRef.current
    if (!el || reduceMotion) return
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  const renderTitle = () => {
    const [line1, line2] = titleLines
    const wrapHighlights = (text) =>
      text.split(' ').map((w, i) =>
        highlightWords.includes(w.replace(/[^\w]/g, ''))
          ? (
              <span
                key={i}
                className="bg-[#f5911a] px-2 -mx-0.5 box-decoration-clone text-white rounded-sm"
              >
                {w}
              </span>
            )
          : <span key={i} className="">{w} </span>
      )

    return (
      <h2 className="text-[#0b2a4a] text-4xl md:text-6xl font-extrabold leading-tight tracking-[-0.01em]">
        <span className="block" data-aos="fade-up">{wrapHighlights(line1)}</span>
        <span className="block mt-2" data-aos="fade-up" data-aos-delay="120">{wrapHighlights(line2)}</span>
      </h2>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="rounded-3xl bg-[#f7f6f4] ring-1 ring-black/5 p-6 md:p-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            {renderTitle()}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2" data-aos="fade-up" data-aos-delay="180">
                <div className="flex items-center gap-3">
                  <div className="text-[#0b2a4a] text-6xl md:text-7xl font-extrabold">{statA.value}</div>
                  <svg width="36" height="36" viewBox="0 0 24 24" className="text-[#f5911a]" fill="none">
                    <path d="M4 14l6-6 5 5 5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="italic text-2xl text-[#0b2a4a]" data-aos="fade" data-aos-delay="260">{statA.labelBold}</div>
                <p className="text-gray-600 leading-relaxed" data-aos="fade" data-aos-delay="320">{statA.blurb}</p>
              </div>

              <div className="space-y-2" data-aos="fade-up" data-aos-delay="240">
                <div className="flex items-center gap-3">
                  <div className="text-[#0b2a4a] text-6xl md:text-7xl font-extrabold">{statB.value}</div>
                  <svg width="36" height="36" viewBox="0 0 24 24" className="text-[#f5911a]" fill="none">
                    <path d="M4 14l6-6 5 5 5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="italic text-2xl text-[#0b2a4a]" data-aos="fade" data-aos-delay="320">{statB.labelBold}</div>
                <p className="text-gray-600 leading-relaxed" data-aos="fade" data-aos-delay="380">{statB.blurb}</p>
              </div>
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-2xl">
              {reduceMotion ? (
                <Image
                  src={poster}
                  alt="Concreate Solutions team"
                  width={1100}
                  height={800}
                  className="h-auto w-full object-cover"
                  priority
                />
              ) : (
                <video
                  ref={vRef}
                  className="block h-full w-full object-cover"
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  poster={poster}
                >
                  <source src={videoSrcMp4} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>

        <div
          className="mt-10 rounded-2xl bg-[#0b2a4a] text-white px-5 py-6 md:px-8 md:py-7 flex flex-col md:flex-row items-center justify-between gap-5"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          <div className="text-sm md:text-base tracking-wide opacity-90">
            {ctaLeftText}
          </div>

          <a
            href={ctaRightHref}
            className="inline-flex items-center gap-2 rounded-full bg-white text-[#0b2a4a] px-5 py-3 text-sm font-semibold shadow-sm hover:translate-x-0.5 transition"
          >
            {ctaRightLabel}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
