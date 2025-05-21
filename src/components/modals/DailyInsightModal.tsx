
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type DailyInsightModalProps = {
  isOpen: boolean;
  onClose: () => void;
  calmScore: number;
  comparedToYesterday: string;
  insight: string;
  recommendation: string;
};

const DailyInsightModal = ({
  isOpen,
  onClose,
  calmScore = 78,
  comparedToYesterday = "Better than yesterday",
  insight = "You had fewer stress peaks today and your breathing exercises helped maintain balance.",
  recommendation = "Try a morning breathing session tomorrow",
}: DailyInsightModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none shadow-none max-w-md mx-auto">
        <Card className="bg-white rounded-xl overflow-hidden">
          <div className="bg-blue-100 p-6 text-center relative">
            <div className="flex justify-center">
              <span className="text-yellow-400 text-2xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Daily Insight</h2>
          </div>
          
          <div className="p-6">
            <Card className="bg-blue-50 p-6 mb-6">
              <div className="text-center">
                <h3 className="text-lg mb-2">Calm Score</h3>
                <div className="text-5xl font-bold mb-1">{calmScore}%</div>
                <p className="text-gray-600">{comparedToYesterday}</p>
              </div>
            </Card>
            
            <p className="text-center text-lg mb-6">
              {insight}
            </p>
            
            <Card className="bg-purple-100 p-4 mb-6 flex items-center">
              <div className="bg-purple-200 rounded-full p-2 mr-3">
                <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>{recommendation}</span>
            </Card>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
              >
                Why?
              </Button>
              <Button
                className="flex-1 bg-blue-500"
                onClick={onClose}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DailyInsightModal;
