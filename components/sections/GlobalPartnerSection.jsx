"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const WORDS  = ["Expansion", "Finance", "Compliance", "Operations", "Growth"]
const SUFFIX = " Partner."

function CyclingPhrase() {
  const [idx, setIdx]             = useState(0)
  const [displayed, setDisplayed] = useState(WORDS[0] + SUFFIX)
  const [phase, setPhase]         = useState("pause")

  useEffect(() => {
    const full = WORDS[idx] + SUFFIX
    let t

    if (phase === "pause") {
      t = setTimeout(() => setPhase("erasing"), 1800)
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 28)
      } else {
        setIdx(i => (i + 1) % WORDS.length)
        setPhase("typing")
      }
    } else {
      if (displayed.length < full.length) {
        t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55)
      } else {
        setPhase("pause")
      }
    }

    return () => clearTimeout(t)
  }, [displayed, phase, idx])

  const keywordDisplayed = displayed.slice(0, Math.min(displayed.length, WORDS[idx].length))
  const suffixDisplayed  = displayed.length > WORDS[idx].length ? displayed.slice(WORDS[idx].length) : ""

  return (
    <>
      <em style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: C.red }}>
        {keywordDisplayed}
      </em>
      <span style={{ color: "#fff" }}>{suffixDisplayed}</span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 0.95] }}
        style={{ color: C.red, marginLeft: "2px", fontWeight: 200 }}
      >|</motion.span>
    </>
  )
}

export default function GlobalPartnerSection() {
  return (
    <section style={{ backgroundColor: C.ink, padding: "clamp(4rem, 5vw, 8rem) 7vw", borderTop: "1px solid rgba(255,255,255,0.15)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}
      >
        {/* Eyebrow */}
        <span style={{
          display:       "block",
          fontFamily:    font.sans,
          fontSize:      "0.58rem",
          fontWeight:    700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.55)",
          fontSize:      "0.72rem",
          marginBottom:  "2rem",
        }}>
          Why Companies Choose 10x Global
        </span>

        {/* Headline */}
        <h2 style={{
          fontFamily:          font.sans,
          fontSize:            "clamp(2.4rem, 5vw, 7rem)",
          fontWeight:          800,
          color:               "#fff",
          lineHeight:          1.06,
          marginBottom:        "2.5rem",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          letterSpacing:       "-0.02em",
          whiteSpace:          "nowrap",
        }}>
          Your Global <CyclingPhrase />
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: font.sans,
          fontSize:   "0.9rem",
          color:      "rgba(255,255,255,0.48)",
          lineHeight: 1.9,
          maxWidth:   620,
          margin:     "0 auto",
          textAlign:  "center",
        }}>
          Every business crossing a border needs to enter it, fund it, and operate it.{" "}
          <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
            Most firms solve one.
          </strong>{" "}
          We manage all three with a single integrated team across{" "}
          <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
            finance, legal, and compliance.
          </strong>
        </p>
      </motion.div>
    </section>
  )
}
