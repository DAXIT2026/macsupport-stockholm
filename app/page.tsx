import SplashIntro from "../components/SplashIntro";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustSection from "../components/TrustSection";
import AudienceSection from "../components/AudienceSection";
import ServicesSection from "../components/ServicesSection";
import ProcessSection from "../components/ProcessSection";
import ReviewsSection from "../components/ReviewsSection";
import AboutSection from "../components/AboutSection";
import WhyUsSection from "../components/WhyUsSection";
import PricingSection from "../components/PricingSection";
import FaqContactSection from "../components/FaqContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <SplashIntro />

      <Header />

      <main>
        <Hero />
        <TrustSection />
        <AudienceSection />
        <ServicesSection />
        <ProcessSection />
        <ReviewsSection />
        <AboutSection />
        <WhyUsSection />
        <PricingSection />
        <FaqContactSection />
      </main>

      <Footer />
    </>
  );
}
