'use client'

import { useCallback } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function AuthButtons() {
  const router = useRouter()
  
  const handleSignIn = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
      console.error('Error signing in:', error)
      alert('Une erreur est survenue lors de la connexion.')
    }
  }, [])
  
  const handleSignOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      alert('Une erreur est survenue lors de la déconnexion.')
    } else {
      router.refresh()
    }
  }, [router])
  
  return (
    <div className="flex gap-4">
      <button
        onClick={handleSignIn}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Se connecter
      </button>
      <button
        onClick={handleSignOut}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
      >
        Se déconnecter
      </button>
    </div>
  )
}
