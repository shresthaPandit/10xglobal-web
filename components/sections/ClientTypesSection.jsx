"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const CLIENTS = [
  {
    title: "Venture-Backed Companies",
    sub:   "From Seed to IPO",
    body:  "We've advised founders through every funding round, regulatory challenge, and international expansion milestone. We understand what it means when a term sheet is on the table and the structure isn't ready.",
    tags:  ["Fundraising", "M&A", "Cap Table"],
  },
  {
    title: "Global Enterprises",
    sub:   "Entering Asia and the Middle East",
    body:  "International companies setting up in India or the UAE need a partner who understands the regulatory landscape, the pace of business, and how to build an operation that actually works.",
    tags:  ["Market Entry", "Operations", "Compliance"],
  },
  {
    title: "PE & VC Funds",
    sub:   "Portfolio Expansion and Governance",
    body:  "Fund managers and their portfolio companies need integrated due diligence, ongoing compliance, and cross-border structuring across multiple entities without managing a dozen advisors.",
    tags:  ["Due Diligence", "Portfolio", "Governance"],
  },
  {
    title: "Founder-Led Businesses",
    sub:   "Growth Without Operational Complexity",
    body:  "Ambitious founders who want to grow across borders without building an in-house finance, legal, and compliance team in every country. We become that team.",
    tags:  ["Finance", "Legal", "Cross-border"],
  },
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClientCard({ client, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="ct-card-wrap"
      style={{ height: "100%" }}
    >
      {/* Spinning border layer */}
      <div className="ct-card-border" aria-hidden="true" />

      {/* Card inner */}
      <div className="ct-card-inner">

        {/* Title block */}
        <div style={{ marginBottom: "0.6rem" }}>
          <h3 style={{
            fontFamily:   font.sans,
            fontSize:     "clamp(1.15rem, 1.6vw, 1.45rem)",
            fontWeight:   800,
            color:        "#0a0a0a",
            lineHeight:   1.2,
            margin:       0,
          }}>
            {client.title}
          </h3>
          <p style={{
            fontFamily:    font.sans,
            fontSize:      "0.6rem",
            fontWeight:    700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "rgba(184,50,40,0.85)",
            marginTop:     "0.4rem",
            marginBottom:  0,
          }}>
            {client.sub}
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "0.75rem 0" }} />

        {/* Body */}
        <p style={{
          fontFamily:   font.sans,
          fontSize:     "0.9rem",
          color:        "rgba(30,30,30,0.72)",
          lineHeight:   1.8,
          marginBottom: "1rem",
        }}>
          {client.body}
        </p>

        {/* Tag list with check icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
          {client.tags.map(tag => (
            <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
              <div style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                width:           20,
                height:          20,
                borderRadius:    "50%",
                backgroundColor: C.red,
                flexShrink:      0,
              }}>
                <CheckIcon />
              </div>
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "0.82rem",
                fontWeight:    500,
                color:         "rgba(20,20,20,0.75)",
                letterSpacing: "0.01em",
              }}>
                {tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default function ClientTypesSection() {
  return (
    <section style={{ backgroundColor: C.ink, padding: "clamp(4rem, 5vw, 8rem) 7vw" }}>
      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 3.5rem;
          align-items: stretch;
        }
        @media (max-width: 767px) { .ct-grid { grid-template-columns: 1fr; } }

        /* Card wrapper — provides the 1.5px border space */
        .ct-card-wrap {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          padding: 1.5px;
          height: 100%;
          box-sizing: border-box;
        }

        /* Spinning conic-gradient border */
        .ct-card-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: 0;
          overflow: hidden;
        }
        .ct-card-border::before {
          content: '';
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 32%,
            rgba(184,50,40,0.9) 44%,
            rgba(220,80,60,0.75) 50%,
            rgba(184,50,40,0.9) 56%,
            transparent 68%,
            transparent 100%
          );
          animation: ct-spin 5s linear infinite;
        }
        @keyframes ct-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-card-border::before { animation: none; }
        }

        /* Inner card — sits above border */
        .ct-card-inner {
          position: relative;
          z-index: 1;
          border-radius: calc(1rem - 1.5px);
          padding: 1.5rem;
          background-color: rgba(255, 255, 255, 0.82);
          background-image:
            radial-gradient(at 0% 100%,   rgba(184,50,40,0.18) 0px, transparent 65%),
            radial-gradient(at 100% 100%, rgba(184,50,40,0.13) 0px, transparent 60%);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 -12px 24px 0 rgba(255,255,255,0.18) inset;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 560 }}
        >
          <span style={{
            fontFamily:    font.sans,
            fontSize:      "0.58rem",
            fontWeight:    700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "rgba(184,50,40,0.8)",
            display:       "block",
            marginBottom:  "1.1rem",
          }}>
            Who We Work With
          </span>

          <h2 style={{
            fontFamily:          font.sans,
            fontSize:            "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight:          800,
            color:               "#fff",
            lineHeight:          1.12,
            marginBottom:        "1.25rem",
            WebkitFontSmoothing: "antialiased",
          }}>
            Built for companies that mean{" "}
            <em style={{ fontStyle: "normal", color: C.red }}>business.</em>
          </h2>

          <p style={{
            fontFamily: font.sans,
            fontSize:   "0.9rem",
            color:      "rgba(255,255,255,0.45)",
            lineHeight: 1.85,
          }}>
            We work best with ambitious companies where cross-border complexity
            is a strategic challenge, not a back-office inconvenience.
          </p>
        </motion.div>

        <div className="ct-grid">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.title} client={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
