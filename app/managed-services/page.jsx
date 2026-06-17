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

const SERVICES = [
  {
    n: "01",
    title: "Virtual CFO",
    body: "Senior finance leadership without the full-time cost. We manage your financial function across entities and geographies — giving you the visibility to make decisions with confidence.",
    scope: ["Financial planning & MIS reporting", "Investor & board financial packs", "Cash flow and treasury management", "Pre-raise financial cleanup & data room"],
  },
  {
    n: "02",
    title: "CS Outsourcing",
    body: "We act as your outsourced Company Secretary — managing all secretarial, governance, and MCA obligations so your entity stays in good standing without a full-time hire.",
    scope: ["Board & AGM minutes", "ROC / MCA filings", "Share allotment & transfers", "Director KYC & changes"],
  },
  {
    n: "03",
    title: "Back Office",
    body: "From day-to-day bookkeeping to monthly management accounts, we handle the back office so your team can focus on growth — not spreadsheets.",
    scope: ["Monthly bookkeeping", "Accounts payable & receivable", "Bank reconciliations", "Financial statement preparation"],
  },
  {
    n: "04",
    title: "Statutory Compliance",
    body: "Every statutory deadline managed proactively — GST, TDS, PF, ESI, and labour law compliance handled before they become a problem.",
    scope: ["GST returns & reconciliations", "TDS / TCS compliance", "PF / ESI / PT filings", "Labour law compliance"],
  },
  {
    n: "05",
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
  },
  {
    tier: "Multi-Jurisdiction",
    title: "Finance Function",
    body: "Full managed finance covering Virtual CFO, compliance, payroll, and exchange control compliances, across two or more jurisdictions. Our most common engagement.",
  },
  {
    tier: "Full Coverage",
    title: "Cross-Border Oversight",
    body: "Comprehensive finance and compliance across India, UAE, Singapore, and/or US. For companies with active cross-border transaction flow.",
  },
]

const WHO = [
  {
    n: "01",
    title: "Operating entity and holding company in different countries.",
    body: "Transfer pricing, intercompany flows, and compliance calendars for both need to stay in sync. Most advisors handle one side. We handle both, as one team.",
  },
  {
    n: "02",
    title: "Flipped to Singapore or UAE.",
    body: "Two entities, two compliance calendars, one intercompany structure, managed as one integrated team. Not two separate advisors who don't talk to each other.",
  },
  {
    n: "03",
    title: "Raising or preparing to exit.",
    body: "Compliance history is the first thing investors check in due diligence. Retainer clients sail through. Records are clean, documentation is current.",
  },
]

const FAQS = [
  {
    q: "What does a Virtual CFO actually do in practice?",
    a: "Monthly management accounts, board packs, investor reporting, and financial modelling, on demand. We attend board calls where needed and prepare fundraise-ready financials without you hiring a full-time CFO.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed monthly retainer based on scope and jurisdiction count. We scope in one call, propose a fee, and you know the number before you sign. No hourly billing, no surprise invoices.",
  },
  {
    q: "We already have a CA in India. Do we need you?",
    a: "A local CA handles Indian compliance. We handle the cross-border layer: transfer pricing, exchange control compliances, and intercompany coordination between your India entity and your holding company. These are different problems.",
  },
  {
    q: "Can we start with one service and expand?",
    a: "Yes. Most clients start with compliance and payroll for one jurisdiction, then add Virtual CFO, transfer pricing, or new geographies as they scale. The retainer adapts without requiring a new engagement.",
  },
  {
    q: "What happens during a fundraise if we're on a retainer?",
    a: "You're already in good shape. Records are clean, documentation is current, and we can answer investor queries in hours. Retainer clients sail through due diligence. Transaction advisory is scoped separately.",
  },
]

export default function ManagedServicesPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [openScope, setOpenScope] = useState(-1)
  const [showContact, setShowContact] = useState(false)

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
      <main style={{ fontFamily: font.sans }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "7rem 0 5rem" }}>
          <div className="page-hero-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Managed Services</span>
              </div>
              <h1 style={{ fontFamily: font.sans, fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.08, color: INK }}>
                Your finance<br />function.<br />Without the<br />
                <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>full-time hire.</em>
              </h1>
            </motion.div>

            {/* Right */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ paddingTop: "1rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                When did you last see a single view of your compliance status across every jurisdiction you operate in?{" "}
                <strong style={{ color: INK }}>If you're not sure, that's exactly the problem we solve.</strong>
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.85, marginBottom: "2.5rem" }}>
                We run the finance function so you don't have to. Fixed monthly retainer. One team. Nothing falls through.
              </p>

              {/* Stats */}
              <div className="cards-3col" style={{ paddingTop: "1.5rem", marginBottom: "2.5rem", borderTop: "1px solid rgba(28,23,18,0.1)" }}>
                {[
                  { val: "100s", label: "Of Active Retainers" },
                  { val: "4",    label: "Jurisdictions" },
                  { val: "100%", label: "Client Retention" },
                ].map(s => (
                  <div key={s.label} style={{ paddingTop: "1.25rem" }}>
                    <p style={{ fontFamily: font.num, fontSize: "2.5rem", fontWeight: 400, color: INK, lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, marginTop: "0.5rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", paddingLeft: "2rem" }}>
                <button onClick={() => setShowContact(true)} style={{ backgroundColor: INK, color: WHITE, padding: "0.9rem 1.75rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 600, fontSize: "0.875rem" }}>
                  Get a retainer proposal →
                </button>
                <a href="#whats-included" style={{ textDecoration: "none" }}>
                  <button style={{ backgroundColor: "transparent", color: INK, padding: "0.9rem 1.75rem", border: "1.5px solid rgba(28,23,18,0.25)", cursor: "pointer", fontFamily: font.sans, fontWeight: 500, fontSize: "0.875rem" }}>
                    See what's included
                  </button>
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── INTENT CARDS ─────────────────────────────────────────── */}
        <section style={{ padding: "0 0 5rem", backgroundColor: WHITE }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textAlign: "center", marginBottom: "1.75rem" }}>Tell us what you need</p>
            <div className="cards-3col">
              {["I need a Virtual CFO", "I need compliance handled", "I need payroll & filings managed"].map(label => (
                <div key={label} onClick={() => setShowContact(true)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 36px rgba(140,26,43,0.18)"
                    const card = e.currentTarget.querySelector(".ms-intent-card")
                    card.style.backgroundColor = RED
                    card.style.borderColor = RED
                    card.querySelector(".card-label").style.color = "#fff"
                    card.querySelector(".card-arrow").style.color = "#fff"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    const card = e.currentTarget.querySelector(".ms-intent-card")
                    card.style.backgroundColor = "transparent"
                    card.style.borderColor = "rgba(140,26,43,0.4)"
                    card.querySelector(".card-label").style.color = INK
                    card.querySelector(".card-arrow").style.color = RED
                  }}
                  style={{ cursor: "pointer", display: "block", transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)", borderRadius: 12 }}>
                  <div className="ms-intent-card" style={{ border: "1.5px solid rgba(140,26,43,0.4)", borderRadius: 12, padding: "1.6rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "background-color 0.25s, border-color 0.25s" }}>
                    <span className="card-label" style={{ fontFamily: font.sans, fontSize: "1.25rem", fontWeight: 700, color: INK, transition: "color 0.25s" }}>{label}</span>
                    <span className="card-arrow" style={{ color: RED, fontSize: "1.25rem", fontWeight: 600, transition: "color 0.25s" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ───────────────────────────────────────── */}
        <section id="whats-included" style={{ backgroundColor: "#F5F5F5", padding: "3.5rem 0", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            <div className="heading-2col" style={{ marginBottom: "1.25rem" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>What's Included</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  The full finance function.<br />
                  <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>Every jurisdiction.</em>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                style={{ paddingTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ borderLeft: `2px solid ${RED}`, paddingLeft: "1.25rem", maxWidth: 320 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", fontStyle: "normal", fontWeight: 800, color: INK, lineHeight: 1.55 }}>
                    All services available as part of a single integrated retainer.
                  </p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED, marginTop: "0.6rem" }}>One team. One brief.</p>
                </div>
              </motion.div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.85rem" }}>
              {SERVICES.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ backgroundColor: WHITE, border: "1px solid rgba(28,23,18,0.1)", padding: "1.25rem", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: font.num, fontSize: "1.5rem", fontWeight: 400, fontStyle: "normal", color: RED, lineHeight: 1, marginBottom: "0.65rem" }}>{s.n}</span>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.15rem", fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: "0.55rem" }}>{s.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.82rem", fontWeight: 450, color: MUTED, lineHeight: 1.65, marginBottom: "0.75rem", flex: 1 }}>{s.body}</p>
                  <button onClick={() => setOpenScope(openScope === i ? -1 : i)}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0 0", border: "none", background: "none", cursor: "pointer", marginTop: "auto" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>Scope Includes</span>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, backgroundColor: openScope === i ? RED : "transparent", border: `1px solid ${openScope === i ? RED : "rgba(28,23,18,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.sans, fontSize: "0.72rem", color: openScope === i ? "#fff" : INK, transition: "all 0.25s" }}>
                      {openScope === i ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openScope === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: "hidden" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", padding: "0.75rem 0.25rem 0.15rem" }}>
                          {s.scope.map(item => (
                            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: RED, flexShrink: 0, marginTop: "0.35rem" }} />
                              <span style={{ fontFamily: font.sans, fontSize: "0.82rem", fontWeight: 450, color: MUTED, lineHeight: 1.55 }}>{item}</span>
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

        {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "6rem 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 820, margin: "0 auto" }}>
            <p style={{ fontFamily: font.sans, fontSize: "4rem", color: "rgba(140,26,43,0.22)", lineHeight: 0.5, marginBottom: "2rem" }}>"</p>
            <p style={{ fontFamily: font.sans, fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontStyle: "normal", fontWeight: 800, color: INK, lineHeight: 1.65, marginBottom: "2rem" }}>
              "Before 10x Global, our India compliance was a constant source of anxiety. Missed deadlines, advisors not talking to each other. Now it's invisible. It just gets done, every quarter, without us having to chase."
            </p>
            <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(107,101,96,0.45)" }}>
              ~ Client Testimonial
            </p>
          </motion.div>
          </div>
        </section>

        {/* ── ENGAGEMENT OPTIONS ────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="heading-2col" style={{ marginBottom: "3rem" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Engagement Options</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  Structured for where<br />
                  <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>you actually are.</em>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                style={{ paddingTop: "3.5rem", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ borderLeft: `2px solid ${RED}`, paddingLeft: "1.25rem", maxWidth: 300 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", fontStyle: "normal", fontWeight: 800, color: INK, lineHeight: 1.65 }}>
                    Scope and pricing tailored to your jurisdiction count and complexity.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="cards-3col">
              {TIERS.map((t, i) => (
                <motion.div key={t.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ borderLeft: `3px solid ${RED}`, padding: "2rem 1.75rem" }}>
                  <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: RED, marginBottom: "0.85rem" }}>{t.tier}</p>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.5rem", fontWeight: 700, color: INK, marginBottom: "0.85rem", lineHeight: 1.25 }}>{t.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: MUTED, lineHeight: 1.75 }}>{t.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO USES THIS ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Who Uses This</span>
              </div>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                Built for founders who have<br />
                <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>better things to chase.</em>
              </h2>
            </motion.div>

            <div className="cards-3col">
              {WHO.map((w, i) => (
                <motion.div key={w.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ position: "relative", borderLeft: `3px solid ${RED}`, padding: "2rem 1.75rem", backgroundColor: WHITE, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <span style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", fontFamily: font.num, fontSize: "6rem", fontWeight: 800, color: "rgba(140,26,43,0.25)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{w.n}</span>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.2rem", fontWeight: 700, color: INK, marginBottom: "0.85rem", lineHeight: 1.4, position: "relative" }}>{w.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: MUTED, lineHeight: 1.75, position: "relative" }}>{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "6rem 0" }}>
          <div className="contact-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Common Questions</span>
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
                    <span style={{ fontFamily: font.sans, fontSize: "1.15rem", fontWeight: 600, color: INK, lineHeight: 1.4 }}>{faq.q}</span>
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", color: MUTED, lineHeight: 1.8, paddingBottom: "1.5rem" }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(28,23,18,0.1)" }} />
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "7rem 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Start the Conversation</span>
            </div>
            <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: INK, lineHeight: 1.08, marginBottom: "0.25rem" }}>
              Tell us about your entities.
            </h2>
            <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, fontStyle: "normal", color: RED, lineHeight: 1.08, marginBottom: "1.75rem" }}>
              We'll handle the rest.
            </h2>
            <p style={{ fontFamily: font.sans, fontSize: "1rem", color: MUTED, lineHeight: 1.8, marginBottom: "2rem" }}>
              Free 30-minute consultation. We'll scope a retainer that fits your business.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.75rem" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", marginBottom: "0.75rem", border: "2px solid rgba(140,26,43,0.18)" }}>
                <Image src="/team/rajat.png" alt="Rajat Gupta" width={80} height={80} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </div>
              <p style={{ fontFamily: font.sans, fontWeight: 600, fontSize: "0.85rem", color: INK, marginBottom: "0.2rem" }}>Rajat Gupta</p>
              <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: MUTED }}>Lead, Financial Reporting</p>
            </div>
            <button
              onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/rgupta-10x/30min" })}
              style={{ backgroundColor: INK, color: WHITE, padding: "1rem 2.5rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Book Rajat's Calendar →
            </button>
          </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
