
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Timer, Smile, Music } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useState } from "react";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

const QuickActionsSection = () => {
  const navigate = useNavigate();
  const { highContrastEnabled } = useAccessibility();
  const [isBreakTimerOpen, setIsBreakTimerOpen] = useState(false);
  const [isEmotionLoggerOpen, setIsEmotionLoggerOpen] = useState(false);
  const { playSound } = useAudio();
  
  // Primary actions - most important/frequently used
  const primaryActions = [
    {
      title: "Chat",
      description: "Talk to your assistant",
      icon: <MessageCircle className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-blue-500'}`} />,
      action: () => navigate('/chat'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10',
      borderColor: "border-l-4 border-blue-500 dark:border-blue-700"
    },
    {
      title: "Visual",
      description: "Calming patterns",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-purple-500'}`}>
        <path d="M12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H5.01M19 12H19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19V19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 1C10.22 1 8.47991 1.52784 6.99987 2.51677C5.51983 3.50571 4.36628 4.91131 3.68509 6.55585C3.0039 8.20038 2.82567 10.01 3.17294 11.7558C3.5202 13.5016 4.37737 15.1053 5.63604 16.364C6.89472 17.6226 8.49836 18.4798 10.2442 18.8271C11.99 19.1743 13.7996 18.9961 15.4442 18.3149C17.0887 17.6337 18.4943 16.4802 19.4832 15.0001C20.4722 13.5201 21 11.78 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      action: () => {
        playSound('click.mp3');
        navigate('/visual');
      },
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-purple-900/10',
      borderColor: "border-l-4 border-purple-500 dark:border-purple-700"
    }
  ];
  
  // Secondary quick actions
  const quickActions = [
    {
      title: "Break Timer",
      icon: <Timer className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-blue-500'}`} />,
      action: () => setIsBreakTimerOpen(true),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10',
      borderColor: "border-b-2 border-blue-300 dark:border-blue-700"
    },
    {
      title: "Log Mood",
      icon: <Smile className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-primary' : 'text-purple-500'}`} />,
      action: () => setIsEmotionLoggerOpen(true),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10',
      borderColor: "border-b-2 border-purple-300 dark:border-purple-700"
    },
    {
      title: "Sounds",
      icon: <Music className={`h-5 w-5 ${highContrastEnabled ? 'text-high-contrast-secondary' : 'text-pink-500'}`} />,
      action: () => navigate('/sounds'),
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/10',
      borderColor: "border-b-2 border-pink-300 dark:border-pink-700"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary actions */}
      <div>
        <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 via-primary to-blue-600 dark:from-indigo-400 dark:via-primary dark:to-blue-400 bg-clip-text text-transparent">Quick Support</h2>
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`${action.color} ${action.borderColor} p-4 rounded-2xl cursor-pointer transition-all shadow-md hover:shadow-lg`}
                onClick={action.action}
              >
                <div className={`mb-3 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white dark:bg-gray-800 shadow-inner'} w-12 h-12 flex items-center justify-center`}>
                  {action.icon}
                </div>
                <h3 className="font-medium bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Secondary quick actions */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/20 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <motion.div
              key={action.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`p-4 rounded-2xl cursor-pointer transition-all ${action.color} ${action.borderColor} shadow-sm hover:shadow-md`}
                onClick={action.action}
              >
                <div className={`mb-2 rounded-full ${highContrastEnabled ? 'bg-gray-100 border border-black' : 'bg-white dark:bg-gray-800 shadow-inner'} w-10 h-10 flex items-center justify-center`}>
                  {action.icon}
                </div>
                <h3 className="font-medium text-sm bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{action.title}</h3>
              </Card>
            </motion.div>
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
