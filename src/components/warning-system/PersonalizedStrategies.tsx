
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Strategy categories and their specific techniques
const strategies = {
  sensory: [
    { id: "sens1", name: "Deep pressure", description: "Apply weighted blanket or compression vest", effectiveness: 85 },
    { id: "sens2", name: "Noise cancellation", description: "Use noise-cancelling headphones", effectiveness: 75 },
    { id: "sens3", name: "Sensory retreat", description: "Move to a dimly lit, quiet space", effectiveness: 90 }
  ],
  breathing: [
    { id: "breath1", name: "4-7-8 Breathing", description: "Inhale for 4s, hold for 7s, exhale for 8s", effectiveness: 80 },
    { id: "breath2", name: "Box breathing", description: "Equal counts for inhale, hold, exhale, and pause", effectiveness: 75 }
  ],
  movement: [
    { id: "move1", name: "Progressive muscle relaxation", description: "Tense and release muscle groups", effectiveness: 70 },
    { id: "move2", name: "Rocking motion", description: "Gentle rocking in chair or standing", effectiveness: 85 },
    { id: "move3", name: "Joint compressions", description: "Apply pressure to joints in arms and legs", effectiveness: 80 }
  ],
  cognitive: [
    { id: "cog1", name: "Grounding technique", description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste", effectiveness: 75 },
    { id: "cog2", name: "Thought labeling", description: "Label intrusive thoughts as 'just thoughts'", effectiveness: 65 }
  ]
};

interface Strategy {
  id: string;
  name: string;
  description: string;
  effectiveness: number;
}

interface PersonalizedStrategiesProps {
  onClose: () => void;
  warningLevel?: 'notice' | 'watch' | 'alert';
}

export const PersonalizedStrategies = ({ onClose, warningLevel = 'notice' }: PersonalizedStrategiesProps) => {
  const { toast } = useToast();
  const [usedStrategies, setUsedStrategies] = useState<string[]>([]);
  
  // Filter strategies based on their effectiveness for the current warning level
  const getRelevantStrategies = (categoryStrategies: Strategy[]): Strategy[] => {
    const thresholds = {
      alert: 80, // For alert level, show strategies with 80%+ effectiveness
      watch: 70, // For watch level, show strategies with 70%+ effectiveness
      notice: 0  // For notice level, show all strategies
    };
    
    return categoryStrategies
      .filter(s => s.effectiveness >= thresholds[warningLevel])
      .sort((a, b) => b.effectiveness - a.effectiveness);
  };
  
  const markAsUsed = (strategyId: string) => {
    setUsedStrategies(prev => [...prev, strategyId]);
    
    toast({
      title: "Strategy marked as used",
      description: "We'll track its effectiveness in your profile"
    });
  };
  
  const rateStrategy = (strategyId: string, effective: boolean) => {
    toast({
      title: effective ? "Strategy rated as effective" : "Strategy rated as ineffective",
      description: "Thank you for your feedback. This helps improve future recommendations."
    });
    
    // In a real application, this would store the rating in the database
    console.log("Strategy rated:", { strategyId, effective });
  };
  
  const getHeaderColor = () => {
    switch (warningLevel) {
      case 'alert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'watch': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  return (
    <Card className="p-5">
      <div className={`-m-5 mb-5 p-4 ${getHeaderColor()}`}>
        <h2 className="text-lg font-semibold">Recommended Regulation Strategies</h2>
        <p className="text-sm opacity-80">Personalized for your current state</p>
      </div>
      
      <Tabs defaultValue="sensory">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="sensory">Sensory</TabsTrigger>
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitive</TabsTrigger>
        </TabsList>
        
        {Object.entries(strategies).map(([category, categoryStrategies]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {getRelevantStrategies(categoryStrategies).map(strategy => (
              <div 
                key={strategy.id}
                className={`p-3 border rounded-lg ${
                  usedStrategies.includes(strategy.id) 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30' 
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{strategy.name}</h3>
                  <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                    {strategy.effectiveness}% effective
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {strategy.description}
                </p>
                
                {usedStrategies.includes(strategy.id) ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Used
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => rateStrategy(strategy.id, true)}
                        className="flex items-center"
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helped
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => rateStrategy(strategy.id, false)}
                        className="flex items-center"
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        Didn't Help
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => markAsUsed(strategy.id)} 
                    size="sm" 
                    className="w-full"
                  >
                    Mark as Used
                  </Button>
                )}
              </div>
            ))}
            
            {getRelevantStrategies(categoryStrategies).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No specific strategies recommended for this category at the current warning level.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <Button onClick={onClose} variant="outline" className="w-full mt-6">
        Close
      </Button>
    </Card>
  );
};
