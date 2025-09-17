import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import SafetyScoreWidget from "@/components/SafetyScoreWidget";
import LocationCard from "@/components/LocationCard";
import DigitalIDCard from "@/components/DigitalIDCard";
import SaarthiCard from "@/components/SaarthiCard";
import InteractiveMap from "@/components/InteractiveMap";
import FeatureGrid from "@/components/FeatureGrid";
import VoiceEmergency from "@/components/VoiceEmergency";
import PanicButton from "@/components/PanicButton";

export default function Dashboard() {
  // Mock data - todo: remove mock functionality
  const mockNearbyPlaces = [
    {
      name: "Nohkalikai Falls",
      type: "attraction" as const,
      rating: 4.8,
      distance: "2.3 km",
      status: "open" as const,
    },
    {
      name: "Hotel Pine Hill",
      type: "hotel" as const,
      rating: 4.2,
      distance: "500 m", 
      price: "₹2,500/night",
    },
    {
      name: "Tourist Rescue Center",
      type: "rescue" as const,
      distance: "1.2 km",
      contact: "112",
      status: "24/7" as const,
    }
  ];

  const mockMustTry = [
    "Jadoh (Rice Dish)",
    "Dohneiiong (Pork Curry)", 
    "Tungrymbai",
    "Pukhlein (Rice Cake)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Dashboard Header */}
      <section className="border-b bg-muted/30 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Tourist Dashboard</h1>
              <p className="text-muted-foreground">Currently in: Shillong, Meghalaya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Safety Tips */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <Card className="backdrop-blur-md bg-background/90 border border-white/20 shadow-xl hover-elevate">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-trust" data-testid="icon-safety-shield" />
              Today's Safety Tips for Manali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3" data-testid="tip-weather">
                <div className="w-2 h-2 bg-trust rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Weather (Sept 17):</strong>{" "}
                  <span className="text-muted-foreground">
                    Expect a high of 28°C. The UV Index will reach 7 (High) around 1 PM, so sunscreen is recommended.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3" data-testid="tip-crowd">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Crowd Alert:</strong>{" "}
                  <span className="text-muted-foreground">
                    Mall Road becomes highly crowded after 6:30 PM, with an estimated 450+ visitors per hour on weekdays.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3" data-testid="tip-fare">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Fair Fare:</strong>{" "}
                  <span className="text-muted-foreground">
                    An auto-rickshaw from Mall Road Market to Hidimba Devi Temple should cost between ₹100 - ₹120. Many local taxis here are prepaid or share-based.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3" data-testid="tip-health">
                <div className="w-2 h-2 bg-trust rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Health & Hydration:</strong>{" "}
                  <span className="text-muted-foreground">
                    Air Quality Index (AQI) is moderate at 82. It's advised to drink at least 2.5 liters of water to stay hydrated, especially if trekking.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3" data-testid="tip-emergency">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-foreground">Emergency Contact:</strong>{" "}
                  <span className="text-muted-foreground">
                    The local Tourist Police assistance number is 1363. Response time in central Manali averages under 15 minutes.
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Safety Score - Hero Element */}
            <SafetyScoreWidget 
              score={25}
              location="Shillong, Meghalaya" 
              lastUpdated="2 min ago"
            />

            {/* Interactive Map */}
            <InteractiveMap />

            {/* Feature Grid */}
            <FeatureGrid />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Digital ID */}
            <DigitalIDCard 
              touristName="Rajesh Kumar Singh"
              touristId="GRD-2025-MH-8847"
              validUntil="Jan 15, 2025"
              currentLocation="Shillong, Meghalaya"
              emergencyContact="+91-9876543210"
              status="active"
            />

            {/* Current Location & Itinerary */}
            <LocationCard 
              currentLocation="Shillong, Meghalaya"
              nearbyPlaces={mockNearbyPlaces}
              mustTry={mockMustTry}
            />

            {/* Saarthi AI */}
            <SaarthiCard />

            {/* Trip Progress Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Trip Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Day 3 of 7</span>
                    <span className="font-medium">43% Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-trust h-2 rounded-full" style={{ width: '43%' }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next: Elephant Falls (Tomorrow 10:00 AM)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Voice Emergency Section */}
        <div className="mt-12">
          <VoiceEmergency />
        </div>
      </main>

      {/* Floating Panic Button */}
      <PanicButton variant="floating" />
    </div>
  );
}