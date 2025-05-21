
import { 
  Palette, 
  Bell, 
  Lock, 
  Eye, 
  Info, 
  History, 
  Users, 
  BellRing, 
  BookOpen, 
  User,
  Accessibility,
  Brain,
  BarChart2
} from "lucide-react";

export const appSettingsOptions = [
  { 
    name: "Display & Accessibility", 
    icon: <Accessibility className="h-5 w-5 text-purple-500" />,
    description: "Appearance, text size, contrast",
    path: "/settings/accessibility"
  },
  { 
    name: "Notifications & Feedback", 
    icon: <Bell className="h-5 w-5 text-pink-500" />,
    description: "Alerts, sounds and haptic feedback",
    path: "/settings/feedback" 
  },
  { 
    name: "Privacy & Data", 
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
    name: "Sensory & Emotion Profile",
    icon: <Brain className="h-5 w-5 text-indigo-500" />,
    description: "Personalize your experience",
    path: "/sensory-profile"
  },
  {
    name: "Insights & Statistics",
    icon: <BarChart2 className="h-5 w-5 text-pink-500" />,
    description: "View patterns and trends",
    path: "/emotion-insights"
  }
];

export const additionalOptions = [
  {
    name: "SOS & Safety",
    icon: <History className="h-5 w-5 text-red-500" />,
    description: "Manage emergency features",
    path: "/sos-history"
  },
  {
    name: "Connected Accounts",
    icon: <Users className="h-5 w-5 text-blue-500" />,
    description: "Caregivers and shared access",
    path: "/caregiver-view"
  },
  {
    name: "Resource Library",
    icon: <BookOpen className="h-5 w-5 text-teal-500" />,
    description: "Articles and helpful content",
    path: "/resource-library"
  },
  {
    name: "Account",
    icon: <User className="h-5 w-5 text-indigo-500" />,
    description: "Manage your profile",
    path: "/profile-account"
  }
];
