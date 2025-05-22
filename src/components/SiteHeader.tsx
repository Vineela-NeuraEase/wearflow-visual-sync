
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export const SiteHeader = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Emotional Safety</Link>
        
        <nav className="hidden sm:flex space-x-4">
          <Link to="/warning-system" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/biotracking" className="text-gray-600 hover:text-blue-600">Bio Tracking</Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
          <Link to="/learn" className="text-gray-600 hover:text-blue-600">Learn</Link>
          {user && (
            <Link to="/data-access" className="text-gray-600 hover:text-blue-600">Data Access</Link>
          )}
        </nav>
        
        <div>
          {user ? (
            <div className="flex items-center space-x-2">
              <Link 
                to="/profile-account" 
                className="text-sm flex items-center text-gray-600 hover:text-blue-600"
              >
                <User className="h-4 w-4 mr-1" />
                {user.email?.split('@')[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
