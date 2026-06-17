"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { C, font } from "@/lib/theme"

const CREAM = "#F5E8E8"

const CYCLING_PHRASES = ["gets you in.", "gets you funded.", "keeps you running."]

function CyclingPhrase() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase]         = useState("typing")

  useEffect(() => {
    const full = CYCLING_PHRASES[phraseIdx]
    let t
    if (phase === "typing") {
      if (displayed.length < full.length) {
        t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 65)
      } else {
        t = setTimeout(() => setPhase("erasing"), 1400)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 30)
      } else {
        setPhraseIdx(i => (i + 1) % CYCLING_PHRASES.length)
        setPhase("typing")
      }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, phraseIdx])

  return (
    <span style={{ color: C.red }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 0.95] }}
        style={{ color: "rgba(255,100,100,0.8)", marginLeft: "2px", fontWeight: 200 }}
      >|</motion.span>
    </span>
  )
}

const SERVICES = [
  {
    num: "01",
    title: "Expand Internationally",
    sub: "Global Market Entry",
    href: "/global-market-entry",
    btnLabel: "I'm expanding to a new region",
    desc: "From entity setup to banking and hiring, we manage your full market entry across India, UAE, Singapore and the US.",
    items: ["Entity setup & incorporation", "Regulatory approvals & FDI compliance", "Tax structuring & transfer pricing", "Employment setup & HR compliance", "Banking & operational readiness"],
    video: "/videos/globally.mp4",
  },
  {
    num: "02",
    title: "Raise Capital or Exit",
    sub: "Deals & Transaction Advisory",
    href: "/deals-transactions",
    btnLabel: "I'm raising or selling",
    desc: "Term sheet to close. We advise on fundraising, M&A, and deal structuring for companies at every stage of growth.",
    items: ["Fundraising advisory & investor readiness", "Term sheet & SHA structuring", "Cap table management", "Cross-border M&A support", "IPO readiness & compliance"],
    video: "/videos/stock.mp4",
  },
  {
    num: "03",
    title: "Run Global Operations",
    sub: "Managed Services",
    href: "/managed-services",
    btnLabel: "I need ongoing support",
    desc: "Accounting, payroll, tax and compliance across every jurisdiction you operate in. One team, one view.",
    items: ["Accounting & financial reporting", "Payroll & HR compliance", "Tax & regulatory filings", "Legal & secretarial compliance", "Virtual CFO services"],
    video: "/videos/operations.mp4",
  },
]

function TypewriterOnce({ text }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    if (!isInView) return
    if (displayed.length >= text.length) return
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 55)
    return () => clearTimeout(t)
  }, [displayed, isInView, text])

  return <span ref={ref}>{displayed}</span>
}

function ServiceCard({ service, index }) {
  const { title, sub, href, btnLabel, desc, items, video } = service
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display:       "flex",
        flexDirection: "column",
        height:        "100%",
        outline:       hovered ? "2px solid #fff" : "2px solid transparent",
        outlineOffset: "-2px",
        transition:    "outline-color 0.25s ease",
      }}>
        {/* Looping local video */}
        <div style={{ height: 220, overflow: "hidden", position: "relative", backgroundColor: "#0d1f3c", flexShrink: 0 }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            src={video}
          />
        </div>

        {/* Content — white bg on hover, transparent normally */}
        <div style={{
          padding:         "1.5rem 1.75rem 1.75rem",
          flex:            1,
          display:         "flex",
          flexDirection:   "column",
          backgroundColor: hovered ? "#ffffff" : "transparent",
          transition:      "background-color 0.25s ease",
        }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.red, marginBottom: "0.65rem" }}>
            {sub}
          </p>
          <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", fontWeight: 700, color: hovered ? "#0d1b35" : "#fff", lineHeight: 1.2, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.25s ease" }}>
            {title} <span style={{ color: C.red, fontWeight: 400, fontSize: "1.1em" }}>›</span>
          </h3>
          <p style={{ fontFamily: font.sans, fontSize: "0.85rem", color: hovered ? "rgba(13,27,53,0.62)" : "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: "1.1rem", transition: "color 0.25s ease" }}>
            {desc}
          </p>

          {/* Bullet items */}
          <div style={{ flex: 1, marginBottom: "1.5rem" }}>
            {items.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.5rem 0",
                borderBottom: `1px solid ${hovered ? "rgba(13,27,53,0.08)" : "rgba(255,255,255,0.07)"}`,
                fontFamily: font.sans, fontSize: "0.8rem",
                color: hovered ? "rgba(13,27,53,0.65)" : "rgba(255,255,255,0.9)",
                lineHeight: 1.4, transition: "color 0.25s ease, border-color 0.25s ease",
              }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: C.red, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          {/* CTA button — red */}
          <motion.span
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#6e1220"; e.currentTarget.querySelector(".btn-arrow").style.transform = "translateX(5px)" }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.red; e.currentTarget.querySelector(".btn-arrow").style.transform = "translateX(0)" }}
            style={{
              display:         "block",
              backgroundColor: C.red,
              color:           "#fff",
              padding:         "0.85rem 1.5rem",
              fontFamily:      font.sans,
              fontSize:        "0.65rem",
              fontWeight:      700,
              letterSpacing:   "0.1em",
              textTransform:   "uppercase",
              textAlign:       "center",
              cursor:          "pointer",
              transition:      "background-color 0.2s",
            }}
          >
            {btnLabel}{" "}
            <span className="btn-arrow" style={{ display: "inline-block", transition: "transform 0.2s ease" }}>→</span>
          </motion.span>
        </div>
      </div>
    </a>
  )
}

export default function () {
  return (
    <section style={{ backgroundColor: "#112240" }}>
      <style>{`
        .why-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .why-cards-grid { grid-template-columns: 1fr; gap: 1rem; } }
      `}</style>

      {/* Header — all centered */}
      <div style={{ padding: "4rem 7vw 3.5rem", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>

        {/* Small heading with logo */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: font.sans, fontSize: "clamp(1.4rem, 2.2vw, 2rem)", fontWeight: 800, color: "rgba(255,255,255,0.65)", lineHeight: 1.18, WebkitFontSmoothing: "antialiased", display: "inline-flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "center", gap: "0.6rem", margin: 0, whiteSpace: "nowrap" }}>
            Why companies choose
            <span style={{ display: "inline-block", flexShrink: 0 }}>
              <Image src="/logo-footer.png" alt="10x Global" width={180} height={46} style={{ objectFit: "contain", display: "block" }} unoptimized />
            </span>
          </h2>
        </div>

        {/* Big cycling heading */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.8vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.25, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", margin: 0 }}>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>One firm that </span><CyclingPhrase />
          </h3>
        </div>

        {/* Paragraph */}
        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", margin: "0 auto", maxWidth: 580 }}>
          Every business crossing a border needs to enter it, fund it, and operate it.{" "}
          <strong style={{ color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>Most firms solve one.</strong>{" "}
          We manage all three with a single integrated team across{" "}
          <strong style={{ color: "rgba(255,255,255,0.72)", fontWeight: 600 }}>finance, legal, and compliance.</strong>
        </p>

      </div>

      {/* Cards panel */}
      <div style={{ padding: "0 4vw 0", maxWidth: 1440, margin: "0 auto" }}>
        <div className="why-cards-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>

      {/* Eyebrow — below cards, centered */}
      <div style={{ padding: "2.5rem 0 4rem", textAlign: "center" }}>
        <span style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
          <TypewriterOnce text="One Firm. Three Critical Functions." />
        </span>
      </div>
    </section>
  )
}
