
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface PatternVisualizationProps {
  title?: string;
  type: "heatmap" | "connections" | "sleep";
  data?: any;
  className?: string;
}

export const PatternVisualization = ({
  title = "Pattern Visualization",
  type,
  data,
  className = ""
}: PatternVisualizationProps) => {
  const [visualizationContent, setVisualizationContent] = useState<React.ReactNode | null>(null);
  
  // Generate the appropriate visualization based on type
  useEffect(() => {
    switch (type) {
      case "heatmap":
        setVisualizationContent(renderHeatmap());
        break;
      case "connections":
        setVisualizationContent(renderConnections());
        break;
      case "sleep":
        setVisualizationContent(renderSleepCorrelation());
        break;
      default:
        setVisualizationContent(<div>No visualization available</div>);
    }
  }, [type, data]);
  
  const renderHeatmap = () => {
    // This is a placeholder visualization - in a real app this would use real data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = ["9AM", "12PM", "3PM", "6PM", "9PM"];
    
    // Generate fake data for the heatmap
    const generateHeatmapData = () => {
      return days.map(() => {
        return hours.map(() => {
          return Math.floor(Math.random() * 100);
        });
      });
    };
    
    const heatmapData = data || generateHeatmapData();
    
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Regulation Challenges by Time</h3>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, dayIndex) => (
            <div key={day} className="text-xs text-center mb-1">{day}</div>
          ))}
          
          {heatmapData.map((dayData: number[], dayIndex: number) => (
            dayData.map((value: number, hourIndex: number) => (
              <div 
                key={`${dayIndex}-${hourIndex}`}
                className={`w-full aspect-square rounded 
                  ${value > 80 ? 'bg-red-500' : 
                    value > 60 ? 'bg-amber-500' :
                    value > 40 ? 'bg-yellow-200' :
                    value > 20 ? 'bg-blue-200' : 'bg-blue-100'}`}
                title={`${days[dayIndex]} ${hours[hourIndex]}: ${value}%`}
              />
            ))
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-200 rounded"></div>
            <span className="text-xs">Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-xs">Critical</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderConnections = () => {
    // This is a placeholder for a connections visualization
    // In a real app, this would be an interactive visualization showing 
    // relationships between activities and physiological responses
    return (
      <div className="text-center">
        <h3 className="text-sm font-medium mb-4">Activity-Response Connections</h3>
        <div className="relative h-[220px] border border-gray-200 rounded-lg p-4 bg-gray-50">
          {/* Placeholder for connection visualization */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg width="180" height="180" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="30" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="150" cy="50" r="15" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
              <circle cx="50" cy="150" r="25" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <circle cx="150" cy="150" r="20" fill="#fae8ff" stroke="#d946ef" strokeWidth="2" />
              
              <line x1="100" y1="100" x2="50" y2="50" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
              <line x1="100" y1="100" x2="150" y2="50" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
              <line x1="100" y1="100" x2="50" y2="150" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
              <line x1="100" y1="100" x2="150" y2="150" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4" />
              
              <text x="100" y="104" textAnchor="middle" fontSize="8" fill="#1e40af">Regulation</text>
              <text x="50" y="54" textAnchor="middle" fontSize="7" fill="#92400e">Social</text>
              <text x="150" y="54" textAnchor="middle" fontSize="7" fill="#166534">Exercise</text>
              <text x="50" y="154" textAnchor="middle" fontSize="7" fill="#b91c1c">Noise</text>
              <text x="150" y="154" textAnchor="middle" fontSize="7" fill="#a21caf">Sleep</text>
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  const renderSleepCorrelation = () => {
    // This is a placeholder for a sleep correlation visualization
    return (
      <div>
        <h3 className="text-sm font-medium mb-4">Sleep Quality & Regulation</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-32 text-sm">Sleep Quality</div>
            <div className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-32 text-sm">Next Day Regulation</div>
            <div className="flex-1 h-6">
              <div className="relative w-full h-6">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded"></div>
                <div className="absolute top-0 left-0 w-3/4 h-full bg-blue-500 rounded"></div>
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xs text-white">
                  75% correlation
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-600">
          <p>Sleep quality strongly correlates with your next-day regulation capacity. 
          Each hour of quality sleep increases regulation score by approximately 12%.</p>
        </div>
      </div>
    );
  };

  return (
    <Card className={`p-5 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {visualizationContent}
      <div className="flex justify-end mt-4">
        <Button variant="link" size="sm" className="text-muted-foreground">
          View Details
        </Button>
      </div>
    </Card>
  );
};
