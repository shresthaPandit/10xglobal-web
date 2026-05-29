"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import CountUp from "@/components/ui/CountUp"

const SERVICES = [
  {
    num: "01", tag: "GLOBAL EXPANSION", span: 8,
    title: "Global Business Setup",
    desc: "Navigating multi-jurisdictional incorporation, regulatory compliance, and strategic market entry with precision.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=85",
    dark: true,
  },
  {
    num: "02", tag: "OPERATIONS", span: 4,
    title: "Managed Services",
    desc: "Turnkey financial and administrative operations.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=85",
    dark: true,
  },
  {
    num: "03", tag: "COMPLIANCE", span: 4,
    title: "Risk & Assurance",
    desc: "Mitigating regulatory exposure across every jurisdiction you operate in.",
    img: null,
    dark: false,
  },
  {
    num: "04", tag: "ADVISORY", span: 8,
    title: "Tax & Regulatory",
    desc: "Corporate, indirect, and international tax solutions with litigation support. Optimised structures that keep you compliant and efficient.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=85",
    dark: true,
  },
  {
    num: "05", tag: "LEGAL", span: 6,
    title: "Legal & Secretarial",
    desc: "Contract review, corporate compliance, and data protection at the pace your business demands.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=85",
    dark: true,
  },
  {
    num: "06", tag: "DEALS", span: 6,
    title: "Transaction Support",
    desc: "Deal structuring, due diligence, and post-closure implementation for your most critical transactions.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=85",
    dark: true,
  },
]

const FEATURED = {
  num: "07", tag: "CFO SERVICES",
  title: "Virtual CFO",
  desc: "Treasury strategy, fundraising support, and financial planning without the full-time overhead. Strategic finance leadership — on your terms, at your scale.",
  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90",
}

function DarkCard({ s, delay }) {
  const isWide = s.span >= 7
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 24px 64px rgba(0,0,0,0.32)" }}
      style={{
        gridColumn:      `span ${s.span}`,
        position:        "relative",
        overflow:        "hidden",
        borderRadius:    4,
        cursor:          "pointer",
        backgroundImage: `url(${s.img})`,
        backgroundSize:  "cover",
        backgroundPosition: "center",
        boxShadow:       "0 4px 24px rgba(0,0,0,0.18)",
        transition:      "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Overlay */}
      <div style={{
        position: "absolute",
        inset:    0,
        background: isWide
          ? "linear-gradient(to right, rgba(6,4,2,0.94) 0%, rgba(6,4,2,0.76) 52%, rgba(6,4,2,0.22) 100%)"
          : "linear-gradient(to top,   rgba(6,4,2,0.96) 0%, rgba(6,4,2,0.72) 50%, rgba(6,4,2,0.22) 100%)",
      }} />

      {/* Content */}
      <div style={{
        position:      "relative",
        zIndex:        1,
        padding:       isWide ? "2.5rem" : "2rem",
        height:        "100%",
        display:       "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        <p style={{
          fontFamily:    font.sans,
          color:         C.copper,
          fontSize:      "0.62rem",
          fontWeight:    700,
          letterSpacing: "0.2em",
          marginBottom:  "0.875rem",
        }}>
          {s.num} // {s.tag}
        </p>
        <h3 style={{
          fontFamily:   font.serif,
          fontSize:     isWide ? "2.25rem" : "1.75rem",
          fontWeight:   600,
          color:        "#fff",
          lineHeight:   1.1,
          marginBottom: "0.6rem",
          letterSpacing: "-0.01em",
        }}>
          {s.title}
        </h3>
        <p style={{
          fontFamily:   font.sans,
          color:        "rgba(255,255,255,0.68)",
          fontSize:     "0.875rem",
          lineHeight:   1.68,
          marginBottom: "1.4rem",
          maxWidth:     isWide ? 430 : "100%",
        }}>
          {s.desc}
        </p>
        <span style={{
          fontFamily:    font.sans,
          color:         C.copper,
          fontSize:      "0.75rem",
          fontWeight:    600,
          letterSpacing: "0.04em",
        }}>
          Learn more →
        </span>
      </div>
    </motion.div>
  )
}

function LightCard({ s, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      style={{
        gridColumn:     `span ${s.span}`,
        position:       "relative",
        overflow:       "hidden",
        borderRadius:   4,
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "space-between",
        padding:        "2.25rem",
        backgroundColor: "#FEFCFA",
        borderTop:      `4px solid ${C.copper}`,
        borderRight:    `1px solid ${C.border}`,
        borderBottom:   `1px solid ${C.border}`,
        borderLeft:     `1px solid ${C.border}`,
        boxShadow:      "0 2px 20px rgba(0,0,0,0.04)",
        transition:     "transform 0.3s ease, box-shadow 0.3s ease",
        cursor:         "pointer",
      }}
    >
      {/* Dot grid */}
      <div style={{
        position:        "absolute",
        inset:           0,
        opacity:         0.035,
        backgroundImage: "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)",
        backgroundSize:  "22px 22px",
        pointerEvents:   "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily:    font.sans,
          color:         C.muted,
          fontSize:      "0.62rem",
          fontWeight:    700,
          letterSpacing: "0.2em",
          marginBottom:  "1.25rem",
        }}>
          {s.num} // {s.tag}
        </p>
        <h3 style={{
          fontFamily:   font.serif,
          fontSize:     "2rem",
          fontWeight:   600,
          color:        C.ink,
          lineHeight:   1.1,
          marginBottom: "0.75rem",
          letterSpacing: "-0.01em",
        }}>
          {s.title}
        </h3>
        <p style={{
          fontFamily: font.sans,
          color:      C.muted,
          fontSize:   "0.9rem",
          lineHeight: 1.68,
        }}>
          {s.desc}
        </p>
      </div>

      <span style={{
        position:      "relative",
        zIndex:        1,
        fontFamily:    font.sans,
        color:         C.ink,
        fontSize:      "0.75rem",
        fontWeight:    600,
        letterSpacing: "0.04em",
        marginTop:     "2rem",
      }}>
        Learn more →
      </span>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" style={{ backgroundColor: C.bg, padding: "5rem 1.5rem 6rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            marginBottom:        "3rem",
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "3rem",
            alignItems:          "flex-end",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <div style={{ width: 28, height: 2, backgroundColor: C.copper }} />
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em" }}>
                WHAT WE DO
              </span>
            </div>
            <h2 style={{
              fontFamily:    font.serif,
              fontSize:      "clamp(2.2rem, 3.5vw, 3.5rem)",
              fontWeight:    600,
              color:         C.ink,
              lineHeight:    1.1,
              letterSpacing: "-0.01em",
            }}>
              Seven practice areas.<br />
              <em style={{ color: C.muted, fontStyle: "italic" }}>One integrated team.</em>
            </h2>
          </div>
          <div style={{ borderLeft: `2px solid ${C.copper}`, paddingLeft: "1.5rem" }}>
            <p style={{
              fontFamily:   font.serif,
              fontStyle:    "italic",
              color:        C.ink,
              fontSize:     "1.15rem",
              lineHeight:   1.65,
              fontWeight:   500,
              marginBottom: "0.75rem",
            }}>
              "End-to-end advisory across finance, legal, compliance, and technology."
            </p>
            <p style={{ fontFamily: font.sans, color: C.muted, fontSize: "0.85rem", lineHeight: 1.72 }}>
              Structured around how your business actually operates — not how advisors prefer to work.
            </p>
          </div>
        </motion.div>

        {/* ── Bento grid ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows:        "380px",
          gap:                 "1.25rem",
          marginBottom:        "1.25rem",
        }}>
          {SERVICES.map((s, i) =>
            s.dark
              ? <DarkCard  key={s.num} s={s} delay={i * 0.06} />
              : <LightCard key={s.num} s={s} delay={i * 0.06} />
          )}
        </div>

        {/* ── Virtual CFO featured strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          whileHover={{ y: -3, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
          style={{
            position:           "relative",
            overflow:           "hidden",
            borderRadius:       4,
            padding:            "2.75rem 3rem",
            cursor:             "pointer",
            backgroundImage:    `url(${FEATURED.img})`,
            backgroundSize:     "cover",
            backgroundPosition: "center",
            boxShadow:          "0 4px 24px rgba(0,0,0,0.18)",
            transition:         "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to right, rgba(6,4,2,0.92) 0%, rgba(6,4,2,0.72) 52%, rgba(6,4,2,0.28) 100%)",
          }} />

          <div style={{
            position:            "relative",
            zIndex:              1,
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "center",
          }}>
            <div>
              <p style={{
                fontFamily:    font.sans,
                color:         C.copper,
                fontSize:      "0.62rem",
                fontWeight:    700,
                letterSpacing: "0.2em",
                marginBottom:  "1rem",
              }}>
                {FEATURED.num} // {FEATURED.tag}
              </p>
              <h3 style={{
                fontFamily:    font.serif,
                fontSize:      "clamp(1.75rem, 2.5vw, 2.6rem)",
                fontWeight:    600,
                color:         "#fff",
                lineHeight:    1.1,
                marginBottom:  "1rem",
                letterSpacing: "-0.01em",
              }}>
                {FEATURED.title}
              </h3>
              <p style={{
                fontFamily:   font.sans,
                color:        "rgba(255,255,255,0.70)",
                fontSize:     "0.9rem",
                lineHeight:   1.75,
                marginBottom: "1.75rem",
              }}>
                {FEATURED.desc}
              </p>
              <span style={{ color: C.copper, fontSize: "0.875rem", fontFamily: font.sans, fontWeight: 600 }}>
                Learn more →
              </span>
            </div>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "4rem", display: "flex", gap: "3rem" }}>
              {[["13+", "YEARS ACTIVE"], ["450+", "CLIENTS SERVED"], ["4", "COUNTRIES"]].map(([v, l]) => (
                <div key={l}>
                  <CountUp value={v} style={{ fontFamily: font.serif, fontSize: "2.4rem", fontWeight: 600, color: "#fff", lineHeight: 1, display: "block" }} />
                  <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.5)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", marginTop: 6 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
