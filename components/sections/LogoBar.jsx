"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const LOGOS = [
  { name: "stripe",  display: "stripe"  },
  { name: "wise",    display: "wise"    },
  { name: "ramp",    display: "ramp"    },
  { name: "brex",    display: "brex"    },
  { name: "airbnb",  display: "airbnb"  },
  { name: "kraken",  display: "kraken"  },
]

const STATS = [
  { value: "13+",  label: "Years Active"    },
  { value: "450+", label: "Clients Served"  },
  { value: "57+",  label: "Domain Experts"  },
  { value: "4",    label: "Countries"       },
]

const doubled = [...LOGOS, ...LOGOS, ...LOGOS]

export default function LogoBar() {
  return (
    <section style={{
      backgroundColor: C.bg,
      padding:         "4rem 0 4.5rem",
      overflow:        "hidden",
    }}>

      {/* Premium label */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1.5rem",
        marginBottom:   "2.25rem",
        padding:        "0 5vw",
      }}>
        <div style={{ flex: 1, maxWidth: 72, height: 1, backgroundColor: "rgba(193,127,62,0.28)" }} />
        <p style={{
          fontFamily:  font.serif,
          fontSize:    "0.98rem",
          fontStyle:   "italic",
          color:       C.muted,
          letterSpacing: "0.01em",
          whiteSpace:  "nowrap",
          margin:      0,
        }}>
          Trusted by ambitious companies worldwide
        </p>
        <div style={{ flex: 1, maxWidth: 72, height: 1, backgroundColor: "rgba(193,127,62,0.28)" }} />
      </div>

      {/* Scrolling ticker */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position:      "absolute",
          left:          0, top: 0, bottom: 0,
          width:         120,
          background:    `linear-gradient(to right, ${C.bg}, transparent)`,
          zIndex:        2,
          pointerEvents: "none",
        }} />
        <div style={{
          position:      "absolute",
          right:         0, top: 0, bottom: 0,
          width:         120,
          background:    `linear-gradient(to left, ${C.bg}, transparent)`,
          zIndex:        2,
          pointerEvents: "none",
        }} />

        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <div key={i} style={{
              display:    "flex",
              alignItems: "center",
              flexShrink: 0,
              padding:    "0 3rem",
            }}>
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "1.15rem",
                fontWeight:    600,
                color:         C.ink,
                opacity:       0.5,
                letterSpacing: "-0.02em",
                whiteSpace:    "nowrap",
              }}>
                {logo.display}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <div style={{
        display:         "flex",
        justifyContent:  "center",
        gap:             "clamp(2rem, 7vw, 5.5rem)",
        marginTop:       "3rem",
        padding:         "2.5rem 5vw 0",
        borderTop:       `1px solid rgba(193,127,62,0.12)`,
        flexWrap:        "wrap",
      }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            <div style={{
              fontFamily:    font.serif,
              fontSize:      "clamp(1.9rem, 3vw, 2.5rem)",
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
              fontSize:      "0.6rem",
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
