import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'aos/dist/aos.css'
import SiteHeader from '@/components/layout/SiteHeader'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata = {
  metadataBase: new URL('https://www.concreatesolutions.com'),
  title: {
    default: 'RRR Bricklaying',
    template: '%s | RRR Bricklaying',
  },
  description:
    'Trusted bricklaying, concrete, and hardscaping across Sydney. ISO-compliant delivery, tidy finishes, on-time handovers.',
  icons: {
    icon: [
      { url: '/icon.png', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://www.concreatesolutions.com',
    title: 'RRR Bricklaying',
    description:
      'Brickwork & concrete done right the first time. Reliable crews, transparent pricing, tidy finishes.',
    siteName: 'RRR Bricklaying',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Concreate Solutions — Sydney masonry & concrete',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concreate Solutions Sydney',
    description:
      'Brickwork & concrete done right the first time. Reliable crews, transparent pricing, tidy finishes.',
    images: ['/og-cover.png'],
  },
  alternates: {
    canonical: 'https://www.concreatesolutions.com.au',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
