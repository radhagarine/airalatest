import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Example rate limiting utility
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; timestamp: number }>()
  
  return (key: string): boolean => {
    const now = Date.now()
    const attempt = attempts.get(key)
    
    if (!attempt) {
      attempts.set(key, { count: 1, timestamp: now })
      return true
    }
    
    if (now - attempt.timestamp > windowMs) {
      attempts.set(key, { count: 1, timestamp: now })
      return true
    }
    
    if (attempt.count >= maxAttempts) {
      return false
    }
    
    attempts.set(key, { count: attempt.count + 1, timestamp: attempt.timestamp })
    return true
  }
}
