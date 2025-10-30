'use client'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

export default function MobileMenu({ open, onClose }) {
  useLockBodyScroll(open)

  return (
    <>
      <div
        className={`fixed inset-0 z-[1000] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[85%] bg-gray-900 text-white shadow-xl
                      transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <span className="text-base font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md border border-white/15 px-2 py-1 text-sm
                         hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Close
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-md px-3 py-2 text-sm font-medium
                               hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  )
}
