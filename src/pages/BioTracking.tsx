
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration
const dailyData = [
  { hour: '12AM', heartRate: 65, hrv: 55 },
  { hour: '3AM', heartRate: 62, hrv: 58 },
  { hour: '6AM', heartRate: 68, hrv: 52 },
  { hour: '9AM', heartRate: 82, hrv: 43 },
  { hour: '12PM', heartRate: 75, hrv: 47 },
  { hour: '3PM', heartRate: 77, hrv: 45 },
  { hour: '6PM', heartRate: 74, hrv: 46 },
  { hour: '9PM', heartRate: 70, hrv: 48 },
];

const weeklyData = {
  sleep: [85, 72, 65, 88, 76, 80, 78],
  regulation: [90, 85, 65, 50, 75, 80, 85],
  heartRate: [72, 68, 75, 82, 76, 74, 70],
};

const BioTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [thresholds, setThresholds] = useState({
    heartRateHigh: 90,
    heartRateLow: 60,
    hrvHigh: 65,
    hrvLow: 35,
    sleepQuality: 70,
  });
  
  const [settings, setSettings] = useState({
    autoAdjust: true,
    notifyOnChange: true,
    collectEnvironmental: true,
    shareToCaregivers: false,
  });
  
  const handleThresholdChange = (metric: keyof typeof thresholds, value: number) => {
    setThresholds(prev => ({
      ...prev,
      [metric]: value
    }));
  };
  
  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your biometric tracking settings have been updated",
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-blue p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Biometric Tracking</h1>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Monitor and customize how Hana uses your physiological data to detect early signs.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="status" className="text-sm md:text-base py-3">Current Status</TabsTrigger>
            <TabsTrigger value="thresholds" className="text-sm md:text-base py-3">Thresholds</TabsTrigger>
            <TabsTrigger value="patterns" className="text-sm md:text-base py-3">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Today's Metrics</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Heart Rate</h3>
                    <span>75 bpm</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>50</span>
                    <span>Rest: 68</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Heart Rate Variability</h3>
                    <span>45 ms</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>20</span>
                    <span>Target: 50+</span>
                    <span>80</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Sleep Quality</h3>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Regulation Status</h3>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-green-100" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Support Needed</span>
                    <span>Regulated</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Daily Trend</h2>
              
              <div className="h-60 flex items-end space-x-1">
                {dailyData.map((point, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="flex-grow flex flex-col-reverse w-full">
                      <div 
                        className="w-full bg-blue-200" 
                        style={{ height: `${(point.heartRate - 60) * 2}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 rotate-45 origin-left">
                      {point.hour}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                  <span className="text-sm">Heart Rate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-200 mr-2"></div>
                  <span className="text-sm">HRV</span>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="thresholds" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-6">Alert Thresholds</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Heart Rate (High)</Label>
                    <span>{thresholds.heartRateHigh} bpm</span>
                  </div>
                  <Slider 
                    value={[thresholds.heartRateHigh]} 
                    onValueChange={(values) => handleThresholdChange('heartRateHigh', values[0])}
                    min={70}
                    max={120}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Alert when heart rate goes above this threshold.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Heart Rate (Low)</Label>
                    <span>{thresholds.heartRateLow} bpm</span>
                  </div>
                  <Slider 
                    value={[thresholds.heartRateLow]} 
                    onValueChange={(values) => handleThresholdChange('heartRateLow', values[0])}
                    min={40}
                    max={70}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Alert when heart rate goes below this threshold.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>HRV (Low)</Label>
                    <span>{thresholds.hrvLow} ms</span>
                  </div>
                  <Slider 
                    value={[thresholds.hrvLow]} 
                    onValueChange={(values) => handleThresholdChange('hrvLow', values[0])}
                    min={20}
                    max={50}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Low HRV can indicate stress or dysregulation.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Sleep Quality</Label>
                    <span>{thresholds.sleepQuality}%</span>
                  </div>
                  <Slider 
                    value={[thresholds.sleepQuality]} 
                    onValueChange={(values) => handleThresholdChange('sleepQuality', values[0])}
                    min={50}
                    max={90}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Adjust sensitivity based on sleep quality.
                  </p>
                </div>
              </div>
              
              <Button onClick={saveSettings} className="w-full mt-6">
                Save Thresholds
              </Button>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-adjust Thresholds</Label>
                    <p className="text-sm text-muted-foreground">Let Hana learn from your patterns</p>
                  </div>
                  <Switch 
                    checked={settings.autoAdjust}
                    onCheckedChange={() => handleToggleSetting('autoAdjust')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get alerts when metrics change significantly</p>
                  </div>
                  <Switch 
                    checked={settings.notifyOnChange}
                    onCheckedChange={() => handleToggleSetting('notifyOnChange')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Environmental Data</Label>
                    <p className="text-sm text-muted-foreground">Collect ambient noise, light, etc.</p>
                  </div>
                  <Switch 
                    checked={settings.collectEnvironmental}
                    onCheckedChange={() => handleToggleSetting('collectEnvironmental')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Caregiver Access</Label>
                    <p className="text-sm text-muted-foreground">Share metrics with trusted support</p>
                  </div>
                  <Switch 
                    checked={settings.shareToCaregivers}
                    onCheckedChange={() => handleToggleSetting('shareToCaregivers')}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Weekly Insights</h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium mb-2">Sleep Quality</h3>
                  <div className="h-20 flex items-end space-x-2">
                    {weeklyData.sleep.map((value, i) => (
                      <div 
                        key={i}
                        className="flex-1"
                      >
                        <div 
                          className={`w-full ${value > 80 ? 'bg-green-200' : value > 70 ? 'bg-blue-200' : 'bg-amber-200'}`}
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Regulation Status</h3>
                  <div className="h-20 flex items-end space-x-2">
                    {weeklyData.regulation.map((value, i) => (
                      <div 
                        key={i}
                        className="flex-1"
                      >
                        <div 
                          className={`w-full ${value > 80 ? 'bg-green-200' : value > 60 ? 'bg-blue-200' : 'bg-red-200'}`}
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Pattern Recognition</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Time Patterns</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dysregulation tends to occur around 3-4PM on weekdays.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Environmental Factors</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Correlation detected between higher noise levels and reduced HRV.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Sleep Impact</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sleep quality under 70% correlates with 40% higher chance of dysregulation next day.
                  </p>
                </div>
              </div>
              
              <Button className="w-full mt-6" variant="outline">
                View Full Analysis
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BioTracking;
