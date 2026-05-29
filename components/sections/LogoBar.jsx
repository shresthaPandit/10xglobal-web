"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const CLIENTS = [
  "MobiKwik", "CleverTap", "Golden Goose", "ElectricPe",
  "FYNXT", "Beverly Hills Polo Club", "DhiWise", "Top Line Marketing",
]

export default function LogoBar() {
  const doubled = [...CLIENTS, ...CLIENTS]

  return (
    <div style={{
      borderTop:       `1px solid rgba(193,127,62,0.25)`,
      borderBottom:    `1px solid rgba(193,127,62,0.25)`,
      overflow:        "hidden",
      backgroundColor: C.bg,
      position:        "relative",
    }}>
      {/* Golden gradient top line */}
      <div style={{
        position:   "absolute",
        top:        0,
        left:       0,
        right:      0,
        height:     1,
        background: "linear-gradient(to right, transparent, rgba(193,127,62,0.5) 30%, rgba(193,127,62,0.5) 70%, transparent)",
      }} />

      {/* Left label + edge fade */}
      <div style={{
        position:   "absolute",
        left:       0,
        top:        0,
        bottom:     0,
        display:    "flex",
        alignItems: "center",
        paddingLeft: "5vw",
        zIndex:     3,
        background: `linear-gradient(to right, ${C.bg} 60%, transparent 100%)`,
        minWidth:   160,
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily:    font.sans,
          fontSize:      "0.6rem",
          fontWeight:    700,
          letterSpacing: "0.18em",
          color:         C.copper,
          whiteSpace:    "nowrap",
        }}>
          TRUSTED BY
        </span>
      </div>

      {/* Right edge fade */}
      <div style={{
        position:      "absolute",
        right:         0,
        top:           0,
        bottom:        0,
        width:         120,
        background:    `linear-gradient(to left, ${C.bg}, transparent)`,
        zIndex:        3,
        pointerEvents: "none",
      }} />

      {/* Scrolling ticker */}
      <div style={{ overflow: "hidden", paddingLeft: 160 }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", width: "max-content", padding: "1.1rem 0" }}
        >
          {doubled.map((name, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span style={{
                fontFamily:    font.sans,
                color:         C.ink,
                fontSize:      "0.9rem",
                fontWeight:    500,
                letterSpacing: "-0.01em",
                padding:       "0 2.25rem",
                whiteSpace:    "nowrap",
              }}>
                {name}
              </span>
              <span style={{
                width:           5,
                height:          5,
                borderRadius:    "50%",
                backgroundColor: C.copper,
                opacity:         0.55,
                flexShrink:      0,
              }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
