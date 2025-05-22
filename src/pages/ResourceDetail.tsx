
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch the resource details
  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching resource:", error);
        return null;
      }

      return data;
    }
  });

  // Function to bookmark a resource
  const bookmarkResource = async () => {
    if (!resource) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert({ resource_id: resource.id });

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

  // Function to share the resource
  const shareResource = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource?.title || "Shared resource",
          text: resource?.description || "Check out this resource",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share it with others",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading resource...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg mb-4">Resource not found</p>
        <Button onClick={() => navigate('/resource-library')}>
          Back to Resources
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={bookmarkResource}>
            <BookmarkPlus className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={shareResource}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        {resource.image_url && (
          <div className="h-48 bg-gray-200">
            <img
              src={resource.image_url}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex space-x-2 mb-2">
            {resource.tags && resource.tags.map((tag: string) => (
              <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold mb-4">{resource.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            {/* Display content - in a real app you might want to use a markdown parser or HTML sanitizer */}
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{resource.content}</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/resource-library')}>
          Back to Resources
        </Button>
        <Button onClick={bookmarkResource}>
          Bookmark Resource
        </Button>
      </div>
    </div>
  );
};

export default ResourceDetail;
