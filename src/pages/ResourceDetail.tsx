
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Clock, BookmarkPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const ResourceDetail = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', resourceId],
    queryFn: async () => {
      if (!resourceId) return null;

      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', resourceId)
        .single();

      if (error) {
        console.error("Error fetching resource:", error);
        toast({
          title: "Error",
          description: "Could not load the resource",
          variant: "destructive"
        });
        return null;
      }

      return data;
    },
    enabled: !!resourceId
  });

  // Function to bookmark a resource
  const bookmarkResource = async () => {
    if (!resource) return;
    
    try {
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
          resource_id: resource.id,
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
    } catch (err: any) {
      console.error("Error in bookmark function:", err);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/resource-library">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Resource Library
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-64 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ) : resource ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{resource.title}</h1>
            <Button variant="outline" onClick={bookmarkResource}>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Bookmark
            </Button>
          </div>
          
          <div className="flex items-center text-gray-500 mb-6">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full px-3 py-1 text-sm mr-3">
              {resource.content_type?.charAt(0).toUpperCase() + resource.content_type?.slice(1)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> 
              {`${Math.ceil(resource.content?.length / 1000)} min read`}
            </span>
          </div>

          {resource.image_url && (
            <div className="mb-6">
              <img 
                src={resource.image_url} 
                alt={resource.title} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          <Card className="p-6 mb-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {resource.description}
              </p>
              
              <div className="mt-6 whitespace-pre-line">
                {resource.content}
              </div>
            </div>
          </Card>
          
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-5">
          <h2 className="text-xl font-semibold mb-4">Resource not found</h2>
          <p className="text-muted-foreground mb-4">
            The resource you're looking for could not be found.
          </p>
          <Button onClick={() => navigate('/resource-library')}>
            Return to Resource Library
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ResourceDetail;
