'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import MobileMenu from './MobileMenu'

export default function SiteHeader() {
  const [isTop, setIsTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsTop(window.scrollY < 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClass =
    'header-container sticky top-0 z-50 transition-all duration-300 will-change-[background,backdrop-filter,border-color]'
  const headerTone = isTop
    ? 'bg-black text-white'
    : 'bg-gray-900/70 text-white backdrop-blur-md border-b border-white/10'

  const linkBase =
    'nav-link-primary relative px-3 py-2 text-sm font-medium transition-colors duration-150 ' +
    'hover:text-white focus:text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md'
  const linkMuted = 'text-white/80'

  return (
    <>
      <header className={`${headerClass} ${headerTone}`}>
        <div className="header-inner mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          
          <a href="/" className="brandmark inline-flex items-center gap-2">
            <Image
              src="/images/concreet_logo.png"   
              alt="Concreate Solutions logo"
              width={200}                       
              height={40}
              className="brandmark-image h-7 w-auto object-contain"
              priority
            />
            <span className="sr-only">Concreate Solutions</span>
          </a>

          <nav className="desktop-nav hidden md:flex items-center gap-1">
            <a href="/" className={`${linkBase} ${linkMuted}`}>Home</a>
            <a href="/about" className={`${linkBase} ${linkMuted}`}>About</a>
            <a href="/services" className={`${linkBase} ${linkMuted}`}>Services</a>
            <a href="/blog" className={`${linkBase} ${linkMuted}`}>Blog</a>
            <a href="/contact" className={`${linkBase} ${linkMuted}`}>Contact</a>
          </nav>

          <button
            className="mobile-toggle md:hidden inline-flex items-center justify-center rounded-md border border-white/15 px-3 py-2 text-sm text-white/90
                       hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
