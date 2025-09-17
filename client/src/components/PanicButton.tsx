import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Phone, Shield, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PanicButtonProps {
  variant?: "floating" | "header" | "large";
  className?: string;
}

export default function PanicButton({ variant = "header", className = "" }: PanicButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const { toast } = useToast();

  const handlePanicAlert = useCallback(() => {
    console.log("PANIC ALERT TRIGGERED");
    setAlertSent(true);
    setIsOpen(false);
    setIsCountingDown(false);
    setCountdown(10);
  }, []);

  const handleCancelAlert = () => {
    setIsOpen(false);
    setIsCountingDown(false);
    setCountdown(10);
    toast({
      title: "Alert Cancelled",
      description: "Your panic alert was cancelled in time.",
      duration: 3000,
    });
  };

  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(10);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      handlePanicAlert();
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isCountingDown, countdown, handlePanicAlert]);

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
      <Dialog open={isOpen} onOpenChange={(open) => {
          if (!open && isCountingDown) {
            // Cancel countdown if dialog is closed during countdown
            handleCancelAlert();
          } else {
            setIsOpen(open);
          }
        }}>
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
        <DialogContent 
          className="sm:max-w-md" 
          data-testid="modal-panic-confirm"
          onEscapeKeyDown={(e) => {
            if (isCountingDown) {
              e.preventDefault();
              handleCancelAlert();
            }
          }}
          onPointerDownOutside={(e) => {
            if (isCountingDown) {
              e.preventDefault();
              handleCancelAlert();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-destructive">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                {isCountingDown ? "Emergency Alert Activating" : "Send Emergency Alert?"}
              </div>
              {isCountingDown && (
                <div className="flex items-center text-2xl font-bold text-destructive">
                  {countdown}
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!isCountingDown ? (
              <>
                <p className="text-sm text-muted-foreground">
                  This will notify authorities and your emergency contacts immediately, 
                  even if <span className="text-destructive font-semibold">OFFLINE</span>.
                </p>
                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  ⚠️ After confirmation, you'll have 10 seconds to cancel if pressed by mistake.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={startCountdown}
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
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-destructive animate-pulse">
                    {countdown}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Emergency alert will be sent in <span className="font-semibold text-destructive">{countdown} seconds</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This will notify authorities and your emergency contacts immediately.
                  </p>
                </div>
                <Button
                  onClick={handleCancelAlert}
                  variant="outline"
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 font-semibold"
                  data-testid="button-cancel-countdown"
                >
                  <X className="w-4 h-4 mr-2" />
                  CANCEL ALERT
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Success Confirmation Modal */}
      <Dialog open={alertSent} onOpenChange={() => {}}>
        <DialogContent 
          className="max-w-md mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-0 z-[100]"
          data-testid="modal-panic-success"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="text-center p-8 space-y-6">
            {/* Large Green Checkmark */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle 
                  className="w-16 h-16" 
                  style={{ color: '#16A34A' }}
                />
              </div>
            </div>
            
            {/* Heading */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 font-inter">
                Alert Sent Successfully
              </h2>
              
              {/* Supportive Subtitle */}
              <p className="text-gray-600 leading-relaxed font-inter">
                Your location and details have been dispatched to the nearest authorities. Help is on the way.
              </p>
            </div>
            
            {/* Thanks Button */}
            <div className="pt-4">
              <Button
                onClick={() => setAlertSent(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 font-inter"
                data-testid="button-thanks-modal"
              >
                Thanks
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Semi-transparent backdrop overlay */}
      {alertSent && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          data-testid="success-modal-backdrop"
        />
      )}
    </>
  );
}