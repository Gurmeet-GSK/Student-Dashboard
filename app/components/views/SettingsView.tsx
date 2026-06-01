'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { USER } from '../../lib/config'

interface ToggleProps {
  enabled: boolean
  onChange: (val: boolean) => void
  ariaLabel?: string
}

function Toggle({ enabled, onChange, ariaLabel }: ToggleProps) {
  return (
    <motion.button
      role="switch"
      aria-label={ariaLabel}
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        relative flex-shrink-0 w-11 h-6 rounded-full border
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
        transition-colors duration-300
        ${enabled ? 'bg-white border-white/20' : 'bg-white/10 border-white/10'}
      `}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`
          absolute top-0.5 w-5 h-5 rounded-full shadow-sm
          ${enabled ? 'bg-black' : 'bg-white/50'}
        `}
        style={{ left: enabled ? 22 : 2 }}
      />
    </motion.button>
  )
}

interface SettingRowProps {
  label: string
  description: string
  enabled: boolean
  onChange: (val: boolean) => void
}

function SettingRow({ label, description, enabled, onChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div className="min-w-0">
        <p className="text-sm text-white/80 font-medium">{label}</p>
        <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <Toggle
        enabled={enabled}
        onChange={onChange}
        ariaLabel={label}
      />
    </div>
  )
}

export default function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [streakReminders, setStreakReminders] = useState(true)
  const [displayName, setDisplayName] = useState<string>(USER.name)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <section className="h-full">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
        System Settings
      </h1>

      <div className="
        w-full
        bg-[#0e0e12] rounded-2xl
        border border-white/5
        divide-y divide-white/5
        overflow-hidden
      ">

        {/* Display Name */}
        <div className="px-5 py-5">
          <label
            htmlFor="displayName"
            className="block text-xs text-white/40 uppercase tracking-wider mb-2.5"
          >
            Display Name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
            className="
              w-full max-w-sm
              bg-white/5 border border-white/8
              rounded-lg px-4 py-2.5
              text-white text-sm
              focus:outline-none focus:border-white/20 focus:bg-white/8
              transition-all duration-200
              placeholder:text-white/20
            "
          />
        </div>

        {/* Email Notifications */}
        <div className="px-5 py-4">
          <SettingRow
            label="Email Notifications"
            description="Receive updates about your courses"
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />
        </div>

        {/* Streak Reminders */}
        <div className="px-5 py-4">
          <SettingRow
            label="Streak Reminders"
            description="Daily reminder to keep your streak alive"
            enabled={streakReminders}
            onChange={setStreakReminders}
          />
        </div>

        {/* Save Row */}
        <div className="px-5 py-4 flex items-center justify-between gap-4">

          <AnimatePresence>
            {saved && (
              <motion.p
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-green-400"
              >
                ✓ Settings saved
              </motion.p>
            )}
          </AnimatePresence>

          {!saved && <span />}

          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="
              flex-shrink-0 px-5 py-2 rounded-lg
              text-sm font-medium text-black bg-white
              hover:bg-white/90
              transition-colors duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
            "
          >
            Save Changes
          </motion.button>

        </div>
      </div>
    </section>
  )
}