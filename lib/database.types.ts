export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Business: {
        Row: {
          id: string
          name: string
          userId: string
          industry_type: string
          address: string
          business_email: string
          phone_number: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          userId: string
          industry_type?: string
          address?: string
          business_email?: string
          phone_number?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          userId?: string
          industry_type?: string
          address?: string
          business_email?: string
          phone_number?: string
          created_at?: string
        }
      }
      // Add other tables as needed
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

