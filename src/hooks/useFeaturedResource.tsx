
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const useFeaturedResource = () => {
  const { data: featuredResource, isLoading, error } = useQuery({
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
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return { featuredResource, isLoading, error };
};

export default useFeaturedResource;
