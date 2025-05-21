
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pause, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import BreakTimerSheet from "@/components/sheets/BreakTimerSheet";
import { useAudio } from "@/context/AudioContext";

const BreakTimer = () => {
  const navigate = useNavigate();
  const { play } = useAudio();
  const [selectedDuration, setSelectedDuration] = useState<number>(5);
  const [selectedActivity, setSelectedActivity] = useState<string>("Relax");
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [remainingTime, setRemainingTime] = useState<string>("18:42");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  
  const durations = [2, 5, 10, 15, 20, 30];
  const activities = ["Focus", "Break", "Meditation", "Exercise"];
  
  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration);
    play("pop");
  };
  
  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity);
    play("pop");
  };
  
  const handlePauseResume = () => {
    setTimerRunning(!timerRunning);
    play(timerRunning ? "click" : "pop");
  };
  
  const handleAddTime = (minutes: number) => {
    play("pop");
    // Logic to add time would go here
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Timer</h1>
        </div>
        
        <Card className="bg-blue-100 p-6 rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center space-x-2">
              {durations.slice(0, 4).map((duration) => (
                <Button
                  key={duration}
                  onClick={() => handleDurationSelect(duration)}
                  className={`${
                    selectedDuration === duration
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-800"
                  }`}
                >
                  {duration}m
                </Button>
              ))}
            </div>
            
            <div className="mb-8 flex justify-center space-x-2">
              {activities.map((activity) => (
                <Button
                  key={activity}
                  onClick={() => handleActivitySelect(activity)}
                  className={`${
                    selectedActivity === activity
                      ? "bg-blue-500/20 border-blue-500 border"
                      : "bg-white border-gray-200 border"
                  } text-gray-800 rounded-full`}
                >
                  {activity}
                </Button>
              ))}
            </div>
            
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#4e7cff"
                  strokeWidth="10"
                  strokeDasharray="691.5"
                  strokeDashoffset="172.9" // 75% complete (691.5 * 0.75)
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold">{remainingTime}</span>
                <span className="text-gray-600">remaining</span>
              </div>
            </div>
            
            <div className="w-full flex space-x-4">
              <Button
                className="w-1/2 h-14 bg-white hover:bg-gray-100 text-gray-800"
                onClick={handlePauseResume}
              >
                <Pause className="mr-2 h-5 w-5" />
                {timerRunning ? "Pause" : "Resume"}
              </Button>
              <Button
                className="w-1/2 h-14 bg-blue-100 hover:bg-blue-200 text-blue-800"
                onClick={() => handleAddTime(5)}
              >
                <Plus className="mr-2 h-5 w-5" />
                +5 min
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Current Task</h2>
          <div className="flex justify-between mb-4">
            <p className="font-medium">Complete project outline</p>
            <p className="text-gray-600">Due 4:00 PM</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="task1" className="mr-2" checked disabled />
              <label htmlFor="task1" className="line-through">Research topic</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="task2" className="mr-2" checked disabled />
              <label htmlFor="task2" className="line-through">Create structure</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="task3" className="mr-2" />
              <label htmlFor="task3">Write introduction</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="task4" className="mr-2" />
              <label htmlFor="task4">Add references</label>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">2/4 completed</p>
          </div>
        </Card>
      </div>
      
      <BreakTimerSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
      
      <motion.div
        className="fixed bottom-28 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <Button
          className="bg-blue-500 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsSheetOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </>
  );
};

export default BreakTimer;
