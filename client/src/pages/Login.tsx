import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield, Phone, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  touristId: z.string().min(8, "Tourist ID is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showTouristId, setShowTouristId] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("Login attempt:", data);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to your GUARD account.",
      duration: 3000,
    });
    
    // Navigate to dashboard
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  };

  const handleQuickEmergencyAccess = () => {
    console.log("Quick emergency access triggered");
    toast({
      title: "Emergency Access Activated",
      description: "Voice and text emergency features are now active.",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-trust rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome to GUARD</h1>
            <p className="text-muted-foreground">Smart Tourist Safety Platform</p>
          </div>
        </div>

        {/* Emergency Access Banner */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Emergency Access</h3>
                  <p className="text-xs text-muted-foreground">Available without login</p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleQuickEmergencyAccess}
                data-testid="button-emergency-access"
              >
                Access Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Registered Phone Number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="Enter your mobile number"
                  data-testid="input-phone-login"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="touristId">Tourist ID</Label>
                <div className="relative">
                  <Input
                    id="touristId"
                    type={showTouristId ? "text" : "password"}
                    {...register("touristId")}
                    placeholder="Enter your GUARD Tourist ID"
                    data-testid="input-tourist-id"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowTouristId(!showTouristId)}
                    data-testid="button-toggle-tourist-id"
                  >
                    {showTouristId ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.touristId && (
                  <p className="text-sm text-destructive mt-1">{errors.touristId.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Format: GRD-2025-XX-XXXX
                </p>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-testid="button-sign-in"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-4 space-y-4">
              <Separator />
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Don't have a Digital Tourist ID?
                </p>
                <Link href="/registration">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-register"
                  >
                    Register for Tourist ID
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Need Help?</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" data-testid="button-forgot-id">
                  <Mail className="w-4 h-4 mr-2" />
                  Forgot ID
                </Button>
                <Button variant="outline" size="sm" data-testid="button-support">
                  <Phone className="w-4 h-4 mr-2" />
                  Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}