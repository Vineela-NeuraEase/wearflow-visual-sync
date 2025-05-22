
import LearnHeader from "@/components/learn/LearnHeader";
import LearnToolsGrid from "@/components/learn/LearnToolsGrid";
import FeaturedResourceCard from "@/components/learn/FeaturedResourceCard";
import useFeaturedResource from "@/hooks/useFeaturedResource";

const Learn = () => {
  // Use the custom hook to fetch the featured resource
  const { featuredResource, isLoading: isFeaturedLoading } = useFeaturedResource();
  
  return (
    <div className="space-y-6">
      <LearnHeader />
      <LearnToolsGrid />
      <FeaturedResourceCard 
        featuredResource={featuredResource} 
        isLoading={isFeaturedLoading} 
      />
    </div>
  );
};

export default Learn;
