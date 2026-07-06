"use client"

import { useEffect, useState } from "react"
import { Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function DeadlineBanner() {
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

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <div className="relative">
      {/* Top banner */}
      <div className={cn(
        "w-full py-3 px-4 text-center text-sm font-medium transition-colors",
        timeLeft.isExpired
          ? "bg-destructive/10 text-destructive border-b border-destructive/20"
          : "bg-amber-50 text-amber-900 border-b border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="size-4 flex-shrink-0" />
          <span>
            {timeLeft.isExpired ? (
              <>Applications have closed. Thank you for your interest!</>
            ) : (
              <>
                Application Deadline: <strong>July 20, 2026</strong> at 11:59 PM
              </>
            )}
          </span>
        </div>
      </div>

      {/* Countdown timer */}
      {!timeLeft.isExpired && (
        <div className="w-full py-4 px-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Time remaining to apply:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex flex-col items-center">
                    <div className="bg-card rounded-lg px-3 py-2 border border-border min-w-[50px] text-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Days</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">:</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-card rounded-lg px-3 py-2 border border-border min-w-[50px] text-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Hours</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">:</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-card rounded-lg px-3 py-2 border border-border min-w-[50px] text-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Minutes</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">:</div>
                  <div className="flex flex-col items-center">
                    <div className="bg-card rounded-lg px-3 py-2 border border-border min-w-[50px] text-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
