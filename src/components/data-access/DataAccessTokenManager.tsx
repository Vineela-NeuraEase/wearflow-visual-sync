
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDataAccessTokens } from "@/hooks/useDataAccessTokens";
import { Loader2, Copy, Key, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/context/AuthContext";

export function DataAccessTokenManager() {
  const [description, setDescription] = useState("");
  const [expirationDays, setExpirationDays] = useState("30");
  const [scopesList, setScopesList] = useState<string[]>([]);
  const [newToken, setNewToken] = useState<string | null>(null);
  const { tokens, loading, error, fetchTokens, createToken, revokeToken } = useDataAccessTokens();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTokens();
    }
  }, [user]);

  const handleCreateToken = async () => {
    if (!description) {
      toast({
        title: "Missing information",
        description: "Please provide a description for the token",
        variant: "destructive"
      });
      return;
    }

    const result = await createToken({
      description,
      scopes: scopesList,
      expirationDays: parseInt(expirationDays, 10)
    });

    if (result) {
      setNewToken(result.tokenValue);
      setDescription("");
      setScopesList([]);
    }
  };

  const handleToggleScope = (scope: string) => {
    if (scopesList.includes(scope)) {
      setScopesList(scopesList.filter(s => s !== scope));
    } else {
      setScopesList([...scopesList, scope]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Token copied to clipboard"
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Access Tokens</CardTitle>
          <CardDescription>You must be logged in to manage data access tokens</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Data Access Token</CardTitle>
          <CardDescription>
            Generate tokens to access your data for model training
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Token Description</Label>
            <Input
              id="description"
              placeholder="e.g., ML Training Pipeline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Data Scopes</Label>
            <div className="grid grid-cols-2 gap-2">
              {['sensory', 'sleep', 'behavioral', 'routine', 'biometric'].map((scope) => (
                <div key={scope} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`scope-${scope}`}
                    checked={scopesList.includes(scope)}
                    onCheckedChange={() => handleToggleScope(scope)}
                  />
                  <Label htmlFor={`scope-${scope}`} className="capitalize">
                    {scope} data
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiration">Expires After</Label>
            <Select 
              value={expirationDays} 
              onValueChange={setExpirationDays}
            >
              <SelectTrigger id="expiration">
                <SelectValue placeholder="Select expiration period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCreateToken} 
            disabled={loading || !description}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Create Token
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {newToken && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">New Token Created</CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Copy this token now. You won't be able to see it again!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md font-mono text-sm break-all border">
              {newToken}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setNewToken(null)}>
              Dismiss
            </Button>
            <Button onClick={() => copyToClipboard(newToken)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Your Tokens</CardTitle>
          <CardDescription>
            Manage your existing data access tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {loading && !tokens.length ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              You haven't created any tokens yet
            </div>
          ) : (
            <div className="space-y-4">
              {tokens.map((token) => (
                <div key={token.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{token.description || "Unnamed Token"}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-destructive"
                      onClick={() => revokeToken(token.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Expires: {formatDate(token.expires_at)}
                    </span>
                    <span>
                      Scopes: {token.scopes.length ? token.scopes.join(", ") : "All data"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Using Tokens for Model Training</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>To access your data for model training, use the token with the Supabase API:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
            <code>
              {`GET https://sceleudbxgowlvbkxbvj.supabase.co/rest/v1/sensor_data?select=*
Authorization: Bearer [YOUR_TOKEN]
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZWxldWRieGdvd2x2Ymt4YnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTkwMDcsImV4cCI6MjA2MzM5NTAwN30.oCGzhTFTPUQcDj0rr1K86xPHrhOd_2mirAifbgjk3tE`}
            </code>
          </pre>
          <p>Replace [YOUR_TOKEN] with the token value. You can use this token in your training scripts to fetch data through the REST API.</p>
          <p>Available endpoints:</p>
          <ul>
            <li><code>/rest/v1/sensor_data</code> - Biometric sensor data</li>
            <li><code>/rest/v1/sensory_data</code> - Environmental sensory data</li>
            <li><code>/rest/v1/sleep_data</code> - Sleep metrics</li>
            <li><code>/rest/v1/behavioral_data</code> - Behavioral observations</li>
            <li><code>/rest/v1/routine_data</code> - Routine tracking</li>
            <li><code>/rest/v1/warning_events</code> - Warning system events</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
