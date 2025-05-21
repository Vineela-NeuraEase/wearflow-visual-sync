
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MeltdownListItem } from "@/components/meltdown/MeltdownListItem";
import { MonthlySummary } from "@/components/meltdown/MonthlySummary";
import { MonthSelector } from "@/components/meltdown/MonthSelector";
import { InfoCard } from "@/components/meltdown/InfoCard";

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

  // Monthly summary calculations
  const monthlySummary = {
    total: 4,
    avgIntensity: 6.25,
    avgDuration: 28.75,
    commonTrigger: "Noise (3)",
    effectiveStrategy: "Deep breathing"
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
        <InfoCard />
        
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/meltdown-logger")}>
            Log New Meltdown
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <MonthSelector 
            currentMonth={formattedMonth}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
          />
          
          <div className="space-y-4">
            {sampleMeltdowns.map((meltdown) => (
              <MeltdownListItem key={meltdown.id} meltdown={meltdown} />
            ))}
          </div>
          
          <MonthlySummary {...monthlySummary} />
        </div>
      </div>
    </div>
  );
};

export default MeltdownHistory;
