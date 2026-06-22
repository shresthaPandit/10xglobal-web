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
    title: "Entity Setup & Structuring",
    body: "We design the structure before filing a document: entity type, holding layer, FDI treatment, and future deal architecture. Built for where you're going, not just where you are today.",
    scope: ["Entity type selection", "Holding structure design", "FDI structuring", "Shareholder agreement", "Cross-border capital flows"],
  },
  {
    n: "02",
    title: "Regulatory Registration",
    body: "MCA incorporation, exchange control compliances, free zone registration, MAS licensing. We manage every step across every jurisdiction. No missed triggers. No compliance gaps.",
    scope: ["MCA incorporation", "Exchange control compliances", "Free zone registration", "Tax registration (GST, VAT)", "Compliance calendar setup"],
  },
  {
    n: "03",
    title: "Banking & Treasury Access",
    body: "Getting a bank account in India or UAE is where companies stall for months. We have direct banking relationships across all our geographies and manage the process end-to-end.",
    scope: ["Banking partner introduction", "Account opening support", "Treasury structure design", "FX management guidance", "Payment infrastructure"],
  },
  {
    n: "04",
    title: "Employment & Hiring Structure",
    body: "We structure your hiring for compliance and cost efficiency, without creating permanent establishment risk. Includes local directors, payroll setup, and cross-border ESOP design.",
    scope: ["Local director engagement", "Employment contract structure", "PE risk assessment", "Payroll setup", "ESOP cross-border design"],
  },
]

const WHO = [
  {
    n: "01",
    title: "Indian company going global.",
    body: "Expanding to UAE, Singapore, or the US. Holding structure, capital flow design, regulatory registration, and banking, in the right order. We've done this 100+ times.",
  },
  {
    n: "02",
    title: "Foreign company entering India.",
    body: "Entity type, FDI structuring, RBI approvals, and banking, all designed around your global structure, not just Indian compliance. Right from day one.",
  },
  {
    n: "03",
    title: "Restructuring before a raise or IPO.",
    body: "Investors will ask about your structure. Your lead investor may have already flagged it internally. We fix it before that conversation happens.",
  },
]

const STEPS = [
  { n: 1, step: "Step 1", title: "Diagnose",  body: "Understand your business, target market, and capital structure before recommending anything" },
  { n: 2, step: "Step 2", title: "Structure", body: "Design entity architecture, tax structure, and compliance roadmap before a document is filed" },
  { n: 3, step: "Step 3", title: "Register",  body: "Incorporation, regulatory filings, and banking, all managed in parallel where possible" },
  { n: 4, step: "Step 4", title: "Operate",   body: "Bank accounts open, payroll running, compliance calendar in place. You focus on the business" },
]

const FAQS = [
  {
    q: "Why does entity structure matter so much at the point of entry?",
    a: "Because fixing it later costs 3–5× more in time, money, and legal complexity. The entity type determines your tax treatment, fundraising ability, profit repatriation, and future transaction structure. Get it right once.",
  },
  {
    q: "How long does a full market entry take?",
    a: "4–8 weeks from engagement to operational entity. India through MCA runs 3–5 weeks; UAE free zones are often faster. Banking runs in parallel and typically adds 2–4 weeks.",
  },
  {
    q: "We're already incorporated but think our structure is wrong.",
    a: "Structure reviews are a large part of our work. We assess your current setup, identify the risks, and redesign where needed, before a fundraise or due diligence process surfaces the problem for you.",
  },
  {
    q: "We've been running engineers on contractor agreements for 18 months. Are we in trouble?",
    a: "You may be fine. You may have a PE exposure. We'll tell you which one, honestly, and if it's a problem, we'll show you how to fix it before it becomes urgent.",
  },
  {
    q: "Do you work across multiple jurisdictions in one mandate?",
    a: "This is our core capability. We design structures that account for how India, UAE, Singapore, and the US interact with each other, not just how each works in isolation.",
  },
]

export default function GlobalMarketEntryPage() {
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
        <section className="inner-page-hero" style={{ backgroundColor: WHITE, padding: "7rem 0 5rem" }}>
          <div className="page-hero-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Global Market Entry</span>
              </div>
              <h1 style={{ fontFamily: font.sans, fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.08, color: INK }}>
                Enter new<br />markets.<br />Without the<br />
                <em style={{ display: "inline-block", marginTop: "0.04em", fontStyle: "normal", color: RED }}>expensive mistakes.</em>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} style={{ paddingTop: "1rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                If you're operating across two or three jurisdictions. Each one has its own advisors, its own compliance calendar, and its own blind spots about the others.{" "}
                <strong style={{ color: INK }}>We're the team that holds the full picture, across all of them.</strong>
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.85, marginBottom: "2.5rem" }}>
                The wrong structure costs 3–5× more to fix than getting it right on day one.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => setShowContact(true)} style={{ backgroundColor: INK, color: WHITE, padding: "0.9rem 1.75rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 600, fontSize: "0.875rem" }}>
                  Get a structure review →
                </button>
                <a href="#how-it-works" style={{ textDecoration: "none" }}>
                  <button style={{ backgroundColor: "transparent", color: INK, padding: "0.9rem 1.75rem", border: "1.5px solid rgba(28,23,18,0.25)", cursor: "pointer", fontFamily: font.sans, fontWeight: 500, fontSize: "0.875rem" }}>
                    See how we work
                  </button>
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── INTENT CARDS ─────────────────────────────────────────── */}
        <section style={{ padding: "0 0 5rem", backgroundColor: WHITE }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, textAlign: "center", marginBottom: "1.75rem" }}>Tell us where you're headed</p>
            <div className="cards-3col" style={{ alignItems: "stretch" }}>
              {["I'm expanding into India", "I'm entering UAE, Singapore or USA", "I need to restructure across jurisdictions"].map(label => (
                <div key={label} onClick={() => setShowContact(true)}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 36px rgba(140,26,43,0.18)"
                    const card = e.currentTarget.querySelector(".gme-intent-card")
                    card.style.backgroundColor = RED
                    card.style.borderColor = RED
                    card.querySelector(".card-label").style.color = "#fff"
                    card.querySelector(".card-arrow").style.color = "#fff"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    const card = e.currentTarget.querySelector(".gme-intent-card")
                    card.style.backgroundColor = "transparent"
                    card.style.borderColor = "rgba(140,26,43,0.4)"
                    card.querySelector(".card-label").style.color = INK
                    card.querySelector(".card-arrow").style.color = RED
                  }}
                  style={{ cursor: "pointer", display: "block", transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1)", borderRadius: 12 }}>
                  <div className="gme-intent-card" style={{ border: "1.5px solid rgba(140,26,43,0.4)", borderRadius: 12, padding: "1.6rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "background-color 0.25s, border-color 0.25s", height: "100%" }}>
                    <span className="card-label" style={{ fontFamily: font.sans, fontSize: "1.25rem", fontWeight: 700, color: INK, transition: "color 0.25s" }}>{label}</span>
                    <span className="card-arrow" style={{ color: RED, fontSize: "1.25rem", fontWeight: 600, transition: "color 0.25s" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE COVER ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F5F5F5", padding: "5rem 0", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div className="heading-2col" style={{ marginBottom: "1.25rem" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>What We Cover</span>
                </div>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  End-to-end entry.<br />
                  <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>One integrated team.</em>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                style={{ paddingTop: "3.5rem", display: "flex", justifyContent: "flex-end" }}>
                <div style={{ borderLeft: `2px solid ${RED}`, paddingLeft: "1.25rem", maxWidth: 280 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "1.1rem", fontWeight: 700, color: INK, lineHeight: 1.65 }}>
                    One mandate across every stage. No handoffs between advisors.
                  </p>
                </div>
              </motion.div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.85rem" }}>
              {SERVICES.map((s, i) => {
                const isOpen = openScope === i
                return (
                  <motion.div key={s.n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    style={{ backgroundColor: WHITE, border: "1px solid rgba(28,23,18,0.1)", padding: "1.75rem 1.5rem", display: "flex", flexDirection: "column", minHeight: 320 }}>
                    <span style={{ fontFamily: font.num, fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic", color: RED, lineHeight: 1, marginBottom: "0.65rem" }}>{s.n}</span>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1.15rem", fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: "0.55rem" }}>{s.title}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.82rem", fontWeight: 450, color: MUTED, lineHeight: 1.65, marginBottom: "0.75rem", flex: 1 }}>{s.body}</p>
                    <button onClick={() => setOpenScope(isOpen ? -1 : i)}
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0 0", border: "none", background: "none", cursor: "pointer", marginTop: "auto" }}>
                      <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>Scope Includes</span>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, backgroundColor: isOpen ? RED : "transparent", border: `1px solid ${isOpen ? RED : "rgba(28,23,18,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.sans, fontSize: "0.72rem", color: isOpen ? "#fff" : INK, transition: "all 0.25s" }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
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
                )
              })}
            </div>

          </div>
        </section>

        {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "6rem 0", textAlign: "center" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 820, margin: "0 auto" }}>
            <p style={{ fontFamily: font.sans, fontSize: "4rem", color: "rgba(140,26,43,0.22)", lineHeight: 0.5, marginBottom: "2rem" }}>"</p>
            <p style={{ fontFamily: font.sans, fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 700, color: INK, lineHeight: 1.65, marginBottom: "2rem" }}>
              "We had spent months trying to structure our India entry through local advisors. 10x Global identified a structural issue in one call that would have cost us years to unwind. That review alone was worth more than everything else combined."
            </p>
            <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(107,101,96,0.45)" }}>
              ~ Client Testimonial
            </p>
          </motion.div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ───────────────────────────────────────── */}
        <section style={{ backgroundColor: WHITE, padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>Who This Is For</span>
              </div>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                Built for companies that<br />
                <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>don't fit in one country.</em>
              </h2>
            </motion.div>

            <div className="cards-3col">
              {WHO.map((w, i) => (
                <motion.div key={w.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ position: "relative", borderLeft: `3px solid ${RED}`, padding: "2rem 1.75rem", backgroundColor: CREAM, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <span style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", fontFamily: font.num, fontSize: "6rem", fontWeight: 800, color: "rgba(140,26,43,0.25)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{w.n}</span>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.2rem", fontWeight: 700, color: INK, marginBottom: "0.85rem", lineHeight: 1.4, position: "relative" }}>{w.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: MUTED, lineHeight: 1.75, position: "relative" }}>{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <section id="how-it-works" style={{ backgroundColor: CREAM, padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, color: INK, lineHeight: 1.2 }}>
                First call to fully operational.<br />
                <em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>At breakneck speed.</em>
              </h2>
            </motion.div>

            <div style={{ position: "relative" }}>
              <div className="steps-timeline-line-horiz" style={{ position: "absolute", top: 29, left: "12.5%", right: "12.5%", height: 1, backgroundColor: RED, zIndex: 0 }} />
              <div className="geo-regional-grid">
                {STEPS.map((s, i) => (
                  <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`step-item${i % 2 === 1 ? " step-item-even" : ""}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div className="step-circle" style={{ width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(140,26,43,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", flexShrink: 0, position: "relative", zIndex: 1 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: font.num, fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{s.n}</span>
                      </div>
                    </div>
                    <div className="step-text">
                      <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: RED, marginBottom: "0.5rem" }}>{s.step}</p>
                      <h3 style={{ fontFamily: font.sans, fontSize: "1.4rem", fontWeight: 700, color: INK, marginBottom: "0.75rem", lineHeight: 1.25 }}>{s.title}</h3>
                      <p style={{ fontFamily: font.sans, fontSize: "0.85rem", color: MUTED, lineHeight: 1.7 }}>{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                    <span style={{ fontFamily: font.sans, fontSize: "1.15rem", fontWeight: 700, color: INK, lineHeight: 1.4 }}>{faq.q}</span>
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
              Tell us where you're going.
            </h2>
            <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: RED, lineHeight: 1.08, marginBottom: "1.75rem" }}>
              We'll design the structure.
            </h2>
            <p style={{ fontFamily: font.sans, fontSize: "1rem", color: MUTED, lineHeight: 1.8, marginBottom: "2rem" }}>
              Free 30-minute review. No pitch. We'll tell you honestly what we see.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.75rem" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", marginBottom: "0.75rem", border: "2px solid rgba(140,26,43,0.18)" }}>
                <Image src="/team/priya.png" alt="Priya Dubey" width={80} height={80} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </div>
              <p style={{ fontFamily: font.sans, fontWeight: 600, fontSize: "0.85rem", color: INK, marginBottom: "0.2rem" }}>Priya Dubey</p>
              <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: MUTED }}>Lead, Transaction Advisory</p>
            </div>
            <button
              onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/pdubey-10x/30min" })}
              style={{ backgroundColor: INK, color: WHITE, padding: "1rem 2.5rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Book Priya's Calendar →
            </button>
          </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
