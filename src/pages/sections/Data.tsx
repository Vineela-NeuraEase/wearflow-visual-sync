
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Database, BarChart2, Shield } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";

const Data = () => {
  const navigate = useNavigate();
  
  const dataOptions = [
    {
      title: "Contribute Data",
      description: "Help improve AI recommendations through anonymous data contribution",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100"
    },
    {
      title: "View Your Patterns",
      description: "See how your contributed data helps improve recommendations",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100"
    },
    {
      title: "Privacy Controls",
      description: "Manage your data sharing preferences",
      icon: <Shield className="h-6 w-6 text-green-500" />,
      path: "/settings/privacy",
      color: "bg-green-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-2xl font-semibold">Data Collection</h1>
            <p className="text-muted-foreground">Help improve AI recommendations</p>
          </div>
        </div>
      </div>
      
      <Card className="p-6 bg-blue-50">
        <h2 className="text-xl font-medium mb-4">How Your Data Helps</h2>
        <p className="text-gray-700 mb-6">
          By anonymously sharing your regulation patterns, triggers, and effective coping strategies,
          you help our AI learn and provide better recommendations for everyone in the neurodiverse community.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {dataOptions.map((option) => (
            <Card 
              key={option.title}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => option.path && navigate(option.path)}
            >
              <div className="flex items-center">
                <div className={`${option.color} p-3 rounded-full mr-4`}>
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Your Privacy Matters</h3>
        <p className="text-muted-foreground">
          All data is anonymized and you can opt out at any time.
          View our privacy policy to learn more about how we protect your information.
        </p>
      </Card>
    </div>
  );
};

export default Data;
