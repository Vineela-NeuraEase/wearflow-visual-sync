
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Timer, Smile, Book } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";

const QuickAccessSection = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  const [isBreakTimerOpen, setIsBreakTimerOpen] = useState(false);
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);
  
  const quickAccessOptions = [
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
      title: "Journal",
      icon: <Book className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-pink-500'}`} />,
      action: () => navigate('/journal'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-pink-100'
    }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Quick Access</h2>
      <div className="grid grid-cols-3 gap-3">
        {quickAccessOptions.map((option) => (
          <Card 
            key={option.title}
            className={`p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform ${option.color}`}
            onClick={option.action}
          >
            <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white'} w-10 h-10 flex items-center justify-center`}>
              {option.icon}
            </div>
            <h3 className="font-medium text-sm">{option.title}</h3>
          </Card>
        ))}
      </div>
      
      {/* Sheets */}
      <BreakTimerSheet isOpen={isBreakTimerOpen} onClose={() => setIsBreakTimerOpen(false)} />
      <EmotionLoggerSheet isOpen={isEmotionLoggerOpen} onClose={() => setIsEmotionLoggerOpen(false)} />
    </div>
  );
};

export default QuickAccessSection;
