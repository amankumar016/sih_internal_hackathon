import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import heroImage from "@assets/generated_images/Meghalaya_waterfall_hero_background_52ebdbd8.png";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleLoginClick = () => {
    setLocation("/login");
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-sans">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              G.U.A.R.D
            </span>
            <span className="block text-trust text-3xl md:text-4xl mt-4 font-semibold">
              Smart Tourist Safety
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Smart Tourist Safety & Incident Response System
          </p>
          
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Advanced AI-powered safety platform protecting travelers across India
          </p>
        </div>

        {/* Login / Sign Up Button */}
        <Button
          onClick={handleLoginClick}
          className="bg-trust text-trust-foreground hover:bg-trust/90 hover:scale-105 text-lg font-semibold px-8 py-6 h-auto rounded-lg shadow-xl transition-all duration-300"
          data-testid="button-homepage-login-signup"
        >
          Login / Sign Up
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}