
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Wind, Eye, Music, Vibrate, AlertTriangle } from "lucide-react";

const Support = () => {
  const navigate = useNavigate();
  
  const supportTools = [
    {
      title: "Breathing Exercise",
      description: "Guided breathing patterns for calm",
      icon: <Wind className="h-6 w-6 text-blue-500" />,
      path: "/breathing",
      color: "bg-blue-100"
    },
    {
      title: "SOS Calm",
      description: "Immediate support for overwhelming moments",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      path: "/sos",
      color: "bg-red-100"
    },
    {
      title: "Visual Stimming",
      description: "Calming visual patterns and animations",
      icon: <Eye className="h-6 w-6 text-purple-500" />,
      path: "/visual",
      color: "bg-purple-100"
    },
    {
      title: "Soothing Sounds",
      description: "White noise and nature sounds",
      icon: <Music className="h-6 w-6 text-green-500" />,
      path: "/sounds",
      color: "bg-green-100"
    },
    {
      title: "Haptic Feedback",
      description: "Gentle vibration patterns for regulation",
      icon: <Vibrate className="h-6 w-6 text-pink-500" />,
      path: "/haptic",
      color: "bg-pink-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Support</h1>
          <p className="text-muted-foreground">Tools to help with self-regulation</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportTools.map((tool) => (
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
    </div>
  );
};

export default Support;
