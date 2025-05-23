
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const CalmingTools = () => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Calming Tools</h1>
      </div>
      
      <motion.div 
        className="calm-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center mb-2">
          <ArrowLeft className="h-5 w-5 text-primary cursor-pointer" onClick={() => navigate('/')} />
          <h2 className="text-2xl font-semibold ml-4">Calming Tools</h2>
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-4">Activities</h3>
        
        <motion.div className="space-y-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white rounded-xl p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/visual')}
            >
              <motion.div 
                className="bg-calm-green/30 rounded-full p-3 mr-4"
                animate={{ 
                  boxShadow: ['0px 0px 0px rgba(0,0,0,0)', '0px 0px 8px rgba(72,187,120,0.4)', '0px 0px 0px rgba(0,0,0,0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg className="h-6 w-6 text-tool-green" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H5.01M19 12H19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19V19.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 1C10.22 1 8.47991 1.52784 6.99987 2.51677C5.51983 3.50571 4.36628 4.91131 3.68509 6.55585C3.0039 8.20038 2.82567 10.01 3.17294 11.7558C3.5202 13.5016 4.37737 15.1053 5.63604 16.364C6.89472 17.6226 8.49836 18.4798 10.2442 18.8271C11.99 19.1743 13.7996 18.9961 15.4442 18.3149C17.0887 17.6337 18.4943 16.4802 19.4832 15.0001C20.4722 13.5201 21 11.78 21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <div>
                <h3 className="font-medium text-lg">Visual Stimming</h3>
                <p className="text-muted-foreground">Calming visual patterns</p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white rounded-xl p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/sounds')}
            >
              <motion.div 
                className="bg-calm-pink/30 rounded-full p-3 mr-4"
                animate={{ 
                  y: [0, -3, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="h-6 w-6 text-tool-pink" />
              </motion.div>
              <div>
                <h3 className="font-medium text-lg">Soothing Sounds</h3>
                <p className="text-muted-foreground">White noise and nature sounds</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-medium mt-8 mb-4">Featured Tools</h3>
          
          <Card 
            className="bg-white rounded-xl p-4 overflow-hidden cursor-pointer hover:shadow-md"
            onClick={() => navigate('/visual')}
          >
            <motion.div
              animate={{ 
                y: [0, 5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-full h-[180px] bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 10px rgba(120, 180, 255, 0.3)',
                      '0 0 30px rgba(120, 180, 255, 0.7)',
                      '0 0 10px rgba(120, 180, 255, 0.3)'
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="h-16 w-16 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </motion.div>
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                Visual calming patterns to help reduce stress and promote relaxation
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CalmingTools;
