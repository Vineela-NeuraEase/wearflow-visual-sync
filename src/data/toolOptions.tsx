
import { Activity, HeartPulse, Calendar, BookOpen } from "lucide-react";
import { ToolOption } from "@/components/overlay/ToolButton";

export const toolOptions: ToolOption[] = [
  { 
    name: "Monitor", 
    icon: <Activity className="h-10 w-10 text-blue-500 mb-2" />, 
    path: "/monitor", 
    bgColor: "bg-blue-100 hover:bg-blue-200" 
  },
  { 
    name: "Support", 
    icon: <HeartPulse className="h-10 w-10 text-red-500 mb-2" />, 
    path: "/support", 
    bgColor: "bg-red-100 hover:bg-red-200" 
  },
  { 
    name: "Plan", 
    icon: <Calendar className="h-10 w-10 text-purple-500 mb-2" />, 
    path: "/plan", 
    bgColor: "bg-purple-100 hover:bg-purple-200" 
  },
  { 
    name: "Learn", 
    icon: <BookOpen className="h-10 w-10 text-green-500 mb-2" />, 
    path: "/learn", 
    bgColor: "bg-green-100 hover:bg-green-200" 
  }
];
