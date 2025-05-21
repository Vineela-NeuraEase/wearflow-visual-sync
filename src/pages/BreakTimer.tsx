
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Plus, ThumbsUp, ThumbsDown, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

const BreakTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  const { play } = useAudio();
  
  const timerOptions = [
    { label: "2m", value: 120 },
    { label: "5m", value: 300 },
    { label: "10m", value: 600 },
    { label: "20m", value: 1200 }
  ];
  
  const activityOptions = [
    "Sensory", "Relax", "Music", "Stretch"
  ];
  
  const [selectedTimer, setSelectedTimer] = useState(1); // Default to 5m
  const [selectedActivity, setSelectedActivity] = useState(1); // Default to Relax
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      play("complete");
      setShowFeedback(true);
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, play]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleTimerSelect = (index: number) => {
    setSelectedTimer(index);
    setTimeRemaining(timerOptions[index].value);
    play("click");
  };
  
  const handleActivitySelect = (index: number) => {
    setSelectedActivity(index);
    play("click");
  };
  
  const addTime = () => {
    setTimeRemaining(time => time + 120); // Add 2 minutes
    play("pop");
  };
  
  const togglePause = () => {
    setIsActive(!isActive);
    play("click");
  };
  
  const handleClose = () => {
    navigate(-1);
  };
  
  const handleFeedback = (isPositive: boolean) => {
    // Handle feedback submission
    play(isPositive ? "success" : "pop");
    navigate(-1);
  };
  
  const progressPercentage = 100 - (timeRemaining / timerOptions[selectedTimer].value * 100);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Break Timer</h1>
          <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Timer selection */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {timerOptions.map((option, index) => (
            <Button
              key={option.value}
              variant={selectedTimer === index ? "default" : "outline"}
              className={`rounded-xl ${selectedTimer === index ? 'bg-blue-500' : 'bg-blue-100 text-black'}`}
              onClick={() => handleTimerSelect(index)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        
        {/* Activity selection */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {activityOptions.map((activity, index) => (
            <Button
              key={activity}
              variant={selectedActivity === index ? "default" : "outline"}
              className={`rounded-xl ${selectedActivity === index ? 'bg-primary' : 'bg-gray-100 text-black'}`}
              onClick={() => handleActivitySelect(index)}
            >
              {activity}
            </Button>
          ))}
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          {/* Timer circle */}
          <div className="relative w-64 h-64">
            {/* Circle background */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4e7cff"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercentage) / 100}
                transform="rotate(-90 50 50)"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            {/* Time display */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-5xl font-bold">{formatTime(timeRemaining)}</div>
              <div className="text-gray-600">remaining</div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="mb-4 flex justify-center">
          <Button
            onClick={addTime}
            className="bg-blue-100 hover:bg-blue-200 text-black px-6 py-2 rounded-full"
          >
            +2 minutes
          </Button>
        </div>
      </div>

      {/* Feedback overlay */}
      {showFeedback && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 flex items-end justify-center p-4 bg-black/20 z-50"
        >
          <Card className="w-full max-w-md p-6 rounded-xl">
            <h2 className="text-xl font-bold text-center mb-4">How was your break?</h2>
            <div className="flex justify-center gap-8">
              <Button 
                onClick={() => handleFeedback(true)} 
                variant="outline" 
                className="w-16 h-16 rounded-full bg-green-100"
              >
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </Button>
              <Button 
                onClick={() => handleFeedback(false)} 
                variant="outline" 
                className="w-16 h-16 rounded-full bg-red-100"
              >
                <ThumbsDown className="h-8 w-8 text-red-400" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default BreakTimer;
