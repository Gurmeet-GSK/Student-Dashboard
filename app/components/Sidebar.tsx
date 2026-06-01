'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, BookOpen, BarChart2, Settings, Menu, X } from 'lucide-react'

type View = 'dashboard' | 'courses' | 'activity' | 'settings'

const navItems = [
  { id: 'dashboard' as View, label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'courses'   as View, label: 'Courses',   Icon: BookOpen },
  { id: 'activity'  as View, label: 'Activity',  Icon: BarChart2 },
  { id: 'settings'  as View, label: 'Settings',  Icon: Settings },
]

interface SidebarProps {
  activeView: View
  onNavigate: (view: View) => void
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.nav
        animate={{ width: collapsed ? 70 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen sticky top-0
          bg-[#0C0C0D] border-r border-white/5 p-4 overflow-hidden"
      >
        {/* Logo / Collapse button */}
        <div className="flex items-center justify-between mb-8 px-2 min-w-[38px]">
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-white font-bold text-md whitespace-nowrap overflow-hidden"
              >
                LEARNING DASH
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="text-white/40 hover:text-white p-1 rounded flex-shrink-0 ml-auto"
          >
            <AnimatePresence mode="wait" initial={false}>
              {collapsed ? (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Nav items */}
        <div className="space-y-1">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
            >
              {activeView === id && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 bg-white/8 rounded-lg"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={18}
                className={`relative z-10 flex-shrink-0 transition-colors duration-150 ${
                  activeView === id ? 'text-white' : 'text-white/40'
                }`}
              />

              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    key={`label-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`relative z-10 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                      activeView === id ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* ── Mobile Bottom Bar ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111118]/95
        backdrop-blur border-t border-white/5 flex justify-around p-2 z-50">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg"
          >
            <Icon
              size={20}
              className={activeView === id ? 'text-purple-400' : 'text-white/40'}
            />
            <span className="text-[10px] text-white/40">{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}