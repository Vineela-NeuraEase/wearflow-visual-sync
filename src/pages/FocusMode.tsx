
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Pause, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const FocusMode = () => {
  const { play } = useAudio();
  const [isRunning, setIsRunning] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Research topic", completed: true },
    { id: 2, text: "Create structure", completed: true },
    { id: 3, text: "Write introduction", completed: false },
    { id: 4, text: "Add references", completed: false }
  ]);
  
  // Get the number of completed tasks
  const completedTasksCount = tasks.filter(task => task.completed).length;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } 
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    play("pop");
  };
  
  const handlePause = () => {
    setIsRunning(!isRunning);
    play("click");
  };
  
  const handleAddTime = () => {
    setTimeRemaining(time => time + 5 * 60); // Add 5 minutes
    play("pop");
  };
  
  const handleClose = () => {
    // Close focus mode
    play("whoosh");
    window.history.back();
  };
  
  // Calculate progress percentage for the tasks
  const taskProgress = Math.round((completedTasksCount / tasks.length) * 100);
  
  // Calculate the color of the timer circle based on remaining time
  const circleProgress = (timeRemaining / (25 * 60)) * 100;
  const circleColor = isRunning ? "#4e7cff" : "#a0aec0";

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Focus Mode</h1>
          <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-center mb-2">Current Task</h2>
              <div className="flex justify-between">
                <div className="font-medium text-lg">Complete project outline</div>
                <div className="text-gray-600">Due 4:00 PM</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={task.completed} 
                    onCheckedChange={() => handleToggleTask(task.id)} 
                    id={`task-${task.id}`}
                  />
                  <label 
                    htmlFor={`task-${task.id}`}
                    className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {task.text}
                  </label>
                </div>
              ))}
            </div>
            
            <Progress value={taskProgress} className="mt-4 h-2" />
            <div className="text-right text-sm text-gray-600 mt-1">
              {completedTasksCount}/{tasks.length} completed
            </div>
          </CardContent>
        </Card>
        
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={circleColor}
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * circleProgress) / 100}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-5xl font-bold">{formatTime(timeRemaining)}</div>
              <div className="text-gray-600">remaining</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            onClick={handlePause}
            className="w-36 py-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
          >
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </Button>
          <Button
            onClick={handleAddTime}
            className="w-36 py-6 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800"
          >
            <Plus className="mr-2 h-5 w-5" />
            +5 min
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
