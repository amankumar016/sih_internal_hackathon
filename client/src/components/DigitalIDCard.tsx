import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Shield, User, Calendar, MapPin, Phone } from "lucide-react";

interface DigitalIDProps {
  touristName: string;
  touristId: string;
  validUntil: string;
  currentLocation: string;
  emergencyContact: string;
  status: "active" | "expired" | "pending";
}

export default function DigitalIDCard({ 
  touristName, 
  touristId, 
  validUntil, 
  currentLocation, 
  emergencyContact,
  status 
}: DigitalIDProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "expired": return "bg-destructive text-destructive-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="relative bg-gradient-to-br from-trust/10 to-trust/5 border-trust/20" data-testid="card-digital-id">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-trust" />
            <div>
              <h3 className="font-bold text-trust">DIGITAL TOURIST ID</h3>
              <p className="text-xs text-muted-foreground">Blockchain Secured</p>
            </div>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Tourist Name</span>
              </div>
              <div className="font-semibold">{touristName}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground font-mono">
                ID: {touristId}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Valid until:</span>
              <span className="font-medium">{validUntil}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{currentLocation}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Emergency:</span>
              <span className="font-medium">{emergencyContact}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border">
              <QrCode className="w-16 h-16 text-trust" />
            </div>
            <Button size="sm" variant="outline" className="text-xs" data-testid="button-show-qr">
              Show QR
            </Button>
          </div>
        </div>
        
        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p>Valid for authorized entry points and emergency verification only</p>
        </div>
      </CardContent>
    </Card>
  );
}