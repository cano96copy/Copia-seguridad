import Hero from "@/components/Hero";
import GPTsShowcase from "@/components/GPTsShowcase";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <GPTsShowcase />
      <Benefits />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
