
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const SiteHeader = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Emotional Safety</Link>
        
        <nav className="hidden sm:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/biotracking" className="text-gray-600 hover:text-blue-600">Bio Tracking</Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
          {user && (
            <Link to="/data-access" className="text-gray-600 hover:text-blue-600">Data Access</Link>
          )}
        </nav>
        
        <div>
          {user ? (
            <div className="text-sm text-gray-600">
              {user.email?.split('@')[0]}
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
