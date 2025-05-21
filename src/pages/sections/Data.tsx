
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Database, BarChart2, Shield } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";

const Data = () => {
  const navigate = useNavigate();
  
  const dataOptions = [
    {
      title: "Share Data",
      description: "Help improve recommendations",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100"
    },
    {
      title: "Your Patterns",
      description: "See your data trends",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100"
    },
    {
      title: "Privacy Settings",
      description: "Manage data sharing",
      icon: <Shield className="h-6 w-6 text-green-500" />,
      path: "/settings/privacy",
      color: "bg-green-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Data</h1>
            <p className="text-sm text-gray-600">Your information</p>
          </div>
        </div>
      </div>
      
      <Card className="p-4 bg-blue-50 border-2 mb-4">
        <h2 className="text-lg font-medium mb-2">How Your Data Helps</h2>
        <p className="text-gray-700 text-sm mb-4">
          Anonymous sharing helps improve recommendations for the neurodiverse community.
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {dataOptions.map((option) => (
            <Card 
              key={option.title}
              className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border"
              onClick={() => option.path && navigate(option.path)}
            >
              <div className="flex items-center">
                <div className={`${option.color} p-3 rounded-full mr-3`}>
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
      
      <Card className="p-4 border-2">
        <h3 className="text-base font-medium mb-2">Privacy Notice</h3>
        <p className="text-sm text-gray-600">
          All data is anonymous. You can opt out at any time.
        </p>
      </Card>
    </div>
  );
};

export default Data;
