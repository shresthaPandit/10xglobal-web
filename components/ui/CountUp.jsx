"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

/**
 * Animates a numeric value from 0 to `value` when scrolled into view.
 * Accepts strings like "450+", "13+", "4", "57+".
 */
export default function CountUp({ value, duration = 1.8, style, className }) {
  const str = String(value)
  const numMatch = str.match(/^(\d+)(.*)$/)
  const target = numMatch ? parseInt(numMatch[1], 10) : 0
  const suffix = numMatch ? numMatch[2] : ""

  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const startTime = performance.now()

    function tick(now) {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic — fast start, smooth finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref} style={style} className={className}>
      {display}{suffix}
    </span>
  )
}
