
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Calendar, Info } from "lucide-react";
import { Pattern } from "./types";

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard = ({ pattern }: PatternCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physiological': return <Activity className="h-4 w-4" />;
      case 'environmental': return <Info className="h-4 w-4" />;
      case 'behavioral': return <Brain className="h-4 w-4" />;
      case 'temporal': return <Calendar className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physiological': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'environmental': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'behavioral': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'temporal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div 
      key={pattern.id} 
      className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{pattern.name}</h4>
        <Badge className={getCategoryColor(pattern.category)}>
          <div className="flex items-center gap-1">
            {getCategoryIcon(pattern.category)}
            <span>{pattern.category}</span>
          </div>
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        {pattern.description}
      </p>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Pattern confidence:</span>
          <span className="text-xs font-medium">{pattern.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500"
            style={{ width: `${pattern.confidence}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <h5 className="text-xs font-medium mb-1">Key Indicators:</h5>
        <ul className="text-xs space-y-1 text-muted-foreground">
          {pattern.indicators.map((indicator, index) => (
            <li key={index} className="flex items-center">
              <span className="h-1 w-1 rounded-full bg-gray-400 mr-2"></span>
              {indicator}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
