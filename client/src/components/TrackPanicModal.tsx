import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Activity,
  Zap,
  Radar,
  Radio,
  ShieldCheck,
  HeartHandshake,
  CarFront,
  TruckIcon
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
  timestamp?: string;
  dispatchId?: string;
  firNumber?: string;
}

interface AssignedUnit {
  id: string;
  name: string;
  eta: number; // Seconds for countdown
  etaInitial: number; // Initial ETA for progress calculation
  details: string;
  type: "police" | "rescue" | "medical";
  leadOfficer?: string;
  vehiclePlate?: string;
  status?: string;
  position?: { x: number; y: number };
  priority: "high" | "medium" | "low";
  comms: {
    radio: boolean;
    gps: boolean;
  };
  equipment: {
    ready: boolean;
    medKit?: boolean;
    hydraulic?: boolean;
    defib?: boolean;
  };
}

export default function TrackPanicModal({ isOpen, onClose }: TrackPanicModalProps) {
  // State for live countdown timers
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showWhatToDo, setShowWhatToDo] = useState(false);
  const [incidentTime] = useState("7:37 PM");
  const [reassuranceMessage, setReassuranceMessage] = useState("Your alert has been received. Help is being coordinated.");
  
  // Initialize unit ETAs state (will be set after assignedUnits is declared)
  const [unitETAs, setUnitETAs] = useState<{[key: string]: number}>({});
  
  // Initialize unit ETAs from assignedUnits
  useEffect(() => {
    const initialETAs: {[key: string]: number} = {};
    assignedUnits.forEach(unit => {
      initialETAs[unit.id] = unit.eta;
    });
    setUnitETAs(initialETAs);
  }, []);

  // Update time every second for live countdowns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      // Update unit ETAs (countdown)
      setUnitETAs(prevETAs => {
        const newETAs = { ...prevETAs };
        Object.keys(newETAs).forEach(unitId => {
          if (newETAs[unitId] > 0) {
            newETAs[unitId] = Math.max(0, newETAs[unitId] - 1);
          }
        });
        return newETAs;
      });
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
      timestamp: "17-Sep-2025 19:37:42 IST",
      dispatchId: "CALL-HP-7837",
      subDetails: [
        "Call center agent: Priya M. (ID: CCR-4521)",
        "Incident ID: INC-2025-01834",
        "Call duration: 3 min 24 sec",
        "Location verified via GPS coordinates"
      ]
    },
    {
      id: "2", 
      title: "Police notified",
      status: "in-progress",
      eta: 480, // 8 minutes in seconds
      description: "Local police units being dispatched",
      timestamp: "17-Sep-2025 19:39:15 IST",
      dispatchId: "D45-IND-POL",
      subDetails: [
        "Dispatch confirmed at 7:39 PM",
        "Unit assignment: Patrol Car HP-02-MN-5847",
        "Officer in charge: SI Rajesh Kumar",
        "Radio frequency: CH-7 (139.650 MHz)"
      ]
    },
    {
      id: "3",
      title: "Rescue team dispatched", 
      status: "pending",
      eta: 1080, // 18 minutes in seconds
      description: "Emergency response team en route",
      dispatchId: "D45-IND-RSC",
      subDetails: [
        "Waiting for unit confirmation",
        "Team leader: Inspector Amit Singh",
        "Equipment status: Ready",
        "Estimated response time: 18 minutes"
      ]
    },
    {
      id: "4",
      title: "Medics en route",
      status: "pending", 
      eta: 1200, // 20 minutes in seconds
      description: "Medical assistance being arranged",
      dispatchId: "D45-IND-MED",
      subDetails: [
        "Ambulance: Apollo Hospital Unit-7",
        "Paramedic team: Dr. Sarah & Nurse Meera",
        "Medical equipment: Trauma kit & oxygen",
        "Hospital notification: AIIMS Rishikesh"
      ]
    },
    {
      id: "5",
      title: "e-FIR filed",
      status: "pending",
      description: "Digital First Information Report being processed",
      firNumber: "FIR-HP-2025-091723",
      dispatchId: "LGL-HP-4492",
      subDetails: [
        "Filing officer: ASI Mohan Lal",
        "Station: Manali Police Station",
        "Document ID: eFIR-25-091723-1837",
        "Status: Awaiting victim statement"
      ]
    }
  ];

  const assignedUnits: AssignedUnit[] = [
    {
      id: "1",
      name: "Police Unit 12",
      eta: 360, // 6 minutes in seconds
      etaInitial: 480, // Initial ETA was 8 minutes
      details: "Patrol Vehicle • 4 Officers",
      type: "police",
      leadOfficer: "Inspector R. Singh (8 years exp.)",
      vehiclePlate: "HP 09 AB 1234",
      status: "Navigating traffic on MG Road - 2.3km away",
      position: { x: 120, y: 80 },
      priority: "high",
      comms: {
        radio: true,
        gps: true
      },
      equipment: {
        ready: true,
        medKit: true
      }
    },
    {
      id: "2",
      name: "Rescue Team A", 
      eta: 720, // 12 minutes in seconds
      etaInitial: 900, // Initial ETA was 15 minutes
      details: "Emergency Response • 6 Personnel",
      type: "rescue",
      leadOfficer: "Team Lead: Amit K. (12 years exp.)",
      vehiclePlate: "HP 65 CD 5678",
      status: "En route via Hadimba Temple Road - 4.1km away",
      position: { x: 200, y: 120 },
      priority: "medium",
      comms: {
        radio: true,
        gps: true
      },
      equipment: {
        ready: true,
        hydraulic: true,
        medKit: true
      }
    }
  ];

  // Countdown timer utility
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate overall ETA from the earliest unit (using live data)
  const getOverallETA = () => {
    const activeUnits = assignedUnits.filter(unit => unitETAs[unit.id] > 0);
    if (activeUnits.length === 0) return 0;
    const earliestETA = Math.min(...activeUnits.map(unit => unitETAs[unit.id] || unit.eta));
    return earliestETA;
  };

  // Get contextual priority based on ETA remaining
  const getUnitPriority = (unit: AssignedUnit): "high" | "medium" | "low" => {
    const remainingETA = unitETAs[unit.id] || unit.eta;
    if (remainingETA <= 300) return "high"; // Less than 5 minutes
    if (remainingETA <= 600) return "medium"; // Less than 10 minutes
    return "low";
  };

  // Calculate progress percentage for each unit
  const getUnitProgress = (unit: AssignedUnit): number => {
    const remainingETA = unitETAs[unit.id] || unit.eta;
    const progressPercent = Math.max(0, ((unit.etaInitial - remainingETA) / unit.etaInitial) * 100);
    return Math.min(100, progressPercent);
  };

  const getStepIcon = (status: string, step?: ProgressStep) => {
    switch (status) {
      case "completed":
        return (
          <div className="relative">
            {/* Enhanced completed checkmark with success glow */}
            <div 
              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
              style={{
                animation: step?.completedAt ? 'success-check-draw 0.8s ease-in-out' : 'none',
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
              }}
            >
              <CheckCircle 
                className="w-4 h-4 text-white"
                style={{
                  animation: step?.completedAt ? 'success-check-draw 0.6s 0.2s ease-in-out backwards' : 'none'
                }}
              />
            </div>
            {/* Success completion rings */}
            <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-40" style={{animationDelay: '0.1s'}}></div>
            <div className="absolute -inset-1 w-8 h-8 bg-green-300 rounded-full animate-ping opacity-20" style={{animationDelay: '0.3s'}}></div>
          </div>
        );
      case "in-progress":
        const icon = step?.title?.includes("Police") ? 
          <ShieldCheck className="w-4 h-4 text-blue-600" style={{ animation: 'flash 1.5s infinite' }} /> :
          step?.title?.includes("Medic") ?
          <HeartHandshake className="w-4 h-4 text-red-600" style={{ animation: 'heartbeat 1.8s infinite' }} /> :
          step?.title?.includes("Rescue") ?
          <Zap className="w-4 h-4 text-orange-600" style={{ animation: 'emergency-pulse 2s infinite' }} /> :
          step?.title?.includes("FIR") || step?.title?.includes("filed") ?
          <FileText className="w-4 h-4 text-purple-600" style={{ animation: 'tick-pulse 2s infinite' }} /> :
          <Radio className="w-4 h-4 text-blue-600" style={{ animation: 'tick-pulse 2s infinite' }} />;
        
        return (
          <div className="relative">
            {/* Enhanced active status indicator */}
            <div 
              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg relative overflow-visible"
              style={{
                animation: 'active-status-pulse 2s infinite',
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.9), inset 0 0 8px rgba(255,255,255,0.2)'
              }}
            >
              {icon}
            </div>
            
            {/* Multi-layer pulsing rings for active status */}
            <div 
              className="absolute inset-0 w-6 h-6 rounded-full border-2 border-blue-400"
              style={{ animation: 'active-ring-1 2s infinite' }}
            />
            <div 
              className="absolute -inset-1 w-8 h-8 rounded-full border border-blue-300"
              style={{ animation: 'active-ring-2 2s infinite 0.5s' }}
            />
            <div 
              className="absolute -inset-2 w-10 h-10 rounded-full border border-blue-200 opacity-60"
              style={{ animation: 'active-ring-3 2s infinite 1s' }}
            />
            
            {/* Activity indicator dots */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        );
      case "pending":
        return (
          <div className="relative">
            {/* Enhanced pending status with subtle animations */}
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-gray-200 dark:border-gray-500 flex items-center justify-center">
              <Circle className="w-3 h-3 text-gray-500 dark:text-gray-400" />
            </div>
            {/* Subtle waiting pulse */}
            <div 
              className="absolute inset-0 w-6 h-6 bg-gray-200 dark:bg-gray-500 rounded-full opacity-30"
              style={{ animation: 'waiting-pulse 4s infinite' }}
            />
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-200 flex items-center justify-center">
            <Circle className="w-3 h-3 text-gray-500" />
          </div>
        );
    }
  };

  const getUnitIcon = (type: string) => {
    const baseClasses = "w-5 h-5";
    const iconElement = () => {
      switch (type) {
        case "police":
          return <ShieldCheck className={`${baseClasses} text-white`} style={{ animation: 'flash 2s infinite' }} />;
        case "rescue":
          return <Zap className={`${baseClasses} text-white`} style={{ animation: 'emergency-pulse 1.8s infinite' }} />;
        case "medical":
          return <HeartHandshake className={`${baseClasses} text-white`} style={{ animation: 'heartbeat 2s infinite' }} />;
        default:
          return <ShieldCheck className={`${baseClasses} text-white`} />;
      }
    };

    const bgColor = type === "police" ? "bg-blue-600" : 
                   type === "rescue" ? "bg-orange-600" : 
                   "bg-red-600";
    
    const glowColor = type === "police" ? "rgba(37, 99, 235, 0.6)" : 
                     type === "rescue" ? "rgba(234, 88, 12, 0.6)" : 
                     "rgba(220, 38, 38, 0.6)";
    
    return (
      <div 
        className={`p-2 ${bgColor} rounded-full shadow-lg relative overflow-visible`}
        style={{ 
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px rgba(255,255,255,0.1)`,
          animation: 'pulse-glow 3s infinite'
        }}
      >
        {iconElement()}
        {/* Enhanced glow ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-white/30"
          style={{ 
            boxShadow: `0 0 25px ${glowColor}`,
            animation: 'directional-pulse 2.5s infinite' 
          }}
        />
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
                      {/* Enhanced Live Location Indicator with Multi-Ring Pulse */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          {/* Core location pin */}
                          <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-xl z-10 relative">
                            <div className="absolute inset-1 bg-red-600 rounded-full animate-pulse"></div>
                          </div>
                          {/* Multi-layer pulse rings */}
                          <div className="absolute inset-0 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-75"></div>
                          <div className="absolute -inset-1 w-7 h-7 bg-red-300 rounded-full animate-ping opacity-50" style={{animationDelay: '0.5s'}}></div>
                          <div className="absolute -inset-2 w-9 h-9 bg-red-200 rounded-full animate-ping opacity-25" style={{animationDelay: '1s'}}></div>
                          {/* Glow effect */}
                          <div className="absolute -inset-3 w-11 h-11 bg-red-500 rounded-full opacity-20 blur-sm animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Moving Unit Icons with Trails */}
                      {assignedUnits.map((unit, index) => (
                        <div 
                          key={unit.id}
                          className="absolute"
                          style={{
                            left: `${unit.position?.x}px`,
                            top: `${unit.position?.y}px`,
                            animation: `realistic-move-${index + 1} 6s ease-in-out infinite`
                          }}
                        >
                          {/* Movement trail effect */}
                          <div className={`absolute inset-0 w-6 h-6 rounded-full ${
                            unit.type === "police" ? "bg-blue-400" : "bg-orange-400"
                          } opacity-20 animate-ping`} style={{animationDelay: '0.2s'}}></div>
                          <div className={`absolute inset-0 w-4 h-4 rounded-full ${
                            unit.type === "police" ? "bg-blue-300" : "bg-orange-300"
                          } opacity-40 animate-ping`} style={{animationDelay: '0.1s'}}></div>
                          
                          {/* Main unit icon with enhanced styling */}
                          <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-xl ${
                            unit.type === "police" ? "bg-blue-600" : "bg-orange-600"
                          }`} style={{
                            boxShadow: `0 0 12px ${unit.type === "police" ? "rgba(37, 99, 235, 0.6)" : "rgba(234, 88, 12, 0.6)"}`
                          }}>
                            {/* Inner glow */}
                            <div className={`absolute inset-1 rounded-full ${
                              unit.type === "police" ? "bg-blue-300" : "bg-orange-300"
                            } animate-pulse opacity-80`}></div>
                            
                            {/* Direction indicator arrow */}
                            <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent ${
                              unit.type === "police" ? "border-b-blue-200" : "border-b-orange-200"
                            }`} style={{
                              animation: `directional-pulse 2s ease-in-out infinite`
                            }}></div>
                          </div>
                          
                          {/* Unit label that follows */}
                          <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold px-2 py-1 rounded ${
                            unit.type === "police" ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                          } shadow-lg whitespace-nowrap`}>
                            {unit.name}
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
                      className={`p-5 rounded-lg border-2 ${getUnitBackgroundColor(unit.type)} hover-elevate transition-all duration-200`}
                      data-testid={`unit-${unit.id}`}
                      style={{
                        boxShadow: `0 4px 12px ${unit.type === "police" ? "rgba(37, 99, 235, 0.15)" : 
                                                  unit.type === "rescue" ? "rgba(234, 88, 12, 0.15)" : 
                                                  "rgba(220, 38, 38, 0.15)"}`
                      }}
                    >
                      {/* Header Section with Priority Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getUnitIcon(unit.type)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-xl">{unit.name}</p>
                              <Badge 
                                variant="outline" 
                                className={`text-xs font-semibold ${
                                  getUnitPriority(unit) === "high" ? "bg-red-100 text-red-800 border-red-300" :
                                  getUnitPriority(unit) === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                                  "bg-green-100 text-green-800 border-green-300"
                                }`}
                              >
                                {getUnitPriority(unit).toUpperCase()} PRIORITY
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{unit.details}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div 
                            className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 px-4 py-2 rounded-lg border border-green-300 relative overflow-visible"
                            style={{
                              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 10px rgba(34, 197, 94, 0.1)',
                              animation: 'pulse-glow 3s infinite'
                            }}
                          >
                            <p className="text-xs text-green-700 dark:text-green-300 font-medium">ETA</p>
                            <p 
                              className="font-bold text-xl text-green-600 dark:text-green-400"
                              style={{
                                textShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
                                animation: 'glow-yellow 2.5s infinite alternate'
                              }}
                            >
                              {formatCountdown(unitETAs[unit.id] || unit.eta)}
                            </p>
                            {/* Enhanced glow ring */}
                            <div 
                              className="absolute inset-0 rounded-lg border-2 border-green-300/40"
                              style={{ 
                                boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)',
                                animation: 'directional-pulse 2s infinite' 
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Responder Information Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground font-medium">Lead Officer</p>
                          <p className="text-sm font-bold">{unit.leadOfficer}</p>
                        </div>
                        <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground font-medium">Vehicle Plate</p>
                          <p className="text-sm font-bold">{unit.vehiclePlate}</p>
                        </div>
                      </div>

                      {/* Operational Status with Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            unit.type === "police" ? "bg-blue-500" : 
                            unit.type === "rescue" ? "bg-orange-500" : "bg-red-500"
                          }`}></div>
                          <p className="text-xs text-muted-foreground font-medium">OPERATIONAL STATUS</p>
                        </div>
                        <p className="text-sm font-semibold mb-2">{unit.status}</p>
                        
                        {/* Dynamic Progress visualization */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress to destination</span>
                            <span>{Math.round(getUnitProgress(unit))}%</span>
                          </div>
                          <Progress 
                            value={getUnitProgress(unit)} 
                            className="h-2"
                            style={{ animation: 'progress-pulse 2s infinite' }}
                          />
                        </div>
                      </div>

                      {/* Dynamic Communication & Equipment Info */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center bg-white/40 dark:bg-black/10 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Radio</p>
                          <div className="flex items-center justify-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${unit.comms.radio ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <span className="text-xs font-bold">{unit.comms.radio ? 'ACTIVE' : 'OFFLINE'}</span>
                          </div>
                        </div>
                        <div className="text-center bg-white/40 dark:bg-black/10 p-2 rounded">
                          <p className="text-xs text-muted-foreground">GPS</p>
                          <div className="flex items-center justify-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${unit.comms.gps ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <span className="text-xs font-bold">{unit.comms.gps ? 'LOCKED' : 'SEARCHING'}</span>
                          </div>
                        </div>
                        <div className="text-center bg-white/40 dark:bg-black/10 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Equipment</p>
                          <div className="flex items-center justify-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${unit.equipment.ready ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                            <span className="text-xs font-bold">{unit.equipment.ready ? 'READY' : 'PREP'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                          data-testid={`button-contact-${unit.id}`}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 hover:bg-green-50 hover:border-green-300"
                          data-testid={`button-track-${unit.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Track
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 hover:bg-purple-50 hover:border-purple-300"
                          data-testid={`button-message-${unit.id}`}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Msg
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
                      
                      {/* Full timestamp for official tracking */}
                      {step.timestamp && (
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs text-gray-600 bg-gray-50">
                            📅 {step.timestamp}
                          </Badge>
                        </div>
                      )}
                      
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