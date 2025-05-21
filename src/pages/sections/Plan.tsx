
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar, Timer, Focus } from "lucide-react";

const Plan = () => {
  const navigate = useNavigate();
  
  const planTools = [
    {
      title: "Daily Routine",
      description: "Organize your day with visual schedules",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      path: "/routine",
      color: "bg-blue-100"
    },
    {
      title: "Break Timer",
      description: "Structured breaks to maintain balance",
      icon: <Timer className="h-6 w-6 text-green-500" />,
      path: "/break-timer",
      color: "bg-green-100"
    },
    {
      title: "Focus Mode",
      description: "Minimize distractions for productive work",
      icon: <Focus className="h-6 w-6 text-purple-500" />,
      path: "/focus",
      color: "bg-purple-100"
    },
    {
      title: "Routine Wizard",
      description: "Create and customize your ideal routines",
      icon: <Calendar className="h-6 w-6 text-amber-500" />,
      path: "/routine-wizard",
      color: "bg-amber-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Plan</h1>
          <p className="text-muted-foreground">Routines, breaks, and focus tools</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {planTools.map((tool) => (
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

export default Plan;
