'use client'

import { motion } from 'framer-motion'
import CourseCard from './CourseCard'
import { Course } from '../lib/supabase'

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
}

export default function CoursesStagger({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      className="contents"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map(course => (
        <motion.div key={course.id} variants={cardVariants}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  )
}