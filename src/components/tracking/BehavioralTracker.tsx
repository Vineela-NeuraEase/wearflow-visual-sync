
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Save, Smile, PuzzleIcon, MessageSquare, UserMinus, Frown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BehavioralData } from "@/types/biometric";

interface BehavioralTrackerProps {
  onSave: (behavioralData: BehavioralData) => void;
}

export const BehavioralTracker = ({ onSave }: BehavioralTrackerProps) => {
  const { toast } = useToast();
  const [mood, setMood] = useState(50);
  const [stimming, setStimming] = useState(30);
  const [communication, setCommunication] = useState(20);
  const [withdrawal, setWithdrawal] = useState(10);
  const [irritability, setIrritability] = useState(15);

  const handleSave = () => {
    const behavioralData: BehavioralData = {
      timestamp: new Date().toISOString(),
      selfReportedMood: mood,
      stimming,
      communicationDifficulty: communication,
      socialWithdrawal: withdrawal,
      irritabilityLevel: irritability
    };

    onSave(behavioralData);
    toast({
      title: "Behavioral state recorded",
      description: "Your current behavioral state has been logged"
    });
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Current State</h2>
        <Smile className="text-amber-500" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Smile className="mr-2 h-4 w-4" />
              <Label>Mood</Label>
            </div>
            <span>{
              mood < 30 ? "Distressed" :
              mood < 50 ? "Uneasy" :
              mood < 70 ? "Calm" :
              "Happy"
            }</span>
          </div>
          <Slider
            value={[mood]}
            onValueChange={(values) => setMood(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Distressed</span>
            <span>Neutral</span>
            <span>Happy</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <PuzzleIcon className="mr-2 h-4 w-4" />
              <Label>Stimming Level</Label>
            </div>
            <span>{stimming}</span>
          </div>
          <Slider
            value={[stimming]}
            onValueChange={(values) => setStimming(values[0])}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Minimal</span>
            <span>Moderate</span>
            <span>Intense</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              <Label>Communication Difficulty</Label>
            </div>
            <span>{communication}</span>
          </div>
          <Slider
            value={[communication]}
            onValueChange={(values) => setCommunication(values[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <UserMinus className="mr-2 h-4 w-4" />
              <Label>Social Withdrawal</Label>
            </div>
            <span>{withdrawal}</span>
          </div>
          <Slider
            value={[withdrawal]}
            onValueChange={(values) => setWithdrawal(values[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Frown className="mr-2 h-4 w-4" />
              <Label>Irritability</Label>
            </div>
            <span>{irritability}</span>
          </div>
          <Slider
            value={[irritability]}
            onValueChange={(values) => setIrritability(values[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Current State
        </Button>
      </div>
    </Card>
  );
};
