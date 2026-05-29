"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { C, font } from "@/lib/theme"
import CountUp from "@/components/ui/CountUp"

function GlobeSkeleton() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle at 38% 38%, #2a3650 0%, #141210 65%, transparent 100%)",
        animation: "pulse-globe 2.4s ease-in-out infinite", opacity: 0.6,
      }} />
    </div>
  )
}

const GlobeWrapper = dynamic(() => import("./GlobeWrapper"), { ssr: false, loading: () => <GlobeSkeleton /> })

const STATS = [
  { value: "13+",  label: "Years Active" },
  { value: "450+", label: "Clients Served" },
  { value: "57+",  label: "Domain Experts" },
  { value: "4",    label: "Countries" },
]

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }

export default function HeroSection() {
  return (
    <section style={{
      minHeight:       "100vh",
      backgroundColor: C.bg,
      position:        "relative",
      overflow:        "hidden",
      display:         "flex",
      flexDirection:   "column",
    }}>

      {/* Background dot grid */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: "radial-gradient(circle, rgba(193,127,62,0.13) 1px, transparent 1px)",
        backgroundSize:  "44px 44px",
        pointerEvents:   "none",
      }} />

      {/* "10X" watermark — aligned so globe sits over the X */}
      <div style={{
        position:      "absolute",
        top:           "62%",
        right:         "-1vw",
        transform:     "translateY(-50%)",
        fontFamily:    font.serif,
        fontSize:      "clamp(300px, 34vw, 560px)",
        fontWeight:    700,
        color:         C.ink,
        opacity:       0.028,
        lineHeight:    0.85,
        userSelect:    "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        whiteSpace:    "nowrap",
      }}>
        10X
      </div>

      {/* Main 2-column layout: text | globe+cards composite */}
      <div style={{
        flex:       1,
        display:    "flex",
        alignItems: "flex-start",
        position:   "relative",
        zIndex:     2,
        overflow:   "visible",
      }}>
        <div style={{
          width:               "100%",
          maxWidth:            1440,
          margin:              "0 auto",
          padding:             "4.5rem 5vw 2rem",
          display:             "grid",
          gridTemplateColumns: "1fr 620px",
          gap:                 "2rem",
          alignItems:          "flex-start",
        }}>

          {/* Column 1 — Text content */}
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ paddingTop: "2.5rem" }}>

            <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em" }}>
                ADVISORY · FINANCE · LEGAL · TECHNOLOGY
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontFamily:    font.serif,
              fontSize:      "clamp(3.2rem, 5.5vw, 6.5rem)",
              lineHeight:    1.08,
              color:         C.ink,
              fontWeight:    700,
              marginBottom:  "2rem",
              letterSpacing: "-0.025em",
            }}>
              The{" "}
              <em style={{ color: C.copper, fontStyle: "italic" }}>
                operating system
              </em>
              {" "}for your cross-border business.
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily:   font.sans,
              color:        "#6a6360",
              fontSize:     "0.975rem",
              lineHeight:   1.9,
              marginBottom: "2.75rem",
              maxWidth:     440,
            }}>
              Advisory expertise. Technology-led delivery. One team across India, UAE, Singapore, and the US — handling your{" "}
              <strong style={{ color: C.ink, fontWeight: 600 }}>market entry, transactions, and compliance</strong>{" "}
              at the speed your business demands.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <a href="#cta">
                <button style={{
                  backgroundColor: C.copper,
                  color:           "#fff",
                  padding:         "0.85rem 1.75rem",
                  borderRadius:    8,
                  fontSize:        "0.875rem",
                  fontFamily:      font.sans,
                  fontWeight:      600,
                  border:          "none",
                  cursor:          "pointer",
                  letterSpacing:   "0.01em",
                }}>
                  Book a free consultation
                </button>
              </a>
              <a href="#team" style={{
                fontFamily:     font.sans,
                color:          C.ink,
                fontSize:       "0.875rem",
                fontWeight:     500,
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:            "0.3rem",
                opacity:        0.75,
              }}>
                Our firm →
              </a>
            </motion.div>

            <motion.div variants={fadeUp}>
              <span style={{ fontFamily: font.sans, color: "#a09a96", fontSize: "0.78rem", letterSpacing: "0.02em" }}>
                Delhi &nbsp;·&nbsp; Dubai &nbsp;·&nbsp; Singapore &nbsp;·&nbsp; United States
              </span>
            </motion.div>

          </motion.div>

          {/* Column 2 — Globe + stats cards composite container */}
          <div style={{ position: "relative", height: 620 }}>

            {/* Globe — pushed further right, larger, more dominant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top:      -50,
                left:     0,
                right:    -170,
                bottom:   60,
              }}
            >
              <GlobeWrapper />
            </motion.div>

            {/* Stats cards — top-right of globe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:            "absolute",
                top:                 30,
                right:               -60,
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "0.75rem",
                width:               260,
                zIndex:              4,
              }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{
                  backgroundColor: "rgba(255,255,255,0.88)",
                  border:          "1px solid rgba(193,127,62,0.22)",
                  borderRadius:    12,
                  padding:         "1.1rem 0.8rem",
                  backdropFilter:  "blur(16px)",
                  textAlign:       "center",
                  boxShadow:       "0 4px 20px rgba(20,18,16,0.1)",
                }}>
                  <CountUp
                    value={s.value}
                    style={{
                      fontFamily: font.serif,
                      fontSize:   "1.85rem",
                      fontWeight: 700,
                      color:      C.ink,
                      lineHeight: 1,
                      display:    "block",
                    }}
                  />
                  <p style={{
                    fontFamily:    font.sans,
                    fontSize:      "0.56rem",
                    color:         C.copper,
                    fontWeight:    700,
                    letterSpacing: "0.1em",
                    marginTop:     6,
                  }}>
                    {s.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  )
}
