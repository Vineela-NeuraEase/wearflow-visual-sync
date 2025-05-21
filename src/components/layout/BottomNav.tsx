
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageCircle, Layers, Calendar, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Tools", path: "/tools", icon: Layers },
    { name: "Routine", path: "/routine", icon: Calendar },
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
