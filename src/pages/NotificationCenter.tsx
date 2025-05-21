
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, CheckCircle, Users } from "lucide-react";

const NotificationCenter = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Notifications</h1>
        </div>
        <Button variant="ghost" className="text-blue-500">
          Clear All
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 px-2">Today</h2>
        
        <Card className="p-4 mb-4">
          <div className="flex">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Routine Reminder</h3>
                <span className="text-gray-500 text-sm">2h ago</span>
              </div>
              <p className="text-gray-700 my-2">Reading time starts in 30 minutes.</p>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100 border-blue-100">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Snooze
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 mb-4">
          <div className="flex">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Daily Goal Achieved</h3>
                <span className="text-gray-500 text-sm">4h ago</span>
              </div>
              <p className="text-gray-700 my-2">
                You've completed your breathing exercises for 5 consecutive days!
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 mb-4">
          <div className="flex">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Community</h3>
                <span className="text-gray-500 text-sm">5h ago</span>
              </div>
              <p className="text-gray-700 my-2">
                Jamie replied to your post in "Sensory Strategies"
              </p>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="bg-purple-50 hover:bg-purple-100 border-purple-100">
                  View Reply
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3 px-2">Yesterday</h2>
        
        <Card className="p-4">
          <div className="flex">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">Daily Insight</h3>
                <span className="text-gray-500 text-sm">1d ago</span>
              </div>
              <p className="text-gray-700 my-2">
                Your weekly wellness report is ready to view.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationCenter;
