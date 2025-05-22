
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Menu,
  Settings,
  AlertTriangle,
  LogOut,
  Database,
  BookOpen,
  BrainCircuit,
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MenuDrawer = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
      setIsOpen(false);
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Autism Meltdown Tracker</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          {user && (
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{user.email}</div>
                  <div className="text-xs text-gray-500">Logged in</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/")}
            >
              <Home className="h-5 w-5 mr-3" />
              Home
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/warning-system")}
            >
              <AlertTriangle className="h-5 w-5 mr-3" />
              Warning System
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/data-collection")}
            >
              <Database className="h-5 w-5 mr-3" />
              Data Collection
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/resource-library")}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              Resource Library
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/ai-assistant")}
            >
              <BrainCircuit className="h-5 w-5 mr-3" />
              AI Assistant
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation("/settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </div>
          
          {user && (
            <Button
              variant="ghost"
              className="w-full justify-start mt-6 text-red-600 dark:text-red-400"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          )}
          
          {!user && (
            <Button
              variant="ghost"
              className="w-full justify-start mt-6 text-blue-600 dark:text-blue-400"
              onClick={() => handleNavigation("/auth")}
            >
              <User className="h-5 w-5 mr-3" />
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
