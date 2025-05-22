
export const getEmotionColor = (emotion: string) => {
  const emotionColors: Record<string, string> = {
    'Happy': 'bg-green-100 text-green-800',
    'Calm': 'bg-blue-100 text-blue-800',
    'Neutral': 'bg-gray-100 text-gray-800',
    'Tired': 'bg-purple-100 text-purple-800',
    'Anxious': 'bg-orange-100 text-orange-800',
    'Stressed': 'bg-red-100 text-red-800',
    'Confused': 'bg-yellow-100 text-yellow-800'
  };
  
  return emotionColors[emotion] || 'bg-gray-100 text-gray-800';
};

export const getEmotionEmoji = (emotion: string) => {
  const emojis: Record<string, string> = {
    'Happy': '😊',
    'Calm': '😌',
    'Neutral': '😐',
    'Tired': '😴',
    'Anxious': '😬',
    'Stressed': '😣',
    'Confused': '🤔'
  };
  
  return emojis[emotion] || '🙂';
};

export const groupEmotionsByDate = (emotions: EmotionEntry[]) => {
  const grouped: Record<string, EmotionEntry[]> = {};
  
  emotions.forEach(entry => {
    if (!grouped[entry.date]) {
      grouped[entry.date] = [];
    }
    grouped[entry.date].push(entry);
  });
  
  return grouped;
};

export type EmotionEntry = {
  date: string;
  emotion: string;
  notes: string;
  time: string;
};
