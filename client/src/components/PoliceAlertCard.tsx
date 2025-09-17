import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Clock, Phone, FileText, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  touristName: string;
  type: "PANIC" | "GEOFENCE" | "MEDICAL" | "LOST";
  location: string;
  timestamp: string;
  status: "new" | "acknowledged" | "dispatched" | "resolved";
  priority: "low" | "medium" | "high" | "critical";
}

interface PoliceAlertCardProps {
  alerts: Alert[];
}

export default function PoliceAlertCard({ alerts }: PoliceAlertCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-trust text-trust-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-destructive text-destructive-foreground";
      case "acknowledged": return "bg-warning text-warning-foreground";
      case "dispatched": return "bg-trust text-trust-foreground";
      case "resolved": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAlertAction = (alertId: string, action: string) => {
    console.log(`Alert ${alertId}: ${action} action triggered`);
  };

  return (
    <Card data-testid="card-police-alerts">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span>Live Alerts</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {alerts.filter(a => a.status === 'new').length} New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
            <p>All clear - no active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="border rounded-lg p-4 space-y-3 hover-elevate"
              data-testid={`alert-${alert.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                      {alert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="font-semibold">{alert.touristName}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                  data-testid={`button-acknowledge-${alert.id}`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Acknowledge
                </Button>
                <Button 
                  size="sm" 
                  className="bg-trust text-trust-foreground hover:bg-trust/90"
                  onClick={() => handleAlertAction(alert.id, 'escalate')}
                  data-testid={`button-escalate-${alert.id}`}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Escalate
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleAlertAction(alert.id, 'e-fir')}
                  data-testid={`button-efir-${alert.id}`}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Auto e-FIR
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}