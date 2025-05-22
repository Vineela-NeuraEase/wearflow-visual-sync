
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock user type
export interface User {
  id: string;
  email: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: 'mock-user-id',
  email: 'user@example.com'
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Using mock user by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Always succeed for now
      setUser(mockUser);
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      return true;
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in");
      
      toast({
        title: "Sign in failed",
        description: err.message || "An error occurred during sign in",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign up function
  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Always succeed for now
      setUser(mockUser);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      
      return true;
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to create account");
      
      toast({
        title: "Sign up failed",
        description: err.message || "An error occurred during sign up",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock sign out function
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Clear the user
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (err: any) {
      console.error("Sign out error:", err);
      
      toast({
        title: "Sign out failed",
        description: "An error occurred during sign out",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for password reset instructions",
      });
      
      return true;
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err.message || "Failed to send password reset email");
      
      toast({
        title: "Password reset failed",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
