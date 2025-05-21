
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JournalEntryItemProps {
  title: string;
  date: string;
  preview: string;
}

export const JournalEntryItem = ({ title, date, preview }: JournalEntryItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600 line-clamp-2">{preview}</p>
    </Card>
  );
};

const JournalTabContent = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-green-50 rounded-xl">
        <h2 className="text-lg font-medium mb-2">Journal Entry</h2>
        <p className="text-sm text-gray-600 mb-4">
          Record your thoughts, feelings, and experiences.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
            onClick={() => navigate("/journal/quick")}
          >
            <PlusCircle className="h-5 w-5 mr-2 text-green-500" />
            Quick Entry
          </Button>
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-6"
            onClick={() => navigate("/journal/prompted")}
          >
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
            Guided Entry
          </Button>
        </div>
      </Card>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Entries</h3>
        <Button variant="link" onClick={() => navigate("/journal")}>
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        <JournalEntryItem
          title="Morning Reflection"
          date="Today"
          preview="Started the day with meditation..."
        />
        
        <JournalEntryItem
          title="Weekly Goals"
          date="2 days ago"
          preview="Planning to focus on self-care..."
        />
      </div>
    </div>
  );
};

export default JournalTabContent;
