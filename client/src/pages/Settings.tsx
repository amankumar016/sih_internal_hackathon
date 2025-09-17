import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import NavigationHeader from "@/components/NavigationHeader";
import PanicButton from "@/components/PanicButton";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Globe, 
  Moon, 
  Sun,
  User,
  Phone,
  MapPin,
  Eye,
  Share,
  Download,
  Trash2,
  AlertTriangle,
  Lock,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyNotifications, setEmergencyNotifications] = useState(true);
  const [communityPosts, setCommunityPosts] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { toast } = useToast();

  const handleSaveSettings = (category: string) => {
    console.log(`Saving ${category} settings`);
    toast({
      title: "Settings Saved",
      description: `Your ${category} settings have been updated successfully.`,
      duration: 3000,
    });
  };

  const handleDataExport = () => {
    console.log("Exporting user data");
    toast({
      title: "Data Export Initiated",
      description: "Your data export will be ready for download within 24 hours.",
      duration: 4000,
    });
  };

  const handleDataDeletion = () => {
    console.log("Data deletion requested");
    toast({
      title: "Data Deletion Requested",
      description: "Your account deletion request has been submitted. This cannot be undone.",
      duration: 5000,
    });
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "ml", name: "മലയാളം (Malayalam)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Header */}
      <section className="border-b bg-muted/30 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-trust" />
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your privacy, preferences, and account settings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="privacy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="privacy" data-testid="tab-privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="account" data-testid="tab-account">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="preferences" data-testid="tab-preferences">
              <Globe className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="data" data-testid="tab-data">
              <Database className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
          </TabsList>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-trust" />
                  Privacy & Safety Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Location Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your real-time location for emergency response
                    </p>
                  </div>
                  <Switch
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                    data-testid="switch-location-sharing"
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Emergency Contact Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow emergency contacts to see your status and location
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-emergency-contacts" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Community Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Show your profile in community forums and local guides
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-profile-visibility" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Data Sharing with Authorities</Label>
                    <p className="text-sm text-muted-foreground">
                      Share data with police and rescue services during emergencies
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-authority-sharing" />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings('privacy')}
                    data-testid="button-save-privacy"
                  >
                    Save Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-warning" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Critical safety alerts and emergency notifications
                    </p>
                  </div>
                  <Switch
                    checked={emergencyNotifications}
                    onCheckedChange={setEmergencyNotifications}
                    data-testid="switch-emergency-notifications"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Chat Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Messages from guardians, guides, and other users
                    </p>
                  </div>
                  <Switch
                    checked={chatNotifications}
                    onCheckedChange={setChatNotifications}
                    data-testid="switch-chat-notifications"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Community Activity</Label>
                    <p className="text-sm text-muted-foreground">
                      Updates on your forum posts and community interactions
                    </p>
                  </div>
                  <Switch
                    checked={communityPosts}
                    onCheckedChange={setCommunityPosts}
                    data-testid="switch-community-notifications"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Safety Score Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Changes to your current location's safety rating
                    </p>
                  </div>
                  <Switch defaultChecked data-testid="switch-safety-notifications" />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings('notifications')}
                    data-testid="button-save-notifications"
                  >
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-trust" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Rajesh Kumar Singh" data-testid="input-full-name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 9876543210" data-testid="input-phone" />
                  </div>
                  <div>
                    <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                    <Input id="emergencyName" defaultValue="Priya Sharma" data-testid="input-emergency-name" />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input id="emergencyPhone" defaultValue="+91 8765432109" data-testid="input-emergency-phone" />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="font-medium">Digital Tourist ID</Label>
                  <div className="bg-muted/50 p-4 rounded-lg mt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-sm">GRD-2025-MH-8847</p>
                        <p className="text-xs text-muted-foreground">Valid until: Jan 15, 2025</p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-view-qr">
                        <Eye className="w-4 h-4 mr-2" />
                        View QR
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings('account')}
                    data-testid="button-save-account"
                  >
                    Update Account Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-success" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark theme
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                      data-testid="switch-dark-mode"
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="font-medium">Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="mt-2" data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable offline functionality with SMS fallback
                    </p>
                  </div>
                  <Switch
                    checked={offlineMode}
                    onCheckedChange={setOfflineMode}
                    data-testid="switch-offline-mode"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleSaveSettings('preferences')}
                    data-testid="button-save-preferences"
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-muted-foreground" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Your Data
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download a copy of all your GUARD data including trip history, chat messages, and safety reports.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleDataExport}
                      data-testid="button-export-data"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Request Data Export
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2 text-destructive">
                      <AlertTriangle className="w-4 h-4" />
                      Delete Account
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your GUARD account and all associated data. This action cannot be undone.
                    </p>
                    <Button 
                      variant="destructive"
                      onClick={handleDataDeletion}
                      data-testid="button-delete-account"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-xs text-muted-foreground space-y-2">
                  <h5 className="font-medium text-foreground">Data Processing Information</h5>
                  <ul className="space-y-1">
                    <li>• Location data is encrypted and only used for safety purposes</li>
                    <li>• Chat messages are stored securely with end-to-end encryption</li>
                    <li>• Emergency data may be shared with authorized authorities</li>
                    <li>• Blockchain ID data ensures tamper-proof verification</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PanicButton variant="floating" />
    </div>
  );
}