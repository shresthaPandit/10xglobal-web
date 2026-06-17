"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { font } from "@/lib/theme"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"

const RED   = "#8C1A2B"
const WHITE = "#FFFFFF"
const CREAM = "#FFFFFF"
const INK   = "#1C1712"
const MUTED = "#6B6560"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const SERVICES = [
  {
    n: "01", title: "Fundraising Advisory",
    body: "From preparing for a round to closing it, we advise on pre-fundraise structuring, investor-readiness, term sheet negotiation, shareholder agreements, and regulatory filings. Seed through growth rounds.",
    scope: ["Term sheet review & negotiation", "SHA / SSA drafting", "ESOP structuring", "Cap table management", "Exchange control compliances"],
  },
  {
    n: "02", title: "Cross-Border M&A",
    body: "Buy-side and sell-side across India, UAE, Singapore and the US. We advise on deal structuring, valuation inputs, due diligence coordination, SPA negotiation, and post-merger integration.",
    scope: ["Deal structuring & architecture", "SPA / MPA drafting", "Tax-efficient structuring", "Post-merger integration", "Multi-jurisdiction coordination"],
  },
  {
    n: "03", title: "Financial & Legal Due Diligence",
    body: "We conduct financial, tax, and legal due diligence for acquirers, investors, and lenders. We surface risks, quantify exposures, and produce reports that inform decisions.",
    scope: ["Financial due diligence", "Tax due diligence", "Legal due diligence", "Red flag reports", "Management Q&A support"],
  },
  {
    n: "04", title: "Deal Structuring & Documentation",
    body: "Transaction architecture, definitive agreement drafting, and conditions precedent management through to closing, for complex, multi-party, or regulatory-sensitive transactions.",
    scope: ["Transaction architecture design", "Definitive agreement drafting", "Conditions precedent management", "Closing coordination", "Post-closing filings"],
  },
]

const STAGES = [
  { n: 1, label: "Pre-seed / Seed",  desc: "Holding structure, ESOP plan, first investor docs" },
  { n: 2, label: "Series A",         desc: "Term sheet, SHA, RBI filings, cap table clean-up" },
  { n: 3, label: "Series B / C",     desc: "DD readiness, complex SHA, cross-border structuring" },
  { n: 4, label: "Growth / Pre-IPO", desc: "Cap table management, ESOP vesting, compliance clean-up" },
  { n: 5, label: "M&A / Exit",       desc: "Buy/sell-side advisory, due diligence, SPA" },
  { n: 6, label: "IPO",              desc: "IPO readiness, DRHP support, compliance" },
]

const FAQS = [
  {
    q: "What transaction services does 10x Global specialise in?",
    a: "We offer end-to-end transaction support: fundraising advisory, cross-border M&A, financial and legal due diligence, deal structuring and documentation, and post-closure compliance. All delivered by one integrated team across India, the UAE, Singapore and the United States.",
  },
  {
    q: "How does 10x Global approach deal structuring?",
    a: "We design structures to minimise tax impact while ensuring full compliance with exchange control, FDI and other applicable regulations. We develop a step-by-step implementation plan and oversee the process from the first term sheet to the final filing.",
  },
  {
    q: "What is your approach to business valuation?",
    a: "We combine data-driven methodology with deep sector knowledge to produce valuations that are rigorous and defensible in due diligence. Full business projections and information memoranda are prepared as part of the process.",
  },
  {
    q: "How comprehensive is your due diligence service?",
    a: "Financial, legal and regulatory review by a single integrated team. Because all disciplines work together, we identify issues that fragmented teams routinely miss: a tax exposure intersecting with a legal gap, or a compliance risk that affects the deal structure.",
  },
  {
    q: "Do you assist with post-closure implementation?",
    a: "Yes. Post-closure is where many transactions quietly unravel. We manage every regulatory filing, integration step and compliance obligation that follows signing, ensuring the structure holds through the transition.",
  },
]

export default function DealsPage() {
  const [openFaq,       setOpenFaq]       = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [userTouched,   setUserTouched]   = useState(false)
  const [showContact,   setShowContact]   = useState(false)

  // Auto-cycle nodes until user interacts
  useEffect(() => {
    if (userTouched) return
    const t = setInterval(() => setActiveService(i => (i + 1) % 4), 2800)
    return () => clearInterval(t)
  }, [userTouched])

  useEffect(() => {
    const css = document.createElement('link')
    css.href = 'https://assets.calendly.com/assets/external/widget.css'
    css.rel = 'stylesheet'
    document.head.appendChild(css)
    const js = document.createElement('script')
    js.src = 'https://assets.calendly.com/assets/external/widget.js'
    js.async = true
    document.head.appendChild(js)
  }, [])

  return (
    <>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <Navbar />
      <main style={{ backgroundColor: WHITE, fontFamily: font.sans }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section style={{ padding: "7rem 0 5rem", backgroundColor: WHITE }}>
          <div className="page-hero-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Deals & Transaction Advisory</span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: font.sans, fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)", fontWeight: 800, lineHeight: 0.88, color: INK }}>
                The deal<br />deserves<br />advisors who've<br /><em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>done this before.</em>
              </motion.h1>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ paddingTop: "1rem" }}>
              {[
                { text: "Fundraising rounds, M&A transactions, and complex deal structuring require more than legal paperwork. They require advisors who understand the financial architecture, the regulatory constraints, the investor psychology, and the post-transaction reality, all at once.", bold: false },
                { text: "We have advised companies from seed rounds to IPO. We have structured cross-border M&A transactions across India, UAE, Singapore, and the US. We have been in the room when deals nearly fell apart. We held them together.", bold: false },
                { text: "No handoffs. No gaps. No surprises on closing day.", bold: true },
              ].map((p, i) => (
                <motion.p key={i} variants={fadeUp} style={{ fontFamily: font.sans, fontSize: p.bold ? "1rem" : "1.05rem", fontWeight: p.bold ? 700 : 450, color: p.bold ? INK : MUTED, lineHeight: 1.85, marginBottom: "1.25rem" }}>
                  {p.text}
                </motion.p>
              ))}
              <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                <button
                  onClick={() => setShowContact(true)}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#6e1220" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = INK }}
                  style={{ backgroundColor: INK, color: "#fff", padding: "0.9rem 1.75rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", transition: "background-color 0.2s" }}>
                  Talk to our deal team →
                </button>
                <button
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(28,23,18,0.05)" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent" }}
                  style={{ backgroundColor: "transparent", color: INK, padding: "0.9rem 1.75rem", border: "1.5px solid rgba(28,23,18,0.25)", cursor: "pointer", fontFamily: font.sans, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.08em", transition: "background-color 0.2s" }}>
                  See our work
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── JOURNEY CARDS ─────────────────────────────────────────── */}
        <section style={{ padding: "0 0 5rem", backgroundColor: WHITE }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textAlign: "center", marginBottom: "1.75rem" }}>
              Tell us where you are in the journey
            </p>
            <div className="cards-3col">
              {["I am raising capital", "I'm getting acquired or merged", "I am preparing for exit"].map(label => (
                <div key={label} onClick={() => setShowContact(true)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 36px rgba(140,26,43,0.2)"
                    const card = e.currentTarget.querySelector(".journey-inner")
                    card.style.backgroundColor = RED
                    card.style.borderColor = RED
                    card.querySelector(".card-label").style.color = "#fff"
                    card.querySelector(".card-arrow").style.color = "#fff"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    const card = e.currentTarget.querySelector(".journey-inner")
                    card.style.backgroundColor = "transparent"
                    card.style.borderColor = "rgba(140,26,43,0.4)"
                    card.querySelector(".card-label").style.color = INK
                    card.querySelector(".card-arrow").style.color = RED
                  }}
                  style={{ cursor: "pointer", display: "block", transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)", borderRadius: 12 }}>
                  <div className="journey-inner" style={{ border: "1.5px solid rgba(140,26,43,0.4)", borderRadius: 12, padding: "1.6rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "background-color 0.25s, border-color 0.25s" }}>
                    <span className="card-label" style={{ fontFamily: font.sans, fontSize: "1.25rem", fontWeight: 700, color: INK, transition: "color 0.25s" }}>{label}</span>
                    <span className="card-arrow" style={{ color: RED, fontSize: "1.25rem", fontWeight: 600, transition: "color 0.25s" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ───────────────────────────────────────────── */}
        <section style={{ padding: "6rem 0", backgroundColor: WHITE, borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="who-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>How We Work</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, color: INK, lineHeight: 1.15 }}>
                  No handoffs.<br /><em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>One brief.</em>
                </h2>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ fontFamily: font.sans, fontSize: "1.05rem", fontWeight: 450, color: MUTED, lineHeight: 1.85, paddingTop: "3.5rem" }}>
                Most transactions fail not because the deal was wrong, but because the advisors were working in silos. Your CA did not know what your lawyer agreed to. Your tax advisor was brought in too late. We built 10x Global specifically to fix this.
              </motion.p>
            </div>

          </div>
        </section>

        {/* ── WHAT WE DO ────────────────────────────────────────────── */}
        <section style={{ padding: "5rem 0 6rem", backgroundColor: "#F5F5F5", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ marginBottom: "4rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>
                What We Do
              </span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.1, marginTop: "0.6rem" }}>
                The full transaction <em style={{ fontStyle: "normal", color: RED }}>lifecycle.</em>
              </h2>
            </motion.div>

            {/* Circle + Details */}
            <div className="lifecycle-circle-grid">

              {/* ── SVG circle diagram ── */}
              <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                <svg
                  viewBox="0 0 480 480"
                  style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto", overflow: "visible" }}
                >
                  <defs>
                    <path id="wwd-a01" d="M240,60 A180,180 0 0,1 420,240" />
                    <path id="wwd-a02" d="M420,240 A180,180 0 0,1 240,420" />
                    <path id="wwd-a03" d="M240,420 A180,180 0 0,1 60,240" />
                    <path id="wwd-a04" d="M60,240 A180,180 0 0,1 240,60" />
                  </defs>

                  {/* Base grey arcs */}
                  {["M240,60 A180,180 0 0,1 420,240","M420,240 A180,180 0 0,1 240,420","M240,420 A180,180 0 0,1 60,240","M60,240 A180,180 0 0,1 240,60"].map((d, i) => (
                    <motion.path key={i} d={d} fill="none"
                      animate={{ stroke: activeService === i ? RED : "rgba(28,23,18,0.1)", strokeWidth: activeService === i ? 2 : 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  ))}

                  {/* Active arc draws in */}
                  <AnimatePresence>
                    <motion.path
                      key={`arc-${activeService}`}
                      d={["M240,60 A180,180 0 0,1 420,240","M420,240 A180,180 0 0,1 240,420","M240,420 A180,180 0 0,1 60,240","M60,240 A180,180 0 0,1 240,60"][activeService]}
                      fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>

                  {/* Curved text labels along arcs */}
                  {[
                    { href: "#wwd-a01", label: "FUNDRAISING ADVISORY",    offset: "8%"  },
                    { href: "#wwd-a02", label: "CROSS-BORDER M&A",         offset: "18%" },
                    { href: "#wwd-a03", label: "DUE DILIGENCE",            offset: "24%" },
                    { href: "#wwd-a04", label: "DEAL STRUCTURING",         offset: "18%" },
                  ].map(({ href, label, offset }, i) => (
                    <text key={i} style={{ userSelect: "none" }}>
                      <textPath href={href} startOffset={offset}>
                        <tspan fontFamily={font.sans} fontSize="7.5" letterSpacing="2.2"
                          fill={activeService === i ? RED : "rgba(28,23,18,0.28)"}
                          fontWeight="700" dy="-9">
                          {label}
                        </tspan>
                      </textPath>
                    </text>
                  ))}

                  {/* Center watermark */}
                  <AnimatePresence mode="wait">
                    <motion.text key={`wm-${activeService}`}
                      x={240} y={258} textAnchor="middle" dominantBaseline="central"
                      fontFamily={font.num} fontSize="130" fontStyle="italic"
                      fill={RED}
                      initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ userSelect: "none" }}
                    >
                      {SERVICES[activeService].n}
                    </motion.text>
                  </AnimatePresence>

                  {/* Nodes */}
                  {[{ cx: 240, cy: 60 },{ cx: 420, cy: 240 },{ cx: 240, cy: 420 },{ cx: 60, cy: 240 }].map(({ cx, cy }, i) => (
                    <g key={i}
                      onMouseEnter={() => { setUserTouched(true); setActiveService(i) }}
                      onClick={() => { setUserTouched(true); setActiveService(i) }}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Halo */}
                      <circle cx={cx} cy={cy} r={34}
                        fill={`rgba(140,26,43,${activeService === i ? 0.1 : 0})`}
                        style={{ transition: "fill 0.35s" }}
                      />
                      {/* Node circle */}
                      <motion.circle cx={cx} cy={cy} r={24}
                        animate={{ fill: activeService === i ? RED : "#fff", stroke: activeService === i ? RED : "rgba(28,23,18,0.18)" }}
                        strokeWidth={1.5}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.12 }}
                      />
                      {/* Number */}
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fontFamily={font.num} fontSize="11" fontStyle="italic" fontWeight="700"
                        fill={activeService === i ? "#fff" : RED}
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      >
                        {SERVICES[i].n}
                      </text>
                    </g>
                  ))}

                </svg>
              </motion.div>

              {/* ── Details panel ── */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                <p style={{ fontFamily: font.num, fontSize: "0.65rem", letterSpacing: "0.14em", color: "rgba(28,23,18,0.3)", marginBottom: "2rem" }}>
                  {SERVICES[activeService].n}&nbsp;<span style={{ opacity: 0.5 }}>/ 04</span>
                </p>

                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, color: INK, lineHeight: 1.15, marginBottom: "1.25rem" }}>
                      {SERVICES[activeService].title}
                    </h3>
                    <div style={{ width: 36, height: 1.5, backgroundColor: RED, opacity: 0.7, marginBottom: "1.5rem" }} />
                    <p style={{ fontFamily: font.sans, fontSize: "0.88rem", fontWeight: 400, color: MUTED, lineHeight: 1.88, marginBottom: "2.25rem", maxWidth: 440 }}>
                      {SERVICES[activeService].body}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      {SERVICES[activeService].scope.map((item, j) => (
                        <motion.div key={item}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.065, duration: 0.3 }}
                          style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}
                        >
                          <span style={{ width: 16, height: 1, backgroundColor: RED, flexShrink: 0, opacity: 0.6 }} />
                          <span style={{ fontFamily: font.sans, fontSize: "0.8rem", fontWeight: 450, color: MUTED, lineHeight: 1.5 }}>
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Next node button — bottom of panel */}
                <div
                  onClick={() => { setUserTouched(true); setActiveService(i => (i + 1) % 4) }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "2.5rem", cursor: "pointer", alignSelf: "flex-start" }}
                >
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1 }}
                    style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(140,26,43,0.25)" }}
                  >
                    <span style={{ color: "#fff", fontSize: "0.9rem", lineHeight: 1 }}>→</span>
                  </motion.div>
                  <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(28,23,18,0.38)" }}>
                    Next
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── GROWTH TIMELINE ───────────────────────────────────────── */}
        <section style={{ padding: "6rem 0", backgroundColor: CREAM }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, color: INK, lineHeight: 1.2 }}>
                Trusted at <em style={{ fontStyle: "normal", color: RED }}>every stage of growth.</em>
              </h2>
            </motion.div>

            <div style={{ position: "relative" }}>
              <div className="stages-timeline-line" style={{ position: "absolute", top: 29, left: "8.33%", right: "8.33%", height: 1, backgroundColor: RED, zIndex: 0 }} />
              <div className="stages-6col">
                {STAGES.map((s, i) => (
                  <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className={`stage-item${i % 2 === 1 ? " stage-item-even" : ""}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    {/* outer halo ring */}
                    <div className="stage-circle" style={{ width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(140,26,43,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", flexShrink: 0, position: "relative", zIndex: 1 }}>
                      {/* inner solid circle */}
                      <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: font.num, fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{s.n}</span>
                      </div>
                    </div>
                    <div className="stage-text">
                      <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: RED, marginBottom: "0.4rem" }}>Stage {s.n}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "1.05rem", fontWeight: 400, color: INK, marginBottom: "0.5rem", lineHeight: 1.25 }}>{s.label}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.75rem", fontWeight: 450, color: MUTED, lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WE ALSO INVEST ────────────────────────────────────────── */}
        <section style={{ padding: "6rem 0", backgroundColor: WHITE, borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="cards-3col">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>We Also Invest</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: INK, lineHeight: 1.3 }}>
                  We did not build an investment platform to find new companies. We built it to back the ones we already know.
                </h2>
              </motion.div>

              {[
                { tag: "PRIVATE EQUITY · 10x GLOBAL", title: "Equity Fund",  body: "A services-led equity platform that invests only in businesses we already know through our advisory work. Proprietary deal flow, no auctions." },
                { tag: "PRIVATE CREDIT · 10x GLOBAL", title: "Credit Fund",  body: "A disciplined short-duration credit fund. Capital deployed only where we have real operating visibility, not just financial projections." },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i + 1) * 0.1 }}
                  style={{ borderLeft: `3px solid ${RED}`, padding: "1.75rem", backgroundColor: "#F5F5F5" }}>
                  <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", color: RED, marginBottom: "0.85rem" }}>{card.tag}</p>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.5rem", fontWeight: 700, color: INK, marginBottom: "0.85rem", lineHeight: 1.25 }}>{card.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.92rem", fontWeight: 450, color: MUTED, lineHeight: 1.8, marginBottom: "1.25rem" }}>{card.body}</p>
                  <a href="#" style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED, textDecoration: "none" }}>
                    Explore →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ padding: "6rem 0", backgroundColor: WHITE, borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="contact-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Questions We Get Asked</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.2 }}>
                  Before we <em style={{ fontStyle: "normal", color: RED }}>interact,</em><br />some answers.
                </h2>
              </motion.div>

              <div>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ borderTop: "1px solid rgba(28,23,18,0.1)" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1.5rem" }}>
                      <span style={{ fontFamily: font.sans, fontSize: "1.2rem", fontWeight: 600, color: INK, lineHeight: 1.4 }}>{faq.q}</span>
                      <span style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        backgroundColor: openFaq === i ? RED : "transparent",
                        border: `1px solid ${openFaq === i ? RED : "rgba(28,23,18,0.2)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: font.sans, fontSize: "1.1rem", color: openFaq === i ? "#fff" : INK,
                        transition: "all 0.25s",
                      }}>
                        {openFaq === i ? "×" : "+"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                          <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 450, color: MUTED, lineHeight: 1.85, paddingBottom: "1.75rem" }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div style={{ height: 1, backgroundColor: "rgba(28,23,18,0.1)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section style={{ padding: "8rem 0", backgroundColor: CREAM, textAlign: "center" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
              <div style={{ width: 32, height: 1, backgroundColor: RED }} />
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Start the Conversation</span>
              <div style={{ width: 32, height: 1, backgroundColor: RED }} />
            </div>
            <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.5rem, 5vw, 4.25rem)", fontWeight: 800, color: INK, lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Tell us about the transaction.
            </h2>
            <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.5rem, 5vw, 4.25rem)", fontWeight: 800, fontStyle: "normal", color: RED, lineHeight: 1.15, marginBottom: "2rem" }}>
              We'll tell you how we can help.
            </h2>
            <p style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 450, color: MUTED, lineHeight: 1.85, marginBottom: "2rem" }}>
              Free 30-minute consultation with our transaction advisory team. Confidential.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.75rem" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", marginBottom: "0.75rem", border: "2px solid rgba(140,26,43,0.18)" }}>
                <Image src="/team/megha.png" alt="Megha Soni" width={80} height={80} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </div>
              <p style={{ fontFamily: font.sans, fontWeight: 600, fontSize: "0.85rem", color: INK, marginBottom: "0.2rem" }}>Megha Soni</p>
              <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: MUTED }}>Lead, Startups</p>
            </div>
            <button
              onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/msoni-10x/30min" })}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#6e1220" }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = INK }}
              style={{ backgroundColor: INK, color: "#fff", padding: "1.1rem 2.5rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", transition: "background-color 0.2s" }}>
              Book Megha's Calendar →
            </button>
          </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
