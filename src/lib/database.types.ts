export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          profile_type: string
          updated_at: string
          created_at: string
          company_name?: string
          industry?: string
          goals?: string[]
          onboarding_completed: boolean
        }
        Insert: {
          id: string
          user_id: string
          profile_type: string
          updated_at?: string
          created_at?: string
          company_name?: string
          industry?: string
          goals?: string[]
          onboarding_completed?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          profile_type?: string
          updated_at?: string
          created_at?: string
          company_name?: string
          industry?: string
          goals?: string[]
          onboarding_completed?: boolean
        }
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
  }
}
