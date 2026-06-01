'use client'

import { useEffect, useState } from 'react'
import { supabase, Course } from '../../lib/supabase'
import HeroTile from '../HeroTile'
import ActivityTile from '../ActivityTile'
import CoursesStagger from '../CoursesStagger'
import SkeletonCard from '../SkeletonCard'

export default function DashboardView() {
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

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">

      <HeroTile />
      <ActivityTile />

      {error && (
        <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <p className="text-red-400 text-sm">
            Failed to load courses. Please check your Supabase connection.
          </p>
        </div>
      )}

      {!courses && !error && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      )}

      {courses && <CoursesStagger courses={courses} />}

    </section>
  )
}