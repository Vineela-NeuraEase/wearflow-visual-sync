
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

type ActivityType = {
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
};

const activityTypes: ActivityType[] = [
  { name: "Meal", icon: "⊞", bgColor: "bg-blue-100", iconColor: "text-blue-500" },
  { name: "Work", icon: "💼", bgColor: "bg-purple-100", iconColor: "text-purple-500" },
  { name: "Break", icon: "😊", bgColor: "bg-green-100", iconColor: "text-green-500" },
  { name: "Reading", icon: "📚", bgColor: "bg-pink-100", iconColor: "text-pink-500" },
  { name: "Wake Up", icon: "☀️", bgColor: "bg-yellow-100", iconColor: "text-yellow-500" },
  { name: "Sleep", icon: "🌙", bgColor: "bg-blue-200", iconColor: "text-blue-600" },
  { name: "Exercise", icon: "⏱️", bgColor: "bg-red-100", iconColor: "text-red-500" },
  { name: "Medication", icon: "💊", bgColor: "bg-teal-100", iconColor: "text-teal-500" },
  { name: "Custom", icon: "➕", bgColor: "bg-gray-200", iconColor: "text-gray-500" },
];

const RoutineWizard = () => {
  const navigate = useNavigate();
  const { play } = useAudio();
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const handleActivitySelect = (index: number) => {
    setSelectedActivity(index);
    play("pop");
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      play("whoosh");
    } else {
      // Complete wizard
      play("success");
      navigate(-1);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-100 p-4 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold ml-2">Add Activity</h1>
          </div>
          <div className="text-gray-600">Step {currentStep}/{totalSteps}</div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div 
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <h2 className="text-3xl font-bold mb-8 text-center">Choose activity type</h2>
        
        {/* Activity types grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {activityTypes.map((activity, index) => (
            <motion.div 
              key={activity.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card 
                className={`p-4 h-32 flex flex-col items-center justify-center cursor-pointer ${activity.bgColor} ${
                  selectedActivity === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleActivitySelect(index)}
              >
                <div className={`text-4xl mb-2 rounded-full p-3 ${activity.bgColor}`}>
                  {activity.icon}
                </div>
                <div className="font-medium">{activity.name}</div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-auto">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="w-1/3 py-6"
          >
            Cancel
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={selectedActivity === null}
            className="w-1/3 py-6 bg-blue-500 hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutineWizard;
