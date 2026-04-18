import HomeNavbar from "@/components/home/HomeNavbar";
import HeroSection from "@/components/home/HeroSection";
import RoarSection from "@/components/home/roarsection";
import DescriptionRoar from "@/components/home/descriptionroar";
import TrustedSection from "@/components/home/trustedsection";
import Services from "@/components/home/services";
import SelectedWork from "@/components/home/selectedwork";

export default function Home() {
  return (
    <>
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
      <main className="overflow-x-hidden" />
    </>
  );
}
