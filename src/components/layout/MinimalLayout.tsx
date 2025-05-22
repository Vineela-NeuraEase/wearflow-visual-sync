
import React, { ReactNode } from "react";

interface MinimalLayoutProps {
  children: ReactNode;
}

const MinimalLayout = ({ children }: MinimalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default MinimalLayout;
