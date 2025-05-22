
import LearnToolCard from "./LearnToolCard";
import { motion } from "framer-motion";
import { learnTools } from "@/data/learnTools";

const LearnToolsGrid = () => {
  return (
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
        <LearnToolCard
          key={tool.title}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          path={tool.path}
          color={tool.color}
          gradient={tool.gradient}
          borderGradient={tool.borderGradient}
        />
      ))}
    </motion.div>
  );
};

export default LearnToolsGrid;
