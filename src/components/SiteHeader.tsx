
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/context/ProfileContext";
import { Menu, User, Settings, LogOut } from "lucide-react";

export const SiteHeader = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Emotional Safety</Link>
        
        <nav className="hidden sm:flex space-x-4">
          <Link to="/home" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/biotracking" className="text-gray-600 hover:text-blue-600">Bio Tracking</Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
          <Link to="/meltdown-tracking" className="text-gray-600 hover:text-blue-600">Meltdown</Link>
          <Link to="/data-access" className="text-gray-600 hover:text-blue-600">Data Access</Link>
        </nav>
        
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {profile?.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} alt="Profile" />
                  ) : (
                    <AvatarFallback>
                      U
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{profile?.first_name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@example.com
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile-account")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
