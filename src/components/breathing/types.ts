
export type BreathState = "inhale" | "hold" | "exhale" | "rest" | "idle";

export type BreathingTechnique = {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  timing: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
  };
  color: string;
};

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: "box",
    name: "Box Breathing (4-4-4-4)",
    description: "Inhale, hold, exhale, and hold again for 4 seconds each.",
    benefits: ["Reduces stress", "Improves concentration", "Used by military and first responders"],
    timing: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    color: "from-blue-400 to-purple-500"
  },
  {
    id: "relaxing",
    name: "Relaxing Breath (4-7-8)",
    description: "Inhale for 4, hold for 7, and exhale for 8 seconds.",
    benefits: ["Promotes sleep", "Reduces anxiety", "Calms the nervous system"],
    timing: { inhale: 4, hold1: 7, exhale: 8 },
    color: "from-indigo-400 to-cyan-300"
  },
  {
    id: "energizing",
    name: "Energizing Breath (5-2-5)",
    description: "Inhale for 5, hold for 2, and exhale for 5 seconds.",
    benefits: ["Increases energy", "Improves alertness", "Good for morning or mid-day"],
    timing: { inhale: 5, hold1: 2, exhale: 5 },
    color: "from-orange-400 to-pink-500"
  },
  {
    id: "quick",
    name: "Quick Calm (2-1-2)",
    description: "A faster technique with 2 second inhale, 1 second hold, 2 second exhale.",
    benefits: ["Quick stress relief", "Can be done discreetly", "Good for immediate calm"],
    timing: { inhale: 2, hold1: 1, exhale: 2 },
    color: "from-green-400 to-teal-500"
  }
];
