
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFeaturedResource = () => {
  const { data: featuredResource, isLoading } = useQuery({
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

  return { featuredResource, isLoading };
};

export default useFeaturedResource;
