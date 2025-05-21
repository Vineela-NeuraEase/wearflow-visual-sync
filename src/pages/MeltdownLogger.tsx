
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/context/AudioContext";

// Predefined trigger categories
const triggerCategories = [
  { name: "Noise", examples: "Loud sounds, sudden noises, specific frequencies" },
  { name: "Visual", examples: "Bright lights, flashing, visual patterns" },
  { name: "Tactile", examples: "Certain textures, tight clothing, touch" },
  { name: "Social", examples: "Crowds, social expectations, communication" },
  { name: "Change", examples: "Unexpected changes, transitions, surprises" },
  { name: "Environmental", examples: "Temperature, smells, air quality" },
  { name: "Internal", examples: "Hunger, fatigue, pain, illness" },
  { name: "Emotional", examples: "Stress, anxiety, frustration, excitement" }
];

// Predefined coping strategies
const copingStrategies = [
  "Deep breathing",
  "Sensory tool use",
  "Removing from situation",
  "Pressure/weighted items",
  "Sound dampening",
  "Stim toys/fidgets",
  "Visual blockers",
  "Verbal scripts",
  "Movement/exercise",
  "Quiet space",
  "Support person",
  "Other"
];

const MeltdownLogger = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { play } = useAudio();
  
  // State for meltdown data
  const [intensity, setIntensity] = useState<number>(5);
  const [duration, setDuration] = useState<string>("15");
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [customTrigger, setCustomTrigger] = useState<string>("");
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [customStrategy, setCustomStrategy] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  
  // Handle trigger selection
  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
      play("pop");
    }
  };
  
  // Handle adding custom trigger
  const addCustomTrigger = () => {
    if (customTrigger.trim() && !selectedTriggers.includes(customTrigger)) {
      setSelectedTriggers([...selectedTriggers, customTrigger]);
      setCustomTrigger("");
      play("pop");
    }
  };
  
  // Handle strategy selection
  const toggleStrategy = (strategy: string) => {
    if (selectedStrategies.includes(strategy)) {
      setSelectedStrategies(selectedStrategies.filter(s => s !== strategy));
    } else {
      setSelectedStrategies([...selectedStrategies, strategy]);
      play("pop");
    }
  };
  
  // Handle adding custom strategy
  const addCustomStrategy = () => {
    if (customStrategy.trim() && !selectedStrategies.includes(customStrategy)) {
      setSelectedStrategies([...selectedStrategies, customStrategy]);
      setCustomStrategy("");
      play("pop");
    }
  };
  
  // Handle save
  const handleSave = () => {
    // Here you would typically save the data to your state management or database
    // For now, we'll just show a success toast
    toast({
      title: "Meltdown logged",
      description: "Your meltdown data has been saved successfully.",
    });
    play("success");
    navigate("/emotion-hub");
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-amber-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Log Meltdown</h1>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <Card className="p-4 bg-amber-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-4">
            Track meltdown details to identify patterns and develop better coping strategies.
          </p>
        </Card>
        
        {/* Intensity slider */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Intensity</h2>
          <div className="space-y-6">
            <Slider
              value={[intensity]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setIntensity(value[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Mild (1)</span>
              <span>Moderate (5)</span>
              <span>Severe (10)</span>
            </div>
            <div className="text-center">
              <span className="font-medium text-lg">{intensity}/10</span>
            </div>
          </div>
        </Card>
        
        {/* Duration input */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Duration (minutes)</h2>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="max-w-xs"
              min="1"
            />
          </div>
        </Card>
        
        {/* Triggers selection */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Triggers</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {triggerCategories.map((category) => (
                <Button
                  key={category.name}
                  type="button"
                  variant={selectedTriggers.includes(category.name) ? "default" : "outline"}
                  className={`justify-start h-auto py-2 px-3 ${
                    selectedTriggers.includes(category.name) ? "bg-amber-500" : ""
                  }`}
                  onClick={() => toggleTrigger(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            {selectedTriggers.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Triggers:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTriggers.map((trigger) => (
                    <div 
                      key={trigger} 
                      className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {trigger}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 p-0"
                        onClick={() => toggleTrigger(trigger)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center mt-4">
              <Input
                placeholder="Add custom trigger"
                value={customTrigger}
                onChange={(e) => setCustomTrigger(e.target.value)}
                className="mr-2"
              />
              <Button onClick={addCustomTrigger} size="icon" disabled={!customTrigger.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Coping strategies */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Coping Strategies Used</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {copingStrategies.map((strategy) => (
                <Button
                  key={strategy}
                  type="button"
                  variant={selectedStrategies.includes(strategy) ? "default" : "outline"}
                  className={`justify-start h-auto py-2 px-3 ${
                    selectedStrategies.includes(strategy) ? "bg-blue-500" : ""
                  }`}
                  onClick={() => toggleStrategy(strategy)}
                >
                  {strategy}
                </Button>
              ))}
            </div>
            
            {selectedStrategies.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Strategies:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStrategies.map((strategy) => (
                    <div 
                      key={strategy} 
                      className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {strategy}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 ml-1 p-0"
                        onClick={() => toggleStrategy(strategy)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center mt-4">
              <Input
                placeholder="Add custom strategy"
                value={customStrategy}
                onChange={(e) => setCustomStrategy(e.target.value)}
                className="mr-2"
              />
              <Button onClick={addCustomStrategy} size="icon" disabled={!customStrategy.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Notes */}
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Notes</h2>
          <Textarea
            placeholder="Add any additional notes or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </Card>
        
        {/* Save button */}
        <Button 
          onClick={handleSave}
          className="w-full py-6 text-lg rounded-xl bg-amber-500 hover:bg-amber-600"
        >
          Save Meltdown Log
        </Button>
      </div>
    </div>
  );
};

export default MeltdownLogger;
