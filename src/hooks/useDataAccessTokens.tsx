
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DataAccessToken {
  id: string;
  token: string;
  created_at: string;
  expires_at: string;
  last_used_at: string | null;
  scopes: string[];
  description: string | null;
}

interface CreateTokenParams {
  description: string;
  scopes: string[];
  expirationDays: number;
}

export function useDataAccessTokens() {
  const [tokens, setTokens] = useState<DataAccessToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTokens = async () => {
    if (!user) {
      setError("You must be logged in to manage data access tokens");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Using generic query syntax to work around type issues
      const { data, error: fetchError } = await supabase
        .from('data_access_tokens')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (fetchError) {
        console.error("Error fetching tokens:", fetchError);
        setError(`Failed to load tokens: ${fetchError.message}`);
        return;
      }
      
      // Cast data to the correct type
      setTokens(data as unknown as DataAccessToken[]);
    } catch (err) {
      console.error("Error in fetchTokens:", err);
      setError("An unexpected error occurred while fetching tokens");
    } finally {
      setLoading(false);
    }
  };

  const createToken = async ({ description, scopes, expirationDays }: CreateTokenParams) => {
    if (!user) {
      setError("You must be logged in to create tokens");
      return null;
    }

    try {
      setLoading(true);
      
      // Generate a secure random token
      const tokenBytes = new Uint8Array(32);
      window.crypto.getRandomValues(tokenBytes);
      const token = Array.from(tokenBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expirationDays);
      
      // Using generic query syntax to work around type issues
      const { data, error: createError } = await supabase
        .from('data_access_tokens')
        .insert({
          user_id: user.id,
          token,
          expires_at: expiresAt.toISOString(),
          scopes,
          description
        })
        .select()
        .single();
      
      if (createError) {
        console.error("Error creating token:", createError);
        toast({
          title: "Error",
          description: `Failed to create token: ${createError.message}`,
          variant: "destructive"
        });
        return null;
      }
      
      // Update local state
      const newToken = data as unknown as DataAccessToken;
      setTokens(prev => [newToken, ...prev]);
      
      toast({
        title: "Token created",
        description: "Your data access token has been created successfully",
      });
      
      return { ...newToken, tokenValue: token }; // Return with clear text token
    } catch (err) {
      console.error("Error in createToken:", err);
      toast({
        title: "Error",
        description: "Failed to create token",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const revokeToken = async (id: string) => {
    if (!user) {
      setError("You must be logged in to revoke tokens");
      return false;
    }

    try {
      setLoading(true);
      
      // Using generic query syntax to work around type issues
      const { error: deleteError } = await supabase
        .from('data_access_tokens')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        console.error("Error revoking token:", deleteError);
        toast({
          title: "Error",
          description: `Failed to revoke token: ${deleteError.message}`,
          variant: "destructive"
        });
        return false;
      }
      
      // Update local state
      setTokens(prev => prev.filter(token => token.id !== id));
      
      toast({
        title: "Token revoked",
        description: "Your data access token has been revoked",
      });
      
      return true;
    } catch (err) {
      console.error("Error in revokeToken:", err);
      toast({
        title: "Error",
        description: "Failed to revoke token",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tokens,
    loading,
    error,
    fetchTokens,
    createToken,
    revokeToken
  };
}
