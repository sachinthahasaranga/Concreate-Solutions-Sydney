'use client'
export default function MetricBadge({ value, label }) {
  return (
    <div className="metricbadge-card pointer-events-none select-none rounded-xl bg-white/90 px-4 py-3 shadow-md backdrop-blur ring-1 ring-black/5">
      <div className="text-2xl font-extrabold leading-none text-gray-900">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</div>
    </div>
  )
}
