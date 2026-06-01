import { supabase } from '../lib/supabase'
import CoursesStagger from './CoursesStagger'

export default async function CoursesGrid() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at')

  if (error) {
    return (
      <div className="col-span-2 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
        <p className="text-red-400 text-sm">
          Failed to load courses. Please check your Supabase connection.
        </p>
      </div>
    )
  }

  return <CoursesStagger courses={courses ?? []} />
}