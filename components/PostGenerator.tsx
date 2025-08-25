'use client'

import { useState } from 'react'

interface PostGeneratorProps {
  generatedPost: string
  isGenerating: boolean
}

export default function PostGenerator({ generatedPost, isGenerating }: PostGeneratorProps) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = () => {
    if (!generatedPost) return
    
    navigator.clipboard.writeText(generatedPost)
    setCopied(true)
    
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  
  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Votre post LinkedIn</h2>
        
        {generatedPost && (
          <button
            onClick={copyToClipboard}
            className="text-primary hover:text-blue-700 flex items-center"
            title="Copier le texte"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-sm">Copié !</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span className="text-sm">Copier</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="min-h-[300px] bg-secondary rounded-md p-4 relative">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Génération de votre post...</p>
          </div>
        ) : generatedPost ? (
          <div className="whitespace-pre-wrap">
            {generatedPost.split('\n').map((line, i) => (
              <p key={i} className={`${line.trim() === '' ? 'mb-4' : 'mb-2'}`}>
                {line}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <p className="text-center">
              Importez une image et cliquez sur "Générer un post LinkedIn" <br /> 
              pour obtenir votre contenu
            </p>
          </div>
        )}
      </div>
      
      {generatedPost && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 italic">
            Personnalisez le texte généré selon vos besoins avant de le publier sur LinkedIn.
          </p>
          <div className="flex justify-between mt-2">
            <button
              onClick={copyToClipboard}
              className="btn-primary"
            >
              {copied ? 'Copié !' : 'Copier le texte'}
            </button>
            <a 
              href="https://www.linkedin.com/post/new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0a66c2] text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center"
            >
              <span>Publier sur LinkedIn</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
