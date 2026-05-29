"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

function GlobeSkeleton() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: "90%", height: "90%", borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #2a3a50 0%, #0f1520 55%, #080c14 100%)",
        boxShadow: "0 0 32px rgba(212,136,32,0.35), inset 0 0 20px rgba(0,0,0,0.5)",
      }} />
    </div>
  )
}

const GlobeWrapper = dynamic(() => import("./GlobeWrapper"), { ssr: false, loading: () => <GlobeSkeleton /> })

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function HeroSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{
      backgroundColor: C.bg,
      position:        "relative",
      overflow:        "hidden",
      height:        isMobile ? "auto" : "100vh",
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
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

      {/* ── Text content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position:  "relative",
          zIndex:    2,
          textAlign: "center",
          padding:   isMobile ? "1.25rem 6vw 0" : "2.5rem 2vw 0",
          width:     "90%",
          maxWidth:  1400,
        }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: isMobile ? "0.5rem" : "1rem" }}>
          <span style={{
            fontFamily:    font.sans,
            color:         C.copper,
            fontSize:      isMobile ? "0.55rem" : "0.62rem",
            fontWeight:    700,
            letterSpacing: isMobile ? "0.16em" : "0.22em",
          }}>
            ADVISORY · FINANCE · LEGAL · TECHNOLOGY
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{
          fontFamily:    font.serif,
          fontSize:      isMobile ? "clamp(1.65rem, 8vw, 2.2rem)" : "clamp(2.8rem, 5.8vw, 5.5rem)",
          lineHeight:    1.1,
          color:         C.ink,
          fontWeight:    700,
          marginBottom:  isMobile ? "0.6rem" : "0.85rem",
          letterSpacing: "-0.025em",
        }}>
          The{" "}
          <em style={{ color: C.copper, fontStyle: "italic" }}>operating system</em>
          {" "}for your cross-border business.
        </motion.h1>

        <motion.p variants={fadeUp} style={{
          fontFamily: font.sans,
          color:      "#6a6360",
          fontSize:   isMobile ? "0.875rem" : "1.05rem",
          lineHeight: isMobile ? 1.65 : 1.85,
          maxWidth:   580,
          margin:     "0 auto 0",
        }}>
          Advisory expertise. Technology-led delivery. One team across India, UAE,
          Singapore, and the US — handling your{" "}
          <strong style={{ color: C.ink, fontWeight: 600 }}>
            market entry, transactions, and compliance
          </strong>{" "}
          at the speed your business demands.
        </motion.p>
      </motion.div>

      {/* ── 10X wordmark (image) + Globe overlay ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex:   2,
          width:    isMobile ? "98%" : "80%",
          maxWidth: 1000,
          margin:   isMobile ? "-2rem auto 0" : "-3rem auto 0",
        }}
      >
        <img
          src="/usethis.png"
          alt=""
          aria-hidden="true"
          style={{
            display:       "block",
            width:         "100%",
            height:        "auto",
            userSelect:    "none",
            pointerEvents: "none",
          }}
        />

        {/* Globe */}
        <div style={{
          position:      "absolute",
          top:           "50%",
          left:          "46%",
          transform:     "translate(-50%, -50%)",
          width:         isMobile ? "clamp(110px, 24vw, 150px)" : "clamp(160px, 16vw, 280px)",
          height:        isMobile ? "clamp(110px, 24vw, 150px)" : "clamp(160px, 16vw, 280px)",
          zIndex:        4,
          pointerEvents: "auto",
        }}>
          <div style={{
            position:      "absolute",
            inset:         "-50%",
            borderRadius:  "50%",
            background:    "radial-gradient(circle, rgba(235,145,30,0.40) 0%, rgba(235,145,30,0.12) 45%, transparent 72%)",
            filter:        "blur(28px)",
            pointerEvents: "none",
            zIndex:        0,
          }} />
          <GlobeWrapper />
        </div>
      </motion.div>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:       "relative",
          zIndex:         4,
          display:        isMobile ? "flex" : "none",
          flexDirection:  "column",
          gap:            isMobile ? "0.75rem" : "1.25rem",
          alignItems:     "center",
          justifyContent: "center",
          width:          isMobile ? "80%" : "auto",
          marginTop:      isMobile ? "0.25rem" : "1rem",
        }}
      >
        <a href="#cta" style={{ width: isMobile ? "100%" : "auto" }}>
          <button
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#a86e35"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(193,127,62,0.38)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.copper;   e.currentTarget.style.boxShadow = "0 2px 12px rgba(193,127,62,0.28)"; }}
            style={{
              backgroundColor: C.copper,
              color:           "#fff",
              padding:         isMobile ? "0.875rem 1.5rem" : "0.85rem 1.85rem",
              borderRadius:    8,
              fontSize:        "0.88rem",
              fontFamily:      font.sans,
              fontWeight:      600,
              border:          "none",
              cursor:          "pointer",
              letterSpacing:   "0.01em",
              boxShadow:       "0 2px 12px rgba(193,127,62,0.28)",
              transition:      "background-color 0.2s, box-shadow 0.2s",
              width:           isMobile ? "100%" : "auto",
            }}
          >
            Book a free consultation
          </button>
        </a>
        <a href="#team"
          style={{ fontFamily: font.sans, color: C.ink, fontSize: "0.88rem", fontWeight: 500, opacity: 0.7, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", transition: "opacity 0.2s", width: isMobile ? "100%" : "auto" }}
          onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; }}
        >
          Our firm →
        </a>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position:      "absolute",
        bottom:        0,
        left:          0,
        right:         0,
        height:        160,
        background:    `linear-gradient(to bottom, transparent, ${C.bg})`,
        pointerEvents: "none",
        zIndex:        3,
      }} />

    </section>
  )
}
