export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

// Define auth-specific types
export type AuthError = {
  message: string
  status: number
}

export type AuthResponse = {
  user: User | null
  session: Session | null
  error: AuthError | null
}

export type User = {
  id: string
  email?: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
    // Add other user metadata fields
  }
}

export type Session = {
  access_token: string
  refresh_token: string
  expires_in: number
  provider_token?: string
  user: User
}

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