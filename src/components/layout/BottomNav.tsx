
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Activity, Calendar, Book, Settings,
  Database
} from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  
  const isActive = (path: string) => {
    // Handle nested routes
    if (path === '/') {
      return activePath === '/';
    }
    return activePath.startsWith(path);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/warning-system" 
          className={`flex flex-col items-center ${
            isActive('/warning-system') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Activity className="h-6 w-6" />
          <span className="text-xs mt-1">Monitor</span>
        </Link>
        
        <Link 
          to="/data-collection" 
          className={`flex flex-col items-center ${
            isActive('/data-collection') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Database className="h-6 w-6" />
          <span className="text-xs mt-1">Track</span>
        </Link>
        
        <Link 
          to="/emotion-hub" 
          className={`flex flex-col items-center ${
            isActive('/emotion-hub') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Calendar className="h-6 w-6" />
          <span className="text-xs mt-1">Journal</span>
        </Link>
        
        <Link 
          to="/learn" 
          className={`flex flex-col items-center ${
            isActive('/learn') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Book className="h-6 w-6" />
          <span className="text-xs mt-1">Learn</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`flex flex-col items-center ${
            isActive('/settings') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};
