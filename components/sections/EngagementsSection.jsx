"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"

const SERVICE_COLOR = {
  "Global Market Entry":          C.red,
  "Deals & Transaction Advisory": C.gold,
  "Managed Services":             C.ink,
}

const ENGAGEMENTS = [
  {
    from: "US AdTech", to: "UAE & Singapore Expansion",
    title: "Market Entry & Operational Setup",
    items: [
      "WOS incorporation & regulatory approvals",
      "Employment structure & HR compliance",
      "Transfer pricing policy & documentation",
      "Banking setup & GST registration",
    ],
    service: "Global Market Entry",
    detail: {
      subtitle: "Two markets, fully operational in six to eight weeks.",
      stats: [
        { val: "6–8 wks", label: "to operational in\nboth markets" },
        { val: "2",       label: "jurisdictions\nlaunched in parallel" },
        { val: "45+",     label: "UAE free zones\nto navigate" },
      ],
      clientSnapshot: "A leading global advertising-technology company, backed by prominent international investors, set out to expand into the UAE and Singapore as part of its wider international growth plan.",
      situation: [
        "The company needed fully operational entities in both markets, with support across the entire setup lifecycle: market-entry strategy, entity selection, incorporation, banking, hiring, and operational readiness.",
        "Incorporation was only part of the brief. The founders also wanted clear guidance on the right structures, fast execution, and the ability to start operating with minimal delay.",
      ],
      approach: {
        body: [
          "In the UAE, the first major decision was where to incorporate. The country has more than 45 free zones, and the choice carries real regulatory, operational, and commercial consequences. We reviewed the company's business model and expansion plans, then recommended the free zone that fit best.",
          "In Singapore, our local team established the company's Private Limited (Pte. Ltd.) entity and managed the process end to end.",
        ],
        bold: "Alongside incorporation, we also handled:",
        points: [
          "Entity setup in the UAE and Singapore",
          "Bank account opening and banking coordination",
          "Employment and hiring structure",
          "Visa and immigration support",
          "Operational readiness planning",
          "Regulatory and compliance onboarding",
        ],
      },
      challenges: [
        "Expanding into two international markets at the same time",
        "Tight timelines to become operational",
        "Setting up banking across multiple countries",
        "Hiring and visa requirements in markets with evolving regulation",
        "Decisions on entity structure and jurisdiction selection",
      ],
      outcome: [
        "Both entities were operational within roughly six to eight weeks, with several setup milestones completed well ahead of that. Banking, hiring, and compliance were all in place, letting the company begin local operations quickly.",
        "The relationship has continued since, expanding into further work including European market entry and compliance in new jurisdictions.",
      ],
      services: ["Global Market Entry", "UAE Incorporation Advisory", "Singapore Incorporation Advisory", "Banking Setup", "Immigration & Visa Support", "Employment Structuring", "Operational Readiness", "Ongoing Compliance & Managed Services"],
    },
  },
  {
    from: "AI Tech", to: "Series A · $12M",
    title: "Fundraising & Transaction Advisory",
    items: [
      "Pre-fundraise structuring & cap table clean-up",
      "Term sheet review & investor negotiations",
      "SHA / SSA documentation",
      "RBI filings & post-round compliance",
    ],
    service: "Deals & Transaction Advisory",
    detail: {
      subtitle: "A $12M round, closed clean and on schedule.",
      stats: [
        { val: "$12M",  label: "Series A raised" },
        { val: "4",     label: "investors in\nfinal round" },
        { val: "11 wks", label: "from mandate\nto close" },
      ],
      clientSnapshot: "A fast-growing AI technology company with strong enterprise traction and early institutional backing engaged us ahead of their Series A. The cap table carried residual complexity from an angel round, and the corporate structure had not been designed with institutional investors in mind.",
      situation: [
        "The founders needed to clean up the structure before investors began formal due diligence. Any gaps surfaced late would delay or reprice the round.",
        "Beyond documentation, they needed experienced negotiators on the term sheet and SHA, and a team that could manage RBI filings in parallel without slowing the close.",
      ],
      approach: {
        body: [
          "We began with a full audit of the existing cap table and corporate structure. Excess share classes from the seed round were simplified, ESOP percentages were rationalised, and the holding architecture was reviewed for investor fit.",
          "On the transaction side, we ran the term sheet negotiation alongside the founders, managed the SHA drafting across three negotiating parties, and prepared the RBI filings in parallel so compliance was ready at close.",
        ],
        bold: "Across the engagement we handled:",
        points: [
          "Cap table clean-up and restructuring",
          "Term sheet review and investor negotiations",
          "SHA and SSA drafting and finalisation",
          "ESOP plan restructuring for institutional investors",
          "RBI filing and FEMA compliance",
          "Post-round secretarial and regulatory obligations",
        ],
      },
      challenges: [
        "Fragmented cap table from multiple angel rounds",
        "ESOP plan not structured for institutional investor requirements",
        "Outstanding RBI compliance from a prior fundraise",
        "Multiple negotiating parties across jurisdictions",
        "First-time founders navigating institutional-grade term sheets",
      ],
      outcome: [
        "The Series A closed at $12M within eleven weeks of engagement. The cap table was clean, all documentation was compliant, and the ESOP plan was structured to support two further funding rounds without restructuring.",
        "The company has since retained us for ongoing managed services and cross-border compliance across India and Singapore.",
      ],
      services: ["Fundraising Advisory", "Pre-Round Structuring", "Cap Table Management", "Term Sheet Negotiation", "SHA & SSA Drafting", "ESOP Structuring", "RBI Filings", "Post-Round Compliance"],
    },
  },
  {
    from: "Manufacturing", to: "UAE Entry",
    title: "Holding Structure & UAE Expansion",
    items: [
      "Freezone entity selection & incorporation",
      "Holding company design & tax structuring",
      "VAT registration & economic substance",
      "Operational setup & banking",
    ],
    service: "Global Market Entry",
    detail: {
      subtitle: "A holding structure built for tax efficiency and future growth.",
      stats: [
        { val: "3 wks",  label: "UAE entity\noperational" },
        { val: "0%",     label: "corporate tax on\nqualifying income" },
        { val: "45+",    label: "free zones\nevaluated" },
      ],
      clientSnapshot: "A mid-size Indian manufacturing company with growing export revenues wanted to establish a UAE presence for trade facilitation, business development, and long-term tax efficiency.",
      situation: [
        "The client had been exploring a UAE setup informally for over a year, but every local advisor they spoke to recommended a different free zone without adequately explaining the trade-offs.",
        "The holding structure also needed to account for future capital flows between India and the UAE, including transfer pricing obligations and RBI reporting on outbound investment.",
      ],
      approach: {
        body: [
          "We started by mapping the client's revenue flows, supplier relationships, and future expansion plans to identify which free zone genuinely fit their business model. The choice was not the cheapest option — it was the one that offered the right economic substance pathway and commercial flexibility.",
          "The India holding structure was designed in parallel, ensuring clean intercompany flow documentation and transfer pricing compliance from day one.",
        ],
        bold: "The engagement covered:",
        points: [
          "Free zone selection and comparative analysis",
          "UAE entity incorporation and trade licence",
          "Holding structure design between India and UAE",
          "Transfer pricing policy documentation",
          "VAT registration and economic substance filings",
          "Bank account opening and treasury coordination",
        ],
      },
      challenges: [
        "Choosing between 45+ UAE free zones with different regulatory regimes",
        "Designing a holding structure that satisfies both RBI and UAE requirements",
        "Economic substance obligations for the UAE entity",
        "Banking as a foreign-owned entity in the UAE",
        "Transfer pricing between India and UAE from day one",
      ],
      outcome: [
        "The UAE entity was operational within three weeks of engagement, with a bank account open and the trade licence active. The holding structure was designed with a clear roadmap for future capital deployment.",
        "Twelve months on, the UAE office handles over 40% of the group's international trade flows, with zero compliance incidents across either jurisdiction.",
      ],
      services: ["UAE Entity Formation", "Holding Structure Design", "Freezone Advisory", "Transfer Pricing", "VAT Registration", "Economic Substance", "Banking Setup", "RBI ODI Compliance"],
    },
  },
  {
    from: "Indian D2C", to: "Delaware Flip",
    title: "Pre-Series B Restructuring",
    items: [
      "Delaware C-Corp incorporation",
      "ESOP migration & re-grant",
      "FEMA compliance & transfer pricing",
      "Investor documentation support",
    ],
    service: "Deals & Transaction Advisory",
    detail: {
      subtitle: "A clean flip, completed before the next round opened.",
      stats: [
        { val: "8 wks",  label: "full restructure\ncompleted" },
        { val: "$0",     label: "tax leakage\non the flip" },
        { val: "3",      label: "ESOPs re-granted\nunder new structure" },
      ],
      clientSnapshot: "A fast-growing Indian D2C brand preparing for a Series B with US institutional investors. Their lead investor had flagged that a Delaware C-Corp holding structure was a prerequisite for the round.",
      situation: [
        "The company had been incorporated in India from day one. Converting to a Delaware-held structure required a FEMA-compliant share swap, migration of ESOPs, and clean documentation for incoming investors.",
        "The timeline was tight — the Series B process was already underway and the restructure had to be completed before due diligence formally began.",
      ],
      approach: {
        body: [
          "We designed the flip structure to avoid triggering Indian tax on the share swap, using valuation methodology that satisfied both Indian tax authorities and the incoming investors.",
          "ESOPs were cancelled at the Indian entity level and re-granted under a new Delaware equity plan, preserving vesting schedules and keeping employee equity whole.",
        ],
        bold: "The engagement included:",
        points: [
          "Delaware C-Corp incorporation and charter drafting",
          "FEMA-compliant share swap and ODI structuring",
          "Valuation for tax compliance purposes",
          "ESOP plan migration and re-grant documentation",
          "Transfer pricing documentation post-flip",
          "Investor documentation and data room support",
        ],
      },
      challenges: [
        "Completing the flip without triggering Indian capital gains tax",
        "Migrating ESOPs without employee disruption or loss of vesting",
        "Simultaneous RBI reporting and FEMA compliance across both entities",
        "Coordinating with investor legal counsel on US documentation",
        "Compressing an eight-week process into a live fundraise timeline",
      ],
      outcome: [
        "The restructure was completed in eight weeks, with zero tax leakage on the flip and all ESOP holders' interests preserved. The Series B due diligence found the structure clean.",
        "The company raised its Series B the following quarter. The Delaware entity now serves as the group holding company across four jurisdictions.",
      ],
      services: ["Delaware C-Corp Incorporation", "FEMA Compliance", "ODI Structuring", "Share Swap Execution", "ESOP Migration & Re-grant", "Valuation", "Transfer Pricing", "Investor Documentation"],
    },
  },
  {
    from: "Global SaaS", to: "5 Jurisdictions",
    title: "Multi-Jurisdiction Managed Services",
    items: [
      "India, UAE, Singapore, US, Netherlands",
      "Monthly accounting & tax compliance",
      "Payroll across all entities",
      "Board packs & investor reporting",
    ],
    service: "Managed Services",
    detail: {
      subtitle: "One team managing five compliance calendars. Nothing missed.",
      stats: [
        { val: "5",    label: "jurisdictions\nmanaged" },
        { val: "60+",  label: "filings\nper year" },
        { val: "100%", label: "on-time delivery\nfor 3 years" },
      ],
      clientSnapshot: "A B2B SaaS company with entities in India, UAE, Singapore, the United States, and the Netherlands engaged us to consolidate their finance and compliance function after their previous multi-advisor setup began generating gaps and missed deadlines.",
      situation: [
        "Each jurisdiction had a different local advisor. None of them talked to each other. Transfer pricing documentation was out of date, and the board had no single view of the group's compliance status.",
        "With a Series C imminent, the CFO needed clean books, current compliance, and investor-ready reporting across the entire group before due diligence began.",
      ],
      approach: {
        body: [
          "We replaced the fragmented advisor setup with a single integrated team. One point of contact, one compliance calendar, one set of monthly reporting packs.",
          "Intercompany flows and transfer pricing were restructured in the first ninety days. Monthly board packs were standardised across all entities into a single format the investors could read at a glance.",
        ],
        bold: "The ongoing retainer covers:",
        points: [
          "Monthly accounting and management accounts across all entities",
          "Tax compliance — GST, VAT, corporate tax in all jurisdictions",
          "Payroll processing and PF/ESI compliance",
          "Transfer pricing documentation and updates",
          "Board packs and investor reporting",
          "Intercompany reconciliation and treasury reporting",
        ],
      },
      challenges: [
        "Five separate compliance regimes with no shared visibility",
        "Transfer pricing documentation significantly behind",
        "Board packs produced in different formats by different advisors",
        "Intercompany transactions not documented to investor standard",
        "Series C due diligence expected within six months of engagement",
      ],
      outcome: [
        "Within ninety days, the group had a single compliance calendar, standardised board packs, and current transfer pricing documentation. The Series C due diligence passed without a finance-related query.",
        "Three years on, the company has expanded into two additional markets and the retainer has grown with them — same team, same standard, across every jurisdiction.",
      ],
      services: ["Virtual CFO", "Monthly Accounting", "Tax Compliance", "Payroll Management", "Transfer Pricing", "Board Pack Preparation", "Investor Reporting", "Intercompany Reconciliation"],
    },
  },
  {
    from: "PE Portfolio", to: "M&A Exit",
    title: "Cross-Border M&A Advisory",
    items: [
      "Sell-side financial & legal due diligence",
      "SPA negotiation & documentation",
      "Tax-efficient exit structure",
      "Post-closing filings across jurisdictions",
    ],
    service: "Deals & Transaction Advisory",
    detail: {
      subtitle: "A cross-border exit, structured for maximum after-tax value.",
      stats: [
        { val: "9 wks",  label: "from mandate\nto signing" },
        { val: "3",      label: "bidders in\nfinal round" },
        { val: "4",      label: "jurisdictions\ninvolved in exit" },
      ],
      clientSnapshot: "A PE-backed portfolio company in the B2B services sector engaged us to lead the sell-side advisory for a strategic exit, with interested buyers across India, the UAE, and the US.",
      situation: [
        "The company had entities in India, the UAE, and Singapore, each with its own compliance history. The PE sponsor needed clean sell-side diligence prepared before buyers began their own process.",
        "The exit structure needed to be designed to minimise tax leakage across jurisdictions while satisfying the regulatory requirements of both the seller and the acquirer.",
      ],
      approach: {
        body: [
          "We prepared the sell-side financial and legal due diligence reports before approaching buyers — a step that materially shortened the deal timeline and prevented issues from surfacing in buyer DD.",
          "The exit structure was designed with two holding layers to manage tax efficiently across India and the UAE, with the SPA drafted to reflect the multi-jurisdiction reality of the transaction.",
        ],
        bold: "The advisory mandate covered:",
        points: [
          "Sell-side financial and legal due diligence preparation",
          "Tax-efficient exit structure design across four jurisdictions",
          "SPA negotiation and final documentation",
          "Management of buyer due diligence queries",
          "RBI and FEMA clearance on the outbound remittance",
          "Post-closing filings and regulatory notifications",
        ],
      },
      challenges: [
        "Entities across four jurisdictions with different regulatory clearance timelines",
        "Tax exposure on exit in both India and the UAE",
        "Managing three bidders simultaneously through a competitive process",
        "Compliance gaps in the UAE entity that needed resolution before signing",
        "Coordinating post-closing obligations across multiple regulatory authorities",
      ],
      outcome: [
        "The transaction signed within nine weeks of engagement. The exit structure achieved a materially better after-tax outcome than the initial structure the PE sponsor had assumed.",
        "Post-closing filings were completed across all four jurisdictions within the agreed timelines, with no regulatory complications during the transition period.",
      ],
      services: ["Sell-side Advisory", "Financial Due Diligence", "Legal Due Diligence", "Exit Structure Design", "SPA Negotiation", "Tax Structuring", "RBI & FEMA Clearance", "Post-Closing Compliance"],
    },
  },
]

function SectionLabel({ text, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
      <div style={{ width: 2, height: 13, backgroundColor: accent, flexShrink: 0 }} />
      <span style={{ fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: accent }}>
        {text}
      </span>
    </div>
  )
}

function EngagementModal({ eng, onClose }) {
  const { detail, title, service } = eng
  const accent = SERVICE_COLOR[service]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(8,18,28,0.82)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3vh 3vw",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.965 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.975 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 1200,
          backgroundColor: "#fff",
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ background: `radial-gradient(ellipse at 80% 50%, rgba(140,26,43,0.18) 0%, transparent 65%), ${C.ink}`, position: "relative", overflow: "hidden" }}>

          {/* Subtle decorative arc */}
          <svg style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.12, pointerEvents: "none" }} width="420" height="260" viewBox="0 0 420 260">
            <circle cx="420" cy="260" r="300" fill="none" stroke="#FF8080" strokeWidth="1" />
            <circle cx="420" cy="260" r="220" fill="none" stroke="#FF8080" strokeWidth="1" />
            <circle cx="420" cy="260" r="140" fill="none" stroke="#FF8080" strokeWidth="1" />
          </svg>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 10,
              width: 34, height: 34, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.6)", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff" }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)" }}
          >✕</button>

          {/* Top content: tags + title */}
          <div style={{ padding: "2.75rem 3rem 2.25rem" }}>
            {/* From → To */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.75rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{eng.from}</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>→</span>
              <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 600, color: accent, letterSpacing: "0.06em" }}>{eng.to}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: font.serif, fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              fontWeight: 300, color: "#fff", lineHeight: 1.08, marginBottom: "0.75rem",
              maxWidth: 640,
            }}>{title}</h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: font.serif, fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              fontStyle: "italic", color: `${accent}BB`, lineHeight: 1.5, marginBottom: "1.25rem",
              maxWidth: 540,
            }}>{detail.subtitle}</p>

            {/* Service pill */}
            <span style={{
              fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700,
              letterSpacing: "0.24em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}>{service}</span>
          </div>

          {/* Stats strip — bottom of header */}
          <div style={{
            display: "flex",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}>
            {detail.stats.map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: "1.5rem 2rem",
                borderRight: i < detail.stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                display: "flex", flexDirection: "column", gap: "0.35rem",
              }}>
                <span style={{
                  fontFamily: font.num, fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 300, color: "#fff", lineHeight: 1,
                }}>{s.val}</span>
                <span style={{
                  fontFamily: font.sans, fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.38)", lineHeight: 1.5, whiteSpace: "pre-line",
                }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ backgroundColor: "#FAFAF8", padding: "2.5rem 3rem" }}>
          <style>{`
            .modal-body-grid {
              display: grid;
              grid-template-columns: 1fr 1.1fr 1fr;
              gap: 1.5rem;
              margin-bottom: 1.5rem;
              align-items: start;
            }
            @media (max-width: 860px) { .modal-body-grid { grid-template-columns: 1fr; } }
          `}</style>

          <div className="modal-body-grid">

            {/* Col 1: Snapshot + Situation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderTop: `2px solid ${accent}` }}>
                <SectionLabel text="Client Snapshot" accent={accent} />
                <p style={{ fontFamily: font.serif, fontSize: "0.92rem", fontStyle: "italic", color: "rgba(28,23,18,0.78)", lineHeight: 1.8 }}>
                  {detail.clientSnapshot}
                </p>
              </div>
              <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderTop: "2px solid rgba(12,26,39,0.12)" }}>
                <SectionLabel text="Situation" accent="rgba(12,26,39,0.45)" />
                {detail.situation.map((p, i) => (
                  <p key={i} style={{ fontFamily: font.sans, fontSize: "0.84rem", color: "rgba(28,23,18,0.65)", lineHeight: 1.82, marginBottom: i < detail.situation.length - 1 ? "0.85rem" : 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Col 2: Our Approach */}
            <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderTop: `2px solid ${accent}`, height: "100%" }}>
              <SectionLabel text="Our Approach" accent={accent} />
              {detail.approach.body.map((p, i) => (
                <p key={i} style={{ fontFamily: font.sans, fontSize: "0.84rem", color: "rgba(28,23,18,0.65)", lineHeight: 1.82, marginBottom: "1rem" }}>
                  {p}
                </p>
              ))}
              <p style={{ fontFamily: font.sans, fontSize: "0.8rem", fontWeight: 600, color: "rgba(28,23,18,0.8)", lineHeight: 1.6, marginBottom: "0.85rem", marginTop: "0.25rem" }}>
                {detail.approach.bold}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {detail.approach.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(12,26,39,0.05)" }}>
                    <span style={{ width: 16, height: 1, backgroundColor: accent, flexShrink: 0, display: "inline-block", marginBottom: "0.2rem" }} />
                    <span style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(28,23,18,0.65)", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Challenges + Outcome */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ backgroundColor: "#fff", padding: "1.75rem", borderTop: "2px solid rgba(12,26,39,0.12)" }}>
                <SectionLabel text="Key Challenges" accent="rgba(12,26,39,0.45)" />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {detail.challenges.map((ch, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(12,26,39,0.2)", flexShrink: 0, marginTop: "0.42rem" }} />
                      <span style={{ fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(28,23,18,0.62)", lineHeight: 1.65 }}>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome — inverted */}
              <div style={{ backgroundColor: C.ink, padding: "1.75rem" }}>
                <SectionLabel text="Outcome" accent={accent} />
                {detail.outcome.map((p, i) => (
                  <p key={i} style={{ fontFamily: font.serif, fontSize: "0.88rem", fontStyle: "italic", color: "rgba(255,255,255,0.78)", lineHeight: 1.82, marginBottom: i < detail.outcome.length - 1 ? "1rem" : 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Services Delivered */}
          <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(12,26,39,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(12,26,39,0.35)", flexShrink: 0 }}>
                Services Delivered
              </span>
              <div style={{ width: 1, height: 14, backgroundColor: "rgba(12,26,39,0.15)", flexShrink: 0 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {detail.services.map(s => (
                  <span key={s} style={{
                    fontFamily: font.sans, fontSize: "0.7rem", color: "rgba(12,26,39,0.55)",
                    border: "1px solid rgba(12,26,39,0.13)",
                    padding: "0.22rem 0.75rem",
                    backgroundColor: "#fff",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

function EngagementCard({ eng, index, onLearnMore }) {
  const [hovered, setHovered] = useState(false)
  const accent = SERVICE_COLOR[eng.service]

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          y: hovered ? -8 : 0,
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px ${accent}30`
            : "0 2px 16px rgba(12,26,39,0.06)",
          backgroundColor: hovered ? "#FAFAFA" : "#ffffff",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          border: "1px solid rgba(12,26,39,0.09)",
          display: "flex", flexDirection: "column",
          height: "100%", overflow: "hidden",
          cursor: "default", position: "relative",
        }}
      >
        {/* Top accent line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.35, backgroundColor: accent }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 3, transformOrigin: "left", backgroundColor: accent }}
        />

        <div style={{ padding: "1.75rem 2rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{
              fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 600,
              color: "rgba(12,26,39,0.6)", backgroundColor: "rgba(12,26,39,0.06)",
              padding: "0.3rem 0.65rem", letterSpacing: "0.04em",
            }}>{eng.from}</span>
            <span style={{ fontFamily: font.sans, fontSize: "0.65rem", color: "rgba(12,26,39,0.3)" }}>→</span>
            <motion.span
              animate={{ backgroundColor: hovered ? `${accent}18` : "rgba(12,26,39,0.04)", color: hovered ? accent : "rgba(12,26,39,0.55)" }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 600, padding: "0.3rem 0.65rem", letterSpacing: "0.04em" }}
            >{eng.to}</motion.span>
          </div>

          {/* Title */}
          <h3 style={{ fontFamily: font.serif, fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)", fontWeight: 400, color: C.ink, lineHeight: 1.25, marginBottom: "1.25rem" }}>
            {eng.title}
          </h3>

          {/* Items */}
          <ul style={{ listStyle: "none", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {eng.items.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(12,26,39,0.55)", lineHeight: 1.5 }}>
                <motion.span
                  animate={{ color: hovered ? accent : "rgba(12,26,39,0.25)" }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  style={{ flexShrink: 0, marginTop: "0.2rem", fontSize: "0.5rem" }}
                >◆</motion.span>
                {item}
              </li>
            ))}
          </ul>

          {/* Footer: service label + learn more */}
          <div style={{ borderTop: "1px solid rgba(12,26,39,0.08)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <motion.span
              animate={{ color: hovered ? accent : "rgba(12,26,39,0.3)" }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: font.sans, fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >{eng.service}</motion.span>

            <button
              onMouseEnter={() => onLearnMore()}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 600,
                color: accent, display: "flex", alignItems: "center", gap: "0.3rem",
                padding: 0, position: "relative",
              }}
            >
              Learn more
              <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >→</motion.span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EngagementsSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="engagements" style={{ backgroundColor: C.bg, padding: "6rem 7vw" }}>
      <style>{`
        .eng-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3.5rem;
        }
        @media (max-width: 1024px) { .eng-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .eng-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 560 }}
        >
          <span style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.red, display: "block", marginBottom: "1.1rem" }}>
            Recent Transactions & Engagements
          </span>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 300, color: C.ink, lineHeight: 1.18, marginBottom: "1.1rem" }}>
            Work that speaks{" "}
            <em style={{ fontStyle: "italic", color: C.red }}>for itself.</em>
          </h2>
          <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: "rgba(12,26,39,0.5)", lineHeight: 1.8 }}>
            A selection of recent mandates across our three practice areas.
            Client names withheld where confidentiality applies.
          </p>
        </motion.div>

        <div className="eng-grid">
          {ENGAGEMENTS.map((eng, i) => (
            <EngagementCard
              key={eng.title}
              eng={eng}
              index={i}
              onLearnMore={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <EngagementModal
            eng={ENGAGEMENTS[activeIndex]}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
