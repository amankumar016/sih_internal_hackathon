import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Users, MessageSquare, Settings, HelpCircle, Shield, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";
import PanicButton from "./PanicButton";
import LanguageSelector from "./LanguageSelector";
import TrackPanicModal from "./TrackPanicModal";

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/community", label: "Community Forum", icon: Users },
  { path: "/chat", label: "Real-time Chat", icon: MessageSquare },
  { path: "/saarthi", label: "Saarthi AI", icon: Settings },
  { path: "/settings", label: "Settings", icon: HelpCircle },
];

export default function NavigationHeader() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50" data-testid="header-navigation">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-2 hover-elevate rounded-lg p-2 transition-all duration-200">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">GUARD</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.slice(0, 4).map(({ path, label, icon: Icon }, index) => (
            <Link key={path} href={path}>
              <Button 
                variant="ghost"
                size="sm"
                className={`text-sm transition-all duration-300 hover-elevate active-elevate-2 rounded-lg font-medium border
                  ${location === path 
                    ? `${index % 2 === 0 ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-green-100 text-green-700 border-green-300'}` 
                    : `${index % 2 === 0 ? 'text-blue-600 hover:text-blue-700 border-transparent hover:border-blue-200' : 'text-green-600 hover:text-green-700 border-transparent hover:border-green-200'}`
                  }`}
                data-testid={`nav-${label.toLowerCase().replace(" ", "-")}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link href="/rescue-dashboard" className="hidden md:inline-block">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm transition-all duration-300 hover-elevate active-elevate-2 rounded-lg font-medium border text-orange-600 hover:text-orange-700 border-transparent hover:border-orange-200"
              data-testid="nav-rescue-dashboard"
            >
              <Shield className="w-4 h-4 mr-2" />
              Rescue Dashboard
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm"
            className="hidden md:inline-flex text-sm transition-all duration-300 hover-elevate active-elevate-2 rounded-lg font-medium border text-purple-600 hover:text-purple-700 border-transparent hover:border-purple-200"
            onClick={() => setIsTrackModalOpen(true)}
            data-testid="nav-track-panic"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Track Panic Progress
          </Button>
          <LanguageSelector className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50" />
          <PanicButton variant="header" />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="space-y-6 pt-6">
                <div className="space-y-2">
                  {navigationItems.map(({ path, label, icon: Icon }) => (
                    <Link key={path} href={path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start transition-all duration-300 hover-elevate border
                          ${location === path 
                            ? 'bg-blue-100 text-blue-700 border-blue-300' 
                            : 'text-blue-600 hover:text-blue-700 border-transparent hover:border-blue-200'
                          }`}
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {label}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t space-y-2">
                  <Link href="/rescue-dashboard">
                    <Button
                      variant="ghost"
                      className="w-full justify-start transition-all duration-300 hover-elevate border text-orange-600 hover:text-orange-700 border-transparent hover:border-orange-200"
                      onClick={() => setIsOpen(false)}
                      data-testid="mobile-nav-rescue-dashboard"
                    >
                      <Shield className="w-4 h-4 mr-3" />
                      Rescue Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start transition-all duration-300 hover-elevate border text-purple-600 hover:text-purple-700 border-transparent hover:border-purple-200"
                    onClick={() => {
                      setIsOpen(false);
                      setIsTrackModalOpen(true);
                    }}
                    data-testid="mobile-nav-track-panic"
                  >
                    <MapPin className="w-4 h-4 mr-3" />
                    Track Panic Progress
                  </Button>
                  <LanguageSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <TrackPanicModal 
        isOpen={isTrackModalOpen} 
        onClose={() => setIsTrackModalOpen(false)} 
      />
    </header>
  );
}