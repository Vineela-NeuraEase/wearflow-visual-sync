
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("June 7, 2023");
  const [dataToExport, setDataToExport] = useState({
    journal: true,
    activities: true,
    bodyStats: true
  });
  
  const handleCheckboxChange = (key: keyof typeof dataToExport) => {
    setDataToExport({
      ...dataToExport,
      [key]: !dataToExport[key]
    });
  };
  
  const exportData = () => {
    // In a real app, this would trigger data export
    console.log("Exporting data:", dataToExport);
    alert("Export feature would download your data in a real app");
  };
  
  const deleteDay = () => {
    // In a real app, this would delete data
    console.log("Deleting data for:", selectedDate);
    alert(`Data for ${selectedDate} would be deleted in a real app`);
  };
  
  const selectDates = () => {
    // In a real app, this would open a date picker
    alert("Date selection would open in a real app");
  };
  
  return (
    <div className="space-y-6 pb-16">
      <div className="rounded-xl bg-blue-100 p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-blue-200">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Privacy Settings</h1>
        </div>
      </div>
      
      <div className="px-4 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Export Your Data</h2>
          
          <Card className="p-6">
            <p className="mb-6 text-center">
              Export your journal entries and activity data as a PDF file.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="journal" 
                  checked={dataToExport.journal} 
                  onCheckedChange={() => handleCheckboxChange("journal")}
                  className="data-[state=checked]:bg-blue-500"
                />
                <label 
                  htmlFor="journal"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Journal Entries
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="activities" 
                  checked={dataToExport.activities} 
                  onCheckedChange={() => handleCheckboxChange("activities")}
                  className="data-[state=checked]:bg-blue-500"
                />
                <label 
                  htmlFor="activities"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Activities & Routines
                </label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="bodyStats" 
                  checked={dataToExport.bodyStats} 
                  onCheckedChange={() => handleCheckboxChange("bodyStats")}
                  className="data-[state=checked]:bg-blue-500"
                />
                <label 
                  htmlFor="bodyStats"
                  className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Body Stats & Metrics
                </label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={selectDates} className="w-[48%]">
                <Calendar className="mr-2 h-4 w-4" />
                Select Dates
              </Button>
              
              <Button onClick={exportData} className="w-[48%] bg-blue-500 hover:bg-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Delete Data</h2>
          
          <Card className="p-6">
            <h3 className="text-xl font-medium mb-2 text-center">Delete Specific Day</h3>
            
            <p className="mb-6 text-center">
              Remove all data for a specific day from both your device and our servers.
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Selected Date:</span>
                <span>{selectedDate}</span>
              </div>
              
              {/* In a real app, this would be a date picker component */}
            </div>
            
            <Button 
              variant="destructive" 
              onClick={deleteDay} 
              className="w-full"
            >
              Delete This Day
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PrivacySettings;
