
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAccessibility } from "@/context/AccessibilityContext";

const FeedbackSettings = () => {
  const navigate = useNavigate();
  const [hapticIntensity, setHapticIntensity] = useState("medium");
  const { soundVolume, setSoundVolume } = useAccessibility();
  const [soundType, setSoundType] = useState("standard");
  const [frequency, setFrequency] = useState([50]);
  
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

  const testSound = (type: string) => {
    // In a real app, this would play sound samples
    console.log(`Playing ${type} sound at volume ${soundVolume}%`);
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
        <Tabs defaultValue="haptic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="haptic" className="text-base py-3">Haptic</TabsTrigger>
            <TabsTrigger value="sound" className="text-base py-3">Sound</TabsTrigger>
          </TabsList>
          
          <TabsContent value="haptic">
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
            
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-4">Advanced Haptic Settings</h2>
              
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg mb-3">Pattern Duration</h3>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Short</span>
                    <span>Medium</span>
                    <span>Long</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg mb-3">Haptic Pattern Type</h3>
                  <RadioGroup defaultValue="standard" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard-haptic" />
                      <Label htmlFor="standard-haptic">Standard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gentle" id="gentle-haptic" />
                      <Label htmlFor="gentle-haptic">Gentle (lower intensity)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gradual" id="gradual-haptic" />
                      <Label htmlFor="gradual-haptic">Gradual (builds up slowly)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </Card>
            </section>
            
            <section className="bg-pink-50 rounded-xl p-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="sound">
            <section>
              <h2 className="text-2xl font-bold mb-4">Sound Type</h2>
              
              <Card className="p-6">
                <RadioGroup value={soundType} onValueChange={setSoundType} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="text-lg">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gentle" id="gentle" />
                    <Label htmlFor="gentle" className="text-lg">Gentle & Soft</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nature" id="nature" />
                    <Label htmlFor="nature" className="text-lg">Nature Inspired</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal" className="text-lg">Minimal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="sound-none" />
                    <Label htmlFor="sound-none" className="text-lg">No Sounds</Label>
                  </div>
                </RadioGroup>
              </Card>
              
              <div className="mt-6 flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => testSound('notification')}
                  disabled={soundType === 'none'}
                >
                  Test Notification
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => testSound('feedback')}
                  disabled={soundType === 'none'}
                >
                  Test Feedback
                </Button>
              </div>
            </section>
            
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-4">Sound Volume</h2>
              
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Overall Volume</span>
                    <span>{soundVolume}%</span>
                  </div>
                  
                  <Slider
                    value={[soundVolume]}
                    onValueChange={(value) => setSoundVolume(value[0])}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mute</span>
                    <span>Medium</span>
                    <span>Maximum</span>
                  </div>
                </div>
              </Card>
            </section>
            
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-4">Sound Filter</h2>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-3">Frequency Filter</h3>
                <p className="text-gray-600 mb-4">
                  Adjust to reduce harsh or uncomfortable sound frequencies.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">High Frequency Filter</span>
                      <span className="text-sm">{frequency[0]}%</span>
                    </div>
                    <Slider
                      value={frequency}
                      onValueChange={setFrequency}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>No filtering</span>
                      <span>Maximum filtering</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="soft-transitions" className="text-base">Soft Sound Transitions</Label>
                      <p className="text-sm text-muted-foreground">Makes sounds fade in/out gently</p>
                    </div>
                    <Switch id="soft-transitions" defaultChecked />
                  </div>
                </div>
              </Card>
            </section>
            
            <section className="mt-6">
              <h2 className="text-xl font-bold mb-4">Context-specific Settings</h2>
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">SOS Calm Mode</h3>
                    <p className="text-sm text-muted-foreground">Gentler sounds during SOS mode</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Night Mode Sounds</h3>
                    <p className="text-sm text-muted-foreground">Lower volume during night hours</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
        
        <div>
          <Button 
            onClick={() => navigate('/sensory-profile')} 
            className="w-full"
            variant="outline"
          >
            Update Sensory Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSettings;
