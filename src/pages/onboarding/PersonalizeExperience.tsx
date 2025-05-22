
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PersonalizeExperience = () => {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-center">Personalize Your Experience</h1>
      
      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">About You</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">What would you like us to call you?</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">I am:</label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex-1">An autistic person</Button>
              <Button variant="outline" className="flex-1">A caregiver</Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/welcome">Back</Link>
        </Button>
        <Button asChild>
          <Link to="/welcome/wearable">Next</Link>
        </Button>
      </div>
    </div>
  );
};

export default PersonalizeExperience;
