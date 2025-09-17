import { useState, useEffect, useRef } from "react";
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
  Settings,
  Navigation,
  Heart,
  Clock,
  BarChart3,
  Phone,
  CloudRain,
  Handshake
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
  const [hourSlider, setHourSlider] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState("tourist-peak");
  const [showParallelModal, setShowParallelModal] = useState(false);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);
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

  const handlePlaySimulation = () => {
    if (isAnimating) return;
    
    // Clear any existing interval
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
    
    setIsAnimating(true);
    setHourSlider(0);
    
    // Animate slider from 0 to 4 over 5-8 seconds
    let progress = 0;
    const duration = 6000; // 6 seconds
    animationInterval.current = setInterval(() => {
      progress += 100; // 60fps
      const currentHour = (progress / duration) * 4;
      
      if (currentHour >= 4) {
        setHourSlider(4);
        setIsAnimating(false);
        if (animationInterval.current) {
          clearInterval(animationInterval.current);
          animationInterval.current = null;
        }
        toast({
          title: "Simulation Complete",
          description: "Future risk simulation completed successfully",
          duration: 3000,
        });
      } else {
        setHourSlider(currentHour);
      }
    }, 100);
  };

  const resetSimulation = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
    setHourSlider(0);
    setIsAnimating(false);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, []);

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
                            <div className={`p-2 rounded-lg ${
                              source.status === 'active' ? 'bg-success/10' :
                              source.status === 'syncing' ? 'bg-warning/10' :
                              'bg-destructive/10'
                            }`}>
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

        {/* Interactive Simulation Section */}
        <section className="py-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Run a Future Risk Simulation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore potential risk scenarios and analyze future safety patterns using Saarthi's predictive AI models
            </p>
          </div>

          {/* Simulation Controls Card */}
          <Card className="hover-elevate" data-testid="card-simulation-controls">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-trust" />
                Simulation Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scenario</label>
                  <select 
                    value={selectedScenario} 
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                    data-testid="select-scenario"
                  >
                    <option value="tourist-peak">Tourist Peak Hours</option>
                    <option value="festival-crowd">Festival Crowd Density</option>
                    <option value="weather-alert">Weather Alert Response</option>
                    <option value="emergency-drill">Emergency Response Drill</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handlePlaySimulation}
                    disabled={isAnimating}
                    className="bg-trust text-trust-foreground hover:bg-trust/90"
                    data-testid="button-play-simulation"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={resetSimulation}
                    variant="outline"
                    data-testid="button-reset-simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hour +{Math.round(hourSlider)}</label>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-trust transition-all duration-300" 
                      style={{ width: `${(hourSlider / 4) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => setShowParallelModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700"
                    data-testid="button-launch-parallel-world"
                  >
                    Launch Parallel World Simulation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Card */}
          <Card className="hover-elevate" data-testid="card-simulation-map">
            <CardContent className="p-0">
              <div 
                className="relative h-96 bg-cover bg-center rounded-lg overflow-hidden"
                style={{ 
                  backgroundImage: `url('@assets/image_1758110049182.png')`,
                  backgroundBlendMode: 'overlay'
                }}
              >
                {/* Map Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-trust/10 to-success/10 backdrop-blur-[0.5px]"></div>
                
                {/* Map Legend */}
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
                  <h4 className="font-medium mb-2 text-sm">Risk Zones</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span>Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <span>Risking Soon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <span>Unsafe</span>
                    </div>
                  </div>
                </div>

                {/* Animated Trail - shows during simulation */}
                {isAnimating && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 50 300 Q 150 200 250 250 Q 350 300 450 200"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="800"
                      strokeDashoffset="800"
                      className="animate-pulse"
                      style={{
                        animation: `drawPath 6s ease-in-out forwards`
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                {/* Simulation Status Overlay */}
                {isAnimating && (
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-trust animate-pulse"></div>
                      <span className="text-sm font-medium">Simulation Running</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Live Insights & Memory Section */}
        <section className="py-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Live Insights & Memory</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time analysis and historical data that powers Saarthi's decision making
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Why? Card (Risk Factors) */}
            <Card className="hover-elevate" data-testid="card-risk-factors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Why?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Festival: High crowd density</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Confidence: 89%</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-destructive" style={{ width: '89%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CloudRain className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Weather: Rain forecast in 2hrs</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Confidence: 76%</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-warning" style={{ width: '76%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Location: Remote area - limited help</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">Confidence: 94%</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-destructive" style={{ width: '94%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saarthi's Memory Log Card */}
            <Card className="hover-elevate" data-testid="card-memory-log">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-trust" />
                  Saarthi's Memory Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Tourist helped at Mall Road</p>
                      <p className="text-xs text-muted-foreground">Successful navigation assistance</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Scam attempt detected near Bus Stand</p>
                      <p className="text-xs text-muted-foreground">Alert sent, tourist avoided risk</p>
                      <p className="text-xs text-muted-foreground mt-1">6 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Weather alert system activated</p>
                      <p className="text-xs text-muted-foreground">Timely rain warning issued</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Crowd surge at festival venue</p>
                      <p className="text-xs text-muted-foreground">Route optimization provided</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emotion Sync Widget */}
            <Card className="hover-elevate" data-testid="card-emotion-sync">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-trust" />
                  Emotion Sync
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-success" />
                  </div>
                  
                  <div>
                    <p className="font-medium text-success">Active</p>
                    <p className="text-sm text-muted-foreground">Status: Calm</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Heart Rate</span>
                      <span className="font-medium">72 BPM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stress Level</span>
                      <Badge className="bg-success text-success-foreground">Low</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mood</span>
                      <span className="font-medium">Relaxed</span>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-emotion-settings"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ecosystem & Support Section */}
        <section className="py-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ecosystem & Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support network and partnerships that enhance your safety experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Local Guide Connect Card */}
            <Card className="hover-elevate" data-testid="card-local-guide">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-trust" />
                  Local Guide Connect
                </CardTitle>
                <p className="text-sm text-muted-foreground">Expert Local Assistance</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Connect with verified local guides who know the area inside out. Get personalized recommendations, 
                  cultural insights, and safe route guidance from trusted community members.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Guides</span>
                    <Badge className="bg-success text-success-foreground">247 Online</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">&lt; 2 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-medium">12+</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-trust text-trust-foreground hover:bg-trust/90"
                  data-testid="button-connect-guide"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Connect Now
                </Button>
              </CardContent>
            </Card>

            {/* Weather & Terrain Advisories Card */}
            <Card className="hover-elevate" data-testid="card-weather-advisories">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-warning" />
                  Weather & Terrain Advisories
                </CardTitle>
                <p className="text-sm text-muted-foreground">Real-time Environmental Intel</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Stay ahead of weather changes and terrain challenges with hyper-local forecasts, 
                  seasonal advisories, and real-time alerts from meteorological departments.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Conditions</span>
                    <Badge className="bg-success text-success-foreground">Clear</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next 6 Hours</span>
                    <Badge className="bg-warning text-warning-foreground">Light Rain</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">UV Index</span>
                    <span className="font-medium">Moderate (5)</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-warning text-warning-foreground hover:bg-warning/90"
                  data-testid="button-weather-alerts"
                >
                  <Cloud className="w-4 h-4 mr-2" />
                  Get Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Partnerships Card */}
            <Card className="hover-elevate" data-testid="card-partnerships">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-success" />
                  Partnerships
                </CardTitle>
                <p className="text-sm text-muted-foreground">Trusted Network Alliance</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Strategic alliances with government agencies, tourism boards, emergency services, 
                  and local businesses to ensure comprehensive safety coverage.
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Emergency Services</span>
                    <Badge className="bg-success text-success-foreground">Integrated</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tourism Boards</span>
                    <Badge className="bg-trust text-trust-foreground">12 States</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Local Businesses</span>
                    <span className="font-medium">2,847 Verified</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-success text-success-foreground hover:bg-success/90"
                  data-testid="button-view-partners"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Partners
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Parallel World Simulation Modal */}
      <Dialog open={showParallelModal} onOpenChange={(open) => !open && setShowParallelModal(false)}>
        <DialogContent className="max-w-4xl" data-testid="modal-parallel-world">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Parallel World Simulation
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Map Preview */}
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Map Preview (Demo)</p>
                <p className="text-xs text-muted-foreground mt-1">Interactive 3D simulation environment</p>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" data-testid="button-start-parallel-sim">
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </Button>
                <Button variant="outline" className="flex-1" data-testid="button-stop-parallel-sim">
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Simulation
                </Button>
              </div>
            </div>
            
            {/* Right Column - Analysis */}
            <div className="space-y-4">
              <h4 className="font-medium">Simulation Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Crowd Density</span>
                  <Badge className="bg-warning text-warning-foreground">High</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Community Trust</span>
                  <Badge className="bg-success text-success-foreground">Strong</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">CCTV Coverage</span>
                  <Badge className="bg-trust text-trust-foreground">78%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Emergency Response</span>
                  <Badge className="bg-success text-success-foreground">Ready</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Weather Conditions</span>
                  <Badge className="bg-success text-success-foreground">Clear</Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PanicButton variant="floating" />
    </div>
  );
}