"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { font } from "@/lib/theme"

const RED   = "#8C1A2B"
const INK   = "#1C1712"
const MUTED = "#6B6560"

const INPUT = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: "0.88rem",
  color: INK,
  backgroundColor: "#FAFAFA",
  border: "1px solid rgba(28,23,18,0.14)",
  padding: "0.72rem 0.9rem",
  outline: "none",
  boxSizing: "border-box",
  borderRadius: 0,
  appearance: "none",
}

const LABEL = {
  fontFamily: font.sans,
  fontSize: "0.58rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: MUTED,
  display: "block",
  marginBottom: "0.3rem",
}

export default function ContactModal({ isOpen, onClose }) {
  const [view, setView]     = useState("choose")   // "choose" | "form"
  const [form, setForm]     = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", query: "" })
  const [status, setStatus] = useState("idle")     // idle | sending | done | error

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@10x.global", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Enquiry from ${form.firstName} ${form.lastName}${form.company ? ` — ${form.company}` : ""}`,
          name:    `${form.firstName} ${form.lastName}`,
          email:   form.email,
          phone:   form.phone || "—",
          company: form.company || "—",
          message: form.query || "—",
        }),
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setView("choose"); setStatus("idle"); setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", query: "" }) }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(28,23,18,0.6)", zIndex: 9998, backdropFilter: "blur(4px)" }}
          />

          {/* Modal — truly centered */}
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                width: "min(480px, 100%)",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 40px 100px rgba(28,23,18,0.22)",
                position: "relative",
              }}
            >
              {/* Header */}
              <div style={{ padding: "1.75rem 2rem 1.4rem", borderBottom: "1px solid rgba(28,23,18,0.08)" }}>
                <button onClick={handleClose} style={{ position: "absolute", top: "1.1rem", right: "1.2rem", background: "none", border: "none", cursor: "pointer", fontSize: "1.35rem", color: "rgba(28,23,18,0.3)", lineHeight: 1 }}>×</button>
                {view === "form" && (
                  <button onClick={() => { setView("choose"); setStatus("idle") }}
                    style={{ position: "absolute", top: "1.2rem", left: "1.5rem", background: "none", border: "none", cursor: "pointer", fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", color: MUTED, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    ← Back
                  </button>
                )}
                <p style={{ fontFamily: font.sans, fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: RED, marginBottom: "0.4rem", textAlign: "center" }}>
                  Get in Touch
                </p>
                <h3 style={{ fontFamily: font.serif, fontSize: "1.65rem", fontWeight: 300, color: INK, lineHeight: 1.2, textAlign: "center" }}>
                  Start the conversation.
                </h3>
              </div>

              <div style={{ padding: "1.75rem 2rem 2rem" }}>

                {/* ── CHOOSE VIEW ── */}
                {view === "choose" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {/* Enquiry form option */}
                    <button
                      onClick={() => setView("form")}
                      style={{
                        display: "flex", alignItems: "center", gap: "1.2rem",
                        padding: "1.25rem 1.5rem",
                        backgroundColor: INK, color: "#fff",
                        border: "none", cursor: "pointer", textAlign: "left", width: "100%",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2a2520"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = INK}
                    >
                      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" style={{ flexShrink: 0 }}>
                        <rect x="1" y="1" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M1 4l10 7 10-7" stroke="currentColor" strokeWidth="1.4"/>
                      </svg>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.2rem" }}>Enquiry Form</p>
                        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 500, color: "#fff" }}>Send us a message</p>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem" }}>→</span>
                    </button>

                    {/* WhatsApp option */}
                    <a
                      href="https://wa.me/918800565608"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: "1.2rem",
                        padding: "1.25rem 1.5rem",
                        backgroundColor: "#25D366", color: "#fff",
                        textDecoration: "none", transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.86L.072 23.5l5.788-1.438A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.943 0-3.757-.537-5.309-1.471l-.381-.224-3.433.854.882-3.339-.247-.398A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: font.sans, fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.2rem" }}>WhatsApp</p>
                        <p style={{ fontFamily: font.sans, fontSize: "0.95rem", fontWeight: 500 }}>+91 88005 65608</p>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem" }}>→</span>
                    </a>
                  </div>
                )}

                {/* ── FORM VIEW ── */}
                {view === "form" && (
                  <div>{status === "done" ? (
                    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(140,26,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l5 5 8-8" stroke={RED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p style={{ fontFamily: font.serif, fontSize: "1.3rem", color: INK, marginBottom: "0.5rem" }}>Enquiry sent.</p>
                      <p style={{ fontFamily: font.sans, fontSize: "0.83rem", color: MUTED, lineHeight: 1.6 }}>
                        We'll get back to you at <strong>{form.email}</strong> shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                        <div>
                          <label style={LABEL}>First Name <span style={{ color: RED }}>*</span></label>
                          <input name="firstName" required value={form.firstName} onChange={handleChange} style={INPUT} />
                        </div>
                        <div>
                          <label style={LABEL}>Last Name <span style={{ color: RED }}>*</span></label>
                          <input name="lastName" required value={form.lastName} onChange={handleChange} style={INPUT} />
                        </div>
                      </div>

                      <div style={{ marginBottom: "0.6rem" }}>
                        <label style={LABEL}>Email <span style={{ color: RED }}>*</span></label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange} style={INPUT} />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                        <div>
                          <label style={LABEL}>Phone</label>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={INPUT} placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label style={LABEL}>Company</label>
                          <input name="company" value={form.company} onChange={handleChange} style={INPUT} placeholder="Acme Technologies" />
                        </div>
                      </div>

                      <div style={{ marginBottom: "1.1rem" }}>
                        <label style={LABEL}>Your Query</label>
                        <textarea name="query" value={form.query} onChange={handleChange} rows={3}
                          style={{ ...INPUT, resize: "vertical", minHeight: 80 }}
                          placeholder="e.g. We're looking to set up an entity in the UAE and need help with structuring..." />
                      </div>

                      {status === "error" && (
                        <p style={{ fontFamily: font.sans, fontSize: "0.78rem", color: RED, marginBottom: "0.75rem" }}>
                          Something went wrong. Please email us directly at info@10x.global
                        </p>
                      )}

                      <button type="submit" disabled={status === "sending"}
                        style={{
                          width: "100%",
                          backgroundColor: status === "sending" ? "rgba(140,26,43,0.55)" : RED,
                          color: "#fff", padding: "0.95rem", border: "none",
                          cursor: status === "sending" ? "default" : "pointer",
                          fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700,
                          letterSpacing: "0.16em", textTransform: "uppercase",
                          transition: "background-color 0.2s",
                        }}
                      >
                        {status === "sending" ? "Sending…" : "Send Enquiry →"}
                      </button>
                    </form>
                  )}</div>
                )}

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
