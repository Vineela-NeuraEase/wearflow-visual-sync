
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

// Define the type for our context
interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
  play: (soundFile: string) => void;
  playSound: (soundFile: string) => void;
  stopSound: () => void;
}

// Create the context with default values
const AudioContext = createContext<AudioContextType>({
  muted: false,
  toggleMute: () => {},
  play: () => {},
  playSound: () => {},
  stopSound: () => {}
});

// Custom hook to use the audio context
export const useAudio = () => useContext(AudioContext);

// Props interface for the provider component
interface AudioProviderProps {
  children: React.ReactNode;
}

// The provider component
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  // Use useState directly instead of React.useState
  const [muted, setMuted] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Toggle mute function
  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  // Core play sound function that uses the basic HTML5 Audio API
  const playSoundCore = useCallback((soundPath: string) => {
    if (muted) return;
    
    try {
      // Stop any currently playing sound
      if (audioElement) {
        audioElement.pause();
      }
      
      // Create a new audio element
      const newAudio = new Audio(soundPath);
      setAudioElement(newAudio);
      
      // Play the sound
      newAudio.play().catch(error => {
        console.error("Failed to play sound:", error);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [muted, audioElement]);
  
  // Exposed methods that both call the core implementation
  const play = useCallback((soundPath: string) => {
    playSoundCore(soundPath);
  }, [playSoundCore]);
  
  const playSound = useCallback((soundPath: string) => {
    playSoundCore(soundPath);
  }, [playSoundCore]);
  
  // Stop sound function
  const stopSound = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [audioElement]);
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioElement]);
  
  // Create the context value object with both method names
  const contextValue = {
    muted,
    toggleMute,
    play,
    playSound,
    stopSound
  };
  
  // Provide context to children
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
