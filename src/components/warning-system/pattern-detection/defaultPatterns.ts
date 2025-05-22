
import { Pattern } from "./types";

// Default patterns to show when no detected patterns are provided
export const defaultPatterns: Pattern[] = [
  {
    id: 'pattern1',
    name: 'Pre-meltdown Physiological Pattern',
    description: 'Increasing heart rate with decreasing HRV over 30+ minutes',
    confidence: 85,
    indicators: ['Heart rate +15% from baseline', 'HRV -25% from baseline', 'Stress hormone increase'],
    category: 'physiological'
  },
  {
    id: 'pattern2',
    name: 'Environmental Trigger Accumulation',
    description: 'Multiple environmental triggers present simultaneously',
    confidence: 75,
    indicators: ['Loud environment', 'Bright lighting', 'Crowded space'],
    category: 'environmental'
  },
  {
    id: 'pattern3',
    name: 'Time-based Vulnerability Pattern',
    description: 'Increased sensitivity during afternoon transition period',
    confidence: 70,
    indicators: ['Time of day: 2-4 PM', 'Post-lunch energy dip', 'Before routine transition'],
    category: 'temporal'
  }
];
