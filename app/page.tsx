'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/components/ImageUploader'
import PostGenerator from '@/components/PostGenerator'
import { StyleSelector } from '@/components/StyleSelector'
import { supabase } from '@/utils/supabase'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [generatedPost, setGeneratedPost] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('professional')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    
    checkUser()
  }, [])

  const handleImageUpload = (file: File) => {
    setImage(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setGeneratedPost('')
  }

  const generatePost = async () => {
    if (!image) return
    
    // If not authenticated, prompt to log in
    if (!user) {
      if (confirm('Connectez-vous pour sauvegarder vos posts générés dans votre historique.')) {
        const { data } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        return
      }
    }

    setIsGenerating(true)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('style', selectedStyle)

      const response = await fetch('/api/generate-post', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (response.ok) {
        setGeneratedPost(data.post)
        
        if (data.postId && user) {
          // Notify user that post was saved
          console.log('Post saved to your history')
        }
      } else {
        console.error('Error generating post:', data.error)
        alert('Une erreur est survenue lors de la génération du post.')
      }
    } catch (error) {
      console.error('Error generating post:', error)
      alert('Une erreur est survenue lors de la génération du post.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">LinkedIn Post Generator</h1>
        <p className="text-gray-600 mt-2">
          Transformez vos captures d&apos;écran en posts LinkedIn engageants
        </p>
        {user && (
          <p className="text-sm text-blue-600 mt-2">
            Connecté en tant que {user.email || user.user_metadata?.name || 'Utilisateur'}
          </p>
        )}
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageUploader onImageUpload={handleImageUpload} imagePreview={imagePreview} />
          
          {imagePreview && (
            <div className="mt-4">
              <StyleSelector 
                selectedStyle={selectedStyle} 
                onStyleChange={setSelectedStyle} 
              />
              
              <button 
                onClick={generatePost} 
                disabled={isGenerating || !image}
                className="btn-primary w-full mt-4 disabled:opacity-50"
              >
                {isGenerating ? 'Génération en cours...' : 'Générer un post LinkedIn'}
              </button>
            </div>
          )}
        </div>

        <div>
          <PostGenerator 
            generatedPost={generatedPost} 
            isGenerating={isGenerating}
          />
          {generatedPost && user && (
            <div className="mt-4 text-center">
              <p className="text-sm text-green-600">Post sauvegardé dans votre historique</p>
              <button 
                onClick={() => router.push('/history')} 
                className="text-blue-600 underline text-sm mt-2"
              >
                Voir mon historique
              </button>
            </div>
          )}
          {generatedPost && !user && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Connectez-vous</strong> pour sauvegarder vos posts générés et y accéder ultérieurement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
