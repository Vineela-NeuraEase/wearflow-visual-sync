
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Wind, Eye, Music, Vibrate, AlertTriangle } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Support = () => {
  const navigate = useNavigate();
  
  const supportTools = [
    {
      title: "Breathing",
      description: "Guided breathing patterns",
      icon: <Wind className="h-6 w-6 text-blue-500" />,
      path: "/breathing",
      color: "bg-blue-100"
    },
    {
      title: "Visual Tools",
      description: "Calming visual patterns",
      icon: <Eye className="h-6 w-6 text-purple-500" />,
      path: "/visual",
      color: "bg-purple-100"
    },
    {
      title: "Sounds",
      description: "Soothing audio",
      icon: <Music className="h-6 w-6 text-green-500" />,
      path: "/sounds",
      color: "bg-green-100"
    },
    {
      title: "Haptic",
      description: "Gentle vibration patterns",
      icon: <Vibrate className="h-6 w-6 text-pink-500" />,
      path: "/haptic",
      color: "bg-pink-100"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Support</h1>
            <p className="text-sm text-gray-600">Self-regulation tools</p>
          </div>
        </div>
      </div>
      
      {/* SOS Button - Prominent and Animated */}
      <motion.div 
        className="w-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2
        }}
      >
        <Card 
          className="p-4 bg-red-100 border-2 border-red-400 cursor-pointer hover:bg-red-200 transition-colors"
          onClick={() => navigate("/sos")}
        >
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-full mr-4">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-700">SOS Support</h2>
              <p className="text-sm text-red-600">Get help right now</p>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {supportTools.map((tool) => (
          <motion.div
            key={tool.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
      </div>
    </div>
  );
};

export default Support;
