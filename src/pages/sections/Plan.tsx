
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar, Timer, Focus } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Plan = () => {
  const navigate = useNavigate();
  
  const planTools = [
    {
      title: "Daily Routine",
      description: "Organize your day visually",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      path: "/routine",
      color: "bg-blue-100 dark:bg-blue-900/30",
      gradient: "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30",
      borderGradient: "border-l-4 border-blue-500"
    },
    {
      title: "Break Timer",
      description: "Schedule structured breaks",
      icon: <Timer className="h-6 w-6 text-green-500" />,
      path: "/break-timer",
      color: "bg-green-100 dark:bg-green-900/30",
      gradient: "from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/30",
      borderGradient: "border-l-4 border-green-500"
    },
    {
      title: "Focus Mode",
      description: "Reduce distractions",
      icon: <Focus className="h-6 w-6 text-purple-500" />,
      path: "/focus",
      color: "bg-purple-100 dark:bg-purple-900/30",
      gradient: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30",
      borderGradient: "border-l-4 border-purple-500"
    },
    {
      title: "Routine Wizard",
      description: "Create custom routines",
      icon: <Calendar className="h-6 w-6 text-amber-500" />,
      path: "/routine-wizard",
      color: "bg-amber-100 dark:bg-amber-900/30",
      gradient: "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/30",
      borderGradient: "border-l-4 border-amber-500"
    }
  ];
  
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
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
            <h1 className="text-xl font-medium bg-gradient-to-r from-primary to-green-500 dark:from-primary dark:to-green-300 bg-clip-text text-transparent">Plan</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily organization tools</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {planTools.map((tool) => (
          <motion.div
            key={tool.title}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 dark:border-gray-700 ${tool.borderGradient} bg-gradient-to-br ${tool.gradient}`}
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3 bg-gradient-to-br ${tool.gradient}`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{tool.title}</h3>
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
        transition={{ delay: 0.3, duration: 0.5 }}
        className="category-plan p-4 rounded-xl"
      >
        <h3 className="text-base font-medium mb-1 bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">Planning Tips</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Visual schedules help reduce anxiety and improve transitions between activities
        </p>
      </motion.div>
    </div>
  );
};

export default Plan;
