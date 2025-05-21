
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for environmental factors
const factors = [
  { name: "Noise Level", value: 65, unit: "dB", threshold: 70, icon: "🔊" },
  { name: "Brightness", value: 80, unit: "%", threshold: 85, icon: "💡" },
  { name: "Temperature", value: 72, unit: "°F", threshold: 78, icon: "🌡️" },
  { name: "Crowding", value: 45, unit: "%", threshold: 70, icon: "👥" },
  { name: "Sensory Input", value: 60, unit: "%", threshold: 75, icon: "👁️" },
];

const knownTriggers = [
  { 
    name: "Loud Unexpected Noises", 
    category: "Auditory",
    sensitivity: 90,
    notes: "Especially door slams, alarms, or dropping objects."
  },
  { 
    name: "Fluorescent Lighting", 
    category: "Visual",
    sensitivity: 75,
    notes: "Particularly in grocery stores or office buildings."
  },
  { 
    name: "Dense Crowds", 
    category: "Social/Physical",
    sensitivity: 80,
    notes: "Shopping malls, events, or public transport during rush hour."
  },
  { 
    name: "Clothing Tags", 
    category: "Tactile",
    sensitivity: 60,
    notes: "Tags on shirts or certain fabric textures."
  },
];

const EnvironmentalFactors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newTrigger, setNewTrigger] = useState({
    name: "",
    category: "Other",
    sensitivity: 50,
    notes: ""
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleSaveTrigger = () => {
    if (newTrigger.name.trim() === "") {
      toast({
        title: "Missing information",
        description: "Please provide a name for the trigger",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Trigger added",
      description: "Your new trigger has been saved"
    });
    
    setNewTrigger({
      name: "",
      category: "Other",
      sensitivity: 50,
      notes: ""
    });
    
    setShowAddForm(false);
  };
  
  const logCurrentEnvironment = () => {
    toast({
      title: "Environment logged",
      description: "Current environmental factors have been recorded"
    });
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-sense-green p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Environmental Factors</h1>
        </div>
        
        <p className="text-sm px-4 text-muted-foreground">
          Identify and track environmental factors that may affect your regulation.
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Current Environment</h2>
              
              <div className="space-y-5">
                {factors.map((factor, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{factor.icon}</span>
                        <span>{factor.name}</span>
                      </div>
                      <span className="font-medium">
                        {factor.value} {factor.unit}
                      </span>
                    </div>
                    
                    <Progress 
                      value={(factor.value / factor.threshold) * 100} 
                      className={`h-2 ${factor.value > factor.threshold * 0.9 ? 'bg-amber-100' : 'bg-blue-100'}`}
                    />
                    
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-muted-foreground">
                        Threshold: {factor.threshold} {factor.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={logCurrentEnvironment} className="w-full mt-6">
                Log Current Environment
              </Button>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Environmental Risk Level</h2>
              
              <div className="flex justify-between mb-2">
                <span className="text-amber-600 font-medium">Moderate</span>
                <span className="font-medium">65%</span>
              </div>
              
              <Progress value={65} className="h-3 bg-amber-100" />
              
              <p className="mt-4 text-sm">
                Current noise level and brightness are approaching your personal thresholds.
                Consider adjusting your environment if possible.
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Suggestions</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Reduce brightness or use blue light filter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use noise-canceling headphones if available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Take a brief break in a quieter space if possible</span>
                  </li>
                </ul>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="triggers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Known Triggers</h2>
              <Button 
                size="sm" 
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> 
                <span>Add New</span>
              </Button>
            </div>
            
            {showAddForm && (
              <Card className="p-5 bg-blue-50">
                <h3 className="font-medium mb-4">Add New Trigger</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="trigger-name">Trigger Name</Label>
                    <input
                      id="trigger-name"
                      className="w-full p-2 rounded border mt-1"
                      value={newTrigger.name}
                      onChange={(e) => setNewTrigger({...newTrigger, name: e.target.value})}
                      placeholder="e.g., Specific fabric texture, sound type"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="trigger-category">Category</Label>
                    <select
                      id="trigger-category"
                      className="w-full p-2 rounded border mt-1"
                      value={newTrigger.category}
                      onChange={(e) => setNewTrigger({...newTrigger, category: e.target.value})}
                    >
                      <option value="Auditory">Auditory</option>
                      <option value="Visual">Visual</option>
                      <option value="Tactile">Tactile</option>
                      <option value="Social/Physical">Social/Physical</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label>Sensitivity Level</Label>
                      <span>{newTrigger.sensitivity}%</span>
                    </div>
                    <Slider
                      value={[newTrigger.sensitivity]}
                      onValueChange={(values) => setNewTrigger({...newTrigger, sensitivity: values[0]})}
                      max={100}
                      step={5}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="trigger-notes">Notes (Optional)</Label>
                    <textarea
                      id="trigger-notes"
                      className="w-full p-2 rounded border mt-1"
                      value={newTrigger.notes}
                      onChange={(e) => setNewTrigger({...newTrigger, notes: e.target.value})}
                      placeholder="Any specific details about this trigger"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSaveTrigger}
                      className="flex-1"
                    >
                      Save Trigger
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            
            <div className="space-y-3">
              {knownTriggers.map((trigger, i) => (
                <Card key={i} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{trigger.name}</h3>
                      <span className="text-sm text-muted-foreground">Category: {trigger.category}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      trigger.sensitivity > 80 ? 'bg-red-100 text-red-800' :
                      trigger.sensitivity > 60 ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {trigger.sensitivity}% sensitivity
                    </span>
                  </div>
                  
                  {trigger.notes && (
                    <p className="mt-2 text-sm">
                      {trigger.notes}
                    </p>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Log Occurrence
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Trigger Correlations</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">High Correlation</h3>
                    <span className="text-sm">85%</span>
                  </div>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Noise levels above 75dB</span> have
                    a strong correlation with reduced HRV and early signs of dysregulation.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Medium Correlation</h3>
                    <span className="text-sm">65%</span>
                  </div>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Crowded environments</span> show a 
                    moderate correlation with increased heart rate, particularly when
                    combined with bright lighting.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Medium Correlation</h3>
                    <span className="text-sm">60%</span>
                  </div>
                  <p className="mt-1 text-sm">
                    <span className="font-medium">Temperature above 78°F</span> shows
                    correlation with reduced comfort levels and increased self-reported
                    sensory sensitivity.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-5">
              <h2 className="text-lg font-medium mb-4">Environmental Recommendations</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-800">
                    <span className="text-lg">🔊</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Sound Management</h3>
                    <p className="text-sm mt-1">
                      Based on your patterns, consider using noise-canceling headphones
                      during commute times and in public spaces with unpredictable sounds.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-800">
                    <span className="text-lg">💡</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Lighting Adjustments</h3>
                    <p className="text-sm mt-1">
                      Your data suggests benefits from reduced lighting in the evening
                      and avoiding fluorescent lighting when possible.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-800">
                    <span className="text-lg">📆</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Scheduling Strategies</h3>
                    <p className="text-sm mt-1">
                      Consider scheduling demanding activities earlier in the day when
                      your regulation scores are typically higher.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">
                Generate Personalized Environment Plan
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnvironmentalFactors;
