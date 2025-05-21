
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const AdvancedViewsSettings = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState({
    patterns: true,
    routinePlanner: true,
    bodyStats: true,
    community: false
  });
  
  const handleToggleChange = (feature: keyof typeof features) => {
    setFeatures({
      ...features,
      [feature]: !features[feature]
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-blue-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Advanced Views</h1>
        </div>
      </div>
      
      <div className="px-4">
        <p className="text-center text-gray-600 mb-8">
          Enable or disable additional features and views in the app. 
          Each toggle will add new navigation options and functionality.
        </p>
        
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Patterns & Insights</h2>
                <p className="text-gray-600">View trends and correlations in your data</p>
              </div>
              <Switch 
                checked={features.patterns} 
                onCheckedChange={() => handleToggleChange("patterns")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Routine Planner</h2>
                <p className="text-gray-600">Create and manage daily routines</p>
              </div>
              <Switch 
                checked={features.routinePlanner} 
                onCheckedChange={() => handleToggleChange("routinePlanner")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Body Stats</h2>
                <p className="text-gray-600">Track physical metrics and health data</p>
              </div>
              <Switch 
                checked={features.bodyStats} 
                onCheckedChange={() => handleToggleChange("bodyStats")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Community</h2>
                <p className="text-gray-600">Connect with others in moderated spaces</p>
              </div>
              <Switch 
                checked={features.community} 
                onCheckedChange={() => handleToggleChange("community")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedViewsSettings;
