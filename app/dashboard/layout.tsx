import { Toaster } from 'sonner'
import { getSupabaseServerClient } from "@/lib/supabase-server"
import { SessionProvider } from '@/app/SessionProvider'

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
      <html lang="en">
        <SessionProvider session={session}>
          <body>
            {children}
            <Toaster />
          </body>
        </SessionProvider>
      </html>
    )
  } catch (error) {
    console.error('Root layout error:', error)
    // Handle the error appropriately, maybe show a generic error page
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

