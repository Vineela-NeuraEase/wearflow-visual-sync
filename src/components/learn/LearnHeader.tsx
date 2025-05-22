
import { motion } from "framer-motion";
import MenuDrawer from "@/components/home/MenuDrawer";

const LearnHeader = () => {
  return (
    <motion.div 
      className="flex items-center mb-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/10 p-4 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-900/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <MenuDrawer />
        <div>
          <h1 className="text-xl font-medium bg-gradient-to-r from-indigo-600 via-primary to-pink-500 dark:from-indigo-400 dark:via-primary dark:to-pink-400 bg-clip-text text-transparent">Learn</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Knowledge and insights</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LearnHeader;
