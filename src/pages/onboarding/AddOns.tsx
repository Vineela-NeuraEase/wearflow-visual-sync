
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const AddOns = () => {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold text-center">Additional Features</h1>
      
      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">Choose Add-ons</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 border rounded-md">
            <input 
              type="checkbox" 
              id="caregiver" 
              className="mt-1"
            />
            <div>
              <label htmlFor="caregiver" className="font-medium">Caregiver Notifications</label>
              <p className="text-sm text-muted-foreground">Share warnings with a caregiver</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 border rounded-md">
            <input 
              type="checkbox" 
              id="data" 
              className="mt-1"
            />
            <div>
              <label htmlFor="data" className="font-medium">Advanced Data Analysis</label>
              <p className="text-sm text-muted-foreground">Get detailed insights from your data</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 border rounded-md">
            <input 
              type="checkbox" 
              id="sensory" 
              className="mt-1"
            />
            <div>
              <label htmlFor="sensory" className="font-medium">Sensory Tools</label>
              <p className="text-sm text-muted-foreground">Access calming visual and auditory tools</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/welcome/wearable">Back</Link>
        </Button>
        <Button asChild>
          <Link to="/">
            <Check className="mr-2 h-4 w-4" />
            Finish Setup
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AddOns;
