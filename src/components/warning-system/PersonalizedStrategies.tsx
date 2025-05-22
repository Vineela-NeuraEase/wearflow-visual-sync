
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, XCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStrategies, Strategy } from "@/hooks/warning-system/useStrategies";

interface PersonalizedStrategiesProps {
  onClose: () => void;
  warningLevel: "normal" | "notice" | "watch" | "alert";
}

export const PersonalizedStrategies = ({ 
  onClose, 
  warningLevel 
}: PersonalizedStrategiesProps) => {
  const { 
    strategies,
    isLoading,
    saveStrategy,
    deleteStrategy,
    updateEffectiveness
  } = useStrategies();
  
  const [isAddingStrategy, setIsAddingStrategy] = useState(false);
  const [newStrategy, setNewStrategy] = useState<Partial<Strategy>>({
    name: "",
    description: "",
    category: "sensory",
    effectiveness: 0
  });
  
  // Filter strategies based on warning level
  const getStrategiesForLevel = () => {
    if (warningLevel === "alert") {
      // For urgent situations, show only high effectiveness strategies
      return strategies.filter(s => s.effectiveness >= 4);
    } else if (warningLevel === "watch") {
      // For watch level, show medium to high effectiveness strategies
      return strategies.filter(s => s.effectiveness >= 3);
    } else {
      // For normal or notice levels, show all strategies
      return strategies;
    }
  };

  const filteredStrategies = getStrategiesForLevel();
  
  // Categorize strategies
  const categorizedStrategies = {
    sensory: filteredStrategies.filter(s => s.category === "sensory"),
    calming: filteredStrategies.filter(s => s.category === "calming"),
    communication: filteredStrategies.filter(s => s.category === "communication"),
    environmental: filteredStrategies.filter(s => s.category === "environmental"),
    other: filteredStrategies.filter(s => s.category === "other"),
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewStrategy({
      ...newStrategy,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setNewStrategy({
      ...newStrategy,
      category: value
    });
  };
  
  // Save a new strategy
  const handleSaveStrategy = async () => {
    if (!newStrategy.name) return;
    
    const strategyToSave = {
      id: crypto.randomUUID(),
      name: newStrategy.name!,
      description: newStrategy.description || "",
      category: newStrategy.category || "other",
      effectiveness: newStrategy.effectiveness || 0
    };
    
    const result = await saveStrategy(strategyToSave);
    
    if (result) {
      setIsAddingStrategy(false);
      setNewStrategy({
        name: "",
        description: "",
        category: "sensory",
        effectiveness: 0
      });
    }
  };
  
  // Handle strategy rating
  const handleRateStrategy = async (id: string, rating: number) => {
    await updateEffectiveness(id, rating);
  };

  return (
    <Card className="p-5 border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Personalized Strategies</h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingStrategy(true)}
          disabled={isAddingStrategy}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Strategy
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
        </div>
      ) : isAddingStrategy ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 p-4 border rounded-lg mb-4"
        >
          <h3 className="font-medium">Add New Strategy</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Strategy Name</label>
            <Input
              name="name"
              value={newStrategy.name || ""}
              onChange={handleInputChange}
              placeholder="Name your strategy"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={newStrategy.description || ""}
              onChange={handleInputChange}
              placeholder="How to use this strategy"
              className="w-full"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={newStrategy.category || "sensory"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sensory">Sensory</SelectItem>
                <SelectItem value="calming">Calming</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsAddingStrategy(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSaveStrategy}
              disabled={!newStrategy.name}
            >
              Save Strategy
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          {filteredStrategies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't added any strategies yet.</p>
              <Button onClick={() => setIsAddingStrategy(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Strategy
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(categorizedStrategies).map(([category, strats]) => 
                strats.length > 0 && (
                  <div key={category} className="space-y-2">
                    <h3 className="font-medium capitalize">{category} Strategies</h3>
                    <div className="space-y-2">
                      {strats.map((strategy) => (
                        <motion.div
                          key={strategy.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 border rounded-lg relative hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{strategy.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{strategy.description}</p>
                              
                              <div className="flex mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Button
                                    key={star}
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 w-6 h-6"
                                    onClick={() => handleRateStrategy(strategy.id, star)}
                                  >
                                    <Star 
                                      className="h-5 w-5" 
                                      fill={star <= strategy.effectiveness ? "#f59e0b" : "none"} 
                                      stroke={star <= strategy.effectiveness ? "#f59e0b" : "currentColor"}
                                    />
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => deleteStrategy(strategy.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </Card>
  );
};
