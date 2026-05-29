"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("10x_loaded")) {
      setVisible(false)
      return
    }
    sessionStorage.setItem("10x_loaded", "1")
    const t = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         9999,
            backgroundColor: C.ink,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexDirection:  "column",
          }}
        >
          {/* Dot grid overlay */}
          <div style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: "radial-gradient(circle, rgba(193,127,62,0.08) 1px, transparent 1px)",
            backgroundSize:  "44px 44px",
            pointerEvents:   "none",
          }} />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ display: "flex", alignItems: "baseline", gap: "0.08em", position: "relative", zIndex: 1 }}
          >
            <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: "clamp(2.8rem,8vw,5rem)", color: C.bg, letterSpacing: "-0.03em", lineHeight: 1 }}>10</span>
            <span style={{ fontFamily: font.serif, fontWeight: 400, fontSize: "clamp(2rem,6vw,3.8rem)", color: C.copper, fontStyle: "italic", margin: "0 0.06em", lineHeight: 1 }}>×</span>
            <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: "clamp(2.8rem,8vw,5rem)", color: C.bg, letterSpacing: "-0.03em", lineHeight: 1 }}>Global</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ fontFamily: font.sans, color: C.bg, fontSize: "0.6rem", letterSpacing: "0.26em", marginTop: "1.25rem", position: "relative", zIndex: 1 }}
          >
            ADVISORY · FINANCE · LEGAL · TECHNOLOGY
          </motion.p>

          {/* Copper progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position:        "absolute",
              bottom:          0,
              left:            0,
              right:           0,
              height:          2,
              background:      `linear-gradient(to right, transparent 0%, ${C.copper} 40%, rgba(193,127,62,0.6) 80%, transparent 100%)`,
              transformOrigin: "left center",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
