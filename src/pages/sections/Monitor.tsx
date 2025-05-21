
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, BarChart2, AlertTriangle, Book } from "lucide-react";

const Monitor = () => {
  const navigate = useNavigate();
  
  const monitorTools = [
    {
      title: "Emotion Logger",
      description: "Track your daily emotional state",
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      path: "/emotion-logger",
      color: "bg-pink-100"
    },
    {
      title: "Emotion Hub",
      description: "Complete dashboard for emotion tracking",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/emotion-hub",
      color: "bg-purple-100"
    },
    {
      title: "Meltdown Tracker",
      description: "Log and analyze meltdown episodes",
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      path: "/meltdown-logger",
      color: "bg-amber-100"
    },
    {
      title: "Journal",
      description: "Record your thoughts and experiences",
      icon: <Book className="h-6 w-6 text-blue-500" />,
      path: "/journal",
      color: "bg-blue-100"
    },
    {
      title: "Body Stats",
      description: "Track physical measurements and patterns",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      path: "/body-stats",
      color: "bg-green-100"
    },
    {
      title: "Bio Tracking",
      description: "Monitor vitals and physiological data",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      path: "/bio-tracking",
      color: "bg-red-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Monitor</h1>
          <p className="text-muted-foreground">Track emotions, body stats, and meltdowns</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monitorTools.map((tool) => (
          <Card 
            key={tool.title}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(tool.path)}
          >
            <div className="flex items-center">
              <div className={`${tool.color} p-3 rounded-full mr-4`}>
                {tool.icon}
              </div>
              <div>
                <h3 className="font-medium">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full py-6"
          onClick={() => navigate("/environmental")}
        >
          Environmental Factors
        </Button>
        <Button
          variant="outline"
          className="w-full py-6"
          onClick={() => navigate("/warning-system")}
        >
          Warning System
        </Button>
      </div>
    </div>
  );
};

export default Monitor;
