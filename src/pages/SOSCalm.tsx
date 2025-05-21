
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Volume, Mic, HeartOff, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import "../styles/animations.css";

// Mock data for demonstration
const mockBioData = {
  heartRate: 85, // bpm
  hrv: 45, // ms
  restingHeartRate: 70,
  sleepQuality: 72, // percent
};

const SOSCalm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathing, setIsBreathing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [visualEnabled, setVisualEnabled] = useState(true);
  const [currentPhase, setCurrentPhase] = useState("rumbling");
  const [timerActive, setTimerActive] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [sensitivityThreshold, setSensitivityThreshold] = useState(70);
  const [showBioData, setShowBioData] = useState(false);
  
  // Simulated alertness score based on mock data
  const calculateRegulationScore = () => {
    const hrDelta = mockBioData.heartRate - mockBioData.restingHeartRate;
    const baseScore = 100 - Math.min(hrDelta * 2, 40) - (100 - mockBioData.sleepQuality) / 2;
    return Math.max(Math.min(baseScore, 100), 0);
  };
  
  const regulationScore = calculateRegulationScore();
  const isRumbling = regulationScore < sensitivityThreshold;
  
  useEffect(() => {
    if (isRumbling) {
      toast({
        title: "Early signals detected",
        description: "Your body data shows early signs of dysregulation",
        duration: 5000,
      });
    }
  }, [isRumbling]);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (timerActive) {
      interval = window.setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startBreathing = () => {
    setIsBreathing(true);
    setTimerActive(true);
    
    toast({
      title: "Breathing exercise started",
      description: "Following the breathing pattern may help you regulate"
    });
  };
  
  const stopBreathing = () => {
    setIsBreathing(false);
    setTimerActive(false);
    
    toast({
      title: "Breathing exercise stopped",
      description: "You can restart anytime you need"
    });
  };
  
  const closeOverlay = () => {
    navigate(-1);
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    if (!soundEnabled) {
      // Play a soft sound when enabled
      // This would be implemented with actual sound in a real app
    }
  };
  
  const toggleVibration = () => {
    setVibrationEnabled(prev => !prev);
    if (!vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(100);
    }
  };
  
  const toggleVisual = () => {
    setVisualEnabled(prev => !prev);
  };
  
  const logFeeling = (phase: string) => {
    setCurrentPhase(phase);
    
    // In a real app, this would log the data to train the ML model
    toast({
      title: `Phase logged: ${phase}`,
      description: "Your input helps the app learn your patterns",
      duration: 3000,
    });
  };
  
  const saveIntervention = (wasEffective: boolean) => {
    // This would save the intervention effectiveness data
    toast({
      title: wasEffective ? "Great!" : "We'll note that",
      description: wasEffective 
        ? "We'll remember this strategy worked for you" 
        : "We'll suggest different approaches next time",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-calm-blue/30 p-6 flex flex-col">
      <div className="calm-container max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">SOS Calm</h1>
          <Button variant="ghost" className="rounded-full" onClick={closeOverlay}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-medium">Regulation Status</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowBioData(!showBioData)}
              className="text-xs"
            >
              {showBioData ? "Hide Details" : "Show Details"}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 items-center">
                <span className={isRumbling ? "text-amber-600 font-medium" : "text-green-600 font-medium"}>
                  {isRumbling ? "Early signals detected" : "Regulated state"}
                </span>
                <span className="text-sm">{regulationScore}%</span>
              </div>
              
              <Progress 
                value={regulationScore} 
                className={`h-2 ${
                  regulationScore > 80 ? "bg-green-100" : 
                  regulationScore > 60 ? "bg-blue-100" : 
                  regulationScore > 40 ? "bg-amber-100" : "bg-red-100"
                }`} 
              />
              
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Need Support</span>
                <span className="text-xs text-muted-foreground">Regulated</span>
              </div>
            </div>
            
            {showBioData && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm">Heart Rate</span>
                  <span className="text-sm font-medium">{mockBioData.heartRate} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">HRV</span>
                  <span className="text-sm font-medium">{mockBioData.hrv} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep Quality</span>
                  <span className="text-sm font-medium">{mockBioData.sleepQuality}%</span>
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <div className="flex justify-between items-center mb-1">
                <Label className="text-sm">Alert Sensitivity</Label>
                <span className="text-xs">{sensitivityThreshold}%</span>
              </div>
              <Slider 
                value={[sensitivityThreshold]} 
                onValueChange={(value) => setSensitivityThreshold(value[0])} 
                max={100} 
                step={5} 
                className="mb-6"
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={isRumbling ? "rumbling" : "tools"} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="rumbling" className="text-base">Early Signs</TabsTrigger>
            <TabsTrigger value="tools" className="text-base">Tools</TabsTrigger>
            <TabsTrigger value="feedback" className="text-base">Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rumbling" className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Current Status</h2>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Early Signs Detected</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Your biometric data shows early changes that might indicate dysregulation.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">How are you feeling?</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className={`flex flex-col py-3 ${currentPhase === "regulated" ? "bg-green-50 border-green-300" : ""}`}
                    onClick={() => logFeeling("regulated")}
                  >
                    <span className="text-xl">😌</span>
                    <span className="text-sm">Regulated</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`flex flex-col py-3 ${currentPhase === "rumbling" ? "bg-amber-50 border-amber-300" : ""}`}
                    onClick={() => logFeeling("rumbling")}
                  >
                    <span className="text-xl">😟</span>
                    <span className="text-sm">Early Signs</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`flex flex-col py-3 ${currentPhase === "peak" ? "bg-red-50 border-red-300" : ""}`}
                    onClick={() => logFeeling("peak")}
                  >
                    <span className="text-xl">😣</span>
                    <span className="text-sm">Intense</span>
                  </Button>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Recommended Actions</h3>
                <div className="space-y-2">
                  <Button 
                    className="w-full justify-start text-left h-auto py-3 pl-4"
                    onClick={startBreathing}
                  >
                    <div className="mr-3 p-2 rounded-full bg-blue-100">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Breathing Exercise</span>
                      <span className="text-sm text-muted-foreground">Slow breathing pattern</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 pl-4"
                    onClick={() => navigate('/visual')}
                  >
                    <div className="mr-3 p-2 rounded-full bg-purple-100">
                      <HeartOff className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Visual Focus</span>
                      <span className="text-sm text-muted-foreground">Calming visuals</span>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 pl-4"
                    onClick={() => navigate('/haptic')}
                  >
                    <div className="mr-3 p-2 rounded-full bg-green-100">
                      <Mic className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Gentle Haptic</span>
                      <span className="text-sm text-muted-foreground">Soothing vibration patterns</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold text-center mb-4">
              Let's take a deep breath
            </h2>
            
            {isBreathing ? (
              <div className="relative flex justify-center items-center my-12">
                <div className={`w-64 h-64 rounded-full border-8 border-blue-300 animate-pulse-gentle transition-all duration-4000`}></div>
                <div className="absolute text-6xl font-bold text-blue-700">
                  {breathCount}
                </div>
              </div>
            ) : (
              <div className="relative flex justify-center items-center my-12">
                <div className="w-64 h-64 rounded-full border-8 border-blue-300"></div>
                <div className="absolute text-6xl font-bold">
                  {breathCount}
                </div>
              </div>
            )}
            
            <div className="text-center mb-8">
              {timerActive && <div className="text-2xl">{formatTime(secondsElapsed)}</div>}
            </div>
            
            <Button 
              className="w-full bg-blue-500 py-6 text-xl mb-8"
              onClick={isBreathing ? stopBreathing : startBreathing}
            >
              {isBreathing ? "Stop Breathing Exercise" : "Start Breathing Exercise"}
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Volume className="mr-2 h-5 w-5" />
                  <span>Sound Guidance</span>
                </div>
                <Switch 
                  checked={soundEnabled} 
                  onCheckedChange={toggleSound} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="mr-2 h-5 w-5" />
                  <span>Vibration Pattern</span>
                </div>
                <Switch 
                  checked={vibrationEnabled} 
                  onCheckedChange={toggleVibration}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HeartOff className="mr-2 h-5 w-5" />
                  <span>Visual Guidance</span>
                </div>
                <Switch 
                  checked={visualEnabled} 
                  onCheckedChange={toggleVisual}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="feedback" className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-semibold text-center mb-4">Session Feedback</h2>
            
            <div className="space-y-6 my-4">
              <div>
                <h3 className="font-medium mb-3">Did this help you avoid dysregulation?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="py-6 flex flex-col"
                    onClick={() => saveIntervention(true)}
                  >
                    <span className="text-3xl mb-2">👍</span>
                    <span>Yes, it helped</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="py-6 flex flex-col"
                    onClick={() => saveIntervention(false)}
                  >
                    <span className="text-3xl mb-2">👎</span>
                    <span>No, try another</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Current Feeling</h3>
                <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                  <span>Dysregulated</span>
                  <div className="space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button 
                        key={value} 
                        variant="ghost"
                        size="sm"
                        className={`rounded-full w-8 h-8 ${value === 3 ? 'bg-blue-200' : ''}`}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <span>Regulated</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Notes (optional)</h3>
                <textarea 
                  className="w-full border rounded-md p-2 h-24"
                  placeholder="What worked? What didn't? Any patterns you noticed?"
                ></textarea>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4"
              onClick={() => {
                toast({
                  title: "Feedback saved",
                  description: "Thank you for your input"
                });
                navigate(-1);
              }}
            >
              Save & Close
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SOSCalm;
