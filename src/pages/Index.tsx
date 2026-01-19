import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AudienceSection from "@/components/home/AudienceSection";
import ValueSection from "@/components/home/ValueSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AudienceSection />
        <ValueSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
