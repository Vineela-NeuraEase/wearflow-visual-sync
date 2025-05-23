
import React from "react";
import { Card } from "@/components/ui/card";

const BreathingInstructions: React.FC = () => {
  return (
    <>
      <div className="mt-8">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Instructions</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Find a comfortable seated position</li>
          <li>• Follow the breathing circle as it expands and contracts</li>
          <li>• Focus on the rhythm and let your breathing synchronize</li>
          <li>• Try to continue for at least 2-3 minutes for best results</li>
        </ul>
      </div>
      
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 mt-6">
        <h3 className="font-medium mb-2">Benefits of Breathing Exercises</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Regular breathing practice can reduce stress, improve focus, lower blood pressure,
          and help manage anxiety. Try to incorporate a few minutes of breathing exercises
          into your daily routine.
        </p>
      </Card>
    </>
  );
};

export default BreathingInstructions;
