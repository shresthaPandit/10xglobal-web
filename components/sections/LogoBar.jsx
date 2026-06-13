"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const LOGOS = [
  { src: "/clients/Mobikwik.png",                       alt: "Mobikwik",   h: 90 },
  { src: "/clients/FYNXT.png",                          alt: "FYNXT"                 },
  { src: "/clients/ElectricPe-removebg-preview.png",    alt: "ElectricPe"  , h: 40            },
  { src: "/clients/BHPC-removebg-preview.png",          alt: "Beverly Hills Polo Club", h: 90 },
  { src: "/clients/CleverTap-removebg-preview.png",     alt: "CleverTap"             },
  { src: "/clients/General_Electric-removebg-preview.png", alt: "General Electric"   },
  { src: "/clients/Golden_Goose-removebg-preview.png",  alt: "Golden Goose"          },
  { src: "/clients/MRSOOL-removebg-preview.png",        alt: "MRSOOL"                },
  { src: "/clients/SAEL-removebg-preview.png",          alt: "SAEL"     ,h:110             },
  { src: "/clients/TravClan-removebg-preview.png",      alt: "TravClan"  ,h:110              },
  { src: "/clients/UHG-removebg-preview.png",           alt: "UHG"                   },

  { src: "/clients/freo_-_Copy-removebg-preview.png",            alt: "Freo",      h: 120 },
  { src: "/clients/Mobscene-removebg-preview.png",               alt: "Mobscene",  h: 150 },
  { src: "/clients/SaasBoomi-removebg-preview.png",              alt: "SaasBoomi", h: 200 },
  { src: "/clients/sepakx-removebg-preview.png",                 alt: "SepakX", h: 50      },
]

const doubled = [...LOGOS, ...LOGOS, ...LOGOS]

export default function LogoBar() {
  return (
    <section style={{ backgroundColor: C.bg, padding: "5rem 0 2.5rem", overflow: "hidden" }}>

      {/* Label */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "1.5rem",
        marginBottom:   "2.5rem",
        padding:        "0 5vw",
      }}>
        <div style={{ flex: 1, maxWidth: 72, height: 1, backgroundColor: "rgba(154,123,60,0.3)" }} />
        <p style={{
          fontFamily:    font.serif,
          fontSize:      "1.1rem",
          fontWeight:    700,
          color:         C.ink,
          letterSpacing: "-0.01em",
          whiteSpace:    "nowrap",
          margin:        0,
        }}>
          Trusted by ambitious companies worldwide
        </p>
        <div style={{ flex: 1, maxWidth: 72, height: 1, backgroundColor: "rgba(154,123,60,0.3)" }} />
      </div>

      {/* Scrolling ticker */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position:      "absolute",
          left:          0, top: 0, bottom: 0,
          width:         120,
          background:    `linear-gradient(to right, ${C.bg}, transparent)`,
          zIndex:        2,
          pointerEvents: "none",
        }} />
        <div style={{
          position:      "absolute",
          right:         0, top: 0, bottom: 0,
          width:         120,
          background:    `linear-gradient(to left, ${C.bg}, transparent)`,
          zIndex:        2,
          pointerEvents: "none",
        }} />

        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", alignItems: "center", width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                display:    "flex",
                alignItems: "center",
                flexShrink: 0,
                padding:    "0 2.5rem",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={logo.h ?? 60}
                style={{
                  objectFit:      "contain",
                  objectPosition: "center",
                  maxHeight:      logo.h ?? 60,
                  width:          "auto",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
