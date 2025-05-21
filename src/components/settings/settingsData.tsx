
import { 
  Palette, 
  Bell, 
  Lock, 
  Eye, 
  Info, 
  History, 
  Users, 
  Bell as BellIcon, 
  BookOpen, 
  User,
  Accessibility,
  Brain,
  BarChart2
} from "lucide-react";

export const appSettingsOptions = [
  { 
    name: "Display", 
    icon: <Palette className="h-5 w-5 text-blue-500" />,
    description: "Theme, text size and animations",
    path: "/settings/display"
  },
  { 
    name: "Accessibility", 
    icon: <Accessibility className="h-5 w-5 text-purple-500" />,
    description: "Text size, contrast, animations",
    path: "/settings/accessibility"
  },
  { 
    name: "Feedback", 
    icon: <Bell className="h-5 w-5 text-pink-500" />,
    description: "Haptic and sound settings",
    path: "/settings/feedback" 
  },
  { 
    name: "Privacy", 
    icon: <Lock className="h-5 w-5 text-green-500" />,
    description: "Data management and sharing",
    path: "/settings/privacy" 
  },
  { 
    name: "Advanced Views", 
    icon: <Eye className="h-5 w-5 text-purple-500" />,
    description: "Enable additional features",
    path: "/settings/advanced-views" 
  },
  { 
    name: "About", 
    icon: <Info className="h-5 w-5 text-gray-500" />,
    description: "App version and information",
    path: "/settings/about" 
  },
];

export const personalOptions = [
  {
    name: "Sensory Profile",
    icon: <Brain className="h-5 w-5 text-indigo-500" />,
    description: "Personalize sensory preferences",
    path: "/sensory-profile"
  },
  {
    name: "Emotion Insights",
    icon: <BarChart2 className="h-5 w-5 text-pink-500" />,
    description: "View emotion patterns and trends",
    path: "/emotion-insights"
  }
];

export const additionalOptions = [
  {
    name: "SOS History",
    icon: <History className="h-5 w-5 text-red-500" />,
    description: "View past panic events",
    path: "/sos-history"
  },
  {
    name: "Caregiver View",
    icon: <Users className="h-5 w-5 text-blue-500" />,
    description: "Manage shared information",
    path: "/caregiver-view"
  },
  {
    name: "Notifications",
    icon: <BellIcon className="h-5 w-5 text-yellow-500" />,
    description: "Manage app notifications",
    path: "/notification-center"
  },
  {
    name: "Resource Library",
    icon: <BookOpen className="h-5 w-5 text-teal-500" />,
    description: "Articles and helpful content",
    path: "/resource-library"
  },
  {
    name: "Profile & Account",
    icon: <User className="h-5 w-5 text-indigo-500" />,
    description: "Manage your account details",
    path: "/profile-account"
  }
];
