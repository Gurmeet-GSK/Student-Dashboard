'use client'

import { motion } from 'framer-motion'

import * as LucideIcons from 'lucide-react'
import ProgressBar from './ProgressBar'
import { Course } from '../lib/supabase'

type Props = { course: Course }

export default function CourseCard({ course }: Props) {
  const Icon = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen

  return (
    <motion.article
      className="course-card relative bg-[#0e0e12] rounded-2xl p-5 border border-white/5 overflow-hidden cursor-pointer"
     
      whileHover={{
        scale: 1.02,
        borderColor: 'rgba(139, 92, 246, 0.4)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      
      <Icon size={24} className="text-zinc-400 mb-3 relative z-10" />
      <h3 className="text-sm font-semibold text-white mb-1 relative z-10">
        {course.title}
      </h3>
      <p className="text-xs text-white/40 mb-4 relative z-10">
        {course.progress}% complete
      </p>
      <div className="relative z-10">
        <ProgressBar value={course.progress} />
      </div>
    </motion.article>
  )
}