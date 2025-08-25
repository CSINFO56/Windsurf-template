'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import PostGenerator from '@/components/PostGenerator'
import { StyleSelector } from '@/components/StyleSelector'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [generatedPost, setGeneratedPost] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('professional')

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">LinkedIn Post Generator</h1>
        <p className="text-gray-600 mt-2">
          Transformez vos captures d&apos;écran en posts LinkedIn engageants
        </p>
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
        </div>
      </div>
    </div>
  )
}
