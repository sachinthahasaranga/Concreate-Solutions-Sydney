'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const containerReveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.5, ease: 'easeOut' },
  },
}
const itemReveal = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ValueProps({
  items = [
    {
      icon: '/brand/services/service_lg1.png',
      title: 'Reliable Local Crews',
      copy: 'Our Sydney-based bricklayers and concreters mobilise fast across the metro area and turn up on time every time.',
    },
    {
      icon: '/brand/services/service_lg2.png',
      title: 'Start-to-Finish Delivery',
      copy: 'From site prep and formwork to pour, set and finish, one accountable team handles the full scope with tidy handover.',
    },
    {
      icon: '/brand/services/service_lg3.png',
      title: 'Transparent Pricing & Planning',
      copy: 'Clear scopes, fixed quotes where possible, and progress updates you can rely on no surprises on your invoice.',
    },
  ],
}) {
  return (
    <section className="valueprops-section mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-14">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6 text-center text-2xl font-extrabold tracking-tight text-[#0b2a4a]"
      >
        Why Choose Concreate Solutions
      </motion.h2>

      <motion.div
        variants={containerReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {items.map((it, i) => (
          <motion.article
            key={i}
            variants={itemReveal}
            whileHover={{ y: -4 }}
            className="valueprop-card group relative overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-5 backdrop-blur-sm
                       shadow-sm transition will-change-transform hover:shadow-lg"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.9, opacity: 0.08 }}
              whileInView={{ scale: 1, opacity: 0.14 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-3xl bg-amber-200/60 blur-xl"
            />

            <div className="flex items-start gap-4">
              <motion.span
                className="valueprop-icon relative grid h-14 w-14 place-items-center rounded-2xl bg-amber-100/80 ring-1 ring-amber-200/60"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image
                  src={it.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                  priority={i === 0}
                />
              </motion.span>

              <div className="valueprop-copy">
                <h3 className="text-lg font-extrabold leading-snug text-[#0b2a4a] group-hover:text-[#0a2540]">
                  {it.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{it.copy}</p>
              </div>
            </div>

            <motion.div
              layoutId={`sweep-${i}`}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-0 group-hover:opacity-100"
              transition={{ type: 'spring', stiffness: 250, damping: 24 }}
            />
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
