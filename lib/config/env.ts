export const requireEnvVar = (name: string): string => {
    const value = process.env[name]
    if (!value) {
      throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
  }
  
  export const ENV = {
    SUPABASE_URL: requireEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    SUPABASE_ANON_KEY: requireEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    APP_URL: requireEnvVar('NEXT_PUBLIC_APP_URL'),
  } as const