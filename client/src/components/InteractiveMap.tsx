import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Layers, Navigation, AlertTriangle, MapPin } from "lucide-react";

interface HeatMapZone {
  id: string;
  name: string;
  risk: "safe" | "moderate" | "high";
  coordinates: { lat: number; lng: number };
}

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState("physical");
  const [selectedZone, setSelectedZone] = useState<HeatMapZone | null>(null);

  // Mock heat map zones
  const heatMapZones: HeatMapZone[] = [
    { id: "1", name: "Tourist Market Area", risk: "safe", coordinates: { lat: 25.5788, lng: 91.8933 } },
    { id: "2", name: "Remote Trail Section", risk: "moderate", coordinates: { lat: 25.5800, lng: 91.8950 } },
    { id: "3", name: "Unlit Road Stretch", risk: "high", coordinates: { lat: 25.5820, lng: 91.8970 } }
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
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-64 flex items-center justify-center border">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-trust/10 rounded-full flex items-center justify-center">
                  <Map className="w-8 h-8 text-trust" />
                </div>
                <div className="font-medium">Shillong, Meghalaya</div>
                <div className="text-sm text-muted-foreground">Physical terrain map with roads and landmarks</div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-trust rounded-full animate-pulse"></div>
                  <span className="text-xs">Live tracking active</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="heatmap" className="mt-4 space-y-4">
            <div className="relative bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 dark:from-red-900/20 dark:via-yellow-900/20 dark:to-green-900/20 rounded-lg h-64 flex items-center justify-center border">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-warning/10 rounded-full flex items-center justify-center">
                  <Layers className="w-8 h-8 text-warning" />
                </div>
                <div className="font-medium">Risk Assessment Overlay</div>
                <div className="text-sm text-muted-foreground">Real-time safety analysis</div>
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