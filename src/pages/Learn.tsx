
import React from "react";
import { FeaturedResourceCard } from "@/components/learn/FeaturedResourceCard";
import { LearnHeader } from "@/components/learn/LearnHeader";
import { LearnToolsGrid } from "@/components/learn/LearnToolsGrid";

const Learn = () => {
  return (
    <div className="space-y-6">
      <LearnHeader />
      <FeaturedResourceCard />
      <LearnToolsGrid />
    </div>
  );
};

export default Learn;
