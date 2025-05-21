
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, User, Lock, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileAccount = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Profile & Account</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarFallback className="bg-blue-500 text-white text-4xl">A</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Alex Johnson</h2>
        <p className="text-gray-500">alex.johnson@example.com</p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Current Plan</h3>
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1">Premium</span>
        </div>
        <p className="text-gray-600 mb-4">
          All features unlocked, including add-ons and advanced analytics.
        </p>
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Manage Subscription
        </Button>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        
        <Card className="mb-4">
          <button className="flex items-center p-4 w-full text-left" onClick={() => navigate("/settings/personal-information")}>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <span className="flex-1">Personal Information</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>
        
        <Card className="mb-4">
          <button className="flex items-center p-4 w-full text-left" onClick={() => navigate("/settings/privacy")}>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <Lock className="h-5 w-5 text-purple-500" />
            </div>
            <span className="flex-1">Privacy Settings</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>
        
        <Card>
          <button className="flex items-center p-4 w-full text-left" onClick={() => navigate("/settings/display")}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <Settings className="h-5 w-5 text-green-500" />
            </div>
            <span className="flex-1">Display Preferences</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default ProfileAccount;
