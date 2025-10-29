'use client'
import { useEffect, useMemo, useRef } from 'react'
import MetricBadge from './MetricBadge'
import TrustBar from './TrustBar'
import BrandSeal from './BrandSeal'

export default function HeroSignature({
  kicker = 'Building that lasts',
  titleLines = ['Signature', 'Brick & Block', 'Craft in Sydney'],
  blurb = 'Structural, residential and specialty brickwork delivered by certified crews with zero compromise safety.',
  ctaPrimaryLabel = 'Get a Fast Quote',
  ctaPrimaryHref = '/contact',
  ctaSecondaryLabel = 'See Our Work',
  ctaSecondaryHref = '/blog',
  videoSrcMp4 = '/videos/hero.mp4',
  poster = '/images/hero-poster.jpg',
  bgImageUrl = '/images/hero-bg.png',
  theme = {
    bgFrom: '#0f172a', 
    bgTo: '#020617',   
    accent: '#fbbf24', 
    text: '#e5e7eb', 
  },
}) {
  const vRef = useRef(null)
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    const el = vRef.current
    if (!el || reduceMotion) return
    const i = new IntersectionObserver((entries) => {
      entries[0]?.isIntersecting ? el.play().catch(() => {}) : el.pause()
    }, { threshold: 0.25 })
    i.observe(el)
    return () => i.disconnect()
  }, [reduceMotion])

  return (
    <section
      className="herosig-wrapper relative overflow-clip"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="pointer-events-none absolute -left-20 top-[-30%] h-[160%] w-[60%] -skew-x-12 bg-white/5 blur-2xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-20">
        <div className="herosig-copy space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
            {kicker}
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {titleLines.map((l, i) => (
              <span key={i} className="block">{l}</span>
            ))}
          </h1>

          <p className="max-w-prose text-base leading-relaxed text-white/80 md:text-lg">{blurb}</p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={ctaPrimaryHref}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:translate-y-[-1px]"
            >
              {ctaPrimaryLabel}
            </a>
            <a
              href={ctaSecondaryHref}
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              {ctaSecondaryLabel}
            </a>
          </div>

          <div className="herosig-metrics mt-6 flex gap-3 md:hidden">
            <MetricBadge value="650+" label="Projects" />
            <MetricBadge value="4.9★" label="Avg. rating" />
          </div>
        </div>

        <div className="herosig-media relative">
          <div
            className="absolute inset-0 -z-10 rounded-full blur-2xl"
            style={{
              background: `conic-gradient(from 120deg at 50% 50%, ${theme.accent}, transparent 30%, ${theme.accent})`,
              maskImage: 'radial-gradient(closest-side, black 60%, transparent 62%)',
              WebkitMaskImage: 'radial-gradient(closest-side, black 60%, transparent 62%)',
            }}
          />
          <div className="relative mx-auto aspect-square w-[88%] max-w-[540px] overflow-hidden rounded-full ring-1 ring-white/15">
            {reduceMotion ? (
              <img src={poster} alt="Bricklaying in progress" className="h-full w-full object-cover" />
            ) : (
              <video
                ref={vRef}
                className="h-full w-full object-cover"
                muted
                playsInline
                loop
                preload="metadata"
                poster={poster}
              >
                <source src={videoSrcMp4} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="absolute -left-8 bottom-[-18px] hidden md:block">
              <BrandSeal />
          </div>

          <div className="absolute -bottom-15 -right-20 hidden gap-3 md:flex">
            <MetricBadge value="650+" label="Projects" />
            <MetricBadge value="12yr" label="Experience" />
          </div>

          <div
            className="absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-xl opacity-70"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
      </div>

    </section>
  )
}
