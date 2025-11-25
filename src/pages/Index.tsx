import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GPTsShowcase from "@/components/GPTsShowcase";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <GPTsShowcase />
      <Benefits />
      <div id="pricing">
        <Pricing />
      </div>
      <Clients />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
