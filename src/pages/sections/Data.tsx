
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Database, BarChart2, Shield } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Data = () => {
  const navigate = useNavigate();
  
  const dataOptions = [
    {
      title: "Share Data",
      description: "Help improve recommendations",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100",
      gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10",
      border: "border-l-4 border-blue-500"
    },
    {
      title: "Your Patterns",
      description: "See your data trends",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100",
      gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10",
      border: "border-l-4 border-purple-500"
    },
    {
      title: "Privacy Settings",
      description: "Manage data sharing",
      icon: <Shield className="h-6 w-6 text-green-500" />,
      path: "/settings/privacy",
      color: "bg-green-100",
      gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10",
      border: "border-l-4 border-green-500"
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
        className="flex items-center mb-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 p-3 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">Data</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your information</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-2 border-blue-200 dark:border-blue-800/30 mb-4 category-monitor">
          <h2 className="text-lg font-medium mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">How Your Data Helps</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Anonymous sharing helps improve recommendations for the neurodiverse community.
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {dataOptions.map((option) => (
              <motion.div
                key={option.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border bg-gradient-to-br ${option.gradient} ${option.border}`}
                  onClick={() => option.path && navigate(option.path)}
                >
                  <div className="flex items-center">
                    <div className={`${option.color} p-3 rounded-full mr-3 bg-radial-pulse`}>
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-base bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{option.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 important-gradient">
          <h3 className="text-base font-medium mb-2 bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">Privacy Notice</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All data is anonymous. You can opt out at any time.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Data;
