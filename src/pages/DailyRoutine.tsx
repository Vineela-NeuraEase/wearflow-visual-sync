
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Bell, Briefcase, Book, Home, Coffee, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import DailyInsightModal from "@/components/modals/DailyInsightModal";

type RoutineItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const DailyRoutine = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(2); // 0-indexed, so 2 = Wednesday
  const [showInsightModal, setShowInsightModal] = useState(false);
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = [5, 6, 7, 8, 9, 10, 11]; // Example dates
  
  const routineItems: RoutineItem[] = [
    {
      id: "wake-up",
      time: "7:00 AM",
      title: "Wake Up",
      description: "Morning routine",
      icon: <Sun className="h-6 w-6" />,
      color: "bg-yellow-100",
    },
    {
      id: "breakfast",
      time: "8:00 AM",
      title: "Breakfast",
      description: "With medication",
      icon: <Coffee className="h-6 w-6" />,
      color: "bg-blue-100",
    },
    {
      id: "work",
      time: "9:30 AM",
      title: "Work Session",
      description: "Focus time",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-purple-100",
    },
    {
      id: "reading",
      time: "1:00 PM",
      title: "Reading Time",
      description: "30 minutes",
      icon: <Book className="h-6 w-6" />,
      color: "bg-green-100",
    },
  ];
  
  const selectDay = (index: number) => {
    setSelectedDay(index);
  };

  const showInsight = () => {
    setShowInsightModal(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Routine Day View</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={showInsight}>
          <Bell className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="calm-container bg-calm-blue/30">
        <h2 className="text-2xl font-semibold text-center mb-6">Daily Routine</h2>
        
        {/* Day selector */}
        <div className="flex justify-between items-center overflow-x-auto mb-8 pb-2">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center px-4 py-2 rounded-lg cursor-pointer ${
                selectedDay === index ? "bg-blue-200" : ""
              }`}
              onClick={() => selectDay(index)}
            >
              <span className="text-gray-600">{day}</span>
              <span className={`text-lg font-medium ${
                selectedDay === index ? "text-primary" : ""
              }`}>{dates[index]}</span>
            </div>
          ))}
        </div>
        
        {/* Next up section */}
        <Card className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-lg mb-2">Next Up</h3>
          <div className="flex items-center">
            <div className="mr-4">
              <Book className="h-10 w-10 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-lg">Reading Time</h4>
              <p className="text-gray-500">In 25 minutes</p>
            </div>
          </div>
        </Card>
        
        {/* Timeline */}
        <div className="relative pl-6 border-l-2 border-gray-200 space-y-8 ml-4">
          {routineItems.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[34px] mt-1 rounded-full border-4 border-white bg-gray-200 w-6 h-6"></div>
              
              <div className="mb-2 text-gray-600 font-medium">{item.time}</div>
              
              <Card className={`${item.color} p-4 rounded-xl flex items-center`}>
                <div className="bg-white rounded-full p-2 mr-4">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-medium text-lg">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Card>
            </div>
          ))}
          
          {/* Add button at the end of timeline */}
          <div className="absolute -bottom-4 -left-4">
            <Button size="icon" className="rounded-full bg-primary">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <DailyInsightModal 
        isOpen={showInsightModal} 
        onClose={() => setShowInsightModal(false)}
        calmScore={78}
        comparedToYesterday="Better than yesterday"
        insight="You had fewer stress peaks today and your breathing exercises helped maintain balance."
        recommendation="Try a morning breathing session tomorrow"
      />
    </div>
  );
};

export default DailyRoutine;
