"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function DeadlineTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Deadline: July 20, 2026 at 11:59 PM
      const deadline = new Date("2026-07-20T23:59:59").getTime()
      const now = new Date().getTime()
      const difference = deadline - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        })
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <div className={cn(
      "rounded-2xl border p-4 backdrop-blur-sm transition-all",
      timeLeft.isExpired
        ? "border-destructive/50 bg-destructive/10 text-destructive"
        : "border-amber-200/50 bg-amber-50/80 text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-300"
    )}>
      <div className="flex flex-col gap-3 min-w-max">
        <div className="flex items-center gap-2">
          <Clock className="size-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Deadline: Jul 20, 2026</span>
        </div>
        
        {!timeLeft.isExpired && (
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="text-xs opacity-70">days</span>
            </div>
            <span className="text-sm opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="text-xs opacity-70">hrs</span>
            </div>
            <span className="text-sm opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="text-xs opacity-70">min</span>
            </div>
            <span className="text-sm opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="text-xs opacity-70">sec</span>
            </div>
          </div>
        )}

        {timeLeft.isExpired && (
          <p className="text-sm font-semibold">Applications Closed</p>
        )}
      </div>
    </div>
  )
}
