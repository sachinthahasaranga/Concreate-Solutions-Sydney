'use client'
import { useState } from 'react'
import Swal from 'sweetalert2'
import services from '@/data/contactservices.json'

const input =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] outline-none placeholder:text-gray-400 focus:border-[#0b2a4a]'

export default function HomeQuoteSection({
  phone = '0429 550 837',
  email = 'info@concreatesolutions.com.au',
}) {
  const [loading, setLoading] = useState(false)
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    service: '',
    details: '',
  })
  const onChange = (e) => setF((s) => ({ ...s, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!f.name.trim()) return 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return 'Please enter a valid email.'
    if (!/^[0-9+()\-\s]{7,}$/.test(f.phone)) return 'Please enter a valid phone number.'
    if (!f.suburb.trim()) return 'Please enter your project location/suburb.'
    if (!f.service) return 'Please choose a primary service.'
    if (f.details.trim().length < 12) return 'Please add a few more details about your project.'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      Swal.fire({ icon: 'warning', title: 'Check your form', text: err })
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setLoading(false)
    Swal.fire({
      icon: 'info',
      title: 'Almost ready!',
      text: 'This feature is currently not available.',
      confirmButtonColor: '#0b2a4a',
    })
  }

  return (
    <section className="bg-[#fbfbfc]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        
        <div className="space-y-6 pr-0 md:pr-6" data-aos="fade-right">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#ffe9cc] px-4 py-2 text-xs font-semibold text-[#0b2a4a]">
            FREE QUOTE
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-[#0b2a4a] md:text-6xl">
            Get Started Today:
            <br /> Your Project Begins
            <br /> Here
          </h2>

          <p className="max-w-prose text-[17px] leading-8 text-gray-600">
            Need a professional <strong>bricklayer</strong> or{' '}
            <strong>hardscaping</strong> crew in Sydney? Tell us about your
            project our team replies quickly with clear, no-obligation quotes for
            residential and commercial work.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0b2a4a] ring-1 ring-black/10 shadow-sm">
              QUICK REPLY
            </span>
            <span className="text-[#0b2a4a]/80">
              Usually within <strong>24 hours on working days.</strong>
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0b2a4a] text-white">📞</div>
              <div>
                <div className="text-xs font-semibold text-[#0b2a4a]/80">CALL US</div>
                <div className="text-lg font-extrabold text-[#0b2a4a]">{phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0b2a4a] text-white">@</div>
              <div>
                <div className="text-xs font-semibold text-[#0b2a4a]/80">SEND E-MAIL</div>
                <div className="text-lg font-extrabold text-[#0b2a4a]">{email}</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            *By submitting, you consent to our Privacy Notice.
          </p>
        </div>

        
        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,.12)] ring-1 ring-black/5" data-aos="fade-up">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">YOUR NAME *</label>
              <input name="name" value={f.name} onChange={onChange} placeholder="Enter your name" className={input} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">EMAIL ADDRESS *</label>
              <input name="email" type="email" value={f.email} onChange={onChange} placeholder="Enter your e-mail address" className={input} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">PHONE NUMBER *</label>
              <input name="phone" value={f.phone} onChange={onChange} placeholder="Enter your phone number" className={input} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">PROJECT LOCATION*</label>
              <input name="suburb" value={f.suburb} onChange={onChange} placeholder="Enter your project location" className={input} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">PRIMARY SERVICE NEEDED *</label>
              <select name="service" value={f.service} onChange={onChange} className={`${input} bg-white`}>
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:block" />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#0b2a4a]">PROJECT DETAILS *</label>
              <textarea
                name="details"
                value={f.details}
                onChange={onChange}
                rows={6}
                placeholder='Please describe your requirement.'
                className={input}
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-start">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-3 rounded-2xl bg-[#0b2a4a] px-6 py-3 text-white shadow-sm hover:bg-[#0a2540] disabled:opacity-60"
              >
                {loading ? 'Submitting…' : 'Submit'} <span aria-hidden>➜</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
