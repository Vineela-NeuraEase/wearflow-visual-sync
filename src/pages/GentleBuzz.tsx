
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type HapticPattern = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const GentleBuzz = () => {
  const navigate = useNavigate();
  const [activePattern, setActivePattern] = useState<HapticPattern | null>(null);
  const [intensity, setIntensity] = useState(60);
  
  const hapticPatterns: HapticPattern[] = [
    {
      id: "pulse",
      name: "Pulse",
      description: "Short rhythmic pulses",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "bg-calm-purple/30",
    },
    {
      id: "gentle-waves",
      name: "Gentle Waves",
      description: "Soft rhythmic pattern",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
          <path d="M2 12C2 12 5 18 12 18C19 18 22 12 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "bg-calm-blue/30",
    },
    {
      id: "heartbeat",
      name: "Heartbeat",
      description: "Mimics a calm heartbeat",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
          <path d="M19.5 13.5L12 21L4.5 13.5C2.5 11.5 2.5 8.5 4.5 6.5C6.5 4.5 9.5 4.5 11.5 6.5L12 7L12.5 6.5C14.5 4.5 17.5 4.5 19.5 6.5C21.5 8.5 21.5 11.5 19.5 13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "bg-calm-green/30",
    },
    {
      id: "ocean",
      name: "Ocean",
      description: "Gentle rise and fall",
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
          <path d="M22 18.5C22 16.1667 19.5 11.5 12 11.5C4.5 11.5 2 16.1667 2 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 8.5C18 6.5 16 3.5 12 3.5C8 3.5 6 6.5 6 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "bg-calm-pink/30",
    },
  ];
  
  const selectPattern = (pattern: HapticPattern) => {
    setActivePattern(pattern);
    // In a real app, this would start the haptic feedback pattern
  };
  
  const stopPattern = () => {
    setActivePattern(null);
    // In a real app, this would stop the haptic feedback
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/tools')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Gentle Buzz</h1>
      </div>
      
      <div className="calm-container bg-calm-pink/30">
        <div className="flex items-center mb-4">
          <ArrowLeft className="h-5 w-5 text-primary cursor-pointer" onClick={() => navigate('/tools')} />
          <h2 className="text-2xl font-semibold ml-4">Gentle Buzz</h2>
        </div>
        
        <Card className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-medium mb-4">Current Pattern</h3>
          
          <div className="flex items-center mb-6">
            <div className={`${activePattern?.color || "bg-gray-100"} rounded-full p-4 mr-4`}>
              {activePattern?.icon || (
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-lg">{activePattern?.name || "No pattern selected"}</h4>
              <p className="text-muted-foreground">{activePattern?.description || "Select a pattern below"}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span>Intensity</span>
              <span>{intensity}%</span>
            </div>
            <Slider
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              max={100}
              step={1}
            />
          </div>
          
          {activePattern && (
            <Button 
              className="w-full bg-primary"
              onClick={stopPattern}
            >
              <Pause className="mr-2 h-4 w-4" /> Stop
            </Button>
          )}
        </Card>
        
        <h3 className="text-xl font-medium mb-4">Haptic Patterns</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {hapticPatterns.map((pattern) => (
            <Card
              key={pattern.id}
              className={`${
                activePattern?.id === pattern.id
                  ? "ring-2 ring-primary"
                  : ""
              } p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => selectPattern(pattern)}
            >
              <div className={`${pattern.color} rounded-full p-4 mb-3`}>
                {pattern.icon}
              </div>
              <h4 className="font-medium text-center">{pattern.name}</h4>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GentleBuzz;
