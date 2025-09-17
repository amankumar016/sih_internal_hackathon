import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Phone
} from "lucide-react";

interface TrackPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProgressStep {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  eta?: string;
  description?: string;
}

interface AssignedUnit {
  id: string;
  name: string;
  eta: string;
  details: string;
  type: "police" | "rescue" | "medical";
}

export default function TrackPanicModal({ isOpen, onClose }: TrackPanicModalProps) {
  const progressSteps: ProgressStep[] = [
    {
      id: "1",
      title: "Report received by Call Center",
      status: "completed",
      description: "Emergency call logged and verified"
    },
    {
      id: "2", 
      title: "Police notified",
      status: "in-progress",
      eta: "5-8 mins",
      description: "Local police units being dispatched"
    },
    {
      id: "3",
      title: "Rescue team dispatched", 
      status: "pending",
      eta: "12-18 mins",
      description: "Emergency response team en route"
    },
    {
      id: "4",
      title: "Medics en route",
      status: "pending", 
      eta: "15-20 mins",
      description: "Medical assistance being arranged"
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
      eta: "6 mins",
      details: "Vehicle • 4 pax",
      type: "police"
    },
    {
      id: "2",
      name: "Rescue Team A", 
      eta: "12 mins",
      details: "Emergency Vehicle • 6 pax",
      type: "rescue"
    }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getUnitIcon = (type: string) => {
    switch (type) {
      case "police":
        return <Car className="w-5 h-5 text-blue-600" />;
      case "rescue":
        return <Truck className="w-5 h-5 text-orange-600" />;
      case "medical":
        return <Shield className="w-5 h-5 text-red-600" />;
      default:
        return <Car className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass" data-testid="modal-track-panic">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold">Track Request</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Top Information Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                Report ID: REP-LGRRQOWA
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-lg">ETA: ~15 mins</span>
            </div>
          </div>
        </div>

        {/* Middle Section - Two Column Layout */}
        <div className="px-6 pb-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Map Snapshot */}
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Map Snapshot
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
                      Physical
                    </TabsTrigger>
                    <TabsTrigger value="heatmap" data-testid="tab-trigger-heatmap">
                      Heat Map
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="physical">
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center border">
                      <div className="text-center">
                        <Map className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Physical map with live location</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="heatmap">
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center border">
                      <div className="text-center">
                        <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Heat map overlay</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Right Column - Assigned Units */}
            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Assigned Units
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedUnits.map((unit) => (
                    <div 
                      key={unit.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      data-testid={`unit-${unit.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-full">
                          {getUnitIcon(unit.type)}
                        </div>
                        <div>
                          <p className="font-medium">{unit.name}</p>
                          <p className="text-sm text-muted-foreground">{unit.details}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">ETA: {unit.eta}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="mt-1"
                          data-testid={`button-contact-${unit.id}`}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Progress Timeline */}
        <div className="px-6 pb-6">
          <Card className="glass">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className="flex items-start gap-4"
                    data-testid={`step-${step.id}`}
                  >
                    {/* Timeline marker */}
                    <div className="flex flex-col items-center">
                      {getStepIcon(step.status)}
                      {index < progressSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className={`font-medium ${
                          step.status === "completed" ? "text-green-700 dark:text-green-400" :
                          step.status === "in-progress" ? "text-blue-700 dark:text-blue-400" :
                          "text-gray-600 dark:text-gray-400"
                        }`}>
                          {step.title}
                        </h4>
                        {step.eta && (
                          <Badge variant="outline" className="text-xs">
                            {step.eta}
                          </Badge>
                        )}
                      </div>
                      {step.description && (
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}