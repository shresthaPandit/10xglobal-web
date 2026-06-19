"use client"

import Image from "next/image"
import { C, font } from "@/lib/theme"

const SERVICES = [
  { label: "Global Market Entry",  href: "/global-market-entry" },
  { label: "Deals & Transactions", href: "/deals-transactions"  },
  { label: "Managed Services",     href: "/managed-services"    },
]

const COMPANY = [
  { label: "Our Firm",   href: "/our-firm"           },
  { label: "Insights",   href: "/our-firm#insights"  },
  { label: "Careers",    href: "/our-firm#careers"   },
  { label: "10x Reads",  href: "https://enlightenedpost.com/" },
]

const OFFICES = [
  { label: "India",         href: "/our-firm#offices" },
  { label: "UAE",           href: "/our-firm#offices" },
  { label: "Singapore",     href: "/our-firm#offices" },
  { label: "United States", href: "/our-firm#offices" },
]

const COL_STYLE = {
  heading: {
    fontFamily: font.sans,
    fontSize: "0.625rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.22)",
    marginBottom: "1.1rem",
  },
  link: {
    fontFamily: font.sans,
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "rgba(255,255,255,0.48)",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.6rem",
    transition: "color 0.18s",
  },
}

function NavCol({ heading, links }) {
  return (
    <div>
      <p style={COL_STYLE.heading}>{heading}</p>
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          style={COL_STYLE.link}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
        >
          {label}
        </a>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0C1A27",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <style>{`
        .ft-inner   { max-width: 1280px; margin: 0 auto; padding: 4rem 5vw 2rem; }
        .ft-top     { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; }
        .ft-bottom  { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; }
        .ft-legal   { display: flex; gap: 1.5rem; }
        @media (max-width: 900px) {
          .ft-top   { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 540px) {
          .ft-top    { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>

      <div className="ft-inner">
        <div className="ft-top">
          {/* Brand col */}
          <div>
            <Image
              src="/logo-footer.png"
              alt="10x Global"
              width={160}
              height={40}
              style={{ objectFit: "contain", display: "block", marginBottom: "1.25rem" }}
              unoptimized
            />
            <p style={{
              fontFamily: font.sans,
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.32)",
              lineHeight: 1.65,
              maxWidth: 240,
            }}>
              Cross-border business advisory for founders, CFOs, and leadership teams.
            </p>
          </div>

          <NavCol heading="Services" links={SERVICES} />
          <NavCol heading="Company"  links={COMPANY}  />
          <NavCol heading="Offices"  links={OFFICES}  />
        </div>

        <div className="ft-bottom">
          <p style={{
            fontFamily: font.sans,
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.2)",
          }}>
            © 2026 10x Global. All rights reserved.
          </p>
          <div className="ft-legal">
            {["Terms of Service", "Privacy Policy", "LinkedIn"].map(l => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: font.sans,
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.2)",
                  textDecoration: "none",
                  transition: "color 0.18s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
