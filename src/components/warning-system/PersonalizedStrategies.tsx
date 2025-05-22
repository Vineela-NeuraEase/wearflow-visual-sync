
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Strategy } from "@/types/strategy";
import { useStrategies } from "@/hooks/warning-system/strategy";
import { ArrowLeft, Star, Plus, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalizedStrategiesProps {
  onClose: () => void;
  warningLevel?: "normal" | "notice" | "watch" | "alert";
}

export const PersonalizedStrategies = ({ 
  onClose,
  warningLevel = "normal"
}: PersonalizedStrategiesProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStrategy, setNewStrategy] = useState({
    name: "",
    description: "",
    category: "sensory",
  });
  const { toast } = useToast();
  
  const { strategies, saveStrategy, isLoading, updateEffectiveness, deleteStrategy } = useStrategies();
  
  // Function to handle saving a new strategy
  const handleSaveStrategy = async () => {
    if (!newStrategy.name.trim()) {
      toast({
        title: "Strategy name required",
        description: "Please enter a name for your strategy",
        variant: "destructive"
      });
      return;
    }
    
    const result = await saveStrategy({
      ...newStrategy,
      effectiveness: 3 // Default mid-level effectiveness for new strategies
    });
    
    if (result) {
      toast({
        title: "Strategy saved",
        description: "Your new coping strategy has been added",
      });
      
      // Reset form
      setNewStrategy({
        name: "",
        description: "",
        category: "sensory",
      });
      setShowAddForm(false);
    }
  };
  
  // Get color class based on warning level
  const getWarningColor = () => {
    switch (warningLevel) {
      case "alert": return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/30";
      case "watch": return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30";
      case "notice": return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30";
      default: return "bg-white dark:bg-gray-800";
    }
  };
  
  // Get title based on warning level
  const getWarningTitle = () => {
    switch (warningLevel) {
      case "alert": return "Critical Regulation Strategies";
      case "watch": return "Recommended Regulation Strategies";
      case "notice": return "Preventative Strategies";
      default: return "Your Personalized Strategies";
    }
  };
  
  // Handle delete strategy
  const handleDeleteStrategy = async (id: string) => {
    try {
      await deleteStrategy(id);
      toast({
        title: "Strategy deleted",
        description: "Your strategy has been removed",
      });
    } catch (error) {
      console.error("Error deleting strategy:", error);
      toast({
        title: "Error",
        description: "Could not delete strategy. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle rating change
  const handleRateStrategy = async (id: string, rating: number) => {
    try {
      await updateEffectiveness(id, rating);
      toast({
        title: "Rating updated",
        description: "Strategy effectiveness updated",
      });
    } catch (error) {
      console.error("Error updating rating:", error);
      toast({
        title: "Error",
        description: "Could not update rating. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className={`p-5 ${getWarningColor()}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">{getWarningTitle()}</h2>
        </div>
        
        {warningLevel !== "normal" && (
          <div className="flex items-center">
            <AlertTriangle className={`h-5 w-5 ${
              warningLevel === "alert" ? "text-red-500" : 
              warningLevel === "watch" ? "text-amber-500" : "text-blue-500"
            }`} />
            <span className="ml-2 capitalize text-sm font-medium">{warningLevel} Level</span>
          </div>
        )}
      </div>
      
      {showAddForm ? (
        <div className="space-y-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-medium">Add New Strategy</h3>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
            <Input 
              value={newStrategy.name}
              onChange={e => setNewStrategy({...newStrategy, name: e.target.value})}
              placeholder="Strategy name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
            <Textarea 
              value={newStrategy.description || ''}
              onChange={e => setNewStrategy({...newStrategy, description: e.target.value})}
              placeholder="Description of how to use this strategy"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Category</label>
            <Select 
              value={newStrategy.category}
              onValueChange={value => setNewStrategy({...newStrategy, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sensory">Sensory</SelectItem>
                <SelectItem value="cognitive">Cognitive</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveStrategy}
              disabled={isLoading || !newStrategy.name}
            >
              Save Strategy
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setShowAddForm(true)} className="w-full mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Add New Strategy
        </Button>
      )}
      
      <div className="space-y-3">
        {strategies
          .sort((a, b) => b.effectiveness - a.effectiveness)
          .map((strategy: Strategy) => (
            <div 
              key={strategy.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{strategy.name}</h3>
                {strategy.id.startsWith('default-') ? (
                  <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-xs px-2 py-1 rounded">
                    Default
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500"
                    onClick={() => handleDeleteStrategy(strategy.id)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {strategy.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded capitalize">
                  {strategy.category}
                </div>
                
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < strategy.effectiveness 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      } cursor-pointer`}
                      onClick={() => handleRateStrategy(strategy.id, i + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      
      {strategies.length === 0 && (
        <div className="text-center py-8 text-gray-500 italic">
          No strategies available. Add your first strategy above.
        </div>
      )}
    </Card>
  );
}
