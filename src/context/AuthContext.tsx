
import React, { createContext, useContext, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { user: User | null } | null;
  }>;
  signOut: () => Promise<void>;
};

// Create a mock user for development
const mockUser = {
  id: "mock-user-id",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "",
} as User;

const mockSession = {
  access_token: "mock-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: 9999999999,
  user: mockUser,
} as Session;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Use mock user by default
  const [session, setSession] = useState<Session | null>(mockSession);
  const [isLoading, setIsLoading] = useState(false);
  
  const signIn = async (email: string, password: string) => {
    // Just return success for now
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    // Just return success for now
    return { data: { user: mockUser }, error: null };
  };

  const signOut = async () => {
    // Do nothing for now
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
