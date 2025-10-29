'use client'
export default function BrandSeal({
  labelOuter = 'BRICKLAYING & HARDSCAPE • CONTRACTOR SERVICES •',
  icon = '✦',
  size = 180,
  bg = '#0b2a4a',
  fg = '#f4a21a',
}) {
  const r = size / 2
  const textRadius = r - 20
  const charAngle = 360 / labelOuter.length
  return (
    <svg
      className="brandseal-svg drop-shadow-lg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle cx={r} cy={r} r={r} fill={bg} />
      <circle cx={r} cy={r} r={r - 8} fill="none" stroke={fg} strokeWidth="2" opacity="0.7" />
      <g fill={fg}>
        {Array.from(labelOuter).map((ch, i) => {
          const angle = (i * charAngle - 90) * (Math.PI / 180)
          const x = r + textRadius * Math.cos(angle)
          const y = r + textRadius * Math.sin(angle)
          const rotate = i * charAngle
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rotate} ${x} ${y})`}
            >
              {ch}
            </text>
          )
        })}
      </g>
      <g>
        <circle cx={r} cy={r} r="24" fill={fg} />
        <text
          x={r}
          y={r + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight="700"
          fill={bg}
        >
          {icon}
        </text>
      </g>
    </svg>
  )
}
