import HomeNavbar from "@/components/home/HomeNavbar";
import HeroSection from "@/components/home/HeroSection";
import RoarSection from "@/components/home/roarsection";
import DescriptionRoar from "@/components/home/descriptionroar";
import TrustedSection from "@/components/home/trustedsection";
import Services from "@/components/home/services-section/services";
import SelectedWork from "@/components/home/selectedwork";
import QuoteSection from "@/components/home/quotesection";
import FooterSection from "@/components/home/footersection";

export default function Home() {
  return (
    <div className="font-home-sans">
      <HomeNavbar />
      <div
        className="w-full shrink-0 h-[var(--navbar-offset-mobile)] md:h-[var(--navbar-offset-tablet)] lg:hidden"
        aria-hidden="true"
      />
      <HeroSection />
      <RoarSection />
      <DescriptionRoar />
      <TrustedSection />
      <Services />
      <SelectedWork />
      <QuoteSection />
      <FooterSection />
      <main className="overflow-x-hidden" />
    </div>
  );
}
