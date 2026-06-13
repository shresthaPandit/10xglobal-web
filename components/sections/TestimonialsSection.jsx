"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useBreakpoint"

const TESTIMONIALS = [
  {
    quote: "Ashish and Siddharth have been with us right through our journey at Mobikwik, even during the run-up to the IPO. They've matched our speed and we can trust them to get the job done.",
    name:  "Upasana Taku",
    title: "Co-founder, Mobikwik",
    tag:   "IPO Journey · Fintech",
    photo: "/testimonials/UPSANA TAKU.avif",
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
    quote: "10x Global has been an essential partner in our business journey. For yet another year, their unwavering support and reliability have proven indispensable. I can't imagine doing business without them. My sincere thanks to the entire team for always having my back.",
    name:  "Wasim Basir",
    title: "Top Line Marketing UAE",
    tag:   "Marketing · UAE",
    photo: "/testimonials/WASIM BASIR.png",
  },
]

export default function TestimonialsSection() {
  const isMobile = useIsMobile()
  const perPage  = isMobile ? 1 : 2
  const [index, setIndex] = useState(0)
  const maxIndex = TESTIMONIALS.length - perPage

  const prev = () => setIndex(i => Math.max(i - 1, 0))
  const next = () => setIndex(i => Math.min(i + 1, maxIndex))

  return (
    <section id="testimonials" style={{ backgroundColor: C.ink, padding: "5.5rem 5vw", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C94A5A" }}>CLIENT STORIES</span>
            </div>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)", fontWeight: 300, color: "#fff", lineHeight: 1.25, letterSpacing: "0.01em", maxWidth: 520, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
              Trusted by founders through every stage of growth.
            </h2>
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { fn: prev, disabled: index === 0,        label: "←" },
              { fn: next, disabled: index === maxIndex, label: "→" },
            ].map(({ fn, disabled, label }) => (
              <button
                key={label}
                onClick={fn}
                disabled={disabled}
                style={{
                  width:          44,
                  height:         44,
                  borderRadius:   "50%",
                  border:         `1px solid rgba(154,123,60,${disabled ? "0.15" : "0.5"})`,
                  background:     disabled ? "transparent" : "rgba(154,123,60,0.1)",
                  color:          disabled ? "rgba(255,255,255,0.2)" : "#fff",
                  fontFamily:     font.sans,
                  fontSize:       "1.1rem",
                  cursor:         disabled ? "default" : "pointer",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  transition:     "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards track — overflow hidden, 2 cards visible */}
        <div style={{ overflow: "hidden" }}>
          <motion.div
            animate={{ x: isMobile ? `calc(-${index} * (100% + 20px))` : `calc(-${index} * (50% + 10px))` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: 20 }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  flex:            isMobile ? "0 0 calc(100% - 0px)" : "0 0 calc(50% - 10px)",
                  backgroundColor: "rgba(247,243,238,0.97)",
                  padding:         "1.75rem",
                  display:         "flex",
                  flexDirection:   "column",
                  gap:             "1rem",
                }}
              >
                {/* Top row: photo + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  {/* Avatar photo */}
                  <div style={{
                    width:        56,
                    height:       56,
                    borderRadius: "50%",
                    overflow:     "hidden",
                    flexShrink:   0,
                    border:       "2px solid rgba(154,123,60,0.3)",
                    position:     "relative",
                  }}>
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: font.sans, fontWeight: 600, color: C.ink, fontSize: "0.875rem" }}>{t.name}</p>
                    <p style={{ fontFamily: font.sans, color: "rgba(12,26,39,0.45)", fontSize: "0.75rem", marginTop: 2 }}>{t.title}</p>
                  </div>
                  {/* Tag pushed to right */}
                  <span style={{
                    marginLeft:    "auto",
                    fontFamily:    font.sans,
                    fontSize:      "0.55rem",
                    fontWeight:    700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:         C.gold,
                    border:        `1px solid rgba(154,123,60,0.35)`,
                    padding:       "0.28rem 0.6rem",
                    whiteSpace:    "nowrap",
                  }}>
                    {t.tag}
                  </span>
                </div>

                {/* Quote */}
                <div style={{ fontFamily: font.serif, fontSize: "1.5rem", color: C.gold, lineHeight: 0.6, userSelect: "none" }}>"</div>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "0.9rem",
                  color:      "rgba(12,26,39,0.75)",
                  lineHeight: 1.7,
                }}>
                  {t.quote}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width:           i === index ? 28 : 8,
                height:          8,
                borderRadius:    20,
                border:          "none",
                cursor:          "pointer",
                backgroundColor: i === index ? C.gold : "rgba(255,255,255,0.2)",
                transition:      "all 0.3s ease",
                padding:         0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
