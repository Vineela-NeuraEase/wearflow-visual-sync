
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CaregiverView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Caregiver View</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Alex</span>
          <Avatar>
            <AvatarFallback className="bg-blue-500 text-white">A</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Card className="bg-blue-50 p-4 flex items-center">
        <Info className="h-5 w-5 text-blue-500 mr-2" />
        <p className="text-center flex-1">This is a read-only view with limited information.</p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-center mb-6">Current Status</h2>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Calm Score</h3>
            <p className="text-4xl font-bold">72%</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="36" height="36" className="text-green-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <p className="text-center text-gray-700 mb-2">Alex is currently in a calm state.</p>
        <p className="text-center text-gray-500">Last updated 15 minutes ago.</p>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-center mb-6">Sleep Trend</h2>
        
        <div className="flex justify-between items-end h-32 mb-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <div 
              key={day} 
              className="w-1/8 bg-blue-200 rounded-t-md" 
              style={{ 
                height: `${[65, 75, 55, 85, 60, 80, 70][i]}%`,
                width: '12%' 
              }}
            />
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="w-1/8 text-center" style={{ width: '12%' }}>{day}</div>
          ))}
        </div>
        
        <p className="text-center text-gray-700">Average sleep: 7.2 hours. Sleep quality has been consistent.</p>
      </Card>
    </div>
  );
};

export default CaregiverView;
