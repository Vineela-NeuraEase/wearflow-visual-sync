
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

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

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.7);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    console.log("AudioProvider initialized");
    // Preload audio files
    let loadedCount = 0;
    const totalFiles = Object.keys(soundPaths).length;
    
    Object.entries(soundPaths).forEach(([key, path]) => {
      try {
        const audio = new Audio();
        audio.src = path;
        audio.preload = "auto";
        audio.volume = volume;
        audioRefs.current[key] = audio;
        
        // Handle errors silently
        audio.addEventListener('error', () => {
          console.log(`Audio file not found: ${path} - using silent fallback`);
          loadedCount++;
          if (loadedCount >= totalFiles) {
            setAudioLoaded(true);
          }
        });
        
        audio.addEventListener('canplaythrough', () => {
          console.log(`Audio loaded: ${path}`);
          loadedCount++;
          if (loadedCount >= totalFiles) {
            setAudioLoaded(true);
          }
        });
        
        // Force load attempt
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Successfully started playing
              audio.pause();
              audio.currentTime = 0;
            })
            .catch(error => {
              // Auto-play was prevented
              console.log(`Auto-play prevented for ${key}: ${error}`);
            });
        }
      } catch (error) {
        console.log(`Failed to create audio for ${key}: ${error}`);
        loadedCount++;
        if (loadedCount >= totalFiles) {
          setAudioLoaded(true);
        }
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
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log(`Audio play failed: ${error}`);
          });
        }
      } else {
        console.log(`Audio not loaded for sound: ${soundName}`);
      }
    } catch (error) {
      console.log(`Error playing sound ${soundName}: ${error}`);
    }
  };
  
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    console.log("Sound toggled:", !soundEnabled);
  };
  
  const value = {
    play,
    soundEnabled,
    toggleSound,
    setVolume,
  };
  
  console.log("AudioProvider rendering, soundEnabled:", soundEnabled);
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
