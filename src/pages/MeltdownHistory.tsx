
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Filter, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Sample data for demonstration
const sampleMeltdowns = [
  {
    id: 1,
    date: "2025-05-18",
    intensity: 7,
    duration: 35,
    triggers: ["Noise", "Crowds"],
    strategies: ["Sound dampening", "Quiet space"],
    notes: "At the shopping mall. Got overwhelmed by the crowd and noise. Found a quiet corner to recover.",
    time: "2:45 PM"
  },
  {
    id: 2,
    date: "2025-05-15",
    intensity: 4,
    duration: 15,
    triggers: ["Change", "Environmental"],
    strategies: ["Deep breathing", "Support person"],
    notes: "Unexpected change in schedule. Mom helped me through it.",
    time: "10:30 AM"
  },
  {
    id: 3,
    date: "2025-05-10",
    intensity: 9,
    duration: 45,
    triggers: ["Visual", "Noise", "Internal"],
    strategies: ["Removing from situation", "Pressure/weighted items"],
    notes: "Fire alarm at school. Very loud and lights flashing. Teacher helped me to a quiet room.",
    time: "1:15 PM"
  },
  {
    id: 4,
    date: "2025-05-05",
    intensity: 5,
    duration: 20,
    triggers: ["Social", "Emotional"],
    strategies: ["Verbal scripts", "Deep breathing"],
    notes: "Group project at school. Got frustrated when team members weren't listening to my ideas.",
    time: "3:30 PM"
  }
];

const getIntensityColor = (intensity: number) => {
  if (intensity <= 3) return "bg-green-100 text-green-800";
  if (intensity <= 6) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
};

const getIntensityLabel = (intensity: number) => {
  if (intensity <= 3) return "Mild";
  if (intensity <= 6) return "Moderate";
  return "Severe";
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];

const MeltdownHistory = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const formattedMonth = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-amber-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Meltdown History</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-6">
        <Card className="p-4 bg-blue-50 flex items-center space-x-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <p className="text-sm">
            Tracking meltdowns helps identify patterns and develop effective coping strategies.
          </p>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/meltdown-logger")}>
            Log New Meltdown
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-medium">{formattedMonth}</h2>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {sampleMeltdowns.map((meltdown) => (
              <Card key={meltdown.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getIntensityColor(meltdown.intensity)}`}>
                      {getIntensityLabel(meltdown.intensity)} ({meltdown.intensity}/10)
                    </span>
                    <div className="mt-1 text-gray-600">
                      {new Date(meltdown.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {meltdown.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{meltdown.duration} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Triggers:</h3>
                    <div className="flex flex-wrap gap-2">
                      {meltdown.triggers.map((trigger) => (
                        <span 
                          key={trigger} 
                          className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Strategies Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {meltdown.strategies.map((strategy) => (
                        <span 
                          key={strategy} 
                          className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                        >
                          {strategy}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {meltdown.notes && (
                    <div>
                      <h3 className="text-sm font-medium mb-1">Notes:</h3>
                      <p className="text-sm text-gray-600">{meltdown.notes}</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="link" 
                  className="mt-2 px-0 text-amber-600"
                  onClick={() => navigate(`/meltdown-details/${meltdown.id}`)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
          
          <Card className="p-4 bg-gray-50">
            <h3 className="font-medium mb-3">This Month's Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Meltdowns:</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Intensity:</span>
                <span className="font-medium">6.25/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Average Duration:</span>
                <span className="font-medium">28.75 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Most Common Trigger:</span>
                <span className="font-medium">Noise (3)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Most Effective Strategy:</span>
                <span className="font-medium">Deep breathing</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4"
              onClick={() => navigate("/emotion-insights")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              View Complete Analytics
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeltdownHistory;
