
import React, { createContext, useState, useContext, useEffect } from 'react';

interface AudioContextType {
  play: (sound: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
}

const defaultContext: AudioContextType = {
  play: () => {},
  soundEnabled: true,
  toggleSound: () => {},
  setVolume: () => {},
};

const AudioContext = createContext<AudioContextType>(defaultContext);

export const useAudio = () => useContext(AudioContext);

type AudioProviderProps = {
  children: React.ReactNode;
};

const soundPaths: Record<string, string> = {
  click: "/sounds/click.mp3",
  success: "/sounds/success.mp3",
  pop: "/sounds/pop.mp3",
  whoosh: "/sounds/whoosh.mp3",
  complete: "/sounds/complete.mp3",
  breathing: "/sounds/breathing.mp3"
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const audioRefs = React.useRef<Record<string, HTMLAudioElement>>({});
  
  useEffect(() => {
    // Preload audio files
    Object.entries(soundPaths).forEach(([key, path]) => {
      try {
        const audio = new Audio();
        audio.src = path;
        audio.preload = "auto";
        audio.volume = volume;
        audioRefs.current[key] = audio;
        
        // Handle errors silently
        audio.addEventListener('error', () => {
          console.warn(`Error loading audio: ${path}`);
        });
      } catch (error) {
        console.warn(`Failed to create audio for ${key}: ${error}`);
      }
    });
    
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
  
  const play = (soundName: string) => {
    if (!soundEnabled) return;
    
    try {
      const audio = audioRefs.current[soundName];
      if (audio) {
        // Reset the audio to start from beginning if it's already playing
        audio.pause();
        audio.currentTime = 0;
        
        // Play the sound
        audio.play().catch(error => {
          console.warn(`Audio play failed: ${error}`);
        });
      } else {
        console.warn(`Audio not loaded for sound: ${soundName}`);
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}: ${error}`);
    }
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  const value = {
    play,
    soundEnabled,
    toggleSound,
    setVolume,
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
