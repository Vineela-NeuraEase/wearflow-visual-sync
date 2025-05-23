
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Eye, Music, Vibrate, AlertTriangle } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Support = () => {
  const navigate = useNavigate();
  
  const supportTools = [
    {
      title: "Visual Tools",
      description: "Calming visual patterns",
      icon: <Eye className="h-6 w-6 text-purple-500" />,
      path: "/visual",
      color: "bg-purple-100",
      gradient: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30"
    },
    {
      title: "Sounds",
      description: "Soothing audio",
      icon: <Music className="h-6 w-6 text-green-500" />,
      path: "/sounds",
      color: "bg-green-100",
      gradient: "from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/30"
    },
    {
      title: "Haptic",
      description: "Gentle vibration patterns",
      icon: <Vibrate className="h-6 w-6 text-pink-500" />,
      path: "/haptic",
      color: "bg-pink-100",
      gradient: "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/30"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center mb-4 bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-300 bg-clip-text text-transparent">Support</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Self-regulation tools</p>
          </div>
        </div>
      </motion.div>
      
      {/* SOS Button - Enhanced with stronger visual gradients */}
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
          className="p-4 bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 border-2 border-red-400 dark:border-red-700 cursor-pointer hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
          onClick={() => navigate("/sos")}
        >
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 p-3 rounded-full mr-4">
              <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-700 dark:text-red-400">SOS Support</h2>
              <p className="text-sm text-red-600 dark:text-red-300">Get help right now</p>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {supportTools.map((tool) => (
          <motion.div
            key={tool.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 bg-gradient-to-br ${tool.gradient}`}
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3 bg-gradient-to-br ${tool.gradient}`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border-l-4 border-purple-500">
          <h3 className="text-base font-medium mb-2">Need more help?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tap on any tool to access immediate support
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Support;
