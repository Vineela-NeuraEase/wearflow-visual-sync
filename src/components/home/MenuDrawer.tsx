
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, Activity, Heart, Book, PieChart, Settings, BellRing, UserRound } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const MenuDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Plan", icon: <Activity className="h-5 w-5" />, path: "/plan" },
    { name: "Support", icon: <Heart className="h-5 w-5" />, path: "/support" },
    { name: "Monitor", icon: <PieChart className="h-5 w-5" />, path: "/monitor" },
    { name: "Learn", icon: <Book className="h-5 w-5" />, path: "/learn" },
    { name: "Data", icon: <Activity className="h-5 w-5" />, path: "/data" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
    { name: "Notifications", icon: <BellRing className="h-5 w-5" />, path: "/notification-center" },
    { name: "Profile", icon: <UserRound className="h-5 w-5" />, path: "/profile-account" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-3">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-white dark:bg-gray-900 dark:text-white">
        <SheetHeader>
          <SheetTitle className="text-primary text-xl">Hana</SheetTitle>
        </SheetHeader>
        <div className="flex justify-between items-center my-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Explore</span>
          {mounted && <ThemeToggle />}
        </div>
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={`justify-start ${location.pathname === item.path ? "bg-primary/10 dark:bg-primary/20" : ""}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
