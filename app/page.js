import Navbar              from "@/components/layout/Navbar"
import HeroSection         from "@/components/HeroSection"
import StatsBar            from "@/components/sections/StatsBar"
import LogoBar             from "@/components/sections/LogoBar"
import WhyChooseSection    from "@/components/sections/WhyChooseSection"
import HowWeWork           from "@/components/sections/HowWeWork"
import TestimonialsSection  from "@/components/sections/TestimonialsSection"
import EngagementsSection   from "@/components/sections/EngagementsSection"
import ClientTypesSection   from "@/components/sections/ClientTypesSection"
import CTASection           from "@/components/sections/CTASection"
import Footer              from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <LogoBar />
      <WhyChooseSection />
      <HowWeWork />
      <TestimonialsSection />
      <EngagementsSection />
      <ClientTypesSection />
      <CTASection />
      <Footer />
    </>
  )
}
