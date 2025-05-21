
import { Wind, AlertTriangle, Eye, Vibrate, Music } from "lucide-react";
import { ToolOption } from "@/components/overlay/ToolButton";

export const toolOptions: ToolOption[] = [
  { 
    name: "Breathe", 
    icon: <Wind className="h-10 w-10 text-blue-500 mb-2" />, 
    path: "/breathing", 
    bgColor: "bg-blue-100 hover:bg-blue-200" 
  },
  { 
    name: "SOS", 
    icon: <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />, 
    path: "/sos", 
    bgColor: "bg-red-100 hover:bg-red-200" 
  },
  { 
    name: "Visual", 
    icon: <Eye className="h-10 w-10 text-purple-500 mb-2" />, 
    path: "/visual", 
    bgColor: "bg-purple-100 hover:bg-purple-200" 
  },
  { 
    name: "Haptic", 
    icon: <Vibrate className="h-10 w-10 text-pink-500 mb-2" />, 
    path: "/haptic", 
    bgColor: "bg-pink-100 hover:bg-pink-200" 
  },
  { 
    name: "Sounds", 
    icon: <Music className="h-10 w-10 text-green-500 mb-2" />, 
    path: "/sounds", 
    bgColor: "bg-green-100 hover:bg-green-200" 
  },
];
