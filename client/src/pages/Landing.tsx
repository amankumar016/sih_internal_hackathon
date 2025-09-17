import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import NavigationHeader from "@/components/NavigationHeader";
import PanicButton from "@/components/PanicButton";

export default function Landing() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      
      {/* Features Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Tourist Safety Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered protection, real-time monitoring, and community-driven safety for travelers across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-elevate">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-trust/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-trust text-2xl">🧠</span>
                </div>
                <h3 className="font-semibold mb-2">Saarthi AI Twin</h3>
                <p className="text-sm text-muted-foreground">
                  Personal safety co-pilot analyzing millions of data points for risk prediction
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-elevate">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-success text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold mb-2">Real-time Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Instant emergency response with multi-agency coordination and GPS tracking
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover-elevate">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-warning text-2xl">👥</span>
                </div>
                <h3 className="font-semibold mb-2">Community Network</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with verified local guides and fellow travelers for shared experiences
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => setShowRegistration(true)}
              data-testid="button-start-journey"
            >
              Start Your Safe Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-lg">GUARD</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Smart Tourist Safety & Incident Response System
              </p>
              <p className="text-sm text-muted-foreground">
                Built for Smart India Hackathon 2025
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Dashboard</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Community</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Emergency Help</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Contact Support</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Development Team</h4>
              <p className="text-sm text-muted-foreground">
                Developed by: Aman • Aman Kumar • Anushka • Diksha • Priyanshi • Vijendra
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                touristsafety@collegehackathon.in
              </p>
            </div>
          </div>
          
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            © 2025 GUARD • Built with ❤️ by Students
          </div>
        </div>
      </footer>

      {/* Floating Panic Button */}
      <PanicButton variant="floating" />
    </div>
  );
}