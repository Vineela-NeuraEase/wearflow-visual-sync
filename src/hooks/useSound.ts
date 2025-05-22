import { useRef, useEffect, useState } from "react";

type SoundType = 
  | "click" 
  | "success" 
  | "pop" 
  | "whoosh" 
  | "complete" 
  | "breathing";

const soundPaths: Record<SoundType, string> = {
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  pop: "/sounds/pop.mp3",
  whoosh: "/sounds/whoosh.mp3",
  complete: "/sounds/complete.mp3",
  breathing: "/sounds/breathing.mp3"
};

export const useSound = () => {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    success: null,
    pop: null,
    whoosh: null,
    complete: null,
    breathing: null
  });
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("useSound hook initializing");
    
    // Preload audio files
    Object.entries(soundPaths).forEach(([key, path]) => {
      try {
        const audio = new Audio();
        audio.src = path;
        audio.preload = "auto";
        audioRefs.current[key as SoundType] = audio;
        
        audio.addEventListener('error', (e) => {
          console.warn(`Error loading audio: ${path}`, e);
          // Even with an error, keep a reference to avoid null reference issues
          audioRefs.current[key as SoundType] = audio;
        });
      } catch (error) {
        console.warn(`Failed to create audio for ${key}:`, error);
        // Create a dummy audio element as a fallback
        audioRefs.current[key as SoundType] = new Audio();
      }
    });

    setIsLoaded(true);
    
    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  const play = (sound: SoundType) => {
    const audio = audioRefs.current[sound];
    if (audio) {
      try {
        // Reset the audio to start from beginning if it's already playing
        audio.pause();
        audio.currentTime = 0;
        
        // Play the sound
        audio.play().catch(error => {
          console.warn("Audio play failed:", error);
        });
      } catch (error) {
        console.warn(`Error playing sound ${sound}:`, error);
      }
    } else {
      console.warn(`Audio not found for sound: ${sound}`);
    }
  };

  return { play, isLoaded };
};
