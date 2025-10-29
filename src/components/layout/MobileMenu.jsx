'use client'
import useLockBodyScroll from '@/hooks/useLockBodyScroll'

export default function MobileMenu({ open, onClose }) {
  useLockBodyScroll(open)
  return (
    <>
      
      <div
        className={`mobilemenu-backdrop fixed inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      <aside
        className={`mobilemenu-panel fixed top-0 right-0 h-full w-72 max-w-[85%] bg-gray-900 text-white shadow-xl
        transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobilemenu-header flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-base font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="mobilemenu-close inline-flex items-center justify-center rounded-md border border-white/15 px-2 py-1 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Close
          </button>
        </div>

        <nav className="mobilemenu-nav p-4">
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
                  className="mobilemenu-link block rounded-md px-3 py-2 text-sm font-medium
                             hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
