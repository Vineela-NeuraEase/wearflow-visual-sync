
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const ResourceDetail = () => {
  const { resourceId } = useParams<{ resourceId: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/learn">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Learn
          </Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold">Resource Details</h1>
      
      <Card className="p-5">
        <h2 className="text-xl font-semibold mb-4">Resource ID: {resourceId}</h2>
        <p className="text-muted-foreground mb-4">
          This page would display the full content of the learning resource.
        </p>
        
        <div className="prose dark:prose-invert">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tortor 
            euismod, finibus nunc ac, iaculis urna. Integer eget nisl vitae elit 
            ullamcorper faucibus vel at nisl.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResourceDetail;
