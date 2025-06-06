
import { BookOpen, BarChart2 } from "lucide-react";
import React from "react";

export interface LearnTool {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  gradient: string;
  borderGradient: string;
}

export const learnTools: LearnTool[] = [
  {
    title: "Resources",
    description: "Articles and guides",
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    path: "/resource-library",
    color: "bg-blue-100 dark:bg-blue-900/30",
    gradient: "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30",
    borderGradient: "border-l-4 border-blue-500"
  },
  {
    title: "Personal Insights",
    description: "Your data patterns",
    icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
    path: "/insights",
    color: "bg-purple-100 dark:bg-purple-900/30",
    gradient: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30",
    borderGradient: "border-l-4 border-purple-500"
  },
  {
    title: "Emotion Insights",
    description: "Emotion patterns",
    icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
    path: "/emotion-insights",
    color: "bg-pink-100 dark:bg-pink-900/30",
    gradient: "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/30",
    borderGradient: "border-l-4 border-pink-500"
  }
];
