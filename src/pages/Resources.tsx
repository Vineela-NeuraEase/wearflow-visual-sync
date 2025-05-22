
import React from 'react';

const Resources = () => {
  return (
    <div className="container max-w-5xl py-8 space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resources</h1>
        <p className="text-muted-foreground">
          Helpful resources for emotional regulation and support
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Breathing Techniques</h2>
          <p className="text-muted-foreground mb-4">
            Learn different breathing techniques that can help with emotional regulation.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn more →</a>
        </div>
        
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Sensory Tools</h2>
          <p className="text-muted-foreground mb-4">
            Discover sensory tools that can help you manage overwhelm and anxiety.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn more →</a>
        </div>
        
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Regulation Strategies</h2>
          <p className="text-muted-foreground mb-4">
            Find strategies to help regulate emotions during challenging situations.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn more →</a>
        </div>
        
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Community Support</h2>
          <p className="text-muted-foreground mb-4">
            Connect with others who understand your experiences.
          </p>
          <a href="#" className="text-blue-600 hover:underline">Learn more →</a>
        </div>
      </div>
    </div>
  );
};

export default Resources;
