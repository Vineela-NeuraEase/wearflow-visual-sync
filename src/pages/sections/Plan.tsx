
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar, Timer, Focus } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";

const Plan = () => {
  const navigate = useNavigate();
  
  const planTools = [
    {
      title: "Daily Routine",
      description: "Organize your day visually",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      path: "/routine",
      color: "bg-blue-100"
    },
    {
      title: "Break Timer",
      description: "Schedule structured breaks",
      icon: <Timer className="h-6 w-6 text-green-500" />,
      path: "/break-timer",
      color: "bg-green-100"
    },
    {
      title: "Focus Mode",
      description: "Reduce distractions",
      icon: <Focus className="h-6 w-6 text-purple-500" />,
      path: "/focus",
      color: "bg-purple-100"
    },
    {
      title: "Routine Wizard",
      description: "Create custom routines",
      icon: <Calendar className="h-6 w-6 text-amber-500" />,
      path: "/routine-wizard",
      color: "bg-amber-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Plan</h1>
            <p className="text-sm text-gray-600">Daily organization tools</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {planTools.map((tool) => (
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
    </div>
  );
};

export default Plan;
