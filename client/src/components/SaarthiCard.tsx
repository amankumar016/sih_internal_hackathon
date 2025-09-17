import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, TrendingUp, Shield } from "lucide-react";
import { Link } from "wouter";

export default function SaarthiCard() {
  const features = [
    { icon: Brain, label: "AI Risk Analysis", color: "text-trust" },
    { icon: Shield, label: "Real-time Protection", color: "text-success" },
    { icon: TrendingUp, label: "Predictive Insights", color: "text-warning" },
    { icon: Zap, label: "Instant Response", color: "text-destructive" }
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-trust/5 to-purple-500/5" data-testid="card-saarthi">
      <div className="absolute inset-0 bg-gradient-to-br from-trust/5 to-transparent"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Brain className="w-6 h-6 text-trust" />
            <div className="absolute inset-0 animate-pulse bg-trust/20 rounded-full blur-sm"></div>
          </div>
          <span>Meet Saarthi</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Your Personal Safety Co-pilot</p>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <p className="text-sm">
          Advanced AI analyzing millions of data points to predict and prevent risks in real-time
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, label, color }, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
        
        <Link href="/saarthi">
          <Button 
            className="w-full bg-trust text-trust-foreground hover:bg-trust/90"
            data-testid="button-access-saarthi"
          >
            <Brain className="w-4 h-4 mr-2" />
            Access Saarthi Features
          </Button>
        </Link>
        
        <div className="text-xs text-muted-foreground text-center">
          Powered by Neural Networks & Machine Learning
        </div>
      </CardContent>
    </Card>
  );
}