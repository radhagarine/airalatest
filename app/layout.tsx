import { Toaster } from 'sonner'
import { getSupabaseServerClient } from "@/lib/supabase-server"
import { SessionProvider } from './SessionProvider'
import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = getSupabaseServerClient()
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <SessionProvider session={session}>
          <body className="min-h-screen bg-background font-sans antialiased">
            {children}
            <Toaster />
          </body>
        </SessionProvider>
      </html>
    )
  } catch (error) {
    console.error('Root layout error:', error)
    return (
      <html lang="en">
        <body>
          <h1>An error occurred. Please try again later.</h1>
          <Toaster />
        </body>
      </html>
    )
  }
}

