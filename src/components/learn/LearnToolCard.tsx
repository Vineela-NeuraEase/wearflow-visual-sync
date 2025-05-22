
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LearnToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  gradient: string;
  borderGradient: string;
}

const LearnToolCard = ({
  title,
  description,
  icon,
  path,
  color,
  gradient,
  borderGradient
}: LearnToolCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card 
        className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 dark:border-gray-700 ${borderGradient} bg-gradient-to-br ${gradient} shadow-md hover:shadow-lg`}
        onClick={() => navigate(path)}
      >
        <div className="flex items-center">
          <div className={`${color} p-3 rounded-full mr-3 bg-gradient-to-br ${gradient} shadow-inner`}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-base bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default LearnToolCard;
