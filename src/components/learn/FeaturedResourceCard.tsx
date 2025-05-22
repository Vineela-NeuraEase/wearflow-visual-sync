
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpenCheck, BookmarkPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedResourceProps {
  featuredResource: any;
  isLoading: boolean;
}

const FeaturedResourceCard = ({ featuredResource, isLoading }: FeaturedResourceProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
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
              {isLoading 
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
  );
};

export default FeaturedResourceCard;
