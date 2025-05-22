
import React from 'react';
import { Loader2 } from "lucide-react";
import { StrategyCard } from './StrategyCard';
import { Strategy } from "@/types/strategy";

interface StrategiesListProps {
  strategies: Strategy[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  onRatingChange: (id: string, rating: number) => void;
  isAuthenticated: boolean;
}

export const StrategiesList = ({
  strategies,
  loading,
  error,
  onDelete,
  onRatingChange,
  isAuthenticated
}: StrategiesListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (error) {
    return (
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
    );
  }
  
  if (strategies.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No strategies added yet. Add your first strategy below.
      </p>
    );
  }
  
  return (
    <div className="space-y-3">
      {strategies.map((strategy) => (
        <StrategyCard
          key={strategy.id}
          strategy={strategy}
          onDelete={onDelete}
          onRatingChange={onRatingChange}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

// Don't forget to import Button
import { Button } from "@/components/ui/button";
