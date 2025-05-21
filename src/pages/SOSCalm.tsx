
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Sound, Mic, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SOSCalm = () => {
  const navigate = useNavigate();
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathing, setIsBreathing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [visualEnabled, setVisualEnabled] = useState(false);
  
  const startBreathing = () => {
    setIsBreathing(true);
    // In a real app, this would start the breathing cycle animation
  };
  
  const closeOverlay = () => {
    navigate(-1);
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  const toggleVibration = () => {
    setVibrationEnabled(prev => !prev);
    // In a real app, this would trigger device vibration
  };
  
  const toggleVisual = () => {
    setVisualEnabled(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-calm-blue/30 p-6 flex flex-col">
      <div className="calm-container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">SOS Calm</h1>
          <Button variant="ghost" className="rounded-full" onClick={closeOverlay}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="early" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="early" className="text-base">Early Stress</TabsTrigger>
            <TabsTrigger value="high" className="text-base">High Stress</TabsTrigger>
            <TabsTrigger value="reset" className="text-base">Reset</TabsTrigger>
          </TabsList>
          
          <TabsContent value="early" className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Let's take a deep breath
            </h2>
            <p className="text-center text-lg mb-6">
              Follow the circle to breathe in and out
            </p>
            
            <div className="relative flex justify-center items-center my-12">
              <div className={`w-64 h-64 rounded-full border-8 border-blue-300 ${
                isBreathing ? "animate-pulse-gentle" : ""
              }`}></div>
              <div className="absolute text-6xl font-bold">{breathCount}</div>
            </div>
            
            <Button 
              className="w-full bg-blue-500 py-6 text-xl mb-8"
              onClick={startBreathing}
            >
              Start Breathing
            </Button>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className={`flex-1 mx-1 ${soundEnabled ? "bg-primary text-white" : ""}`}
                onClick={toggleSound}
              >
                <Sound className="mr-2 h-4 w-4" /> Sound
              </Button>
              
              <Button 
                variant="outline" 
                className={`flex-1 mx-1 ${vibrationEnabled ? "bg-primary text-white" : ""}`}
                onClick={toggleVibration}
              >
                <Mic className="mr-2 h-4 w-4" /> Vibration
              </Button>
              
              <Button 
                variant="outline" 
                className={`flex-1 mx-1 ${visualEnabled ? "bg-primary text-white" : ""}`}
                onClick={toggleVisual}
              >
                <HeartOff className="mr-2 h-4 w-4" /> Visual
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="high" className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-center">
              Grounding Exercise
            </h2>
            <p className="my-4 text-center">Focus on what you can see, touch, and hear right now.</p>
            
            <div className="space-y-4 my-8">
              <div className="bg-calm-blue/30 rounded-xl p-4">
                <h3 className="font-medium mb-2">5 things you can see</h3>
                <p className="text-sm text-gray-600">Look around and name 5 objects in your surroundings.</p>
              </div>
              
              <div className="bg-calm-purple/30 rounded-xl p-4">
                <h3 className="font-medium mb-2">4 things you can touch</h3>
                <p className="text-sm text-gray-600">Notice the texture of 4 things around you.</p>
              </div>
              
              <div className="bg-calm-pink/30 rounded-xl p-4">
                <h3 className="font-medium mb-2">3 things you can hear</h3>
                <p className="text-sm text-gray-600">Listen for 3 sounds in your environment.</p>
              </div>
            </div>
            
            <Button className="w-full bg-primary py-4">Begin Grounding</Button>
          </TabsContent>
          
          <TabsContent value="reset" className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-center">Reset</h2>
            <p className="text-center my-4">Take a moment to reset your mind and body.</p>
            
            <div className="space-y-6 my-8">
              <Button variant="outline" className="w-full py-6 justify-start text-left">
                <div className="mr-4 rounded-full bg-calm-blue/30 p-2">
                  <Wind className="h-5 w-5 text-blue-500" />
                </div>
                <span>2-minute breathing reset</span>
              </Button>
              
              <Button variant="outline" className="w-full py-6 justify-start text-left">
                <div className="mr-4 rounded-full bg-calm-purple/30 p-2">
                  <Sound className="h-5 w-5 text-purple-500" />
                </div>
                <span>1-minute calming sound</span>
              </Button>
              
              <Button variant="outline" className="w-full py-6 justify-start text-left">
                <div className="mr-4 rounded-full bg-calm-pink/30 p-2">
                  <HeartOff className="h-5 w-5 text-pink-500" />
                </div>
                <span>Quick stress relief</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SOSCalm;

// Custom Wind icon for this component
const Wind = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
};

export default SOSCalm;
