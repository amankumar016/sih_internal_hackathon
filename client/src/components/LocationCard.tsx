import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Phone, Navigation, Info } from "lucide-react";

interface LocationInfo {
  name: string;
  type: "attraction" | "hotel" | "rescue" | "hospital";
  rating?: number;
  distance: string;
  price?: string;
  contact?: string;
  status?: "open" | "closed" | "24/7";
}

interface LocationCardProps {
  currentLocation: string;
  nearbyPlaces: LocationInfo[];
  mustTry: string[];
}

export default function LocationCard({ currentLocation, nearbyPlaces, mustTry }: LocationCardProps) {
  const getTypeColor = (type: LocationInfo["type"]) => {
    switch (type) {
      case "attraction": return "bg-trust text-trust-foreground";
      case "hotel": return "bg-secondary text-secondary-foreground";
      case "rescue": return "bg-destructive text-destructive-foreground";
      case "hospital": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: LocationInfo["type"]) => {
    switch (type) {
      case "attraction": return <Star className="w-3 h-3" />;
      case "hotel": return <Info className="w-3 h-3" />;
      case "rescue": return <Phone className="w-3 h-3" />;
      case "hospital": return <Phone className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <Card data-testid="card-location-info">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-trust" />
          <span>Current Location</span>
        </CardTitle>
        <div className="text-lg font-semibold text-trust">{currentLocation}</div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Must Try Section */}
        <div>
          <h4 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wide">
            Must Try
          </h4>
          <div className="flex flex-wrap gap-2">
            {mustTry.map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div>
          <h4 className="font-medium mb-3 text-sm text-muted-foreground uppercase tracking-wide">
            Nearby Places
          </h4>
          <div className="space-y-3">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover-elevate">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${getTypeColor(place.type)}`}>
                      {getTypeIcon(place.type)}
                      <span className="ml-1 capitalize">{place.type}</span>
                    </Badge>
                    {place.rating && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {place.rating}
                      </div>
                    )}
                  </div>
                  <div className="font-medium text-sm">{place.name}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{place.distance}</span>
                    {place.price && <span>{place.price}</span>}
                    {place.status && (
                      <Badge variant="outline" className="text-xs">
                        {place.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" data-testid={`button-navigate-${index}`}>
                    <Navigation className="w-4 h-4" />
                  </Button>
                  {place.contact && (
                    <Button size="sm" variant="ghost" data-testid={`button-call-${index}`}>
                      <Phone className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}