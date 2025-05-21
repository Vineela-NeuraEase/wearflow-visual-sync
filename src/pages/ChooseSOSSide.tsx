
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const ChooseSOSSide = () => {
  const navigate = useNavigate();
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null);
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="flex justify-between space-x-4 mb-6">
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
        <div className="h-2 bg-blue-200 rounded-full w-1/4"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Choose SOS Button Side</h1>
        
        <p className="text-center text-gray-600 mb-8 max-w-md">
          The SOS button provides quick access to calming tools during stressful moments. 
          Which side is easier for you to reach?
        </p>
        
        <Card className="p-6 w-full max-w-xs mb-8">
          <div className="h-[500px] bg-gray-100 rounded-xl flex justify-between items-center px-4 relative">
            <div 
              className={`w-16 h-16 rounded-full bg-red-100 flex items-center justify-center cursor-pointer transition-all ${
                selectedSide === "left" ? "ring-4 ring-red-500" : "opacity-70"
              }`}
              onClick={() => setSelectedSide("left")}
            >
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm mb-4 text-gray-500">Tap to select your preferred side</p>
              <div className="text-lg font-medium">
                <span className={selectedSide === "left" ? "font-bold" : ""}>Left</span>
                <span className="mx-4">|</span>
                <span className={selectedSide === "right" ? "font-bold" : ""}>Right</span>
              </div>
            </div>
            
            <div 
              className={`w-16 h-16 rounded-full bg-red-100 flex items-center justify-center cursor-pointer transition-all ${
                selectedSide === "right" ? "ring-4 ring-red-500" : "opacity-70"
              }`}
              onClick={() => setSelectedSide("right")}
            >
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-auto flex justify-end">
        <Button 
          onClick={() => navigate("/welcome/wearable-pairing")} 
          className="bg-blue-500 hover:bg-blue-600"
          disabled={!selectedSide}
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ChooseSOSSide;
