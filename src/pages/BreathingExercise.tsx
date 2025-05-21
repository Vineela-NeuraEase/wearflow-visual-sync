
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Music } from "lucide-react";

// Breathing states
type BreathState = "inhale" | "hold" | "exhale" | "rest" | "idle";

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [breathState, setBreathState] = useState<BreathState>("idle");
  const [counter, setCounter] = useState(4);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const totalSessionTime = 180; // 3 minutes in seconds
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Setup breathing cycle
  useEffect(() => {
    if (!isStarted) return;
    
    let interval: NodeJS.Timeout;
    
    if (breathState === "inhale") {
      setCounter(4);
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            setBreathState("hold");
            return 7;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "hold") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            setBreathState("exhale");
            return 8;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (breathState === "exhale") {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev <= 1) {
            setBreathState("inhale");
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [breathState, isStarted]);
  
  // Track session time
  useEffect(() => {
    if (!isStarted) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= totalSessionTime) {
          setIsStarted(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isStarted]);
  
  // Handle audio
  useEffect(() => {
    if (soundEnabled) {
      audioRef.current = new Audio('/placeholder-audio.mp3'); // Replace with actual audio file
      audioRef.current.loop = true;
      
      if (isStarted) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundEnabled, isStarted]);
  
  const handleStart = () => {
    setIsStarted(true);
    setBreathState("inhale");
    setCounter(4);
    setElapsedTime(0);
  };
  
  const handleStop = () => {
    setIsStarted(false);
    setBreathState("idle");
    navigate("/tools");
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  return (
    <div className="h-screen bg-calm-blue/30 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div 
            className={`absolute inset-0 rounded-full border-4 border-blue-300 ${
              breathState === "inhale"
                ? "animate-breathe-in"
                : breathState === "exhale"
                ? "animate-breathe-out"
                : ""
            }`}
          ></div>
          <div className="z-10 text-center">
            <span className="text-6xl font-bold">{counter}</span>
            <p className="text-xl mt-2">
              {breathState === "inhale" 
                ? "Breathe in..." 
                : breathState === "hold" 
                ? "Hold..." 
                : breathState === "exhale" 
                ? "Breathe out..." 
                : "Ready?"}
            </p>
          </div>
        </div>
        
        <div className="w-full max-w-md flex justify-between mt-12 space-x-4">
          <Button 
            variant="outline" 
            className="flex-1 bg-white"
            onClick={handleStop}
          >
            <X className="mr-2 h-4 w-4" /> Stop
          </Button>
          
          <Button 
            variant="outline" 
            className={`flex-1 ${soundEnabled ? 'bg-primary text-white' : 'bg-white'}`}
            onClick={toggleSound}
          >
            <Music className="mr-2 h-4 w-4" /> Sound
          </Button>
        </div>
        
        {isStarted && (
          <div className="w-full max-w-md mt-12">
            <div className="text-center mb-2">Session Progress</div>
            <Progress value={(elapsedTime / totalSessionTime) * 100} className="h-2" />
            <div className="text-center mt-2">
              {formatTime(elapsedTime)} / {formatTime(totalSessionTime)}
            </div>
          </div>
        )}
        
        {!isStarted && (
          <Button 
            className="mt-12 bg-primary text-white px-12 py-6 text-xl"
            onClick={handleStart}
          >
            Start Breathing
          </Button>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
