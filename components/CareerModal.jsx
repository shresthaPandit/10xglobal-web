"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { font } from "@/lib/theme"

const RED    = "#E8394A"
const WHITE  = "#ffffff"
const DIM    = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.15)"

const AREA_OPTIONS = [
  "Tax & Compliance",
  "Legal",
  "Finance & Virtual CFO",
  "Transaction Advisory",
  "Market Entry & Expansion",
  "Operations",
  "Other",
]

const EXP_OPTIONS = [
  "0–1 years", "1–3 years", "3–5 years", "5–10 years", "10+ years",
]

function Field({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <label style={{
        fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.88)",
      }}>
        {label}{required && <span style={{ color: RED, marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputBase = {
  width: "100%",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  fontWeight: 400,
  color: WHITE,
  backgroundColor: "transparent",
  border: "none",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: BORDER,
  borderRadius: 0,
  padding: "0.6rem 0",
  outline: "none",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  transition: "border-color 0.2s",
}

export default function CareerModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    qualification: "", area: "",
    experience: "", linkedin: "",
  })
  const [resume, setResume] = useState(null)
  const [status, setStatus] = useState("idle")
  const [focused, setFocused] = useState(null)
  const fileRef = useRef(null)

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const focusStyle = name => focused === name ? { borderBottomColor: RED } : {}

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus("sending")
    try {
      const fd = new FormData()
      fd.append("_subject", `Career Application — ${form.name} · ${form.area || "General"}`)
      fd.append("_template", "table")
      fd.append("Full Name",              form.name)
      fd.append("Email",                  form.email)
      fd.append("Phone",                  form.phone         || "—")
      fd.append("Relevant Qualification", form.qualification || "—")
      fd.append("Area of Interest",       form.area          || "—")
      fd.append("Years of Experience",    form.experience    || "—")
      fd.append("LinkedIn / Portfolio",   form.linkedin      || "—")
      if (resume) fd.append("resume", resume, resume.name)
      const res = await fetch("https://formsubmit.co/ajax/hr@10x.global", {
        method: "POST", headers: { Accept: "application/json" }, body: fd,
      })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", qualification: "", area: "", experience: "", linkedin: "" })
      setResume(null); setStatus("idle"); setFocused(null)
    }, 350)
  }

  const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.35)' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{`
            .cm-field::placeholder { color: rgba(255,255,255,0.2); }
            .cm-field:focus { border-bottom-color: ${RED} !important; }
            .cm-sel option { background: #0A1628; color: #fff; }
            .cm-scroll::-webkit-scrollbar { width: 3px; }
            .cm-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(3,7,18,0.82)", zIndex: 1000, backdropFilter: "blur(6px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 24px)" }}
            animate={{ opacity: 1, scale: 1,    x: "-50%", y: "-50%" }}
            exit={{   opacity: 0, scale: 0.97,  x: "-50%", y: "calc(-50% + 12px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="cm-scroll"
            style={{
              position: "fixed", top: "50%", left: "50%",
              zIndex: 1001,
              width: "min(560px, 95vw)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "linear-gradient(160deg, #0F1E35 0%, #091528 100%)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: "4rem 2.5rem", textAlign: "center" }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                  style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(232,57,74,0.12)", border: "1px solid rgba(232,57,74,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.4rem", color: RED }}
                >✓</motion.div>
                <p style={{ fontFamily: font.sans, fontSize: "1.1rem", fontWeight: 700, color: WHITE, marginBottom: "0.5rem" }}>Application received.</p>
                <p style={{ fontFamily: font.sans, fontSize: "0.85rem", color: DIM, lineHeight: 1.65 }}>We read every one. Expect a reply within a week.</p>
                <button onClick={handleClose} style={{ marginTop: "2rem", fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: RED, background: "none", border: "none", cursor: "pointer" }}>Close →</button>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div style={{ padding: "2.25rem 2.5rem 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: font.sans, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: RED, marginBottom: "0.65rem" }}>
                        Application
                      </p>
                      <h2 style={{ fontFamily: font.sans, fontSize: "1.75rem", fontWeight: 800, color: WHITE, lineHeight: 1.1, marginBottom: "0.6rem" }}>
                        Tell us about you
                      </h2>
                      <p style={{ fontFamily: font.sans, fontSize: "0.82rem", color: DIM, lineHeight: 1.7, maxWidth: 380 }}>
                        A few details and your resume. We read every application — expect a reply within a week.
                      </p>
                    </div>
                    <button onClick={handleClose} style={{ flexShrink: 0, marginLeft: "1rem", marginTop: "0.2rem", width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                      ✕
                    </button>
                  </div>
                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.07)", margin: "2rem 0 0" }} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ padding: "1.75rem 2.5rem 2.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem 2rem" }}>

                    <Field label="Full Name" required>
                      <input required name="name" value={form.name} onChange={set}
                        placeholder="Jordan Rivera" className="cm-field"
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("name") }} />
                    </Field>

                    <Field label="Email" required>
                      <input required type="email" name="email" value={form.email} onChange={set}
                        placeholder="you@email.com" className="cm-field"
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("email") }} />
                    </Field>

                    <Field label="Phone">
                      <input name="phone" value={form.phone} onChange={set}
                        placeholder="+91 98765 43210" className="cm-field"
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("phone") }} />
                    </Field>

                    <Field label="Relevant Qualification">
                      <input name="qualification" value={form.qualification} onChange={set}
                        placeholder="CA / CS / LLB / Others" className="cm-field"
                        onFocus={() => setFocused("qual")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("qual") }} />
                    </Field>

                    <Field label="Area of Interest" required>
                      <select required name="area" value={form.area} onChange={set}
                        className="cm-field cm-sel"
                        onFocus={() => setFocused("area")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("area"), color: form.area ? WHITE : "rgba(255,255,255,0.2)", backgroundImage: chevron, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.1rem center", paddingRight: "1.4rem", cursor: "pointer" }}>
                        <option value="" disabled>Select...</option>
                        {AREA_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>

                    <Field label="Years of Experience">
                      <select name="experience" value={form.experience} onChange={set}
                        className="cm-field cm-sel"
                        onFocus={() => setFocused("exp")} onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...focusStyle("exp"), color: form.experience ? WHITE : "rgba(255,255,255,0.2)", backgroundImage: chevron, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.1rem center", paddingRight: "1.4rem", cursor: "pointer" }}>
                        <option value="">Select...</option>
                        {EXP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="LinkedIn / Portfolio">
                        <input name="linkedin" value={form.linkedin} onChange={set}
                          placeholder="https://" className="cm-field"
                          onFocus={() => setFocused("li")} onBlur={() => setFocused(null)}
                          style={{ ...inputBase, ...focusStyle("li") }} />
                      </Field>
                    </div>

                    {/* Resume upload */}
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontFamily: font.sans, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.88)", marginBottom: "0.75rem" }}>
                        Resume <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, letterSpacing: 0, textTransform: "none", fontSize: "0.7rem" }}>PDF or Word</span>
                      </p>
                      <div
                        onClick={() => fileRef.current?.click()}
                        style={{ border: `1px dashed ${resume ? "rgba(232,57,74,0.4)" : BORDER}`, borderRadius: 8, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer", transition: "border-color 0.2s, background 0.2s", backgroundColor: resume ? "rgba(232,57,74,0.05)" : "rgba(255,255,255,0.02)" }}
                      >
                        <span style={{ fontFamily: font.sans, fontSize: "0.72rem", fontWeight: 600, color: WHITE, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "0.38rem 0.85rem", borderRadius: 5, whiteSpace: "nowrap", flexShrink: 0 }}>
                          Choose file
                        </span>
                        <span style={{ fontFamily: font.sans, fontSize: "0.82rem", color: resume ? "rgba(255,255,255,0.65)" : DIM, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {resume ? resume.name : "No file selected"}
                        </span>
                        {resume && (
                          <button type="button" onClick={e => { e.stopPropagation(); setResume(null) }}
                            style={{ marginLeft: "auto", flexShrink: 0, background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem" }}>✕</button>
                        )}
                      </div>
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={e => setResume(e.target.files[0] || null)} />
                    </div>

                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)", margin: "2rem 0 1.5rem" }} />

                  {/* Submit */}
                  <button type="submit" disabled={status === "sending"}
                    style={{ width: "100%", backgroundColor: RED, color: WHITE, border: "none", padding: "1rem", fontFamily: font.sans, fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", borderRadius: 8, cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.2s" }}>
                    {status === "sending" ? "Sending…" : "Submit application →"}
                  </button>

                  {status === "error" && (
                    <p style={{ fontFamily: font.sans, fontSize: "0.74rem", color: RED, textAlign: "center", marginTop: "0.75rem" }}>
                      Something went wrong. Email us at hr@10x.global
                    </p>
                  )}

                  <p style={{ fontFamily: font.sans, fontSize: "0.64rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                    Sends directly to our HR team. We reply within a week.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
