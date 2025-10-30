'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

const IconWrap = ({ children }) => (
  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#0b2a4a] text-white shadow-md shadow-[#0b2a4a]/25">
    {children}
  </span>
)

export default function ContactIntro({
  kicker = "LET'S GET STARTED",
  title = 'Contact Concreate Solutions: Start Your Project Today',
  blurb = `We are Sydney’s trusted professional bricklayers and hardscaping specialists. Whether you're planning a new build, need a quote for a retaining wall, or require urgent brickwork repair, our team is ready to help.`,
  imageSrc = '/images/contact/handshake.png',
  imageAlt = 'Two site supervisors greeting on location',

  phoneMain = '042 955 0837',
  phoneSupport = '042 955 0837',
  email = 'info@concreatesolutions.com.au',

  hours = {
    monfri: 'Monday to Friday: 9:00 AM – 6:00 PM',
    sat: 'Saturday: 10:00 AM – 2:00 PM',
    sun: 'Sunday: Closed',
  },
}) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 80 })
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3" data-aos="fade-up">
        <div className="md:col-span-2">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-wide text-[#0b2a4a]">
            {kicker}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#0b2a4a] md:text-5xl">
            {title}
          </h1>
        </div>
        <p className="text-[15px] leading-7 text-gray-600">{blurb}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <figure className="overflow-hidden rounded-2xl ring-1 ring-black/5" data-aos="fade-right">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1400}
            height={1000}
            className="h-auto w-full object-cover"
            priority
          />
        </figure>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-left">
          <article className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <IconWrap>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6.6 10.8c1.2 2.3 3.3 4.3 5.6 5.6l2-2a1 1 0 011.1-.22c1.2.48 2.5.75 3.9.75a1 1 0 011 1V19a1 1 0 01-1 1C11.7 20 4 12.3 4 3a1 1 0 011-1h3.07a1 1 0 011 1c0 1.37.27 2.7.75 3.9a1 1 0 01-.22 1.1l-2 2z" fill="currentColor"/>
              </svg>
            </IconWrap>
            <div>
              <h3 className="text-lg font-extrabold text-[#0b2a4a]">Phone</h3>
              <p className="mt-1 text-[15px] leading-7 text-gray-600">
                Main Office:{' '}
                <a href={`tel:${phoneMain.replace(/\s+/g, '')}`} className="font-semibold text-[#0b2a4a] underline">
                  {phoneMain}
                </a>
                <br />
                Client Support:{' '}
                <a href={`tel:${phoneSupport.replace(/\s+/g, '')}`} className="font-semibold text-[#0b2a4a] underline">
                  {phoneSupport}
                </a>
              </p>
            </div>
          </article>

          <article className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <IconWrap>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 5a7 7 0 100 14h1.5a3.5 3.5 0 000-7h-.75a.75.75 0 000 1.5H13a2 2 0 110 4H12a5.5 5.5 0 110-11 5.5 5.5 0 015.5 5.5v2.25a.75.75 0 001.5 0V12A7 7 0 0012 5z" fill="currentColor"/>
              </svg>
            </IconWrap>
            <div>
              <h3 className="text-lg font-extrabold text-[#0b2a4a]">E-mail</h3>
              <p className="mt-1 text-[15px] leading-7 text-gray-600">
                General Inquiries:{' '}
                <a href={`mailto:${email}`} className="font-semibold text-[#0b2a4a] underline">
                  {email}
                </a>
              </p>
            </div>
          </article>

          <article className="lg:col-span-2 flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <IconWrap>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 22a10 10 0 110-20 10 10 0 010 20zm.75-10.94V7a.75.75 0 10-1.5 0v4.56c0 .3.18.57.46.69l3.5 1.5a.75.75 0 10.58-1.38l-3.04-1.37z" fill="currentColor"/>
              </svg>
            </IconWrap>
            <div>
              <h3 className="text-lg font-extrabold text-[#0b2a4a]">Business Hours</h3>
              <ul className="mt-1 space-y-1 text-[15px] leading-7 text-gray-600">
                <li>{hours.monfri}</li>
                <li>{hours.sat}</li>
                <li>{hours.sun}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      
    </section>
  )
}
