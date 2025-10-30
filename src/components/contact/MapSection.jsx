'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MapSection({
  lat = -33.8688,
  lng = 151.2093,
  zoom = 13,
  height = 'h-[420px]',
  title = 'Concreate Solutions Sydney',
  address = 'Sydney CBD, NSW 2000',
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`

  return (
    <section className="mx-auto ">
      <div className={`relative overflow-hidden  ring-1 ring-black/5 shadow-sm ${height}`} data-aos="fade-up">
        <iframe
          title="Google Map - Sydney"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />

        <div className="pointer-events-none absolute left-4 top-4">
          <div className="pointer-events-auto rounded-xl border border-white/20 bg-white/90 px-4 py-3 backdrop-blur-md shadow">
            <h3 className="text-sm font-extrabold text-[#0b2a4a]">{title}</h3>
            <p className="mt-1 text-xs text-gray-600">{address}</p>
            <div className="mt-2 flex gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#0b2a4a] px-3 py-1 text-xs font-semibold text-white"
              >
                Open in Google Maps
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#0b2a4a]/20 bg-white px-3 py-1 text-xs font-semibold text-[#0b2a4a]"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
