import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  X, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Circle,
  Car,
  Truck,
  Map,
  Layers,
  Shield,
  Phone,
  Siren,
  Heart,
  FileText,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Navigation,
  Eye,
  Activity
} from "lucide-react";
import manaliMapImg from '@assets/image_1758117701636.png';

interface TrackPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProgressStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  eta?: number; // Changed to seconds for countdown
  description?: string;
  subDetails?: string[];
  completedAt?: string;
  dispatchId?: string;
  firNumber?: string;
}

interface AssignedUnit {
  id: string;
  name: string;
  eta: number; // Changed to seconds for countdown
  details: string;
  type: "police" | "rescue" | "medical";
  leadOfficer?: string;
  vehiclePlate?: string;
  status?: string;
  position?: { x: number; y: number };
}

export default function TrackPanicModal({ isOpen, onClose }: TrackPanicModalProps) {
  // State for live countdown timers
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showWhatToDo, setShowWhatToDo] = useState(false);
  const [incidentTime] = useState("7:37 PM");
  const [reassuranceMessage, setReassuranceMessage] = useState("Your alert has been received. Help is being coordinated.");
  
  // Update time every second for live countdowns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update reassurance message based on progress
  useEffect(() => {
    const activeSteps = progressSteps.filter(step => step.status === "in-progress" || step.status === "completed");
    if (activeSteps.some(step => step.status === "completed" && step.title.includes("dispatched"))) {
      setReassuranceMessage("Help is on the way. If possible, stay in a safe and visible location.");
    }
  }, []);

  const progressSteps: ProgressStep[] = [
    {
      id: "1",
      title: "Report received by Call Center",
      status: "completed",
      description: "Emergency call logged and verified",
      completedAt: "7:37 PM",
      subDetails: ["Call center agent: Priya M.", "Incident ID: INC-2025-01834"]
    },
    {
      id: "2", 
      title: "Police notified",
      status: "in-progress",
      eta: 480, // 8 minutes in seconds
      description: "Local police units being dispatched",
      dispatchId: "D45-IND",
      subDetails: ["Dispatch confirmed at 7:39 PM", "Unit assignment in progress"]
    },
    {
      id: "3",
      title: "Rescue team dispatched", 
      status: "pending",
      eta: 1080, // 18 minutes in seconds
      description: "Emergency response team en route"
    },
    {
      id: "4",
      title: "Medics en route",
      status: "pending", 
      eta: 1200, // 20 minutes in seconds
      description: "Medical assistance being arranged",
      subDetails: ["Ambulance from Apollo Hospital"]
    },
    {
      id: "5",
      title: "e-FIR filed",
      status: "pending",
      description: "Digital First Information Report"
    }
  ];

  const assignedUnits: AssignedUnit[] = [
    {
      id: "1",
      name: "Police Unit 12",
      eta: 360, // 6 minutes in seconds
      details: "Vehicle • 4 pax",
      type: "police",
      leadOfficer: "Officer R. Singh",
      vehiclePlate: "HP 09 AB 1234",
      status: "Navigating traffic on MG Road",
      position: { x: 120, y: 80 }
    },
    {
      id: "2",
      name: "Rescue Team A", 
      eta: 720, // 12 minutes in seconds
      details: "Emergency Vehicle • 6 pax",
      type: "rescue",
      leadOfficer: "Team Lead: Amit K.",
      vehiclePlate: "HP 65 CD 5678",
      status: "En route via Hadimba Temple Road",
      position: { x: 200, y: 120 }
    }
  ];

  // Countdown timer utility
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate overall ETA from the earliest unit
  const getOverallETA = () => {
    const earliestUnit = assignedUnits.reduce((min, unit) => unit.eta < min.eta ? unit : min);
    return earliestUnit.eta;
  };

  const getStepIcon = (status: string, step?: ProgressStep) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle 
            className="w-5 h-5 text-green-600"
            style={{
              animation: step?.completedAt ? 'draw-checkmark 0.6s ease-in-out' : 'none'
            }}
          />
        );
      case "in-progress":
        const icon = step?.title?.includes("Police") ? 
          <Siren className="w-5 h-5 text-blue-600" style={{ animation: 'flash 2s infinite' }} /> :
          step?.title?.includes("Medic") ?
          <Heart className="w-5 h-5 text-red-600" style={{ animation: 'pulse 2s infinite' }} /> :
          <Clock className="w-5 h-5 text-blue-600" />;
        return (
          <div className="relative">
            {icon}
            <div 
              className="absolute inset-0 w-5 h-5 rounded-full border-2 border-blue-400 animate-ping"
              style={{ 
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                animation: 'pulse-glow 2s infinite'
              }}
            />
          </div>
        );
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getUnitIcon = (type: string) => {
    const baseClasses = "w-5 h-5";
    const iconElement = () => {
      switch (type) {
        case "police":
          return <Car className={`${baseClasses} text-white`} />;
        case "rescue":
          return <Truck className={`${baseClasses} text-white`} />;
        case "medical":
          return <Shield className={`${baseClasses} text-white`} />;
        default:
          return <Car className={`${baseClasses} text-white`} />;
      }
    };

    const bgColor = type === "police" ? "bg-blue-600" : 
                   type === "rescue" ? "bg-orange-600" : 
                   "bg-red-600";
    
    return (
      <div className={`p-2 ${bgColor} rounded-full shadow-lg`}
           style={{ 
             boxShadow: `0 0 15px ${type === "police" ? "rgba(37, 99, 235, 0.4)" : 
                                    type === "rescue" ? "rgba(234, 88, 12, 0.4)" : 
                                    "rgba(220, 38, 38, 0.4)"}` 
           }}>
        {iconElement()}
      </div>
    );
  };

  const getUnitBackgroundColor = (type: string) => {
    switch (type) {
      case "police": return "bg-blue-50 dark:bg-blue-900/20 border-blue-200";
      case "rescue": return "bg-orange-50 dark:bg-orange-900/20 border-orange-200";
      case "medical": return "bg-red-50 dark:bg-red-900/20 border-red-200";
      default: return "bg-muted/50";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md bg-background/95 border border-white/20 shadow-2xl" data-testid="modal-track-panic">
        {/* Reassurance Banner */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-3 rounded-t-lg border-b">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" />
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              {reassuranceMessage}
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold">Emergency Response Tracker</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              data-testid="button-share-status"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Live Status
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced Top Information Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 px-3 py-1">
                Report ID: REP-LGRRQOWA
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 px-3 py-1">
                Reported at: {incidentTime}
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span 
                className="font-bold text-xl text-yellow-700 dark:text-yellow-400"
                style={{ 
                  textShadow: '0 0 10px rgba(234, 179, 8, 0.3)',
                  animation: 'glow-yellow 2s infinite alternate' 
                }}
              >
                ETA: {formatCountdown(getOverallETA())}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section - Two Column Layout */}
        <div className="px-6 pb-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Live Animated Map */}
            <Card className="glass border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Live Location Tracker
                  <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="physical" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger 
                      value="physical"
                      className="bg-blue-600 text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      data-testid="tab-trigger-physical"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Live View
                    </TabsTrigger>
                    <TabsTrigger value="heatmap" data-testid="tab-trigger-heatmap">
                      <Eye className="w-4 h-4 mr-1" />
                      Heat Map
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="physical">
                    <div 
                      className="relative h-48 bg-cover bg-center rounded-lg overflow-hidden border border-green-300"
                      style={{ 
                        backgroundImage: `url(${manaliMapImg})`,
                        backgroundBlendMode: 'overlay'
                      }}
                    >
                      {/* Live Location Indicator */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                          <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                      </div>
                      
                      {/* Moving Unit Icons */}
                      {assignedUnits.map((unit) => (
                        <div 
                          key={unit.id}
                          className="absolute transition-all duration-3000"
                          style={{
                            left: `${unit.position?.x}px`,
                            top: `${unit.position?.y}px`,
                            animation: `move-${unit.type} 4s ease-in-out infinite`
                          }}
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            unit.type === "police" ? "bg-blue-500" : "bg-orange-500"
                          } shadow-lg`}>
                            <div className="absolute inset-0 rounded-full animate-pulse bg-white opacity-40"></div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Live Status Overlay */}
                      <div className="absolute bottom-2 right-2 bg-green-600/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                          TRACKING LIVE
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="heatmap">
                    <div className="bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-lg h-48 flex items-center justify-center border border-orange-300">
                      <div className="text-center">
                        <Layers className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                        <p className="text-sm text-orange-800 font-medium">Risk Assessment Active</p>
                        <p className="text-xs text-orange-600">Area: Medium Risk Zone</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Right Column - Enhanced Assigned Units */}
            <Card className="glass border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Response Units
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                    {assignedUnits.length} ACTIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedUnits.map((unit) => (
                    <div 
                      key={unit.id}
                      className={`p-4 rounded-lg border ${getUnitBackgroundColor(unit.type)}`}
                      data-testid={`unit-${unit.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getUnitIcon(unit.type)}
                          <div>
                            <p className="font-bold text-lg">{unit.name}</p>
                            <p className="text-sm text-muted-foreground">{unit.details}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full">
                            <p className="font-bold text-lg text-green-600">
                              ETA: {formatCountdown(unit.eta)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Unit Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {unit.leadOfficer}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Vehicle: {unit.vehiclePlate}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground italic">
                          Status: {unit.status}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          data-testid={`button-contact-${unit.id}`}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-track-${unit.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Enhanced Progress Timeline */}
        <div className="px-6 pb-6">
          <Card className="glass border-purple-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Response Progress
                <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs">
                  LIVE UPDATES
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className="flex items-start gap-4"
                    data-testid={`step-${step.id}`}
                  >
                    {/* Enhanced Timeline marker */}
                    <div className="flex flex-col items-center">
                      {getStepIcon(step.status, step)}
                      {index < progressSteps.length - 1 && (
                        <div className={`w-0.5 h-12 mt-3 ${
                          step.status === "completed" ? "bg-green-300" : 
                          step.status === "in-progress" ? "bg-blue-300" : 
                          "bg-gray-200 dark:bg-gray-700"
                        }`}></div>
                      )}
                    </div>
                    
                    {/* Enhanced Step content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className={`font-bold text-lg ${
                            step.status === "completed" ? "text-green-700 dark:text-green-400" :
                            step.status === "in-progress" ? "text-blue-700 dark:text-blue-400" :
                            "text-gray-600 dark:text-gray-400"
                          }`}>
                            {step.title}
                          </h4>
                          {step.status === "completed" && step.completedAt && (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                              ✓ Completed at {step.completedAt}
                            </Badge>
                          )}
                          {step.eta && step.status === "in-progress" && (
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
                              ETA: {formatCountdown(step.eta)}
                            </Badge>
                          )}
                          {step.eta && step.status === "pending" && (
                            <Badge variant="outline" className="text-xs">
                              ETA: {formatCountdown(step.eta)}
                            </Badge>
                          )}
                        </div>
                        {step.firNumber && (
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                            e-FIR #{step.firNumber}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      
                      {/* Sub-details */}
                      {step.subDetails && step.subDetails.length > 0 && (
                        <div className="bg-muted/30 rounded-lg p-3 mt-2">
                          <ul className="space-y-1">
                            {step.subDetails.map((detail, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 bg-current rounded-full"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.dispatchId && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            Dispatch ID: {step.dispatchId}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What to Do Next Section */}
        <div className="px-6 pb-6">
          <Collapsible open={showWhatToDo} onOpenChange={setShowWhatToDo}>
            <Card className="glass border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/20">
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-yellow-100/50 dark:hover:bg-yellow-800/20 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      What to Do Next
                    </div>
                    {showWhatToDo ? 
                      <ChevronUp className="w-5 h-5 text-yellow-600" /> : 
                      <ChevronDown className="w-5 h-5 text-yellow-600" />
                    }
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="bg-white/70 dark:bg-black/20 rounded-lg p-4">
                      <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        Communication Guidelines
                      </h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          Keep your phone line free for incoming calls from authorities
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          Answer calls from numbers starting with 100 (Police) or 108 (Emergency Services)
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/70 dark:bg-black/20 rounded-lg p-4">
                      <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        Safety Instructions
                      </h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          Stay in a safe and visible location if possible
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          Do not engage with strangers or unknown individuals
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          If in a vehicle, turn on your hazard lights
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/70 dark:bg-black/20 rounded-lg p-4">
                      <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        Documentation Ready
                      </h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        Have your identification documents ready when help arrives
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">Valid Photo ID</Badge>
                        <Badge variant="outline" className="text-xs">Travel Documents</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
}