"use client"

import { useState, useEffect, useRef } from "react"
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
      heroTitle: "A global adtech leader goes live in the UAE and Singapore in eight weeks.",
      heroDesc: "When a fast-scaling US technology company decided to expand into the Middle East and Southeast Asia, it needed both markets running quickly and set up correctly. We handled the full process in each, from entity structure and incorporation through banking, hiring, visas, and compliance.",
      stats: [
        { val: "2",       label: "MARKETS\nLAUNCHED IN\nPARALLEL" },
        { val: "6–8 wks", label: "FROM KICKOFF\nTO FULLY\nOPERATIONAL" },
        { val: "45+",     label: "UAE FREE ZONES\nEVALUATED" },
      ],
      clientSnapshot: "The client is a global advertising technology company backed by well-known international investors. As part of a broader expansion plan, the business chose the UAE and Singapore as its next two markets.",
      situation: [
        "They wanted fully operational entities in both, structured correctly from day one, so their local teams could get to work with as little delay as possible.",
      ],
      approach: {
        subheadings: ["UNITED ARAB EMIRATES", "SINGAPORE"],
        body: [
          "The first decision was where to incorporate. We worked through the client's business model against the free zone options, recommended the one that fit, then ran incorporation, banking, hiring, and visas from there.",
          "Our local team set up the Private Limited (Pte. Ltd.) entity and managed the full process, from the right structure through to bank accounts and staffing.",
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
        "Setting up in a new country is demanding on its own. The client was doing it in two at once, on a tight timeline, while the rules in both markets kept shifting.",
        "The UAE alone has more than 45 free zones, and the wrong choice of zone or entity structure would have meant real cost and rework later. Banking, hiring, and visas all had to come together across both jurisdictions before the business could operate.",
      ],
      outcome: [
        <>Both entities were <strong>live in roughly six to eight weeks</strong>, with several milestones completed ahead of schedule. Banking, hiring, and compliance were all in place, and the client's teams were able to start operating in both markets straight away.</>,
        <>The relationship has continued since. We are now supporting the same client's <strong>expansion into Europe</strong>, handling market entry and compliance across new jurisdictions.</>,
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
  {
    from: "AI-Native EdTech",
    to: "Series B · US$15M+",
    title: "Fundraising & Transaction Advisory",
    items: [
      "Term sheet review and negotiations",
      "SHA / SSA documentation",
      "Secondary transaction structuring",
      "Founder representation throughout",
    ],
    service: "Deals & Transaction Advisory",
    detail: {
      heroTitle: "An AI language learning platform closes a US$15M+ Series B alongside a significant secondary transaction.",
      heroDesc: "The company was undertaking a Series B fundraising round of over US$15 million, involving both a primary investment by institutional investors and a significant secondary transaction between existing shareholders. The round attracted participation from marquee investors and tier-one venture capital funds across India and overseas.",
      stats: [
        { val: "$15M+", label: "SERIES B\nRAISED" },
        { val: "2",     label: "TRANSACTION\nTRACKS" },
        { val: "10+",   label: "WORKSTREAMS\nMANAGED" },
      ],
      clientSnapshot: "AI-native language learning platform with millions of users and strong market traction, backed by leading investors from India and international markets.",
      situation: [
        "Given the complexity of the transaction, the founders required an advisor who could support them throughout the fundraising journey while safeguarding founder interests during negotiations.",
      ],
      approach: {
        body: [
          "We acted as the founders' transaction advisory partner throughout the fundraising process, providing end-to-end legal, corporate secretarial, diligence, and transaction support from the term sheet stage through final closing.",
          "Working alongside some of the most respected investors and advisors in the ecosystem, we helped the founders evaluate proposed protections, negotiate commercial positions, and push for balanced governance provisions within the definitive agreements.",
        ],
        subheadings: [null, "FOUNDER REPRESENTATION"],
        bold: "Across the engagement we handled:",
        points: [
          "Transaction structuring support",
          "Term sheet review and negotiations",
          "Share Subscription Agreement (SSA) support",
          "Shareholders' Agreement (SHA) negotiations",
          "SPA documentation for the secondary transaction",
          "Corporate secretarial support",
          "Board meetings and Extraordinary General Meetings",
          "Regulatory and statutory filings",
          "Data room preparation and coordination",
          "Legal, financial, commercial and corporate DD",
        ],
      },
      challenges: [
        "Managing negotiations across multiple investor groups simultaneously",
        "Coordinating legal, financial, commercial, and corporate due diligence processes",
        "Supporting founders through extensive documentation and information requests",
        "Addressing transaction-specific requirements from the secondary component",
        "Balancing investor protections with founder interests during documentation negotiations",
      ],
      outcome: [
        <>The transaction was successfully completed, resulting in the company securing <strong>over US$15 million</strong> in Series B funding while simultaneously facilitating a significant secondary transaction between existing shareholders.</>,
        "The founders were able to focus on running the business while our team coordinated the legal, compliance, diligence, governance, and transaction workstreams through to completion.",
      ],
      services: [
        "Fundraising Advisory", "Transaction Advisory",
        "Founder Representation", "Corporate Secretarial",
        "Legal Due Diligence", "Financial DD Coordination",
        "Commercial DD Support", "Governance & Compliance",
      ],
      timeline: {
        title: "Two transaction tracks, managed simultaneously",
        subtitle: "The primary institutional raise and secondary shareholder transaction ran in parallel, not in sequence.",
        phases: ["KICKOFF", "TERM SHEET", "SSA / SHA", "DUE DILIGENCE", "NEGOTIATIONS", "CLOSING"],
        rows: [
          {
            flagCode: null, label: "PRIMARY", sublabel: "INSTITUTIONAL\nINVESTMENT",
            steps: ["Scoping", "Review &\nnegotiate", "Documentation", "All workstreams", "Governance\nterms", "Completion"],
            boldIndex: -1,
          },
          {
            flagCode: null, label: "SECONDARY", sublabel: "EXISTING\nSHAREHOLDERS",
            phases: ["KICKOFF", "STRUCTURE", "DOCUMENTATION", "DUE DILIGENCE", "NEGOTIATIONS", "CLOSING"],
            steps: ["Scoping", "SPA\nframework", "SPA drafting", "Coordination", "Terms &\nsign-off", "Completion"],
            boldIndex: -1,
          },
        ],
      },
    },
  },
]

function SectionLabel({ text, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.75rem" }}>
      <div style={{ width: 2, height: 13, backgroundColor: accent, flexShrink: 0 }} />
      <span style={{ fontFamily: font.sans, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent }}>
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

function TimelineRow({ row, ri, sweepIdx, colorIdx, totalRows }) {
  const rowRef = useRef(null)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    if (!rowRef.current) return
    const t = setTimeout(() => {
      if (!rowRef.current) return
      const rowLeft = rowRef.current.getBoundingClientRect().left
      const cells   = rowRef.current.querySelectorAll("[data-dot-cell]")
      setPositions(Array.from(cells).map(cell => {
        const r = cell.getBoundingClientRect()
        return r.left - rowLeft + r.width / 2
      }))
    }, 350)
    return () => clearTimeout(t)
  }, [])

  const isMoving    = sweepIdx >= 0 && positions.length > 0
  const movingLeft  = positions[Math.min(Math.max(0, sweepIdx), positions.length - 1)] ?? 0
  const atLast      = sweepIdx >= positions.length - 1

  return (
    <div
      ref={rowRef}
      style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", marginBottom: ri < totalRows - 1 ? "0.7rem" : 0, position: "relative" }}
    >
      {/* Travelling red dot */}
      {isMoving && positions.length > 0 && (
        <motion.div
          initial={false}
          animate={{ x: movingLeft - 9, opacity: atLast ? 0 : 1 }}
          transition={{
            x: { type: "tween", duration: 0.82, ease: [0.42, 0, 0.18, 1] },
            opacity: { delay: 0.38, duration: 0.42 },
          }}
          style={{
            position: "absolute", top: -3, left: 0,
            width: 18, height: 18, borderRadius: "50%",
            backgroundColor: C.red,
            boxShadow: "0 0 12px 4px rgba(140,26,43,0.5)",
            zIndex: 10, pointerEvents: "none",
          }}
        />
      )}

      {/* Flag + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingRight: "0.5rem" }}>
        {row.flagCode === "ae" && (
          <svg width="24" height="16" viewBox="0 0 24 16" style={{ flexShrink: 0, display: "block" }}>
            <rect width="6" height="16" fill="#00732F"/>
            <rect x="6" width="18" height="5.33" fill="#00732F"/>
            <rect x="6" y="5.33" width="18" height="5.34" fill="#fff"/>
            <rect x="6" y="10.67" width="18" height="5.33" fill="#000"/>
            <rect width="6" height="16" fill="#FF0000"/>
          </svg>
        )}
        {row.flagCode === "sg" && (
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

      {/* Step dots */}
      {row.steps.map((step, si) => {
        const isLast  = si === row.steps.length - 1
        const isBold  = row.boldIndex === si
        const swept    = colorIdx > si
        const dotColor = isLast ? C.red : swept ? C.ink : C.red
        return (
          <div
            key={si}
            data-dot-cell
            style={{ textAlign: "center", position: "relative" }}
          >
            {si < row.steps.length - 1 && (
              <div style={{ position: "absolute", top: 6, left: "50%", width: "100%", height: 1, backgroundColor: "rgba(12,26,39,0.15)", zIndex: 0 }} />
            )}
            <div style={{ width: isLast ? 18 : 12, height: isLast ? 18 : 12, margin: "0 auto 0.4rem", position: "relative" }}>
              {isLast && (
                <motion.div
                  animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", repeatDelay: 0.4 }}
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: C.red }}
                />
              )}
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                backgroundColor: dotColor,
                position: "relative", zIndex: 1,
                transition: "background-color 0.5s ease",
                boxShadow: isLast ? `0 0 0 3px rgba(140,26,43,0.15)` : "none",
              }} />
            </div>
            <span style={{
              fontFamily: font.sans, fontSize: "0.76rem",
              fontWeight: isBold ? 700 : isLast ? 600 : 400,
              color: isLast ? C.red : C.ink,
              lineHeight: 1.3, whiteSpace: "pre-line", display: "block",
            }}>{step}</span>
          </div>
        )
      })}
    </div>
  )
}

function EngagementModal({ eng, onClose, heroImg }) {
  const { detail, title, service } = eng
  const accent = SERVICE_COLOR[service]
  const [sweepIdx, setSweepIdx] = useState(-1)
  const [colorIdx, setColorIdx] = useState(-1)
  const [activeSection, setActiveSection] = useState("overview")
  const scrollRef = useRef(null)
  const sectionRefs = useRef({})

  const SECTIONS = [
    { id: "overview",  label: "Overview"      },
    { id: "challenge", label: "Challenge"     },
    { id: "solution",  label: "Solution"      },
    { id: "scope",     label: "Scope of Work" },
    { id: "results",   label: "Results"       },
  ]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    if (!detail.timeline) return
    const total = detail.timeline.phases.length
    const cycleDuration = 1500 + (total - 1) * 1100 + 650 + 2000

    const runCycle = () => {
      setSweepIdx(-1); setColorIdx(-1)
      const timers = []
      for (let i = 0; i < total; i++) {
        const ci = i
        const base = 1500 + i * 1100
        timers.push(setTimeout(() => setSweepIdx(ci), base))
        timers.push(setTimeout(() => setColorIdx(ci), base + 650))
      }
      return timers
    }

    let currentTimers = runCycle()
    const interval = setInterval(() => {
      currentTimers.forEach(clearTimeout)
      currentTimers = runCycle()
    }, cycleDuration)

    return () => { currentTimers.forEach(clearTimeout); clearInterval(interval) }
  }, [detail])

  const isProgrammaticScroll = useRef(false)

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id]
    const container = scrollRef.current
    if (!el || !container) return
    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const top = container.scrollTop + elRect.top - containerRect.top - 56
    isProgrammaticScroll.current = true
    setActiveSection(id)
    container.scrollTo({ top, behavior: "smooth" })
    setTimeout(() => { isProgrammaticScroll.current = false }, 900)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return
      const containerRect = container.getBoundingClientRect()
      for (const sec of [...SECTIONS].reverse()) {
        const el = sectionRefs.current[sec.id]
        if (el) {
          const elTop = el.getBoundingClientRect().top - containerRect.top
          if (elTop <= 80) { setActiveSection(sec.id); break }
        }
      }
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(4,10,18,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2vh 2vw",
      }}
    >
      <style>{`
        .svc-box {
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
          cursor: default;
        }
        .svc-box:hover {
          background-color: rgba(255,255,255,0.18) !important;
          border-color: rgba(255,255,255,0.55) !important;
          transform: translateY(-2px);
        }
        @keyframes kpi-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .kpi-wrap {
          position: relative;
          padding: 1.5px;
          border-radius: 16px;
          overflow: hidden;
          min-width: 110px;
        }
        .kpi-wrap::before {
          content: '';
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 40%,
            rgba(220,60,50,0.6) 46%,
            rgba(220,60,50,0.95) 50%,
            rgba(220,60,50,0.6) 54%,
            transparent 60%,
            transparent 100%
          );
          animation: kpi-spin 2.8s linear infinite;
        }
        .kpi-inner {
          position: relative;
          z-index: 1;
          background: rgba(8,18,36,0.92);
          border-radius: 15px;
          padding: 1rem 1.25rem;
          text-align: center;
          height: 100%;
          box-sizing: border-box;
        }
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
          width: "100%", maxWidth: 1400,
          height: "90vh",
          display: "flex", flexDirection: "column",
          backgroundColor: "#fff",
          borderRadius: 24,
          boxShadow: "0 0 0 1px rgba(12,26,39,0.06), 0 24px 64px rgba(12,26,39,0.28)",
          overflow: "hidden",
        }}
      >
        {/* ── BREADCRUMB BAR (fixed, outside scroll) ── */}
        <div style={{
          flexShrink: 0,
          padding: "0.85rem 2rem",
          borderBottom: "1px solid rgba(12,26,39,0.08)",
          backgroundColor: "#F8F7F5",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(12,26,39,0.32)" }}>
            Case Study / {service}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid rgba(12,26,39,0.18)",
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(12,26,39,0.45)", fontSize: "0.85rem",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(12,26,39,0.16)"; e.currentTarget.style.color = "rgba(12,26,39,0.4)" }}
          >✕</button>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>

          {/* ── HERO — blurry background image ── */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            {heroImg && (
              <img
                src={heroImg}
                alt=""
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "blur(14px)",
                  transform: "scale(1.1)",
                  pointerEvents: "none",
                }}
              />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(6,14,28,0.72) 0%, rgba(10,20,40,0.82) 100%)" }} />

            <div style={{ position: "relative", zIndex: 1, padding: "3rem 3rem 2.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent }}>
                  {eng.from}
                </span>
                <span style={{ fontFamily: font.sans, fontSize: "0.52rem", color: accent, margin: "0 0.4rem" }}>→</span>
                <span style={{ fontFamily: font.sans, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: accent }}>
                  {eng.to}
                </span>
              </div>

              <div>
                <h2 style={{
                  fontFamily: font.sans,
                  fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)",
                  fontWeight: 800, color: "#fff",
                  lineHeight: 1.15, marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}>
                  {detail.heroTitle || title}
                </h2>
                {detail.heroDesc && (
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 1.75rem", maxWidth: 680 }}>
                    {detail.heroDesc}
                  </p>
                )}
                {!detail.heroDesc && detail.subtitle && (
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 1.75rem", maxWidth: 680 }}>
                    {detail.subtitle}
                  </p>
                )}

                {/* KPI stats — below paragraph */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                  {detail.stats.map((s, i) => (
                    <div key={i} className="kpi-wrap" style={{ minWidth: 160 }}>
                      <motion.div
                        className="kpi-inner"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 + i * 0.1, duration: 0.4 }}
                        style={{ padding: "1.4rem 1.75rem" }}
                      >
                        <div style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 2.8vw, 2.8rem)", fontWeight: 300, color: "#fff", lineHeight: 1 }}>
                          <CountUpStat val={s.val} delay={0.28 + i * 0.1} />
                        </div>
                        <div style={{ fontFamily: font.sans, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "0.5rem", whiteSpace: "pre-line", lineHeight: 1.5 }}>
                          {s.label}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── STICKY SECTION NAV ── */}
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            backgroundColor: C.ink,
            display: "flex", alignItems: "center",
            padding: "0 2rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            {SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                style={{
                  background:    activeSection === sec.id ? "rgba(255,255,255,0.08)" : "none",
                  border:        "none",
                  cursor:        "pointer",
                  fontFamily:    font.sans,
                  fontSize:      "0.9rem",
                  fontWeight:    activeSection === sec.id ? 700 : 500,
                  color:         activeSection === sec.id ? "#fff" : "rgba(255,255,255,0.45)",
                  padding:       "1.1rem 1.5rem",
                  borderBottom:  activeSection === sec.id ? `2px solid ${C.red}` : "2px solid transparent",
                  borderRadius:  activeSection === sec.id ? "6px 6px 0 0" : "0",
                  transition:    "color 0.2s, border-color 0.2s, background 0.2s",
                  whiteSpace:    "nowrap",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { if (activeSection !== sec.id) { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)" } }}
                onMouseLeave={e => { if (activeSection !== sec.id) { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "none" } }}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* 01 OVERVIEW */}
          <div
            ref={el => sectionRefs.current["overview"] = el}
            style={{ padding: "4rem 3rem 3.5rem", borderBottom: "1px solid rgba(12,26,39,0.07)" }}
          >
            <SectionLabel text="01  Overview" accent={accent} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              <div>
                <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.68)", lineHeight: 1.85, margin: 0 }}>
                  {detail.clientSnapshot}
                </p>
              </div>
              <div>
                {detail.situation.map((p, i) => (
                  <p key={i} style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.68)", lineHeight: 1.85, marginBottom: i < detail.situation.length - 1 ? "1rem" : 0, marginTop: 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* 02 CHALLENGE */}
          <div
            ref={el => sectionRefs.current["challenge"] = el}
            style={{ padding: "4rem 3rem 3.5rem", borderBottom: "1px solid rgba(12,26,39,0.07)", backgroundColor: "#FAFAF8" }}
          >
            <SectionLabel text="02  Challenge" accent={accent} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 700 }}>
              {detail.challenges.map((ch, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: C.red, fontSize: "0.55rem", flexShrink: 0, marginTop: "0.32rem" }}>■</span>
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.68)", lineHeight: 1.8, margin: 0 }}>{ch}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 03 SOLUTION */}
          <div
            ref={el => sectionRefs.current["solution"] = el}
            style={{ padding: "4rem 3rem 3.5rem", borderBottom: "1px solid rgba(12,26,39,0.07)" }}
          >
            <SectionLabel text="03  Solution" accent={accent} />
            <div style={{ maxWidth: 720 }}>
              {detail.approach.body.map((p, i) => (
                <div key={i} style={{ marginBottom: i < detail.approach.body.length - 1 ? "1.25rem" : 0 }}>
                  {detail.approach.subheadings?.[i] && (
                    <p style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink, marginBottom: "0.4rem", marginTop: 0 }}>
                      {detail.approach.subheadings[i]}
                    </p>
                  )}
                  <p style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.68)", lineHeight: 1.85, margin: 0 }}>
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 04 SCOPE OF WORK */}
          <div
            ref={el => sectionRefs.current["scope"] = el}
            style={{ padding: "4rem 3rem 3.5rem", borderBottom: "1px solid rgba(12,26,39,0.07)", backgroundColor: "#FAFAF8" }}
          >
            <SectionLabel text="04  Scope of Work" accent={accent} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 3rem", maxWidth: 800 }}>
              {detail.approach.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
                  <span style={{ color: C.red, fontSize: "0.55rem", flexShrink: 0, marginTop: "0.3rem" }}>■</span>
                  <span style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.68)", lineHeight: 1.8 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── TIMELINE ── */}
          {detail.timeline && (() => {
            const hasPerRowPhases = detail.timeline.rows.some(r => r.phases)
            if (hasPerRowPhases) {
              // Per-track rendering: each row gets its own phase header + background
              return (
                <div style={{ borderBottom: "1px solid rgba(12,26,39,0.08)" }}>
                  {/* Title */}
                  <div style={{ padding: "2rem 3rem 1.25rem", backgroundColor: "#F0EFEB" }}>
                    <span style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>
                      {detail.timeline.title}
                    </span>
                    <span style={{ fontFamily: font.sans, fontSize: "0.82rem", color: "rgba(12,26,39,0.4)", marginLeft: "0.75rem" }}>
                      {detail.timeline.subtitle}
                    </span>
                  </div>
                  {detail.timeline.rows.map((row, ri) => {
                    const rowPhases = row.phases || detail.timeline.phases
                    const isDark = ri % 2 === 1
                    const bg = isDark ? "#1B2A3B" : "#F0EFEB"
                    const phaseColor = (i) => i === rowPhases.length - 1 ? C.red : (isDark ? "rgba(255,255,255,0.3)" : "rgba(12,26,39,0.35)")
                    const labelColor = isDark ? "#fff" : C.ink
                    const sublabelColor = isDark ? "rgba(255,255,255,0.38)" : "rgba(12,26,39,0.4)"
                    return (
                      <div key={ri} style={{ padding: "1.5rem 3rem 2rem", backgroundColor: bg, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                        <div style={{ overflowX: "auto" }}>
                          <div style={{ minWidth: 600 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", marginBottom: "0.4rem" }}>
                              <div>
                                <div style={{ fontFamily: font.sans, fontSize: "0.78rem", fontWeight: 700, color: labelColor, letterSpacing: "0.03em" }}>{row.label}</div>
                                <div style={{ fontFamily: font.sans, fontSize: "0.64rem", color: sublabelColor, whiteSpace: "pre-line", lineHeight: 1.15, marginTop: "0.15rem" }}>{row.sublabel}</div>
                              </div>
                              {rowPhases.map((phase, i) => (
                                <div key={i} style={{
                                  fontFamily: font.sans, fontSize: "0.64rem", fontWeight: 700,
                                  letterSpacing: "0.12em", textTransform: "uppercase",
                                  color: phaseColor(i),
                                  textAlign: "center", paddingBottom: "0.3rem",
                                }}>{phase}</div>
                              ))}
                            </div>
                            <TimelineRow row={{ ...row, label: "", sublabel: "" }} ri={0} sweepIdx={sweepIdx} colorIdx={colorIdx} totalRows={1} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
            // Shared-header rendering (existing engagements with flags)
            return (
              <div style={{ padding: "2.5rem 3rem", borderBottom: "1px solid rgba(12,26,39,0.08)", backgroundColor: "#F0EFEB" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.7rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 700, color: C.ink }}>{detail.timeline.title}</span>
                  <span style={{ fontFamily: font.sans, fontSize: "0.82rem", color: "rgba(12,26,39,0.4)" }}>{detail.timeline.subtitle}</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <div style={{ minWidth: 600 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", marginBottom: "0.15rem" }}>
                      <div />
                      {detail.timeline.phases.map((phase, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                          style={{ fontFamily: font.sans, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: i === detail.timeline.phases.length - 1 ? C.red : "rgba(12,26,39,0.35)", textAlign: "center", paddingBottom: "0.35rem" }}
                        >{phase}</motion.div>
                      ))}
                    </div>
                    {detail.timeline.rows.map((row, ri) => (
                      <TimelineRow key={ri} row={row} ri={ri} sweepIdx={sweepIdx} colorIdx={colorIdx} totalRows={detail.timeline.rows.length} />
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── 05 RESULTS + SERVICES ── */}
          <div
            ref={el => sectionRefs.current["results"] = el}
            className="cs-footer"
            style={{ backgroundColor: "#ffffff", padding: "3rem", borderTop: "1px solid rgba(12,26,39,0.08)" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.8rem", fontWeight: 700, color: C.red }}>05</span>
                <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: C.ink }}>Results</span>
              </div>
              {detail.outcome.map((p, i) => (
                <p key={i} style={{ fontFamily: font.sans, fontSize: "1rem", color: "rgba(12,26,39,0.7)", lineHeight: 1.75, marginBottom: i < detail.outcome.length - 1 ? "0.85rem" : 0, marginTop: 0 }}>
                  {p}
                </p>
              ))}
            </div>

            <div>
              <div style={{ marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: font.sans, fontSize: "0.85rem", fontWeight: 800, color: C.ink }}>
                  Services Delivered
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
                {detail.services.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0.85, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.04, backgroundColor: "#8C1A2B" }}
                    style={{
                      fontFamily:      font.sans,
                      fontSize:        "0.75rem",
                      fontWeight:      600,
                      color:           "#ffffff",
                      backgroundColor: C.red,
                      padding:         "0.75rem 0.75rem",
                      textAlign:       "center",
                      lineHeight:      1.35,
                      borderRadius:    10,
                      cursor:          "default",
                      boxShadow:       "0 4px 12px rgba(184,50,40,0.3)",
                    }}
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* end scrollable */}
      </motion.div>
    </motion.div>
  )
}

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80", // Dubai skyline daytime, light blue sky — AdTech UAE/Singapore
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Bright financial data on screen — Series A fundraising
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", // Bright modern tech workspace — Manufacturing UAE
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", // Person on laptop, light desk — D2C Delaware flip
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", // Bright open office team — Global SaaS 5 jurisdictions
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", // Business document signing, bright — PE M&A exit
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", // EdTech language learning
]

function EngagementCard({ eng, index, onLearnMore }) {
  const [hovered, setHovered] = useState(false)
  const accent  = SERVICE_COLOR[eng.service]
  const img     = CARD_IMAGES[index % CARD_IMAGES.length]
  const subText = eng.detail.heroTitle || eng.detail.subtitle || eng.title

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", height: "clamp(400px, 34vw, 540px)", cursor: "pointer", borderRadius: 6, boxShadow: "0 2px 20px rgba(12,26,39,0.1)" }}
    >
      {/* ── Background image layer — blurs on hover ── */}
      <motion.div
        animate={{ filter: hovered ? "blur(6px) brightness(0.3)" : "blur(0px) brightness(0.85)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img
          src={img}
          alt={eng.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)" }} />
      </motion.div>

      {/* ── DEFAULT state — journey tags + frosted subcard ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", pointerEvents: hovered ? "none" : "auto" }}
      >
        {/* Journey tags — top left */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>
            {eng.from}
          </span>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>→</span>
          <span style={{ fontFamily: font.sans, fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>
            {eng.to}
          </span>
        </div>

        {/* Frosted glass subcard — bottom */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 10,
          padding: "1.1rem 1.35rem",
        }}>
          <p style={{ fontFamily: font.sans, fontSize: "0.9rem", fontWeight: 500, color: C.ink, lineHeight: 1.55, margin: 0 }}>
            {subText}
          </p>
        </div>
      </motion.div>

      {/* ── HOVER state — content panel ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "2rem", pointerEvents: hovered ? "auto" : "none" }}
      >
        {/* Service label */}
        <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: accent, marginBottom: "0.75rem" }}>
          {eng.service}
        </p>

        {/* Title */}
        <h3 style={{ fontFamily: font.sans, fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: "1.25rem" }}>
          {eng.title}
        </h3>

        {/* Bullet items */}
        <ul style={{ listStyle: "none", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
          {eng.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontFamily: font.sans, fontSize: "0.8rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
              <span style={{ color: accent, flexShrink: 0, marginTop: "0.28rem", fontSize: "0.42rem" }}>◆</span>
              {item}
            </li>
          ))}
        </ul>

        {/* Pill CTA button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLearnMore() }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          style={{
            backgroundColor: accent,
            color: "#fff",
            border: "none",
            padding: "0.9rem 1.75rem",
            fontFamily: font.sans,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "transform 0.2s ease",
            alignSelf: "stretch",
          }}
        >
          LEARN MORE →
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function EngagementsSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="engagements" style={{ backgroundColor: C.bg, padding: "clamp(4rem, 5vw, 8rem) 7vw" }}>
      <style>{`
        .eng-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
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
          <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 800, color: C.ink, lineHeight: 1.12, marginBottom: "1.1rem" }}>
            Work that speaks{" "}
            <em style={{ fontStyle: "normal", color: C.red }}>for itself.</em>
          </h2>
          <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(12,26,39,0.5)", lineHeight: 1.8 }}>
            A selection of recent mandates across our three practice areas.
            Client names withheld where confidentiality applies.
          </p>
        </motion.div>

        <div className="eng-grid">
          {ENGAGEMENTS.map((eng, i) => (
            <EngagementCard
              key={i}
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
            heroImg={CARD_IMAGES[activeIndex % CARD_IMAGES.length]}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
