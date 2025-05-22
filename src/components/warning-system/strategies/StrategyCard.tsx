
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { StrategyEffectivenessRater } from "@/components/feedback/StrategyEffectivenessRater";
import { Strategy } from "@/types/strategy";

interface StrategyCardProps {
  strategy: Strategy;
  onDelete: (id: string) => void;
  onRatingChange: (id: string, rating: number) => void;
  isAuthenticated: boolean;
}

export const StrategyCard = ({ 
  strategy, 
  onDelete, 
  onRatingChange,
  isAuthenticated
}: StrategyCardProps) => {
  return (
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
          {strategy.id?.startsWith('default-') && !isAuthenticated && (
            <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full inline-block mt-1 ml-1">
              Default
            </div>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => onDelete(strategy.id || '')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-2">
        <p className="text-xs text-muted-foreground mb-1">How effective is this strategy?</p>
        <StrategyEffectivenessRater 
          rating={strategy.effectiveness} 
          onChange={(rating) => onRatingChange(strategy.id || '', rating)}
        />
      </div>
    </div>
  );
};
