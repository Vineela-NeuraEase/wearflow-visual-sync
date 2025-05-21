
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings as SettingsIcon, Palette, Bell, Lock, Eye, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const Settings = () => {
  const navigate = useNavigate();
  
  const settingsOptions = [
    { 
      name: "Display", 
      icon: <Palette className="h-5 w-5 text-blue-500" />,
      description: "Theme, text size and animations",
      path: "/settings/display"
    },
    { 
      name: "Feedback", 
      icon: <Bell className="h-5 w-5 text-pink-500" />,
      description: "Haptic and sound settings",
      path: "/settings/feedback" 
    },
    { 
      name: "Privacy", 
      icon: <Lock className="h-5 w-5 text-green-500" />,
      description: "Data management and sharing",
      path: "/settings/privacy" 
    },
    { 
      name: "Advanced Views", 
      icon: <Eye className="h-5 w-5 text-purple-500" />,
      description: "Enable additional features",
      path: "/settings/advanced-views" 
    },
    { 
      name: "About", 
      icon: <Info className="h-5 w-5 text-gray-500" />,
      description: "App version and information",
      path: "/settings/about" 
    },
  ];
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2 flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2" />
          Settings
        </h1>
      </div>
      
      <div className="px-4">
        <div className="space-y-4">
          {settingsOptions.map((option) => (
            <Card 
              key={option.name} 
              className="p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(option.path)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                {option.icon}
              </div>
              <div>
                <h3 className="font-medium">{option.name}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button 
            className="w-full"
            variant="outline"
            onClick={() => navigate("/welcome/intro")}
          >
            Restart Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
