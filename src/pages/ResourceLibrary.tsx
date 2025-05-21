
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ResourceLibrary = () => {
  const navigate = useNavigate();
  
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
        />
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">
            All
          </Button>
          <Button variant="outline" className="bg-white rounded-full px-6">
            Articles
          </Button>
          <Button variant="outline" className="bg-white rounded-full px-6">
            Videos
          </Button>
          <Button variant="outline" className="bg-white rounded-full px-6">
            Tech
          </Button>
        </div>
      </div>

      <div>
        <Card className="overflow-hidden mb-6">
          <div className="h-48 bg-gray-200 relative">
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000" 
              alt="Person meditating" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm">
                Featured
              </span>
              <span className="text-gray-500">5 min read</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Understanding Sensory Overload</h2>
            <p className="text-gray-600 mb-4">
              Learn about the causes of sensory overload and effective strategies to manage it in everyday situations.
            </p>
            <Button className="w-full">Read Article</Button>
          </div>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Recently Added</h2>

        <Card className="p-4 mb-4">
          <div className="flex">
            <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
              <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-500">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm text-purple-600">Video</span>
                <span className="text-gray-500 text-sm">8 min</span>
              </div>
              <h3 className="font-semibold mt-1">Quick Breathing Techniques</h3>
              <p className="text-sm text-gray-600">
                Learn three effective breathing techniques for immediate stress relief.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResourceLibrary;
