
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BarChart2, History, LogIn } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAccessibility } from "@/context/AccessibilityContext";

const sosStrategies = [
  {
    name: "Visual Calming",
    description: "Watch gentle visual patterns designed to soothe and recenter",
    path: "/visual",
    color: "bg-calm-green"
  },
  {
    name: "Soundscape",
    description: "Listen to calming sounds that reduce sensory overload",
    path: "/sounds",
    color: "bg-calm-purple"
  },
  {
    name: "Gentle Haptic",
    description: "Use haptic feedback patterns to ground yourself",
    path: "/haptic",
    color: "bg-calm-pink"
  }
];

const SOSCalm = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="min-h-screen relative">
      <div className="bg-gradient-to-b from-rose-100 to-blue-100 absolute inset-0 -z-10" />
      
      <div className="relative z-10 p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/80 backdrop-blur-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/80 backdrop-blur-sm"
              onClick={() => navigate('/sos-history')}
            >
              <History className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">SOS Support</h1>
          <p className="text-lg opacity-75">What would help you right now?</p>
        </div>
        
        <div className="space-y-4">
          {sosStrategies.map((strategy) => (
            <Card 
              key={strategy.name}
              className={`p-4 transition-all ${highContrastEnabled ? 'bg-white border-2 border-black' : `${strategy.color}/40 hover:${strategy.color}/60`} backdrop-blur-sm cursor-pointer`}
              onClick={() => navigate(strategy.path)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{strategy.name}</h2>
                  <p className="text-sm opacity-75">{strategy.description}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${highContrastEnabled ? 'bg-black text-white' : 'bg-white/50'}`}>
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </div>
              </div>
            </Card>
          ))}
          
          {/* New tracking options */}
          <div className="mt-8 flex gap-4">
            <Button 
              className={`flex-1 py-6 ${highContrastEnabled ? 'bg-black text-white' : 'bg-white'}`}
              variant="outline"
              onClick={() => navigate('/meltdown-logger')}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Log Meltdown
            </Button>
            
            <Button 
              className={`flex-1 py-6 ${highContrastEnabled ? 'bg-black text-white' : 'bg-white'}`}
              variant="outline"
              onClick={() => navigate('/emotion-hub')}
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Emotion Hub
            </Button>
          </div>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm mt-8">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-1">Need immediate support?</h2>
                <p className="text-sm opacity-75">
                  If you're in crisis or need immediate assistance, please contact your support person or emergency services.
                </p>
                <Button 
                  className="mt-4 w-full"
                  onClick={() => navigate('/caregiver-view')}
                >
                  Contact Support Person
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SOSCalm;
