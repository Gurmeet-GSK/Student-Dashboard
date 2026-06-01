'use client'

import { useEffect, useState } from 'react'
import { supabase, Course } from '../../lib/supabase'
import * as LucideIcons from 'lucide-react'
import ProgressBar from '../ProgressBar'
import SkeletonCard from '../SkeletonCard'

export default function CoursesView() {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    supabase
      .from('courses')
      .select('*')
      .order('created_at')
      .then(({ data, error }) => {
        if (error) setError(true)
        else setCourses(data ?? [])
      })
  }, [])

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
        <p className="text-red-400 text-sm">Failed to load courses.</p>
      </div>
    )
  }

  if (!courses) {
    return (
      <section>
        <h1 className="text-2xl font-bold text-white mb-6">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => {
          const Icon = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen
          return (
            <article
              key={course.id}
              className="bg-[#0e0e12] rounded-2xl p-6 border border-white/5"
            >
              <Icon size={28} className="text-zinc-400 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-1">{course.title}</h3>
              <p className="text-white/40 text-sm mb-4">{course.progress}% complete</p>
              <ProgressBar value={course.progress} />
            </article>
          )
        })}
      </div>
    </section>
  )
}