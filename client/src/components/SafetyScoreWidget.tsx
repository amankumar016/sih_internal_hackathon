import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Clock } from "lucide-react";

interface SafetyScoreWidgetProps {
  score: number;
  location: string;
  lastUpdated: string;
}

export default function SafetyScoreWidget({ score, location, lastUpdated }: SafetyScoreWidgetProps) {
  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-success";
    if (score <= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreStatus = (score: number) => {
    if (score <= 30) return "Safe";
    if (score <= 70) return "Caution";
    return "High Risk";
  };

  const getProgressColor = (score: number) => {
    if (score <= 30) return "bg-success";
    if (score <= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card className="relative overflow-hidden" data-testid="widget-safety-score">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-trust" />
            <span>Safety Score</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{location}</span>
            <span className={`font-medium ${getScoreColor(score)}`}>
              {getScoreStatus(score)}
            </span>
          </div>
          <Progress 
            value={score} 
            className="h-3"
            data-testid="progress-safety-score"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Updated {lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2 text-success">
            <TrendingUp className="w-4 h-4" />
            <span>Improving</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Based on real-time data from police reports, weather conditions, and community feedback
          </p>
        </div>
      </CardContent>
    </Card>
  );
}