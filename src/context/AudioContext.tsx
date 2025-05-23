
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
  playSound: (soundFile: string) => void;
  stopSound: () => void;
  // Add backward compatibility properties
  play: (soundFile: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const initialAudioContext: AudioContextType = {
  muted: false,
  toggleMute: () => {},
  playSound: () => {},
  stopSound: () => {},
  // Initialize backward compatibility properties
  play: () => {},
  soundEnabled: true,
  toggleSound: () => {},
};

const AudioContext = createContext<AudioContextType>(initialAudioContext);

export const useAudio = () => useContext(AudioContext);

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Define toggleMute function
  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  // Define playSound function
  const playSound = useCallback((soundFile: string) => {
    if (muted) return;
    
    // Stop any currently playing sound
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    const newAudio = new Audio(soundFile);
    newAudio.play().catch(error => {
      console.error("Error playing sound:", error);
    });
    setAudio(newAudio);
  }, [muted, audio]);

  // Define stopSound function
  const stopSound = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  // Create the context value with all required properties
  const value = {
    muted,
    toggleMute,
    playSound,
    stopSound,
    // Add backward compatibility aliases
    play: playSound,
    soundEnabled: !muted,
    toggleSound: toggleMute,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
