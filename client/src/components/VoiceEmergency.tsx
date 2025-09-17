import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Phone, Languages, AlertTriangle } from "lucide-react";

export default function VoiceEmergency() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isRecording, setIsRecording] = useState(false);

  const languages = [
    { code: "english", name: "English", native: "English" },
    { code: "hindi", name: "Hindi", native: "हिन्दी" },
    { code: "assamese", name: "Assamese", native: "অসমীয়া" },
    { code: "bengali", name: "Bengali", native: "বাংলা" },
    { code: "gujarati", name: "Gujarati", native: "ગુજરાતી" },
    { code: "tamil", name: "Tamil", native: "தமிழ்" },
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleMicrophoneClick = () => {
    setIsRecording(!isRecording);
    console.log("Voice recording:", !isRecording ? "started" : "stopped");
  };

  const handleSendEmergency = () => {
    console.log("Sending voice emergency alert...");
  };

  const handleCallHelpline = () => {
    console.log("Calling emergency helpline...");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6" data-testid="voice-emergency-container">
      {/* Main Container */}
      <Card className="glass">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold">Voice Emergency Access</CardTitle>
          <p className="text-muted-foreground">Speak your emergency in any language</p>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Language Selection Section */}
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Languages className="w-5 h-5" />
                Select Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant={selectedLanguage === language.code ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col items-center gap-1 hover-elevate ${
                      selectedLanguage === language.code 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleLanguageSelect(language.code)}
                    data-testid={`button-language-${language.code}`}
                  >
                    <span className="font-medium text-sm">{language.name}</span>
                    <span className="text-xs opacity-75">{language.native}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Voice Input Section */}
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Voice Input</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                {/* Microphone Button */}
                <div className="relative">
                  <Button
                    size="icon"
                    className={`w-24 h-24 rounded-full transition-all duration-300 ${
                      isRecording 
                        ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                        : "bg-purple-600 hover:bg-purple-700"
                    } text-white shadow-lg hover:shadow-xl`}
                    onClick={handleMicrophoneClick}
                    data-testid="button-microphone"
                  >
                    <Mic className={`w-10 h-10 ${isRecording ? "animate-pulse" : ""}`} />
                  </Button>
                  {isRecording && (
                    <div className="absolute -inset-2 border-4 border-red-400 rounded-full animate-ping"></div>
                  )}
                </div>
                
                <p className="text-center text-muted-foreground">
                  {isRecording ? "Recording... Tap to stop" : "Tap to speak"}
                </p>

                {/* Action Buttons */}
                <div className="w-full space-y-3">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                    onClick={handleSendEmergency}
                    data-testid="button-send-voice-emergency"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Send Voice Emergency
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full bg-white text-gray-600 border-gray-200 hover:bg-gray-50 py-3"
                    onClick={handleCallHelpline}
                    data-testid="button-call-helpline"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Emergency Helpline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </CardContent>
      </Card>

      {/* Offline Note */}
      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <strong className="text-yellow-800 dark:text-yellow-200">Note:</strong>
            <span className="text-yellow-700 dark:text-yellow-300 ml-2">
              This service works offline via SMS when internet is unavailable.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}