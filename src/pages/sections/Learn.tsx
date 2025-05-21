
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, BarChart2 } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";

const Learn = () => {
  const navigate = useNavigate();
  
  const learnTools = [
    {
      title: "Resources",
      description: "Articles and guides",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      path: "/resource-library",
      color: "bg-blue-100"
    },
    {
      title: "Personal Insights",
      description: "Your data patterns",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/insights",
      color: "bg-purple-100"
    },
    {
      title: "Emotion Insights",
      description: "Emotion patterns",
      icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
      path: "/emotion-insights",
      color: "bg-pink-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Learn</h1>
            <p className="text-sm text-gray-600">Knowledge and insights</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {learnTools.map((tool) => (
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
      
      <Card className="p-3 mt-4 border-2">
        <h2 className="text-base font-medium mb-2">Today's Featured</h2>
        <p className="text-sm text-gray-600 mb-3">Sensory Processing Basics</p>
        <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-gray-400" />
        </div>
      </Card>
    </div>
  );
};

export default Learn;
