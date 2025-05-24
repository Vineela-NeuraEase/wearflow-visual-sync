
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const BreathingExercise = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Breathing Exercise</h1>
        </div>
      </div>
      
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-center mb-6">
            Breathing exercises have been removed from this application.
          </p>
          <Button onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BreathingExercise;
