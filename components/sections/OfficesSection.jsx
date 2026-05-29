"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

const OFFICES = [
  {
    city:    "Delhi",
    country: "India",
    detail:  "Also present in Mumbai & Bangalore",
    img:     "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
  },
  {
    city:    "Dubai",
    country: "UAE",
    detail:  "Jumeirah Lake Towers",
    img:     "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  },
  {
    city:    "Singapore",
    country: "Singapore",
    detail:  "Textile Centre",
    img:     "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  },
  {
    city:    "Delaware",
    country: "United States",
    detail:  "Wilmington, DE",
    img:     "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  },
]

export default function OfficesSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{ backgroundColor: C.surface, padding: isMobile ? "3rem 1.25rem" : "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
            <div style={{ width: 28, height: 2, backgroundColor: C.copper }} />
            <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>WHERE WE OPERATE</span>
          </div>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: C.ink, lineHeight: 1.1 }}>
            One team across<br />
            <em style={{ color: C.copper, fontStyle: "italic" }}>four geographies.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display:             "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap:                 isMobile ? "1rem" : "1.25rem",
          }}
        >
          {OFFICES.map((o) => (
            <motion.div
              key={o.city}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(193,127,62,0.28)", boxShadow: "0 2px 16px rgba(193,127,62,0.06)" }}
              whileHover={{ y: -4, boxShadow: "0 0 0 1.5px rgba(193,127,62,0.5), 0 12px 40px rgba(193,127,62,0.12)" }}
            >
              <div style={{ position: "relative", height: isMobile ? 130 : 180 }}>
                <Image src={o.img} alt={o.city} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,18,16,0.65) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                  <p style={{ fontFamily: font.serif, fontSize: isMobile ? "1.1rem" : "1.3rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{o.city}</p>
                  <p style={{ fontFamily: font.sans, color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", marginTop: 3 }}>{o.country}</p>
                </div>
              </div>
              <div style={{ backgroundColor: C.bg, padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.copper, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontFamily: font.sans, color: C.muted, fontSize: isMobile ? "0.72rem" : "0.8rem" }}>{o.detail}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
