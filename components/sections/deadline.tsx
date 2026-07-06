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
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b border-amber-200/50 dark:border-amber-900/50 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 flex-wrap lg:flex-nowrap">
          {/* Left: Deadline info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-200 dark:bg-amber-900/50">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                Application Deadline
              </p>
              <p className="text-lg sm:text-xl font-bold text-amber-950 dark:text-amber-100">
                July 20, 2026
              </p>
            </div>
          </div>

          {/* Right: Countdown timer */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
            <div className="flex gap-2 sm:gap-3">
              {/* Days */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300">Days</span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300">Hrs</span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300">Min</span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center bg-white dark:bg-black/30 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300">Sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
