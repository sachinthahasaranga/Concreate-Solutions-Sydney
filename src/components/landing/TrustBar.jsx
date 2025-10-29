'use client'
export default function TrustBar() {
  const items = [
    { src: '/images/trust-1.svg', alt: 'Client A' },
    { src: '/images/trust-2.svg', alt: 'Client B' },
    { src: '/images/trust-3.svg', alt: 'Client C' },
  ]
  return (
    <div className="trustbar-wrap mx-auto mt-8 max-w-6xl px-4">
      <div className="rounded-2xl border border-black/5 bg-white/60 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-6">
          <span className="text-xs font-semibold tracking-wide text-gray-500">Trusted by Sydney builders</span>
          <div className="flex flex-wrap items-center gap-6 opacity-70">
            {items.map((it) => (
              <img key={it.alt} src={it.src} alt={it.alt} className="h-6 w-auto" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
