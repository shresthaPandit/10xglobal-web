"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import CountUp from "@/components/ui/CountUp"
import { useIsMobile } from "@/lib/useIsMobile"

export default function CTASection() {
  const isMobile = useIsMobile()

  return (
    <section id="cta" style={{ backgroundColor: C.bg, padding: isMobile ? "3rem 1.25rem" : "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position:            "relative",
            backgroundColor:     C.ink,
            borderRadius:        24,
            overflow:            "hidden",
            padding:             isMobile ? "2.5rem 1.5rem" : "5rem 4rem",
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap:                 isMobile ? "2rem" : "3rem",
            alignItems:          "center",
            border:              "1px solid rgba(193,127,62,0.35)",
            boxShadow:           "0 0 0 1px rgba(193,127,62,0.1), 0 24px 80px rgba(193,127,62,0.12), 0 24px 80px rgba(20,18,16,0.2)",
          }}
        >
          {/* Background image overlay */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
            <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=60" alt="" fill style={{ objectFit: "cover" }} />
          </div>

          {/* Left */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 28, height: 2, backgroundColor: C.copper }} />
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>GET STARTED</span>
            </div>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 700, color: C.bg, lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Ready to take your<br />
              <em style={{ color: C.copper, fontStyle: "italic" }}>business global?</em>
            </h2>
            <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.65)", fontSize: "1rem", lineHeight: 1.7 }}>
              Book a 30-minute consultation with one of our partners. No obligation, just a clear-eyed conversation about where you're going and how we can help you get there.
            </p>
          </div>

          {/* Right */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a href="mailto:hello@10x.global" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", backgroundColor: C.copper, color: "#fff", padding: "1rem 2rem", borderRadius: 12, fontSize: "1rem", fontFamily: font.sans, fontWeight: 500, border: "none", cursor: "pointer", textAlign: "center" }}>
                Book a free 30-min consultation →
              </button>
            </a>
            <a href="mailto:hello@10x.global" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", backgroundColor: "transparent", color: C.bg, padding: "1rem 2rem", borderRadius: 12, fontSize: "1rem", fontFamily: font.sans, fontWeight: 500, border: `1.5px solid rgba(247,243,238,0.25)`, cursor: "pointer", textAlign: "center" }}>
                hello@10x.global
              </button>
            </a>

            <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
              {[["13+", "Years"], ["450+", "Clients"], ["4", "Countries"]].map(([val, label]) => (
                <div key={label}>
                  <CountUp value={val} style={{ fontFamily: font.serif, fontSize: "1.8rem", fontWeight: 700, color: C.bg, lineHeight: 1, display: "block" }} />
                  <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.5)", fontSize: "0.7rem", letterSpacing: "0.1em", marginTop: 3 }}>{label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
