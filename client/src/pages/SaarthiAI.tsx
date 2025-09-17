import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NavigationHeader from "@/components/NavigationHeader";
import PanicButton from "@/components/PanicButton";
import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  Eye,
  MapPin,
  Activity,
  AlertTriangle,
  FileText,
  Users,
  Smartphone,
  Cloud,
  Newspaper,
  Wifi,
  Star,
  Play,
  Pause,
  RotateCcw,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataSource {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "active" | "syncing" | "offline";
  lastUpdate: string;
  reliability: number;
}

interface AICapability {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  confidence: number;
  status: "ready" | "learning" | "analyzing";
}

export default function SaarthiAI() {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data sources - todo: remove mock functionality
  const dataSources: DataSource[] = [
    {
      id: "police-data",
      name: "Police & NCRB Data",
      icon: Shield,
      status: "active",
      lastUpdate: "2 min ago",
      reliability: 98,
    },
    {
      id: "news-data",
      name: "Local & Regional News",
      icon: Newspaper,
      status: "active", 
      lastUpdate: "5 min ago",
      reliability: 85,
    },
    {
      id: "weather-data",
      name: "IMD Weather Alerts",
      icon: Cloud,
      status: "syncing",
      lastUpdate: "1 min ago",
      reliability: 96,
    },
    {
      id: "social-data",
      name: "Social Media Trends",
      icon: Users,
      status: "active",
      lastUpdate: "30 sec ago",
      reliability: 72,
    },
    {
      id: "telecom-data",
      name: "Network Data",
      icon: Wifi,
      status: "active",
      lastUpdate: "45 sec ago",
      reliability: 91,
    },
    {
      id: "user-telemetry",
      name: "Device Telemetry",
      icon: Smartphone,
      status: "active",
      lastUpdate: "10 sec ago",
      reliability: 99,
    }
  ];

  const aiCapabilities: AICapability[] = [
    {
      id: "risk-prediction",
      name: "Risk Prediction",
      description: "Analyze millions of data points to predict potential safety risks in real-time",
      icon: TrendingUp,
      confidence: 87,
      status: "ready",
    },
    {
      id: "route-optimization",
      name: "Smart Route Planning",
      description: "Optimize travel routes based on safety scores, weather, and real-time conditions",
      icon: MapPin,
      confidence: 92,
      status: "ready",
    },
    {
      id: "emergency-response",
      name: "Emergency Response",
      description: "Instant threat detection and automated emergency service coordination",
      icon: AlertTriangle,
      confidence: 94,
      status: "ready",
    },
    {
      id: "scam-prevention",
      name: "AI Scam Prevention",
      description: "Detect and prevent tourist-targeted scams using behavioral analysis",
      icon: Shield,
      confidence: 78,
      status: "learning",
    },
    {
      id: "evidence-logging",
      name: "Evidence Logging",
      description: "Automated documentation of incidents with timestamped evidence collection",
      icon: FileText,
      confidence: 89,
      status: "ready",
    },
    {
      id: "health-advisor",
      name: "Health & Stamina Advisor",
      description: "Personalized health recommendations based on your activity and environment",
      icon: Activity,
      confidence: 81,
      status: "analyzing",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "ready": return "bg-success text-success-foreground";
      case "syncing":
      case "learning": return "bg-warning text-warning-foreground";
      case "offline": return "bg-destructive text-destructive-foreground";
      case "analyzing": return "bg-trust text-trust-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleCapabilityDemo = (capabilityId: string) => {
    console.log(`Demonstrating capability: ${capabilityId}`);
    toast({
      title: "AI Feature Demonstration",
      description: "Saarthi is analyzing your request and preparing a personalized demonstration.",
      duration: 3000,
    });
  };

  const handleSimulationToggle = () => {
    setIsSimulationRunning(!isSimulationRunning);
    console.log(`Simulation ${!isSimulationRunning ? 'started' : 'stopped'}`);
    
    toast({
      title: isSimulationRunning ? "Simulation Stopped" : "Hourly Simulation Started",
      description: isSimulationRunning 
        ? "Real-time monitoring resumed" 
        : "Simulating tourist paths and risk assessment for the next hour",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-trust/5 to-purple-500/5 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-6 bg-trust/10 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-trust" />
              <div className="absolute inset-0 animate-pulse bg-trust/20 rounded-full blur-sm"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Meet Saarthi</h1>
          <p className="text-xl text-muted-foreground mb-2">Your Personal Digital Twin</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Advanced AI analyzing millions of data points to predict and prevent risks in real-time, 
            serving as your personal safety co-pilot throughout your journey.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge className="bg-success text-success-foreground">
              <Activity className="w-3 h-3 mr-1" />
              99.8% Uptime
            </Badge>
            <Badge className="bg-trust text-trust-foreground">
              <Brain className="w-3 h-3 mr-1" />
              Neural Networks Active
            </Badge>
            <Badge className="bg-warning text-warning-foreground">
              <Zap className="w-3 h-3 mr-1" />
              Real-time Processing
            </Badge>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-trust text-trust-foreground hover:bg-trust/90"
              data-testid="button-activate-saarthi"
            >
              <Brain className="w-5 h-5 mr-2" />
              Activate Full Features
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleSimulationToggle}
              data-testid="button-toggle-simulation"
            >
              {isSimulationRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Stop Simulation
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Hourly Simulation
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="data-sources" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data-sources" data-testid="tab-data-sources">
              <Cloud className="w-4 h-4 mr-2" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="capabilities" data-testid="tab-capabilities">
              <Zap className="w-4 h-4 mr-2" />
              AI Capabilities
            </TabsTrigger>
            <TabsTrigger value="simulation" data-testid="tab-simulation">
              <Activity className="w-4 h-4 mr-2" />
              Live Analysis
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-ai-settings">
              <Settings className="w-4 h-4 mr-2" />
              AI Settings
            </TabsTrigger>
          </TabsList>

          {/* Data Sources */}
          <TabsContent value="data-sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-trust" />
                  How Saarthi Learns
                </CardTitle>
                <p className="text-muted-foreground">
                  Real-time data integration from multiple verified sources ensures comprehensive safety analysis
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dataSources.map((source) => {
                    const Icon = source.icon;
                    return (
                      <Card key={source.id} className="hover-elevate" data-testid={`data-source-${source.id}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-${source.status === 'active' ? 'success' : source.status === 'syncing' ? 'warning' : 'destructive'}/10`}>
                              <Icon className="w-6 h-6 text-trust" />
                            </div>
                            <Badge className={getStatusColor(source.status)}>
                              {source.status}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{source.name}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Reliability</span>
                              <span className="font-medium">{source.reliability}%</span>
                            </div>
                            <Progress value={source.reliability} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              Updated {source.lastUpdate}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Capabilities */}
          <TabsContent value="capabilities" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {aiCapabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <Card key={capability.id} className="hover-elevate" data-testid={`capability-${capability.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-trust/10 rounded-lg">
                            <Icon className="w-6 h-6 text-trust" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{capability.name}</h3>
                            <Badge className={getStatusColor(capability.status)}>
                              {capability.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {capability.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">AI Confidence</span>
                          <span className="font-medium">{capability.confidence}%</span>
                        </div>
                        <Progress value={capability.confidence} className="h-2" />
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              data-testid={`button-demo-${capability.id}`}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Demo
                            </Button>
                          </DialogTrigger>
                          <DialogContent data-testid={`modal-demo-${capability.id}`}>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-trust" />
                                {capability.name} Demo
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">
                                {capability.description}
                              </p>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">AI Analysis Example:</h4>
                                <p className="text-sm">
                                  Based on current conditions, weather patterns, and historical data, 
                                  Saarthi recommends specific actions tailored to your situation.
                                </p>
                              </div>
                              <Button 
                                className="w-full"
                                onClick={() => handleCapabilityDemo(capability.id)}
                                data-testid={`button-activate-${capability.id}`}
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Activate Feature
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Live Analysis/Simulation */}
          <TabsContent value="simulation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-success" />
                    Live Safety Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isSimulationRunning ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                    <span className="text-sm text-muted-foreground">
                      {isSimulationRunning ? 'Simulation Active' : 'Real-time Monitoring'}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Risk Assessment</span>
                      <Badge className="bg-success text-success-foreground">Low</Badge>
                    </div>
                    <div className="text-2xl font-bold text-success mb-1">25/100</div>
                    <p className="text-xs text-muted-foreground">Current location safety score</p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Active Monitoring</span>
                      <Badge className="bg-trust text-trust-foreground">Live</Badge>
                    </div>
                    <div className="text-2xl font-bold text-trust mb-1">847</div>
                    <p className="text-xs text-muted-foreground">Data points analyzed per minute</p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Predictions</span>
                      <Badge className="bg-warning text-warning-foreground">Active</Badge>
                    </div>
                    <div className="text-2xl font-bold text-warning mb-1">12</div>
                    <p className="text-xs text-muted-foreground">Route recommendations generated</p>
                  </Card>
                </div>
                
                <div className="border rounded-lg p-6 bg-gradient-to-br from-trust/5 to-success/5">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-trust" />
                    Neural Network Activity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pattern Recognition</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-trust transition-all duration-1000" style={{ width: '78%' }} />
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Risk Correlation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-success transition-all duration-1000" style={{ width: '92%' }} />
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Predictive Accuracy</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-warning transition-all duration-1000" style={{ width: '85%' }} />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  Saarthi Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">AI Sensitivity Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Risk Detection</span>
                        <div className="w-24">
                          <Progress value={75} />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Alert Frequency</span>
                        <div className="w-24">
                          <Progress value={60} />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Learning Rate</span>
                        <div className="w-24">
                          <Progress value={85} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPU Usage</span>
                        <span>12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory</span>
                        <span>284 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Battery Impact</span>
                        <span className="text-success">Low</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network Usage</span>
                        <span>45 KB/min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" data-testid="button-reset-ai">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button data-testid="button-save-ai-settings">
                    Save AI Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PanicButton variant="floating" />
    </div>
  );
}