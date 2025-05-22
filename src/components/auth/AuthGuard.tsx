
import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // Always render children during development
  return <>{children}</>;
};
