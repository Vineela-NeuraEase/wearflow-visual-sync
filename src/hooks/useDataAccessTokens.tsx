
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const fetchTokens = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for development
      const mockTokens: DataAccessToken[] = [
        {
          id: "1",
          token: "mock-token-1",
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          last_used_at: null,
          scopes: ["read"],
          description: "Mock Token 1"
        }
      ];
      
      setTokens(mockTokens);
    } catch (err: any) {
      console.error("Error in fetchTokens:", err);
      setError("An unexpected error occurred while fetching tokens");
    } finally {
      setLoading(false);
    }
  };

  const createToken = async ({ description, scopes, expirationDays }: CreateTokenParams) => {
    try {
      setLoading(true);
      
      // Generate a mock token
      const tokenBytes = new Uint8Array(32);
      window.crypto.getRandomValues(tokenBytes);
      const token = Array.from(tokenBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expirationDays);
      
      const newToken: DataAccessToken = {
        id: Math.random().toString(36).substring(2, 11),
        token,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        last_used_at: null,
        scopes,
        description
      };
      
      // Update local state
      setTokens(prev => [newToken, ...prev]);
      
      toast({
        title: "Token created",
        description: "Your data access token has been created successfully",
      });
      
      return { ...newToken, tokenValue: token }; // Return with clear text token
    } catch (err: any) {
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
    try {
      setLoading(true);
      
      // Update local state
      setTokens(prev => prev.filter(token => token.id !== id));
      
      toast({
        title: "Token revoked",
        description: "Your data access token has been revoked",
      });
      
      return true;
    } catch (err: any) {
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
