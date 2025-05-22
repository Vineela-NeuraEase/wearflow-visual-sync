import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { SleepTrackerProps } from './TrackerProps';

export const SleepTracker = ({ onSave, isLoading }: SleepTrackerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(8);
  const [quality, setQuality] = useState<number>(3);
  const [deepSleepPercentage, setDeepSleepPercentage] = useState<number>(25);
  const [awakenings, setAwakenings] = useState<number>(0);
  const [sleepOnset, setSleepOnset] = useState<string>("22:30");
  const [wakeTime, setWakeTime] = useState<string>("06:30");
  const [sleepAid, setSleepAid] = useState<string>("none");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await onSave({
      date: format(date, "yyyy-MM-dd"),
      duration,
      quality,
      deep_sleep_percentage: deepSleepPercentage,
      awakenings,
      sleep_onset: sleepOnset,
      wake_time: wakeTime,
      sleep_aid: sleepAid,
      created_at: new Date().toISOString()
    });
  };
  
  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sleep Tracker</h2>
          <div className="flex items-center space-x-1">
            <Moon className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Track your sleep patterns</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sleepOnset">Sleep Time</Label>
              <Input
                id="sleepOnset"
                type="time"
                value={sleepOnset}
                onChange={(e) => setSleepOnset(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="duration">Sleep Duration (hours)</Label>
              <span className="text-sm text-muted-foreground">{duration} hours</span>
            </div>
            <Slider
              id="duration"
              min={1}
              max={12}
              step={0.5}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="quality">Sleep Quality</Label>
              <span className="text-sm text-muted-foreground">
                {quality === 1 ? "Poor" : quality === 2 ? "Fair" : quality === 3 ? "Average" : quality === 4 ? "Good" : "Excellent"}
              </span>
            </div>
            <Slider
              id="quality"
              min={1}
              max={5}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="deepSleep">Deep Sleep %</Label>
              <span className="text-sm text-muted-foreground">{deepSleepPercentage}%</span>
            </div>
            <Slider
              id="deepSleep"
              min={0}
              max={50}
              step={5}
              value={[deepSleepPercentage]}
              onValueChange={(value) => setDeepSleepPercentage(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="awakenings">Night Awakenings</Label>
              <span className="text-sm text-muted-foreground">{awakenings} times</span>
            </div>
            <Slider
              id="awakenings"
              min={0}
              max={10}
              step={1}
              value={[awakenings]}
              onValueChange={(value) => setAwakenings(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sleepAid">Sleep Aid Used</Label>
            <Select value={sleepAid} onValueChange={setSleepAid}>
              <SelectTrigger id="sleepAid">
                <SelectValue placeholder="Select sleep aid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="melatonin">Melatonin</SelectItem>
                <SelectItem value="weighted_blanket">Weighted Blanket</SelectItem>
                <SelectItem value="white_noise">White Noise</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Sleep Data"}
        </Button>
      </form>
    </Card>
  );
};
