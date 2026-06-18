"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { C, font } from "@/lib/theme"
import ContactModal from "@/components/ContactModal"

const LOADER_DURATION = 2.3

// geoMercator, scale=170, center=[-8,18] — tighter zoom on the SF→Delhi→Dubai→Singapore route
const CITIES = [
  { x: 61,  y: 183, name: "San Francisco", sub: "United States",  anchor: "start", lx:  13 },
  { x: 653, y: 217, name: "New Delhi",     sub: "India · HQ",     anchor: "start", lx:  13 },
  { x: 588, y: 227, name: "Dubai",         sub: "UAE",            anchor: "end",   lx: -13 },
  { x: 732, y: 300, name: "Singapore",     sub: "Southeast Asia", anchor: "end",   lx: -13 },
]

const LINES = [
  { x1: 61,  y1: 183, x2: 653, y2: 217, label: "CAPITAL FLOWS", lx: 357, ly: 192 },
  { x1: 653, y1: 217, x2: 588, y2: 227, label: "OPERATIONS",    lx: 635, ly: 214 },
  { x1: 588, y1: 227, x2: 732, y2: 300, label: "EXPANSION",     lx: 673, ly: 256 },
]

const TRAVEL = "M61,183 L653,217 L588,227 L732,300"

function MapSVG() {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 170, center: [-8, 18] }}
      width={800}
      height={500}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Country borders — slightly muted so route stands out */}
      <Geographies geography="/world-110m.json">
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="rgba(12,26,39,0.042)"
              stroke="rgba(12,26,39,0.16)"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover:   { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {/* Concentric arcs from bottom-right */}
      {[200, 280, 360, 440, 520].map((r, i) => (
        <circle key={i} cx={800} cy={500} r={r}
          fill="none" stroke="rgba(12,26,39,0.025)" strokeWidth={1} />
      ))}

      {/* Oval around San Francisco */}
      <ellipse cx={61} cy={183} rx={80} ry={56}
        fill="none" stroke="rgba(12,26,39,0.08)" strokeWidth={1} />

      {/* Dashed connection lines — bolder */}
      {LINES.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(12,26,39,0.38)" strokeWidth={1.5} strokeDasharray="5 4" />
      ))}


      {/* City pulse rings */}
      {CITIES.map((c, i) => (
        <circle key={`ring-${i}`} cx={c.x} cy={c.y} r={6}
          fill="none" stroke={C.red} strokeWidth={1.2}>
          <animate attributeName="r"       values="6;28;28"  dur="3s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0"  dur="3s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* City dots + labels */}
      {CITIES.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={6} fill={C.red} />
          <text x={c.x + c.lx} y={c.y - 3}
            textAnchor={c.anchor}
            fontFamily="'DM Sans', sans-serif" fontSize={14} fontWeight={700} fill="#3D4A58">
            {c.name}
          </text>
          <text x={c.x + c.lx} y={c.y + 13}
            textAnchor={c.anchor}
            fontFamily="'DM Sans', sans-serif" fontSize={11} fontWeight={600} fill="#6B7685">
            {c.sub}
          </text>
        </g>
      ))}

      {/* Travel route */}
      <defs>
        <path id="travel-route" d={TRAVEL} />
      </defs>

      {/* Glow */}
      <circle r={13} fill={C.red}>
        <animateMotion dur="11s" repeatCount="indefinite" calcMode="paced">
          <mpath href="#travel-route" />
        </animateMotion>
        <animate attributeName="opacity"
          values="0.14;0.14;0;0"
          keyTimes="0;0.93;0.99;1"
          dur="11s" repeatCount="indefinite" calcMode="linear" />
      </circle>

      {/* Core */}
      <circle r={5.5} fill={C.red}>
        <animateMotion dur="11s" repeatCount="indefinite" calcMode="paced">
          <mpath href="#travel-route" />
        </animateMotion>
        <animate attributeName="opacity"
          values="0.95;0.95;0;0"
          keyTimes="0;0.93;0.99;1"
          dur="11s" repeatCount="indefinite" calcMode="linear" />
      </circle>
    </ComposableMap>
  )
}

const HERO_LINE3 = "Operate seamlessly."
const BLINK_SPLIT = 8 // "Operate " is 8 chars, rest is red

function HeroHeading({ style }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // If preloader already ran in this session, start immediately
    if (sessionStorage.getItem("10x_loaded")) {
      setReady(true)
    } else {
      // First visit — wait for preloader (1600ms) + fade-out (550ms) + small buffer
      const t = setTimeout(() => setReady(true), 2250)
      return () => clearTimeout(t)
    }
  }, [])

  const fadeLine = (delay) => ({
    initial: { opacity: 0 },
    animate: ready ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 1.4, ease: "easeOut", delay },
  })

  const blinkChar = (delay) => ({
    initial: { opacity: 0 },
    animate: ready ? { opacity: [0, 1, 0, 1] } : { opacity: 0 },
    transition: { duration: 0.28, times: [0, 0.2, 0.55, 1], ease: "linear", delay },
  })

  return (
    <h1 ref={ref} style={style}>
      <motion.span style={{ display: "block", whiteSpace: "nowrap" }} {...fadeLine(0.1)}>
        Expand globally.
      </motion.span>
      <motion.span style={{ display: "block" }} {...fadeLine(0.48)}>
        Raise capital.
      </motion.span>
      <span style={{ display: "block" }}>
        {HERO_LINE3.split("").map((char, i) => (
          <motion.span
            key={i}
            style={{ color: i >= BLINK_SPLIT ? C.red : C.ink }}
            {...blinkChar(1.0 + i * 0.07)}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}

export default function HeroSection() {
  const [D] = useState(() => {
    if (typeof window === "undefined") return 0
    return sessionStorage.getItem("10x_loaded") ? 0 : LOADER_DURATION
  })
  const [showContact, setShowContact] = useState(false)

  return (
    <>
    <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    <section style={{
      backgroundColor:  C.bg,
      padding:          "clamp(3rem, 4vw, 5.5rem) 0",
      minHeight:        "calc(100vh - 70px)",
      display:          "flex",
      flexDirection:    "column",
      justifyContent:   "center",
    }}>
      <style>{`
        .hero-two-col {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(2rem, 3vw, 5rem);
          align-items: center;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 5vw;
          width: 100%;
          box-sizing: border-box;
        }
        .hero-map-col { height: clamp(400px, 36vw, 640px); }
        @media (max-width: 960px) {
          .hero-two-col { grid-template-columns: 1fr; gap: 2.5rem; }
          .hero-map-col { height: 340px; }
        }
        @media (max-width: 600px) {
          .hero-map-col { display: none; }
        }
      `}</style>

      <div className="hero-two-col">

        {/* LEFT — text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: D + 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem", paddingLeft: "0.15rem" }}>
            <span style={{
              fontFamily:    font.sans,
              fontSize:      "0.575rem",
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         C.red,
            }}>
              The firm behind firms going global
            </span>
          </div>

          {/* Headline */}
          <HeroHeading style={{
            fontFamily:    font.sans,
            fontSize:      "clamp(2.8rem, 4.2vw, 4rem)",
            fontWeight:    800,
            lineHeight:    1.12,
            color:         C.ink,
            marginBottom:  "1.75rem",
            letterSpacing: "-0.01em",
          }} />

          {/* Body */}
          <p style={{
            fontFamily:   font.sans,
            fontSize:     "clamp(0.875rem, 1vw, 0.975rem)",
            lineHeight:   1.8,
            color:        "rgba(12,26,39,0.6)",
            marginBottom: "2.25rem",
            maxWidth:     420,
          }}>
            10x Global helps{" "}
            <strong style={{ color: C.ink, fontWeight: 600 }}>founders and multinational companies</strong>{" "}
            enter new markets, complete transactions and run compliant operations across
            India, UAE, Singapore and the United States.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 400 }}>
            <button
              onClick={() => setShowContact(true)}
              style={{
                display:            "block",
                background:         `linear-gradient(to right, #5a0f1a 50%, ${C.red} 50%)`,
                backgroundSize:     "200% 100%",
                backgroundPosition: "right",
                color:              "#fff",
                padding:            "1.15rem 2rem",
                fontFamily:         font.sans,
                fontSize:           "0.72rem",
                fontWeight:         700,
                letterSpacing:      "0.16em",
                textTransform:      "uppercase",
                textAlign:          "center",
                width:              "100%",
                border:             "none",
                cursor:             "pointer",
                transition:         "background-position 0.4s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundPosition = "left"}
              onMouseLeave={e => e.currentTarget.style.backgroundPosition = "right"}
            >
              Book Strategy Call
            </button>
            <a
              href="#engagements"
              style={{
                display:        "block",
                backgroundColor: "transparent",
                color:           C.ink,
                padding:         "1.1rem 2rem",
                fontFamily:      font.sans,
                fontSize:        "0.72rem",
                fontWeight:      700,
                letterSpacing:   "0.16em",
                textTransform:   "uppercase",
                textDecoration:  "none",
                textAlign:       "center",
                border:          `1.5px solid ${C.ink}`,
                transition:      "background-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.ink; e.currentTarget.style.color = "#fff" }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.ink }}
            >
              See Recent Engagements →
            </a>
          </div>
        </motion.div>

        {/* RIGHT — map */}
        <motion.div
          className="hero-map-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: D + 0.35 }}
          style={{ position: "relative" }}
        >
          <MapSVG />
          {/* Gradient fades — blend map softly into page */}
          <div style={{
            position:      "absolute",
            inset:         0,
            background:    "linear-gradient(to right, white 0%, transparent 7%), linear-gradient(to left, rgba(255,255,255,0.65) 0%, transparent 12%), linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, transparent 16%), linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 16%)",
            pointerEvents: "none",
          }} />
        </motion.div>

      </div>
    </section>
    </>
  )
}
