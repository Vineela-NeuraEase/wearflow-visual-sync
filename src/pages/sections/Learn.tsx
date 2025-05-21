
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, BarChart2 } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();
  
  const learnTools = [
    {
      title: "Resource Library",
      description: "Articles and helpful content",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      path: "/resource-library",
      color: "bg-blue-100"
    },
    {
      title: "Personal Insights",
      description: "Discover patterns in your data",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/insights",
      color: "bg-purple-100"
    },
    {
      title: "Emotion Insights",
      description: "Understand your emotional patterns",
      icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
      path: "/emotion-insights",
      color: "bg-pink-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Learn</h1>
          <p className="text-muted-foreground">Resources, insights, and patterns</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learnTools.map((tool) => (
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
      
      <Card className="p-4 mt-6">
        <h2 className="text-lg font-medium mb-2">Featured Article</h2>
        <p className="text-muted-foreground mb-4">Understanding Sensory Processing in Daily Life</p>
        <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
      </Card>
    </div>
  );
};

export default Learn;
