'use client'

import { motion } from 'framer-motion'
import { Flame, ArrowRight } from 'lucide-react'
import { USER } from '../lib/config'

type Props = {
  name?:   string
  streak?: number
}

export default function HeroTile({
  name   = USER.name,
  streak = USER.streak,
}: Props) {
  return (
    <article className="
      relative lg:col-span-2 bg-[#0d0d10] rounded-2xl p-8
      border border-white/5 overflow-hidden
    ">
      <div className="absolute inset-0 bg-gradient-to-br
        from-zinc-900/60 via-[#0d0d10] to-purple-950/20 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60
        bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10"
      >
        <p className="text-white/60 text-lg mb-1">Good morning</p>
        <h1 className="text-3xl font-bold text-white mb-6">
          Welcome back, {name} 
        </h1>

        <div className="flex items-center gap-6 flex-wrap">

          <div className="flex items-center gap-2 px-3 py-1.5">
            <Flame className="text-yellow-500" size={20} />
            <span className="text-yellow-500 text-lg font-semibold">
              {streak} day streak!
            </span>
          </div>

          <button className="
            flex items-center gap-2 px-4 py-2 rounded-lg
            bg-zinc-800/40 border border-zinc-700/40
            text-sm font-medium text-zinc-400
            hover:bg-zinc-700/50 hover:border-zinc-600/50 hover:text-zinc-200
            transition-all duration-200
          ">
            Continue module
            <ArrowRight size={14} />
          </button>

        </div>
      </motion.div>
    </article>
  )
}