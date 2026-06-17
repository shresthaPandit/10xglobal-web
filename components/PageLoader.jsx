"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { C, font } from "@/lib/theme"

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem("10x_loaded")) {
      setVisible(false)
      return
    }
    // Set key AFTER loader finishes so hero can detect first visit
    const t = setTimeout(() => {
      sessionStorage.setItem("10x_loaded", "1")
      setVisible(false)
    }, 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          9999,
            backgroundColor: "#FFFFFF",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            flexDirection:   "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <Image src="/logo.png" alt="10✕Global" width={240} height={64} style={{ objectFit: "contain" }} priority />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              fontFamily:    font.sans,
              color:         C.ink,
              fontSize:      "0.68rem",
              letterSpacing: "0.28em",
              marginTop:     "1.4rem",
              textTransform: "uppercase",
              position:      "relative",
              zIndex:        1,
            }}
          >
            Advisory · Finance · Legal · Technology
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position:        "absolute",
              bottom:          0,
              left:            0,
              right:           0,
              height:          2,
              background:      `linear-gradient(to right, transparent 0%, ${C.gold} 40%, rgba(154,123,60,0.5) 80%, transparent 100%)`,
              transformOrigin: "left center",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
