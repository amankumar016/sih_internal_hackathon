import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, MapPin, User } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Meghalaya_waterfall_hero_background_52ebdbd8.png";

const touristLoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  contactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  emergencyContact: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid emergency contact number"),
});

type TouristLoginForm = z.infer<typeof touristLoginSchema>;

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const touristForm = useForm<TouristLoginForm>({
    resolver: zodResolver(touristLoginSchema),
    defaultValues: {
      username: "",
      contactNumber: "",
      emergencyContact: "",
    },
  });

  const onTouristSubmit = async (data: TouristLoginForm) => {
    console.log("Tourist login attempt from homepage:", data);
    
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

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              SafeTrip
            </span>
            <span className="block text-destructive text-3xl md:text-4xl mt-2">
              Emergency SOS
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Smart Tourist Safety & Incident Response System
          </p>
          
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Advanced AI-powered safety platform protecting travelers across India
          </p>
        </div>

        {/* Tourist Login */}
        <Card className="glass border-white/20 max-w-md mx-auto" data-testid="card-tourist-login">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <User className="w-6 h-6 mr-2 text-white" />
              <h3 className="text-lg font-semibold text-white">Tourist Login</h3>
            </div>
            
            <form onSubmit={touristForm.handleSubmit(onTouristSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homepage-username" className="text-white text-sm font-medium">Username</Label>
                <Input
                  id="homepage-username"
                  {...touristForm.register("username")}
                  placeholder="Enter your username"
                  className="bg-white/10 text-white border-white/30 focus:border-white/60 placeholder:text-gray-300"
                  data-testid="input-homepage-username"
                />
                {touristForm.formState.errors.username && (
                  <p className="text-sm text-destructive font-medium">{touristForm.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="homepage-contact" className="text-white text-sm font-medium">Contact Number</Label>
                <Input
                  id="homepage-contact"
                  {...touristForm.register("contactNumber")}
                  placeholder="Enter your mobile number"
                  className="bg-white/10 text-white border-white/30 focus:border-white/60 placeholder:text-gray-300"
                  data-testid="input-homepage-contact"
                />
                {touristForm.formState.errors.contactNumber && (
                  <p className="text-sm text-destructive font-medium">{touristForm.formState.errors.contactNumber.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="homepage-emergency" className="text-white text-sm font-medium">Emergency Contact</Label>
                <Input
                  id="homepage-emergency"
                  {...touristForm.register("emergencyContact")}
                  placeholder="Enter emergency contact number"
                  className="bg-white/10 text-white border-white/30 focus:border-white/60 placeholder:text-gray-300"
                  data-testid="input-homepage-emergency"
                />
                {touristForm.formState.errors.emergencyContact && (
                  <p className="text-sm text-destructive font-medium">{touristForm.formState.errors.emergencyContact.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-trust text-trust-foreground hover:bg-trust/90 h-12 font-semibold"
                disabled={touristForm.formState.isSubmitting}
                data-testid="button-homepage-tourist-login"
              >
                {touristForm.formState.isSubmitting ? "Logging In..." : "Login"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
            
            <div className="flex items-center justify-center gap-4 pt-4 mt-4 border-t border-white/20">
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 mr-1" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-1" />
                <span>GPS Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Started button moved to login page as "Tourist Login" */}
      </div>
    </section>
  );
}