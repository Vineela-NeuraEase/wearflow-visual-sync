
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Check, CircleAlert, Loader2 } from "lucide-react";
import { StrategyEffectivenessRater } from "@/components/feedback/StrategyEffectivenessRater";
import { useStrategies } from "@/hooks/warning-system/useStrategies";
import { useAuth } from "@/context/AuthContext";

interface StrategyProps {
  warningLevel: "alert" | "warning" | "watch" | "stable";
  onClose: () => void;
}

export const PersonalizedStrategies = ({ warningLevel, onClose }: StrategyProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("breathing");
  const [addingNew, setAddingNew] = useState(false);
  
  const { user } = useAuth();
  
  const { 
    strategies, 
    isLoading, 
    loading,
    error,
    saveStrategy, 
    deleteStrategy, 
    updateEffectiveness 
  } = useStrategies();
  
  const handleAddStrategy = async () => {
    if (!name || !description) return;
    
    await saveStrategy({
      name,
      description,
      category,
      effectiveness: 3, // Default middle rating
    });
    
    setName("");
    setDescription("");
    setCategory("breathing");
    setAddingNew(false);
  };
  
  const headerColor = () => {
    switch (warningLevel) {
      case "alert": return "bg-red-500 text-white";
      case "warning": return "bg-amber-500 text-white";
      case "watch": return "bg-blue-500 text-white";
      default: return "bg-green-500 text-white";
    }
  };
  
  const colorIcon = () => {
    switch (warningLevel) {
      case "alert": return <CircleAlert className="w-5 h-5" />;
      case "warning": return <CircleAlert className="w-5 h-5" />;
      case "watch": return <CircleAlert className="w-5 h-5" />;
      default: return <Check className="w-5 h-5" />;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 overflow-hidden mb-6">
      <div className={`p-4 flex justify-between items-center ${headerColor()}`}>
        <div className="flex items-center gap-2">
          {colorIcon()}
          <h3 className="font-medium">Personalized Strategies</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : strategies.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No strategies added yet. Add your first strategy below.
          </p>
        ) : (
          <div className="space-y-3">
            {strategies.map((strategy) => (
              <div 
                key={strategy.id} 
                className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{strategy.name}</h4>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full inline-block mt-1">
                      {strategy.category}
                    </div>
                    {strategy.id.startsWith('default-') && !user && (
                      <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full inline-block mt-1 ml-1">
                        Default
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground"
                    onClick={() => deleteStrategy(strategy.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">How effective is this strategy?</p>
                  <StrategyEffectivenessRater 
                    rating={strategy.effectiveness} 
                    onChange={(rating) => updateEffectiveness(strategy.id, rating)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {addingNew ? (
          <div className="border rounded-md p-3 space-y-3">
            <Input
              placeholder="Strategy name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <Textarea
              placeholder="Describe how to apply this strategy"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breathing">Breathing</SelectItem>
                <SelectItem value="sensory">Sensory</SelectItem>
                <SelectItem value="movement">Movement</SelectItem>
                <SelectItem value="cognitive">Cognitive</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="environment">Environmental</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setAddingNew(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!name || !description || isLoading}
                onClick={handleAddStrategy}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : "Save Strategy"}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setAddingNew(true)}
          >
            + Add Custom Strategy
          </Button>
        )}
        
        {!user && (
          <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-md p-3 text-sm text-amber-800 dark:text-amber-300">
            <p>Create an account to save your strategies permanently.</p>
          </div>
        )}
      </div>
    </Card>
  );
};
