
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Accessibility = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Accessibility Settings</h1>
      
      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">Visual Settings</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Contrast</h3>
            <div className="flex space-x-3">
              <Button variant="outline">Standard</Button>
              <Button variant="outline">High</Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Text Size</h3>
            <div className="flex space-x-3">
              <Button variant="outline">Small</Button>
              <Button variant="outline">Medium</Button>
              <Button variant="outline">Large</Button>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-5">
        <h2 className="text-lg font-semibold mb-4">Interaction Settings</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Animation</h3>
            <div className="flex space-x-3">
              <Button variant="outline">Enable</Button>
              <Button variant="outline">Reduce</Button>
              <Button variant="outline">Disable</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Accessibility;
