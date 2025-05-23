
import { Eye, Music, Vibrate, Moon, Sparkles, Wind } from 'lucide-react';

export const toolOptions = [
  {
    name: 'Visual',
    icon: <Eye className="h-6 w-6 text-blue-500" />,
    path: '/visual',
    bgColor: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Sounds',
    icon: <Music className="h-6 w-6 text-green-500" />,
    path: '/sounds',
    bgColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Breathing',
    icon: <Wind className="h-6 w-6 text-indigo-500" />,
    path: '/breathing',
    bgColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: 'Haptic',
    icon: <Vibrate className="h-6 w-6 text-purple-500" />,
    path: '/haptic',
    bgColor: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Rest',
    icon: <Moon className="h-6 w-6 text-indigo-500" />,
    path: '/rest',
    bgColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    name: 'Focus',
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    path: '/focus',
    bgColor: 'bg-amber-100 text-amber-800',
  }
];
