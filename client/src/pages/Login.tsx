import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Phone, Mail, User, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const touristLoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  emergencyContact: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid emergency contact number"),
});

const authorityLoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  identityNumber: z.string().min(6, "Identity number is required"),
});

type TouristLoginForm = z.infer<typeof touristLoginSchema>;
type AuthorityLoginForm = z.infer<typeof authorityLoginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("tourist");
  const { toast } = useToast();
  
  const touristForm = useForm<TouristLoginForm>({
    resolver: zodResolver(touristLoginSchema),
    defaultValues: {
      username: "",
      contactNumber: "",
      emergencyContact: "",
    },
  });

  const authorityForm = useForm<AuthorityLoginForm>({
    resolver: zodResolver(authorityLoginSchema),
    defaultValues: {
      username: "",
      contactNumber: "",
      identityNumber: "",
    },
  });

  const onTouristSubmit = async (data: TouristLoginForm) => {
    console.log("Tourist login attempt:", data);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    toast({
      title: "Welcome Tourist!",
      description: "Successfully logged in to your GUARD account.",
      duration: 3000,
    });
    
    // Navigate to dashboard
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  };

  const onAuthoritySubmit = async (data: AuthorityLoginForm) => {
    console.log("Authority login attempt:", data);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    toast({
      title: "Welcome Authority!",
      description: "Successfully logged in to your GUARD admin account.",
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
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sign Up</h1>
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
                  <h3 className="font-medium text-sm text-foreground">Emergency Access</h3>
                  <p className="text-xs text-foreground/70">Available without login</p>
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

        {/* Sign Up Form */}
        <Card className="bg-card border-card-border">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-foreground">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="tourist" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Tourist
                </TabsTrigger>
                <TabsTrigger value="authority" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Authority
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tourist">
                <form onSubmit={touristForm.handleSubmit(onTouristSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="tourist-username" className="text-foreground">Username</Label>
                    <Input
                      id="tourist-username"
                      {...touristForm.register("username")}
                      placeholder="Enter your username"
                      className="bg-background text-foreground"
                      data-testid="input-tourist-username"
                    />
                    {touristForm.formState.errors.username && (
                      <p className="text-sm text-destructive mt-1">{touristForm.formState.errors.username.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="tourist-contact" className="text-foreground">Contact Number</Label>
                    <Input
                      id="tourist-contact"
                      {...touristForm.register("contactNumber")}
                      placeholder="Enter your mobile number"
                      className="bg-background text-foreground"
                      data-testid="input-tourist-contact"
                    />
                    {touristForm.formState.errors.contactNumber && (
                      <p className="text-sm text-destructive mt-1">{touristForm.formState.errors.contactNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="tourist-emergency" className="text-foreground">Emergency Contact</Label>
                    <Input
                      id="tourist-emergency"
                      {...touristForm.register("emergencyContact")}
                      placeholder="Enter emergency contact number"
                      className="bg-background text-foreground"
                      data-testid="input-tourist-emergency"
                    />
                    {touristForm.formState.errors.emergencyContact && (
                      <p className="text-sm text-destructive mt-1">{touristForm.formState.errors.emergencyContact.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground"
                    disabled={touristForm.formState.isSubmitting}
                    data-testid="button-tourist-login"
                  >
                    {touristForm.formState.isSubmitting ? "Logging In..." : "Tourist Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="authority">
                <form onSubmit={authorityForm.handleSubmit(onAuthoritySubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="authority-username" className="text-foreground">Username</Label>
                    <Input
                      id="authority-username"
                      {...authorityForm.register("username")}
                      placeholder="Enter your username"
                      className="bg-background text-foreground"
                      data-testid="input-authority-username"
                    />
                    {authorityForm.formState.errors.username && (
                      <p className="text-sm text-destructive mt-1">{authorityForm.formState.errors.username.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="authority-contact" className="text-foreground">Contact Number</Label>
                    <Input
                      id="authority-contact"
                      {...authorityForm.register("contactNumber")}
                      placeholder="Enter your mobile number"
                      className="bg-background text-foreground"
                      data-testid="input-authority-contact"
                    />
                    {authorityForm.formState.errors.contactNumber && (
                      <p className="text-sm text-destructive mt-1">{authorityForm.formState.errors.contactNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="authority-identity" className="text-foreground">Identity Number</Label>
                    <Input
                      id="authority-identity"
                      {...authorityForm.register("identityNumber")}
                      placeholder="Enter your identity number"
                      className="bg-background text-foreground"
                      data-testid="input-authority-identity"
                    />
                    {authorityForm.formState.errors.identityNumber && (
                      <p className="text-sm text-destructive mt-1">{authorityForm.formState.errors.identityNumber.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground"
                    disabled={authorityForm.formState.isSubmitting}
                    data-testid="button-authority-login"
                  >
                    {authorityForm.formState.isSubmitting ? "Logging In..." : "Authority Login"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 space-y-4">
              <Separator />
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Already have an account?
                </p>
                <Link href="/registration">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-register"
                  >
                    Go to Registration
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
              <h4 className="font-medium text-sm text-foreground">Need Help?</h4>
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