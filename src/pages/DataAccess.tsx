
import { DataAccessTokenManager } from "@/components/data-access/DataAccessTokenManager";

const DataAccess = () => {
  return (
    <div className="container max-w-5xl py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Access</h1>
        <p className="text-muted-foreground">
          Manage access to your data for machine learning and analysis
        </p>
      </div>
      
      <DataAccessTokenManager />
    </div>
  );
};

export default DataAccess;
