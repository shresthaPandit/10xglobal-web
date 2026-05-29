"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const STATS = [
  {
    value: "13+",
    label: "Years Active",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    value: "450+",
    label: "Clients Served",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    value: "57+",
    label: "Domain Experts",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    value: "4",
    label: "Countries",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.copper} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

export default function StatsSection() {
  return (
    <section style={{
      backgroundColor: C.bg,
      borderTop:       `1px solid rgba(193,127,62,0.15)`,
      borderBottom:    `1px solid rgba(193,127,62,0.15)`,
      padding:         "3.5rem 5vw",
    }}>
      <div style={{
        maxWidth:            900,
        margin:              "0 auto",
        display:             "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap:                 "1rem",
      }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: "rgba(255,255,255,0.72)",
              border:          "1px solid rgba(193,127,62,0.18)",
              borderRadius:    14,
              padding:         "1.6rem 1rem 1.4rem",
              textAlign:       "center",
              backdropFilter:  "blur(12px)",
              boxShadow:       "0 2px 16px rgba(20,18,16,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.85rem" }}>
              {s.icon}
            </div>
            <div style={{
              fontFamily:    font.serif,
              fontSize:      "2.1rem",
              fontWeight:    700,
              color:         C.ink,
              lineHeight:    1,
              letterSpacing: "-0.02em",
              marginBottom:  "0.45rem",
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily:    font.sans,
              fontSize:      "0.58rem",
              color:         C.copper,
              fontWeight:    700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
