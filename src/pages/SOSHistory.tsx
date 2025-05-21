
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, Info, Wind, Music } from "lucide-react";

const SOSHistory = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">SOS History</h1>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">
            All Events
          </Button>
          <Button variant="outline" className="bg-white rounded-full px-6">
            Early Stage
          </Button>
          <Button variant="outline" className="bg-white rounded-full px-6">
            High Stress
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold text-center mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center">
            <span className="text-3xl font-bold">12</span>
            <span className="text-gray-600">Total</span>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl flex flex-col items-center">
            <span className="text-3xl font-bold">8</span>
            <span className="text-gray-600">Early</span>
          </div>
          <div className="bg-red-50 p-4 rounded-xl flex flex-col items-center">
            <span className="text-3xl font-bold">4</span>
            <span className="text-gray-600">High</span>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        
        <Card className="p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Tuesday, June 6</h3>
              <p className="text-gray-500">3:45 PM • 12 minutes</p>
            </div>
            <div className="bg-red-100 px-4 py-2 rounded-full text-center">
              <span className="font-medium">High Stress</span>
            </div>
          </div>
          
          <div className="my-4 p-3 bg-gray-50 rounded-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-gray-500" />
            <span>Peak heart rate: 112 BPM</span>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center text-blue-500">
              <Wind className="h-5 w-5 mr-1" />
              <span>Breathing</span>
            </div>
            <div className="flex items-center text-purple-500">
              <Music className="h-5 w-5 mr-1" />
              <span>Sound</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">Monday, June 5</h3>
              <p className="text-gray-500">10:15 AM • 8 minutes</p>
            </div>
            <div className="bg-yellow-100 px-4 py-2 rounded-full text-center">
              <span className="font-medium">Early Stage</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SOSHistory;
