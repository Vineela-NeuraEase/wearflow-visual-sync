
export interface Pattern {
  id: string;
  name: string;
  description: string;
  confidence: number;
  indicators: string[];
  category: 'physiological' | 'environmental' | 'behavioral' | 'temporal';
}

export interface PatternDetectionInsightsProps {
  detectedPatterns?: Pattern[];
  realtimeData?: any[];
}
