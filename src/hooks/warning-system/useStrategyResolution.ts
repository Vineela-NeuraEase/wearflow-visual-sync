
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for resolving warnings with selected strategies
 */
export function useStrategyResolution({
  user,
  warningEventId,
  setWarningEventId,
  setWarningActive,
  strategies,
  updateEffectiveness,
  toast
}) {
  // Mark strategy as effective when user resolves warning
  const resolveWarningWithStrategy = async (strategyId) => {
    if (!user || !warningEventId) return;
    
    try {
      // Update the meltdown_events entry to include the strategy used
      const { error } = await supabase
        .from('meltdown_events')
        .update({
          duration: 15, // Set a nominal duration in minutes
          coping_strategies: [strategyId], // Store as an array of strategy IDs
          notes: "Resolved with strategy"
        })
        .eq('id', warningEventId);
        
      if (error) {
        console.error("Error updating warning event with strategy:", error);
        toast({
          title: "Error",
          description: "Failed to record resolution strategy",
          variant: "destructive"
        });
      } else {
        // Increase effectiveness rating for the strategy
        const strategy = strategies.find(s => s.id === strategyId);
        if (strategy && strategy.effectiveness < 5) {
          updateEffectiveness(strategyId, strategy.effectiveness + 1);
        }
        
        setWarningEventId(null);
        setWarningActive(false);
        
        toast({
          title: "Warning resolved",
          description: "Your selected strategy has been recorded",
        });
      }
    } catch (err) {
      console.error("Failed to resolve warning with strategy:", err);
    }
  };

  return { resolveWarningWithStrategy };
}
