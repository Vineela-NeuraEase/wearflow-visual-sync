
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, BookmarkPlus, Clock, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResourceLibrary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch resources from Supabase
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', activeCategory, searchQuery],
    queryFn: async () => {
      let query = supabase.from('resources').select('*');
      
      // Apply category filter if not "all"
      if (activeCategory !== "all" && activeCategory) {
        query = query.contains('tags', [activeCategory]);
      }
      
      // Apply search filter if available
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching resources:", error);
        return [];
      }
      
      return data;
    }
  });
  
  // Function to bookmark a resource
  const bookmarkResource = async (resourceId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation
    
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
  
  const categories = [
    { id: "all", name: "All" },
    { id: "article", name: "Articles" },
    { id: "video", name: "Videos" },
    { id: "tech", name: "Tech" },
  ];
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Resource Library</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Search resources..." 
          className="pl-10 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button 
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"} 
              className={`rounded-full px-6 ${
                activeCategory === category.id 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-white dark:bg-gray-800"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="text-center py-10">Loading resources...</div>
        ) : resources && resources.length > 0 ? (
          <div className="space-y-6">
            {resources.some(r => r.is_featured) && (
              <div>
                {resources
                  .filter(resource => resource.is_featured)
                  .map(resource => (
                    <Card key={resource.id} className="overflow-hidden mb-6" onClick={() => navigate(`/resource-library/${resource.id}`)}>
                      <div className="h-48 bg-gray-200 relative">
                        {resource.image_url ? (
                          <img 
                            src={resource.image_url} 
                            alt={resource.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500">
                            <span className="text-white font-medium text-xl">Featured Resource</span>
                          </div>
                        )}
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow rounded-full"
                          onClick={(e) => bookmarkResource(resource.id, e)}
                        >
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full px-4 py-1 text-sm">
                            Featured
                          </span>
                          <span className="text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> 
                            {`${Math.ceil(resource.content.length / 1000)} min read`}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{resource.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {resource.description}
                        </p>
                        <Button className="w-full">Read Article</Button>
                      </div>
                    </Card>
                  ))
                }
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
            
            {resources
              .filter(resource => !resource.is_featured)
              .map(resource => (
                <Card key={resource.id} className="p-4 mb-4" onClick={() => navigate(`/resource-library/${resource.id}`)}>
                  <div className="flex">
                    <div className="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                      {resource.content_type === 'video' ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-500">
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                        </svg>
                      ) : (
                        <BookOpen className="h-6 w-6 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-purple-600">
                          {resource.content_type.charAt(0).toUpperCase() + resource.content_type.slice(1)}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-500 text-sm flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {`${Math.ceil(resource.content.length / 1000)} min`}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto"
                            onClick={(e) => bookmarkResource(resource.id, e)}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-semibold mt-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.description.length > 100 
                          ? `${resource.description.substring(0, 100)}...` 
                          : resource.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            }
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No resources found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
