'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
  imagePreview: string | null
}

export default function ImageUploader({ onImageUpload, imagePreview }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0])
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1
  })

  useEffect(() => {
    setIsDragging(isDragActive)
  }, [isDragActive])

  // Pour le support du copier-coller
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0]
        if (file.type.startsWith('image/')) {
          onImageUpload(file)
          e.preventDefault()
        }
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [onImageUpload])

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Importez votre image</h2>
      
      {!imagePreview ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary hover:bg-blue-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Glissez-déposez une image ici, ou cliquez pour sélectionner un fichier
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Vous pouvez aussi coller une image depuis le presse-papier (Ctrl+V)
            </p>
            <button className="btn-primary mt-4">
              Sélectionner une image
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden rounded-md">
            <Image 
              src={imagePreview} 
              alt="Aperçu de l'image" 
              fill 
              className="object-contain" 
            />
          </div>
          <button 
            onClick={() => onImageUpload(new File([], ""))} 
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            title="Supprimer l'image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Format supportés: PNG, JPG, GIF, BMP, WEBP
      </p>
    </div>
  )
}
