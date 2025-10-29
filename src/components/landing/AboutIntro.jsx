'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const waUrlFor = (raw, text = "Hi Concreate Solutions — I'd like a quote.") =>
  `https://wa.me/${raw.replace(/^0/, '94').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

export default function AboutIntro({
  kicker = 'WHO WE ARE',
  titleLines = ['Sydney Concrete', 'Contractors & Site', 'Preparation Experts'],
  paragraph = `We deliver precision concrete work across Greater Sydney — driveways, house slabs, footpaths and engineered retaining walls. 
Our crews handle excavation, formwork, steel fixing, pours and finishes with ISO-style safety and tidy handovers.`,
  stats = [
    { value: '650+', label: 'Projects completed' },
    { value: '12yr', label: 'Industry experience' },
    { value: '4.9★', label: 'Average rating' },
  ],
  learnHref = '/about',
  whatsapp = '0712758785',
  imgMain = '/images/about-main.png',  
  imgAccent = '/images/about-back.png', 
}) {
  const waUrl = waUrlFor(whatsapp)

  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -28])
  const yAccent = useTransform(scrollYProgress, [0, 1], [18, -50])

  return (
    <section ref={wrapRef} className="aboutintro-modern mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="aboutintro-copy"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-[11px] font-semibold tracking-wide text-[#0b2a4a]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {kicker}
          </div>

          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.1] text-[#0b2a4a]">
            {titleLines.map((t, i) => (
              <span key={i} className="block">{t}</span>
            ))}
          </h2>

          <p className="mt-5 max-w-prose text-[17px] leading-[1.85] text-gray-600 whitespace-pre-line">
            {paragraph}
          </p>

          
          <div className="mt-8 grid w-full grid-cols-3 gap-4 max-w-lg">
            {stats.map((s, i) => (
              <div key={i} className="stat-card rounded-2xl border border-black/5 bg-white/70 p-4 text-[#0b2a4a] backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-extrabold">{s.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={learnHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#0b2a4a] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#091c34]"
            >
              Learn More
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h12M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[#0b2a4a]/20 bg-white px-5 py-3 text-sm font-semibold text-[#0b2a4a] hover:bg-[#0b2a4a]/5"
              aria-label="Chat on WhatsApp"
            >
              
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.52 3.48A11.91 11.91 0 0 0 12.03 0 11.93 11.93 0 0 0 0 12c0 2.1.56 4.12 1.64 5.9L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24h.03c6.61 0 11.97-5.36 11.97-12 0-3.2-1.25-6.21-3.48-8.52ZM12.03 22c-1.8 0-3.55-.48-5.08-1.38l-.36-.21-3.72.97.99-3.62-.24-.37A9.92 9.92 0 0 1 2.03 12C2.03 6.5 6.53 2 12.03 2 17.5 2 22 6.5 22 12c0 5.5-4.5 10-9.97 10Zm5.77-7.5c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.16-.2.31-.8 1-.98 1.2-.18.2-.36.22-.67.08-1.82-.91-3-1.62-4.2-3.67-.32-.55.32-.51.92-1.7.1-.2.05-.36-.02-.52-.08-.16-.7-1.69-.96-2.32-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.52.08-.8.36-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.82-.74 2.08-1.46.26-.73.26-1.36.18-1.5-.08-.15-.28-.23-.59-.38Z" />
              </svg>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-[11px] uppercase tracking-wide opacity-70">Call / WhatsApp</span>
                <span className="text-[15px] font-semibold">{whatsapp}</span>
              </div>
            </a>
          </div>
        </motion.div>

        
        <div className="aboutintro-media relative">
          
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-2xl" />
          <div className="pointer-events-none absolute -right-6 bottom-8 h-24 w-24 rounded-full bg-blue-300/20 blur-xl" />

          
          <motion.div
            style={{ y: yAccent }}
            className="absolute right-0 top-0 hidden w-[78%] md:block"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/10">
              <Image
                src={imgAccent}
                alt="Concrete crew on site"
                width={980}
                height={740}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </motion.div>

          
          <motion.div style={{ y: yMain }} className="relative z-10 mx-auto w-full max-w-[560px] md:ml-6">
            <div className="">
              <Image
                src={imgMain}
                alt="Precision concrete placement"
                width={980}
                height={740}
                className="h-auto w-full object-cover"
              />
            </div>

            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
              className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-[#0b2a4a] shadow-xl ring-1 ring-black/5"
            >
              ✅ Engineered finishes • Clean, safe sites
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
