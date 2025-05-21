
import { Button } from "@/components/ui/button";

interface Recommendation {
  icon: string;
  title: string;
  description: string;
}

interface EnvironmentalRecommendationsProps {
  recommendations: Recommendation[];
}

export const EnvironmentalRecommendations = ({ recommendations }: EnvironmentalRecommendationsProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Environmental Recommendations</h2>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-800">
              <span className="text-lg">{recommendation.icon}</span>
            </div>
            <div>
              <h3 className="font-medium">{recommendation.title}</h3>
              <p className="text-sm mt-1">
                {recommendation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full mt-6">
        Generate Personalized Environment Plan
      </Button>
    </div>
  );
};
