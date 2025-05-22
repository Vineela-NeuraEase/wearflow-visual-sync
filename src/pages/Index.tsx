
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md px-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Autism Meltdown Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Track patterns, receive early warnings, and develop personalized strategies
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Button 
            onClick={() => navigate("/home")} 
            className="py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            size="lg"
          >
            Enter Application
          </Button>
          
          <Button 
            onClick={() => navigate("/welcome")} 
            variant="outline" 
            className="py-6 text-lg"
            size="lg"
          >
            Learn More
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          <p>Privacy focused meltdown tracking for individuals and caregivers</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
