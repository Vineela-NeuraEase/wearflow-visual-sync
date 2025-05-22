
import React, { createContext, useContext, useState } from "react";
import { useSound } from "@/hooks/useSound";

type AudioContextType = {
  soundEnabled: boolean;
  toggleSound: () => void;
  play: (sound: "click" | "success" | "pop" | "whoosh" | "complete" | "breathing") => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { play: playSound } = useSound();

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const play = (sound: "click" | "success" | "pop" | "whoosh" | "complete" | "breathing") => {
    if (soundEnabled) {
      playSound(sound);
    }
  };

  return (
    <AudioContext.Provider value={{ soundEnabled, toggleSound, play }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
