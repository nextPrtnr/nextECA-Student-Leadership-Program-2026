'use client'

import { useEffect, useState } from 'react'
import { Clock, AlertCircle } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Deadline() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadline = new Date('2026-07-20T23:59:59').getTime()
      const now = new Date().getTime()
      const difference = deadline - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-50 dark:from-red-950/30 dark:to-red-950/30 border-b border-red-200/50 dark:border-red-900/50 py-[33px] sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-[27px]">
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 flex-wrap lg:flex-nowrap">
          {/* Left: Deadline info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-200 dark:bg-red-900/50">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-700 dark:text-red-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-red-900 dark:text-red-300 uppercase tracking-wide" style={{ color: '#ff0000' }}>
                Application Deadline
              </p>
              <p className="text-lg sm:text-xl font-bold text-red-950 dark:text-red-100">
                July 20, 2026
              </p>
            </div>
          </div>

          {/* Right: Countdown timer */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-700 dark:text-red-300 flex-shrink-0" style={{ color: '#ff0000' }} />
            <div className="flex gap-2 sm:gap-3">
              {/* Days */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-red-950 dark:text-red-100 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-xs text-red-700 dark:text-red-300" style={{ color: '#fc0000' }}>Days</span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-red-950 dark:text-red-100 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-xs text-red-700 dark:text-red-300" style={{ color: '#ff0000' }}>Hrs</span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-red-950 dark:text-red-100 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs text-red-700 dark:text-red-300" style={{ color: '#ff0000' }}>Min</span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-red-950 dark:text-red-100 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-xs text-red-700 dark:text-red-300" style={{ color: '#ff0606' }}>Sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
