"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { C, font } from "@/lib/theme"

function GlobeSkeleton() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: "80%", height: "80%", borderRadius: "50%",
        background: "radial-gradient(circle at 38% 38%, #1e2d40 0%, #0a0e18 65%, transparent 100%)",
        animation: "pulse-globe 2.4s ease-in-out infinite",
      }} />
    </div>
  )
}

const GlobeWrapper = dynamic(() => import("./GlobeWrapper"), { ssr: false, loading: () => <GlobeSkeleton /> })

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function HeroSection() {
  return (
    <section style={{
      backgroundColor: C.bg,
      position:        "relative",
      overflow:        "hidden",
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
    }}>

      {/* Dot grid */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundImage: "radial-gradient(circle, rgba(193,127,62,0.13) 1px, transparent 1px)",
        backgroundSize:  "44px 44px",
        pointerEvents:   "none",
        zIndex:          0,
      }} />

      {/* ── Centered text content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position:   "relative",
          zIndex:     2,
          textAlign:  "center",
          padding:    "3rem 5vw 0",
          width:      "100%",
          maxWidth:   860,
        }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: "1.25rem" }}>
          <span style={{
            fontFamily:    font.sans,
            color:         C.copper,
            fontSize:      "0.62rem",
            fontWeight:    700,
            letterSpacing: "0.22em",
          }}>
            ADVISORY · FINANCE · LEGAL · TECHNOLOGY
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{
          fontFamily:    font.serif,
          fontSize:      "clamp(2rem, 4.2vw, 2.75rem)",
          lineHeight:    1.08,
          color:         C.ink,
          fontWeight:    700,
          marginBottom:  "1rem",
          letterSpacing: "-0.025em",
        }}>
          The{" "}
          <em style={{ color: C.copper, fontStyle: "italic" }}>operating system</em>
          {" "}for your cross-border business.
        </motion.h1>

        <motion.p variants={fadeUp} style={{
          fontFamily:   font.sans,
          color:        "#6a6360",
          fontSize:     "0.975rem",
          lineHeight:   1.9,
          maxWidth:     520,
          margin:       "0 auto 1.5rem",
        }}>
          Advisory expertise. Technology-led delivery. One team across India, UAE,
          Singapore, and the US — handling your{" "}
          <strong style={{ color: C.ink, fontWeight: 600 }}>
            market entry, transactions, and compliance
          </strong>{" "}
          at the speed your business demands.
        </motion.p>

        <motion.div variants={fadeUp} style={{
          display:        "flex",
          gap:            "1.25rem",
          alignItems:     "center",
          justifyContent: "center",
          flexWrap:       "wrap",
        }}>
          <a href="#cta">
            <button
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#a86e35"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(193,127,62,0.38)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.copper;   e.currentTarget.style.boxShadow = "0 2px 12px rgba(193,127,62,0.28)"; }}
              style={{
                backgroundColor: C.copper,
                color:           "#fff",
                padding:         "0.85rem 1.85rem",
                borderRadius:    8,
                fontSize:        "0.88rem",
                fontFamily:      font.sans,
                fontWeight:      600,
                border:          "none",
                cursor:          "pointer",
                letterSpacing:   "0.01em",
                boxShadow:       "0 2px 12px rgba(193,127,62,0.28)",
                transition:      "background-color 0.2s, box-shadow 0.2s",
              }}
            >
              Book a free consultation
            </button>
          </a>
          <a href="#team"
            style={{ fontFamily: font.sans, color: C.ink, fontSize: "0.88rem", fontWeight: 500, opacity: 0.7, display: "flex", alignItems: "center", gap: "0.3rem", transition: "opacity 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; }}
          >
            Our firm →
          </a>
        </motion.div>
      </motion.div>

      {/* ── 10X + Globe composite ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:       "relative",
          zIndex:         2,
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "center",
          width:          "100%",
          marginTop:      "-3rem",
          paddingBottom:  "2rem",
          userSelect:     "none",
          pointerEvents:  "none",
        }}
      >
        {/* "1" — tall serif character */}
        <span style={{
          fontFamily:    font.serif,
          fontWeight:    700,
          fontSize:      "clamp(280px, 40vw, 620px)",
          lineHeight:    1,
          letterSpacing: "-0.05em",
          color:         "rgba(180, 135, 45, 0.28)",
          display:       "block",
          flexShrink:    0,
          pointerEvents: "none",
        }}>
          1
        </span>

        {/* Globe */}
        <div style={{
          position:      "relative",
          width:         "clamp(300px, 36vw, 540px)",
          height:        "clamp(300px, 36vw, 540px)",
          flexShrink:    0,
          pointerEvents: "auto",
        }}>
          {/* Warm glow behind globe */}
          <div style={{
            position:     "absolute",
            top:          "50%",
            left:         "50%",
            transform:    "translate(-50%, -50%)",
            width:        "155%",
            height:       "155%",
            borderRadius: "50%",
            background:   "radial-gradient(ellipse at 50% 60%, rgba(235,145,30,0.42) 0%, rgba(220,130,20,0.18) 40%, transparent 70%)",
            filter:       "blur(24px)",
            zIndex:       0,
            pointerEvents:"none",
          }} />
          <div style={{
            position:     "absolute",
            top:          "50%",
            left:         "50%",
            transform:    "translate(-50%, -50%)",
            width:        "200%",
            height:       "200%",
            borderRadius: "50%",
            background:   "radial-gradient(ellipse at 50% 55%, rgba(235,160,40,0.15) 0%, transparent 60%)",
            filter:       "blur(40px)",
            zIndex:       0,
            pointerEvents:"none",
          }} />
          <GlobeWrapper />
        </div>

        {/* "X" */}
        <span style={{
          fontFamily:    font.serif,
          fontWeight:    700,
          fontSize:      "clamp(220px, 32vw, 500px)",
          lineHeight:    1,
          letterSpacing: "-0.05em",
          color:         "rgba(180, 135, 45, 0.28)",
          display:       "block",
          flexShrink:    0,
          pointerEvents: "none",
        }}>
          X
        </span>
      </motion.div>

      {/* Bottom fade — smooths glow into next section */}
      <div style={{
        position:      "absolute",
        bottom:        0,
        left:          0,
        right:         0,
        height:        140,
        background:    `linear-gradient(to bottom, transparent, ${C.bg})`,
        pointerEvents: "none",
        zIndex:        3,
      }} />

    </section>
  )
}
