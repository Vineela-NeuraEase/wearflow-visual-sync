
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Timer, Smile, Wind, Music } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useState } from "react";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";

const QuickActionsSection = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  const [isBreakTimerOpen, setIsBreakTimerOpen] = useState(false);
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);
  
  // Primary actions - most important/frequently used
  const primaryActions = [
    {
      title: "Chat",
      description: "Talk to your assistant",
      icon: <MessageCircle className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-blue-500'}`} />,
      action: () => navigate('/chat'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-blue/30'
    },
    {
      title: "Breathing",
      description: "Guided patterns",
      icon: <Wind className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-tool-blue'}`} />,
      action: () => navigate('/breathing'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-calm-purple/30'
    }
  ];
  
  // Secondary quick actions
  const quickActions = [
    {
      title: "Break Timer",
      icon: <Timer className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-blue-500'}`} />,
      action: () => setIsBreakTimerOpen(true),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-blue-100'
    },
    {
      title: "Log Mood",
      icon: <Smile className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-purple-500'}`} />,
      action: () => setIsEmotionLoggerOpen(true),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-purple-100'
    },
    {
      title: "Sounds",
      icon: <Music className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-pink-500'}`} />,
      action: () => navigate('/sounds'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-pink-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary actions */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Support</h2>
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action) => (
            <Card 
              key={action.title}
              className={`${action.color} p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
              onClick={action.action}
            >
              <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-12 h-12 flex items-center justify-center`}>
                {action.icon}
              </div>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Secondary quick actions */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Card 
              key={action.title}
              className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform ${action.color}`}
              onClick={action.action}
            >
              <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-10 h-10 flex items-center justify-center`}>
                {action.icon}
              </div>
              <h3 className="font-medium text-sm">{action.title}</h3>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Sheets */}
      <BreakTimerSheet isOpen={isBreakTimerOpen} onClose={() => setIsBreakTimerOpen(false)} />
      <EmotionLoggerSheet isOpen={isEmotionLoggerOpen} onClose={() => setIsEmotionLoggerOpen(false)} />
    </div>
  );
};

export default QuickActionsSection;
