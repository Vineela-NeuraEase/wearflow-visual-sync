import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Timer, Smile, Music } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useState } from "react";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import EmotionLoggerSheet from "@/components/sheets/EmotionLoggerSheet";
import { motion } from "framer-motion";

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
      color: highContrastEnabled ? 'bg-white border-2 border-black' : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-blue-900/10',
      borderColor: "border-l-4 border-blue-500 dark:border-blue-700"
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
