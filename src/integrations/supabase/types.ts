export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      behavioral_data: {
        Row: {
          communication_difficulty: number
          created_at: string
          id: string
          irritability_level: number
          self_reported_mood: number
          social_withdrawal: number
          stimming: number
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          communication_difficulty: number
          created_at?: string
          id?: string
          irritability_level: number
          self_reported_mood: number
          social_withdrawal: number
          stimming: number
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          communication_difficulty?: number
          created_at?: string
          id?: string
          irritability_level?: number
          self_reported_mood?: number
          social_withdrawal?: number
          stimming?: number
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      behavioral_meltdown_relation: {
        Row: {
          behavioral_data_id: string
          correlation_strength: number
          id: string
          meltdown_event_id: string
        }
        Insert: {
          behavioral_data_id: string
          correlation_strength: number
          id?: string
          meltdown_event_id: string
        }
        Update: {
          behavioral_data_id?: string
          correlation_strength?: number
          id?: string
          meltdown_event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "behavioral_meltdown_relation_behavioral_data_id_fkey"
            columns: ["behavioral_data_id"]
            isOneToOne: false
            referencedRelation: "behavioral_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behavioral_meltdown_relation_meltdown_event_id_fkey"
            columns: ["meltdown_event_id"]
            isOneToOne: false
            referencedRelation: "meltdown_events"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meltdown_events: {
        Row: {
          coping_strategies: string[] | null
          created_at: string
          duration: number
          id: string
          intensity: number
          notes: string | null
          timestamp: string
          triggers: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          coping_strategies?: string[] | null
          created_at?: string
          duration: number
          id?: string
          intensity: number
          notes?: string | null
          timestamp?: string
          triggers?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          coping_strategies?: string[] | null
          created_at?: string
          duration?: number
          id?: string
          intensity?: number
          notes?: string | null
          timestamp?: string
          triggers?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          content: string
          content_type: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      routine_data: {
        Row: {
          actual_activity: string
          created_at: string
          deviation_score: number
          expected_activity: string
          id: string
          is_unexpected_change: boolean
          location: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_activity: string
          created_at?: string
          deviation_score: number
          expected_activity: string
          id?: string
          is_unexpected_change?: boolean
          location: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_activity?: string
          created_at?: string
          deviation_score?: number
          expected_activity?: string
          id?: string
          is_unexpected_change?: boolean
          location?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      routine_meltdown_relation: {
        Row: {
          correlation_strength: number
          id: string
          meltdown_event_id: string
          routine_data_id: string
        }
        Insert: {
          correlation_strength: number
          id?: string
          meltdown_event_id: string
          routine_data_id: string
        }
        Update: {
          correlation_strength?: number
          id?: string
          meltdown_event_id?: string
          routine_data_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_meltdown_relation_meltdown_event_id_fkey"
            columns: ["meltdown_event_id"]
            isOneToOne: false
            referencedRelation: "meltdown_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_meltdown_relation_routine_data_id_fkey"
            columns: ["routine_data_id"]
            isOneToOne: false
            referencedRelation: "routine_data"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_data: {
        Row: {
          data_type: string
          id: string
          timestamp: string
          user_id: string | null
          value: number
        }
        Insert: {
          data_type: string
          id?: string
          timestamp?: string
          user_id?: string | null
          value: number
        }
        Update: {
          data_type?: string
          id?: string
          timestamp?: string
          user_id?: string | null
          value?: number
        }
        Relationships: []
      }
      sensory_data: {
        Row: {
          created_at: string
          crowding: number
          id: string
          light_intensity: number
          noise_level: number
          smell_sensitivity: number | null
          temperature: number
          texture_sensitivity: number | null
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crowding: number
          id?: string
          light_intensity: number
          noise_level: number
          smell_sensitivity?: number | null
          temperature: number
          texture_sensitivity?: number | null
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          crowding?: number
          id?: string
          light_intensity?: number
          noise_level?: number
          smell_sensitivity?: number | null
          temperature?: number
          texture_sensitivity?: number | null
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sensory_meltdown_relation: {
        Row: {
          correlation_strength: number
          id: string
          meltdown_event_id: string
          sensory_data_id: string
        }
        Insert: {
          correlation_strength: number
          id?: string
          meltdown_event_id: string
          sensory_data_id: string
        }
        Update: {
          correlation_strength?: number
          id?: string
          meltdown_event_id?: string
          sensory_data_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensory_meltdown_relation_meltdown_event_id_fkey"
            columns: ["meltdown_event_id"]
            isOneToOne: false
            referencedRelation: "meltdown_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensory_meltdown_relation_sensory_data_id_fkey"
            columns: ["sensory_data_id"]
            isOneToOne: false
            referencedRelation: "sensory_data"
            referencedColumns: ["id"]
          },
        ]
      }
      sleep_data: {
        Row: {
          awakenings: number
          created_at: string
          date: string
          deep_sleep_percentage: number
          duration: number
          id: string
          quality: number
          rem_sleep_percentage: number
          updated_at: string
          user_id: string
        }
        Insert: {
          awakenings: number
          created_at?: string
          date: string
          deep_sleep_percentage: number
          duration: number
          id?: string
          quality: number
          rem_sleep_percentage: number
          updated_at?: string
          user_id: string
        }
        Update: {
          awakenings?: number
          created_at?: string
          date?: string
          deep_sleep_percentage?: number
          duration?: number
          id?: string
          quality?: number
          rem_sleep_percentage?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sleep_meltdown_relation: {
        Row: {
          correlation_strength: number
          id: string
          meltdown_event_id: string
          sleep_data_id: string
        }
        Insert: {
          correlation_strength: number
          id?: string
          meltdown_event_id: string
          sleep_data_id: string
        }
        Update: {
          correlation_strength?: number
          id?: string
          meltdown_event_id?: string
          sleep_data_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sleep_meltdown_relation_meltdown_event_id_fkey"
            columns: ["meltdown_event_id"]
            isOneToOne: false
            referencedRelation: "meltdown_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleep_meltdown_relation_sleep_data_id_fkey"
            columns: ["sleep_data_id"]
            isOneToOne: false
            referencedRelation: "sleep_data"
            referencedColumns: ["id"]
          },
        ]
      }
      strategies: {
        Row: {
          category: string
          created_at: string
          description: string | null
          effectiveness: number
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          effectiveness: number
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          effectiveness?: number
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
