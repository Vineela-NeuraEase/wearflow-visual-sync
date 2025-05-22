
-- Enable Row Level Security for strategies table
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own strategies
CREATE POLICY "Users can view their own strategies" 
  ON public.strategies 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own strategies
CREATE POLICY "Users can create their own strategies" 
  ON public.strategies 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own strategies
CREATE POLICY "Users can update their own strategies" 
  ON public.strategies 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own strategies
CREATE POLICY "Users can delete their own strategies" 
  ON public.strategies 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for meltdown_events table
ALTER TABLE public.meltdown_events ENABLE ROW LEVEL SECURITY;

-- Create policies for meltdown_events
CREATE POLICY "Users can view their own meltdown events" 
  ON public.meltdown_events 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meltdown events" 
  ON public.meltdown_events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meltdown events" 
  ON public.meltdown_events 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meltdown events" 
  ON public.meltdown_events 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for sleep_data table
ALTER TABLE public.sleep_data ENABLE ROW LEVEL SECURITY;

-- Create policies for sleep_data
CREATE POLICY "Users can view their own sleep data" 
  ON public.sleep_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sleep data" 
  ON public.sleep_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sleep data" 
  ON public.sleep_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sleep data" 
  ON public.sleep_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for sensory_data table
ALTER TABLE public.sensory_data ENABLE ROW LEVEL SECURITY;

-- Create policies for sensory_data
CREATE POLICY "Users can view their own sensory data" 
  ON public.sensory_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sensory data" 
  ON public.sensory_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sensory data" 
  ON public.sensory_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sensory data" 
  ON public.sensory_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for routine_data table
ALTER TABLE public.routine_data ENABLE ROW LEVEL SECURITY;

-- Create policies for routine_data
CREATE POLICY "Users can view their own routine data" 
  ON public.routine_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own routine data" 
  ON public.routine_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own routine data" 
  ON public.routine_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own routine data" 
  ON public.routine_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for behavioral_data table
ALTER TABLE public.behavioral_data ENABLE ROW LEVEL SECURITY;

-- Create policies for behavioral_data
CREATE POLICY "Users can view their own behavioral data" 
  ON public.behavioral_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own behavioral data" 
  ON public.behavioral_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own behavioral data" 
  ON public.behavioral_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own behavioral data" 
  ON public.behavioral_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for sensor_data table
ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;

-- Create policies for sensor_data
CREATE POLICY "Users can view their own sensor data" 
  ON public.sensor_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sensor data" 
  ON public.sensor_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sensor data" 
  ON public.sensor_data 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sensor data" 
  ON public.sensor_data 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable Row Level Security for bookmarks table
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for bookmarks
CREATE POLICY "Users can view their own bookmarks" 
  ON public.bookmarks 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks" 
  ON public.bookmarks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
  ON public.bookmarks 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Allow public access to resources table for reading
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to resources" 
  ON public.resources 
  FOR SELECT 
  USING (true);

-- Only allow admins to insert/update/delete resources
CREATE POLICY "Only admins can insert resources" 
  ON public.resources 
  FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Only admins can update resources" 
  ON public.resources 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE is_admin = true));

CREATE POLICY "Only admins can delete resources" 
  ON public.resources 
  FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM public.profiles WHERE is_admin = true));
