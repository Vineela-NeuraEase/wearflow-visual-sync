
export interface Emotion {
  name: string;
  emoji: string;
}

export interface EmotionEntry {
  date: string;
  emotion: string;
  notes: string;
  time: string;
}

export interface GroupedEmotions {
  [date: string]: EmotionEntry[];
}

export interface PatternInsight {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}
