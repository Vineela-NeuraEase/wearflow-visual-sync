
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Sparkles, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const AddOnsMarketplace = () => {
  const navigate = useNavigate();
  const [addOns, setAddOns] = useState({
    community: false,
    gamification: false
  });
  
  const toggleAddOn = (feature: keyof typeof addOns) => {
    setAddOns({
      ...addOns,
      [feature]: !addOns[feature]
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-blue-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Add-Ons</h1>
        </div>
      </div>
      
      <div className="px-4">
        <p className="text-center text-gray-600 mb-8">
          Enhance your experience with optional add-ons. 
          Each module can be enabled or disabled at any time.
        </p>
        
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold">Community</h2>
              </div>
              <Switch 
                checked={addOns.community} 
                onCheckedChange={() => toggleAddOn("community")}
              />
            </div>
            
            <p className="mb-4">
              Connect with others in moderated spaces. Share experiences 
              and support each other.
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-4 flex items-start">
              <Info className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                GIFs are auto-collapsed and profanity is filtered for a safer experience.
              </p>
            </div>
            
            <Button 
              variant="secondary" 
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800"
              onClick={() => alert("Preview would show in a real app")}
            >
              Preview
            </Button>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold">Gamification</h2>
              </div>
              <Switch 
                checked={addOns.gamification} 
                onCheckedChange={() => toggleAddOn("gamification")}
              />
            </div>
            
            <p>
              Earn badges and track streaks as you build healthy habits. 
              Celebrate your progress.
            </p>
          </Card>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={() => navigate("/welcome/finish")} 
          className="bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AddOnsMarketplace;
