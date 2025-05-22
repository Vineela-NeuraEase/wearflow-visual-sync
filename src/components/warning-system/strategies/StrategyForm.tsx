
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StrategyFormProps {
  onSave: (name: string, description: string, category: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const StrategyForm = ({ onSave, onCancel, isLoading }: StrategyFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("breathing");

  const handleSubmit = () => {
    if (!name || !description) return;
    onSave(name, description, category);
  };

  return (
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!name || !description || isLoading}
          onClick={handleSubmit}
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
  );
};
