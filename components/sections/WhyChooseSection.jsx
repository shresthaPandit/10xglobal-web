"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { C, font } from "@/lib/theme"

const CREAM = "#F5E8E8"

const SERVICES = [
  {
    num: "01",
    title: "Expand Internationally",
    sub: "Global Market Entry",
    href: "/global-market-entry",
    btnLabel: "I'm expanding to a new region",
    btnBg: C.red,
    items: [
      "Entity setup & incorporation",
      "Regulatory approvals & FDI compliance",
      "Tax structuring & transfer pricing",
      "Employment setup & HR compliance",
      "Banking & operational readiness",
    ],
    Icon: () => (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="12" stroke={C.red} strokeWidth="1.5" />
        <ellipse cx="17" cy="17" rx="5.5" ry="12" stroke={C.red} strokeWidth="1.5" />
        <line x1="5" y1="17" x2="29" y2="17" stroke={C.red} strokeWidth="1.5" />
        <line x1="8" y1="11" x2="26" y2="11" stroke={C.red} strokeWidth="1.5" />
        <line x1="8" y1="23" x2="26" y2="23" stroke={C.red} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Raise Capital or Exit",
    sub: "Deals & Transaction Advisory",
    href: "/deals-transactions",
    btnLabel: "I'm raising or selling",
    btnBg: "#6B6B6B",
    items: [
      "Fundraising advisory & investor readiness",
      "Term sheet & SHA structuring",
      "Cap table management",
      "Cross-border M&A support",
      "IPO readiness & compliance",
    ],
    Icon: () => (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="4" y="13" width="26" height="17" rx="1.5" stroke={C.red} strokeWidth="1.5" />
        <path d="M12 13V10a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 22 10v3" stroke={C.red} strokeWidth="1.5" />
        <line x1="4" y1="21" x2="30" y2="21" stroke={C.red} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Run Global Operations",
    sub: "Managed Services",
    href: "/managed-services",
    btnLabel: "I need ongoing support",
    btnBg: C.ink,
    items: [
      "Accounting & financial reporting",
      "Payroll & HR compliance",
      "Tax & regulatory filings",
      "Legal & secretarial compliance",
      "Virtual CFO services",
    ],
    Icon: () => (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="4"  y="4"  width="11" height="11" rx="1.5" stroke={C.red} strokeWidth="1.5" />
        <rect x="19" y="4"  width="11" height="11" rx="1.5" stroke={C.red} strokeWidth="1.5" />
        <rect x="4"  y="19" width="11" height="11" rx="1.5" stroke={C.red} strokeWidth="1.5" />
        <rect x="19" y="19" width="11" height="11" rx="1.5" stroke={C.red} strokeWidth="1.5" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }) {
  const { num, title, sub, href, items, Icon } = service
  const isLast = index === SERVICES.length - 1

  return (
    <motion.a
      href={href}
      whileHover={{
        y: -7,
        backgroundColor: "#FDF2F2",
        boxShadow: "0 20px 56px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display:         "block",
        textDecoration:  "none",
        padding:         "2.5rem 2.25rem 2.25rem",
        backgroundColor: CREAM,
        borderRight:     !isLast ? "1px solid rgba(12,26,39,0.1)" : "none",
        cursor:          "pointer",
      }}
    >
      {/* Number + dashed rule */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "2rem" }}>
        <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, color: "rgba(12,26,39,0.38)", letterSpacing: "0.08em", flexShrink: 0 }}>
          {num}
        </span>
        <div style={{ flex: 1, borderTop: "1px dashed rgba(12,26,39,0.2)" }} />
      </div>

      {/* Icon */}
      <div style={{ marginBottom: "1.25rem" }}>
        <Icon />
      </div>

      {/* Title + subtitle */}
      <h3 style={{ fontFamily: font.serif, fontSize: "clamp(1.3rem, 1.7vw, 1.6rem)", fontWeight: 400, color: C.ink, lineHeight: 1.2, marginBottom: "0.45rem" }}>
        {title}
      </h3>
      <p style={{ fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.red, marginBottom: "1.75rem" }}>
        {sub}
      </p>

      {/* Service items */}
      <div>
        {items.map((item, i) => (
          <div key={i} style={{
            display:       "flex",
            justifyContent: "space-between",
            alignItems:    "center",
            padding:       "0.6rem 0",
            borderBottom:  "1px solid rgba(12,26,39,0.07)",
            fontFamily:    font.sans,
            fontSize:      "0.8rem",
            color:         "rgba(12,26,39,0.62)",
            lineHeight:    1.4,
          }}>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div style={{ marginTop: "1.75rem" }}>
        <span style={{
          display:         "inline-block",
          backgroundColor: service.btnBg,
          color:           "#fff",
          padding:         "0.9rem 1.5rem",
          fontFamily:      font.sans,
          fontSize:        "0.65rem",
          fontWeight:      700,
          letterSpacing:   "0.1em",
          textTransform:   "uppercase",
          width:           "100%",
          textAlign:       "center",
          boxSizing:       "border-box",
        }}>
          {service.btnLabel} →
        </span>
      </div>
    </motion.a>
  )
}

export default function () {
  return (
    <section style={{ backgroundColor: C.ink }}>
      <style>{`
        .why-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .why-cards-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header text */}
      <div style={{ padding: "5rem 7vw 3.5rem", maxWidth: 1280, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>
            One Firm. Three Critical Functions.
          </span>
        </div>

        {/* Headline */}
        <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 300, color: "#fff", lineHeight: 1.18, marginBottom: "1.25rem", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
          Why companies choose
          <span style={{ display: "inline-block", flexShrink: 0 }}>
            <Image src="/logo-footer.png" alt="10x Global" width={240} height={62} style={{ objectFit: "contain", display: "block" }} unoptimized />
          </span>
        </h2>

        {/* Body */}
        <p style={{ fontFamily: font.sans, fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(255,255,255,0.48)", maxWidth: 460 }}>
          Every business crossing a border needs to enter it, fund it, and operate it.
          Most firms solve one. We manage all three with a single integrated team across
          finance, legal, and compliance.
        </p>
      </div>

      {/* Cards panel */}
      <div style={{ padding: "0 1.5vw 5rem", maxWidth: 1440, margin: "0 auto" }}>
        <div className="why-cards-grid" style={{ backgroundColor: CREAM }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
