
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAudio } from "@/context/AudioContext";

const BodyStats = () => {
  const navigate = useNavigate();
  const { play } = useAudio();
  const [textOnly, setTextOnly] = useState(false);
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [dateRangeDetails, setDateRangeDetails] = useState("May 31 - June 7");
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleTextOnlyChange = () => {
    setTextOnly(!textOnly);
    play("click");
  };
  
  const handleDateNavigation = (direction: "prev" | "next") => {
    // This would update the date range in a real application
    play("pop");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Body Stats</h1>
          
          <div className="ml-auto flex items-center">
            <Label htmlFor="text-only" className="mr-2">Text Only</Label>
            <Switch id="text-only" checked={textOnly} onCheckedChange={handleTextOnlyChange} />
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDateNavigation("prev")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h2 className="text-xl font-medium">{dateRange}</h2>
            <p className="text-sm text-gray-600">{dateRangeDetails}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDateNavigation("next")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        {/* HRV Card */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-2">Heart Rate Variability</h3>
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold">68 ms</div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full">Optimal</div>
          </div>
          
          {!textOnly && (
            <div className="mt-4 h-24">
              <svg className="w-full h-full" viewBox="0 0 300 80">
                <path
                  d="M0,60 C20,50 40,65 60,55 C80,45 100,60 120,50 C140,40 160,55 180,45 C200,35 220,50 240,40 C260,30 280,45 300,35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              </svg>
            </div>
          )}
          
          <p className="text-gray-700 mt-4">
            Your HRV is in the optimal range, indicating good stress recovery.
          </p>
        </Card>
        
        {/* Sleep Quality Card */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-2">Sleep Quality</h3>
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold">7.2 hours</div>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">Good</div>
          </div>
          
          {!textOnly && (
            <div className="mt-4 h-24 flex items-end space-x-1">
              {[65, 75, 60, 85, 70, 80, 75].map((height, i) => (
                <div
                  key={i}
                  className="bg-blue-200 flex-1 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          )}
          
          <p className="text-gray-700 mt-4">
            Your sleep duration is consistent. Deep sleep has improved by 15%.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default BodyStats;
