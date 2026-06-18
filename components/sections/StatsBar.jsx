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
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const isFirstVisit = typeof sessionStorage !== "undefined" && !sessionStorage.getItem("10x_loaded")
    const delay = isFirstVisit ? 2300 : 0
    let raf

    const timer = setTimeout(() => {
      const dur = 2000
      const t0  = performance.now()
      const tick = (now) => {
        const p    = Math.min((now - t0) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(+(ease * to).toFixed(decimal))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf) }
  }, [inView, to, decimal])

  return <span ref={ref}>{val.toFixed(decimal)}</span>
}

export default function StatsBar() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "2.5rem 7vw" }}>
      <style>{`
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 767px) {
          .stats-cards { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="stats-cards">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:        "relative",
              overflow:        "hidden",
              backgroundColor: "#0d1f3c",
              borderRadius:    "16px",
              padding:         "1.75rem 1.75rem 1.5rem",
              boxShadow:       "0 24px 48px rgba(0,0,0,0.22), 0 6px 16px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.07)",
              border:          "1px solid rgba(255,255,255,0.06)",
              display:         "flex",
              flexDirection:   "column",
              alignItems:      "center",
              textAlign:       "center",
              gap:             "0.35rem",
              minHeight:       "160px",
            }}
          >
            {/* Decorative corner circles */}
            <span style={{
              position:        "absolute",
              top:             "-24px",
              right:           "-24px",
              width:           "80px",
              height:          "80px",
              borderRadius:    "50%",
              backgroundColor: "rgba(255,255,255,0.05)",
              pointerEvents:   "none",
            }} />
            <span style={{
              position:        "absolute",
              top:             "-8px",
              right:           "-8px",
              width:           "44px",
              height:          "44px",
              borderRadius:    "50%",
              backgroundColor: "rgba(255,255,255,0.05)",
              pointerEvents:   "none",
            }} />

            {/* Label */}
            <div style={{
              fontFamily:    font.sans,
              fontSize:      "0.72rem",
              fontWeight:    600,
              color:         "#ffffff",
              letterSpacing: "0.04em",
              marginBottom:  "0.25rem",
            }}>
              {s.label}
            </div>

            {/* Number */}
            <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 1 }}>
              {s.prefix && (
                <span style={{
                  fontFamily:  font.num,
                  fontSize:    "clamp(0.8rem, 1.1vw, 1rem)",
                  fontWeight:  400,
                  color:       "rgba(255,255,255,0.5)",
                  marginTop:   "0.4rem",
                  marginRight: "0.1rem",
                }}>
                  {s.prefix}
                </span>
              )}
              <span style={{
                fontFamily:    font.num,
                fontSize:      "clamp(2.2rem, 3vw, 2.8rem)",
                fontWeight:    700,
                color:         "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight:    1,
              }}>
                <CountUp to={s.to} decimal={s.decimal} />
              </span>
              {s.suffix && (
                <span style={{
                  fontFamily: font.num,
                  fontSize:   "clamp(1.1rem, 1.5vw, 1.4rem)",
                  fontWeight: 700,
                  color:      C.red,
                  lineHeight: 1,
                  marginTop:  "0.2rem",
                  marginLeft: "0.1rem",
                }}>
                  {s.suffix}
                </span>
              )}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}
