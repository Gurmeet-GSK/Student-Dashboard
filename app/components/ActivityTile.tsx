'use client'

import { useState, useEffect } from 'react'

const levelToHours = [
  '0 hours logged',
  '1–2 hours logged',
  '3–4 hours logged',
  '5–6 hours logged',
  '7+ hours logged',
]

const activityColors = [
  'bg-white/5 border border-white/5',           // 0 — inactive
  'bg-zinc-700/40 border border-zinc-600/20',   // 1 — low
  'bg-zinc-600/60 border border-zinc-500/30',   // 2 — medium
  'bg-zinc-500/80 border border-zinc-400/40',   // 3 — high
  'bg-zinc-300 border border-zinc-200/50',      // 4 — peak
]

// Generate a stable initial array (all zeros) to avoid hydration mismatch
const emptyActivity = Array.from({ length: 84 }, () => 0)

export default function ActivityTile() {
  const [activity, setActivity] = useState(emptyActivity)

  useEffect(() => {
    // Generate random values only on the client after mount
    setActivity(Array.from({ length: 84 }, () => Math.floor(Math.random() * 5)))
  }, [])

  return (
    <article className="bg-[#0f0f12] rounded-2xl p-5 border border-white/5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white uppercase tracking-wider">
          Login hours
        </h2>
        <p className="text-xs text-white/30 font-mono">Last 12 weeks</p>
      </div>

      <div className="grid grid-cols-12 gap-1">
        {activity.map((level, i) => (
          <div
            key={i}
            title={levelToHours[level]}
            className={`
              aspect-square rounded-sm cursor-crosshair relative group
              transition-transform duration-150 hover:scale-125 hover:z-10
              ${activityColors[level]}
            `}
          >
            <div className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              px-2 py-1 bg-[#1a1a1f] border border-white/10 rounded
              text-[10px] font-mono text-white/80
              opacity-0 group-hover:opacity-100 pointer-events-none
              whitespace-nowrap transition-opacity z-50 shadow-xl
            ">
              {levelToHours[level]}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mt-3 justify-end">
        <span className="text-xs text-white/25 mr-1">Less</span>
        {activityColors.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
        ))}
        <span className="text-xs text-white/25 ml-1">More</span>
      </div>
    </article>
  )
}