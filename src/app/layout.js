import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'

export const metadata = {
  title: 'Concreate Solutions Sydney',
  description: 'Professional concrete services in Sydney',
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

