// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sceleudbxgowlvbkxbvj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZWxldWRieGdvd2x2Ymt4YnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTkwMDcsImV4cCI6MjA2MzM5NTAwN30.oCGzhTFTPUQcDj0rr1K86xPHrhOd_2mirAifbgjk3tE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);