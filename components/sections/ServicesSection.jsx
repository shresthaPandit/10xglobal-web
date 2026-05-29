"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

const SERVICES = [
  {
    title: "Global Market Entry",
    desc:  "We help you enter new markets with clarity, confidence, and compliance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: "Deals & Transactions",
    desc:  "From structuring to execution, we help you close deals that create value.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: "Managed Services",
    desc:  "Run your business better with our technology-led managed solutions.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/>
      </svg>
    ),
  },
  {
    title: "Legal & Compliance",
    desc:  "Stay compliant across borders with proactive legal and regulatory support.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"/>
        <line x1="4" y1="20" x2="21" y2="3"/>
        <polyline points="21 16 21 21 16 21"/>
        <line x1="15" y1="15" x2="21" y2="21"/>
        <path d="M3 7l4 4M3 17l4-4"/>
      </svg>
    ),
  },
]

export default function ServicesSection() {
  const isMobile = useIsMobile()

  return (
    <section id="services" style={{ backgroundColor: C.bg, padding: isMobile ? "3rem 5vw 4rem" : "3rem 5vw 5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem" }}
        >
          <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", display: "block", marginBottom: "1rem" }}>
            HOW WE HELP
          </span>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: 700, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.015em", maxWidth: 520, margin: "0 auto" }}>
            End-to-end solutions for global business success.
          </h2>
        </motion.div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap:                 isMobile ? "1.5rem" : "2rem",
        }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontFamily: font.serif, fontSize: "1.05rem", fontWeight: 700, color: C.ink, lineHeight: 1.3, marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: font.sans, color: C.muted, fontSize: "0.86rem", lineHeight: 1.72, marginBottom: "1.1rem", flex: 1 }}>
                {s.desc}
              </p>
              <a
                href="#cta"
                style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.01em", display: "inline-flex", alignItems: "center", gap: "0.25rem", transition: "gap 0.2s", alignSelf: "flex-start" }}
                onMouseEnter={e => { e.currentTarget.style.gap = "0.5rem" }}
                onMouseLeave={e => { e.currentTarget.style.gap = "0.25rem" }}
              >
                Explore →
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
