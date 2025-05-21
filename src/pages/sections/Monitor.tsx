
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, BarChart2, AlertTriangle } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";

const Monitor = () => {
  const navigate = useNavigate();
  
  const monitorTools = [
    {
      title: "Emotion Hub",
      description: "Track your emotions",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/emotion-hub",
      color: "bg-purple-100"
    },
    {
      title: "Body Stats",
      description: "Physical measurements",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      path: "/body-stats",
      color: "bg-green-100"
    },
    {
      title: "Environment",
      description: "Track external triggers",
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      path: "/environmental",
      color: "bg-amber-100"
    },
    {
      title: "Bio Tracking",
      description: "Monitor vitals",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      path: "/bio-tracking",
      color: "bg-red-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Monitor</h1>
            <p className="text-sm text-gray-600">Track your wellbeing</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {monitorTools.map((tool) => (
          <Card 
            key={tool.title}
            className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-2"
            onClick={() => navigate(tool.path)}
          >
            <div className="flex items-center">
              <div className={`${tool.color} p-3 rounded-full mr-3`}>
                {tool.icon}
              </div>
              <div>
                <h3 className="font-medium text-base">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full py-3 border-2"
          onClick={() => navigate("/warning-system")}
        >
          Warning System
        </Button>
      </div>
    </div>
  );
};

export default Monitor;
