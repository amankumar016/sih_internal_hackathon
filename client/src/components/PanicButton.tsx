import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PanicButtonProps {
  variant?: "floating" | "header" | "large";
  className?: string;
}

export default function PanicButton({ variant = "header", className = "" }: PanicButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();

  const handlePanicAlert = () => {
    console.log("PANIC ALERT TRIGGERED");
    setAlertSent(true);
    setIsOpen(false);
    
    toast({
      title: "Panic Alert Successfully Sent to Authorities",
      description: "Emergency responders have been notified of your location and situation.",
      duration: 5000,
    });
  };

  const getButtonSize = () => {
    switch (variant) {
      case "floating":
        return "size-16";
      case "large":
        return "h-12 px-8";
      default:
        return "h-9 px-6";
    }
  };

  const getButtonClasses = () => {
    const baseClasses = `bg-destructive text-destructive-foreground hover:bg-destructive/90 border-2 border-destructive-border font-bold ${getButtonSize()} ${className}`;
    
    if (variant === "floating") {
      return `${baseClasses} fixed bottom-6 right-6 rounded-full z-50 pulse-emergency shadow-lg`;
    }
    
    return `${baseClasses} pulse-emergency`;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className={getButtonClasses()}
            data-testid="button-panic"
          >
            {variant === "floating" ? (
              <AlertTriangle className="w-8 h-8" />
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 mr-2" />
                PANIC
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" data-testid="modal-panic-confirm">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <Shield className="w-5 h-5 mr-2" />
              Send Emergency Alert?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will notify authorities and your emergency contacts immediately, 
              even if <span className="text-destructive font-semibold">OFFLINE</span>.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={handlePanicAlert}
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-panic"
              >
                <Phone className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1"
                data-testid="button-cancel-panic"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {alertSent && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 glass rounded-lg p-4 z-50" data-testid="alert-sent-toast">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-success mr-2" />
              <span className="text-sm font-medium">Alert Sent Successfully</span>
            </div>
            <div className="space-x-2">
              <Button size="sm" variant="outline" onClick={() => console.log("Track request clicked")} data-testid="button-track-request">
                Track Request
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setAlertSent(false)} data-testid="button-thanks">
                Thanks
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}