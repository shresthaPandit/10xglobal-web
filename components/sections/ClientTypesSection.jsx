"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const WORDS  = ["Expansion", "Finance", "Compliance", "Operations", "Growth"]
const SUFFIX = " Partner."

function CyclingPhrase({ onWordChange }) {
  const [idx, setIdx]             = useState(0)
  const [displayed, setDisplayed] = useState(WORDS[0] + SUFFIX)
  const [phase, setPhase]         = useState("pause")

  useEffect(() => { onWordChange?.(idx) }, [idx])

  useEffect(() => {
    const full = WORDS[idx] + SUFFIX
    let t
    if (phase === "pause") {
      t = setTimeout(() => setPhase("erasing"), 1800)
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 28)
      } else { setIdx(i => (i + 1) % WORDS.length); setPhase("typing") }
    } else {
      if (displayed.length < full.length) {
        t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55)
      } else { setPhase("pause") }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, idx])

  const keywordDisplayed = displayed.slice(0, Math.min(displayed.length, WORDS[idx].length))
  const suffixDisplayed  = displayed.length > WORDS[idx].length ? displayed.slice(WORDS[idx].length) : ""

  return (
    <>
      <em style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: C.red }}>{keywordDisplayed}</em>
      <span style={{ color: "#fff" }}>{suffixDisplayed}</span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 0.95] }}
        style={{ color: C.red, marginLeft: "2px", fontWeight: 200 }}
      >|</motion.span>
    </>
  )
}

const CLIENTS = [
  {
    title: "Venture-Backed Companies",
    sub:   "From Seed to IPO",
    body:  "We've advised founders through every funding round, regulatory challenge, and international expansion milestone. We understand what it means when a term sheet is on the table and the structure isn't ready.",
    tags:  ["Fundraising", "M&A", "Cap Table"],
  },
  {
    title: "Global Enterprises",
    sub:   "Entering Asia and the Middle East",
    body:  "International companies setting up in India or the UAE need a partner who understands the regulatory landscape, the pace of business, and how to build an operation that actually works.",
    tags:  ["Market Entry", "Operations", "Compliance"],
  },
  {
    title: "PE & VC Funds",
    sub:   "Portfolio Expansion and Governance",
    body:  "Fund managers and their portfolio companies need integrated due diligence, ongoing compliance, and cross-border structuring across multiple entities without managing a dozen advisors.",
    tags:  ["Due Diligence", "Portfolio", "Governance"],
  },
  {
    title: "Founder-Led Businesses",
    sub:   "Growth Without Operational Complexity",
    body:  "Ambitious founders who want to grow across borders without building an in-house finance, legal, and compliance team in every country. We become that team.",
    tags:  ["Finance", "Legal", "Cross-border"],
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClientCard({ client, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="ct-card-wrap"
      style={{ height: "100%" }}
    >
      {/* Spinning border layer */}
      <div className="ct-card-border" aria-hidden="true" />

      {/* Card inner */}
      <div className="ct-card-inner">

        {/* Title block */}
        <div style={{ marginBottom: "0.6rem" }}>
          <h3 style={{
            fontFamily:   font.sans,
            fontSize:     "clamp(1.15rem, 1.6vw, 1.45rem)",
            fontWeight:   800,
            color:        "#ffffff",
            lineHeight:   1.2,
            margin:       0,
          }}>
            {client.title}
          </h3>
          <p style={{
            fontFamily:    font.sans,
            fontSize:      "0.6rem",
            fontWeight:    700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "#ff6b5b",
            marginTop:     "0.4rem",
            marginBottom:  0,
          }}>
            {client.sub}
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "0.75rem 0" }} />

        {/* Body */}
        <p style={{
          fontFamily:   font.sans,
          fontSize:     "0.9rem",
          color:        "rgba(255,255,255,0.92)",
          lineHeight:   1.8,
          marginBottom: "1rem",
        }}>
          {client.body}
        </p>

        {/* Tag list with check icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
          {client.tags.map(tag => (
            <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <div style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                width:           20,
                height:          20,
                borderRadius:    "50%",
                backgroundColor: C.red,
                flexShrink:      0,
              }}>
                <CheckIcon />
              </div>
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "0.82rem",
                fontWeight:    500,
                color:         "#ffffff",
                letterSpacing: "0.01em",
              }}>
                {tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default function ClientTypesSection() {
  const [activeWordIdx, setActiveWordIdx] = useState(0)
  return (
    <section style={{ position: "relative", padding: "clamp(4rem, 5vw, 8rem) 7vw", overflow: "hidden", willChange: "transform" }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline preload="none"
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          objectFit:     "cover",
          objectPosition:"center center",
          zIndex:        0,
        }}
        src="/videos/ct-bg.mp4"
      />
      {/* Dark overlay so content stays readable */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundColor: "rgba(8,16,30,0.74)",
        zIndex:          1,
      }} />
      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 3.5rem;
          align-items: stretch;
        }
        @media (max-width: 767px) { .ct-grid { grid-template-columns: 1fr; } }

        /* Card wrapper — provides the 1.5px border space */
        .ct-card-wrap {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          height: 100%;
          box-sizing: border-box;
        }

        /* No border animation */
        .ct-card-border { display: none; }

        /* Inner card — sits above border */
        .ct-card-inner {
          position: relative;
          z-index: 1;
          border-radius: calc(1rem - 1.5px);
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(255,255,255,0.05);
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>

        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 620 }}
            >
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "0.58rem",
                fontWeight:    700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.55)",
                display:       "block",
                marginBottom:  "1.1rem",
              }}>
                Why Companies Choose 10x Global
              </span>

              <h2 style={{
                fontFamily:          font.sans,
                fontSize:            "clamp(2rem, 3.5vw, 3.5rem)",
                fontWeight:          800,
                color:               "#fff",
                lineHeight:          1.12,
                marginBottom:        "1.25rem",
                WebkitFontSmoothing: "antialiased",
                whiteSpace:          "nowrap",
              }}>
                Your Global <CyclingPhrase onWordChange={setActiveWordIdx} />
              </h2>

              <p style={{
                fontFamily:   font.sans,
                fontSize:     "0.9rem",
                color:        "rgba(255,255,255,0.52)",
                lineHeight:   1.85,
                marginBottom: "1.5rem",
              }}>
                Every business crossing a border needs to enter it, fund it, and operate it.{" "}
                <strong style={{ color: "rgba(255,255,255,0.82)" }}>Most firms solve one.</strong>{" "}
                We manage all three with a single integrated team across{" "}
                <strong style={{ color: "rgba(255,255,255,0.82)" }}>finance, legal, and compliance.</strong>
              </p>

              {/* Word pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily:      font.sans,
                      fontSize:        "0.62rem",
                      fontWeight:      700,
                      letterSpacing:   "0.16em",
                      textTransform:   "uppercase",
                      color:           i === activeWordIdx ? C.red : "rgba(255,255,255,0.5)",
                      border:          `1px solid ${i === activeWordIdx ? C.red : "rgba(255,255,255,0.18)"}`,
                      padding:         "0.45rem 0.9rem",
                      borderRadius:    "4px",
                      backgroundColor: i === activeWordIdx ? "rgba(184,50,40,0.15)" : "rgba(255,255,255,0.05)",
                      transition:      "color 0.3s, border-color 0.3s, background-color 0.3s",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>

        <div className="ct-grid">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.title} client={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
