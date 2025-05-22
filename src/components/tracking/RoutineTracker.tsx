import React from 'react';
import { RoutineTrackerProps } from './TrackerProps';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const RoutineTracker = ({ onSave, isLoading }: RoutineTrackerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [routineChange, setRoutineChange] = useState("");
  const [routineType, setRoutineType] = useState("schedule");
  const [disruptionLevel, setDisruptionLevel] = useState(5);
  const [isPlanned, setIsPlanned] = useState(false);
  const [notes, setNotes] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await onSave({
      date: format(date, "yyyy-MM-dd"),
      timestamp: new Date().toISOString(),
      routine_change: routineChange,
      routine_type: routineType,
      disruption_level: disruptionLevel,
      is_planned: isPlanned,
      notes: notes
    });
    
    // Reset form
    setRoutineChange("");
    setRoutineType("schedule");
    setDisruptionLevel(5);
    setIsPlanned(false);
    setNotes("");
  };
  
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Routine Changes</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Track changes to your regular routines that might impact regulation
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="routineChange">What changed?</Label>
          <Input
            id="routineChange"
            placeholder="e.g., School schedule change, new caregiver"
            value={routineChange}
            onChange={(e) => setRoutineChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="routineType">Type of change</Label>
          <Select value={routineType} onValueChange={setRoutineType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schedule">Schedule Change</SelectItem>
              <SelectItem value="environment">Environment Change</SelectItem>
              <SelectItem value="people">People/Social Change</SelectItem>
              <SelectItem value="activity">Activity Change</SelectItem>
              <SelectItem value="expectation">Expectation Change</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="disruptionLevel">Disruption Level</Label>
            <span className="text-sm text-muted-foreground">{disruptionLevel}/10</span>
          </div>
          <Slider
            id="disruptionLevel"
            min={1}
            max={10}
            step={1}
            value={[disruptionLevel]}
            onValueChange={(value) => setDisruptionLevel(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minor</span>
            <span>Major</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="isPlanned"
            checked={isPlanned}
            onCheckedChange={setIsPlanned}
          />
          <Label htmlFor="isPlanned">Was this change planned in advance?</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional notes</Label>
          <Textarea
            id="notes"
            placeholder="Any other details about this change..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading || !routineChange}>
          {isLoading ? "Saving..." : "Save Routine Change"}
        </Button>
      </form>
    </Card>
  );
};
