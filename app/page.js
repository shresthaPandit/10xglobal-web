import Navbar             from "@/components/layout/Navbar"
import HeroSection        from "@/components/HeroSection"
import LogoBar            from "@/components/sections/LogoBar"
import ServicesSection    from "@/components/sections/ServicesSection"
import WhyUsSection       from "@/components/sections/WhyUsSection"
import TeamSection        from "@/components/sections/TeamSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import OfficesSection     from "@/components/sections/OfficesSection"
import InsightsSection    from "@/components/sections/InsightsSection"
import CTASection         from "@/components/sections/CTASection"
import Footer             from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogoBar />
      <ServicesSection />
      <WhyUsSection />
      <TeamSection />
      <TestimonialsSection />
      <OfficesSection />
      <InsightsSection />
      <CTASection />
      <Footer />
    </>
  )
}
