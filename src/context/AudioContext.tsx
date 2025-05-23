
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

interface AudioContextType {
  muted: boolean;
  toggleMute: () => void;
  playSound: (soundFile: string) => void;
  stopSound: () => void;
}

const initialAudioContext: AudioContextType = {
  muted: false,
  toggleMute: () => {},
  playSound: () => {},
  stopSound: () => {},
};

const AudioContext = createContext<AudioContextType>(initialAudioContext);

export const useAudio = () => useContext(AudioContext);

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

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

  const stopSound = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const value = {
    muted,
    toggleMute,
    playSound,
    stopSound,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
