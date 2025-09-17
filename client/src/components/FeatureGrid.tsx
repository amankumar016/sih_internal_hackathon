import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  GamepadIcon, 
  Bot, 
  Settings, 
  MessageCircle,
  Mic,
  CreditCard,
  HelpCircle
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  color: string;
  action: string;
}

const features: Feature[] = [
  {
    icon: Users,
    label: "Community Forum",
    description: "Connect with travelers",
    color: "text-trust",
    action: "community"
  },
  {
    icon: MessageSquare,
    label: "Real-time Chat",
    description: "Chat with guardians",
    color: "text-success",
    action: "chat"
  },
  {
    icon: GamepadIcon,
    label: "Guardian Gamification",
    description: "Earn safety points",
    color: "text-warning",
    action: "gamification"
  },
  {
    icon: Bot,
    label: "AI Guide",
    description: "Smart recommendations",
    color: "text-success",
    action: "ai-guide"
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Privacy & preferences",
    color: "text-muted-foreground",
    action: "settings"
  },
  {
    icon: MessageCircle,
    label: "Feedback",
    description: "Share your experience",
    color: "text-trust",
    action: "feedback"
  },
  {
    icon: Mic,
    label: "Voice Emergency",
    description: "Voice-text access",
    color: "text-destructive",
    action: "voice-emergency"
  },
  {
    icon: CreditCard,
    label: "Issue Digital ID",
    description: "Generate at kiosk",
    color: "text-warning",
    action: "digital-id"
  },
];

export default function FeatureGrid() {
  const handleFeatureClick = (action: string) => {
    console.log(`Feature clicked: ${action}`);
  };

  return (
    <Card data-testid="grid-features">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-3 hover-elevate"
                onClick={() => handleFeatureClick(feature.action)}
                data-testid={`button-feature-${feature.action}`}
              >
                <div className={`${feature.color} p-2 rounded-lg bg-background/50`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{feature.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {feature.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}