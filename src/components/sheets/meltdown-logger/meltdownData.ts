
// Define trigger category interface
export interface TriggerCategory {
  name: string;
  examples: string;
}

// Predefined trigger categories
export const triggerCategories: TriggerCategory[] = [
  { name: "Noise", examples: "Loud sounds, sudden noises, specific frequencies" },
  { name: "Visual", examples: "Bright lights, flashing, visual patterns" },
  { name: "Tactile", examples: "Certain textures, tight clothing, touch" },
  { name: "Social", examples: "Crowds, social expectations, communication" },
  { name: "Change", examples: "Unexpected changes, transitions, surprises" },
  { name: "Environmental", examples: "Temperature, smells, air quality" },
  { name: "Internal", examples: "Hunger, fatigue, pain, illness" },
  { name: "Emotional", examples: "Stress, anxiety, frustration, excitement" }
];

// Predefined coping strategies
export const copingStrategies: string[] = [
  "Deep breathing",
  "Sensory tool use",
  "Removing from situation",
  "Pressure/weighted items",
  "Sound dampening",
  "Stim toys/fidgets",
  "Visual blockers",
  "Verbal scripts",
  "Movement/exercise",
  "Quiet space",
  "Support person",
  "Other"
];
