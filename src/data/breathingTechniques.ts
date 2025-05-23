
// Define breathing techniques
export const BREATHING_TECHNIQUES = [
  {
    id: "box",
    name: "Box Breathing (4-4-4-4)",
    pattern: [4, 4, 4, 4],
    phases: ["Inhale", "Hold", "Exhale", "Hold"],
    description: "Improves focus and reduces stress",
    colors: ["#60a5fa", "#8b5cf6", "#10b981", "#8b5cf6"]
  },
  {
    id: "relaxing",
    name: "Relaxing Breath (4-7-8)",
    pattern: [4, 7, 8, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Perfect for sleep and deep relaxation",
    colors: ["#60a5fa", "#8b5cf6", "#10b981", "transparent"]
  },
  {
    id: "energizing",
    name: "Energizing Breath (5-2-5)",
    pattern: [5, 2, 5, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Boosts energy and alertness",
    colors: ["#60a5fa", "#8b5cf6", "#10b981", "transparent"]
  },
  {
    id: "quick",
    name: "Quick Calm (2-1-2)",
    pattern: [2, 1, 2, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Fast stress relief in under a minute",
    colors: ["#60a5fa", "#8b5cf6", "#10b981", "transparent"]
  }
];

export type BreathingTechnique = typeof BREATHING_TECHNIQUES[0];
