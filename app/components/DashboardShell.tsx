'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

type View = 'dashboard' | 'courses' | 'activity' | 'settings'

import dynamic from 'next/dynamic'

const DashboardView = dynamic(() => import('./views/DashboardView'))
const CoursesView   = dynamic(() => import('./views/CoursesView'))
const ActivityView  = dynamic(() => import('./views/ActivityView'))
const SettingsView  = dynamic(() => import('./views/SettingsView'))

export default function DashboardShell() {
  const [activeView, setActiveView] = useState<View>('dashboard')

  return (
    <div className="flex min-h-screen bg-[#0D0D11]">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <main className="flex-1 p-6 lg:p-8 pb-20 lg:pb-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full"
          >
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'courses'   && <CoursesView />}
            {activeView === 'activity'  && <ActivityView />}
            {activeView === 'settings'  && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}