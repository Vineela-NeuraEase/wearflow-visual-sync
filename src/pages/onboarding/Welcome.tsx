
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8">
        <span className="text-3xl text-primary-foreground">🧠</span>
      </div>
      
      <h1 className="text-3xl font-bold">Welcome to MeltSense</h1>
      
      <p className="text-muted-foreground max-w-md mx-auto">
        Your personal assistant for anticipating and managing autism meltdowns with real-time biosensory data.
      </p>
      
      <Card className="p-6 w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Get Started</h2>
          <p className="text-sm">
            We'll help you set up your personalized early warning system in just a few steps.
          </p>
          <Button asChild className="w-full">
            <Link to="/welcome/personalize">Continue</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Welcome;
