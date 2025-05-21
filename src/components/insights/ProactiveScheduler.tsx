
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  name: string;
  predictedEnergy: "high" | "medium" | "low";
  suggestedTime: string;
  duration: string;
}

interface ProactiveSchedulerProps {
  date?: Date;
  activities?: Activity[];
}

export const ProactiveScheduler = ({ 
  date = new Date(), 
  activities = [
    { 
      id: "1", 
      name: "Team Meeting", 
      predictedEnergy: "high", 
      suggestedTime: "10:30 AM",
      duration: "45 min"
    },
    { 
      id: "2", 
      name: "Project Work", 
      predictedEnergy: "medium", 
      suggestedTime: "2:00 PM",
      duration: "60 min"
    },
    { 
      id: "3", 
      name: "Grocery Shopping", 
      predictedEnergy: "low", 
      suggestedTime: "6:30 PM",
      duration: "30 min"
    }
  ]
}: ProactiveSchedulerProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  const getEnergyColor = (level: string) => {
    switch (level) {
      case "high": return "bg-green-100 text-green-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "low": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const scheduleActivity = (activity: Activity) => {
    toast({
      title: "Activity scheduled",
      description: `${activity.name} added to your calendar at ${activity.suggestedTime}`
    });
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Proactive Scheduling</h2>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changeDate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="font-medium">{formatDate(selectedDate)}</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changeDate(1)}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
              <div className="font-medium text-lg">Morning</div>
            </div>
            <div className="text-sm text-muted-foreground">9am - 12pm</div>
          </div>
          <p className="text-sm mb-3">Optimal for challenging tasks & social interaction</p>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="text-xs">View Details</Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
              <div className="font-medium text-lg">Afternoon</div>
            </div>
            <div className="text-sm text-muted-foreground">1pm - 5pm</div>
          </div>
          <p className="text-sm mb-3">Good for focused work, avoid multitasking</p>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="text-xs">View Details</Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-amber-500 rounded-full mr-3"></div>
              <div className="font-medium text-lg">Evening</div>
            </div>
            <div className="text-sm text-muted-foreground">6pm - 9pm</div>
          </div>
          <p className="text-sm mb-3">Wind down with low-intensity activities</p>
          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="text-xs">View Details</Button>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-sm mb-2">Suggested Schedule</h3>
      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{activity.name}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{activity.suggestedTime} • {activity.duration}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full mr-3 ${getEnergyColor(activity.predictedEnergy)}`}>
                  {activity.predictedEnergy} energy
                </span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8"
                  onClick={() => scheduleActivity(activity)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
