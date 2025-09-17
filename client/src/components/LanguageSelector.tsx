import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const INDIAN_LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ur", name: "Urdu", native: "اردو" }
];

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    console.log(`Language changed to: ${value}`);
  };

  const currentLanguage = INDIAN_LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={`w-auto min-w-[120px] glass border-0 ${className}`}
        data-testid="select-language"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <SelectValue>{currentLanguage?.native}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent data-testid="dropdown-languages">
        {INDIAN_LANGUAGES.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            data-testid={`option-language-${language.code}`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{language.native}</span>
              <span className="text-xs text-muted-foreground ml-2">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}