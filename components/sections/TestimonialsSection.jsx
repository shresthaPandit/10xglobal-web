"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"

const TESTIMONIALS = [
  {
    quote:    "10X Global's flexibility, commitment, and unwavering support have been instrumental in our growth. They don't just advise — they operate as a true partner.",
    name:     "Upasana Taku",
    title:    "Co-founder, MobiKwik",
    initials: "UT",
  },
  {
    quote:    "Their deep expertise in cross-border transactions gave us the confidence to close our deal. The team's responsiveness and reliability set them apart from every other firm we've worked with.",
    name:     "Aeby Samuel",
    title:    "CEO, FYNXT",
    initials: "AS",
  },
  {
    quote:    "Navigating UAE regulations as an international business is complex. 10X made it seamless — from entity setup to ongoing compliance, they handle everything with real precision.",
    name:     "Daniel Haddad",
    title:    "Beverly Hills Polo Club",
    initials: "DH",
  },
  {
    quote:    "We needed a CFO-level strategic partner without the overhead. 10X delivered exactly that — treasury strategy, fundraising support, and financial planning that actually moved the needle.",
    name:     "Avinash",
    title:    "Co-founder, ElectricPe",
    initials: "AV",
  },
  {
    quote:    "What makes 10X different is that they understand both the business side and the legal/financial complexity. They've been essential to our expansion across multiple geographies.",
    name:     "Jonathan Lawlor",
    title:    "Top Line Marketing",
    initials: "JL",
  },
]

const INTERVAL = 5000

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const t = TESTIMONIALS[active]

  useEffect(() => {
    setProgress(0)
    const start = performance.now()

    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start
      setProgress(Math.min(elapsed / INTERVAL, 1))
      if (elapsed < INTERVAL) requestAnimationFrame(tick)
    })

    const timer = setTimeout(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length)
    }, INTERVAL)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [active])

  return (
    <section style={{ backgroundColor: C.ink, padding: "6rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <div style={{ width: 28, height: 2, backgroundColor: C.copper }} />
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>
                CLIENT STORIES
              </span>
            </div>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: C.bg, lineHeight: 1.08 }}>
              What our clients say.
            </h2>
          </div>

          {/* Dot nav with progress */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position:        "relative",
                  width:           i === active ? 36 : 8,
                  height:          8,
                  borderRadius:    20,
                  border:          "none",
                  cursor:          "pointer",
                  backgroundColor: i === active ? "rgba(193,127,62,0.25)" : "rgba(247,243,238,0.2)",
                  transition:      "width 0.35s ease, background-color 0.3s",
                  padding:         0,
                  overflow:        "hidden",
                }}
              >
                {i === active && (
                  <div style={{
                    position:        "absolute",
                    inset:           0,
                    borderRadius:    20,
                    backgroundColor: C.copper,
                    transformOrigin: "left center",
                    transform:       `scaleX(${progress})`,
                    transition:      "none",
                  }} />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quote card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: "rgba(247,243,238,0.04)",
              border:          "1px solid rgba(247,243,238,0.1)",
              borderRadius:    24,
              padding:         "3rem 3.5rem",
              position:        "relative",
              overflow:        "hidden",
            }}
          >
            {/* Decorative large quote */}
            <div style={{
              position:   "absolute",
              top:        "-1.5rem",
              right:      "2.5rem",
              fontFamily: font.serif,
              fontSize:   "12rem",
              color:      C.copper,
              opacity:    0.05,
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}>
              "
            </div>

            {/* Small copper quote mark */}
            <div style={{ fontFamily: font.serif, fontSize: "3.5rem", color: C.copper, lineHeight: 0.6, marginBottom: "1.75rem", userSelect: "none" }}>
              "
            </div>

            <p style={{
              fontFamily:   font.serif,
              fontSize:     "clamp(1.25rem, 2.2vw, 1.75rem)",
              color:        C.bg,
              lineHeight:   1.65,
              fontStyle:    "italic",
              fontWeight:   500,
              marginBottom: "2.25rem",
              maxWidth:     780,
            }}>
              {t.quote}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width:           48,
                height:          48,
                borderRadius:    "50%",
                backgroundColor: C.copper,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontFamily:      font.sans,
                fontWeight:      700,
                fontSize:        "0.85rem",
                color:           "#fff",
                flexShrink:      0,
                letterSpacing:   "0.02em",
              }}>
                {t.initials}
              </div>
              <div>
                <p style={{ fontFamily: font.sans, fontWeight: 600, color: C.bg, fontSize: "0.925rem", letterSpacing: "-0.01em" }}>
                  {t.name}
                </p>
                <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.45)", fontSize: "0.8rem", marginTop: 2 }}>
                  {t.title}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
