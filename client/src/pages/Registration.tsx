import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Shield, User, Phone, FileText, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  documentType: z.enum(["aadhaar", "passport"], {
    required_error: "Please select document type",
  }),
  documentNumber: z.string().min(8, "Document number is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid mobile number"),
  destination: z.string().min(2, "Destination is required"),
  itinerary: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to location tracking for safety purposes",
  }),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Registration() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      consent: false,
    },
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const onSubmit = (data: RegistrationForm) => {
    console.log("Registration data:", data);
    
    // Mock registration success
    toast({
      title: "Digital Tourist ID Generated Successfully!",
      description: "Your blockchain-secured ID is ready for use.",
      duration: 4000,
    });
    
    // Navigate to dashboard after successful registration
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1500);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegistrationForm)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "phoneNumber", "documentType", "documentNumber"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["emergencyContactName", "emergencyContactNumber", "destination"];
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 mx-auto mb-3 text-trust" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Enter your basic details for identity verification</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name as per ID"
                  data-testid="input-full-name"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="Enter your mobile number"
                  data-testid="input-phone-number"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
              
              <div>
                <Label>Document Type for KYC *</Label>
                <Select onValueChange={(value) => setValue("documentType", value as "aadhaar" | "passport")}>
                  <SelectTrigger data-testid="select-document-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
                {errors.documentType && (
                  <p className="text-sm text-destructive mt-1">{errors.documentType.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="documentNumber">Document Number *</Label>
                <Input
                  id="documentNumber"
                  {...register("documentNumber")}
                  placeholder={watch("documentType") === "aadhaar" ? "Enter Aadhaar number" : "Enter passport number"}
                  data-testid="input-document-number"
                />
                {errors.documentNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.documentNumber.message}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 mx-auto mb-3 text-success" />
              <h3 className="text-lg font-semibold">Emergency Contacts & Trip Details</h3>
              <p className="text-sm text-muted-foreground">Help us keep you safe during your journey</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  {...register("emergencyContactName")}
                  placeholder="Name of your emergency contact"
                  data-testid="input-emergency-name"
                />
                {errors.emergencyContactName && (
                  <p className="text-sm text-destructive mt-1">{errors.emergencyContactName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="emergencyContactNumber">Emergency Contact Number *</Label>
                <Input
                  id="emergencyContactNumber"
                  {...register("emergencyContactNumber")}
                  placeholder="Emergency contact mobile number"
                  data-testid="input-emergency-phone"
                />
                {errors.emergencyContactNumber && (
                  <p className="text-sm text-destructive mt-1">{errors.emergencyContactNumber.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Trip Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        data-testid="button-start-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>Trip End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        data-testid="button-end-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div>
                <Label htmlFor="destination">Destination/State *</Label>
                <Input
                  id="destination"
                  {...register("destination")}
                  placeholder="e.g., Meghalaya, Himachal Pradesh"
                  data-testid="input-destination"
                />
                {errors.destination && (
                  <p className="text-sm text-destructive mt-1">{errors.destination.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="itinerary">Detailed Itinerary (Optional)</Label>
                <Textarea
                  id="itinerary"
                  {...register("itinerary")}
                  placeholder="Describe your planned activities and locations to visit"
                  rows={3}
                  data-testid="textarea-itinerary"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 mx-auto mb-3 text-trust" />
              <h3 className="text-lg font-semibold">Safety Consent & Verification</h3>
              <p className="text-sm text-muted-foreground">Final step to activate your Digital Tourist ID</p>
            </div>
            
            <Card className="p-4 bg-muted/50">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Your Digital Tourist ID will include:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Blockchain-secured verification</li>
                  <li>• Emergency contact integration</li>
                  <li>• Real-time location tracking for safety</li>
                  <li>• Valid only for your trip duration</li>
                  <li>• Accepted at all tourist entry points</li>
                </ul>
              </div>
            </Card>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={watch("consent")}
                  onCheckedChange={(checked) => setValue("consent", checked as boolean)}
                  data-testid="checkbox-consent"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to location use for my safety
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    We only use your location to help responders find you quickly in an emergency.
                    Your privacy is protected and data is encrypted.
                  </p>
                </div>
              </div>
              {errors.consent && (
                <p className="text-sm text-destructive">{errors.consent.message}</p>
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-trust" />
            <span>Get Your Digital Tourist ID</span>
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                data-testid="button-previous"
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  data-testid="button-next"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-success text-success-foreground hover:bg-success/90"
                  data-testid="button-get-safety-id"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Get My Safety ID
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}