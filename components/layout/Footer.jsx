"use client"

import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

const SERVICES = [
  "Global Business Setup", "Managed Services", "Risk & Assurance",
  "Tax & Regulatory", "Legal & Secretarial", "Transaction Support", "Virtual CFO",
]

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{ backgroundColor: C.ink, color: C.bg, padding: isMobile ? "3rem 1.25rem 1.5rem" : "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
          gap:                 isMobile ? "2rem" : "3rem",
          paddingBottom:       "2rem",
          borderBottom:        `1px solid rgba(247,243,238,0.1)`,
        }}>

          {/* Brand */}
          <div>
            <span style={{ fontFamily: font.sans, fontWeight: 600, fontSize: "1.1rem", color: C.bg, letterSpacing: "-0.01em" }}>
              10<span style={{ color: C.copper }}>×</span> Global
            </span>
            <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.5)", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "1rem", maxWidth: 320 }}>
              Advisory expertise. Technology-led delivery. One team across India, UAE, Singapore, and the US — handling your market entry, transactions, and compliance.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              {["LinkedIn", "X", "Instagram"].map(s => (
                <a key={s} href="#" style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.4)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.copper}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.4)"}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services + Company in a row on mobile */}
          <div style={{ display: isMobile ? "grid" : "contents", gridTemplateColumns: isMobile ? "1fr 1fr" : undefined, gap: isMobile ? "1.5rem" : undefined }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(247,243,238,0.4)", marginBottom: "1rem" }}>SERVICES</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {SERVICES.map(s => (
                  <a key={s} href="#services" style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.6)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = C.bg}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.6)"}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(247,243,238,0.4)", marginBottom: "1rem" }}>COMPANY</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Our Firm", "Insights & Updates", "Book a Consultation", "Careers"].map(l => (
                  <a key={l} href="#" style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.6)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = C.bg}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(247,243,238,0.6)"}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     isMobile ? "flex-start" : "center",
          flexDirection:  isMobile ? "column" : "row",
          gap:            isMobile ? "0.75rem" : 0,
          paddingTop:     "1.5rem",
        }}>
          <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.3)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} 10X Global. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Terms of Service", "Privacy Policy"].map(l => (
              <a key={l} href="#" style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.3)", fontSize: "0.8rem", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
