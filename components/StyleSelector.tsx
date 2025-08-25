'use client'

import React from 'react'

interface StyleSelectorProps {
  selectedStyle: string
  onStyleChange: (style: string) => void
}

type StyleOption = {
  id: string
  name: string
  description: string
}

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  const styles: StyleOption[] = [
    {
      id: 'professional',
      name: 'Professionnel',
      description: 'Ton formel et informatif, idéal pour un contenu d\'entreprise'
    },
    {
      id: 'inspirational',
      name: 'Inspirant',
      description: 'Ton motivant et engageant pour inspirer votre réseau'
    },
    {
      id: 'casual',
      name: 'Décontracté',
      description: 'Ton conversationnel et accessible pour un contenu plus personnel'
    },
    {
      id: 'storytelling',
      name: 'Storytelling',
      description: 'Format narratif pour partager des expériences de façon captivante'
    },
    {
      id: 'educational',
      name: 'Éducatif',
      description: 'Axé sur le partage de connaissances et l\'expertise'
    }
  ]

  return (
    <div className="my-4">
      <label className="block text-sm font-medium mb-2">Style du post</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
        {styles.map((style) => (
          <div 
            key={style.id}
            className={`p-3 border rounded-md cursor-pointer transition-all ${
              selectedStyle === style.id 
                ? 'border-primary bg-blue-50' 
                : 'border-gray-200 hover:border-primary hover:bg-blue-50'
            }`}
            onClick={() => onStyleChange(style.id)}
          >
            <div className="flex items-center space-x-2">
              <input 
                type="radio"
                name="style"
                id={style.id}
                checked={selectedStyle === style.id}
                onChange={() => onStyleChange(style.id)}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor={style.id} className="font-medium cursor-pointer">{style.name}</label>
            </div>
            <p className="text-xs text-gray-500 mt-1 pl-5">{style.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
