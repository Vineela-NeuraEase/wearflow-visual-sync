
import { BreathingTechnique } from "./types";

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: "4-4-4",
    name: "Box Breathing (4-4-4-4)",
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    restTime: 4,
    description: "Equal counts of inhale, hold, exhale, and rest.",
    benefits: "Great for everyday stress relief and focus enhancement. Used by Navy SEALs for maintaining calm under pressure.",
  },
  {
    id: "4-7-8",
    name: "Relaxing Breath (4-7-8)",
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    restTime: 0,
    description: "Inhale for 4, hold for 7, exhale for 8.",
    benefits: "Helps with anxiety, sleep issues, and managing cravings. Acts as a natural tranquilizer for the nervous system.",
  },
  {
    id: "5-2-5",
    name: "Energizing Breath (5-2-5)",
    inhaleTime: 5,
    holdTime: 2,
    exhaleTime: 5,
    restTime: 0,
    description: "Deeper breaths with a short hold for energy.",
    benefits: "Increases alertness and energy levels. Good for morning routines or when you need a mental boost.",
  },
  {
    id: "2-1-2",
    name: "Quick Calm (2-1-2)",
    inhaleTime: 2,
    holdTime: 1,
    exhaleTime: 2,
    restTime: 0,
    description: "Short breaths for quick relief.",
    benefits: "Perfect for quick stress relief in urgent situations. Easy to do discreetly in public settings.",
  },
];
