"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"

const RED  = "#8C1A2B"
const GOLD = "#9A7B3C"

const TESTIMONIALS = [
  {
    quote: "Ashish and Siddharth have been with us right through our journey at Mobikwik, even during the run-up to the IPO. They've matched our speed and we can trust them to get the job done.",
    name:  "Upasana Taku",
    title: "Co-founder, Mobikwik",
    tag:   "IPO Journey · Fintech",
    photo: "/testimonials/UPSANA TAKU.avif",
    photoPos: "65% top",
  },
  {
    quote: "10x Global was pivotal in securing our Series A and navigating unexpected challenges with shareholders and investors. Their flexibility and commitment, even on weekends, were invaluable.",
    name:  "Aeby Samuel",
    title: "Co-founder & CEO, FYNXT",
    tag:   "Series A · Fintech",
    photo: "/testimonials/AEBY SAMUEL NEW.png",
  },
  {
    quote: "In my 14+ years working with various firms, 10x Global has stood out as more than just a partner. Sid and his team are truly unmatched in their dedication and service.",
    name:  "Avinash",
    title: "Co-founder & CEO, ElectricPe",
    tag:   "Multi-year · EV Startup",
    photo: "/testimonials/AVINASH.png",
  },
  {
    quote: "10x Global's team consistently demonstrates deep expertise, responsibility, and reliability. They have earned our trust over time with their professional approach.",
    name:  "Daniel Haddad",
    title: "Beverly Hills Polo Club",
    tag:   "International Brand · UAE",
    photo: "/testimonials/1681304206880.jpg",
  },
  {
    quote: "The team at 10x Global has been exceptional in meeting our needs. Noushad, in particular, has been extremely helpful and flexible with our ever-evolving requirements.",
    name:  "Jonathan Lawlor",
    title: "Partner, Top Line Marketing",
    tag:   "Marketing · Partner",
    photo: "/testimonials/JONATHAN LAWLOR.png",
  },
  {
    quote: "10x Global has been an essential partner in our business journey. Their unwavering support and reliability have proven indispensable. I can't imagine doing business without them.",
    name:  "Wasim Basir",
    title: "Top Line Marketing UAE",
    tag:   "Marketing · UAE",
    photo: "/testimonials/WASIM BASIR.png",
  },
]

const CARD_W = 400
const CARD_H = 520

const POSITIONS = {
  front:  { zIndex: 3, rotate: "0deg", x: 0,   y: 0,   scale: 1,    opacity: 1   },
  middle: { zIndex: 2, rotate: "0deg", x: 10,  y: -10, scale: 0.97, opacity: 0.8 },
  back:   { zIndex: 1, rotate: "0deg", x: 20,  y: -20, scale: 0.94, opacity: 0.6 },
  gone:   { zIndex: 0, rotate: "0deg", x: -500, y: 0,  scale: 0.9,  opacity: 0   },
}

function TestimonialCard({ t, position, handleShuffle }) {
  const dragStartX = useRef(0)
  const isFront = position === "front"

  return (
    <motion.div
      animate={POSITIONS[position]}
      drag={isFront ? "x" : false}
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={(_, info) => { dragStartX.current = info.point.x }}
      onDragEnd={(_, info) => {
        if (info.point.x - dragStartX.current < -100 || info.offset.x < -80) {
          handleShuffle()
        }
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isFront ? { scale: 1.02 } : {}}
      style={{
        position:        "absolute",
        top:             0,
        left:            0,
        width:           "100%",
        height:          CARD_H,
        borderRadius:    24,
        border:          "1px solid rgba(255,255,255,0.1)",
        background:      "rgba(255,255,255,0.05)",
        backdropFilter:  "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:       "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        padding:         "2rem 1.75rem",
        cursor:          isFront ? "grab" : "default",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        userSelect:      "none",
        pointerEvents:   isFront ? "auto" : "none",
      }}
    >
      {/* Photo */}
      <div style={{
        width: 112, height: 112, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
        border: "2px solid rgba(154,123,60,0.5)",
        boxShadow: "0 0 0 4px rgba(154,123,60,0.12)",
        marginBottom: "1.25rem", position: "relative",
      }}>
        <Image
          src={t.photo}
          alt={t.name}
          width={112} height={112}
          style={{ objectFit: "cover", objectPosition: t.photoPos || "center top" }}
          draggable={false}
        />
      </div>

      {/* Tag pill */}
      <div style={{
        border: "1px solid rgba(154,123,60,0.3)",
        borderRadius: 20, padding: "0.22rem 0.75rem",
        marginBottom: "1.25rem",
      }}>
        <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD }}>
          {t.tag}
        </span>
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: font.sans, fontSize: "1rem",
        color: "rgba(255,255,255,0.75)", lineHeight: 1.8,
        textAlign: "center", flex: 1,
        display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        "{t.quote}"
      </p>

      {/* Divider */}
      <div style={{ width: "2rem", height: 1, backgroundColor: "rgba(255,255,255,0.12)", margin: "1.25rem 0" }} />

      {/* Author */}
      <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: "0.25rem" }}>
        {t.name}
      </p>
      <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
        {t.title}
      </p>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const n = TESTIMONIALS.length
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)

  const shuffle = () => setActive(i => (i + 1) % n)
  const prev    = () => setActive(i => (i - 1 + n) % n)

  const getPosition = (offset) => {
    if (offset === 0) return "front"
    if (offset === 1) return "middle"
    if (offset === 2) return "back"
    return null
  }

  // Only render 3 cards
  const visibleCards = [0, 1, 2].map(offset => ({
    t:        TESTIMONIALS[(active + offset) % n],
    position: getPosition(offset),
    key:      (active + offset) % n,
  }))

  return (
    <section id="testimonials" style={{ backgroundColor: "#0B1628", padding: "clamp(4rem, 5vw, 8rem) 5vw", overflow: "hidden" }}>
      <style>{`
        .testi-layout { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem, 4vw, 6rem); align-items: center; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 860px) { .testi-layout { grid-template-columns: 1fr; gap: 3rem; } }
      `}</style>

      <div className="testi-layout">

        {/* ── LEFT: context ── */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.25rem" }}
          >
            Client Stories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: font.sans, fontSize: "clamp(2rem, 3.2vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}
          >
            Trusted by founders through every stage of growth.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.85, marginBottom: "2.5rem", maxWidth: "36ch" }}
          >
            From seed rounds to IPOs, cross-border expansions to M&A exits. Founders trust 10x Global to get the job done.
          </motion.p>

          {/* Counter + nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <span style={{ fontFamily: font.num, fontSize: "0.85rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
              {String(active + 1).padStart(2,"0")} / {String(n).padStart(2,"0")}
            </span>

            <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)", position: "relative", borderRadius: 2, overflow: "hidden", maxWidth: 120 }}>
              <motion.div
                animate={{ width: `${((active + 1) / n) * 100}%` }}
                transition={{ duration: 0.4 }}
                style={{ position: "absolute", left: 0, top: 0, height: "100%", backgroundColor: GOLD, borderRadius: 2 }}
              />
            </div>

            {[{ label: "←", fn: prev }, { label: "→", fn: shuffle }].map(({ label, fn }) => (
              <motion.button
                key={label}
                onClick={fn}
                whileHover={{ scale: 1.08, borderColor: GOLD, color: GOLD }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  background: "none", color: "rgba(255,255,255,0.6)",
                  fontSize: "0.95rem", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>

        </div>

        {/* ── RIGHT: card stack ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: CARD_W + 40, height: CARD_H + 30 }}>
            {/* Subtle glow behind stack */}
            <div style={{
              position: "absolute", top: "20%", left: "10%",
              width: "80%", height: "60%",
              background: "radial-gradient(ellipse, rgba(154,123,60,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Render back→middle→front */}
            {[...visibleCards].reverse().map(({ t, position, key }) => (
              <TestimonialCard
                key={key}
                t={t}
                position={position}
                handleShuffle={shuffle}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
