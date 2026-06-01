'use client'   

import { motion } from 'framer-motion'

type Props = { value: number }  

export default function ProgressBar({ value }: Props) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-full">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        initial={{ width: '0%' }}         
        animate={{ width: `${value}%` }}   
        transition={{
          duration: 1.2,
          delay: 0.4,
          ease: 'easeOut'
        }}
      />
    </div>
  )
}