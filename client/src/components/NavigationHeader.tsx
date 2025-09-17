import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Users, MessageSquare, Settings, HelpCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import PanicButton from "./PanicButton";
import LanguageSelector from "./LanguageSelector";

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/community", label: "Community Forum", icon: Users },
  { path: "/chat", label: "Real-time Chat", icon: MessageSquare },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/help", label: "Help", icon: HelpCircle },
];

export default function NavigationHeader() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50" data-testid="header-navigation">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-lg">GUARD</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.slice(0, 4).map(({ path, label, icon: Icon }) => (
            <Link key={path} href={path}>
              <Button 
                variant={location === path ? "secondary" : "ghost"}
                size="sm"
                className="text-sm"
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
          <LanguageSelector className="hidden md:flex" />
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
                        variant={location === path ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                        data-testid={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {label}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <LanguageSelector />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}