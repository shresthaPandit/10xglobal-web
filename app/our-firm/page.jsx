"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { font } from "@/lib/theme"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"
import CareerModal from "@/components/CareerModal"

const RED   = "#8C1A2B"
const CREAM = "#FFFFFF"
const GREY  = "#F5F5F5"
const INK   = "#1C1712"
const MUTED = "#6B6560"
const GOLD  = "#9A7B3C"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const PRINCIPLES = [
  { n: "01", title: "Integrity, without exception",
    body: "We lead with transparency and trust. The counsel we give is the counsel we would act on ourselves: clear eyed, candid, and always in your interest." },
  { n: "02", title: "One integrated team",
    body: "Finance, legal, tax, compliance and technology under a single roof, working in concert, so nothing of consequence ever falls between the gaps." },
  { n: "03", title: "Proximity to leadership",
    body: "You work directly with partners, not layers of intermediaries. Senior judgement is there precisely when the decisions that matter are being made." },
  { n: "04", title: "Measured by your outcomes",
    body: "We define success as you do: in real results, not consulting deliverables. Productivity, savings, compliance, growth. We measure ours by yours." },
]

const PARTNERS = [
  { initials: "SK", name: "Siddharth Kohli", role: "Founding Partner", spec: "Strategy & Transactions", bg: RED,  text: "#fff", photo: "/team/siddharth.png", linkedin: "https://www.linkedin.com/in/siddharth-kohli-a50a4037/" },
  { initials: "AJ", name: "Ashish Jain",     role: "Founding Partner", spec: "Finance & Advisory",     bg: GOLD, text: "#fff", photo: "/team/ashish.png",    linkedin: "https://www.linkedin.com/in/ashish-jain-922b5118b/" },
]

const TEAM = [
  { initials: "NJ", name: "Niraj Jain",         role: "Practice Lead, MENA",           bg: "#E8D4D4", text: RED,   photo: "/team/niraj.png"  },
  { initials: "MS", name: "Megha Soni",          role: "Lead, Startups",               bg: RED,       text: "#fff", photo: "/team/megha.png"  },
  { initials: "RG", name: "Rajat Gupta",         role: "Lead, Financial Reporting",    bg: "#C4A96A", text: "#fff", photo: "/team/rajat.png"  },
  { initials: "PD", name: "Priya Dubey",         role: "Lead, Transaction Advisory",   bg: "#D4C9B4", text: INK,   photo: "/team/priya.png"  },
  { initials: "TS", name: "Tarundeep Singh",     role: "Lead, Legal",                  bg: "#DDCFCF", text: RED,   photo: "/team/tarun.png"  },
  { initials: "VG", name: "Varun Grover",        role: "Lead, Risk & Assurance · MENA",bg: RED,       text: "#fff", photo: "/team/varun.png"  },
]

const INSIGHTS_PRIMARY = [
  {
    tag: "Tax & Regulatory", date: "Feb 2025", read: "5 min read", featured: true,
    title: "Advertising Services to Foreign Clients: New Tax Clarity for Indian Agencies",
    body:  "Indian advertising agencies providing services to foreign clients can now claim export benefits with confidence. New guidelines resolve a longstanding dispute on place of supply, offering uniform treatment across jurisdictions.",
    bg: "#C4A96A",
  },
  {
    tag: "Market Insights", date: "Feb 2025",
    title: "The Liberalised Remittance Scheme: How Liberally Can Indians Send Money Abroad?",
    bg: "#C8D4C8",
  },
  {
    tag: "Global Setup", date: "Feb 2025",
    title: "UAE Free Zones: The Complete Guide for Businesses Expanding to the Middle East",
    bg: "#C8D4C8",
  },
]

const INSIGHTS_MORE = [
  { tag: "Tax & Regulatory", date: "Feb 2025", title: "Golden Visa Residency: Securing 10-Year UAE Residency for Investors",        href: "https://www.10x.global/blog/golden-visa-guide",      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=85" },
  { tag: "Regulatory",       date: "Feb 2025", title: "Overseas Investment Rules 2022: A Guide to ODI and OPI for Indian Entities",  href: "https://www.10x.global/blog/fema-odi-latest",        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=85" },
  { tag: "Export & FEMA",    date: "Feb 2025", title: "Why Indian Exporters Are Receiving Bank Notices on Outstanding Remittances",  href: "https://www.10x.global/blog/fema-write-off-exports", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=85" },
  { tag: "GST",              date: "Feb 2025", title: "Delhi High Court Ruling: Show Cause Notices Under the GST Regime",           href: "https://www.10x.global/blog/gst-case-law",          img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=85" },
]

const OFFICES = [
  {
    code: "IN",
    timezone: "Asia/Kolkata",
    region: "India · Headquarters",
    city: "New Delhi",
    img: "https://images.unsplash.com/photo-1597836228657-d61e739df51b?auto=format&fit=crop&w=800&q=80",
    address: "2/6 Block 2, West Patel Nagar,\nNew Delhi 110008",
    address2: "1409, Palms Spring Plaza\nGolf Course Road, Sector 54\nGurugram 122002",
    address2Label: "Gurgaon",
    email: "info@10x.global",
    phone: "+91 8800565608",
    est: "Est. September 2012",
    services: ["Finance & Tax", "Legal & Compliance", "Transaction Advisory", "Virtual CFO"],
    primary: true,
  },
  {
    code: "AE",
    timezone: "Asia/Dubai",
    region: "UAE · MENA Hub",
    city: "Dubai",
    img: "/dubai-bridge.jpg",
    address: "1607 JBC5, Cluster W,\nJumeirah Lake Towers, Dubai",
    email: "info@10x.global",
    phone: "+971 04 5757988",
    est: "Est. 2022",
    services: ["UAE Entity Formation", "VAT & Corporate Tax", "MENA Market Entry"],
    primary: false,
  },
  {
    code: "SG",
    timezone: "Asia/Singapore",
    region: "Singapore · SE Asia",
    city: "Singapore",
    img: "https://images.pexels.com/photos/15480456/pexels-photo-15480456.jpeg?auto=compress&cs=tinysrgb&w=800",
    address: "200 Jalan Sultan, #11-01,\nTextile Centre, Singapore 199018",
    email: "info@10x.global",
    phone: null,
    est: "Est. 2017",
    services: ["Singapore Incorporation", "Holding Structure", "ASEAN Compliance"],
    primary: false,
  },
  {
    code: "US",
    timezone: "America/New_York",
    region: "United States · Americas",
    city: "Delaware",
    img: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?auto=format&fit=crop&w=800&q=80",
    address: "605 Geddes Street,\nWilmington, DE 19805",
    email: "info@10x.global",
    phone: null,
    est: "Est. October 2025",
    services: ["Delaware C-Corp", "US Market Entry", "Cross-border Transactions"],
    primary: false,
  },
]

const INDIA_OFFICES = [
  {
    city:    "New Delhi",
    state:   "Headquarters",
    address: "2/6 Block 2, West Patel Nagar\nNew Delhi 110008",
    contact: "info@10x.global · +91 8800565608",
    hq:      true,
  },
  {
    city:    "Gurgaon",
    state:   "Haryana",
    address: "1409, Palms Spring Plaza\nGolf Course Road, Sector 54\nGurugram 122002",
    contact: "info@10x.global · +91 8800565608",
    hq:      false,
  },
  {
    city:    "Mumbai",
    state:   "Maharashtra",
    address: "AK Estate, near Radisson Blu Hotel\nSwami Vivekananda Road\nGoregaon West, Mumbai 400062",
    contact: "info@10x.global · +91 8800565608",
    hq:      false,
  },
  {
    city:    "Bangalore",
    state:   "Karnataka",
    address: "1781, 19th Main Road, Vanganahalli\nSector 4, HSR Layout\nBengaluru 560034",
    contact: "info@10x.global · +91 8800565608",
    hq:      false,
  },
]

function LocalTime({ timezone }) {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: timezone, hour: "2-digit", minute: "2-digit", hour12: true,
      })
      const tzAbbr = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone, timeZoneName: "short",
      }).formatToParts(now).find(p => p.type === "timeZoneName")?.value || ""
      setDisplay(`${timeStr} ${tzAbbr}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone])

  if (!display) return null
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginTop: "0.35rem" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#5aD45a", flexShrink: 0 }} />
      <span style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.82)", letterSpacing: "0.04em" }}>
        {display}
      </span>
    </div>
  )
}

function OfficeFlipCard({ office, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: "1200px", height: 300, cursor: "default" }}
    >
      <div style={{
        position:       "relative",
        width:          "100%",
        height:         "100%",
        transformStyle: "preserve-3d",
        transition:     "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        transform:      flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* Front — city photo */}
        <div style={{
          position:                 "absolute",
          inset:                    0,
          backfaceVisibility:       "hidden",
          WebkitBackfaceVisibility: "hidden",
          overflow:                 "hidden",
        }}>
          {/* Photo */}
          <div style={{
            position:           "absolute",
            inset:              0,
            backgroundImage:    `url(${office.img})`,
            backgroundSize:     "cover",
            backgroundPosition: "center",
          }} />
          {/* Gradient overlay — dark at bottom for text legibility */}
          <div style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to top, rgba(12,26,39,0.88) 0%, rgba(12,26,39,0.35) 55%, rgba(12,26,39,0.1) 100%)",
          }} />
          {/* Text anchored to bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 1.75rem" }}>
            <p style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>
              {office.region}
            </p>
            <h3 style={{ fontFamily: font.serif, fontSize: "clamp(1.7rem, 2.4vw, 2.2rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: "0.35rem" }}>
              {office.city}
            </h3>
            <LocalTime timezone={office.timezone} />
          </div>
        </div>

        {/* Back — office details */}
        <div style={{
          position:                 "absolute",
          inset:                    0,
          backfaceVisibility:       "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform:                "rotateY(180deg)",
          backgroundColor:          RED,
          padding:                  "1.25rem 1.5rem 1.25rem",
          display:                  "flex",
          flexDirection:            "column",
        }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "0.45rem" }}>
            {office.region}
          </p>
          <h3 style={{ fontFamily: font.serif, fontSize: "clamp(1.7rem, 2.2vw, 2.1rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: "0.85rem" }}>
            {office.city}
          </h3>
          <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.15)", marginBottom: "0.85rem" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
            {office.address2 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>New Delhi</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.55, whiteSpace: "pre-line" }}>{office.address}</p>
                </div>
                <div>
                  <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>{office.address2Label}</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.75rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.55, whiteSpace: "pre-line" }}>{office.address2}</p>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>Address</p>
                <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.55, whiteSpace: "pre-line" }}>{office.address}</p>
              </div>
            )}
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>{office.email}</p>
              {office.phone && (
                <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginTop: "0.15rem" }}>{office.phone}</p>
              )}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.6rem" }}>
              {office.services.map(s => (
                <span key={s} style={{ fontFamily: font.sans, fontSize: "0.56rem", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.15rem 0.45rem" }}>{s}</span>
              ))}
            </div>
            <p style={{ fontFamily: font.sans, fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD }}>
              {office.est}
            </p>
            {office.primary && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "0.45rem", border: "1px solid rgba(154,123,60,0.3)", padding: "0.18rem 0.5rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#5C9E5C", flexShrink: 0 }} />
                <span style={{ fontFamily: font.sans, fontSize: "0.54rem", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>Primary operating office</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

const CAREER_PHRASES = [
  "expand globally.",
  "raise capital globally.",
  "operate globally.",
  "comply globally.",
  "scale globally.",
]
const FIXED_SUFFIX = " globally."

function AnimatedPhrase() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState("typing")

  useEffect(() => {
    const full = CAREER_PHRASES[phraseIdx]
    let t
    if (phase === "typing") {
      if (displayed.length < full.length) {
        t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 88)
      } else {
        t = setTimeout(() => setPhase("erasing"), 1000)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 38)
      } else {
        setPhraseIdx(i => (i + 1) % CAREER_PHRASES.length)
        setPhase("typing")
      }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, phraseIdx])

  const full = CAREER_PHRASES[phraseIdx]
  const splitAt = full.length - FIXED_SUFFIX.length
  const redPart   = displayed.slice(0, Math.min(displayed.length, splitAt))
  const whitePart = displayed.length > splitAt ? displayed.slice(splitAt) : ""

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline" }}>
      <span style={{ color: "#E8394A" }}>{redPart}</span>
      <span style={{ color: "#fff", whiteSpace: "pre" }}>{whitePart}</span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 0.95] }}
        style={{ color: "#fff", marginLeft: "2px", fontWeight: 200 }}
      >|</motion.span>
    </span>
  )
}

const BLINK_TEXT  = "going global."
const BLINK_SPLIT = 6 // chars before "global." (red part)

function HeroHeading() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const fadeLine = (delay) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 1.4, ease: "easeOut", delay },
  })

  const blinkChar = (delay) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: [0, 1, 0, 1] } : { opacity: 0 },
    transition: { duration: 0.28, times: [0, 0.2, 0.55, 1], ease: "linear", delay },
  })

  return (
    <h1 ref={ref} style={{ fontFamily: font.sans, fontSize: "clamp(3.4rem, 5vw, 5.5rem)", fontWeight: 800, lineHeight: 1.08, color: INK }}>
      <motion.span style={{ display: "block" }} {...fadeLine(0.1)}>Built by founders,</motion.span>
      <motion.span style={{ display: "block" }} {...fadeLine(0.48)}>for founders</motion.span>
      <span style={{ display: "block" }}>
        {BLINK_TEXT.split("").map((char, i) => (
          <motion.span
            key={i}
            style={{ color: i >= BLINK_SPLIT ? RED : INK }}
            {...blinkChar(1.0 + i * 0.09)}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

function LiquidTagline() {
  const wrapRef = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0, fs: 48, lh: 65 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const update = () => {
      const p = el.querySelector("p")
      if (!p) return
      const fs = parseFloat(window.getComputedStyle(p).fontSize)
      const lh = fs * 1.3
      const h = lh * 4 + fs * 0.2
      setBox({ w: el.offsetWidth, h, fs, lh })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w: W, h: H, fs: FS, lh: LH } = box
  const WL = H * 0.58
  const WL_B = H * 0.60

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: H > 0 ? H : undefined, overflow: "hidden" }}>
      <p style={{ visibility: "hidden", margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "clamp(2.4rem, 4.2vw, 4.8rem)", fontWeight: 900, lineHeight: 1.3, whiteSpace: "nowrap" }}>
        the business.
      </p>

      {W > 0 && (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", top: 0, left: 0, display: "block" }}>
          <defs>
            {/* Lines 1-2: You build / the business. */}
            <mask id="liq-mask-a">
              <rect width="100%" height="100%" fill="black" />
              <text fill="white" fontSize={FS} fontWeight="900"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                <tspan x="0" y={FS}>You build</tspan>
                <tspan x="0" dy={LH}>the business.</tspan>
              </text>
            </mask>
            {/* Lines 3-4: We build / the bridge. */}
            <mask id="liq-mask-b">
              <rect width="100%" height="100%" fill="black" />
              <text fill="white" fontSize={FS} fontWeight="900"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                <tspan x="0" y={FS + 2 * LH}>We build</tspan>
                <tspan x="0" dy={LH}>the bridge.</tspan>
              </text>
            </mask>
            <clipPath id="bubble-clip">
              <rect x="0" y={WL - H * 0.15} width={W} height={H} />
            </clipPath>
          </defs>

          {/* ── Lines 1-2: navy + faint blue water + strong bubbles ── */}
          <g mask="url(#liq-mask-a)">
            <rect width={W} height={H} fill="#1e3a8a" />
            <path fill="rgba(255,255,255,0.18)">
              <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
                values={[
                  `M0,${WL} C${W*.15},${WL-H*.02} ${W*.35},${WL+H*.02} ${W*.5},${WL} C${W*.65},${WL-H*.02} ${W*.85},${WL+H*.02} ${W},${WL} L${W},${H} L0,${H} Z`,
                  `M0,${WL} C${W*.15},${WL+H*.02} ${W*.35},${WL-H*.02} ${W*.5},${WL} C${W*.65},${WL+H*.02} ${W*.85},${WL-H*.02} ${W},${WL} L${W},${H} L0,${H} Z`,
                  `M0,${WL} C${W*.15},${WL-H*.02} ${W*.35},${WL+H*.02} ${W*.5},${WL} C${W*.65},${WL-H*.02} ${W*.85},${WL+H*.02} ${W},${WL} L${W},${H} L0,${H} Z`,
                ].join(";")} />
            </path>
            <g clipPath="url(#bubble-clip)">
              <circle r="5" fill="rgba(255,255,255,0.9)"><animateMotion dur="3s" repeatCount="indefinite" path={`M${W*.12},${H} Q${W*.13},${WL} ${W*.12},${WL-H*.45}`} /></circle>
              <circle r="3" fill="rgba(255,255,255,0.85)"><animateMotion dur="4s" repeatCount="indefinite" begin="-1.5s" path={`M${W*.38},${H} Q${W*.39},${WL} ${W*.38},${WL-H*.45}`} /></circle>
              <circle r="4" fill="rgba(255,255,255,0.88)"><animateMotion dur="4.8s" repeatCount="indefinite" begin="-2s" path={`M${W*.25},${H} Q${W*.26},${WL} ${W*.25},${WL-H*.45}`} /></circle>
              <circle r="2.5" fill="rgba(255,255,255,0.8)"><animateMotion dur="3.6s" repeatCount="indefinite" begin="-0.8s" path={`M${W*.55},${H} Q${W*.56},${WL} ${W*.55},${WL-H*.45}`} /></circle>
            </g>
          </g>

          {/* ── Lines 3-4: navy blue + faint blue water + strong bubbles ── */}
          <g mask="url(#liq-mask-b)">
            <rect width={W} height={H} fill="#1e3a8a" />
            <path fill="rgba(255,255,255,0.18)">
              <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
                values={[
                  `M0,${WL_B} C${W*.15},${WL_B-H*.02} ${W*.35},${WL_B+H*.02} ${W*.5},${WL_B} C${W*.65},${WL_B-H*.02} ${W*.85},${WL_B+H*.02} ${W},${WL_B} L${W},${H} L0,${H} Z`,
                  `M0,${WL_B} C${W*.15},${WL_B+H*.02} ${W*.35},${WL_B-H*.02} ${W*.5},${WL_B} C${W*.65},${WL_B+H*.02} ${W*.85},${WL_B-H*.02} ${W},${WL_B} L${W},${H} L0,${H} Z`,
                  `M0,${WL_B} C${W*.15},${WL_B-H*.02} ${W*.35},${WL_B+H*.02} ${W*.5},${WL_B} C${W*.65},${WL_B-H*.02} ${W*.85},${WL_B+H*.02} ${W},${WL_B} L${W},${H} L0,${H} Z`,
                ].join(";")} />
            </path>
            <g clipPath="url(#bubble-clip)">
              <circle r="4" fill="rgba(255,255,255,0.9)"><animateMotion dur="3.6s" repeatCount="indefinite" begin="-0.7s" path={`M${W*.62},${H} Q${W*.63},${WL_B} ${W*.62},${WL_B-H*.45}`} /></circle>
              <circle r="2.5" fill="rgba(255,255,255,0.85)"><animateMotion dur="3s" repeatCount="indefinite" begin="-1s" path={`M${W*.52},${H} Q${W*.53},${WL_B} ${W*.52},${WL_B-H*.45}`} /></circle>
              <circle r="3.5" fill="rgba(255,255,255,0.88)"><animateMotion dur="4.4s" repeatCount="indefinite" begin="-3s" path={`M${W*.80},${H} Q${W*.81},${WL_B} ${W*.80},${WL_B-H*.45}`} /></circle>
              <circle r="2" fill="rgba(255,255,255,0.8)"><animateMotion dur="5s" repeatCount="indefinite" begin="-1.8s" path={`M${W*.70},${H} Q${W*.71},${WL_B} ${W*.70},${WL_B-H*.45}`} /></circle>
            </g>
          </g>
        </svg>
      )}
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
        You build the business. We build the bridge.
      </span>
    </div>
  )
}

function PrincipleCarousel() {
  const [active, setActive] = useState(0)
  const n = PRINCIPLES.length
  const prev = () => setActive(i => (i - 1 + n) % n)
  const next = () => setActive(i => (i + 1) % n)

  const getSlot = (i) => {
    const d = (i - active + n) % n
    if (d === 0) return 0
    if (d === 1) return 1
    if (d === n - 1) return -1
    return 2
  }

  const CARD_W  = 500
  const GAP     = 560
  const CARD_BG = ["#0D1635", "#6B1220", "#162244", "#7A1525"]

  return (
    <div>
      <style>{`
        @keyframes spin-border { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.85; } 50% { opacity: 1; } }
      `}</style>

      <div style={{ position: "relative", height: 330, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 180, background: "linear-gradient(to right, #FAFAFA 20%, transparent)", zIndex: 5, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 180, background: "linear-gradient(to left, #FAFAFA 20%, transparent)", zIndex: 5, pointerEvents: "none" }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {PRINCIPLES.map((p, i) => {
            const slot = getSlot(i)
            const isCenter = slot === 0
            const isHidden = Math.abs(slot) > 1
            return (
              <motion.div
                key={p.n}
                style={{ position: "absolute", width: CARD_W, cursor: isCenter ? "default" : "pointer" }}
                animate={{ x: slot * GAP, scale: isCenter ? 1 : 0.88, opacity: isHidden ? 0 : isCenter ? 1 : 0.6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={isCenter ? undefined : () => setActive(i)}
              >
                {/* Border wrapper */}
                <div style={{ position: "relative", borderRadius: 22, padding: isCenter ? 3 : 1, overflow: "hidden" }}>
                  {/* Spinning gradient border — only on center card */}
                  {isCenter && (
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: "220%", height: "220%",
                      background: "conic-gradient(from 0deg, transparent 0deg, transparent 130deg, rgba(196,169,106,0.4) 155deg, #C4A96A 168deg, #ffffff 180deg, #C4A96A 192deg, rgba(196,169,106,0.4) 205deg, transparent 230deg, transparent 360deg)",
                      animation: "spin-border 3s linear infinite",
                      pointerEvents: "none",
                    }} />
                  )}
                  <div style={{
                    position: "relative",
                    width: "100%", height: 290,
                    backgroundColor: CARD_BG[i],
                    borderRadius: 20,
                    boxShadow: "none",
                    padding: "2rem 2.5rem",
                    overflow: "hidden",
                    userSelect: "none",
                  }}>
                    <span style={{ position: "absolute", right: "-0.5rem", bottom: "-1.5rem", fontFamily: font.num, fontSize: "9rem", fontWeight: 300, color: "rgba(255,255,255,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>{p.n}</span>
                    <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)", fontWeight: 700, color: "#fff", marginBottom: "0.85rem", lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", fontWeight: 450, color: "rgba(255,255,255,0.72)", lineHeight: 1.75 }}>{p.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <button onClick={prev} style={{ position: "absolute", left: "3%", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 46, height: 46, borderRadius: "50%", border: `1.5px solid ${RED}`, backgroundColor: "#fff", color: RED, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>‹</button>
        <button onClick={next} style={{ position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 46, height: 46, borderRadius: "50%", border: `1.5px solid ${RED}`, backgroundColor: "#fff", color: RED, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>›</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.45rem", marginTop: "1.75rem" }}>
        {PRINCIPLES.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 6, height: 6, borderRadius: 3, backgroundColor: i === active ? RED : "rgba(140,26,43,0.2)", transition: "all 0.35s ease", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  )
}

export default function OurFirmPage() {
  const [showMore, setShowMore] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showCareer, setShowCareer] = useState(false)
  const [ctaForm, setCtaForm] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", query: "" })
  const [ctaStatus, setCtaStatus] = useState("idle")

  const handleCtaChange = e => setCtaForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleCtaSubmit = async e => {
    e.preventDefault()
    setCtaStatus("sending")
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@10x.global", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Enquiry from ${ctaForm.firstName} ${ctaForm.lastName}${ctaForm.company ? ` — ${ctaForm.company}` : ""}`,
          name: `${ctaForm.firstName} ${ctaForm.lastName}`,
          email: ctaForm.email,
          phone: ctaForm.phone || "—",
          company: ctaForm.company || "—",
          message: ctaForm.query || "—",
        }),
      })
      setCtaStatus(res.ok ? "done" : "error")
    } catch {
      setCtaStatus("error")
    }
  }

  return (
    <>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <CareerModal isOpen={showCareer} onClose={() => setShowCareer(false)} />
      <Navbar />
      <main style={{ backgroundColor: CREAM, fontFamily: font.sans }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="inner-page-hero" style={{ padding: "1.5rem 0 2rem" }}>
          <div className="page-hero-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw", gridTemplateColumns: "1.5fr 1fr", alignItems: "stretch" }}>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <HeroHeading />
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ paddingTop: "0.5rem" }}>

              <motion.p variants={fadeUp} style={{ fontFamily: font.sans, fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", fontWeight: 450, color: MUTED, lineHeight: 1.75, marginBottom: "0.75rem" }}>
                10x Global was built on a simple belief: founders should focus on building, while we handle everything else required to help them scale.
              </motion.p>
              <motion.p variants={fadeUp} style={{ fontFamily: font.sans, fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", fontWeight: 450, color: MUTED, lineHeight: 1.75, marginBottom: "1.25rem" }}>
                Across global expansion, transactions, legal, tax, finance and compliance we operate as a single integrated partner to ambitious companies navigating growth across borders.
              </motion.p>

              {/* Philosophy card */}
              <motion.div variants={fadeUp} style={{ position: "relative", overflow: "hidden", padding: "1.5rem 2rem 1.5rem", borderRadius: "2rem", border: "none", backgroundColor: RED, boxShadow: "0 8px 32px rgba(140,26,43,0.3), 0 2px 8px rgba(140,26,43,0.15)" }}>
                <video autoPlay muted playsInline onCanPlay={e => { e.currentTarget.playbackRate = 0.5 }} onEnded={e => e.currentTarget.pause()} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", pointerEvents: "none" }}>
                  <source src="/card-bg.mp4" type="video/mp4" />
                </video>
                <div style={{ position: "absolute", inset: 0, background: "rgba(140,26,43,0.68)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: font.sans, fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", fontWeight: 450, color: "#fff", lineHeight: 1.75, marginBottom: "1rem" }}>
                    Exceptional companies are not built through small incremental improvements. They are built through bold decisions, disciplined execution and the pursuit of outcomes many times larger than where they began.
                  </p>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1.1rem", display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", flexShrink: 0, marginTop: "0.1rem" }}>✦</span>
                    <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
                      The name 10x reflects this philosophy, and yes, it is also Maradona, Messi and Sachin Tendulkar's jersey number!!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── FOUNDER QUOTE ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#0B1628", padding: "3.5rem 0" }}>
          <div className="quote-grid" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <div>
              <div style={{ fontFamily: font.serif, fontSize: "3.5rem", color: RED, lineHeight: 0.8, marginBottom: "0.5rem", userSelect: "none" }}>"</div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                style={{ fontFamily: font.sans, fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 700, lineHeight: 1.5, background: "linear-gradient(135deg, #ffffff 0%, #a0a8b8 60%, #6b7385 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                The name is our promise: every engagement should create the possibility of a 10<span style={{ color: RED }}>x</span> outcome
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ paddingTop: "2.5rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "0.8rem", letterSpacing: "0.08em", color: "#fff", textShadow: "0 0 18px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.35)" }}>
                ~ Siddharth Kohli &amp; Ashish Jain, Co-founders, 10<span style={{ color: RED }}>x</span> Global
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PRINCIPLES ────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#FAFAFA", padding: "5rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw", textAlign: "center", marginBottom: "3rem" }}>
            <div>
              <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1rem" }}>What We Believe</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, marginBottom: "1rem", lineHeight: 1.15 }}>
                The principles we <em style={{ fontStyle: "normal", color: RED }}>operate by.</em>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 }} style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 450, color: MUTED, lineHeight: 1.8 }}>
                Four convictions that have guided every engagement since our very first day.
              </motion.p>
            </div>
          </div>
          <PrincipleCarousel />
        </section>

        {/* ── WHERE WE OPERATE ─────────────────────────────────── */}
        <section id="offices" style={{ backgroundColor: CREAM, padding: "6rem 0", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <style>{`
            .offices-flip-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
            @media (max-width: 767px) { .offices-flip-grid { grid-template-columns: 1fr; height: auto !important; } }
          `}</style>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>Where We Operate</span>
              </div>
              <motion.h2 initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: INK, marginBottom: "1rem" }}>
                Four geographies. <em style={{ fontStyle: "normal", color: RED }}>One team.</em>
              </motion.h2>
              <p style={{ fontFamily: font.sans, fontSize: "1.1rem", fontWeight: 450, color: MUTED }}>
                Every office is a full-service presence.
              </p>
            </motion.div>
            <div className="offices-flip-grid">
              {OFFICES.map((office, i) => (
                <OfficeFlipCard key={office.code} office={office} index={i} />
              ))}
            </div>
          </div>
        </section>


        {/* ── THE PEOPLE ────────────────────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "6rem 0" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            <div className="heading-2col" style={{ marginBottom: "3.5rem" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>The People</span>
                </div>
                <motion.h2 initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: INK, lineHeight: 1.2 }}>
                  Partners you can <em style={{ fontStyle: "normal", color: RED }}>call directly.</em>
                </motion.h2>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ fontFamily: font.sans, fontSize: "1.05rem", fontWeight: 450, color: MUTED, lineHeight: 1.85, paddingTop: "3rem" }}>
                More than fifty specialists across finance, legal, compliance and technology, led by partners who stay close to every engagement, from first conversation to final delivery.
              </motion.p>
            </div>

            {/* Founding partner cards */}
            <div className="partners-grid" style={{ marginBottom: "3rem" }}>
              {PARTNERS.map((p, i) => (
                <motion.div key={p.initials} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="partner-card" style={{ display: "flex", backgroundColor: "#fff", overflow: "hidden", borderRadius: 6, boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)" }}>
                  <div className="partner-photo" style={{ width: 220, flexShrink: 0, position: "relative", minHeight: 280 }}>
                    <Image src={p.photo} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <div style={{ padding: "2rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: RED, marginBottom: "0.5rem" }}>{p.role}</p>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1.6rem", fontWeight: 700, color: INK, marginBottom: "0.25rem" }}>{p.name}</h3>
                    <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: MUTED, marginBottom: "1.5rem" }}>{p.spec}</p>
                    <div className="partner-info-row" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 }} />
                      <span style={{ fontFamily: font.sans, fontSize: "0.85rem", fontWeight: 500, color: INK }}>Available for a direct conversation</span>
                      <a href={p.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ marginLeft: "0.5rem", color: "#0A66C2", display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Wider team — large horizontal */}
            <div style={{ borderTop: "1px solid rgba(28,23,18,0.1)", paddingTop: "2rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: MUTED, marginBottom: "1.5rem" }}>
                The Wider Team
              </p>
              <div className="team-marquee-wrap" style={{ overflow: "hidden", marginLeft: "-5vw", marginRight: "-5vw" }}>
                <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity }} style={{ display: "flex", width: "max-content", gap: "1rem", alignItems: "flex-start", paddingLeft: "5vw" }}>
                  {[...TEAM, ...TEAM].map((m, idx) => (
                    <div key={idx} style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ height: 300, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 22px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)", position: "relative" }}>
                        <Image src={m.photo} alt={m.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                      </div>
                      <div style={{ padding: "0.9rem 0.25rem 0" }}>
                        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 600, color: INK, marginBottom: "0.2rem" }}>{m.name}</p>
                        <p style={{ fontFamily: font.sans, fontSize: "0.82rem", color: MUTED }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                  {/* + card (duplicate pair) */}
                  {[0, 1].map(k => (
                    <div key={"plus"+k} style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ height: 300, backgroundColor: "#EEEEEE", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 22px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                        <span style={{ fontFamily: font.serif, fontSize: "2.5rem", fontWeight: 300, color: "rgba(28,23,18,0.3)" }}>+</span>
                      </div>
                      <div style={{ padding: "0.9rem 0.25rem 0" }}>
                        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 600, color: INK, marginBottom: "0.2rem" }}>50+ specialists</p>
                        <p style={{ fontFamily: font.sans, fontSize: "0.82rem", color: MUTED }}>Across four geographies</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Book CTA strip */}
            <div className="book-cta-strip" style={{ paddingTop: "2rem", marginTop: "2rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "1.4rem", fontWeight: 600, color: MUTED }}>Want to know who would handle your account?</p>
              <button onClick={() => setShowContact(true)} style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED, textDecoration: "none", borderBottom: `1px solid ${RED}`, paddingBottom: "2px", whiteSpace: "nowrap", background: "none", border: "none", borderBottom: `1px solid ${RED}`, cursor: "pointer" }}>
                Book a Conversation →
              </button>
            </div>

          </div>
        </section>

        {/* ── WHY WE BUILT 10X GLOBAL ─────────────────────────── */}
        <section style={{ backgroundColor: CREAM, padding: "6rem 0", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <style>{`
            .why-built-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
            .why-built-bottom > * { min-width: 0; }
            @media (max-width: 860px) { .why-built-bottom { grid-template-columns: 1fr; gap: 2.5rem; } }
            .why-built-scroll::-webkit-scrollbar { width: 3px; }
            .why-built-scroll::-webkit-scrollbar-track { background: rgba(28,23,18,0.06); }
            .why-built-scroll::-webkit-scrollbar-thumb { background: rgba(140,26,43,0.3); border-radius: 2px; }
          `}</style>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            {/* Full-width heading centered */}
            <motion.div initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: font.sans, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 800, color: INK, lineHeight: 1.3, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
                Why we built 10x Global
              </h2>
            </motion.div>

            <div className="why-built-bottom">

              {/* Left — big tagline using vertical space */}
              <div style={{ minWidth: 0 }}>
                <LiquidTagline />
              </div>

              {/* Right — scrollable paragraphs */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                className="why-built-scroll"
                style={{ maxHeight: 420, overflowY: "auto", paddingRight: "0.25rem" }}>
                {[
                  "Over the years, we realised that founders spend an incredible amount of time dealing with things that have very little to do with actually building their businesses.",
                  "To keep a company running, a founder often ends up coordinating with lawyers, chartered accountants, company secretaries, tax advisors, bankers, compliance professionals, investors, and countless other stakeholders. They spend time reading legal documents to understand what is good for them and what is not. They worry about whether a compliance has been missed.",
                  "They wonder which country to enter next, how to structure that entry, what entity to set up, how to hire people there, how to move money across borders, and whether everything is being done correctly.",
                  "We always felt that this was backwards. A founder's primary job is to build. To create products. To serve customers. To hire great people. To scale. To sell. To innovate. To obsess over their craft.",
                ].map((p, i) => (
                  <p key={i} style={{ fontFamily: font.sans, fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", fontWeight: 450, color: MUTED, lineHeight: 1.8, marginBottom: "1.5rem" }}>{p}</p>
                ))}
                <div style={{ height: 1, backgroundColor: "rgba(28,23,18,0.08)", marginBottom: "1.5rem" }} />
                <p style={{ fontFamily: font.sans, fontSize: "1.15rem", fontWeight: 600, color: RED, lineHeight: 1.6 }}>
                  We built 10x Global to handle all of it so founders never have to.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── CAREERS ──────────────────────────────────────────── */}
        <section id="careers" style={{ backgroundColor: "#112240" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
            {/* Label bar */}
            <div style={{ paddingTop: "2.5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8394A" }}>Careers</span>
            </div>

            {/* Main copy */}
            <div style={{ padding: "5rem 0 4.5rem" }}>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontFamily: font.sans, fontSize: "0.88rem", fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.01em", marginBottom: "1.25rem" }}>
                Scale across borders. Build global impact.
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ fontFamily: font.sans, fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginBottom: "1.75rem", textShadow: "0 2px 24px rgba(0,0,0,0.3)" }}>
                <span style={{ display: "block" }}>Help companies</span>
                <AnimatedPhrase />
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}
                style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, maxWidth: 500, marginBottom: "2rem" }}>
                Be the small, sharp team handling market entry,<br />finance, legal, and compliance worldwide.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                style={{ fontFamily: font.sans, fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
                Real stakes<span style={{ color: RED }}>.</span>{" "}Real solutions<span style={{ color: RED }}>.</span>{" "}Real growth<span style={{ color: RED }}>.</span>
              </motion.p>
            </div>
          </div>

          {/* Bottom CTA bar */}
          <div>
            <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.75rem 0", flexWrap: "wrap", gap: "1.25rem" }}>
                <p style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                  Ready to shape global markets? Let&apos;s talk.
                </p>
                <button onClick={() => setShowCareer(true)}
                  style={{ backgroundColor: RED, color: "#fff", padding: "0.9rem 1.85rem", fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}>
                  Find your next opportunity →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── INSIGHTS ──────────────────────────────────────────── */}
        <section id="insights" style={{ backgroundColor: CREAM, padding: "5rem 0", borderTop: "1px solid rgba(28,23,18,0.08)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 5vw" }}>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem" }}>
              <div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: RED }}>Insights & Updates</span>
                </div>
                <motion.h2 initial={{ opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, color: INK }}>
                  From the desk of <em style={{ fontStyle: "normal", color: RED }}>our experts.</em>
                </motion.h2>
              </div>
              <a href="https://www.10x.global/blog" target="_blank" rel="noreferrer" style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED, textDecoration: "none", borderBottom: `1px solid ${RED}`, paddingBottom: "2px", whiteSpace: "nowrap" }}>
                View All Insights →
              </a>
            </div>

            {/* Primary articles */}
            <div className="insights-grid" style={{ marginBottom: "2rem" }}>

              {/* Featured */}
              <a href="https://www.10x.global/blog/circular-advertisement" target="_blank" rel="noreferrer" className="insight-card" style={{ textDecoration: "none", backgroundColor: "#fff", overflow: "hidden", display: "block", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div style={{ height: 280, position: "relative", overflow: "hidden" }}>
                  <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85" alt="Tax advisory" fill style={{ objectFit: "cover", objectPosition: "center" }} />
                </div>
                <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem", alignItems: "center" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "rgba(140,26,43,0.08)", color: RED, padding: "0.28rem 0.65rem" }}>Tax &amp; Regulatory</span>
                    <span style={{ fontFamily: font.sans, fontSize: "0.75rem", color: MUTED }}>· Feb 2025</span>
                    <span style={{ fontFamily: font.sans, fontSize: "0.75rem", color: MUTED, marginLeft: "auto" }}>5 min read</span>
                  </div>
                  <h3 style={{ fontFamily: font.sans, fontSize: "1.45rem", fontWeight: 700, color: INK, lineHeight: 1.4, marginBottom: "0.85rem" }}>
                    Advertising Services to Foreign Clients: New Tax Clarity for Indian Agencies
                  </h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.925rem", fontWeight: 450, color: MUTED, lineHeight: 1.8, marginBottom: "1.1rem" }}>
                    Indian advertising agencies providing services to foreign clients can now claim export benefits with confidence. New guidelines resolve a longstanding dispute on place of supply, offering uniform treatment across jurisdictions.
                  </p>
                  <span style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>READ MORE →</span>
                </div>
              </a>

              {/* Two smaller */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* LRS article */}
                <a href="https://www.10x.global/blog/fema-lrs" target="_blank" rel="noreferrer"
                  className="insight-card-side" style={{ textDecoration: "none", backgroundColor: "#fff", display: "flex", overflow: "hidden", flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div style={{ width: 200, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=85" alt="Financial markets" fill style={{ objectFit: "cover", objectPosition: "center" }} />
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.65rem", alignItems: "center" }}>
                      <span style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "rgba(140,26,43,0.08)", color: RED, padding: "0.22rem 0.55rem" }}>Market Insights</span>
                      <span style={{ fontFamily: font.sans, fontSize: "0.7rem", color: MUTED }}>· Feb 2025</span>
                    </div>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 700, color: INK, lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      The Liberalised Remittance Scheme: How Liberally Can Indians Send Money Abroad?
                    </h3>
                    <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>READ MORE →</span>
                  </div>
                </a>

                {/* UAE Free Zones article */}
                <a href="https://www.10x.global/blog/freezone-guide" target="_blank" rel="noreferrer"
                  className="insight-card-side" style={{ textDecoration: "none", backgroundColor: "#fff", display: "flex", overflow: "hidden", flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                  <div style={{ width: 200, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=85" alt="UAE Free Zones" fill style={{ objectFit: "cover", objectPosition: "center" }} />
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.65rem", alignItems: "center" }}>
                      <span style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "rgba(140,26,43,0.08)", color: RED, padding: "0.22rem 0.55rem" }}>Global Setup</span>
                      <span style={{ fontFamily: font.sans, fontSize: "0.7rem", color: MUTED }}>· Feb 2025</span>
                    </div>
                    <h3 style={{ fontFamily: font.sans, fontSize: "1rem", fontWeight: 700, color: INK, lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      UAE Free Zones: The Complete Guide for Businesses Expanding to the Middle East
                    </h3>
                    <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>READ MORE →</span>
                  </div>
                </a>
              </div>

            </div>

            {/* Read more toggle */}
            <div style={{ borderTop: "1px solid rgba(28,23,18,0.1)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              <button onClick={() => setShowMore(v => !v)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: INK }}>
                  {showMore ? "Show Fewer" : "Read More Insights"}
                </span>
                <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(28,23,18,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.sans, fontSize: "0.85rem", color: INK, transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                  ↓
                </span>
              </button>
            </div>

            {/* Expandable articles */}
            <AnimatePresence>
              {showMore && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                  <div className="insights-more-grid" style={{ marginBottom: "2rem" }}>
                    {INSIGHTS_MORE.map((ins, i) => (
                      <a key={i} href={ins.href} target="_blank" rel="noreferrer"
                        className="insight-card" style={{ textDecoration: "none", backgroundColor: "#fff", overflow: "hidden", display: "block", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderRadius: 2 }}>
                        <div style={{ height: 140, position: "relative", overflow: "hidden" }}>
                          <Image src={ins.img} alt={ins.title} fill style={{ objectFit: "cover", objectPosition: "center" }} />
                        </div>
                        <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "rgba(140,26,43,0.08)", color: RED, padding: "0.22rem 0.55rem" }}>{ins.tag}</span>
                            <span style={{ fontFamily: font.sans, fontSize: "0.65rem", color: MUTED }}>· {ins.date}</span>
                          </div>
                          <p style={{ fontFamily: font.sans, fontSize: "0.7rem", color: MUTED, marginBottom: "0.5rem" }}>{ins.date}</p>
                          <h3 style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 700, color: INK, lineHeight: 1.5, marginBottom: "0.85rem" }}>{ins.title}</h3>
                          <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, color: RED, letterSpacing: "0.05em" }}>READ MORE →</span>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid rgba(28,23,18,0.1)", paddingTop: "1.5rem", textAlign: "center" }}>
                    <a href="https://www.10x.global/insight" target="_blank" rel="noreferrer"
                      style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: RED, textDecoration: "none" }}>
                      VIEW ALL INSIGHTS ON 10x.GLOBAL →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <style>{`
            .cta-split { display: grid; grid-template-columns: 1fr 1fr; min-height: 460px; }
            @media (max-width: 860px) { .cta-split { grid-template-columns: 1fr; } }
            .cta-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem; }
            @media (max-width: 560px) { .cta-2col { grid-template-columns: 1fr; } }
            .cta-field { margin-bottom: 0.75rem; }
            .cta-label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.85); display: block; margin-bottom: 0.45rem; }
            .cta-input { width: 100%; font-family: inherit; font-size: 0.9rem; color: rgba(255,255,255,0.92); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.22); padding: 0.8rem 1rem; outline: none; box-sizing: border-box; border-radius: 0; appearance: none; transition: border-color 0.2s, background 0.2s; }
            .cta-input::placeholder { color: rgba(255,255,255,0.2); }
            .cta-input:focus { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.09); }
          `}</style>
          <div className="cta-split">

            {/* Left — maroon panel */}
            <div style={{ background: "linear-gradient(145deg, #8C1A2B 0%, #6B1220 100%)", padding: "3.5rem clamp(2rem, 5vw, 4rem)", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* subtle decorative ring */}
              <div style={{ position: "absolute", right: "-6rem", top: "50%", transform: "translateY(-50%)", width: "28rem", height: "28rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: "-9rem", top: "50%", transform: "translateY(-50%)", width: "36rem", height: "36rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
              <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "2rem", display: "block" }}>
                Work With Us
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: font.sans, fontSize: "clamp(1.9rem, 3.2vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "1.75rem" }}>
                Tell us where you're headed. We'll tell you what it takes.
              </motion.h2>
              <div style={{ width: "2.5rem", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginBottom: "1.75rem" }} />
              <p style={{ fontFamily: font.sans, fontSize: "clamp(0.88rem, 1.1vw, 0.98rem)", fontWeight: 400, color: "rgba(255,255,255,0.62)", lineHeight: 1.85, maxWidth: "36ch" }}>
                30 minutes with a partner. No cost, no pitch. Just a clear-eyed conversation about your next move and what stands between you and getting there.
              </p>
            </div>

            {/* Right — dark navy form panel */}
            <div style={{ backgroundColor: "#0B1628", padding: "3.5rem clamp(2rem, 5vw, 4rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {ctaStatus === "done" ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M4 10l5 5 8-8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontFamily: font.sans, fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.6rem" }}>Enquiry sent.</p>
                  <p style={{ fontFamily: font.sans, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                    We'll get back to you at <strong style={{ color: "rgba(255,255,255,0.75)" }}>{ctaForm.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "#E05070", marginBottom: "0.6rem" }}>
                    Get in Touch
                  </p>
                  <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 700, color: "#fff", marginBottom: "0.35rem", lineHeight: 1.2 }}>
                    Start the conversation.
                  </h3>
                  <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginBottom: "2rem", letterSpacing: "0.01em" }}>
                    We respond within one working day.
                  </p>
                  <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", marginBottom: "2rem" }} />
                  <form onSubmit={handleCtaSubmit} style={{ fontFamily: font.sans }}>
                    <div className="cta-2col">
                      <div>
                        <label className="cta-label">First Name <span style={{ color: "#E05070" }}>*</span></label>
                        <input className="cta-input" name="firstName" required value={ctaForm.firstName} onChange={handleCtaChange} />
                      </div>
                      <div>
                        <label className="cta-label">Last Name <span style={{ color: "#E05070" }}>*</span></label>
                        <input className="cta-input" name="lastName" required value={ctaForm.lastName} onChange={handleCtaChange} />
                      </div>
                    </div>
                    <div className="cta-field">
                      <label className="cta-label">Email <span style={{ color: "#E05070" }}>*</span></label>
                      <input className="cta-input" name="email" type="email" required value={ctaForm.email} onChange={handleCtaChange} />
                    </div>
                    <div className="cta-2col">
                      <div>
                        <label className="cta-label">Phone</label>
                        <input className="cta-input" name="phone" type="tel" value={ctaForm.phone} onChange={handleCtaChange} placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="cta-label">Company</label>
                        <input className="cta-input" name="company" value={ctaForm.company} onChange={handleCtaChange} placeholder="Acme Technologies" />
                      </div>
                    </div>
                    <div className="cta-field">
                      <label className="cta-label">Your Query</label>
                      <textarea className="cta-input" name="query" value={ctaForm.query} onChange={handleCtaChange} rows={3}
                        style={{ resize: "vertical", minHeight: 88 }}
                        placeholder="e.g. We're looking to set up an entity in the UAE and need help with structuring..." />
                    </div>
                    {ctaStatus === "error" && (
                      <p style={{ fontSize: "0.78rem", color: "#E05070", marginBottom: "0.75rem" }}>
                        Something went wrong. Please email us directly at info@10x.global
                      </p>
                    )}
                    <button type="submit" disabled={ctaStatus === "sending"}
                      style={{ width: "100%", backgroundColor: ctaStatus === "sending" ? "rgba(140,26,43,0.4)" : RED, color: "#fff", padding: "1rem", border: "none", cursor: ctaStatus === "sending" ? "default" : "pointer", fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", transition: "opacity 0.2s", marginTop: "0.5rem" }}>
                      {ctaStatus === "sending" ? "Sending…" : "Send Enquiry →"}
                    </button>
                  </form>
                  <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>Or connect with us directly</span>
                    <a href="https://wa.me/918800565608" target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.45rem 1rem", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366", fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.072 23.5l5.788-1.438A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.757-.537-5.309-1.471l-.381-.224-3.433.854.882-3.339-.247-.398A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      WhatsApp · +91 88005 65608
                    </a>
                  </div>
                </>
              )}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

