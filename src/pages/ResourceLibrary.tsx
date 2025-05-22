
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  content_type: string;
  content: string;
  image_url?: string;
  tags?: string[];
  is_featured?: boolean;
  is_bookmarked?: boolean;
}

const ResourceLibrary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [resources, setResources] = useState<Resource[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const allTags = Array.from(
    new Set(resources.flatMap(resource => resource.tags || []))
  ).sort();
  
  // Load resources and bookmarks
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Fetch all resources
        const { data: resourceData, error: resourceError } = await supabase
          .from('resources')
          .select('*')
          .order('is_featured', { ascending: false });
        
        if (resourceError) {
          console.error("Error fetching resources:", resourceError);
          toast({
            title: "Error",
            description: "Failed to load resources",
            variant: "destructive"
          });
          return;
        }
        
        let userBookmarks: string[] = [];
        
        // If user is logged in, fetch their bookmarks
        if (user) {
          const { data: bookmarkData, error: bookmarkError } = await supabase
            .from('bookmarks')
            .select('resource_id')
            .eq('user_id', user.id);
          
          if (bookmarkError) {
            console.error("Error fetching bookmarks:", bookmarkError);
          } else if (bookmarkData) {
            userBookmarks = bookmarkData.map(bookmark => bookmark.resource_id);
            setBookmarks(userBookmarks);
          }
        }
        
        // Mark bookmarked resources
        const resourcesWithBookmarks = resourceData?.map(resource => ({
          ...resource,
          is_bookmarked: userBookmarks.includes(resource.id)
        })) || [];
        
        setResources(resourcesWithBookmarks);
      } catch (error) {
        console.error("Error loading resources:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, [user, toast]);
  
  // Handle bookmark toggle
  const toggleBookmark = async (resourceId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark resources",
        variant: "destructive"
      });
      return;
    }
    
    const isCurrentlyBookmarked = bookmarks.includes(resourceId);
    
    try {
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('resource_id', resourceId);
        
        setBookmarks(bookmarks.filter(id => id !== resourceId));
      } else {
        // Add bookmark
        await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            resource_id: resourceId
          });
        
        setBookmarks([...bookmarks, resourceId]);
      }
      
      // Update local state to reflect bookmark change
      setResources(resources.map(resource => 
        resource.id === resourceId 
          ? { ...resource, is_bookmarked: !isCurrentlyBookmarked } 
          : resource
      ));
      
      toast({
        title: isCurrentlyBookmarked ? "Bookmark removed" : "Bookmark added",
        description: isCurrentlyBookmarked ? 
          "Resource removed from your bookmarks" : 
          "Resource added to your bookmarks",
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };
  
  // Filter resources based on search term and active tag
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !activeTag || 
      (resource.tags && resource.tags.includes(activeTag));
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Resource Library</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Explore resources for autism meltdown management and support
        </p>
      </div>

      <div className="px-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Tags filter */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={!activeTag ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveTag(null)}
          >
            All
          </Badge>
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={activeTag === tag ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Resources grid */}
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading resources...
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No resources found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden flex flex-col">
                {resource.image_url && (
                  <div 
                    className="h-40 bg-center bg-cover"
                    style={{ backgroundImage: `url(${resource.image_url})` }}
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleBookmark(resource.id)}
                      className={resource.is_bookmarked ? "text-blue-500" : ""}
                    >
                      {resource.is_bookmarked ? 
                        <BookmarkCheck className="h-5 w-5" /> : 
                        <Bookmark className="h-5 w-5" />}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2 flex-grow">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {resource.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate(`/resources/${resource.id}`)}
                  >
                    View Resource
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
