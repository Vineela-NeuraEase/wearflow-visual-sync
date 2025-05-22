
import { useRef, useEffect } from "react";

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

  useEffect(() => {
    // Preload audio files
    Object.entries(soundPaths).forEach(([key, path]) => {
      const audio = new Audio();
      audio.src = path;
      audio.preload = "auto";
      audioRefs.current[key as SoundType] = audio;
    });

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
      // Reset the audio to start from beginning if it's already playing
      audio.pause();
      audio.currentTime = 0;
      
      // Play the sound
      audio.play().catch(error => {
        console.log("Audio play failed:", error);
      });
    }
  };

  return { play };
};
