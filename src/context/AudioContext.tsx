import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Define the shape of our context
interface AudioContextType {
  play: (sound: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
}

// Create context with default values
const AudioContext = createContext<AudioContextType>({
  play: () => {},
  soundEnabled: true,
  toggleSound: () => {},
  setVolume: () => {},
});

// Custom hook to use the audio context
export const useAudio = () => useContext(AudioContext);

type AudioProviderProps = {
  children: React.ReactNode;
};

// Sound paths mapping
const soundPaths: Record<string, string> = {
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  pop: "/sounds/pop.mp3",
  whoosh: "/sounds/whoosh.mp3",
  complete: "/sounds/complete.mp3",
  breathing: "/sounds/breathing.mp3"
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.7);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  
  // Initialize audio files
  useEffect(() => {
    console.log("AudioProvider initialized");
    
    // Create references to audio elements
    Object.entries(soundPaths).forEach(([key, path]) => {
      try {
        const audio = new Audio();
        audio.src = path;
        audio.preload = "auto";
        audio.volume = volume;
        
        // Store reference
        audioRefs.current[key] = audio;
        
        // Handle errors silently
        audio.addEventListener('error', (e) => {
          console.warn(`Audio file issue for ${path}:`, e);
          // Keep the reference but mark as having an error
          audioRefs.current[key] = audio;
        });
      } catch (error) {
        console.warn(`Failed to create audio for ${key}:`, error);
        audioRefs.current[key] = null;
      }
    });
    
    setAudioLoaded(true);
    
    // Cleanup function
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);
  
  // Update volume when it changes
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    });
  }, [volume]);
  
  // Play sound function
  const play = (soundName: string) => {
    if (!soundEnabled) return;
    
    try {
      const audio = audioRefs.current[soundName];
      if (audio) {
        // Reset the audio to start from beginning if it's already playing
        audio.pause();
        audio.currentTime = 0;
        
        // Play the sound
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn(`Audio play failed for ${soundName}:`, error);
          });
        }
      } else {
        console.warn(`Audio not loaded for sound: ${soundName}`);
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}:`, error);
    }
  };
  
  // Toggle sound function
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    console.log("Sound toggled:", !soundEnabled);
  };
  
  const contextValue = {
    play,
    soundEnabled,
    toggleSound,
    setVolume,
  };
  
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
