
import { ThresholdPreset } from "./types";

// Default presets that users can choose from
export const defaultPresets: ThresholdPreset[] = [
  {
    id: "standard",
    name: "Standard",
    settings: {
      heartRateHigh: 90,
      heartRateLow: 55,
      hrvLow: 35,
      sleepQualityMin: 65,
      regulationScore: 70,
      enableNotifications: true,
      enableAutoAdjust: false
    }
  },
  {
    id: "sensitive",
    name: "High Sensitivity",
    settings: {
      heartRateHigh: 85,
      heartRateLow: 60,
      hrvLow: 40,
      sleepQualityMin: 70,
      regulationScore: 80,
      enableNotifications: true,
      enableAutoAdjust: true
    }
  },
  {
    id: "relaxed",
    name: "Low Sensitivity",
    settings: {
      heartRateHigh: 100,
      heartRateLow: 50,
      hrvLow: 30,
      sleepQualityMin: 60,
      regulationScore: 65,
      enableNotifications: true,
      enableAutoAdjust: false
    }
  },
  {
    id: "sleep",
    name: "Sleep Focus",
    settings: {
      heartRateHigh: 85,
      heartRateLow: 50,
      hrvLow: 35,
      sleepQualityMin: 80,
      regulationScore: 75,
      enableNotifications: false,
      enableAutoAdjust: true
    }
  }
];
