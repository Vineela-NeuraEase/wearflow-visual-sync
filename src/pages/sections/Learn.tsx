
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, BarChart2, BookOpenCheck, BookmarkPlus } from "lucide-react";
import MenuDrawer from "@/components/home/MenuDrawer";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Learn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Fetch featured resource
  const { data: featuredResource, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ['featuredResource'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_featured', true)
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error fetching featured resource:", error);
        return null;
      }
      
      return data;
    }
  });

  const learnTools = [
    {
      title: "Resources",
      description: "Articles and guides",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      path: "/resource-library",
      color: "bg-blue-100 dark:bg-blue-900/30",
      gradient: "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30",
      borderGradient: "border-l-4 border-blue-500"
    },
    {
      title: "Personal Insights",
      description: "Your data patterns",
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      path: "/insights",
      color: "bg-purple-100 dark:bg-purple-900/30",
      gradient: "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/30",
      borderGradient: "border-l-4 border-purple-500"
    },
    {
      title: "Emotion Insights",
      description: "Emotion patterns",
      icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
      path: "/emotion-insights",
      color: "bg-pink-100 dark:bg-pink-900/30",
      gradient: "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/30",
      borderGradient: "border-l-4 border-pink-500"
    }
  ];
  
  // Function to bookmark a resource
  const bookmarkResource = async (resourceId: string) => {
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to bookmark resources",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('bookmarks')
        .insert({ 
          resource_id: resourceId,
          user_id: user.id
        });
      
      if (error) {
        console.error("Error bookmarking resource:", error);
        toast({
          title: "Couldn't bookmark resource",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Resource bookmarked",
        description: "You can find it in your bookmarks section",
      });
    } catch (err) {
      console.error("Error in bookmark function:", err);
    }
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-6">
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
              className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-2 dark:border-gray-700 ${tool.borderGradient} bg-gradient-to-br ${tool.gradient} shadow-md hover:shadow-lg`}
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-center">
                <div className={`${tool.color} p-3 rounded-full mr-3 bg-gradient-to-br ${tool.gradient} shadow-inner`}>
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="p-4 mt-4 border-2 border-l-4 border-amber-500 dark:border-gray-700 bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-100 dark:from-amber-900/20 dark:via-amber-800/15 dark:to-yellow-800/10 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-base font-medium mb-2 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-400 dark:via-amber-300 dark:to-yellow-400 bg-clip-text text-transparent">Today's Featured</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {isFeaturedLoading 
                  ? "Loading featured content..." 
                  : featuredResource?.title || "Sensory Processing Basics"}
              </p>
            </div>
            
            {featuredResource && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  bookmarkResource(featuredResource.id);
                }}
                className="rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30"
              >
                <BookmarkPlus className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </Button>
            )}
          </div>
          
          <div 
            className="bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 dark:from-amber-900/30 dark:via-amber-800/20 dark:to-yellow-900/20 rounded-lg h-24 flex items-center justify-center shadow-inner cursor-pointer"
            onClick={() => featuredResource && navigate(`/resource-library/${featuredResource.id}`)}
          >
            {featuredResource?.image_url ? (
              <img 
                src={featuredResource.image_url} 
                alt={featuredResource.title}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <BookOpenCheck className="h-6 w-6 text-amber-500 animate-pulse-gentle" />
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Learn;
