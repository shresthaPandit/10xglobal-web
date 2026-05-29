import { Playfair_Display, Manrope } from "next/font/google"
import "./globals.css"
import PageLoader from "@/components/PageLoader"

const playfair = Playfair_Display({
  subsets:  ["latin"],
  weight:   ["500", "600", "700"],
  style:    ["normal", "italic"],
  variable: "--font-playfair",
  display:  "swap",
})

const manrope = Manrope({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display:  "swap",
})

export const metadata = {
  title:       "10x Global — Cross-Border Business Advisory",
  description: "Advisory expertise. Technology-led delivery. One team across India, UAE, Singapore, and the US.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#F7F3EE" }}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}
