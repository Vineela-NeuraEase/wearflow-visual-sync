
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, BarChart2, AlertTriangle } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Monitor = () => {
  const navigate = useNavigate();
  
  const monitorTools = [
    {
      title: "Emotion Hub",
      description: "Track your emotions",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/emotion-hub",
      color: "bg-purple-100"
    },
    {
      title: "Body Stats",
      description: "Physical measurements",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      path: "/body-stats",
      color: "bg-green-100"
    },
    {
      title: "Environment",
      description: "Track external triggers",
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      path: "/environmental",
      color: "bg-amber-100"
    },
    {
      title: "Bio Tracking",
      description: "Monitor vitals",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      path: "/bio-tracking",
      color: "bg-red-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Monitor</h1>
            <p className="text-sm text-gray-600">Track your wellbeing</p>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {monitorTools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card 
              className="p-3 cursor-pointer hover:bg-gray-50 transition-colors border-2"
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Button
          variant="outline"
          className="w-full py-3 border-2 hover:bg-gray-50"
          onClick={() => navigate("/warning-system")}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Warning System
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default Monitor;
