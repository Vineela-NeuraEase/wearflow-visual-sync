
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smile, AlertTriangle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmotionLogItemProps {
  emoji: string;
  emotion: string;
  date: string;
  note: string;
  colorClass: string;
}

export const EmotionLogItem = ({ emoji, emotion, date, note, colorClass }: EmotionLogItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{emoji}</span>
          <div>
            <span className={`px-3 py-1 rounded-full text-sm ${colorClass}`}>
              {emotion}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600 mt-2">{note}</p>
    </Card>
  );
};

interface LogTabContentProps {
  setIsEmotionLoggerOpen: (isOpen: boolean) => void;
  setIsMeltdownLoggerOpen: (isOpen: boolean) => void;
}

const LogTabContent = ({ setIsEmotionLoggerOpen, setIsMeltdownLoggerOpen }: LogTabContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50 rounded-xl">
        <h2 className="text-lg font-medium mb-2">Track Your Well-being</h2>
        <p className="text-sm text-gray-600 mb-4">
          Log emotions or stressful events to understand patterns.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
            onClick={() => setIsEmotionLoggerOpen(true)}
          >
            <Smile className="h-5 w-5 mr-2 text-purple-500" />
            <span className="text-xs">Emotion</span>
          </Button>
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
            onClick={() => setIsMeltdownLoggerOpen(true)}
          >
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            <span className="text-xs">Meltdown</span>
          </Button>
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
            onClick={() => navigate("/journal/quick")}
          >
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
            <span className="text-xs">Journal</span>
          </Button>
        </div>
      </Card>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Logs</h3>
        <Button variant="link" onClick={() => navigate("/emotion-insights")}>
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        <EmotionLogItem 
          emoji="😊" 
          emotion="Happy" 
          date="Today, 10:30 AM" 
          note="Had a productive morning session" 
          colorClass="bg-green-100 text-green-800" 
        />
        
        <EmotionLogItem 
          emoji="😣" 
          emotion="Stressed" 
          date="Yesterday, 4:15 PM" 
          note="Too much noise in the environment" 
          colorClass="bg-red-100 text-red-800" 
        />
      </div>
    </div>
  );
};

export default LogTabContent;
