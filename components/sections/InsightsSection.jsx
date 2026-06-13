"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

const INSIGHTS = [
  {
    tag:     "Market Entry",
    title:   "Navigating Global Market Entry: Key Strategies for Success",
    excerpt: "Expanding into a new geography is one of the highest-leverage decisions a business can make. Here's what we've learned from guiding 450+ companies through the process.",
    img:     "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85",
    date:    "May 2025",
  },
  {
    tag:     "Tax & Compliance",
    title:   "The Future of Tax Compliance in the Digital Age",
    excerpt: "As regulators move faster and cross-border transactions multiply, businesses need a tax strategy that's both defensible and efficient. Here's the framework we use.",
    img:     "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=85",
    date:    "Apr 2025",
  },
  {
    tag:     "Risk",
    title:   "Mitigating Financial Risk: Best Practices for Businesses",
    excerpt: "Risk isn't something you eliminate — it's something you manage. The companies that grow fastest have a clear-eyed view of their exposure and a plan for every scenario.",
    img:     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85",
    date:    "Mar 2025",
  },
]

export default function InsightsSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{ backgroundColor: C.bg, padding: isMobile ? "4rem 1.25rem" : "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            marginBottom:   "3.5rem",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     isMobile ? "flex-start" : "flex-end",
            flexDirection:  isMobile ? "column" : "row",
            gap:            isMobile ? "1rem" : 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>INSIGHTS & UPDATES</span>
            </div>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: C.ink, lineHeight: 1.1 }}>
              From the desk of<br />
              <em style={{ color: C.copper, fontStyle: "italic" }}>our experts.</em>
            </h2>
          </div>
          <a href="#" style={{ textDecoration: "none", fontFamily: font.sans, color: C.copper, fontSize: "0.875rem", fontWeight: 500 }}>
            View all insights →
          </a>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display:             "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap:                 "1.5rem",
          }}
        >
          {INSIGHTS.map((a) => (
            <motion.article
              key={a.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              style={{
                backgroundColor: C.surface,
                border:          "1px solid rgba(193,127,62,0.28)",
                borderRadius:    14,
                overflow:        "hidden",
                cursor:          "pointer",
                boxShadow:       "0 2px 16px rgba(193,127,62,0.06), 0 8px 32px rgba(20,18,16,0.04)",
              }}
              whileHover={{ y: -4, boxShadow: "0 0 0 1.5px rgba(193,127,62,0.5), 0 12px 40px rgba(193,127,62,0.12)" }}
            >
              <div style={{ position: "relative", height: 200 }}>
                <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
                  <span style={{ backgroundColor: `${C.copper}18`, color: C.copper, fontSize: "0.65rem", fontFamily: font.sans, fontWeight: 600, letterSpacing: "0.1em", padding: "0.2rem 0.6rem", borderRadius: 20 }}>
                    {a.tag}
                  </span>
                  <span style={{ fontFamily: font.sans, color: C.faint, fontSize: "0.75rem" }}>{a.date}</span>
                </div>
                <h3 style={{ fontFamily: font.serif, fontSize: "1.2rem", fontWeight: 700, color: C.ink, lineHeight: 1.3, marginBottom: "0.75rem" }}>{a.title}</h3>
                <p style={{ fontFamily: font.sans, color: C.muted, fontSize: "0.85rem", lineHeight: 1.7 }}>{a.excerpt}</p>
                <p style={{ marginTop: "1.25rem", fontFamily: font.sans, color: C.copper, fontSize: "0.85rem", fontWeight: 500 }}>Read more →</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
