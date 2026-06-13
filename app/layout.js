import { Cormorant_Garamond, DM_Sans, Roboto } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import PageLoader from "@/components/PageLoader"
import GlobePreloader from "@/components/GlobePreloader"

const playfair = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "600"],
  style:    ["normal", "italic"],
  variable: "--font-playfair",
  display:  "swap",
})

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display:  "swap",
})

const roboto = Roboto({
  subsets:  ["latin"],
  weight:   ["400", "500", "700"],
  variable: "--font-roboto",
  display:  "swap",
})

export const metadata = {
  title:       "10✕Global — Advisory for the Modern Business",
  description: "Cross-border finance, legal, compliance & capital — one integrated team.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${roboto.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#FFFFFF" }}>
        <PageLoader />
        <GlobePreloader />
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
