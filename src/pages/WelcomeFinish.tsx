
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeFinish = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <div className="flex justify-between space-x-4 mb-6">
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
        <div className="h-2 bg-blue-500 rounded-full w-1/6"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-10 shadow-lg"
        >
          <Check className="h-16 w-16 text-green-500" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4">You're All Set!</h1>
          <p className="text-lg mb-12 text-gray-700">
            Your Calm Space is ready to help you navigate your day with more ease.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm w-full max-w-md mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">What's next?</h2>
          
          <ul className="space-y-6 text-left">
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Explore calming tools</span>
            </li>
            
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Set up your first routine</span>
            </li>
            
            <li className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-lg">Log your first emotion</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-auto"
      >
        <Button 
          onClick={() => navigate("/")} 
          className="w-full bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeFinish;
