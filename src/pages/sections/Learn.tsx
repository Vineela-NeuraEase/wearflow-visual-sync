
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, BarChart2 } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";

const Learn = () => {
  const navigate = useNavigate();
  
  const learnTools = [
    {
      title: "Resources",
      description: "Articles and guides",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      path: "/resource-library",
      color: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Personal Insights",
      description: "Your data patterns",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/insights",
      color: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Emotion Insights",
      description: "Emotion patterns",
      icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
      path: "/emotion-insights",
      color: "bg-pink-100 dark:bg-pink-900/30"
    }
  ];
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <MenuDrawer />
          <div>
            <h1 className="text-xl font-medium">Learn</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Knowledge and insights</p>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {learnTools.map((tool) => (
          <motion.div
            key={tool.title}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card 
              className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900`}
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3`}>
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="p-3 mt-4 border-2 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-base font-medium mb-2">Today's Featured</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Sensory Processing Basics</p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-24 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-gray-400 animate-pulse-gentle" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Learn;
