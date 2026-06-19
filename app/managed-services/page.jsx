"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { font } from "@/lib/theme"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"

const RED  = "#8C1A2B"
const BRED = "#e8394f"
const NAVY = "#0C1A27"
const DARK = "#081420"
const WHITE = "#FFFFFF"
const INK   = "#1C1712"
const MUTED = "#6B6560"
const CREAM = "#F7F5F2"

/* ── SVG ICONS ─────────────────────────────────────────────────────────────── */

function ChartIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18M7 16l4-4 4 4 4-4" />
    </svg>
  )
}
function DocIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function BuildingIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M9 21V7l3-2 3 2v14M9 7H4v14h5m6-14h5v14h-5" />
    </svg>
  )
}
function ShieldIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}
function GlobeIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </svg>
  )
}

/* ── DATA ──────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    n: "01", icon: ChartIcon,
    title: "Virtual CFO",
    body: "Senior finance leadership without the full-time cost. We manage your financial function across entities and geographies — giving you the visibility to make decisions with confidence.",
    scope: ["Financial planning & MIS reporting", "Investor & board financial packs", "Cash flow and treasury management", "Pre-raise financial cleanup & data room"],
  },
  {
    n: "02", icon: DocIcon,
    title: "CS Outsourcing",
    body: "We act as your outsourced Company Secretary — managing all secretarial, governance, and MCA obligations so your entity stays in good standing without a full-time hire.",
    scope: ["Board & AGM minutes", "ROC / MCA filings", "Share allotment & transfers", "Director KYC & changes"],
  },
  {
    n: "03", icon: BuildingIcon,
    title: "Back Office",
    body: "From day-to-day bookkeeping to monthly management accounts, we handle the back office so your team can focus on growth — not spreadsheets.",
    scope: ["Monthly bookkeeping", "Accounts payable & receivable", "Bank reconciliations", "Financial statement preparation"],
  },
  {
    n: "04", icon: ShieldIcon,
    title: "Statutory Compliance",
    body: "Every statutory deadline managed proactively — GST, TDS, PF, ESI, and labour law compliance handled before they become a problem.",
    scope: ["GST returns & reconciliations", "TDS / TCS compliance", "PF / ESI / PT filings", "Labour law compliance"],
  },
  {
    n: "05", icon: GlobeIcon,
    title: "Risk Assurance & Advisory",
    body: "Cross-border transactions and foreign investment trigger complex reporting obligations. We handle every FEMA, RBI, and transfer pricing requirement — on time, with full documentation.",
    scope: ["FC-GPR / FC-TRS filings", "ODI & ECB reporting", "ESOP remittance filings", "Transfer pricing documentation"],
  },
]

const TIERS = [
  {
    tier: "Single Jurisdiction",
    title: "Entity Essentials",
    body: "Annual filings, payroll, and compliance for one entity. For early-stage companies who need the basics done cleanly, without distraction.",
    featured: false,
  },
  {
    tier: "Multi-Jurisdiction",
    title: "Finance Function",
    body: "Full managed finance covering Virtual CFO, compliance, payroll, and exchange control compliances, across two or more jurisdictions. Our most common engagement.",
    featured: true,
  },
  {
    tier: "Full Coverage",
    title: "Cross-Border Oversight",
    body: "Comprehensive finance and compliance across India, UAE, Singapore, and/or US. For companies with active cross-border transaction flow.",
    featured: false,
  },
]

const WHO = [
  {
    n: "01",
    title: "Operating entity and holding company in different countries.",
    body: "Transfer pricing, intercompany flows, and compliance calendars for both need to stay in sync. Most advisors handle one side. We handle both, as one team.",
    img: "photo-1521737604893-d14cc237f11d",
  },
  {
    n: "02",
    title: "Flipped to Singapore or UAE.",
    body: "Two entities, two compliance calendars, one intercompany structure, managed as one integrated team. Not two separate advisors who don't talk to each other.",
    img: "photo-1497366216548-37526070297c",
  },
  {
    n: "03",
    title: "Raising or preparing to exit.",
    body: "Compliance history is the first thing investors check in due diligence. Retainer clients sail through. Records are clean, documentation is current.",
    img: "photo-1554224155-6726b3ff858f",
  },
]

const FAQS = [
  { q: "What does a Virtual CFO actually do in practice?", a: "Monthly management accounts, board packs, investor reporting, and financial modelling, on demand. We attend board calls where needed and prepare fundraise-ready financials without you hiring a full-time CFO." },
  { q: "How does pricing work?", a: "Fixed monthly retainer based on scope and jurisdiction count. We scope in one call, propose a fee, and you know the number before you sign. No hourly billing, no surprise invoices." },
  { q: "We already have a CA in India. Do we need you?", a: "A local CA handles Indian compliance. We handle the cross-border layer: transfer pricing, exchange control compliances, and intercompany coordination between your India entity and your holding company. These are different problems." },
  { q: "Can we start with one service and expand?", a: "Yes. Most clients start with compliance and payroll for one jurisdiction, then add Virtual CFO, transfer pricing, or new geographies as they scale. The retainer adapts without requiring a new engagement." },
  { q: "What happens during a fundraise if we're on a retainer?", a: "You're already in good shape. Records are clean, documentation is current, and we can answer investor queries in hours. Retainer clients sail through due diligence. Transaction advisory is scoped separately." },
]

/* ── COUNT UP ──────────────────────────────────────────────────────────────── */

function CountUpStat({ target, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1)
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── HERO ILLUSTRATION ─────────────────────────────────────────────────────── */

function HeroIllustration() {
  const card = {
    backgroundColor: WHITE,
    border: "1px solid rgba(28,23,18,0.09)",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  }
  const JURISDICTIONS = [
    { name: "India",     sub: "Pvt Ltd"       },
    { name: "UAE",       sub: "Free Zone LLC"  },
    { name: "Singapore", sub: "Pte Ltd"        },
  ]
  const SERVICES_LIST = ["Virtual CFO", "CS Outsourcing", "Back Office", "Statutory Compliance", "Risk & Advisory"]
  return (
    <div style={{ position: "relative", height: 460 }}>
      <style>{`
        @keyframes hi-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes hi-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>

      {/* Card — back: services included */}
      <div style={{ ...card, position: "absolute", top: 0, left: "8%", right: "8%", padding: "1.25rem 1.5rem", transform: "scale(0.9) translateY(-8px)", opacity: 0.5, zIndex: 1 }}>
        <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginBottom: "0.85rem" }}>What's Covered</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {SERVICES_LIST.map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              <span style={{ fontFamily: font.sans, fontSize: "0.82rem", fontWeight: 500, color: INK }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card — middle: entity list */}
      <div style={{ ...card, position: "absolute", top: "14%", left: "4%", right: "4%", padding: "1.25rem 1.5rem", transform: "scale(0.95) translateY(-4px)", opacity: 0.78, zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Managed Entities</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#16a34a", animation: "hi-pulse 2.5s ease-in-out infinite" }} />
            <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 600, color: "#16a34a" }}>All Active</span>
          </div>
        </div>
        {JURISDICTIONS.map((j, i) => (
          <div key={j.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: i < 2 ? "1px solid rgba(28,23,18,0.07)" : "none" }}>
            <div>
              <span style={{ fontFamily: font.sans, fontSize: "0.88rem", fontWeight: 700, color: INK }}>{j.name}</span>
              <span style={{ fontFamily: font.sans, fontSize: "0.72rem", color: MUTED, marginLeft: "0.5rem" }}>{j.sub}</span>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
        ))}
      </div>

      {/* Card — front: one team brief */}
      <div style={{ ...card, position: "absolute", top: "26%", left: 0, right: 0, padding: "1.5rem", zIndex: 3, animation: "hi-float 7s ease-in-out infinite", boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div>
            <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginBottom: "0.35rem" }}>Retainer Summary</p>
            <p style={{ fontFamily: font.sans, fontSize: "1.35rem", fontWeight: 800, color: INK, lineHeight: 1 }}>One team. One brief.</p>
          </div>
          <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, color: RED, backgroundColor: "rgba(140,26,43,0.08)", border: "1px solid rgba(140,26,43,0.2)", borderRadius: 6, padding: "0.3rem 0.65rem" }}>ACTIVE</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { label: "Jurisdictions",  val: "3"         },
            { label: "Services",       val: "5"         },
            { label: "Billing",        val: "Fixed"     },
            { label: "Reporting",      val: "Monthly"   },
          ].map(m => (
            <div key={m.label} style={{ backgroundColor: "#F7F5F2", borderRadius: 10, padding: "0.7rem 0.85rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: "0.3rem" }}>{m.label}</p>
              <p style={{ fontFamily: font.num, fontSize: "1.1rem", fontWeight: 400, color: INK, lineHeight: 1 }}>{m.val}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.85rem", borderTop: "1px solid rgba(28,23,18,0.07)" }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.65rem", color: MUTED }}>No surprise invoices. Scope agreed upfront.</p>
          <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: INK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── MAIN PAGE ─────────────────────────────────────────────────────────────── */

export default function ManagedServicesPage() {
  const [openFaq, setOpenFaq]     = useState(0)
  const [openScope, setOpenScope] = useState(-1)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const css = document.createElement("link")
    css.href = "https://assets.calendly.com/assets/external/widget.css"
    css.rel = "stylesheet"
    document.head.appendChild(css)
    const js = document.createElement("script")
    js.src = "https://assets.calendly.com/assets/external/widget.js"
    js.async = true
    document.head.appendChild(js)
  }, [])

  return (
    <>
      <style>{`
        .ms-hero-grid   { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center }
        .ms-services    { display:grid; grid-template-columns:repeat(5,1fr); gap:1rem }
        .ms-tiers       { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem }
        .ms-who         { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem }
        .ms-faq-grid    { display:grid; grid-template-columns:1fr 1.4fr; gap:6rem; align-items:flex-start }
        .ms-intent-row  { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem }
        .ms-video-grid  { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center }
        .ms-stats       { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem }
        .ms-cta-grid    { display:grid; grid-template-columns:1fr 0.85fr; gap:6rem; align-items:center }
        @media(max-width:1100px){ .ms-services{grid-template-columns:repeat(3,1fr)} }
        @media(max-width:900px){
          .ms-hero-grid,.ms-video-grid,.ms-faq-grid,.ms-cta-grid{grid-template-columns:1fr; gap:2.5rem}
          .ms-services,.ms-tiers,.ms-who,.ms-intent-row{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:540px){
          .ms-services,.ms-tiers,.ms-who,.ms-intent-row{grid-template-columns:1fr}
          .ms-stats{grid-template-columns:repeat(2,1fr)}
        }
      `}</style>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

      <Navbar />
      <main style={{ fontFamily: font.sans }}>

        {/* ── HERO ── white ─────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "8rem 0 5rem", overflow: "hidden" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="ms-hero-grid">

              {/* Left */}
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "2rem" }}>Managed Services</span>
                <h1 style={{ fontFamily: font.sans, fontSize: "clamp(3rem, 5vw, 4.75rem)", fontWeight: 800, lineHeight: 1.05, color: INK, marginBottom: "1.75rem" }}>
                  Your finance<br />function.<br />Without the<br />
                  <em style={{ fontStyle: "normal", color: RED }}>full-time hire.</em>
                </h1>
                <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.85, marginBottom: "1rem", maxWidth: 480 }}>
                  When did you last see a single view of your compliance status across every jurisdiction you operate in?{" "}
                  <strong style={{ color: INK, fontWeight: 700 }}>If you're not sure, that's exactly the problem we solve.</strong>
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "0.97rem", color: MUTED, lineHeight: 1.85, marginBottom: "3rem", maxWidth: 480 }}>
                  Fixed monthly retainer. One team. Nothing falls through.
                </p>

                {/* Stats */}
                <div className="ms-stats" style={{ paddingTop: "2rem", marginBottom: "3rem", borderTop: "1px solid rgba(28,23,18,0.1)" }}>
                  {[
                    { target: 100, suffix: "+", label: "Active Retainers" },
                    { target: 4,   suffix: "",  label: "Jurisdictions"    },
                    { target: 100, suffix: "%", label: "Client Retention" },
                  ].map(s => (
                    <div key={s.label}>
                      <p style={{ fontFamily: font.num, fontSize: "2.25rem", fontWeight: 400, color: INK, lineHeight: 1, marginBottom: "0.4rem" }}>
                        <CountUpStat target={s.target} suffix={s.suffix} />
                      </p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button onClick={() => setShowContact(true)}
                    style={{ backgroundColor: INK, color: WHITE, padding: "0.9rem 1.75rem", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.875rem", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = RED}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = INK}>
                    Get a retainer proposal →
                  </button>
                  <a href="#whats-included" style={{ textDecoration: "none" }}>
                    <button style={{ backgroundColor: "transparent", color: INK, padding: "0.9rem 1.75rem", border: "1.5px solid rgba(28,23,18,0.22)", borderRadius: 8, cursor: "pointer", fontFamily: font.sans, fontWeight: 500, fontSize: "0.875rem", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = INK }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(28,23,18,0.22)" }}>
                      See what's included
                    </button>
                  </a>
                </div>
              </motion.div>

              {/* Right — illustration */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
                <HeroIllustration />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── INTENT CARDS ──────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "4rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textAlign: "center", marginBottom: "1.75rem" }}>Tell us what you need</p>
            <div className="ms-intent-row">
              {[
                { label: "I need a Virtual CFO",               Icon: ChartIcon  },
                { label: "I need compliance handled",          Icon: ShieldIcon },
                { label: "I need payroll & filings managed",   Icon: DocIcon    },
              ].map(({ label, Icon }) => (
                <div key={label} onClick={() => setShowContact(true)}
                  style={{ border: "1.5px solid rgba(140,26,43,0.22)", borderRadius: 12, padding: "1.4rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = RED
                    e.currentTarget.style.borderColor = RED
                    e.currentTarget.querySelector(".ib-label").style.color = WHITE
                    e.currentTarget.querySelector(".ib-arrow").style.color = WHITE
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.borderColor = "rgba(140,26,43,0.22)"
                    e.currentTarget.querySelector(".ib-label").style.color = INK
                    e.currentTarget.querySelector(".ib-arrow").style.color = RED
                  }}>
                  <span className="ib-label" style={{ fontFamily: font.sans, fontSize: "1.1rem", fontWeight: 700, color: INK, transition: "color 0.25s" }}>{label}</span>
                  <span className="ib-arrow" style={{ color: RED, fontSize: "1.2rem", transition: "color 0.25s" }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── dark ───────────────────────────────────────── */}
        <section id="whats-included" style={{ backgroundColor: "#0A1720", padding: "7rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "4rem", alignItems: "flex-end" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: BRED, display: "block", marginBottom: "1.5rem" }}>What's Included</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 3.5vw, 3.25rem)", fontWeight: 800, color: WHITE, lineHeight: 1.1 }}>
                  The full finance function.{" "}
                  <span style={{ color: BRED }}>Every jurisdiction.</span>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ borderLeft: `2px solid ${BRED}`, paddingLeft: "1.5rem", maxWidth: 320 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 700, color: WHITE, lineHeight: 1.65, marginBottom: "0.5rem" }}>All services available as part of a single integrated retainer.</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: BRED }}>One team. One brief.</p>
                </div>
              </motion.div>
            </div>

            <div className="ms-services">
              {SERVICES.map((s, i) => (
                <motion.div key={s.n}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "1.5rem",
                    backdropFilter: "blur(8px)", display: "flex", flexDirection: "column",
                    transition: "all 0.25s", cursor: "default",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(0,0,0,0.35)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(232,57,79,0.14)", border: "1px solid rgba(232,57,79,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", flexShrink: 0 }}>
                    <s.icon size={18} color={BRED} />
                  </div>
                  <span style={{ fontFamily: font.num, fontSize: "1.1rem", fontWeight: 400, color: "rgba(255,255,255,0.18)", lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</span>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.05rem", fontWeight: 700, color: WHITE, lineHeight: 1.3, marginBottom: "0.7rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.65, marginBottom: "1rem", flex: 1 }}>{s.body}</p>
                  <button onClick={() => setOpenScope(openScope === i ? -1 : i)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: 0, border: "none", background: "none", cursor: "pointer", marginTop: "auto" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Scope</span>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, backgroundColor: openScope === i ? BRED : "transparent", border: `1px solid ${openScope === i ? BRED : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.sans, fontSize: "0.72rem", color: openScope === i ? WHITE : "rgba(255,255,255,0.4)", transition: "all 0.2s" }}>
                      {openScope === i ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openScope === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: "hidden" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", paddingTop: "0.85rem" }}>
                          {s.scope.map(item => (
                            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: BRED, flexShrink: 0, marginTop: "0.42rem" }} />
                              <span style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ───────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "7rem 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 840, margin: "0 auto" }}>
              <svg width={48} height={32} viewBox="0 0 48 32" style={{ opacity: 0.18, marginBottom: "2rem" }}>
                <path fill={RED} d="M0 32V20C0 8.954 6.477 2.477 19.43 0L20 2.857C13.144 4.286 9.143 8.095 8 14.286h8V32H0zm28 0V20C28 8.954 34.477 2.477 47.43 0L48 2.857C41.144 4.286 37.143 8.095 36 14.286h8V32H28z" />
              </svg>
              <p style={{ fontFamily: font.sans, fontSize: "clamp(1.25rem, 2.2vw, 1.72rem)", fontWeight: 800, color: INK, lineHeight: 1.65, marginBottom: "2.5rem" }}>
                "Before 10x Global, our India compliance was a constant source of anxiety. Missed deadlines, advisors not talking to each other. Now it's invisible. It just gets done, every quarter, without us having to chase."
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(107,101,96,0.45)" }}>Client Testimonial</p>
            </motion.div>
          </div>
        </section>

        {/* ── ENGAGEMENT TIERS ──────────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "7rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end", marginBottom: "4rem" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.5rem" }}>Engagement Options</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  Structured for where<br />
                  <em style={{ fontStyle: "normal", color: RED }}>you actually are.</em>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ borderLeft: `2px solid ${RED}`, paddingLeft: "1.5rem", maxWidth: 300 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 700, color: INK, lineHeight: 1.65 }}>Scope and pricing tailored to your jurisdiction count and complexity.</p>
                </div>
              </motion.div>
            </div>

            <div className="ms-tiers">
              {TIERS.map((t, i) => (
                <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{
                    position: "relative", borderRadius: 20, overflow: "hidden",
                    padding: "2.5rem 2rem",
                    backgroundColor: WHITE,
                    border: "1px solid rgba(28,23,18,0.1)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  }}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: RED }}>{t.tier}</span>
                  </div>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.65rem", fontWeight: 700, color: INK, lineHeight: 1.2, marginBottom: "1rem" }}>{t.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: MUTED, lineHeight: 1.78, marginBottom: "2rem" }}>{t.body}</p>
                  <button onClick={() => setShowContact(true)}
                    style={{ width: "100%", padding: "0.88rem", borderRadius: 10, fontFamily: font.sans, fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.2s", backgroundColor: "transparent", border: `1.5px solid rgba(140,26,43,0.28)`, color: RED }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED; e.currentTarget.style.color = WHITE; e.currentTarget.style.borderColor = RED }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = RED; e.currentTarget.style.borderColor = "rgba(140,26,43,0.28)" }}>
                    Get a proposal →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO USES THIS ── with images ──────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "7rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.5rem" }}>Who Uses This</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                Built for founders who have<br />
                <em style={{ fontStyle: "normal", color: RED }}>better things to chase.</em>
              </h2>
            </motion.div>
            <div className="ms-who">
              {WHO.map((w, i) => (
                <motion.div key={w.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(28,23,18,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                  <div style={{ position: "relative", height: 220 }}>
                    <Image src={`https://images.unsplash.com/${w.img}?w=600&q=80`} alt={w.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.75rem" }}>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1.1rem", fontWeight: 700, color: INK, lineHeight: 1.45, marginBottom: "0.85rem" }}>{w.title}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: MUTED, lineHeight: 1.78 }}>{w.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — editorial numbered ─────────────────────────────────────── */}
        <section style={{ padding: "0", background: CREAM, position: "relative" }}>
          <div style={{ height: 4, background: RED, width: "100%" }} />
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "5rem 5vw 7rem" }}>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem" }}>
              <div>
                <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1rem" }}>Common Questions</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 4vw, 4.8rem)", fontWeight: 800, color: INK, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0 }}>
                  Before we interact,<br /><em style={{ fontStyle: "normal", color: RED }}>some answers.</em>
                </h2>
              </div>
              <button onClick={() => setShowContact(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1.5px solid rgba(28,23,18,0.2)", cursor: "pointer", padding: "0.75rem 1.4rem", fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, color: INK, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0, marginBottom: "0.5rem", transition: "background 0.22s, color 0.22s, border-color 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = WHITE; e.currentTarget.style.borderColor = RED }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = "rgba(28,23,18,0.2)" }}>
                Ask us anything →
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
                  style={{ width: "100%", display: "grid", gridTemplateColumns: "3.5rem 1fr 2.5rem", alignItems: "center", gap: "1.5rem", padding: "2rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
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
                      <p style={{ fontFamily: font.sans, fontSize: "0.95rem", color: MUTED, lineHeight: 1.88, paddingBottom: "2rem", paddingLeft: "5rem", maxWidth: "72ch" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── dark navy + two-column ──────────────────────────── */}
        <section style={{ padding: "8rem 0", backgroundColor: NAVY }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="ms-cta-grid">

              {/* Left — headline + stats */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: BRED, display: "block", marginBottom: "2rem" }}>Start the Conversation</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 800, color: WHITE, lineHeight: 1.05, marginBottom: "0.2rem" }}>
                  Tell us about your entities.
                </h2>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4.5vw, 4rem)", fontWeight: 800, color: BRED, lineHeight: 1.05, marginBottom: "3.5rem" }}>
                  We'll handle the rest.
                </h2>
                <div style={{ display: "flex", gap: "3rem" }}>
                  {[
                    { val: "100+", label: "Active Retainers" },
                    { val: "4",    label: "Jurisdictions"    },
                    { val: "100%", label: "Client Retention" },
                  ].map(s => (
                    <div key={s.label}>
                      <p style={{ fontFamily: font.num ?? font.sans, fontSize: "2rem", fontWeight: 700, color: WHITE, lineHeight: 1, marginBottom: "0.35rem" }}>{s.val}</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — glass card */}
              <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <div style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "2.5rem", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: BRED, flexShrink: 0, display: "block" }} />
                    <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Free 30-Minute Consultation</span>
                  </div>
                  <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: WHITE, lineHeight: 1.75, marginBottom: "2rem" }}>
                    Confidential. No jargon, no pitch. We'll scope a retainer that fits your business and tell you honestly how we can help.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(232,57,79,0.35)" }}>
                      <Image src="/team/rajat.png" alt="Rajat Gupta" width={52} height={52} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: font.sans, fontWeight: 700, fontSize: "0.92rem", color: WHITE, marginBottom: "0.2rem" }}>Rajat Gupta</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.42)" }}>Lead, Financial Reporting</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/rgupta-10x/30min" })}
                    style={{ width: "100%", backgroundColor: RED, color: WHITE, padding: "1rem 2rem", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = BRED}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = RED}>
                    Book Rajat's Calendar →
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
