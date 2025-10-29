'use client'
export default function GuaranteeStamp({
  percent = '100%',
  subText = 'guaranteed',
}) {
  return (
    <div className="guarantee-stamp relative inline-flex items-end">
      <span className="text-[52px] md:text-[92px] font-extrabold leading-none text-[#0b2a4a]">
        {percent}
      </span>
      <span className="ml-2 mb-1 bg-white text-[#0b2a4a] px-2 py-1 text-base md:text-xl italic rounded">
        {subText}
      </span>
    </div>
  )
}
