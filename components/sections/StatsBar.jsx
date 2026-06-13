"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { C, font } from "@/lib/theme"

const STATS = [
  { prefix: "",  to: 200, decimal: 0, suffix: "+",  label: "Successful Market Entries"    },
  { prefix: "$", to: 2.5, decimal: 1, suffix: "B+", label: "Funding Transactions Advised" },
  { prefix: "",  to: 4,   decimal: 0, suffix: "",   label: "Global Offices"               },
  { prefix: "",  to: 14,  decimal: 0, suffix: "+",  label: "Years of Practice"            },
]

function CountUp({ to, decimal = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const dur = 1800
    const t0  = performance.now()
    let raf
    const tick = (now) => {
      const p    = Math.min((now - t0) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(+(ease * to).toFixed(decimal))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, decimal])

  return <span ref={ref}>{val.toFixed(decimal)}</span>
}

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: C.bg, borderTop: "1px solid rgba(12,26,39,0.1)", borderBottom: "1px solid rgba(12,26,39,0.1)" }}>
      <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw" }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding:     "2.75rem 2rem",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(12,26,39,0.1)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 1, marginBottom: "0.55rem" }}>
              {s.prefix && (
                <span style={{
                  fontFamily:  font.num,
                  fontSize:    "clamp(0.95rem, 1.4vw, 1.25rem)",
                  fontWeight:  400,
                  color:       "rgba(12,26,39,0.45)",
                  lineHeight:  1,
                  marginTop:   "0.55rem",
                  marginRight: "0.1rem",
                }}>
                  {s.prefix}
                </span>
              )}
              <span style={{
                fontFamily:    font.num,
                fontSize:      "clamp(2rem, 3vw, 2.75rem)",
                fontWeight:    400,
                color:         C.ink,
                letterSpacing: "0.01em",
                lineHeight:    1,
              }}>
                <CountUp to={s.to} decimal={s.decimal} />
              </span>
              {s.suffix && (
                <span style={{
                  fontFamily: font.num,
                  fontSize:   "clamp(1.2rem, 1.8vw, 1.6rem)",
                  fontWeight: 400,
                  color:      C.red,
                  lineHeight: 1,
                  marginTop:  "0.25rem",
                  marginLeft: "0.1rem",
                }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div style={{
              fontFamily:    font.sans,
              fontSize:      "0.6rem",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "rgba(12,26,39,0.38)",
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
