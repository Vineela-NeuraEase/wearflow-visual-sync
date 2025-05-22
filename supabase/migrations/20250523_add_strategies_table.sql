
-- Create strategies table for storing personalized coping strategies
CREATE TABLE IF NOT EXISTS public.strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  effectiveness INTEGER NOT NULL CHECK (effectiveness >= 0 AND effectiveness <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add update timestamp trigger
CREATE TRIGGER set_timestamp_strategies
BEFORE UPDATE ON public.strategies
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- Enable Row Level Security on strategies table
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for strategies
CREATE POLICY "Users can view their own strategies"
ON public.strategies
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own strategies"
ON public.strategies
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own strategies"
ON public.strategies
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own strategies"
ON public.strategies
FOR DELETE
USING (auth.uid() = user_id);
