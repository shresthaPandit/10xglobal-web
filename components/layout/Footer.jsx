"use client"

import Image from "next/image"
import { C, font } from "@/lib/theme"

const COLS = [
  {
    heading: "Services",
    links: [
      { label: "Global Market Entry",   href: "/global-market-entry" },
      { label: "Deals & Transactions",  href: "/deals-transactions"  },
      { label: "Managed Services",      href: "/managed-services"    },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Firm",   href: "/our-firm"                  },
      { label: "Insights",   href: "/our-firm#insights"         },
      { label: "Careers",    href: "/our-firm#careers"          },
      { label: "10x Reads",  href: "https://enlightenedpost.com/" },
    ],
  },
  {
    heading: "Offices",
    links: [
      { label: "India",          href: "/our-firm#offices" },
      { label: "UAE",            href: "/our-firm#offices" },
      { label: "Singapore",      href: "/our-firm#offices" },
      { label: "United States",  href: "/our-firm#offices" },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: C.ink, color: "#fff", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        @media (max-width: 767px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 479px) { .footer-grid { grid-template-columns: 1fr; } }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; }
        @media (max-width: 767px) { .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 5vw 2rem" }}>

        {/* Columns */}
        <div className="footer-grid" style={{ paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <Image
                src="/logo-footer.png"
                alt="10✕Global"
                width={180}
                height={46}
                style={{ objectFit: "contain", display: "block" }}
                unoptimized
              />
            </div>
          </div>

          {/* Link cols */}
          {COLS.map(col => (
            <div key={col.heading}>
              <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.25rem" }}>
                {col.heading}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {col.links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{ fontFamily: font.sans, color: "rgba(255,255,255,0.52)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.52)"}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="footer-bottom" style={{ paddingTop: "1.5rem" }}>
          <p style={{ fontFamily: font.sans, color: "rgba(255,255,255,0.28)", fontSize: "0.8rem" }}>
            © 2026 10x Global. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Terms of Service", "Privacy Policy", "LinkedIn"].map(l => (
              <a key={l} href="#" style={{ fontFamily: font.sans, color: "rgba(255,255,255,0.28)", fontSize: "0.8rem", textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
