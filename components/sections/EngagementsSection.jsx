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
      subtitle: <>Two markets launched <strong>in parallel</strong> and fully operational in <strong>six to eight weeks</strong>.</>,
      stats: [
        { val: "2",       label: "JURISDICTIONS\nIN PARALLEL" },
        { val: "6–8 wks", label: "TO FULLY\nOPERATIONAL" },
        { val: "45+",     label: "UAE FREE ZONES\nEVALUATED" },
      ],
      clientSnapshot: "A leading global advertising technology company, backed by prominent international investors, set out to expand into the UAE and Singapore as part of a wider growth plan.",
      situation: [
        <>It needed fully operational entities in both markets, with <strong>clear guidance on the right structures, fast execution, and the ability to start operating with minimal delay.</strong></>,
      ],
      approach: {
        subheadings: ["UNITED ARAB EMIRATES", "SINGAPORE"],
        body: [
          "The first decision was where to incorporate. With more than 45 free zones, each carrying real regulatory and commercial consequences, we reviewed the business model and recommended the one that fit best.",
          "Our local team established the company's Private Limited (Pte. Ltd.) entity and ran the process from start to finish.",
        ],
        bold: "Alongside incorporation, we also handled:",
        points: [
          "Entity setup in the UAE and Singapore",
          "Bank account opening and coordination",
          "Employment and hiring structure",
          "Visa and immigration support",
          "Operational readiness planning",
          "Regulatory and compliance onboarding",
        ],
      },
      challenges: [
        "Entering two international markets at once",
        "Tight timelines to become operational",
        "Banking setup across multiple countries",
        "Hiring and visa rules in evolving regulation",
        "Entity structure and jurisdiction decisions",
      ],
      outcome: [
        "Both entities were operational within roughly six to eight weeks, several milestones completed ahead of schedule, with banking, hiring, and compliance fully in place.",
        <>The relationship has continued since, expanding into <strong>European market entry and compliance across new jurisdictions.</strong></>,
      ],
      services: ["Global Market Entry", "UAE Incorporation", "Singapore Incorporation", "Banking Setup", "Immigration & Visa", "Employment Structuring", "Operational Readiness", "Ongoing Compliance"],
      timeline: {
        title: "Two jurisdictions, run side by side",
        subtitle: "Both markets moved through the same phases at once, not in sequence.",
        phases: ["KICKOFF", "SELECTION", "INCORPORATION", "BANKING", "HIRING & VISAS", "OPERATIONAL"],
        rows: [
          {
            flagCode: "ae", label: "UAE", sublabel: "FREE ZONE",
            steps: ["Scoping", "45+ zones\nevaluated", "Entity set up", "Accounts open", "Staff & visas", "Operational\n6 to 8 weeks"],
            boldIndex: 1,
          },
          {
            flagCode: "sg", label: "SINGAPORE", sublabel: "PTE.\nLTD.",
            steps: ["Scoping", "Structure set", "Pte. Ltd.\nestablished", "Accounts open", "Staff & visas", "Operational\n6 to 8 weeks"],
            boldIndex: 2,
          },
        ],
      },
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

function CountUpStat({ val, delay = 0.3 }) {
  const isCountable = /^\d+\+?$/.test(val)
  const [displayed, setDisplayed] = useState(isCountable ? "0" : val)

  useEffect(() => {
    if (!isCountable) return
    const num = parseInt(val)
    const plus = val.includes("+") ? "+" : ""
    const duration = 1.1
    let startTime = null
    let raf

    const tick = (now) => {
      if (startTime === null) startTime = now + delay * 1000
      if (now < startTime) { raf = requestAnimationFrame(tick); return }
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 2.5)
      setDisplayed(Math.round(eased * num) + plus)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [val, delay, isCountable])

  return <>{displayed}</>
}

function EngagementModal({ eng, onClose }) {
  const { detail, title, service } = eng
  const accent = SERVICE_COLOR[service]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const COLS = [
    {
      num: "01", label: "The Brief",
      content: (
        <>
          <p style={{ fontFamily: font.sans, fontSize: "0.93rem", color: "rgba(12,26,39,0.82)", lineHeight: 1.6, marginBottom: "0.85rem" }}>
            {detail.clientSnapshot}
          </p>
          {detail.situation.map((p, i) => (
            <p key={i} style={{ fontFamily: font.sans, fontSize: "0.93rem", color: "rgba(12,26,39,0.82)", lineHeight: 1.6, marginBottom: i < detail.situation.length - 1 ? "0.85rem" : 0 }}>
              {p}
            </p>
          ))}
        </>
      ),
    },
    {
      num: "02", label: "Approach",
      content: (
        <>
          {detail.approach.body.map((p, i) => (
            <div key={i} style={{ marginBottom: i < detail.approach.body.length - 1 ? "1rem" : 0 }}>
              {detail.approach.subheadings?.[i] && (
                <p style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink, marginBottom: "0.35rem", marginTop: 0 }}>
                  {detail.approach.subheadings[i]}
                </p>
              )}
              <p style={{ fontFamily: font.sans, fontSize: "0.93rem", color: "rgba(12,26,39,0.82)", lineHeight: 1.6, margin: 0 }}>
                {p}
              </p>
            </div>
          ))}
        </>
      ),
    },
    {
      num: "03", label: "Scope of Work",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {detail.approach.points.map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span style={{ color: C.red, fontSize: "0.58rem", flexShrink: 0, marginTop: "0.28rem" }}>■</span>
              <span style={{ fontFamily: font.sans, fontSize: "0.97rem", color: "rgba(12,26,39,0.82)", lineHeight: 1.65 }}>{pt}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "04", label: "What Made It Hard",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {detail.challenges.map((ch, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <span style={{ color: C.red, fontSize: "0.58rem", flexShrink: 0, marginTop: "0.28rem" }}>■</span>
              <span style={{ fontFamily: font.sans, fontSize: "0.97rem", color: "rgba(12,26,39,0.82)", lineHeight: 1.65 }}>{ch}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(4,10,18,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5vh 2.5vw",
      }}
    >
      <style>{`
        .cs-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 860px) { .cs-4col { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px)  { .cs-4col { grid-template-columns: 1fr; } }
        .cs-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 640px) { .cs-footer { grid-template-columns: 1fr; gap: 1rem; } }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 1540,
          backgroundColor: "#fff",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 2px 0 rgba(140,26,43,0.6) inset",
          outline: "none",
        }}
      >

        {/* ── BREADCRUMB BAR ── */}
        <div style={{
          padding: "0.6rem 2rem",
          borderBottom: "1px solid rgba(12,26,39,0.08)",
          backgroundColor: "#F8F7F5",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(12,26,39,0.32)" }}>
            Case Study / {service}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid rgba(12,26,39,0.16)",
              width: 24, height: 24, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(12,26,39,0.4)", fontSize: "0.72rem",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(12,26,39,0.16)"; e.currentTarget.style.color = "rgba(12,26,39,0.4)" }}
          >✕</button>
        </div>

        {/* ── HERO ROW ── */}
        <div style={{ padding: "1.4rem 2.2rem 1.1rem", borderBottom: "1px solid rgba(12,26,39,0.08)" }}>
          <div style={{ marginBottom: "0.3rem" }}>
            <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.red }}>
              {eng.from}
            </span>
            <span style={{ fontFamily: font.sans, fontSize: "0.55rem", color: C.red, margin: "0 0.35rem" }}>→</span>
            <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.red }}>
              {eng.to}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{
                fontFamily: font.sans, fontSize: "clamp(1.9rem, 2.8vw, 2.6rem)",
                fontWeight: 700, color: C.ink, lineHeight: 1.08, marginBottom: "0.35rem",
                letterSpacing: "-0.022em",
              }}>{title}</h2>
              <p style={{ fontFamily: font.sans, fontSize: "1.02rem", fontWeight: 600, color: "rgba(12,26,39,0.72)", lineHeight: 1.5, maxWidth: 500, margin: 0 }}>
                {detail.subtitle}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {detail.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.1, duration: 0.4 }}
                  style={{ textAlign: "left", paddingLeft: "1.5rem", borderLeft: i > 0 ? "1px solid rgba(12,26,39,0.12)" : "none", minWidth: 90 }}
                >
                  <div style={{ fontFamily: font.num, fontSize: "clamp(2.4rem, 3.2vw, 3rem)", fontWeight: 700, color: C.ink, lineHeight: 1 }}>
                    <CountUpStat val={s.val} delay={0.28 + i * 0.1} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + i * 0.1, duration: 0.35 }}
                    style={{ fontFamily: font.sans, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(12,26,39,0.35)", marginTop: "0.22rem", whiteSpace: "pre-line", lineHeight: 1.4 }}
                  >
                    {s.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4-COLUMN BODY ── */}
        <div className="cs-4col" style={{ borderBottom: "1px solid rgba(12,26,39,0.08)" }}>
          {COLS.map((col, i) => (
            <div key={i} style={{
              padding: "1.3rem 1.6rem",
              borderLeft: i > 0 ? "1px solid rgba(12,26,39,0.07)" : "none",
              backgroundColor: i % 2 === 1 ? "#FAFAF8" : "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.6rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(12,26,39,0.09)" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 700, color: C.red }}>
                  {col.num}
                </span>
                <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#000" }}>
                  {col.label}
                </span>
              </div>
              {col.content}
            </div>
          ))}
        </div>

        {/* ── TIMELINE ── */}
        {detail.timeline && (
          <div style={{ padding: "1.1rem 2.2rem 1.1rem", borderBottom: "1px solid rgba(12,26,39,0.08)", backgroundColor: "#F0EFEB" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.7rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>
                {detail.timeline.title}
              </span>
              <span style={{ fontFamily: font.sans, fontSize: "0.82rem", color: "rgba(12,26,39,0.4)" }}>
                {detail.timeline.subtitle}
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 600 }}>
                <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", marginBottom: "0.15rem" }}>
                  <div />
                  {detail.timeline.phases.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                      style={{
                        fontFamily: font.sans, fontSize: "0.64rem", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: i === detail.timeline.phases.length - 1 ? C.red : "rgba(12,26,39,0.35)",
                        textAlign: "center", paddingBottom: "0.35rem",
                      }}
                    >{phase}</motion.div>
                  ))}
                </div>

                {detail.timeline.rows.map((row, ri) => (
                  <div key={ri} style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", marginBottom: ri < detail.timeline.rows.length - 1 ? "0.7rem" : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingRight: "0.5rem" }}>
                      {row.flagCode === "ae" ? (
                        <svg width="24" height="16" viewBox="0 0 24 16" style={{ flexShrink: 0, display: "block" }}>
                          <rect width="6" height="16" fill="#00732F"/>
                          <rect x="6" width="18" height="5.33" fill="#00732F"/>
                          <rect x="6" y="5.33" width="18" height="5.34" fill="#fff"/>
                          <rect x="6" y="10.67" width="18" height="5.33" fill="#000"/>
                          <rect width="6" height="16" fill="#FF0000"/>
                        </svg>
                      ) : (
                        <svg width="24" height="16" viewBox="0 0 24 16" style={{ flexShrink: 0, display: "block" }}>
                          <rect width="24" height="8" fill="#EF3340"/>
                          <rect y="8" width="24" height="8" fill="#fff"/>
                          <circle cx="7.5" cy="5" r="2.6" fill="#fff"/>
                          <circle cx="8.8" cy="5" r="2.1" fill="#EF3340"/>
                          <polygon points="10.5,3 11,4.6 12.5,4.6 11.3,5.5 11.7,7 10.5,6.1 9.3,7 9.7,5.5 8.5,4.6 10,4.6" fill="#fff" transform="scale(0.7) translate(5,2)"/>
                        </svg>
                      )}
                      <div>
                        <div style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 700, color: C.ink, letterSpacing: "0.03em" }}>{row.label}</div>
                        <div style={{ fontFamily: font.sans, fontSize: "0.64rem", color: "rgba(12,26,39,0.4)", whiteSpace: "pre-line", lineHeight: 1.15 }}>/ {row.sublabel}</div>
                      </div>
                    </div>

                    {row.steps.map((step, si) => {
                      const isLast = si === row.steps.length - 1
                      const isBold = row.boldIndex === si
                      const dotDelay = 0.45 + ri * 0.12 + si * 0.09
                      return (
                        <div key={si} style={{ textAlign: "center", position: "relative" }}>
                          {si < row.steps.length - 1 && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.38 + ri * 0.12 + si * 0.09, duration: 0.35, ease: "easeOut" }}
                              style={{
                                position: "absolute", top: 6, left: "50%", width: "100%",
                                height: 1, backgroundColor: "rgba(12,26,39,0.15)", zIndex: 0,
                                transformOrigin: "left",
                              }}
                            />
                          )}
                          <div style={{ width: isLast ? 18 : 12, height: isLast ? 18 : 12, margin: "0 auto 0.4rem", position: "relative" }}>
                            {isLast && (
                              <motion.div
                                animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", repeatDelay: 0.4, delay: dotDelay + 0.3 }}
                                style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: C.red }}
                              />
                            )}
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: dotDelay, type: "spring", stiffness: 500, damping: 22 }}
                              style={{
                                width: "100%", height: "100%",
                                borderRadius: "50%",
                                backgroundColor: isLast ? C.red : C.ink,
                                position: "relative", zIndex: 1,
                                boxShadow: isLast ? `0 0 0 3px rgba(140,26,43,0.15)` : "none",
                              }}
                            />
                          </div>
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dotDelay + 0.06, duration: 0.28 }}
                            style={{
                              fontFamily: font.sans, fontSize: "0.76rem",
                              fontWeight: isBold ? 700 : isLast ? 600 : 400,
                              color: isLast ? C.red : C.ink,
                              lineHeight: 1.3, whiteSpace: "pre-line", display: "block",
                            }}
                          >{step}</motion.span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DARK FOOTER ── */}
        <div className="cs-footer" style={{ backgroundColor: "#0A1520", padding: "1.1rem 2.2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.4rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.8rem", fontWeight: 700, color: C.red }}>05</span>
              <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>Outcome</span>
            </div>
            {detail.outcome.map((p, i) => (
              <p key={i} style={{ fontFamily: font.sans, fontSize: "0.86rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.55, marginBottom: i < detail.outcome.length - 1 ? "0.35rem" : 0 }}>
                {p}
              </p>
            ))}
          </div>

          <div>
            <div style={{ marginBottom: "0.4rem" }}>
              <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
                Services Delivered
              </span>
            </div>
            <div>
              {detail.services.map((s, i) => (
                <span key={s} style={{ fontFamily: font.sans, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                  {s}
                  {i < detail.services.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.16)", margin: "0 0.4rem" }}>|</span>
                  )}
                </span>
              ))}
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
