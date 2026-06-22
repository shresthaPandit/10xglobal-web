"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { font } from "@/lib/theme"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"
import { EngagementModal, ENGAGEMENTS, CARD_IMAGES } from "@/components/sections/EngagementsSection"

const RED   = "#8C1A2B"
const WHITE = "#FFFFFF"
const CREAM = "#FFFFFF"
const INK   = "#1C1712"
const MUTED = "#6B6560"

// ─── Data ──────────────────────────────────────────────────────────────────

const SERVICES = [
  { n: "01", title: "Entity Setup & Structuring",    body: "We design the structure before filing a document: entity type, holding layer, FDI treatment, and future deal architecture. Built for where you're going, not just where you are today.",        scope: ["Entity type selection","Holding structure design","FDI structuring","Shareholder agreement","Cross-border capital flows"] },
  { n: "02", title: "Regulatory Registration",        body: "MCA incorporation, exchange control compliances, free zone registration, MAS licensing. We manage every step across every jurisdiction. No missed triggers. No compliance gaps.",              scope: ["MCA incorporation","Exchange control compliances","Free zone registration","Tax registration (GST, VAT)","Compliance calendar setup"] },
  { n: "03", title: "Banking & Treasury Access",      body: "Getting a bank account in India or UAE is where companies stall for months. We have direct banking relationships across all our geographies and manage the process end-to-end.",              scope: ["Banking partner introduction","Account opening support","Treasury structure design","FX management guidance","Payment infrastructure"] },
  { n: "04", title: "Employment & Hiring Structure",  body: "We structure your hiring for compliance and cost efficiency, without creating permanent establishment risk. Includes local directors, payroll setup, and cross-border ESOP design.",        scope: ["Local director engagement","Employment contract structure","PE risk assessment","Payroll setup","ESOP cross-border design"] },
]

const WHO = [
  { n: "01", title: "Indian company going global.",          body: "Expanding to UAE, Singapore, or the US. Holding structure, capital flow design, regulatory registration, and banking, in the right order. We've done this 100+ times." },
  { n: "02", title: "Foreign company entering India.",       body: "Entity type, FDI structuring, RBI approvals, and banking, all designed around your global structure, not just Indian compliance. Right from day one." },
  { n: "03", title: "Restructuring before a raise or IPO.", body: "Investors will ask about your structure. Your lead investor may have already flagged it internally. We fix it before that conversation happens." },
]

const STEPS = [
  { n: 1, step: "Step 1", title: "Diagnose",  body: "Understand your business, target market, and capital structure before recommending anything" },
  { n: 2, step: "Step 2", title: "Structure", body: "Design entity architecture, tax structure, and compliance roadmap before a document is filed" },
  { n: 3, step: "Step 3", title: "Register",  body: "Incorporation, regulatory filings, and banking, all managed in parallel where possible" },
  { n: 4, step: "Step 4", title: "Operate",   body: "Bank accounts open, payroll running, compliance calendar in place. You focus on the business" },
]

const FAQS = [
  { q: "Why does entity structure matter so much at the point of entry?",                           a: "Because fixing it later costs 3–5× more in time, money, and legal complexity. The entity type determines your tax treatment, fundraising ability, profit repatriation, and future transaction structure. Get it right once." },
  { q: "How long does a full market entry take?",                                                   a: "4–8 weeks from engagement to operational entity. India through MCA runs 3–5 weeks; UAE free zones are often faster. Banking runs in parallel and typically adds 2–4 weeks." },
  { q: "We're already incorporated but think our structure is wrong.",                              a: "Structure reviews are a large part of our work. We assess your current setup, identify the risks, and redesign where needed, before a fundraise or due diligence process surfaces the problem for you." },
  { q: "We've been running engineers on contractor agreements for 18 months. Are we in trouble?",   a: "You may be fine. You may have a PE exposure. We'll tell you which one, honestly, and if it's a problem, we'll show you how to fix it before it becomes urgent." },
  { q: "Do you work across multiple jurisdictions in one mandate?",                                 a: "This is our core capability. We design structures that account for how India, UAE, Singapore, and the US interact with each other, not just how each works in isolation." },
]

const TOTAL_FRAMES = 192

// ─── Count-up stat box ──────────────────────────────────────────────────────

function CountUpStat({ target, suffix = "", label }) {
  const [count, setCount]   = useState(0)
  const ref                 = useRef(null)
  const startedRef          = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        const duration = 1500
        const start    = performance.now()
        const tick = (now) => {
          const p    = Math.min(1, (now - start) / duration)
          const ease = 1 - Math.pow(1 - p, 3)   // easeOutCubic
          setCount(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} style={{
      flex:         1,
      background:   "linear-gradient(155deg, #a8202f 0%, #6b111e 100%)",
      padding:      "1.5rem 1rem 1.25rem",
      textAlign:    "center",
      borderRadius: "14px",
      boxShadow:    "0 5px 0 #3e060e, 0 10px 22px rgba(80,8,18,0.38), inset 0 1px 0 rgba(255,255,255,0.14)",
      position:     "relative",
      overflow:     "hidden",
    }}>
      {/* subtle shine top-left */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)", borderRadius: "14px 14px 0 0", pointerEvents: "none" }} />
      <div style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 2.4vw, 2.3rem)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em", position: "relative" }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: "0.45rem", position: "relative" }}>
        {label}
      </div>
    </div>
  )
}

// ─── Typewriter ─────────────────────────────────────────────────────────────

function TypewriterText({ text, style }) {
  const [displayed, setDisplayed] = useState("")
  const startedRef                 = useRef(false)
  const ref                        = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true
        let i = 0
        const id = setInterval(() => {
          i++
          setDisplayed(text.slice(0, i))
          if (i >= text.length) clearInterval(id)
        }, 36)
      }
    }, { threshold: 0.6 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return (
    <span ref={ref} style={style}>
      {displayed}
      {displayed.length < text.length && (
        <span className="tw-cursor" />
      )}
    </span>
  )
}

// ─── Service card images ────────────────────────────────────────────────────

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
]

function ServiceCard({ s, i, onContact }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onContact}
      style={{ position: "relative", overflow: "hidden", height: "clamp(360px, 26vw, 480px)", cursor: "pointer", borderRadius: 8, boxShadow: "0 2px 20px rgba(28,23,18,0.1)" }}
    >
      {/* Background image — blurs on hover */}
      <motion.div
        animate={{ filter: hovered ? "blur(6px) brightness(0.25)" : "blur(0px) brightness(0.82)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img src={SERVICE_IMAGES[i]} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.52) 100%)" }} />
      </motion.div>

      {/* Default state: number tag + frosted title card */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", pointerEvents: hovered ? "none" : "auto" }}
      >
        <span />
        <div style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: 10, padding: "1rem 1.25rem" }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.92rem", fontWeight: 700, color: INK, lineHeight: 1.4, margin: 0 }}>{s.title}</p>
        </div>
      </motion.div>

      {/* Hover state: full content */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 14 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "1.75rem", pointerEvents: hovered ? "auto" : "none" }}
      >
        <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1rem, 1.3vw, 1.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: "0.75rem", textShadow: "none" }}>{s.title}</h3>
        <p style={{ fontFamily: font.sans, fontSize: "0.77rem", fontWeight: 600, color: "rgba(255,255,255,0.92)", lineHeight: 1.65, marginBottom: "0.85rem", flex: 1, textShadow: "none" }}>{s.body}</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.32rem", margin: "0 0 1.4rem", padding: 0 }}>
          {s.scope.slice(0, 3).map((item, si) => (
            <li key={si} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.92)", textShadow: "none" }}>
              <span style={{ color: RED, fontSize: "0.4rem", flexShrink: 0 }}>◆</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={e => { e.stopPropagation(); onContact() }}
          style={{
            backgroundColor: RED, color: "#fff", border: "none",
            padding: "0.78rem 1.5rem",
            fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            cursor: "pointer", borderRadius: 50,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            alignSelf: "stretch",
          }}
        >
          Get Started →
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Globe background — fixed behind entire page, driven by total page scroll ──

function GlobeBackground() {
  const canvasRef     = useRef(null)
  const framesRef     = useRef([])
  const targetIdxRef  = useRef(0)
  const currentIdxRef = useRef(0)
  const rafRef        = useRef(null)
  const [ready,         setReady]         = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)

  // Load frames — show globe as soon as frame 0 is ready, rest load in background
  useEffect(() => {
    const imgs = []
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image()
      if (i === 0) img.onload = () => setReady(true)
      img.src = `/frames/gme/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`
      imgs.push(img)
    }
    framesRef.current = imgs
    return () => imgs.forEach(img => { img.onload = null })
  }, [])

  // Draw — cover fit into square canvas so grey edges are cropped, only globe center shows
  const drawFrame = useCallback((idx) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = framesRef.current[Math.max(0, Math.min(TOTAL_FRAMES - 1, idx))]
    if (!img?.complete || !img.naturalWidth) return
    const ctx = canvas.getContext("2d")
    const cw = canvas.width, ch = canvas.height
    const iw = img.naturalWidth, ih = img.naturalHeight
    // cover: scale so the smaller canvas dimension fills — crops grey side bars
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale, sh = ih * scale
    const dx = (cw - sw) / 2, dy = (ch - sh) / 2
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, 0, 0, iw, ih, dx, dy, sw, sh)
  }, [])

  // RAF — smooth lerp only, no scroll logic here
  useEffect(() => {
    const loop = () => {
      const n = currentIdxRef.current + (targetIdxRef.current - currentIdxRef.current) * 0.12
      currentIdxRef.current = n
      drawFrame(Math.round(n))
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [drawFrame])

  // Scroll → frame across 4 viewport heights (animation spreads across full page feel)
  useEffect(() => {
    const onScroll = () => {
      const scrollY    = Math.max(
        window.pageYOffset || 0,
        window.scrollY   || 0,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      )
      // Play frames over 4 screen-heights, capped at 50% of total so globe never fully reveals
      const animDist   = window.innerHeight * 4
      const p          = Math.min(1, scrollY / animDist)
      targetIdxRef.current = Math.floor(p * (TOTAL_FRAMES - 1))

      // Fade opacity as page scrolls, but floor at 0.14 so globe stays faint below the steps section
      const totalHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const totalScroll = Math.max(1, totalHeight - window.innerHeight)
      const pageP       = scrollY / totalScroll
      const fade        = Math.max(0.45, 1 - pageP * 1.35)
      setScrollOpacity(fade)
    }
    window.addEventListener("scroll",   onScroll, { passive: true, capture: true })
    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll",   onScroll, { capture: true })
      document.removeEventListener("scroll", onScroll, { capture: true })
    }
  }, [])

  // Canvas: square 70vh — cover fit crops grey bars, circle clip = perfect clean globe
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)
      const size = Math.round(window.innerHeight * 0.70)
      canvas.width  = size * dpr
      canvas.height = size * dpr
      canvas.style.width  = size + "px"
      canvas.style.height = size + "px"
      drawFrame(Math.round(currentIdxRef.current))
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [drawFrame])

  return (
    <div style={{
      position:      "fixed",
      top:           "50%",
      left:          "50%",
      transform:     "translate(-50%, -50%)",
      zIndex:        0,
      pointerEvents: "none",
      opacity:       ready ? scrollOpacity : 0,
      filter:        "saturate(0.38)",
      transition:    "opacity 0.4s ease",
      mixBlendMode:     "multiply",
      WebkitMaskImage:  "radial-gradient(circle at center, black 42%, transparent 68%)",
      maskImage:        "radial-gradient(circle at center, black 42%, transparent 68%)",
    }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function GlobalMarketEntryPage() {
  const [openFaq,       setOpenFaq]       = useState(0)
  const [showContact,   setShowContact]   = useState(false)
  const [showCaseStudy, setShowCaseStudy] = useState(false)

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
      {/* Globe animates in background behind entire page */}
      <GlobeBackground />

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <AnimatePresence>
        {showCaseStudy && (
          <EngagementModal
            eng={ENGAGEMENTS[0]}
            onClose={() => setShowCaseStudy(false)}
            heroImg={CARD_IMAGES[0]}
          />
        )}
      </AnimatePresence>
      <Navbar />
      <style>{`
        /* Headings: strong white glow so they lift off the globe */
        .gme-page h1 { text-shadow: 0 0 32px rgba(255,255,255,1), 0 0 64px rgba(255,255,255,0.85); }
        .gme-page h2, .gme-page h3 { text-shadow: 0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.75); }
        .gme-page p  { text-shadow: 0 0 12px rgba(255,255,255,1), 0 0 24px rgba(255,255,255,0.8); }

        /* Primary CTA button */
        .gme-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.72rem 1.5rem;
          background: ${INK}; color: #fff;
          border: 2px solid ${INK};
          font-family: ${font.sans}; font-weight: 700;
          font-size: 0.72rem; letter-spacing: 0.13em;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.28s, color 0.28s, border-color 0.28s;
          text-shadow: none; width: fit-content;
        }
        .gme-btn::after {
          content: ''; position: absolute; inset: 0;
          background: ${RED};
          transform: translateX(-101%);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .gme-btn:hover::after { transform: translateX(0); }
        .gme-btn span { position: relative; z-index: 1; }
        .gme-btn .arr { position: relative; z-index: 1; transition: transform 0.28s; }
        .gme-btn:hover .arr { transform: translateX(5px); }

        /* Typewriter cursor */
        @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tw-cursor { display: inline-block; width: 2px; height: 1em; background: currentColor; margin-left: 2px; vertical-align: text-bottom; animation: tw-blink 0.75s step-end infinite; }

        /* Ghost button */
        .gme-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          background: transparent; color: ${INK};
          border: 1.5px solid rgba(28,23,18,0.28);
          font-family: ${font.sans}; font-weight: 600;
          font-size: 0.72rem; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; text-decoration: none;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
          text-shadow: none; width: fit-content;
        }
        .gme-btn-ghost:hover { background: ${INK}; color: #fff; border-color: ${INK}; }
      `}</style>
      <main className="gme-page" style={{ fontFamily: font.sans, position: "relative", zIndex: 1 }}>

        {/* ── HERO ── 3-col: [left] [globe center empty] [right] ──────── */}
        <section style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", backgroundColor: "transparent" }}>
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 42vw 1fr", padding: "0", alignItems: "center" }}>

            {/* LEFT — eyebrow + big heading (h1 bleeds over globe) */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              style={{ padding: "4rem 0 4rem 5vw", overflow: "visible", position: "relative", zIndex: 2 }}>
              <div style={{ marginBottom: "1.75rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED }}>
                  Global Market Entry
                </span>
              </div>
              <h1 style={{ fontFamily: font.sans, fontSize: "clamp(3.6rem, 6vw, 7.5rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, width: "155%", position: "relative" }}>
                {[
                  { text: "Enter new",   color: INK },
                  { text: "markets.",    color: INK },
                  { text: "Without the", color: INK },
                  { text: "expensive",   color: RED },
                  { text: "mistakes.",   color: RED },
                ].map((line, idx) => (
                  <span key={idx} style={{ display: "block", overflow: "hidden", lineHeight: 1.08 }}>
                    <motion.span
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.15 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: "block", color: line.color }}
                    >
                      {line.text}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* CENTER — empty, globe floats here */}
            <div />

            {/* RIGHT — body + stats + buttons */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.14, ease: [0.22,1,0.36,1] }}
              style={{ padding: "4rem 4vw 4rem 0" }}>

              <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: MUTED, lineHeight: 1.72, marginBottom: "0.65rem" }}>
                Every advisor you hire across jurisdictions has blind spots about the others.{" "}
                <strong style={{ color: INK, fontWeight: 700 }}>We hold the full picture across all of them.</strong>
              </p>
              <p style={{ fontFamily: font.sans, fontSize: "0.95rem", color: MUTED, lineHeight: 1.68, marginBottom: "1.5rem" }}>
                The wrong structure costs <strong style={{ color: RED }}>3 to 5×</strong> more to fix than getting it right on day one.
              </p>

              {/* KPI stats — red boxes with count-up */}
              <div style={{ display: "flex", gap: "0.55rem", marginBottom: "1.6rem" }}>
                <CountUpStat target={100} suffix="+" label="Market Entries" />
                <CountUpStat target={12}  suffix="+" label="Years Active"   />
                <CountUpStat target={4}   suffix=""  label="Jurisdictions"  />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", alignItems: "flex-start" }}>
                <button className="gme-btn" onClick={() => setShowContact(true)}>
                  <span>Get a structure review</span>
                  <span className="arr">→</span>
                </button>
                <a href="#how-it-works" className="gme-btn-ghost">
                  See how we work →
                </a>
              </div>

            </motion.div>

          </div>
        </section>

        {/* ── INTENT BUTTONS ───────────────────────────────────────── */}
        <section style={{ padding: "0 0 5rem" }}>
          <style>{`
            .intent-btn {
              display: inline-flex; align-items: center; gap: 1rem;
              padding: 0.85rem 1.4rem 0.85rem 1.1rem;
              background: rgba(255,255,255,0.92);
              border: 1.5px solid rgba(28,23,18,0.16);
              cursor: pointer; text-align: left;
              position: relative; overflow: hidden;
              transition: border-color 0.22s, box-shadow 0.22s; text-shadow: none;
              border-radius: 4px;
            }
            .intent-btn::after {
              content: ''; position: absolute; inset: 0;
              background: ${RED};
              transform: translateX(-101%);
              transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
            }
            .intent-btn:hover { border-color: ${RED}; box-shadow: 0 4px 16px rgba(140,26,43,0.18); }
            .intent-btn:hover::after { transform: translateX(0); }
            .intent-btn:hover .ib-num   { color: rgba(255,255,255,0.55); }
            .intent-btn:hover .ib-label { color: #fff; }
            .intent-btn:hover .ib-arr   { color: #fff; transform: translateX(3px); }
            .ib-num   { position: relative; z-index: 1; font-family: ${font.sans}; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.14em; color: ${RED}; flex-shrink: 0; transition: color 0.22s; }
            .ib-label { position: relative; z-index: 1; font-family: ${font.sans}; font-size: 0.88rem; font-weight: 700; color: ${INK}; line-height: 1.2; transition: color 0.22s; }
            .ib-arr   { position: relative; z-index: 1; font-size: 0.9rem; color: ${MUTED}; transition: transform 0.22s, color 0.22s; margin-left: 0.25rem; }
          `}</style>
          <div style={{ padding: "0 5vw" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.88rem", fontWeight: 700, color: INK, textAlign: "left", marginBottom: "1.4rem", textShadow: "0 0 16px rgba(255,255,255,1)" }}>
              Tell us where you're headed
            </p>
            <div style={{ display: "flex", gap: "0.65rem" }}>
              {[
                { n: "01", label: "I'm expanding into India" },
                { n: "02", label: "I'm entering UAE, Singapore or USA" },
                { n: "03", label: "I need to restructure across jurisdictions" },
              ].map(({ n, label }, idx) => (
                <motion.button
                  key={n}
                  className="intent-btn"
                  onClick={() => setShowContact(true)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  style={{ flex: 1 }}
                >
                  <span className="ib-num">{n}</span>
                  <span className="ib-label">{label}</span>
                  <span className="ib-arr">→</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE COVER ─────────────────────────────────────────── */}
        <section style={{ padding: "5rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            {/* Centered heading */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "0.75rem" }}>What We Cover</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 800, color: INK, lineHeight: 1.1, margin: 0 }}>
                End-to-end entry.<br />
                <em style={{ fontStyle: "normal", color: RED }}>One integrated team.</em>
              </h2>
            </motion.div>

            {/* Image cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.n} s={s} i={i} onContact={() => setShowContact(true)} />
              ))}
            </div>

            {/* Typewriter tagline below cards */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              style={{ textAlign: "center", marginTop: "2.25rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "clamp(1rem, 1.4vw, 1.25rem)", fontWeight: 700, color: INK, lineHeight: 1.6, margin: 0, textShadow: "0 0 20px rgba(255,255,255,1)" }}>
                <TypewriterText text="One mandate across every stage. No handoffs between advisors." />
              </p>
            </motion.div>

          </div>
        </section>

        {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
        <section style={{ padding: "7rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "4rem", alignItems: "center" }}
            >
              {/* Left — eyebrow + quote */}
              <div>
                <div style={{ marginBottom: "2.5rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, textShadow: "0 0 20px rgba(255,255,255,1)" }}>
                    Client Testimonial
                  </span>
                </div>
                <svg width="48" height="36" viewBox="0 0 48 36" fill="none" style={{ marginBottom: "1.75rem", opacity: 0.75 }}>
                  <path d="M0 36V22.5C0 10.5 6 3 18 0l3 4.5C13.5 6.75 10.5 11.25 10.5 18H18V36H0ZM30 36V22.5C30 10.5 36 3 48 0l3 4.5C43.5 6.75 40.5 11.25 40.5 18H48V36H30Z" fill={RED}/>
                </svg>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "clamp(1.1rem, 1.4vw, 1.32rem)",
                  fontWeight:    500,
                  color:         INK,
                  lineHeight:    1.84,
                  letterSpacing: "0.01em",
                  textShadow:    "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9)",
                }}>
                  Two markets, set up at the same time, and we hardly felt the lift. I'd budgeted months for this. Inside eight weeks both entities were live, accounts open, and our first hires cleared to start. When Europe came up later, we didn't even think about going elsewhere.
                </p>
                <button
                  onClick={() => setShowCaseStudy(true)}
                  style={{
                    marginTop: "2rem", textShadow: "none",
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.7rem 1.5rem",
                    background: RED, color: "#fff",
                    border: `1.5px solid ${RED}`,
                    fontFamily: font.sans, fontWeight: 700,
                    fontSize: "0.72rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: "pointer",
                    transition: "background 0.25s, border-color 0.25s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#5a0f1a"; e.currentTarget.style.borderColor = "#5a0f1a" }}
                  onMouseLeave={e => { e.currentTarget.style.background = RED; e.currentTarget.style.borderColor = RED }}
                >
                  See how we did it →
                </button>
              </div>

              {/* Right — photo + attribution, no card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 12px 48px rgba(28,23,18,0.18), 0 2px 10px rgba(28,23,18,0.1)", background: "#e8e4de" }}>
                  <Image
                    src="/team/rayomand.jpeg"
                    alt="Rayomand Engineer"
                    width={200}
                    height={267}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
                <div style={{ marginTop: "1.1rem", paddingTop: "1.1rem", borderTop: `2px solid ${RED}`, textAlign: "center" }}>
                  <p style={{ fontFamily: font.sans, fontWeight: 700, fontSize: "0.88rem", color: INK, margin: 0, textShadow: "0 0 12px rgba(255,255,255,1)" }}>
                    Rayomand Engineer
                  </p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.72rem", color: MUTED, margin: "0.22rem 0 0", textShadow: "0 0 12px rgba(255,255,255,1)" }}>
                    Vice President Finance · CleverTap
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ───────────────────────────────────────── */}
        <section style={{ backgroundColor: "transparent", padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.5rem" }}>Who This Is For</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                Built for companies that<br /><em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>don't fit in one country.</em>
              </h2>
            </motion.div>
            <div className="cards-3col">
              {WHO.map((w, i) => (
                <motion.div key={w.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{
                    position: "relative",
                    borderLeft: `3px solid ${RED}`,
                    borderTop: "1px solid rgba(255,255,255,0.85)",
                    borderRight: "1px solid rgba(255,255,255,0.6)",
                    borderBottom: "1px solid rgba(255,255,255,0.6)",
                    padding: "2rem 1.75rem",
                    backgroundColor: "rgba(255,255,255,0.32)",
                    backdropFilter: "blur(22px) saturate(160%) brightness(1.04)",
                    WebkitBackdropFilter: "blur(22px) saturate(160%) brightness(1.04)",
                    borderRadius: "6px",
                    boxShadow: "0 2px 20px rgba(28,23,18,0.06), inset 0 1px 0 rgba(255,255,255,1), inset 0 0 0 1px rgba(255,255,255,0.5)",
                  }}>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.2rem", fontWeight: 700, color: INK, marginBottom: "0.85rem", lineHeight: 1.4 }}>{w.title}</h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: MUTED, lineHeight: 1.75 }}>{w.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <section id="how-it-works" style={{ backgroundColor: "transparent", padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, color: INK, lineHeight: 1.2 }}>
                First call to fully operational.<br /><em style={{ display: "inline-block", marginTop: "0.12em", fontStyle: "normal", color: RED }}>At breakneck speed.</em>
              </h2>
            </motion.div>
            <div style={{ position: "relative" }}>
              <div className="steps-timeline-line-horiz" style={{ position: "absolute", top: 29, left: "12.5%", right: "12.5%", height: 1, backgroundColor: RED, zIndex: 0 }} />
              {/* Animated red dot travels along the timeline and pauses at each step */}
              <div style={{ position: "absolute", top: 29, left: "12.5%", right: "12.5%", height: 0, zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                  style={{
                    position: "absolute",
                    top: -6,
                    left: 0,
                    marginLeft: -6,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: RED,
                    boxShadow: "0 0 0 4px rgba(140,26,43,0.22), 0 0 14px rgba(140,26,43,0.55)",
                  }}
                  animate={{
                    left: ["0%", "0%", "33.33%", "33.33%", "66.66%", "66.66%", "100%", "100%"],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.12, 0.32, 0.4, 0.6, 0.68, 0.88, 1],
                    ease: ["linear", [0.4, 0, 0.2, 1], "linear", [0.4, 0, 0.2, 1], "linear", [0.4, 0, 0.2, 1], "linear"],
                    repeat: Infinity,
                    repeatDelay: 0.8,
                  }}
                />
              </div>
              <div className="geo-regional-grid">
                {STEPS.map((s, i) => (
                  <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`step-item${i % 2 === 1 ? " step-item-even" : ""}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div className="step-circle" style={{ width: 58, height: 58, borderRadius: "50%", backgroundColor: "rgba(140,26,43,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", flexShrink: 0, position: "relative", zIndex: 1 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: font.sans, fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{s.n}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: RED, marginBottom: "0.5rem" }}>{s.step}</p>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1.4rem", fontWeight: 700, color: INK, marginBottom: "0.75rem", lineHeight: 1.25 }}>{s.title}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.9rem", fontWeight: 700, color: INK, lineHeight: 1.65, textShadow: "0 0 16px rgba(255,255,255,1)" }}>{s.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ padding: "0", background: "transparent", position: "relative" }}>

          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "5rem 5vw 7rem" }}>

            {/* Header — full width, text + CTA on same line */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem" }}>
              <div>
                <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1rem", textShadow: "none" }}>Common Questions</span>
                <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 4vw, 4.8rem)", fontWeight: 800, color: INK, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0, textShadow: "none" }}>
                  Before we interact,<br />
                  <em style={{ fontStyle: "normal", color: RED }}>some answers.</em>
                </h2>
              </div>
              <button onClick={() => setShowContact(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "none", border: `1.5px solid rgba(28,23,18,0.2)`, cursor: "pointer", padding: "0.75rem 1.4rem", fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, color: INK, letterSpacing: "0.12em", textTransform: "uppercase", textShadow: "none", whiteSpace: "nowrap", flexShrink: 0, marginBottom: "0.5rem", transition: "background 0.22s, color 0.22s, border-color 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = RED }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = INK; e.currentTarget.style.borderColor = "rgba(28,23,18,0.2)" }}>
                Talk to us →
              </button>
            </motion.div>

            {/* FAQ rows — full width, numbered editorial */}
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
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width: "100%", display: "grid", gridTemplateColumns: "3.5rem 1fr 2.5rem", alignItems: "center", gap: "1.5rem", padding: "2rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", textShadow: "none" }}>
                  {/* Number */}
                  <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: openFaq === i ? RED : "rgba(28,23,18,0.22)", transition: "color 0.25s", userSelect: "none" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Question */}
                  <span style={{ fontFamily: font.sans, fontSize: "clamp(1rem, 1.4vw, 1.25rem)", fontWeight: 700, color: INK, lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                  {/* Toggle */}
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

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section style={{ padding: "9rem 0", position: "relative", overflow: "hidden" }}>
          {/* Background image + dark overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(12,26,46,0.96) 0%, rgba(12,26,46,0.88) 55%, rgba(12,26,46,0.94) 100%)" }} />
            {/* red accent glow — bottom right */}
            <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(140,26,43,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1360, margin: "0 auto", padding: "0 5vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw", alignItems: "center" }}>

            {/* LEFT — headline + trust row */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#e8324a", display: "block", marginBottom: "1.5rem", textShadow: "0 0 20px rgba(232,50,74,0.5)" }}>Start the Conversation</span>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(3.6rem, 5.2vw, 7rem)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 0.05em", textShadow: "none" }}>
                Tell us where<br />you're going.
              </h2>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(3.6rem, 5.2vw, 7rem)", fontWeight: 800, color: "#e8324a", lineHeight: 1.06, letterSpacing: "-0.03em", margin: 0, textShadow: "none" }}>
                We'll design<br />the structure.
              </h2>
            </motion.div>

            {/* RIGHT — frosted glass Priya card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.14 }}
              style={{
                background:          "rgba(255,255,255,0.055)",
                backdropFilter:      "blur(28px)",
                WebkitBackdropFilter:"blur(28px)",
                border:              "1px solid rgba(255,255,255,0.1)",
                borderRadius:        "18px",
                padding:             "3rem 2.75rem",
                boxShadow:           "0 24px 72px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* top label */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: RED, flexShrink: 0 }} />
                <span style={{ fontFamily: font.sans, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textShadow: "none" }}>Free 30-Minute Review</span>
              </div>

              <p style={{ fontFamily: font.sans, fontSize: "1.25rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.78, marginBottom: "2.25rem", textShadow: "none", fontWeight: 400 }}>
                With a senior partner. No jargon, no pitch. We'll tell you honestly what we see.
              </p>

              {/* Priya */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", marginBottom: "2.25rem", paddingBottom: "2.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(140,26,43,0.5)", boxShadow: "0 0 0 3px rgba(140,26,43,0.15)" }}>
                  <Image src="/team/priya.png" alt="Priya Dubey" width={88} height={88} style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
                <div>
                  <p style={{ fontFamily: font.sans, fontWeight: 700, fontSize: "1.15rem", color: "#fff", margin: 0, textShadow: "none" }}>Priya Dubey</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", margin: "0.25rem 0 0", textShadow: "none" }}>Lead, Transaction Advisory</p>
                </div>
              </div>

              <button
                onClick={() => window.Calendly?.initPopupWidget({ url: "https://calendly.com/pdubey-10x/30min" })}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.7rem",
                  backgroundColor: RED, color: "#fff",
                  padding: "1.1rem 2rem", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontFamily: font.sans, fontWeight: 700,
                  fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase",
                  textShadow: "none", width: "100%",
                  boxShadow: "0 4px 0 #3e060e, 0 8px 24px rgba(140,26,43,0.4)",
                  transition: "opacity 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 0 #3e060e, 0 12px 32px rgba(140,26,43,0.5)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 0 #3e060e, 0 8px 24px rgba(140,26,43,0.4)" }}
              >
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

