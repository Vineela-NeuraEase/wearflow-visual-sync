
export interface Strategy {
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  category: string;
  effectiveness: number;
  created_at?: string;
  updated_at?: string;
}
