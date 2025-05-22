
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check, CircleAlert } from "lucide-react";
import { useStrategies } from "@/hooks/warning-system/strategy/useStrategies";
import { useAuth } from "@/context/AuthContext";
import { StrategyForm } from "./strategies/StrategyForm";
import { StrategiesList } from "./strategies/StrategiesList";
import { LoginPrompt } from "./strategies/LoginPrompt";

interface StrategyProps {
  warningLevel: "alert" | "warning" | "watch" | "stable";
  onClose: () => void;
}

export const PersonalizedStrategies = ({ warningLevel, onClose }: StrategyProps) => {
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
  
  const handleAddStrategy = async (name: string, description: string, category: string) => {
    await saveStrategy({
      name,
      description,
      category,
      effectiveness: 3, // Default middle rating
    });
    
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
        <StrategiesList
          strategies={strategies}
          loading={loading}
          error={error}
          onDelete={deleteStrategy}
          onRatingChange={updateEffectiveness}
          isAuthenticated={!!user}
        />
        
        {addingNew ? (
          <StrategyForm 
            onSave={handleAddStrategy}
            onCancel={() => setAddingNew(false)}
            isLoading={isLoading}
          />
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setAddingNew(true)}
          >
            + Add Custom Strategy
          </Button>
        )}
        
        {!user && <LoginPrompt />}
      </div>
    </Card>
  );
};
