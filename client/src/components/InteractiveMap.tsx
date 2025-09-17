import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Layers, Navigation, AlertTriangle, MapPin } from "lucide-react";
import manaliMapImage from "@assets/image_1758110049182.png";

interface HeatMapZone {
  id: string;
  name: string;
  risk: "safe" | "moderate" | "high";
  coordinates: { lat: number; lng: number };
}

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState("physical");
  const [selectedZone, setSelectedZone] = useState<HeatMapZone | null>(null);

  // Mock heat map zones for Manali
  const heatMapZones: HeatMapZone[] = [
    { id: "1", name: "Mall Road Market", risk: "safe", coordinates: { lat: 32.2396, lng: 77.1887 } },
    { id: "2", name: "Manali Bus Stand Area", risk: "safe", coordinates: { lat: 32.2432, lng: 77.1892 } },
    { id: "3", name: "Buddhist Monastery", risk: "safe", coordinates: { lat: 32.2389, lng: 77.1901 } },
    { id: "4", name: "Remote Riverside Path", risk: "moderate", coordinates: { lat: 32.2445, lng: 77.1920 } },
    { id: "5", name: "Unlit Mountain Trail", risk: "high", coordinates: { lat: 32.2370, lng: 77.1950 } }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "safe": return "bg-success text-success-foreground";
      case "moderate": return "bg-warning text-warning-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "safe": return <MapPin className="w-3 h-3" />;
      case "moderate": return <AlertTriangle className="w-3 h-3" />;
      case "high": return <AlertTriangle className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <Card data-testid="card-interactive-map">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5 text-trust" />
          <span>Interactive Map</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="physical" data-testid="tab-physical-map">
              <Navigation className="w-4 h-4 mr-2" />
              Physical Map
            </TabsTrigger>
            <TabsTrigger value="heatmap" data-testid="tab-heat-map">
              <Layers className="w-4 h-4 mr-2" />
              Safety Heat Map
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="physical" className="mt-4">
            <div className="relative rounded-lg h-64 overflow-hidden border">
              <img 
                src={manaliMapImage} 
                alt="Manali Physical Map"
                className="w-full h-full object-cover"
                data-testid="image-physical-map"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-trust rounded-full animate-pulse"></div>
                  <span>Manali, Himachal Pradesh</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="heatmap" className="mt-4 space-y-4">
            <div className="relative rounded-lg h-64 overflow-hidden border">
              <img 
                src={manaliMapImage} 
                alt="Manali Safety Heat Map"
                className="w-full h-full object-cover"
                data-testid="image-heat-map"
              />
              
              {/* Heatmap Zone Overlays */}
              {/* Safe zones - Green */}
              <div className="absolute top-[25%] left-[45%] w-16 h-12 bg-green-400/60 rounded-full border-2 border-green-600 flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">SAFE</span>
              </div>
              <div className="absolute top-[55%] right-[30%] w-14 h-10 bg-green-400/60 rounded-full border-2 border-green-600 flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">SAFE</span>
              </div>
              <div className="absolute bottom-[35%] left-[35%] w-12 h-10 bg-green-400/60 rounded-full border-2 border-green-600 flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">SAFE</span>
              </div>
              
              {/* Moderate zones - Yellow */}
              <div className="absolute top-[20%] right-[25%] w-18 h-14 bg-yellow-400/70 rounded-full border-2 border-yellow-600 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-800">MODERATE</span>
              </div>
              
              {/* High risk zones - Red */}
              <div className="absolute bottom-[25%] right-[20%] w-16 h-12 bg-red-500/70 rounded-full border-2 border-red-700 flex items-center justify-center">
                <span className="text-xs font-bold text-red-100">HIGH</span>
              </div>
              
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-3 h-3" />
                  <span>Live Safety Analysis</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 p-2 rounded text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>High Risk</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Risk Zones</h4>
              {heatMapZones.map((zone) => (
                <div 
                  key={zone.id} 
                  className="flex items-center justify-between p-2 rounded-lg border hover-elevate cursor-pointer"
                  onClick={() => setSelectedZone(zone)}
                  data-testid={`zone-${zone.id}`}
                >
                  <div className="flex items-center gap-2">
                    <Badge className={getRiskColor(zone.risk)}>
                      {getRiskIcon(zone.risk)}
                      <span className="ml-1 capitalize">{zone.risk}</span>
                    </Badge>
                    <span className="text-sm font-medium">{zone.name}</span>
                  </div>
                  <Button size="sm" variant="ghost" data-testid={`button-navigate-zone-${zone.id}`}>
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            Real-time breadcrumb trail active
          </div>
          <Button size="sm" variant="outline" data-testid="button-full-screen-map">
            <Layers className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}