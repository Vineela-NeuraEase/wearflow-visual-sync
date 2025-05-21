
interface Correlation {
  level: string;
  percentage: number;
  description: string;
  factor: string;
}

interface TriggerCorrelationProps {
  correlations: Correlation[];
}

export const TriggerCorrelation = ({ correlations }: TriggerCorrelationProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Trigger Correlations</h2>
      
      <div className="space-y-4">
        {correlations.map((correlation, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${
              correlation.level === "High" ? 'bg-amber-50' : 'bg-blue-50'
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{correlation.level} Correlation</h3>
              <span className="text-sm">{correlation.percentage}%</span>
            </div>
            <p className="mt-1 text-sm">
              <span className="font-medium">{correlation.factor}</span> {correlation.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
