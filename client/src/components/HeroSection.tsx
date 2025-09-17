import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mic, CreditCard, Shield, MapPin } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Meghalaya_waterfall_hero_background_52ebdbd8.png";

export default function HeroSection() {
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              SafeTrip
            </span>
            <span className="block text-destructive text-3xl md:text-4xl mt-2">
              Emergency SOS
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Smart Tourist Safety & Incident Response System
          </p>
          
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Advanced AI-powered safety platform protecting travelers across India
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="glass border-white/20 max-w-md mx-auto" data-testid="card-quick-actions">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
            
            <Button
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12"
              onClick={() => handleQuickAction('voice-emergency')}
              data-testid="button-emergency-access"
            >
              <Mic className="w-5 h-5 mr-3" />
              Voice-Text Emergency Access
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20 h-12"
              onClick={() => handleQuickAction('digital-id')}
              data-testid="button-digital-id"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Issue Digital ID at Kiosk
            </Button>
            
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 mr-1" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-1" />
                <span>GPS Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Started */}
        <div className="mt-8">
          <Link href="/registration">
            <Button 
              size="lg" 
              className="bg-trust text-trust-foreground hover:bg-trust/90 px-8 py-3 text-lg"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}