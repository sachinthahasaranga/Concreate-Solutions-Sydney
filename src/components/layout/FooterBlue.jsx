'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms & Conditions', href: '/legal/terms' },
]

const SERVICE_LINKS = [
  { label: 'Bricklaying', href: '/services/' },
  { label: 'Retaining Walls', href: '/services/' },
  { label: 'Concrete Driveways', href: '/services/' },
  { label: 'Decorative Concrete', href: '/services/' },
  { label: 'Paving', href: '/services/paving' },
  { label: 'Excavation', href: '/services/' },
]

const toWa = (raw) => 'https://wa.me/' + (raw || '').replace(/^0/, '94').replace(/\D/g, '')

export default function FooterBlue(props) {
  const {
    phone = '071 275 8785',
    email = 'info@rrrbrick.com',
    address = 'Sydney, NSW, Australia',
    brandName = 'Concreate Solutions',
    year = new Date().getFullYear(),
    whatsapp = '0712758785',
    logoSrc = '/images/concreet_logo.png',
  } = props || {}

  const [newsletterEmail, setNewsletterEmail] = useState('')

  const telHref = useMemo(() => `tel:${phone.replace(/\s+/g, '')}`, [phone])
  const mailHref = useMemo(() => `mailto:${email}`, [email])
  const waHref = useMemo(
    () => `${toWa(whatsapp)}?text=${encodeURIComponent("Hi, I'd like a quote.")}`,
    [whatsapp]
  )

  const onNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!newsletterEmail) {
      Swal.fire({
        icon: 'info',
        title: 'Newsletter',
        text: 'Please enter your e-mail address.',
        confirmButtonColor: '#0b2a4a',
      })
      return
    }
    Swal.fire({
      icon: 'warning',
      title: 'Coming soon',
      text: 'This feature is currently not available. We’ll enable EmailJS integration next.',
      confirmButtonColor: '#0b2a4a',
    })
    setNewsletterEmail('')
  }

  return (
    <footer className="bg-[#0b172a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="m-2 opacity-90" fill="currentColor">
              <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
            </svg>
          </div>
          <div>
            <div className="text-xs uppercase opacity-70">Call us</div>
            <a href={telHref} className="font-semibold hover:underline">
              {phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="m-2 opacity-90" fill="currentColor">
              <path d="M20 4H4a2 2 0 00-2 2v.4l10 6 10-6V6a2 2 0 00-2-2zm0 4.75l-8.6 5.16a1 1 0 01-1 0L4 8.75V18a2 2 0 002 2h12a2 2 0 002-2V8.75z" />
            </svg>
          </div>
          <div>
            <div className="text-xs uppercase opacity-70">Send e-mail</div>
            <a href={mailHref} className="font-semibold hover:underline">
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={logoSrc}
                alt={`${brandName} logo`}
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/80">
              Expert Bricklaying & Masonry solutions tailored to your needs—accuracy, compliance,
              and financial peace of mind.
            </p>
            <div className="mt-6 inline-flex items-end">
              <span className="text-4xl font-extrabold tracking-tight">12+</span>
              <span className="ml-2 text-sm text-white/80">Years of Experience</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {[
                { href: 'https://facebook.com', label: 'Facebook', icon: FbIcon },
                { href: 'https://twitter.com', label: 'X/Twitter', icon: XIcon },
                { href: 'https://instagram.com', label: 'Instagram', icon: IgIcon },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/10 hover:bg-white/15"
                  target="_blank"
                  rel="noreferrer"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">About</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-white" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link className="hover:text-white" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-white/80">
              Want to receive news and updates? Enter your email.
            </p>
            <form onSubmit={onNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your e-mail"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
                  ✉️
                </span>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/15"
              >
                Submit <span>→</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center">
          <p>© {year} {brandName}. All rights reserved.</p>
          <p className="opacity-80">
            Designed & Built by <a className="underline hover:text-white" href="#" target="_blank">Sachintha Hasaranga</a>
          </p>
        </div>
      </div>

    </footer>
  )
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" />
    </svg>
  )
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18 3h3l-7.5 8.6L22 21h-6l-4.2-5L7 21H4l7.9-9.1L2 3h6l3.8 4.7L18 3z" />
    </svg>
  )
}
function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm11 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6z" />
    </svg>
  )
}
