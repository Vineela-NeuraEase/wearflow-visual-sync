
// Define breathing techniques
export const BREATHING_TECHNIQUES = [
  {
    id: "box",
    name: "Box Breathing",
    pattern: [4, 4, 4, 4],
    phases: ["Inhale", "Hold", "Exhale", "Hold"],
    description: "Great for focus and stress relief",
    colors: ["#60a5fa", "#93c5fd", "#3b82f6", "#93c5fd"]
  },
  {
    id: "relaxing",
    name: "Relaxing Breath",
    pattern: [4, 7, 8, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Perfect for bedtime and deep relaxation",
    colors: ["#8b5cf6", "#a78bfa", "#7c3aed", "transparent"]
  },
  {
    id: "energizing",
    name: "Energizing Breath",
    pattern: [5, 2, 5, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Ideal for morning energy boost",
    colors: ["#f59e0b", "#fbbf24", "#d97706", "transparent"]
  },
  {
    id: "quick",
    name: "Quick Calm",
    pattern: [2, 1, 2, 0],
    phases: ["Inhale", "Hold", "Exhale", ""],
    description: "Quick stress relief in under a minute",
    colors: ["#10b981", "#34d399", "#059669", "transparent"]
  }
];

export type BreathingTechnique = typeof BREATHING_TECHNIQUES[0];
