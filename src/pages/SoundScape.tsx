
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

type SoundType = {
  id: string;
  name: string;
  category: string;
  duration: number;
  icon: React.ReactNode;
};

const SoundScape = () => {
  const navigate = useNavigate();
  const [currentSound, setCurrentSound] = useState<SoundType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const sounds: SoundType[] = [
    {
      id: "white-noise",
      name: "White Noise",
      category: "Ambient",
      duration: 300, // 5 minutes in seconds
      icon: (
        <svg className="h-8 w-8 text-tool-blue" viewBox="0 0 24 24" fill="none">
          <path d="M3 15H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 19H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 15H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "ocean-waves",
      name: "Ocean Waves",
      category: "Nature",
      duration: 300,
      icon: (
        <svg className="h-8 w-8 text-tool-green" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.5C22 14.1667 19.5 9.5 12 9.5C4.5 9.5 2 14.1667 2 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 12.5C18 10.5 16 7.5 12 7.5C8 7.5 6 10.5 6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "gentle-rain",
      name: "Gentle Rain",
      category: "Nature",
      duration: 300,
      icon: (
        <svg className="h-8 w-8 text-tool-purple" viewBox="0 0 24 24" fill="none">
          <path d="M20 16.2A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 19v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 19v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 14v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];
  
  // Play a sound
  useEffect(() => {
    if (!currentSound) return;
    
    // Reset existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start playing
    if (isPlaying) {
      // In a real app, would play the actual audio file
      if (!audioRef.current) {
        audioRef.current = new Audio('/placeholder-audio.mp3'); // Replace with actual audio
        audioRef.current.loop = true;
      }
      
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      
      // Start progress timer
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          if (prev >= currentSound.duration) {
            // Loop the sound
            return 0;
          }
          const newTime = prev + 1;
          setProgress((newTime / currentSound.duration) * 100);
          return newTime;
        });
      }, 1000);
    } else {
      // Pause the audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSound, isPlaying]);
  
  const togglePlay = () => {
    if (!currentSound) {
      // If no sound is selected, play the first one
      setCurrentSound(sounds[0]);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };
  
  const handleSelectSound = (sound: SoundType) => {
    setCurrentSound(sound);
    setTimeElapsed(0);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/tools')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Soundscape</h1>
      </div>
      
      <div className="calm-container bg-calm-purple/30">
        <div className="flex items-center mb-4">
          <ArrowLeft className="h-5 w-5 text-primary cursor-pointer" onClick={() => navigate('/tools')} />
          <h2 className="text-2xl font-semibold ml-4">Soundscape</h2>
        </div>
        
        <Card className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-medium mb-2">Now Playing</h3>
          
          <div className="flex items-center mb-4">
            <div className="bg-calm-pink/30 rounded-full p-3 mr-4">
              {currentSound ? currentSound.icon : (
                <svg className="h-8 w-8 text-tool-pink" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18V6L21 12L9 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-lg">{currentSound?.name || "No sound selected"}</h4>
              <p className="text-muted-foreground">{currentSound?.category || "Select a sound to play"}</p>
            </div>
            
            <div className="ml-auto">
              {currentSound && (
                <span className="text-sm">
                  {formatTime(timeElapsed)} / {formatTime(currentSound.duration)}
                </span>
              )}
            </div>
          </div>
          
          {currentSound && (
            <div className="bg-purple-100 rounded-lg p-2 mb-6">
              <div className="flex items-center justify-center space-x-2">
                {/* Visualization dots for audio */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i}
                    className="bg-purple-400 rounded-full"
                    style={{ 
                      height: `${10 + Math.random() * 20}px`,
                      width: '8px'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center items-center space-x-6">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full"
              disabled={!currentSound}
            >
              <SkipBack className="h-6 w-6" />
            </Button>
            
            <Button 
              size="icon" 
              variant="default" 
              className="rounded-full h-12 w-12 bg-primary"
              onClick={togglePlay}
            >
              {isPlaying && currentSound ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full"
              disabled={!currentSound}
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </Card>
        
        <div className="flex justify-between items-center mb-4">
          <svg className="h-5 w-5 text-tool-blue" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.05 11C3.27151 8.68261 4.51312 6.57238 6.45774 5.19013C8.40237 3.80788 10.8659 3.28512 13.234 3.75335C15.6022 4.22158 17.6557 5.63819 18.9145 7.66138C20.1734 9.68456 20.5336 12.1424 19.9147 14.4602C19.2958 16.778 17.7437 18.7609 15.608 19.9645C13.4722 21.1682 10.9168 21.4861 8.54763 20.8524C6.17847 20.2186 4.16581 18.6865 2.93935 16.5855C1.71289 14.4844 1.37192 11.9832 1.99 9.654" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <Slider
            value={[0]}
            max={100}
            className="w-64 mx-4"
          />
          
          <svg className="h-5 w-5 text-tool-purple" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.9497 11C20.7282 8.68261 19.4866 6.57238 17.542 5.19013C15.5973 3.80788 13.1338 3.28512 10.7657 3.75335C8.39748 4.22158 6.34397 5.63819 5.08517 7.66138C3.82637 9.68456 3.4662 12.1424 4.08508 14.4602C4.70396 16.778 6.25603 18.7609 8.39179 19.9645C10.5276 21.1682 13.083 21.4861 15.4521 20.8524C17.8213 20.2186 19.8339 18.6865 21.0604 16.5855C22.2869 14.4844 22.6278 11.9832 22.0097 9.654" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-4">Library</h3>
        
        <div className="space-y-4">
          {sounds.map((sound) => (
            <Card 
              key={sound.id}
              className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSelectSound(sound)}
            >
              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 ${
                  sound.category === "Ambient" ? "bg-calm-blue/30" : "bg-calm-green/30"
                }`}>
                  {sound.icon}
                </div>
                
                <div>
                  <h4 className="font-medium">{sound.name}</h4>
                  <p className="text-muted-foreground">{sound.category}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-full p-2">
                <Play className="h-4 w-4 text-primary" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoundScape;
