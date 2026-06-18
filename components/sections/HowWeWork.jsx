"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"

const RED = "#8C1A2B"

const FEATURES = [
  {
    n: "01", title: "Finance + Legal Under One Roof",
    body: "No handoffs between your CA and your lawyer. One team, one brief, one integrated view of every decision.",
    tag: "Integration",
    glow: "rgba(30,58,138,0.07)",
    accent: "#1e3a8a",
  },
  {
    n: "02", title: "Technology-Led Delivery",
    body: "We build and use proprietary systems to deliver advisory and compliance faster, with full client transparency.",
    tag: "Speed",
    glow: "rgba(140,26,43,0.07)",
    accent: "#8C1A2B",
  },
  {
    n: "03", title: "Genuinely Cross-Border",
    body: "Own offices in Delhi and Dubai. Associates in Singapore. Growing US practice. Four jurisdictions, one team.",
    tag: "Global",
    glow: "rgba(22,34,68,0.07)",
    accent: "#162244",
  },
  {
    n: "04", title: "Founder-Speed Execution",
    body: "We work alongside venture-backed companies. We know what it means when a deal needs to close over the weekend.",
    tag: "Execution",
    glow: "rgba(122,21,37,0.07)",
    accent: "#7A1525",
  },
]

export default function HowWeWork() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)
  const n = FEATURES.length
  const f = FEATURES[active]

  const go = (i) => {
    if (i === active) return
    setDir(i > active ? 1 : -1)
    setActive(i)
  }

  return (
    <section style={{ backgroundColor: "#fafafa", padding: "clamp(5rem, 7vw, 10rem) 5vw", overflow: "hidden", position: "relative", minHeight: "clamp(580px, 44vw, 900px)" }}>

      {/* ── Animated ambient glow ── */}
      <motion.div
        animate={{ background: `radial-gradient(ellipse 70% 80% at 70% 50%, ${f.glow}, transparent 70%)` }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* ── Animated grid lines (decorative) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(28,23,18,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,23,18,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "clamp(3rem, 4vw, 6rem)", alignItems: "center" }}>

        {/* ── LEFT: heading + feature menu ── */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: RED, display: "block", marginBottom: "1.25rem" }}
          >
            How We Work
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: font.sans, fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", fontWeight: 800, color: "#1C1712", lineHeight: 1.15, marginBottom: "1.25rem" }}
          >
            Advisory built for the <span style={{ color: RED }}>Modern Business.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(28,23,18,0.48)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: "34ch" }}
          >
            Most professional services firms were designed for a world that no longer exists.
          </motion.p>

          {/* Feature menu */}
          <div>
            {FEATURES.map((item, i) => (
              <motion.button
                key={item.n}
                onClick={() => go(i)}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  width: "100%", background: "none", border: "none",
                  borderTop: "1px solid rgba(28,23,18,0.08)",
                  padding: "1rem 0", cursor: "pointer", textAlign: "left",
                }}
              >
                {/* Animated active bar */}
                <motion.span
                  animate={{ height: active === i ? 32 : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", width: 2.5, backgroundColor: f.accent, borderRadius: 2, flexShrink: 0 }}
                />

                <span style={{
                  fontFamily: font.num, fontSize: "0.75rem", fontWeight: 700,
                  color: active === i ? f.accent : "rgba(28,23,18,0.25)",
                  transition: "color 0.3s", minWidth: "2rem", flexShrink: 0,
                }}>
                  {item.n}
                </span>

                <span style={{
                  fontFamily: font.sans, fontSize: "0.88rem",
                  fontWeight: active === i ? 600 : 400,
                  color: active === i ? "#1C1712" : "rgba(28,23,18,0.38)",
                  transition: "all 0.3s", lineHeight: 1.3,
                }}>
                  {item.title}
                </span>
              </motion.button>
            ))}
            <div style={{ borderTop: "1px solid rgba(28,23,18,0.08)" }} />
          </div>
        </div>

        {/* ── RIGHT: animated content display ── */}
        <div style={{ position: "relative" }}>

          {/* Giant background number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${active}`}
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute", top: "-2rem", right: "-1rem",
                fontFamily: font.num, fontSize: "clamp(10rem, 18vw, 18rem)",
                fontWeight: 800, color: "rgba(140,26,43,0.08)",
                lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0,
              }}
            >
              {f.n}
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: dir * 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: dir * -50, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", zIndex: 1 }}
            >

              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  border: `1px solid ${f.accent}40`,
                  padding: "0.3rem 0.75rem", borderRadius: 20, marginBottom: "1.25rem",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: f.accent }} />
                <span style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: f.accent }}>
                  {f.tag}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontFamily: font.sans, fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 800, color: "#1C1712", lineHeight: 1.2, marginBottom: "1.25rem" }}
              >
                {f.title}
              </motion.h3>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(28,23,18,0.52)", lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: "38ch" }}
              >
                {f.body}
              </motion.p>

              {/* Progress + nav */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontFamily: font.num, fontSize: "0.78rem", color: "rgba(28,23,18,0.3)", letterSpacing: "0.1em", flexShrink: 0 }}>
                  {String(active + 1).padStart(2,"0")} / {String(n).padStart(2,"0")}
                </span>

                <div style={{ flex: 1, height: 1, backgroundColor: "rgba(28,23,18,0.1)", position: "relative", borderRadius: 2, overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${((active + 1) / n) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", left: 0, top: 0, height: "100%", backgroundColor: f.accent, borderRadius: 2 }}
                  />
                </div>

                {["↑","↓"].map((arrow, idx) => {
                  const target = idx === 0 ? active - 1 : active + 1
                  const dis = idx === 0 ? active === 0 : active === n - 1
                  return (
                    <motion.button
                      key={arrow}
                      onClick={() => !dis && go(target)}
                      whileHover={!dis ? { scale: 1.1, backgroundColor: f.accent, borderColor: f.accent, color: "#fff" } : {}}
                      whileTap={!dis ? { scale: 0.95 } : {}}
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        border: `1.5px solid ${dis ? "rgba(28,23,18,0.1)" : "rgba(28,23,18,0.3)"}`,
                        background: "none", color: dis ? "rgba(28,23,18,0.2)" : "#1C1712",
                        fontSize: "0.9rem", cursor: dis ? "default" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {arrow}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
