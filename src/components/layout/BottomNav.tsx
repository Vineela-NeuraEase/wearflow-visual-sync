
import { useNavigate, useLocation } from "react-router-dom";
import { Activity, HeartPulse, Calendar, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Consolidated navigation items - reduced to 4 essential categories
  const navItems = [
    { name: "Monitor", path: "/monitor", icon: Activity },
    { name: "Support", path: "/support", icon: HeartPulse },
    { name: "Plan", path: "/plan", icon: Calendar },
    { name: "Learn", path: "/learn", icon: BookOpen },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-16 px-4">
      {navItems.map((item) => (
        <button
          key={item.name}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg",
            location.pathname === item.path
              ? "text-primary"
              : "text-gray-500 hover:text-primary"
          )}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={20} />
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
