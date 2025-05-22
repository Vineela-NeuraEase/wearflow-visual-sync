
export type BreathState = "inhale" | "hold" | "exhale" | "rest" | "idle";

export type BreathingTechnique = {
  id: string;
  name: string;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  restTime: number;
  description: string;
  benefits: string;
};
