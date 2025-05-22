
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (soundName: string) => void;
  stopSound: (soundName: string) => void;
  play: (soundName: string) => void;
}

const initialAudioContext: AudioContextType = {
  soundEnabled: true,
  toggleSound: () => {},
  playSound: () => {},
  stopSound: () => {},
  play: () => {},
};

const AudioContext = createContext<AudioContextType>(initialAudioContext);

export const useAudio = () => useContext(AudioContext);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playSound = (soundName: string) => {
    if (!soundEnabled) return;
    
    try {
      // Check if we already have this audio element
      if (audioElements[soundName]) {
        audioElements[soundName].currentTime = 0;
        audioElements[soundName].play().catch(error => {
          console.error(`Error playing sound ${soundName}:`, error);
        });
        return;
      }

      // Create and play a new audio element
      const audio = new Audio(`/sounds/${soundName}`);
      audio.play().catch(error => {
        console.error(`Error playing sound ${soundName}:`, error);
      });
      
      // Store it for reuse
      setAudioElements(prev => ({
        ...prev,
        [soundName]: audio
      }));
    } catch (error) {
      console.error(`Error loading or playing sound ${soundName}:`, error);
    }
  };

  const stopSound = (soundName: string) => {
    if (audioElements[soundName]) {
      audioElements[soundName].pause();
      audioElements[soundName].currentTime = 0;
    }
  };

  const value = {
    soundEnabled,
    toggleSound,
    playSound,
    stopSound,
    // Add play as an alias for playSound for backward compatibility
    play: playSound
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
