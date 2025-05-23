
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const initialAuthContext: AuthContextProps = {
  user: null,
  session: null,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null, data: null }),
  signOut: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
};

const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simple toast replacement function
  const showToast = (title: string, description: string, variant: string = "default") => {
    console.log(`Toast: ${title} - ${description} (${variant})`);
  };

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
        
        // Handle auth events
        if (event === 'SIGNED_IN') {
          showToast(
            "Signed in",
            "You have successfully signed in"
          );
        } else if (event === 'SIGNED_OUT') {
          showToast(
            "Signed out",
            "You have been signed out"
          );
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        showToast(
          "Authentication error",
          error.message,
          "destructive"
        );
        return { error };
      }
      return { error: null };
    } catch (error: any) {
      showToast(
        "Authentication error",
        error.message,
        "destructive"
      );
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        showToast(
          "Sign up error",
          error.message,
          "destructive"
        );
        return { error, data: null };
      }
      showToast(
        "Account created",
        "Please check your email to verify your account"
      );
      return { error: null, data };
    } catch (error: any) {
      showToast(
        "Sign up error",
        error.message,
        "destructive"
      );
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        showToast(
          "Sign out error",
          error.message,
          "destructive"
        );
        return { error };
      }
      return { error: null };
    } catch (error: any) {
      showToast(
        "Sign out error",
        error.message,
        "destructive"
      );
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        showToast(
          "Password reset error",
          error.message,
          "destructive"
        );
        return { error };
      }
      showToast(
        "Password reset email sent",
        "Please check your email to reset your password"
      );
      return { error: null };
    } catch (error: any) {
      showToast(
        "Password reset error",
        error.message,
        "destructive"
      );
      return { error };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
