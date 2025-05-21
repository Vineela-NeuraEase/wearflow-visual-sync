
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeIntro = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="progress-bar mx-auto w-60 h-2 bg-blue-200 rounded-full my-6">
        <div className="bg-blue-500 h-full w-1/4 rounded-full"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-10 shadow-md"
        >
          <div className="text-blue-500 text-4xl">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
              <circle cx="16" cy="20" r="2" fill="currentColor"/>
              <circle cx="32" cy="20" r="2" fill="currentColor"/>
              <path d="M16 32C16 32 20 36 24 36C28 36 32 32 32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4">Welcome to Calm Space</h1>
          <p className="text-lg mb-10 text-gray-700">
            Your personal companion for sensory regulation and daily structure.
          </p>
        </motion.div>
        
        <Card className="w-full max-w-md p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">What you'll get:</h2>
          
          <ul className="space-y-6">
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Calming tools for sensory regulation</span>
            </li>
            
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Structured routines for daily life</span>
            </li>
            
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Emotion tracking and insights</span>
            </li>
            
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Personalized to your preferences</span>
            </li>
          </ul>
        </Card>
      </div>
      
      <div className="mt-auto flex justify-end">
        <Button 
          onClick={() => navigate("/welcome/emoji-calibration")} 
          className="bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default WelcomeIntro;
