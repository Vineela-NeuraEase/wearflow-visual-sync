
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { X, Pause, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

interface BreakTimerSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreakTimerSheet = ({ isOpen, onClose }: BreakTimerSheetProps) => {
  const { play } = useAudio();
  const [selectedDuration, setSelectedDuration] = useState<number | null>(5);
  const [selectedActivity, setSelectedActivity] = useState<string | null>("Relax");
  const [remainingTime, setRemainingTime] = useState<string>("4:12");
  const [timerActive, setTimerActive] = useState(true);
  
  const durations = [
    { value: 2, label: "2m" },
    { value: 5, label: "5m" },
    { value: 10, label: "10m" },
    { value: 20, label: "20m" }
  ];
  
  const activities = ["Sensory", "Relax", "Music", "Stretch"];

  const handleDurationSelect = (value: number) => {
    play("pop");
    setSelectedDuration(value);
  };

  const handleActivitySelect = (activity: string) => {
    play("pop");
    setSelectedActivity(activity);
  };

  const handleAddTime = () => {
    play("pop");
  };

  const handlePauseResume = () => {
    setTimerActive(!timerActive);
    play(timerActive ? "click" : "pop");
  };

  const handleBreakRating = (isGood: boolean) => {
    play(isGood ? "success" : "click");
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-md mx-auto rounded-t-[30px] p-6">
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Break Timer</h2>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Duration options */}
          <div className="flex justify-between gap-3 mb-6">
            {durations.map((duration) => (
              <Button
                key={duration.value}
                onClick={() => handleDurationSelect(duration.value)}
                className={`flex-1 text-lg font-medium h-14 rounded-xl ${
                  selectedDuration === duration.value
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {duration.label}
              </Button>
            ))}
          </div>
          
          {/* Activity type */}
          <div className="flex justify-between gap-2 mb-6 overflow-x-auto pb-2">
            {activities.map((activity) => (
              <Button
                key={activity}
                onClick={() => handleActivitySelect(activity)}
                className={`min-w-[80px] px-4 rounded-full ${
                  selectedActivity === activity
                    ? "bg-purple-100 text-purple-800"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {activity}
              </Button>
            ))}
          </div>
        </DrawerHeader>
        
        {/* Timer */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-60 h-60">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="120"
                cy="120"
                r="110"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="12"
              />
              <circle
                cx="120"
                cy="120"
                r="110"
                fill="none"
                stroke="#4e7cff"
                strokeWidth="12"
                strokeDasharray="691.5"
                strokeDashoffset="172.9" // 25% complete (691.5 * 0.25)
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold">{remainingTime}</span>
              <span className="text-gray-500">remaining</span>
            </div>
          </div>
          
          <Button
            className="mt-6 bg-blue-100 hover:bg-blue-200 text-blue-800 text-lg px-8 py-6 h-auto rounded-full"
            onClick={handleAddTime}
          >
            +2 minutes
          </Button>
        </div>
        
        {/* Controls & Rating */}
        <div className="mt-8">
          <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-center mb-4">How was your break?</h3>
            <div className="flex justify-center gap-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBreakRating(true)}
                className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBreakRating(false)}
                className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                  <path d="M17 14l-5-5-5 5" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 h-14 rounded-xl"
              onClick={handlePauseResume}
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </Button>
            <Button
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 h-14 rounded-xl"
              onClick={handleAddTime}
            >
              <Plus className="h-5 w-5 mr-2" />
              +5 min
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BreakTimerSheet;
