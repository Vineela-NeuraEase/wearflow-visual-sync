
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const FeedbackSettings = () => {
  const navigate = useNavigate();
  const [hapticIntensity, setHapticIntensity] = useState("medium");
  
  const testHaptic = () => {
    // In a real app, this would trigger a haptic feedback
    // For now we'll just log it
    console.log("Testing haptic feedback at intensity:", hapticIntensity);
    
    // Vibrate if supported by the browser
    if ("vibrate" in navigator) {
      switch (hapticIntensity) {
        case "light":
          navigator.vibrate(50);
          break;
        case "medium":
          navigator.vibrate([50, 30, 50]);
          break;
        case "strong":
          navigator.vibrate([100, 30, 100, 30, 100]);
          break;
        default:
          // No vibration for "none"
          break;
      }
    }
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-blue-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Feedback Settings</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Haptic Intensity</h2>
          
          <Card className="p-6">
            <RadioGroup value={hapticIntensity} onValueChange={setHapticIntensity} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="text-lg">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="text-lg">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-lg">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strong" id="strong" />
                <Label htmlFor="strong" className="text-lg">Strong</Label>
              </div>
            </RadioGroup>
          </Card>
        </section>
        
        <section className="bg-pink-50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Test Haptic Feedback</h2>
          
          <div className="flex justify-center">
            <Card 
              className="w-40 h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 active:bg-gray-100"
              onClick={testHaptic}
            >
              <span className="text-xl font-medium text-center">Tap Here</span>
            </Card>
          </div>
          
          <p className="text-center mt-6">
            Tap to feel the selected intensity for 1 second
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Sound Filter</h2>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Frequency Filter</h3>
            <p className="text-gray-600">
              Adjust to reduce harsh or uncomfortable sound frequencies.
            </p>
            {/* Sound filter controls would be added here in a future update */}
          </Card>
        </section>
      </div>
    </div>
  );
};

export default FeedbackSettings;
