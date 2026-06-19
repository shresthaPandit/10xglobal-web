"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { font } from "@/lib/theme"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"

const RED   = "#8C1A2B"
const WHITE = "#FFFFFF"
const INK   = "#1C1712"
const MUTED = "#6B6560"

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
  { q: "What transaction services does 10x Global specialise in?",    a: "We offer end-to-end transaction support: fundraising advisory, cross-border M&A, financial and legal due diligence, deal structuring and documentation, and post-closure compliance. All delivered by one integrated team across India, the UAE, Singapore and the United States." },
  { q: "How does 10x Global approach deal structuring?",              a: "We design structures to minimise tax impact while ensuring full compliance with exchange control, FDI and other applicable regulations. We develop a step-by-step implementation plan and oversee the process from the first term sheet to the final filing." },
  { q: "What is your approach to business valuation?",                a: "We combine data-driven methodology with deep sector knowledge to produce valuations that are rigorous and defensible in due diligence. Full business projections and information memoranda are prepared as part of the process." },
  { q: "How comprehensive is your due diligence service?",            a: "Financial, legal and regulatory review by a single integrated team. Because all disciplines work together, we identify issues that fragmented teams routinely miss: a tax exposure intersecting with a legal gap, or a compliance risk that affects the deal structure." },
  { q: "Do you assist with post-closure implementation?",             a: "Yes. Post-closure is where many transactions quietly unravel. We manage every regulatory filing, integration step and compliance obligation that follows signing, ensuring the structure holds through the transition." },
]

const JOURNEY = [
  { label: "I am raising capital",             image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&q=80", tag: "Fundraising" },
  { label: "I'm getting acquired or merged",   image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80", tag: "M&A"         },
  { label: "I am preparing for exit",          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80", tag: "Exit"        },
]

const INVEST_CARDS = [
  {
    tag: "PRIVATE EQUITY · 10x GLOBAL", title: "Equity Fund",
    body: "A services-led equity platform that invests only in businesses we already know through our advisory work. Proprietary deal flow, no auctions.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=80",
  },
  {
    tag: "PRIVATE CREDIT · 10x GLOBAL", title: "Credit Fund",
    body: "A disciplined short-duration credit fund. Capital deployed only where we have real operating visibility, not just financial projections.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=900&q=80",
  },
]

// ─── Count-up KPI ────────────────────────────────────────────────────────────

function CountUpStat({ target, prefix = "", suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

// ─── 3D Tilt Journey Card ────────────────────────────────────────────────────

function JourneyCard({ item, onClick, index }) {
  const ref       = useRef(null)
  const [tilt, setTilt]     = useState({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const [hovered, setHovered] = useState(false)

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top)  / rect.height
    setTilt({ rx: (py - 0.5) * -14, ry: (px - 0.5) * 14, gx: px * 100, gy: py * 100 })
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 }) }}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "clamp(280px, 22vw, 380px)",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: hovered ? "transform 0.08s ease, box-shadow 0.3s ease" : "transform 0.55s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(140,26,43,0.22)"
          : "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image with scale-on-hover */}
      <div style={{
        position: "absolute", inset: 0,
        transform: `scale(${hovered ? 1.07 : 1})`,
        transition: "transform 0.65s ease",
      }}>
        <img src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, rgba(12,26,46,0.28) 0%, rgba(12,26,46,0.82) 100%)" }} />

      {/* Mouse-tracked gloss */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,${hovered ? 0.07 : 0}) 0%, transparent 55%)`,
        transition: "opacity 0.35s",
      }} />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#fff", background: "rgba(140,26,43,0.8)", padding: "0.32rem 0.72rem", borderRadius: 3, width: "fit-content",
        }}>
          {item.tag}
        </span>
        <div>
          <p style={{ fontFamily: font.sans, fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: "0.65rem" }}>
            {item.label}
          </p>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: hovered ? "#fff" : "rgba(255,255,255,0.48)", transition: "color 0.25s",
          }}>
            Get started
            <span style={{ display: "inline-block", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.25s" }}>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DealsPage() {
  const [openFaq,       setOpenFaq]       = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [showContact,   setShowContact]   = useState(false)


  useEffect(() => {
    const css = document.createElement("link")
    css.href = "https://assets.calendly.com/assets/external/widget.css"
    css.rel  = "stylesheet"
    document.head.appendChild(css)
    const js = document.createElement("script")
    js.src   = "https://assets.calendly.com/assets/external/widget.js"
    js.async = true
    document.head.appendChild(js)
  }, [])

  return (
    <>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <Navbar />
      <main style={{ backgroundColor: WHITE, fontFamily: font.sans }}>

        {/* ── HERO — white ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "8rem 0 5rem" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "6vw", alignItems: "center" }}>

              {/* LEFT — heading */}
              <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "2rem" }}>
                  Deals & Transaction Advisory
                </span>
                <h1 style={{ fontFamily: font.sans, fontSize: "clamp(3.2rem, 5.5vw, 6rem)", fontWeight: 800, lineHeight: 0.92, color: INK, letterSpacing: "-0.03em", margin: 0 }}>
                  The deal<br />deserves<br />advisors<br />who've<br />
                  <em style={{ fontStyle: "normal", color: RED }}>done this<br />before.</em>
                </h1>
              </motion.div>

              {/* RIGHT — stats + body + CTAs */}
              <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                {/* Stat strip */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.65rem", marginBottom: "2.5rem" }}>
                  {[
                    { target: 200, prefix: "",   suffix: "+",  l: "Transactions"  },
                    { target: 5000, prefix: "₹", suffix: "Cr", l: "Deal Value"    },
                    { target: 4,   prefix: "",   suffix: "",   l: "Jurisdictions" },
                  ].map(({ target, prefix, suffix, l }, i) => (
                    <motion.div key={l}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ backgroundColor: "#F7F5F2", border: "1px solid rgba(28,23,18,0.08)", borderRadius: 14, padding: "1.25rem 1.1rem 1.1rem", textAlign: "center" }}>
                      <div style={{ fontFamily: font.sans, fontSize: "clamp(1.4rem, 2vw, 2rem)", fontWeight: 800, color: INK, lineHeight: 1, letterSpacing: "-0.02em" }}>
                        <CountUpStat target={target} prefix={prefix} suffix={suffix} duration={1400} />
                      </div>
                      <div style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginTop: "0.5rem" }}>{l}</div>
                    </motion.div>
                  ))}
                </div>

                <p style={{ fontFamily: font.sans, fontSize: "1rem", color: MUTED, lineHeight: 1.8, marginBottom: "0.75rem" }}>
                  Fundraising rounds, M&A transactions, and complex deal structuring require advisors who understand the financial architecture, regulatory constraints, investor psychology, and post-transaction reality — all at once.
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "0.88rem", fontWeight: 700, color: MUTED, lineHeight: 1.7, marginBottom: "2.25rem" }}>
                  No handoffs. No gaps. No surprises on closing day.
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button onClick={() => setShowContact(true)}
                    style={{ backgroundColor: RED, color: WHITE, padding: "0.95rem 1.75rem", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "opacity 0.2s, transform 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)" }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}>
                    Talk to our deal team →
                  </button>
                  <button
                    style={{ backgroundColor: "transparent", color: INK, padding: "0.95rem 1.75rem", border: "1.5px solid rgba(28,23,18,0.22)", borderRadius: 8, cursor: "pointer", fontFamily: font.sans, fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = INK}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(28,23,18,0.22)"}>
                    See our work
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── JOURNEY — 3D image tilt cards ────────────────────────── */}
        <section style={{ padding: "6rem 0 7rem", background: "#fff" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textAlign: "center", marginBottom: "2rem" }}>
              Tell us where you are in the journey
            </motion.p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {JOURNEY.map((item, i) => (
                <JourneyCard key={item.tag} item={item} onClick={() => setShowContact(true)} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK — deep dark ink ─────────────────────────── */}
        <section style={{ padding: "8rem 0", background: "#0C1A2E", position: "relative", overflow: "hidden" }}>
          {/* Large watermark text */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "clamp(7rem, 16vw, 20rem)", fontWeight: 800, color: "rgba(255,255,255,0.022)", lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap", fontFamily: font.sans, letterSpacing: "-0.06em" }}>
            ONE BRIEF
          </div>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw", position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6vw", alignItems: "center" }}>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#e8394f", display: "block", marginBottom: "1.5rem", textShadow: "none" }}>How We Work</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 4.2vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", textShadow: "none" }}>
                  No handoffs.<br /><em style={{ fontStyle: "normal", color: RED }}>One brief.</em>
                </h2>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}>
                <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "#fff", lineHeight: 1.85, marginBottom: "2.5rem", textShadow: "none" }}>
                  Most transactions fail not because the deal was wrong, but because the advisors were working in silos. Your CA did not know what your lawyer agreed to. Your tax advisor was brought in too late. We built 10x Global specifically to fix this.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    ["One team",     "Financial, legal, tax — same mandate"],
                    ["One brief",    "You explain the deal once. We handle the rest"],
                    ["One timeline", "All disciplines move in parallel"],
                    ["One report",   "Integrated view across all risk areas"],
                  ].map(([title, desc], i) => (
                    <div key={title} style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      padding: "1.5rem 1.6rem",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", top: -18, right: -18,
                        width: 72, height: 72, borderRadius: "50%",
                        background: `radial-gradient(circle, ${RED}66 0%, transparent 70%)`,
                        pointerEvents: "none",
                      }} />
                      <p style={{ fontFamily: font.sans, fontSize: "0.75rem", fontWeight: 700, color: "#e8394f", marginBottom: "0.45rem", textShadow: "none", letterSpacing: "0.02em" }}>{title}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "#fff", lineHeight: 1.65, margin: 0, textShadow: "none" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── WHAT WE DO — SVG circle diagram ─────────────────────── */}
        <section style={{ padding: "6rem 0 7rem", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ marginBottom: "4rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>What We Do</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.1, marginTop: "0.6rem" }}>
                The full transaction <em style={{ fontStyle: "normal", color: RED }}>lifecycle.</em>
              </h2>
            </motion.div>

            <div className="lifecycle-circle-grid">
              {/* SVG circle diagram */}
              <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                <svg viewBox="0 0 480 480" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto", overflow: "visible" }}>
                  <defs>
                    <path id="wwd-a01" d="M240,60 A180,180 0 0,1 420,240" />
                    <path id="wwd-a02" d="M420,240 A180,180 0 0,1 240,420" />
                    <path id="wwd-a03" d="M240,420 A180,180 0 0,1 60,240" />
                    <path id="wwd-a04" d="M60,240 A180,180 0 0,1 240,60" />
                  </defs>
                  {["M240,60 A180,180 0 0,1 420,240","M420,240 A180,180 0 0,1 240,420","M240,420 A180,180 0 0,1 60,240","M60,240 A180,180 0 0,1 240,60"].map((d, i) => (
                    <motion.path key={i} d={d} fill="none"
                      animate={{ stroke: activeService === i ? RED : "rgba(28,23,18,0.1)", strokeWidth: activeService === i ? 2 : 1 }}
                      transition={{ duration: 0.35 }}
                    />
                  ))}
                  <AnimatePresence>
                    <motion.path
                      key={`arc-${activeService}`}
                      d={["M240,60 A180,180 0 0,1 420,240","M420,240 A180,180 0 0,1 240,420","M240,420 A180,180 0 0,1 60,240","M60,240 A180,180 0 0,1 240,60"][activeService]}
                      fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0, transition: { duration: 0.18 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                  {[
                    { href: "#wwd-a01", label: "FUNDRAISING ADVISORY", offset: "22%" },
                    { href: "#wwd-a02", label: "CROSS-BORDER M&A",     offset: "18%" },
                    { href: "#wwd-a03", label: "DUE DILIGENCE",        offset: "24%" },
                    { href: "#wwd-a04", label: "DEAL STRUCTURING",     offset: "18%" },
                  ].map(({ href, label, offset }, i) => (
                    <text key={i} style={{ userSelect: "none" }}>
                      <textPath href={href} startOffset={offset}>
                        <tspan fontFamily={font.sans} fontSize="7.5" letterSpacing="2.2"
                          fill={activeService === i ? RED : "rgba(28,23,18,0.28)"} fontWeight="700" dy="-9">
                          {label}
                        </tspan>
                      </textPath>
                    </text>
                  ))}
                  <AnimatePresence mode="wait">
                    <motion.text key={`wm-${activeService}`} x={240} y={258} textAnchor="middle" dominantBaseline="central"
                      fontFamily={font.num} fontSize="130" fontStyle="italic" fill={RED}
                      initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }} style={{ userSelect: "none" }}>
                      {SERVICES[activeService].n}
                    </motion.text>
                  </AnimatePresence>
                  {[{ cx: 240, cy: 60 },{ cx: 420, cy: 240 },{ cx: 240, cy: 420 },{ cx: 60, cy: 240 }].map(({ cx, cy }, i) => (
                    <g key={i} onMouseEnter={() => setActiveService(i)} onClick={() => setActiveService(i)} style={{ cursor: "pointer" }}>
                      <circle cx={cx} cy={cy} r={34} fill={`rgba(140,26,43,${activeService === i ? 0.1 : 0})`} style={{ transition: "fill 0.35s" }} />
                      <motion.circle cx={cx} cy={cy} r={24}
                        animate={{ fill: activeService === i ? RED : "#fff", stroke: activeService === i ? RED : "rgba(28,23,18,0.18)" }}
                        strokeWidth={1.5} transition={{ duration: 0.3 }} whileHover={{ scale: 1.12 }}
                      />
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fontFamily={font.num} fontSize="11" fontStyle="italic" fontWeight="700"
                        fill={activeService === i ? "#fff" : RED} style={{ pointerEvents: "none", userSelect: "none" }}>
                        {SERVICES[i].n}
                      </text>
                    </g>
                  ))}
                </svg>
              </motion.div>

              {/* Details panel */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                    <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, color: INK, lineHeight: 1.15, marginBottom: "1.25rem" }}>
                      {SERVICES[activeService].title}
                    </h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 500, color: INK, lineHeight: 1.85, marginBottom: "2.25rem", maxWidth: 440 }}>
                      {SERVICES[activeService].body}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {SERVICES[activeService].scope.map((item, j) => (
                        <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.065, duration: 0.3 }}
                          style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 }} />
                          <span style={{ fontFamily: font.sans, fontSize: "0.85rem", fontWeight: 600, color: INK, lineHeight: 1.5 }}>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div onClick={() => setActiveService(i => (i + 1) % 4)}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "2.5rem", cursor: "pointer", alignSelf: "flex-start" }}>
                  <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.1 }}
                    style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(140,26,43,0.25)" }}>
                    <span style={{ color: "#fff", fontSize: "0.9rem", lineHeight: 1 }}>→</span>
                  </motion.div>
                  <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(28,23,18,0.38)" }}>Next</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GROWTH TIMELINE — dark premium ───────────────────────── */}
        <section style={{ padding: "7rem 0", backgroundColor: "#0C1A2E", position: "relative", overflow: "hidden" }}>
          {/* Subtle grid pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw", position: "relative" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#e8394f", display: "block", marginBottom: "1rem", textShadow: "none" }}>Growth Journey</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, textShadow: "none" }}>
                Trusted at <em style={{ fontStyle: "normal", color: RED }}>every stage of growth.</em>
              </h2>
            </motion.div>

            <div style={{ position: "relative" }}>
              {/* Horizontal connector */}
              <div style={{ position: "absolute", top: 29, left: "8.33%", right: "8.33%", height: 2, background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 8%, rgba(255,255,255,0.35) 92%, transparent 100%)`, zIndex: 0 }} />
              <div className="stages-6col">
                {STAGES.map((s, i) => (
                  <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    className={`stage-item${i % 2 === 1 ? " stage-item-even" : ""}`}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div className="stage-circle" style={{ width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(140,26,43,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", flexShrink: 0, position: "relative", zIndex: 1, border: "1px solid rgba(140,26,43,0.3)" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(140,26,43,0.5)" }}>
                        <span style={{ fontFamily: font.num, fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{s.n}</span>
                      </div>
                    </div>
                    <div className="stage-text">
                      <p style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: RED, marginBottom: "0.4rem", textShadow: "none" }}>Stage {s.n}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.25, textShadow: "none" }}>{s.label}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, textShadow: "none" }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WE ALSO INVEST — image overlay cards ─────────────────── */}
        <section style={{ padding: "7rem 0", backgroundColor: WHITE }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ marginBottom: "3.5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1rem" }}>We Also Invest</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: INK, lineHeight: 1.2, maxWidth: 560 }}>
                We did not build an investment platform to find new companies. We built it to back the ones we already know.
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {INVEST_CARDS.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  style={{ position: "relative", height: "clamp(280px, 22vw, 360px)", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}
                  whileHover="hover">
                  <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(12,26,46,0.45) 0%, rgba(12,26,46,0.88) 100%)" }} />
                  {/* Red left accent */}
                  <motion.div
                    variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0.4 } }}
                    style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: RED, transformOrigin: "top", transition: "transform 0.4s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, padding: "2.25rem" }}>
                    <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", color: RED, marginBottom: "0.85rem", textShadow: "none" }}>{card.tag}</p>
                    <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)", fontWeight: 800, color: "#fff", marginBottom: "1rem", lineHeight: 1.2, textShadow: "none" }}>{card.title}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 400, textShadow: "none" }}>{card.body}</p>
                    <a href="#" style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED, textDecoration: "none" }}>
                      Explore →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — editorial numbered ──────────────────────────────── */}
        <section style={{ padding: "0", background: "#fff", position: "relative" }}>
          <div style={{ height: 4, background: RED, width: "100%" }} />
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "5rem 5vw 7rem" }}>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem" }}>
              <div>
                <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1rem", textShadow: "none" }}>Questions We Get Asked</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 4vw, 4.8rem)", fontWeight: 800, color: INK, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0, textShadow: "none" }}>
                  Before we interact,<br /><em style={{ fontStyle: "normal", color: RED }}>some answers.</em>
                </h2>
              </div>
              <button onClick={() => setShowContact(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1.5px solid rgba(28,23,18,0.2)", cursor: "pointer", padding: "0.75rem 1.4rem", fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, color: INK, letterSpacing: "0.12em", textTransform: "uppercase", textShadow: "none", whiteSpace: "nowrap", flexShrink: 0, marginBottom: "0.5rem", transition: "background 0.22s, color 0.22s, border-color 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = RED }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = "rgba(28,23,18,0.2)" }}>
                Talk to us →
              </button>
            </motion.div>

            {FAQS.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  borderTop: "1px solid rgba(28,23,18,0.1)",
                  borderLeft: openFaq === i ? `3px solid ${RED}` : "3px solid transparent",
                  paddingLeft: openFaq === i ? "1.75rem" : "0",
                  transition: "border-color 0.28s ease, padding 0.28s ease",
                  ...(i === FAQS.length - 1 ? { borderBottom: "1px solid rgba(28,23,18,0.1)" } : {}),
                }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width: "100%", display: "grid", gridTemplateColumns: "3.5rem 1fr 2.5rem", alignItems: "center", gap: "1.5rem", padding: "2rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", textShadow: "none" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: openFaq === i ? RED : "rgba(28,23,18,0.22)", transition: "color 0.25s", userSelect: "none" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: font.sans, fontSize: "clamp(1rem, 1.4vw, 1.25rem)", fontWeight: 700, color: INK, lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  <span style={{ fontFamily: font.sans, fontSize: "1.4rem", fontWeight: 300, color: openFaq === i ? RED : "rgba(28,23,18,0.35)", lineHeight: 1, transition: "color 0.25s, transform 0.25s", display: "block", textAlign: "center", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                      <p style={{ fontFamily: font.sans, fontSize: "0.95rem", color: MUTED, lineHeight: 1.88, paddingBottom: "2rem", paddingLeft: "5rem", textShadow: "none", maxWidth: "72ch" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA — dark image bg + frosted card ─────────────── */}
        <section style={{ padding: "9rem 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(12,26,46,0.96) 0%, rgba(12,26,46,0.88) 55%, rgba(12,26,46,0.94) 100%)" }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(140,26,43,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "0 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw", alignItems: "center" }}>

            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.5rem", textShadow: "none" }}>Start the Conversation</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 3.6vw, 4.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 0.1em", textShadow: "none" }}>
                Tell us about<br />the transaction.
              </h2>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 3.6vw, 4.4rem)", fontWeight: 800, color: RED, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 2.8rem", textShadow: "none" }}>
                We'll tell you<br />how we can help.
              </h2>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                {[["200+", "Transactions"], ["₹5,000Cr", "Deal Value"], ["4", "Countries"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: font.sans, fontSize: "1.5rem", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em", textShadow: "none" }}>{n}</div>
                    <div style={{ fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.36)", marginTop: "0.3rem", textShadow: "none" }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.14 }}
              style={{ background: "rgba(255,255,255,0.055)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "3rem 2.75rem", boxShadow: "0 24px 72px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: RED, flexShrink: 0 }} />
                <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textShadow: "none" }}>Free 30-Minute Consultation</span>
              </div>
              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.78, marginBottom: "2.25rem", textShadow: "none" }}>
                Confidential. No jargon, no pitch. We'll tell you honestly what we see in your transaction.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginBottom: "2.25rem", paddingBottom: "2.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 58, height: 58, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(140,26,43,0.5)", boxShadow: "0 0 0 3px rgba(140,26,43,0.15)" }}>
                  <Image src="/team/megha.png" alt="Megha Soni" width={58} height={58} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
                <div>
                  <p style={{ fontFamily: font.sans, fontWeight: 700, fontSize: "1rem", color: "#fff", margin: 0, textShadow: "none" }}>Megha Soni</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", margin: "0.25rem 0 0", textShadow: "none" }}>Lead, Startups & Transactions</p>
                </div>
              </div>
              <button
                onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/msoni-10x/30min" })}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.7rem", backgroundColor: RED, color: "#fff", padding: "1.1rem 2rem", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", textShadow: "none", width: "100%", boxShadow: "0 4px 0 #3e060e, 0 8px 24px rgba(140,26,43,0.4)", transition: "opacity 0.2s, box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 0 #3e060e, 0 12px 32px rgba(140,26,43,0.5)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 0 #3e060e, 0 8px 24px rgba(140,26,43,0.4)" }}
              >
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

