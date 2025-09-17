import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Wifi, 
  ChevronUp,
  Phone, 
  MapPin, 
  Clock,
  Filter,
  Map,
  Layers,
  BarChart3,
  PieChart,
  Signal
} from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";

interface Alert {
  id: string;
  touristName: string;
  touristId: string;
  location: string;
  timestamp: string;
  type: "panic" | "geofence";
  status: "new" | "acknowledged" | "escalated";
}

export default function RescueDashboard() {
  const [activeTab, setActiveTab] = useState("live-alerts");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const mockAlerts: Alert[] = [
    {
      id: "1",
      touristName: "Priya Sharma",
      touristId: "GRD-891234",
      location: "Near Hadimba Temple, Manali",
      timestamp: "2 minutes ago",
      type: "panic",
      status: "new"
    },
    {
      id: "2", 
      touristName: "Rohit Kumar",
      touristId: "GRD-456789",
      location: "Mall Road, Shimla",
      timestamp: "5 minutes ago",
      type: "geofence",
      status: "new"
    },
    {
      id: "3",
      touristName: "Neha Patel",
      touristId: "GRD-123456",
      location: "Rohtang Pass Trail",
      timestamp: "8 minutes ago",
      type: "panic",
      status: "acknowledged"
    },
    {
      id: "4",
      touristName: "Amit Singh",
      touristId: "GRD-789012",
      location: "Solang Valley Base",
      timestamp: "12 minutes ago",
      type: "geofence",
      status: "new"
    }
  ];

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case "panic": return "bg-red-500 text-white";
      case "geofence": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "text-red-600";
      case "acknowledged": return "text-yellow-600";
      case "escalated": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Header */}
      <section className="border-b bg-muted/30 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Rescue Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and emergency response</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger 
              value="live-alerts" 
              data-testid="tab-live-alerts"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Live Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="system-analytics" 
              data-testid="tab-system-analytics"
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              System Analytics
            </TabsTrigger>
          </TabsList>
          
          {/* Live Alerts Tab */}
          <TabsContent value="live-alerts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Alerts Feed */}
              <div className="space-y-6">
                <Card className="glass">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Live Alerts
                      </CardTitle>
                      <Button size="sm" variant="outline" data-testid="button-filter-alerts">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {mockAlerts.map((alert) => (
                        <Card 
                          key={alert.id}
                          className={`glass cursor-pointer transition-all hover-elevate ${
                            selectedAlert?.id === alert.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => handleAlertClick(alert)}
                          data-testid={`alert-card-${alert.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-lg">{alert.touristName}</h3>
                                <p className="text-sm text-muted-foreground">ID: {alert.touristId}</p>
                              </div>
                              <Badge className={getAlertBadgeColor(alert.type)}>
                                {alert.type.toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span>{alert.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{alert.timestamp}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                data-testid={`button-acknowledge-${alert.id}`}
                              >
                                Acknowledge
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-600 hover:bg-red-700 text-white"
                                data-testid={`button-escalate-${alert.id}`}
                              >
                                Escalate
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                data-testid={`button-auto-efir-${alert.id}`}
                              >
                                Auto e-FIR
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Alert Details */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      Alert Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedAlert ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-xl">{selectedAlert.touristName}</h3>
                          <p className="text-muted-foreground">ID: {selectedAlert.touristId}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedAlert.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedAlert.timestamp}</span>
                        </div>
                        <Badge className={getAlertBadgeColor(selectedAlert.type)}>
                          {selectedAlert.type.toUpperCase()} ALERT
                        </Badge>
                        <div className={`text-sm font-medium ${getStatusColor(selectedAlert.status)}`}>
                          Status: {selectedAlert.status.toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        Select an alert to view details
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Map & Trace */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Live Location & Trail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="physical" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="physical">Physical</TabsTrigger>
                        <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
                      </TabsList>
                      <TabsContent value="physical">
                        <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                          <div className="text-center">
                            <Map className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Physical map view</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="heatmap">
                        <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                          <div className="text-center">
                            <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Heat map view</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Blockchain Status */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-500" />
                      Blockchain Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Network:</span>
                        <span className="text-sm font-medium">Polygon zkEVM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className="text-sm font-medium text-green-600">Committed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Last Block:</span>
                        <span className="text-sm font-mono">0x181cf428d939</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* System Analytics Tab */}
          <TabsContent value="system-analytics" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12,847</p>
                      <p className="text-sm text-muted-foreground">Active Tourists</p>
                      <p className="text-sm text-green-600">+8.2% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Signal className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-muted-foreground">IoT Devices</p>
                      <p className="text-sm text-red-600">12 offline</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">23</p>
                      <p className="text-sm text-muted-foreground">Critical Alerts</p>
                      <p className="text-sm text-red-600">5 new today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">99.8%</p>
                      <p className="text-sm text-muted-foreground">System Uptime</p>
                      <p className="text-sm text-green-600">Operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Weekly Tourist Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Bar Chart Placeholder</p>
                      <p className="text-xs text-muted-foreground mt-2">Tourist activity trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-green-500" />
                    Safety Score Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Pie Chart Placeholder</p>
                      <p className="text-xs text-muted-foreground mt-2">Safety score breakdown</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}