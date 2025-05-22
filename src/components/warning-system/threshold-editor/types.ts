
export interface ThresholdSettings {
  heartRateHigh: number;
  heartRateLow: number;
  hrvLow: number;
  sleepQualityMin: number;
  regulationScore: number;
  enableNotifications: boolean;
  enableAutoAdjust: boolean;
}

export interface ThresholdPreset {
  id: string;
  name: string;
  settings: ThresholdSettings;
}
