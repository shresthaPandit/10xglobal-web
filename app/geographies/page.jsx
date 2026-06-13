"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useBreakpoint"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactModal from "@/components/ContactModal"

const GlobeGeography = dynamic(() => import("@/components/GlobeGeography"), { ssr: false })

const RED    = C.red
const INK    = C.ink
const GOLD   = C.gold
const BG     = C.bg
const CREAM2 = "#EDEAE3"

// ─── Data ───────────────────────────────────────────────────────────────────

const PRIMARY_OFFICES = [
  {
    key:     "delhi",
    region:  "India · Headquarters",
    city:    "New Delhi",
    country: null,
    desc:    "Our founding office and the heart of the 10x Global operation. Home to the largest part of our team, all core practices, and where our founders work every day.",
    badge:   "Primary operating office",
    address: "Block 2, West Patel Nagar, New Delhi 110008",
    contact: ["info@10x.global", "+91 8800565608"],
    tags:    ["Finance & Tax", "Legal & Compliance", "Transaction Advisory", "Managed Services", "Market Entry", "Virtual CFO"],
    est:     "Est. September 2012",
    featured: true,
  },
]

const SECONDARY_OFFICES = [
  {
    key:     "dubai",
    region:  "UAE · MENA Hub",
    city:    "Dubai",
    country: "United Arab Emirates",
    desc:    "Our MENA hub in Jumeirah Lake Towers. The UAE is where South Asian companies expand first and where global companies stage for India. We run the full regulatory and advisory practice here.",
    address: "1607 JBC5, Cluster W, Jumeirah Lake Towers, Dubai",
    contact: ["info@10x.global", "+971 04 5757988"],
    est:     "Est. 2022",
  },
  {
    key:     "singapore",
    region:  "Singapore · SE Asia",
    city:    "Singapore",
    country: "Republic of Singapore",
    desc:    "Associate office at the Textile Centre on Jalan Sultan. Singapore is the preferred holding and treasury hub for companies with cross-border ASEAN exposure and regional structuring needs.",
    address: "200 Jalan Sultan, #11-01 Textile Centre, Singapore 199018",
    contact: ["info@10x.global"],
    est:     "Est. 2017",
  },
  {
    key:     "us",
    region:  "United States · Americas",
    city:    "Delaware",
    country: "United States of America",
    desc:    "Our growing US practice in Wilmington, Delaware, the preferred state for cross-border entity formation. Supporting Indian and EMEA companies entering the North American market.",
    address: "605 Geddes Street, Wilmington, DE 19805",
    contact: ["info@10x.global"],
    est:     "Est. October 2025",
  },
]

const REGIONAL = [
  {
    code:    "IN",
    label:   "India",
    title:   "The originating market",
    desc:    "All core services run from India. The regulatory landscape is complex and fast-moving; we have been navigating it since 2012.",
    items:   ["Direct tax and transfer pricing", "RBI and FEMA compliance", "Company law and secretarial", "GST and indirect tax", "Transaction advisory", "Virtual CFO"],
  },
  {
    code:    "AE",
    label:   "UAE",
    title:   "The MENA gateway",
    desc:    "The UAE has become the primary outbound destination for Indian businesses and an entry point for global companies wanting India access.",
    items:   ["UAE entity formation", "Free zone and mainland setup", "VAT registration and filing", "UAE corporate tax", "MENA market entry"],
  },
  {
    code:    "SG",
    label:   "Singapore",
    title:   "The ASEAN hub",
    desc:    "Singapore serves as a holding and treasury jurisdiction for companies with regional exposure. Structuring, incorporation, and ongoing compliance.",
    items:   ["Singapore incorporation", "Holding structure design", "Regional compliance", "ASEAN market entry", "Cross-border structuring"],
  },
  {
    code:    "US",
    label:   "United States",
    title:   "The North American front",
    desc:    "Our Delaware practice supports Indian and EMEA businesses entering North America, from entity formation to cross-border transactions and US compliance.",
    items:   ["Delaware C-Corp formation", "US market entry advisory", "Cross-border transactions", "FBAR and US compliance", "US GAAP reporting"],
  },
]

const INDIA_OFFICES = [
  {
    city:    "Gurgaon",
    state:   "Haryana",
    address: "1409, Palms Spring Plaza\nGolf Course Road, Sector 54\nGurugram 122002",
    contact: "info@10x.global · +91 8800565608",
  },
  {
    city:    "Mumbai",
    state:   "Maharashtra",
    address: "AK Estate, near Radisson Blu Hotel\nSwami Vivekananda Road\nGoregaon West, Mumbai 400062",
    contact: "info@10x.global · +91 8800565608",
  },
  {
    city:    "Bangalore",
    state:   "Karnataka",
    address: "1781, 19th Main Road, Vanganahalli\nSector 4, HSR Layout\nBengaluru 560034",
    contact: "info@10x.global · +91 8800565608",
  },
]

const CTA_CARDS = [
  { code: "IN", name: "India",                region: "South Asia",      img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80" },
  { code: "AE", name: "United Arab Emirates", region: "MENA",            img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
  { code: "SG", name: "Singapore",            region: "South-East Asia", img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80" },
  { code: "US", name: "United States",        region: "North America",   img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80" },
]

// ─── Shared label style ──────────────────────────────────────────────────────
function SectionLabel({ children, center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: center ? "center" : "flex-start", marginBottom: "1rem" }}>
      <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: RED }}>
        {children}
      </span>
    </div>
  )
}

// ─── CTA Card ───────────────────────────────────────────────────────────────
function CTACard({ code, name, region, img, onContact }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onContact}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display:        "block",
        position:       "relative",
        overflow:       "hidden",
        borderRadius:   12,
        padding:        "2.5rem 1.75rem",
        border:         `1.5px solid ${hovered ? "rgba(184,50,40,0.5)" : "rgba(154,123,60,0.2)"}`,
        transition:     "border-color 0.45s ease",
        cursor:         "pointer",
        minHeight:      200,
      }}
    >
      {/* City photo */}
      <div style={{
        position:           "absolute",
        inset:              0,
        backgroundImage:    `url(${img})`,
        backgroundSize:     "cover",
        backgroundPosition: "center",
        transform:          hovered ? "scale(1.08)" : "scale(1.0)",
        transition:         "transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }} />
      {/* Overlay — cream on default, deep ink on hover */}
      <div style={{
        position:        "absolute",
        inset:           0,
        backgroundColor: hovered ? "rgba(12,26,39,0.70)" : "rgba(255,255,255,0.91)",
        transition:      "background-color 0.45s ease",
      }} />
      {/* Shine line on hover */}
      <div style={{
        position:        "absolute",
        bottom:          0,
        left:            0,
        right:           0,
        height:          2,
        backgroundColor: RED,
        transform:       hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition:      "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }} />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily:    font.serif,
          fontSize:      "2.2rem",
          fontWeight:    700,
          color:         hovered ? "rgba(255,255,255,0.12)" : "rgba(12,26,39,0.12)",
          lineHeight:    1,
          marginBottom:  "1.25rem",
          transition:    "color 0.35s ease",
        }}>{code}</p>
        <p style={{
          fontFamily:   font.sans,
          fontSize:     "0.95rem",
          fontWeight:   600,
          color:        hovered ? "#fff" : INK,
          marginBottom: "0.4rem",
          transition:   "color 0.35s ease",
        }}>{name}</p>
        <p style={{
          fontFamily:    font.sans,
          fontSize:      "0.62rem",
          fontWeight:    600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         hovered ? "rgba(255,255,255,0.55)" : "rgba(12,26,39,0.42)",
          transition:    "color 0.35s ease",
        }}>{region}</p>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function GeographiesPage() {
  const isMobile = useIsMobile()
  const [showContact, setShowContact] = useState(false)
  return (
    <>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <Navbar />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: BG, padding: isMobile ? "3rem 5vw 4rem" : "5rem 7vw 5rem", overflow: "hidden" }}>
        <div className="geo-hero-grid" style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Left */}
          <div>
            <h1 style={{ fontFamily: font.serif, fontSize: isMobile ? "clamp(2.8rem, 10vw, 4rem)" : "clamp(4.8rem, 6.5vw, 8rem)", fontWeight: 400, lineHeight: 1.0, color: INK, marginBottom: "1.25rem", letterSpacing: "0.01em" }}>
              Four geographies.<br />
              <em style={{ display: "inline-block", marginTop: "0.12em", color: RED, fontStyle: "italic" }}>One team.</em>
            </h1>
            <p style={{ fontFamily: font.sans, fontSize: isMobile ? "1rem" : "1.25rem", fontWeight: 400, color: "rgba(12,26,39,0.65)", lineHeight: 1.65, maxWidth: 440 }}>
              A single integrated practice operating across India, the UAE, Singapore and the United States. One brief, one point of contact, wherever your business needs to be.
            </p>
          </div>

          {/* Right — Globe: skip entirely on mobile for performance */}
          {!isMobile && (
            <div className="globe-wrap">
              <GlobeGeography />
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Our Offices ──────────────────────────────────────────────── */}
      <section id="offices" style={{ backgroundColor: BG, padding: isMobile ? "3rem 5vw 3rem" : "0 7vw 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Heading row */}
          <div className="heading-2col" style={{ marginBottom: "3rem" }}>
            <div>
              <SectionLabel>Our Offices</SectionLabel>
              <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.4rem, 3.5vw, 3.8rem)", fontWeight: 300, color: INK, lineHeight: 1.1, letterSpacing: "0.01em" }}>
                Where we <em style={{ color: RED, fontStyle: "italic" }}>operate from.</em>
              </h2>
            </div>
            <div style={{ paddingTop: "2.5rem" }}>
              <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.62)", lineHeight: 1.75 }}>
                Every office is a full-service presence, not a letterbox. Our people are in the room, in the jurisdiction, working at the speed the market demands.
              </p>
            </div>
          </div>

          {/* New Delhi — featured dark card */}
          <div style={{
            backgroundColor: INK,
            borderRadius:     16,
            padding:          isMobile ? "2rem" : "3rem",
            position:         "relative",
            overflow:         "hidden",
            marginBottom:     "1.5rem",
          }}>
          <div className="hq-card-grid">
            {/* HQ watermark */}
            <span style={{
              position:    "absolute",
              right:       "3rem",
              top:         "50%",
              transform:   "translateY(-50%)",
              fontFamily:  font.serif,
              fontSize:    "clamp(6rem, 10vw, 11rem)",
              fontWeight:  700,
              color:       "rgba(255,255,255,0.04)",
              lineHeight:  1,
              userSelect:  "none",
              pointerEvents: "none",
            }}>HQ</span>

            {/* Left */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: "1rem" }}>
                India · Headquarters
              </p>
              <h3 style={{ fontFamily: font.serif, fontSize: "clamp(2.2rem, 3vw, 3.2rem)", fontWeight: 300, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.1 }}>
                New Delhi
              </h3>
              <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.75, marginBottom: "1.75rem", maxWidth: 340 }}>
                Our founding office and the heart of the 10x Global operation. Home to the largest part of our team, all core practices, and where our founders work every day.
              </p>
              <span style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             "0.5rem",
                backgroundColor: "rgba(154,123,60,0.12)",
                border:          "1px solid rgba(154,123,60,0.3)",
                borderRadius:    20,
                padding:         "0.45rem 0.9rem",
                fontFamily:      font.sans,
                fontSize:        "0.72rem",
                fontWeight:      500,
                color:           GOLD,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: GOLD, display: "inline-block" }} />
                Primary operating office
              </span>
            </div>

            {/* Right */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>
                  Address
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                  Block 2, West Patel Nagar, New Delhi 110008
                </p>
              </div>
              <div style={{ marginBottom: "1.75rem" }}>
                <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>
                  Contact
                </p>
                <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                  info@10x.global<br />+91 8800565608
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {["Finance & Tax", "Legal & Compliance", "Transaction Advisory", "Managed Services", "Market Entry", "Virtual CFO"].map(tag => (
                  <span key={tag} style={{ fontFamily: font.sans, fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "0.25rem 0.6rem" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD }}>
                Est. September 2012
              </p>
            </div>
          </div>{/* /hq-card-grid */}
          </div>{/* /hq outer card */}

          {/* Secondary offices — 3 col */}
          <div className="geo-offices-grid">
            {SECONDARY_OFFICES.map(({ key, region, city, country, desc, address, contact, est }) => (
              <div key={key} style={{ backgroundColor: "#fff", border: `1px solid rgba(154,123,60,0.15)`, borderRadius: 12, padding: "2rem" }}>
                <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: RED, marginBottom: "0.75rem" }}>
                  {region}
                </p>
                <h3 style={{ fontFamily: font.serif, fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)", fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: "0.4rem" }}>
                  {city}
                </h3>
                {country && (
                  <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(12,26,39,0.4)", marginBottom: "1rem" }}>
                    {country}
                  </p>
                )}
                <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: "rgba(12,26,39,0.62)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {desc}
                </p>
                <div style={{ borderTop: `1px solid rgba(154,123,60,0.12)`, paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <span style={{ color: RED, fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>◎</span>
                    <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(12,26,39,0.65)", lineHeight: 1.5 }}>{address}</p>
                  </div>
                  {contact.map(c => (
                    <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: RED, fontSize: "0.75rem", flexShrink: 0 }}>✉</span>
                      <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(12,26,39,0.65)" }}>{c}</p>
                    </div>
                  ))}
                  <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, marginTop: "0.5rem" }}>
                    {est}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Regional Focus ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: BG, padding: isMobile ? "3rem 5vw" : "5rem 7vw" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel center>Regional Focus</SectionLabel>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.4rem, 3.5vw, 3.8rem)", fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "0.01em" }}>
              What we do <em style={{ color: RED, fontStyle: "italic" }}>in each market.</em>
            </h2>
            <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.55)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              The same integrated practice adapts to each jurisdiction. Here is what our presence enables in each geography.
            </p>
          </div>

          <div className="geo-regional-grid">
            {REGIONAL.map(({ code, label, title, desc, items }) => (
              <div key={code} style={{ backgroundColor: "#fff", border: `1px solid rgba(154,123,60,0.15)`, borderRadius: 12, padding: "2rem" }}>
                <p style={{ fontFamily: font.serif, fontSize: "2rem", fontWeight: 700, color: "rgba(12,26,39,0.12)", lineHeight: 1, marginBottom: "0.75rem" }}>{code}</p>
                <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: RED, marginBottom: "0.6rem" }}>{label}</p>
                <h3 style={{ fontFamily: font.serif, fontSize: "1.35rem", fontWeight: 400, color: INK, lineHeight: 1.25, marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ fontFamily: font.sans, fontSize: "0.82rem", color: "rgba(12,26,39,0.6)", lineHeight: 1.65, marginBottom: "1.25rem" }}>{desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: RED, fontSize: "0.55rem", marginTop: "0.35rem", flexShrink: 0 }}>●</span>
                      <span style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(12,26,39,0.7)", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. India Presence ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: CREAM2, padding: isMobile ? "3rem 5vw" : "5rem 7vw" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionLabel>India Presence</SectionLabel>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.4rem, 3.5vw, 3.8rem)", fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
            Four offices across <em style={{ color: RED, fontStyle: "italic" }}>India.</em>
          </h2>
          <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.58)", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 520 }}>
            New Delhi is our headquarters, but our India footprint extends to Gurgaon, Mumbai and Bangalore, serving clients where they operate.
          </p>

          <div className="geo-offices-grid">
            {INDIA_OFFICES.map(({ city, state, address, contact }) => (
              <div key={city} style={{ backgroundColor: "#fff", borderRadius: 12, padding: "2rem", border: `1px solid rgba(154,123,60,0.12)` }}>
                <h3 style={{ fontFamily: font.serif, fontSize: "1.8rem", fontWeight: 300, color: INK, marginBottom: "0.35rem" }}>{city}</h3>
                <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(12,26,39,0.4)", marginBottom: "1.25rem" }}>{state}</p>
                <p style={{ fontFamily: font.sans, fontSize: "0.85rem", color: "rgba(12,26,39,0.65)", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: "1rem" }}>{address}</p>
                <p style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(12,26,39,0.5)", borderTop: `1px solid rgba(154,123,60,0.1)`, paddingTop: "0.875rem" }}>{contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Work With Us ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: BG, padding: isMobile ? "3rem 5vw 4rem" : "6rem 7vw" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel center>Work With Us</SectionLabel>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.4rem, 4vw, 4.5rem)", fontWeight: 300, color: INK, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "0.01em" }}>
            Which geography are you<br />trying to <em style={{ color: RED, fontStyle: "italic" }}>crack?</em>
          </h2>
          <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.55)", lineHeight: 1.7, marginBottom: "3rem" }}>
            Select your market and we will connect you with the right people on the ground.
          </p>

          <div className="geo-cta-grid" style={{ maxWidth: 960, margin: "0 auto 2rem" }}>
            {CTA_CARDS.map((card) => (
              <CTACard key={card.code} {...card} onContact={() => setShowContact(true)} />
            ))}
          </div>

          <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: "rgba(12,26,39,0.45)" }}>
            Or email us at{" "}
            <a href="mailto:info@10x.global" style={{ color: RED, textDecoration: "none", fontWeight: 600 }}>info@10x.global</a>
            {" "}and we will route you to the right team.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
