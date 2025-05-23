
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

// Define the type for our context
interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
  play: (soundFile: string) => void;  // Renamed from playSound to play
  stopSound: () => void;
}

// Create the context with default values
const AudioContext = createContext<AudioContextType>({
  muted: false,
  toggleMute: () => {},
  play: () => {},  // Renamed from playSound to play
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
  const [muted, setMuted] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Toggle mute function
  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  // Play sound function that uses the basic HTML5 Audio API - renamed from playSound to play
  const play = useCallback((soundPath: string) => {
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
  
  // Create the context value object
  const contextValue = {
    muted,
    toggleMute,
    play,  // Renamed from playSound to play
    stopSound
  };
  
  // Provide context to children
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
