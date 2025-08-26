import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    
    // Get the user data and save to database if it's a new user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Check if user exists in database
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id }
      })
      
      if (!existingUser) {
        // Create new user in database
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || user.email?.split('@')[0] || 'User'
          }
        })
      }
    }
  }

  // Redirect to the home page
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}
