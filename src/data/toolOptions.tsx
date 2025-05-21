
import { Wind, AlertTriangle, Mic, Music, Eye } from "lucide-react";
import { ToolOption } from "@/components/overlay/ToolButton";

export const toolOptions: ToolOption[] = [
  { 
    name: "Breathe", 
    icon: <Wind className="h-10 w-10 text-tool-blue mb-2" />, 
    path: "/breathing", 
    bgColor: "bg-calm-blue hover:bg-calm-blue/80" 
  },
  { 
    name: "SOS", 
    icon: <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />, 
    path: "/sos", 
    bgColor: "bg-red-200 hover:bg-red-300" 
  },
  { 
    name: "Visual", 
    icon: <Eye className="h-10 w-10 text-purple-500 mb-2" />, 
    path: "/visual", 
    bgColor: "bg-purple-200 hover:bg-purple-300" 
  },
  { 
    name: "Haptic", 
    icon: <Mic className="h-10 w-10 text-pink-500 mb-2" />, 
    path: "/haptic", 
    bgColor: "bg-pink-200 hover:bg-pink-300" 
  },
  { 
    name: "Sounds", 
    icon: <Music className="h-10 w-10 text-green-500 mb-2" />, 
    path: "/sounds", 
    bgColor: "bg-green-200 hover:bg-green-300" 
  },
];
